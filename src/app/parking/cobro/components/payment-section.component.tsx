"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ScanQrCode } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/shared/components/ui/card";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";
import EmptyState from "@/src/shared/components/empty-state.component";
import { usePaymentContext } from "@/src/shared/context/payment.context";

const TOTAL_AMOUNT = 8540;

const thirdPartyUsers = [
  {
    id: "cliente",
    label: "Cliente directo",
    detail: "Sin convenios",
  },
  {
    id: "empresa",
    label: "Empresa aliada",
    detail: "Tercerizado · Torre B",
  },
];

const paymentMethods = [
  { id: "cash", label: "Efectivo" },
  { id: "card", label: "Tarjeta" },
  { id: "transfer", label: "Transferencia" },
];

const steps = [
  { id: "user", badge: "1", title: "Usuario", description: "" },
  { id: "method", badge: "2", title: "Medio", description: "" },
  { id: "amount", badge: "3", title: "Monto", description: "" },
  { id: "confirm", badge: "4", title: "Confirmar", description: "" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

type PaymentSectionProps = {
  className?: string;
};

export function PaymentSectionComponent({ className }: PaymentSectionProps) {
  const { validateRaw } = usePaymentContext();
  const [selectedUser, setSelectedUser] = useState(thirdPartyUsers[0].id);
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0].id);
  const [amountReceived, setAmountReceived] = useState("0");
  const [currentStep, setCurrentStep] = useState(0);

  const changeValue = useMemo(() => {
    const parsed = Number(amountReceived);
    if (!Number.isFinite(parsed)) return 0;
    return Math.max(parsed - TOTAL_AMOUNT, 0);
  }, [amountReceived]);

  const clampStep = (index: number) => Math.max(0, Math.min(index, steps.length - 1));
  const progress = ((currentStep + 1) / steps.length) * 100;

  const nextStep = () => setCurrentStep((prev) => clampStep(prev + 1));
  const prevStep = () => setCurrentStep((prev) => clampStep(prev - 1));
  const goToStep = (index: number) => setCurrentStep(clampStep(index));
  const autoAdvanceFromStep = (stepIndex: number) => {
    setCurrentStep((prev) => {
      if (prev !== stepIndex) return prev;
      return clampStep(prev + 1);
    });
  };

  const handleUserSelect = (userId: string) => {
    setSelectedUser(userId);
    autoAdvanceFromStep(0);
  };

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    autoAdvanceFromStep(1);
  };

  const isLastStep = currentStep === steps.length - 1;

  const handleRegisterPayment = () => {
    // Placeholder action for mock flow; replace with real submit when backend is ready.
    console.info("Registrar pago (mock)", {
      selectedUser,
      selectedMethod,
      amountReceived,
    });
  };

  const handleContinue = () => {
    if (isLastStep) {
      handleRegisterPayment();
      return;
    }
    nextStep();
  };

  if (!validateRaw) {
    return (
      <Card className={cn("gap-0 overflow-hidden", className)}>
        <CardContent className="flex items-center justify-center py-5 my-auto">
          <EmptyState
            title="Sin datos validados"
            description="Escanea un código QR o ingresa el número de sesión para continuar con el cobro."
            icon={<ScanQrCode className="h-8 w-8" />}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("gap-0 flex h-full flex-col overflow-hidden", className)}>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Total del cobro
            </p>
            <CardTitle className="text-xl font-semibold tracking-tight">
              {formatCurrency(TOTAL_AMOUNT)}
            </CardTitle>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Cambio estimado
            </p>
            <p
              className={cn("text-lg font-semibold", changeValue > 0 ? "text-emerald-400" : "text-muted-foreground")}
            >
              {changeValue > 0 ? formatCurrency(changeValue) : "--"}
            </p>
          </div>
        </div>
        <CardDescription className="text-[10px]">
          Sigue los pasos para registrar el pago y validar los datos antes de confirmar.
        </CardDescription>
        <div className="h-1 rounded-full bg-border/50">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto py-0 pr-1">
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground pt-2">
          <span>Pasos</span>
          <span>
            {currentStep + 1}/{steps.length}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => goToStep(index)}
                className={cn(
                  "flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold transition-all",
                  isActive
                    ? "border-primary/50 bg-primary/10 text-foreground"
                    : "border-border/50 text-muted-foreground hover:border-primary/40"
                )}
              >
                <Badge variant="outline" className="w-5 shrink-0 border-primary/30 text-[10px]">
                  {step.badge}
                </Badge>
                <span>{step.title}</span>
              </button>
            );
          })}
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div
            className="flex h-full transition-transform duration-300"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {steps.map((step) => {
              return (
                <div key={step.id} className="flex w-full shrink-0 basis-full flex-col gap-2 p-2.5">
                  <header className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    <span>{step.title}</span>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        aria-label="Paso anterior"
                      >
                        <ChevronLeft className="size-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={handleContinue}
                        aria-label="Paso siguiente"
                      >
                        <ChevronRight className="size-3" />
                      </Button>
                    </div>
                  </header>

                  <div>
                    {step.id === "user" && (
                      <div className="flex gap-1 sm:grid sm:grid-cols-2">
                        {thirdPartyUsers.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => handleUserSelect(user.id)}
                            className={cn(
                              "w-full rounded-lg border px-2.5 py-1.5 text-left shadow-sm transition-all",
                              selectedUser === user.id
                                ? "border-primary/60 bg-primary/10 text-foreground"
                                : "border-border/60 bg-background/60 text-muted-foreground hover:border-primary/40"
                            )}
                          >
                            <p className="text-sm font-semibold text-foreground">{user.label}</p>
                            <p className="text-xs text-muted-foreground">{user.detail}</p>
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === "method" && (
                      <div className="grid gap-1 sm:grid-cols-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => handleMethodSelect(method.id)}
                            className={cn(
                              "w-full rounded-lg border px-2.5 py-1.5 text-left text-sm font-semibold shadow-sm transition-all",
                              selectedMethod === method.id
                                ? "border-primary/60 bg-primary/10 text-foreground"
                                : "border-border/60 bg-background/60 text-muted-foreground hover-border-primary/40"
                            )}
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === "amount" && (
                      <div className="space-y-0.5">
                        <Label htmlFor="amount-received" className="text-[11px] text-muted-foreground">
                          Cantidad
                        </Label>
                        <Input
                          id="amount-received"
                          type="number"
                          min="0"
                          step="100"
                          value={amountReceived}
                          onChange={(event) => setAmountReceived(event.target.value)}
                          className="h-9 text-base font-semibold"
                        />
                        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                          <span>Disponible en caja</span>
                          <span>{selectedMethod === "cash" ? "Requiere validar billetes" : "Sin vuelto"}</span>
                        </div>
                      </div>
                    )}

                    {step.id === "confirm" && (
                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {[ 
                            {
                              label: "Usuario",
                              value: thirdPartyUsers.find((user) => user.id === selectedUser)?.label ?? "--",
                            },
                            {
                              label: "Medio",
                              value: paymentMethods.find((method) => method.id === selectedMethod)?.label ?? "--",
                            },
                            {
                              label: "Recibido",
                              value: formatCurrency(Number(amountReceived) || 0),
                            },
                            {
                              label: "Cambio",
                              value: changeValue > 0 ? formatCurrency(changeValue) : "--",
                            },
                          ].map((item) => (
                            <div key={item.label} className="flex min-w-[120px] flex-1 flex-col px-1.5">
                              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                                {item.label}
                              </span>
                              <span className="text-sm font-semibold text-foreground">
                                {item.value}
                              </span>
                            </div>
                          ))}
                        </div>
                        <Button size="sm" className="w-full" onClick={handleRegisterPayment}>
                          Registrar pago (mock)
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
      <CardFooter className="shrink-0">
        {currentStep < steps.length - 1 && (
          <div className="ml-auto flex items-center gap-2 text-xs">
            <Button variant="ghost" size="sm" onClick={prevStep} disabled={currentStep === 0}>
              Atrás
            </Button>
            <Button size="sm" onClick={handleContinue}>
              Siguiente
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

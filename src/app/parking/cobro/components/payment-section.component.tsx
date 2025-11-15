"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Badge } from "@/src/shared/components/ui/badge";
import { Button } from "@/src/shared/components/ui/button";
import { Input } from "@/src/shared/components/ui/input";
import { Label } from "@/src/shared/components/ui/label";

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
  {
    id: "user",
    badge: "Paso 1",
    title: "Usuario del tercero",
    description: "Define quién autoriza el pago para asignar el convenio correcto.",
  },
  {
    id: "method",
    badge: "Paso 2",
    title: "Medio de pago",
    description: "Selecciona dónde quedará registrado el recaudo.",
  },
  {
    id: "amount",
    badge: "Paso 3",
    title: "Monto recibido",
    description: "Digita el valor entregado para calcular el cambio.",
  },
  {
    id: "confirm",
    badge: "Paso 4",
    title: "Registrar pago",
    description: "Confirma el resumen y completa el proceso (mock).",
  },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);

export function PaymentSectionComponent() {
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

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="rounded-2xl border border-primary/15 bg-linear-to-r from-primary/10 via-primary/5 to-transparent p-4 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary/80">
              Total del cobro
            </p>
            <p className="text-2xl font-semibold text-foreground">{formatCurrency(TOTAL_AMOUNT)}</p>
            <p className="text-xs text-muted-foreground">Valor final enviado por el QR.</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-primary/80">
              Cambio estimado
            </p>
            <p
              className={cn(
                "text-xl font-semibold",
                changeValue > 0 ? "text-emerald-400" : "text-muted-foreground"
              )}
            >
              {changeValue > 0 ? formatCurrency(changeValue) : "--"}
            </p>
            <p className="text-xs text-muted-foreground">Se actualiza con el monto recibido.</p>
          </div>
        </div>

        <div className="mt-4 h-1 rounded-full bg-white/40">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card/80 p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              Secuencia de cobro
            </p>
            <p className="text-sm font-semibold text-foreground">
              Paso {currentStep + 1} de {steps.length}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={prevStep}
              disabled={currentStep === 0}
              aria-label="Paso anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={handleContinue}
              aria-label="Paso siguiente"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => goToStep(index)}
                className={cn(
                  "group flex flex-col rounded-xl border px-3 py-2 text-left transition-all",
                  isActive
                    ? "border-primary/60 bg-primary/5 text-foreground shadow-sm"
                    : "border-border/50 bg-background/60 text-muted-foreground hover:border-primary/40"
                )}
              >
                <span
                  className={cn(
                    "text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground",
                    isActive && "text-primary"
                  )}
                >
                  {step.badge}
                </span>
                <span className="text-sm font-semibold text-foreground">{step.title}</span>
              </button>
            );
          })}
        </div>

        <div className="relative mt-4 overflow-hidden rounded-2xl border border-border/60 bg-background/70">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentStep * 100}%)` }}
          >
            {steps.map((step) => {
              return (
                <div key={step.id} className="flex w-full shrink-0 basis-full flex-col gap-3 p-4">
                  <header className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                    <Badge variant="outline" className="border-primary/40 text-foreground">
                      {step.badge}
                    </Badge>
                    <span>{step.title}</span>
                  </header>
                  <p className="text-xs text-muted-foreground">{step.description}</p>

                  <div className="min-h-[140px]">
                    {step.id === "user" && (
                      <div className="grid gap-1.5">
                        {thirdPartyUsers.map((user) => (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => handleUserSelect(user.id)}
                            className={cn(
                              "w-full rounded-lg border px-3 py-2 text-left shadow-sm transition-all",
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
                      <div className="grid gap-1.5 sm:grid-cols-3">
                        {paymentMethods.map((method) => (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => handleMethodSelect(method.id)}
                            className={cn(
                              "w-full rounded-lg border px-3 py-2 text-left text-sm font-semibold shadow-sm transition-all",
                              selectedMethod === method.id
                                ? "border-primary/60 bg-primary/10 text-foreground"
                                : "border-border/60 bg-background/60 text-muted-foreground hover:border-primary/40"
                            )}
                          >
                            {method.label}
                          </button>
                        ))}
                      </div>
                    )}

                    {step.id === "amount" && (
                      <div className="space-y-1.5">
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
                      <div className="flex h-full flex-col justify-between gap-3 rounded-xl border border-border/70 bg-background/70 px-4 py-3 shadow-sm">
                        <div className="space-y-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">
                            Resumen
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span>Usuario</span>
                              <span className="font-semibold text-foreground">
                                {thirdPartyUsers.find((user) => user.id === selectedUser)?.label}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span>Medio</span>
                              <span className="font-semibold text-foreground">
                                {paymentMethods.find((method) => method.id === selectedMethod)?.label}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span>Recibido</span>
                              <span className="font-semibold text-foreground">
                                {formatCurrency(Number(amountReceived) || 0)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-muted-foreground">
                              <span>Cambio</span>
                              <span className="font-semibold text-foreground">
                                {changeValue > 0 ? formatCurrency(changeValue) : "--"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="w-full py-2" onClick={handleRegisterPayment}>
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

        {currentStep < steps.length - 1 && (
          <div className="mt-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1"
            >
              Atrás
            </Button>
            <Button size="sm" className="flex-1" onClick={handleContinue}>
              Siguiente
            </Button>
          </div>
        )}
      </div>

    </div>
  );
}

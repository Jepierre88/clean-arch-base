"use client";

import EmptyState from "@/src/shared/components/empty-state.component";
import { usePaymentContext } from "@/src/shared/context/payment.context";
import { X } from "lucide-react";
import { Separator } from "@/src/shared/components/ui/separator";
import { Badge } from "@/src/shared/components/ui/badge";

export function QrDetailSectionComponent() {
  const { validateRaw } = usePaymentContext();
  return (
    <>
      {validateRaw?.data ? (
        <div className="flex flex-col gap-4 my-auto h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">ID de sesión</p>
              <p className="font-medium">{validateRaw.data.parkingSessionId}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Perfil de tarifa</p>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {validateRaw.data.rateProfileName}
                </span>
                {validateRaw.data.agreementName && (
                  <Badge variant="outline">
                    {validateRaw.data.agreementName}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Entrada</p>
              <p className="font-medium">{validateRaw.data.entryTime}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Salida</p>
              <p className="font-medium">{validateRaw.data.exitTime}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Duración</p>
              <p className="font-medium">
                {validateRaw.data.durationFormatted}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Monto calculado</p>
              <p className="font-medium">
                ${(validateRaw.data.calculatedAmmount ?? 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Descuento</p>
              <p className="font-medium">
                {validateRaw.data.discountPercentage ?? 0}%
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-sm text-muted-foreground">Reglas aplicadas</p>
            <ul className="mt-2 space-y-2">
              {validateRaw.data.appliedRules?.map((r, idx) => (
                <li key={idx} className="flex justify-between gap-4">
                  <span className="font-medium">{r.ruleType}</span>
                  <span className="text-sm text-muted-foreground">
                    {r.description ?? "-"} • ${(r.ammount ?? 0).toFixed(2)}
                  </span>
                </li>
              )) ?? (
                <li className="text-sm text-muted-foreground">
                  Sin reglas aplicadas
                </li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <article className="flex my-auto mx-auto">
          <EmptyState
            title="No hay datos registrados"
            description="Intenta leer un QR para visualizar sus datos"
            icon={<X />}
          />
        </article>
      )}
    </>
  );
}

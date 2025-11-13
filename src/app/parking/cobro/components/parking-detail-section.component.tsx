"use client";

import EmptyState from "@/src/shared/components/empty-state.component";
import {usePaymentContext} from "@/src/shared/context/payment.context";
import {X} from "lucide-react";
import {Separator} from "@/src/shared/components/ui/separator";
import {Badge} from "@/src/shared/components/ui/badge";
import LabelValueComponent from "@/src/app/parking/cobro/components/label-value.component";

export function QrDetailSectionComponent() {
    const {validateRaw} = usePaymentContext();

    const formatDate = (date: Date | string): string => {
        return new Date(date).toLocaleDateString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <>
            {validateRaw?.data ? (
                <div className="flex flex-col gap-4 my-auto h-full py-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div className={"flex justify-between "}>
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

                    <Separator/>

                    <LabelValueComponent
                        label={"Entrada"}
                        value={formatDate(validateRaw.data.entryTime)}
                    />
                    <LabelValueComponent label={"Salida"} value={formatDate(validateRaw.data.exitTime)}/>

                    <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
                        <LabelValueComponent label={"Duración"} value={`${validateRaw.data.durationMinutes} minutos`}
                                             display={"col"}/>
                        <LabelValueComponent label={"Monto"}
                                             value={`$ ${validateRaw.data.calculatedAmount.toLocaleString("es-CO")}`}
                                             display={"col"}/>
                        <LabelValueComponent label={"Descuento"} value={`${validateRaw.data.discountPercentage ?? 0}%`}
                                             display={"col"}/>
                    </div>

                    <Separator/>

                    <div>
                        <p className="text-sm text-muted-foreground">Reglas aplicadas</p>
                        <ul className="mt-4 space-y-6 relative overflow-y-auto">

                            {/* Línea vertical */}
                            <div className="absolute left-3 top-0 bottom-0 w-px bg-muted-foreground/20"/>

                            {validateRaw.data.appliedRules?.length ? (
                                validateRaw.data.appliedRules.map((r, idx) => (
                                    <li key={idx} className="relative pl-10">
                                        {/* Punto del timeline */}
                                        <span className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-primary"/>

                                        <div className="flex justify-between gap-4">
                                            <span className="font-medium">{r.ruleType}</span>
                                            <span className="text-sm text-muted-foreground">
              {r.description ?? "-"} • ${(r.ammount ?? 0).toFixed(2)}
            </span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-sm text-muted-foreground">Sin reglas aplicadas</li>
                            )}
                        </ul>
                    </div>

                </div>
            ) : (
                <article className="flex my-auto mx-auto">
                    <EmptyState
                        title="No hay datos registrados"
                        description="Intenta leer un QR para visualizar sus datos"
                        icon={<X/>}
                    />
                </article>
            )}
        </>
    );
}

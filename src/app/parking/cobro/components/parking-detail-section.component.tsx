'use client'

import EmptyState from "@/src/shared/components/empty-state.component"
import Title from "@/src/shared/components/ui/title"
import { usePaymentContext } from "@/src/shared/context/payment.context"
import { X } from "lucide-react"

export function QrDetailSectionComponent(){
    const {validateRaw} = usePaymentContext()
    return (
       <>
        <header>
            <Title type="h2">Detalles de la sesión de parqueo</Title>
        </header>
        {validateRaw?.data ? (
            <article className="mt-8 flex flex-col gap-4">
                <p><strong>ID de sesión:</strong> {validateRaw.data.parkingSessionId}</p>
            </article>
        ) : (
            <article className="flex my-auto mx-auto">
                            <EmptyState title="No hay datos registrados" description="Intenta leer un QR para visualizar sus datos" icon={<X/>}/>

            </article>
        )}
       </>
    )
}
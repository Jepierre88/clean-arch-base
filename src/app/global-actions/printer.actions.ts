// Acciones del lado del cliente, necesarias para ejecutar el llamado a la impresora instalada en el localhost

'use client'

import { container } from "@/di/container";
import { IGeneratePaymentResponseEntity, PrintUsecase } from "@/src/domain";
import { toast } from "sonner";

export async function printPostPaymentInvoiceAction(paymentData: IGeneratePaymentResponseEntity): Promise<boolean> {
    try {
        const useCase = container.resolve(PrintUsecase);
        const result = await useCase.printPostPaymentInvoice({ paymentData });
        
        if (result) {
            toast.success("Impresión enviada correctamente");
        } else {
            toast.error("Error al enviar la impresión");
        }
        
        return result;
    } catch (error) {
        console.error("Error al imprimir:", error);
        toast.error("Error inesperado al imprimir");
        return false;
    }
}
// Acciones del lado del cliente, necesarias para ejecutar el llamado a la impresora instalada en el localhost

'use client'

import { container } from "@/di/container";
import { PrintUsecase } from "@/src/domain";


export async function printPostPaymentInvoiceAction(paymentId: string): Promise<void> {
    const useCase = container.resolve(PrintUsecase);
}
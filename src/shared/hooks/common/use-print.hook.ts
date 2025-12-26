'use client'

import { useCallback } from "react";
import { IGeneratePaymentResponseEntity } from "@/server/domain";
import { PrintUsecase } from "@/client/domain/usecases/printer/print.usecase";
import { clientContainer } from "@/client/di/container";
import { toast } from "sonner";

export default function usePrint() {
  const printPostPaymentInvoice = useCallback(async (paymentData: IGeneratePaymentResponseEntity): Promise<boolean> => {
    try {
      const useCase = clientContainer.resolve(PrintUsecase);
      const result = await useCase.printPostPaymentInvoice({ paymentData });
      
      if (result) {
        toast.success("Impresión enviada correctamente");
      } else {
        toast.error("Error al enviar la impresión");
      }
      
      return result;
    } catch (error) {
      console.error("Error al imprimir:", error);
      toast.error("Error al imprimir el comprobante");
      return false;
    }
  }, []);

  return { printPostPaymentInvoice };
}

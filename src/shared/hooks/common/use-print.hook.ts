'use client'

import { useCallback } from "react";
import { IGeneratePaymentResponseEntity } from "@/server/domain";
import { PrintUsecase } from "@/client/domain/usecases/printer/print.usecase";
import { clientContainer } from "@/client/di/container";
import { toast } from "sonner";
import IActionResponse from "../../interfaces/generic/action-response";

export default function usePrint() {
  const printPostPaymentInvoice = useCallback(async (paymentData: IGeneratePaymentResponseEntity): Promise<IActionResponse<boolean>> => {
    try {
      const useCase = clientContainer.resolve(PrintUsecase);
      const result = await useCase.printPostPaymentInvoice(paymentData.data);
      return {
        success: result,
        data: result,
      };
    } catch (error) {
      
      return {
        success: false,
        data: false,
      };
    }
  }, []);

  return { printPostPaymentInvoice };
}

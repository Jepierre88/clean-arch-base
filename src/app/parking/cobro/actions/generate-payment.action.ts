'use server'

import { container } from "@/di/container";
import { IGeneratePaymentParamsEntity, IGeneratePaymentResponseEntity, PaymentUsecase } from "@/domain/index";
import IActionResponse from "@/src/shared/interfaces/generic/action-response";
import IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";
import { AxiosError } from "axios";

export async function generatePaymentAction(params: IGeneratePaymentParamsEntity): Promise<IActionResponse<IGeneratePaymentResponseEntity>> {
    try {
        console.log("generatePaymentAction params:", params);
        const useCase = container.resolve(PaymentUsecase);
        const response = await useCase.generatePayment(params);
        
        console.log("generatePaymentAction response:", response);
        
        return {
            data: response,
            success: true
        };
    } catch (error) {
        console.log("generatePaymentAction error:", error);
        return {
            success: false,
            error: (error as AxiosError<IErrorResponse>).response?.data.message || "Error inesperado al procesar el pago"
        };
    }   
}

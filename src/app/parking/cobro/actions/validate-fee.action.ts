'use server'

import { container } from "@/di/container";
import { IValidateAmmountParamsEntity, IValidateAmmountResponseEntity, PaymentUsecase } from "@/domain/index";
import IActionResponse from "@/src/shared/interfaces/generic/action-response";
import IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";
import { AxiosError } from "axios";

export async function validateFeeAction(params: IValidateAmmountParamsEntity): Promise<IActionResponse<IValidateAmmountResponseEntity>>{
    try {
        const useCase = container.resolve(PaymentUsecase);
        const response = await useCase.validateFee(params);
        return {
            data: response,
            success: true
        };
    } catch (error) {
        return {
            success: false,
            error: (error as AxiosError<IErrorResponse>).response?.data.message || "Error inesperado"
        };
    }   
}
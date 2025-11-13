'use server'

import { container } from "@/di/container";
import { IGenerateManualIncomeParamsEntity, ManualControlUseCase } from "@/src/domain";
import IActionResponse from "@/src/shared/interfaces/generic/action-response";
import IErrorResponse from "@/src/shared/interfaces/generic/error-response.interface";
import { AxiosError } from "axios";

export async function generateManualIncomeAction(params: IGenerateManualIncomeParamsEntity): Promise<IActionResponse<unknown>> {
    try {
        const useCase = container.resolve(ManualControlUseCase);
        const response = await useCase.generateManualIncome(params);
        return { success: true, data: response };
    } catch (error) {
        console.error(error);
        return { success: false, error: (error as AxiosError<IErrorResponse>).response?.data.message || "Error inesperado"};
    }
}
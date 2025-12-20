import { PaymentMethodEnum } from "@/src/shared/enums/parking/payment-method.enum";

export interface IGeneratePaymentParamsEntity {
    parkingSessionId: string;
    paymentMethod: PaymentMethodEnum;
    amountReceived: number;
    notes?: string;
}

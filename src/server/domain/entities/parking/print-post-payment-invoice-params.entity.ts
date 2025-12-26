import { IGeneratePaymentResponseEntity } from "./generate-payment-response.entity";

export interface IPrintPostPaymentInvoiceParamsEntity {
  paymentData: IGeneratePaymentResponseEntity;
}

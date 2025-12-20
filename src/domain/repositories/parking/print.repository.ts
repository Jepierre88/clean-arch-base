import { IPrintPostPaymentInvoiceParamsEntity, IPrintPostPaymentInvoiceResponseEntity } from "@/domain/index";

export abstract class PrintRepository {
  abstract printPostPaymentInvoice(
    params: IPrintPostPaymentInvoiceParamsEntity
  ): Promise<IPrintPostPaymentInvoiceResponseEntity>;
}

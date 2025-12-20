import { injectable, inject } from "tsyringe";
import { PrintRepository } from "@/domain/repositories/parking/print.repository";
import { IPrintPostPaymentInvoiceParamsEntity, IPrintPostPaymentInvoiceResponseEntity } from "@/domain/index";

@injectable()
export class PrintUsecase {
  constructor(@inject("PrintRepository") private printRepository: PrintRepository) {}

  async printPostPaymentInvoice(
    params: IPrintPostPaymentInvoiceParamsEntity
  ): Promise<IPrintPostPaymentInvoiceResponseEntity> {
    return this.printRepository.printPostPaymentInvoice(params);
  }
}

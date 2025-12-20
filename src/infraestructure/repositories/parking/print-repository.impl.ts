import { PrintRepository } from "@/domain/repositories/parking/print.repository";
import {
  IPrintPostPaymentInvoiceParamsEntity,
  IPrintPostPaymentInvoiceResponseEntity,
} from "@/domain/index";
import { PrintDatasourceService } from "@/infraestructure/datasources/parking/print-datasource.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrintRepositoryImpl implements PrintRepository {
  constructor(
    @inject("PrintDatasourceService")
    private printDatasource: PrintDatasourceService
  ) {}

  async printPostPaymentInvoice(
    params: IPrintPostPaymentInvoiceParamsEntity
  ): Promise<IPrintPostPaymentInvoiceResponseEntity> {
    return this.printDatasource.printPostPaymentInvoice(params);
  }
}

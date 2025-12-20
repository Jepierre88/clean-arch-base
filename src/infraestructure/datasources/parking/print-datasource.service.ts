import { IPrintPostPaymentInvoiceParamsEntity, IPrintPostPaymentInvoiceResponseEntity, PrintRepository } from "@/domain/index";
import { AxiosServerInstance } from "../axios-server.intance";
import { injectable } from "tsyringe";

@injectable()
export class PrintDatasourceService extends AxiosServerInstance implements PrintRepository {
  async printPostPaymentInvoice(
    params: IPrintPostPaymentInvoiceParamsEntity
  ): Promise<IPrintPostPaymentInvoiceResponseEntity> {
    const response = await this.api.post<IPrintPostPaymentInvoiceResponseEntity>(
      `/payments/${params.paymentData.paymentId}/print-invoice`,
      params.paymentData
    );
    return response.data;
  }
}

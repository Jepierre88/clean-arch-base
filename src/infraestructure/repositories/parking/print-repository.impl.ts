import { PrintRepository } from "@/domain/repositories/parking/print.repository";
import { IPrintRequestEntity } from "@/domain/entities/printer/print-request.entity";
import { PrintDatasourceService } from "@/infraestructure/datasources/parking/print-datasource.service";
import { inject, injectable } from "tsyringe";

@injectable()
export class PrintRepositoryImpl implements PrintRepository {
  constructor(
    @inject("PrintDatasourceService")
    private printDatasource: PrintDatasourceService
  ) {}

  async sendToPrinter(request: IPrintRequestEntity): Promise<boolean> {
    return this.printDatasource.sendToPrinter(request);
  }
}

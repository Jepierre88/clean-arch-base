import { injectable, inject } from "tsyringe";
import { PrintRepository } from "@/domain/repositories/parking/print.repository";
import { IPrintPostPaymentInvoiceParamsEntity } from "@/domain/index";
import { IPrintRequestEntity } from "../../entities/printer/print-request.entity";
import { IPrinterOperationEntity } from "../../entities/printer/printer-operation.entity";
import { ENVIRONMENT } from "@/src/shared/constants/environment";

@injectable()
export class PrintUsecase {
  constructor(@inject("PrintRepository") private printRepository: PrintRepository) {}

  async printPostPaymentInvoice(
    params: IPrintPostPaymentInvoiceParamsEntity
  ): Promise<boolean> {
    const { paymentData } = params;
    
    const operations: IPrinterOperationEntity[] = [];
    
    operations.push({ accion: "text", datos: "\n" });
    operations.push({ accion: "textalign", datos: "center" });
    operations.push({ accion: "bold", datos: "on" });
    operations.push({ accion: "text", datos: "TICKET DE PAGO" });
    operations.push({ accion: "bold", datos: "off" });
    operations.push({ accion: "text", datos: "----------------------------------------" });
    operations.push({ accion: "textalign", datos: "left" });
    
    operations.push({ accion: "text", datos: `Placa: ${paymentData.session.vehicle.licensePlate}` });
    operations.push({ accion: "text", datos: `Tipo: ${paymentData.session.vehicle.vehicleType.name}` });
    operations.push({ accion: "text", datos: `Ingreso: ${new Date(paymentData.session.entryTime).toLocaleString()}` });
    operations.push({ accion: "text", datos: `Salida: ${new Date(paymentData.session.exitTime).toLocaleString()}` });
    operations.push({ accion: "text", datos: "----------------------------------------" });
    
    operations.push({ accion: "text", datos: `Monto calculado: $${paymentData.session.calculatedAmount.toLocaleString()}` });
    if (paymentData.session.discount > 0) {
      operations.push({ accion: "text", datos: `Descuento: $${paymentData.session.discount.toLocaleString()}` });
    }
    operations.push({ accion: "bold", datos: "on" });
    operations.push({ accion: "text", datos: `Total: $${paymentData.totalAmount.toLocaleString()}` });
    operations.push({ accion: "bold", datos: "off" });
    operations.push({ accion: "text", datos: `Recibido: $${paymentData.amountReceived.toLocaleString()}` });
    operations.push({ accion: "text", datos: `Cambio: $${paymentData.change.toLocaleString()}` });
    operations.push({ accion: "text", datos: "----------------------------------------" });
    operations.push({ accion: "text", datos: `ID Pago: ${paymentData.paymentId}` });
    operations.push({ accion: "text", datos: "\n\n" });

    const printerName = ENVIRONMENT.PRINTER_NAME;
    
    const printRequest: IPrintRequestEntity = {
      nombre_impresora: printerName,
      operaciones: operations
    };

    return this.printRepository.sendToPrinter(printRequest);
  }
}

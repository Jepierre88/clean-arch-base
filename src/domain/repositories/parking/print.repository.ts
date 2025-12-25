import { IPrintRequestEntity } from "@/domain/index";
export abstract class PrintRepository {
  abstract sendToPrinter(request: IPrintRequestEntity): Promise<boolean>;
}

import { TPrinterInformation } from "./printer-information.type";

export type TPrintIncomeBody = {
  parkingSessionId: string;
  vehiclePlate: string;
  vehicleType: string;
  entryTime: string;
  informationPrinter: TPrinterInformation
};
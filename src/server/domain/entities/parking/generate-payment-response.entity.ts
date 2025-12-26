import IIdName from "@/src/shared/interfaces/generic/id-name.interface";

export interface IGeneratePaymentResponseEntity {
    success: boolean;
    totalAmount: number;
    amountReceived: number;
    change: number;
    session: {
        id: string;
        entryTime: string;
        exitTime: string;
        status: string;
        vehicle: {
            id: string;
            licensePlate: string;
            owner: {
                id: string;
                firstName: string;
                lastName: string;
                documentNumber: string;
            };
            vehicleType: IIdName
        };
        rateProfile: IIdName
        calculatedAmount: number;
        finalAmount: number;
        discount: number;
        notes: string;
    };
    paymentId: string;
}
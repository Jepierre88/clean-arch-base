import { IRuleAppliedEntity } from "./rule-applied.entity";

export interface IAmmountDetailEntity {
    parkingSessionId: string;
    entryTime: string;
    exitTime: string;
    durationInMinutes: number;
    durationFormatted: string;
    calculatedAmmount: number;
    discountPercentage: number;
    finalAmmount: number;
    rateProfileName: string;
    agreementName: string;
    appliedRules: IRuleAppliedEntity[];
    graceTimeInMinutes: number;
}
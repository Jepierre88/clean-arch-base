import { IBranding } from "./branding.type";

export default interface TCompany {
    id: string;
    name: string;
    shortName: string;
    branding?: IBranding
}
import { Banknote, CreditCard, Repeat, LucideIcon } from "lucide-react";
import { PaymentMethodEnum } from "@/src/shared/enums/parking/payment-method.enum";

export interface PaymentMethodOption {
    value: PaymentMethodEnum;
    label: string;
    icon: LucideIcon;
}

export const PAYMENT_METHODS: PaymentMethodOption[] = [
    {
        value: PaymentMethodEnum.CASH,
        label: "Efectivo",
        icon: Banknote,
    },
    {
        value: PaymentMethodEnum.CARD,
        label: "Tarjeta",
        icon: CreditCard,
    },
    {
        value: PaymentMethodEnum.TRANSFER,
        label: "Transferencia",
        icon: Repeat,
    },
    {
        value: PaymentMethodEnum.NEQUI,
        label: "Nequi",
        icon: Banknote,
    },
    {
        value: PaymentMethodEnum.DAVIPLATA,
        label: "Daviplata",
        icon: Banknote,
    },
];

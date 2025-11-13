"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { IValidateAmmountParamsEntity, IValidateAmmountResponseEntity } from "@/domain/index";
import { validateFeeAction } from "@/src/app/parking/cobro/actions/validate-fee.action";
import { toast } from "sonner";

type TPaymentContext = {
  // raw action response (IGeneralResponse<IAmmountDetailEntity>) wrapped by IActionResponse
  validateRaw: IValidateAmmountResponseEntity | null;
  isValidating: boolean;
  validateFee: (params: IValidateAmmountParamsEntity) => Promise<boolean>;
  clearValidateResult: () => void;
};

const PaymentContext = createContext<TPaymentContext | undefined>(undefined);

export const usePaymentContext = () => {
  const ctx = useContext(PaymentContext);
  if (!ctx) throw new Error("usePaymentContext must be used within PaymentProvider");
  return ctx;
};

export const PaymentProvider = ({ children }: { children: React.ReactNode }) => {
  const [validateRaw, setValidateRaw] = useState<IValidateAmmountResponseEntity | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const validateFee = useCallback(async (params: IValidateAmmountParamsEntity) => {
    setIsValidating(true);
    try {
      const res = await validateFeeAction(params);
      if (!res.success) {
        setValidateRaw(null);
        toast.error(`Error validando los datos: ${res.error}`);
        return false;
      }
      // res.data is IGeneralResponse<IAmmountDetailEntity>
      setValidateRaw(res.data ?? null);
      toast.success("Datos validados correctamente");
      return true;
    } catch (error) {
      setValidateRaw(null);
      toast.error(`Error validando los datos: ${error}`);
      return false;
    } finally {
      setIsValidating(false);
    }
  }, []);

  const clearValidateResult = useCallback(() => setValidateRaw(null), []);

  // THE IDEA IS THAT WE WILL HAVE ANOTHER PROP WITH THE PAYMENT DATA LIKE MONEY RECEIVED, CHANGE, ETC.
  const value: TPaymentContext = {
    validateRaw,
    isValidating,
    validateFee,
    clearValidateResult,
  };

  return <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>;
};

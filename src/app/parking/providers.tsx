"use client";

import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { CommonProvider } from "@/src/shared/context/common.context";
import { HeaderProvider } from "@/src/shared/context/header.context";
import { PaymentProvider } from "@/src/shared/context/payment.context";
import { DialogProvider } from "@/src/shared/context/dialog.context";
import { PropsWithChildren } from "react";

export default function ParkingProviders({ children }: PropsWithChildren) {
  return (
    <HeaderProvider>
      <PaymentProvider>
        <CommonProvider>
          <DialogProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </DialogProvider>
        </CommonProvider>
      </PaymentProvider>
    </HeaderProvider>
  );
}

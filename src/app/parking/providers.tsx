"use client";

import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { CommonProvider } from "@/src/shared/context/common.context";
import { PaymentProvider } from "@/src/shared/context/payment.context";
import { PropsWithChildren } from "react";

export default function AdminProviders({ children }: PropsWithChildren) {
  return (
    <PaymentProvider>
      <CommonProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </CommonProvider>
    </PaymentProvider>
  );
}

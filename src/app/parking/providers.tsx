"use client"

import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { CommonProvider } from "@/src/shared/context/common.context";
import { PropsWithChildren } from "react";

export default function AdminProviders({
  children,
}: PropsWithChildren) {
  return <CommonProvider>
    <SidebarProvider>{children}</SidebarProvider>
  </CommonProvider>;
}
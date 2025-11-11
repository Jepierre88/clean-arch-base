"use client"

import { SidebarProvider } from "@/src/shared/components/ui/sidebar";
import { PropsWithChildren } from "react";

export default function AdminProviders({
  children,
}: PropsWithChildren) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
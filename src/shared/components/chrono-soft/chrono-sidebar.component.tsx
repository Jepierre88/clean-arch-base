import * as React from "react";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";
import { cn } from "@/src/lib/utils";

export function ChronoSidebarProvider(props: React.ComponentProps<typeof SidebarProvider>) {
  return <SidebarProvider {...props} />;
}

export function ChronoSidebarInset({ className, ...props }: React.ComponentProps<typeof SidebarInset>) {
  return <SidebarInset className={cn("chrono-sidebar__inset", className)} {...props} />;
}

import * as React from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "../ui/sidebar";
import { cn } from "@/src/lib/utils";

export {
  Sidebar as ChronoSidebar,
  SidebarContent as ChronoSidebarContent,
  SidebarFooter as ChronoSidebarFooter,
  SidebarGroup as ChronoSidebarGroup,
  SidebarGroupLabel as ChronoSidebarGroupLabel,
  SidebarGroupAction as ChronoSidebarGroupAction,
  SidebarGroupContent as ChronoSidebarGroupContent,
  SidebarHeader as ChronoSidebarHeader,
  SidebarMenu as ChronoSidebarMenu,
  SidebarMenuAction as ChronoSidebarMenuAction,
  SidebarMenuBadge as ChronoSidebarMenuBadge,
  SidebarMenuButton as ChronoSidebarMenuButton,
  SidebarMenuItem as ChronoSidebarMenuItem,
  SidebarMenuSub as ChronoSidebarMenuSub,
  SidebarMenuSubButton as ChronoSidebarMenuSubButton,
  SidebarMenuSubItem as ChronoSidebarMenuSubItem,
  SidebarRail as ChronoSidebarRail,
  SidebarSeparator as ChronoSidebarSeparator,
  SidebarTrigger as ChronoSidebarTrigger,
} from "../ui/sidebar";

export { useSidebar as useChronoSidebar } from "../ui/sidebar";

export function ChronoSidebarProvider(props: React.ComponentProps<typeof SidebarProvider>) {
  return <SidebarProvider {...props} />;
}

export function ChronoSidebarInset({ className, ...props }: React.ComponentProps<typeof SidebarInset>) {
  return <SidebarInset className={cn("chrono-sidebar__inset", className)} {...props} />;
}

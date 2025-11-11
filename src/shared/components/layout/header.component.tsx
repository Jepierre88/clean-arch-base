"use client";

import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import BreadcrumbComponent from "./breadcrumb.component";
import SearchComponent from "./search.component";

export default function HeaderComponent() {
  const { open, isMobile } = useSidebar();
  return (
    <header
      className="fixed z-10 top-0 transition-all duration-200 ease-linear"
      style={{
        left: open && !isMobile
          ? "var(--sidebar-width)"
          : isMobile
          ? "0px"
          : "var(--sidebar-width-icon)",
        width: open && !isMobile
          ? "calc(100% - var(--sidebar-width))"
          : isMobile
          ? "100%"
          : "calc(100% - var(--sidebar-width-icon))",
      }}
    >
      <div className={`flex items-center justify-between transition-colors duration-200 ease-linear hover:bg-muted ${isMobile ? "bg-muted" : "bg-muted/50"} px-4 py-1 rounded h-14`}>
        <div className="flex items-center gap-3">
          <SidebarTrigger className="shrink-0" />
          <BreadcrumbComponent hideRoot />
        </div>
        <SearchComponent />
      </div>
    </header>
  );
}

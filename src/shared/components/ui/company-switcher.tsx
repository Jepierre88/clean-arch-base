"use client";

import * as React from "react";
import { Building, ChevronsUpDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import TCompany from "@/src/shared/types/auth/company.type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/src/shared/components/ui/sidebar";
import { getPermissionsAction } from "@/src/app/auth/actions/get-permissions.action";
import { setCompanyAction } from "@/src/app/auth/actions/set-company.action";

type Props = {
  companies: TCompany[];
  selectedCompany: TCompany | null;
};

export default function CompanySwitcher({ companies, selectedCompany }: Props) {
  const { isMobile } = useSidebar();
  const { update } = useSession();
  const [changing, setChanging] = React.useState(false);

  const active = React.useMemo(() => {
    if (!selectedCompany && companies.length > 0) return companies[0];
    return selectedCompany ?? null;
  }, [companies, selectedCompany]);

  if (!active) return null;

  const onSelectCompany = async (company: TCompany) => {
    if (changing) return;
    if (active?.id === company.id) return; // no-op

    setChanging(true);
    const t = toast.loading("Cambiando compañía...");
    try {
      const { data } = await setCompanyAction({ companyId: company.id });
      if (!data) throw new Error("No se recibió información de la compañía");
      const permissionsResponse = await getPermissionsAction({
        token: data.access_token,
      });

      if (!permissionsResponse.success || !permissionsResponse.data) {
        throw new Error(
          permissionsResponse.error || "No se pudieron cargar los permisos"
        );
      }

      // Update session
      await update({
        selectedCompany: data.company,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        permissions: permissionsResponse.data,
      });
      toast.success(`Ahora operando en ${data.company.name}`, { id: t });
    } catch (err) {
      console.error("Error al cambiar compañía:", err);
      toast.error("No se pudo cambiar la compañía.", { id: t });
    } finally {
      setChanging(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground z-50"
              disabled={changing}
            >
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <Building className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{active.name}</span>
                <span className="truncate text-xs">
                  {companies.length} compañía(s)
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Compañías
            </DropdownMenuLabel>
            {companies.map((c) => (
              <DropdownMenuItem
                key={c.id}
                onClick={() => onSelectCompany(c)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <Building className="size-3.5 shrink-0" />
                </div>
                <div className="flex-1 truncate">{c.name}</div>
                {active?.id === c.id && (
                  <span className="text-xs text-muted-foreground">Actual</span>
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" disabled>
              <div className="text-muted-foreground font-medium">
                Gestionar compañías (pronto)
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

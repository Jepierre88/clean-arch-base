"use client";
import { User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { TApplication } from "../../types/auth/application.type";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import { NavUser } from "../ui/nav-user";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { TResource } from "../../types/auth/resource.type";
import AppIcons from "../icons.component";
import { EIconNames } from "../../enums/icon-names.enum";

export default function SidebarComponent({ applications }: { applications: TApplication[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const userData = {
    name: "Usuario de prueba",
    email: "usuario@prueba.com",
    avatar: "https://avatars.githubusercontent.com/u/50754836?v=4",
  };

  const isResourceWithoutSubresources = (resource: TResource) => {
    return resource.subresources.length === 0;
  };

  const handleRedirect = (path: string) => {
    router.replace(path);
    // redirect(path)
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {/* CompanySwitcher removed: companies are not part of the session anymore */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`cursor-pointer ${
                  pathname === "/admin/dashboard"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => handleRedirect("/admin/dashboard")}
              >
                <AppIcons iconName={EIconNames.DASHBOARD} />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        {applications.map((app) => (
          <SidebarGroup key={app.id}>
            <SidebarGroupLabel>{app.name}</SidebarGroupLabel>
            <SidebarMenu>
              {app.resources.map((res) => {
                const isActive = pathname.startsWith(`/admin${res.path}`);

                return isResourceWithoutSubresources(res) ? (
                  <SidebarMenuItem key={res.id}>
                    <SidebarMenuButton
                      className={`cursor-pointer ${
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }`}
                      onClick={() => handleRedirect(`/admin${res.path}`)}
                    >
                      <AppIcons iconName={res.icon as EIconNames} />
                      {res.name}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ) : (
                  <Collapsible key={res.id} defaultOpen={isActive}>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className={
                          isActive ? "bg-accent text-accent-foreground" : ""
                        }
                      >
                        <User />
                        {res.name}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {res.subresources.map((subresource) => {
                          const isSubActive = pathname.startsWith(
                            `/admin${subresource.path}`
                          );
                          return (
                            <SidebarMenuSubItem key={subresource.name}>
                              <SidebarMenuSubButton
                                className={
                                  isSubActive
                                    ? "bg-accent text-accent-foreground"
                                    : ""
                                }
                                onClick={() =>
                                  handleRedirect(`/admin${subresource.path}`)
                                }
                              >
                                {subresource.name}
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

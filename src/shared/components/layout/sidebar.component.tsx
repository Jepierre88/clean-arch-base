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
import Image from "next/image";

export default function SidebarComponent({
  applications,
}: {
  applications: TApplication[];
}) {
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
    router.push(path);
  };

  const normalizeToAbsolutePath = (p: string | undefined) => {
    if (!p) return "/parking";
    const clean = p.replace(/^\/+/, ""); // remove leading slashes
    // if the path already targets admin or parking, keep it absolute
    if (clean.startsWith("admin/") || clean.startsWith("parking/")) return `/${clean}`;
    return `/parking/${clean}`;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="mx-auto">
        <Image
          src="/img/BLACK_LOGO.png"
          alt="Logotipo ChronoPOS"
          width={82}
          height={82}
          className="block dark:hidden"
          priority
        />
        <Image
          src="/img/WHITE_LOGO.png"
          alt="Logotipo ChronoPOS (modo oscuro)"
          width={82}
          height={82}
          className="hidden dark:block"
          priority
        />{" "}
        {/* CompanySwitcher removed: companies are not part of the session anymore */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={`cursor-pointer ${
                  pathname === "/parking/dashboard"
                    ? "bg-accent text-accent-foreground"
                    : ""
                }`}
                onClick={() => handleRedirect("/parking/dashboard")}
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
                const resPath = normalizeToAbsolutePath(res.path);
                const isActive = pathname.startsWith(resPath);

                return isResourceWithoutSubresources(res) ? (
                  <SidebarMenuItem key={res.id}>
                    <SidebarMenuButton
                      className={`cursor-pointer ${
                        isActive ? "bg-accent text-accent-foreground" : ""
                      }`}
                      onClick={() => handleRedirect(resPath)}
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
                          const subPath = normalizeToAbsolutePath(
                            subresource.path
                          );
                          const isSubActive = pathname.startsWith(subPath);
                          return (
                            <SidebarMenuSubItem key={subresource.name}>
                              <SidebarMenuSubButton
                                className={
                                  isSubActive
                                    ? "bg-accent text-accent-foreground"
                                    : ""
                                }
                                onClick={() => handleRedirect(subPath)}
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

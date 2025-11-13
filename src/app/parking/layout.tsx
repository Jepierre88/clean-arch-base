import HeaderComponent from "@/src/shared/components/layout/header.component";
import SidebarComponent from "@/src/shared/components/layout/sidebar.component";
import { SidebarInset } from "@/src/shared/components/ui/sidebar";
import { PropsWithChildren } from "react";
import { getSession } from "@/src/lib/session";
import CustomDialog from "@/src/shared/components/dialog/custom-dialog.component";
import FooterComponent from "@/src/shared/components/layout/footer.component";
import ParkingProviders from "./providers";

export default async function ParkingLayout({ children }: PropsWithChildren) {
  const session = await getSession();
  const applications = session?.applications ?? [];

  return (
    <ParkingProviders>
      <SidebarComponent applications={applications} />
      <SidebarInset className="min-w-0 overflow-x-hidden">
        <HeaderComponent />
        <div className="flex flex-col min-w-0 w-full flex-1 px-4 sm:px-6 md:px-8 py-20 overflow-x-hidden relative">
          <section className="max-w-full mx-auto w-full h-full">{children}</section>
          <FooterComponent />
        </div>
      </SidebarInset>
      <CustomDialog />
    </ParkingProviders>
  );
}

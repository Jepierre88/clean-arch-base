import Image from "next/image";

import AUTH_IMAGE from "@/public/img/AUTH_IMAGE.jpg";
import BLACK_LOGO from "@/public/img/BLACK_LOGO.png";
import WHITE_LOGO from "@/public/img/WHITE_LOGO.png";

import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex min-h-dvh w-full overflow-hidden">
      <picture className="relative hidden flex-[0.6] overflow-hidden rounded-r-lg shadow-lg lg:flex">
        <Image src={AUTH_IMAGE} alt="Description" fill className="pointer-events-none select-none object-cover" />
      </picture>
      <section className="flex flex-1 flex-col overflow-hidden lg:flex-[0.4]">
        <header className="mx-auto mb-0 mt-10">
          <picture className="flex w-48 items-end">
            <Image src={WHITE_LOGO} alt="Black Logo" className="select-none pointer-events-none hidden dark:block" />
            <Image src={BLACK_LOGO} alt="White Logo" className="select-none pointer-events-none block dark:hidden" />
          </picture>
        </header>
        <div className="flex flex-1 items-center justify-center overflow-hidden px-4">
          {children}
        </div>
        <footer className="mx-auto pb-4">
          <p>Copyright &copy; 2025 Chronosoft. All rights reserved.</p>
        </footer>
      </section>
    </main>
  );
}

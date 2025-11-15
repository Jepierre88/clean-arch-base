import { PropsWithChildren } from "react";
import Image from "next/image";
import { headers } from "next/headers";

import BLACK_LOGO from "@/public/img/BLACK_LOGO.png";
import WHITE_LOGO from "@/public/img/WHITE_LOGO.png";

export default function AuthLayout({ children }: PropsWithChildren) {
  headers();
  const currentYear = new Date().getFullYear();

  return (
    <main className="relative min-h-dvh w-full overflow-hidden bg-transparent lg:grid lg:grid-cols-[0.55fr_0.45fr]">
      <section className="relative z-10 hidden flex-col justify-between overflow-hidden px-12 py-10 text-foreground lg:flex">

        <header className="relative flex w-48 items-center gap-3">
          <Image src={WHITE_LOGO} alt="ChronoPark" className="hidden select-none dark:block" priority />
          <Image src={BLACK_LOGO} alt="ChronoPark" className="block select-none dark:hidden" priority />
        </header>

        <div className="relative mt-16 space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">ChronoPark</p>
          <h1 className="text-4xl font-semibold leading-tight text-foreground">
            La puerta de entrada a tu consola de control.
          </h1>
          <p className="text-base text-foreground/75">
            Inicia sesión para monitorear cobros, validar ingresos manuales y mantener tu operación sincronizada en
            un solo panel.
          </p>
        </div>

        <div className="relative mt-auto text-sm text-foreground/70">
          Siempre disponible para tus equipos de control y recaudo.
        </div>
      </section>
      <section className="relative z-10 flex flex-1 flex-col">
        <header className="flex items-center justify-center px-6 py-8 lg:hidden">
          <Image src={BLACK_LOGO} alt="ChronoPark" className="block w-40 select-none dark:hidden" priority />
          <Image src={WHITE_LOGO} alt="ChronoPark" className="hidden w-40 select-none dark:block" priority />
        </header>
        <div className="flex flex-1 items-center justify-center px-4 py-8 sm:px-8">{children}</div>
        <footer className="px-6 pb-6 text-center text-sm text-muted-foreground">
          © {currentYear} Chronosoft. Todos los derechos reservados.
        </footer>
      </section>
    </main>
  );
}

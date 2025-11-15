import type { PropsWithChildren } from "react";

import { cn } from "@/src/lib/utils";
import { ClassNameValue } from "tailwind-merge";

export type AppBackgroundProps = PropsWithChildren<{ className?: ClassNameValue }>;

export function AppBackground({ children, className }: AppBackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-dvh w-full overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent" />
      <div className="pointer-events-none absolute -right-10 top-12 size-48 rounded-full border border-primary/40" />
      <div className="pointer-events-none absolute -left-8 bottom-8 h-28 w-28 rounded-2xl border border-primary/25" />
      <div className="pointer-events-none absolute -bottom-10 right-1/3 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 top-10 hidden h-24 w-24 rounded-full border border-primary/15 lg:block" />
      <div className="pointer-events-none absolute right-6 bottom-16 hidden h-16 w-32 rounded-3xl border border-primary/20 lg:block" />

      <div className="relative z-10 flex min-h-dvh flex-col">{children}</div>
    </div>
  );
}

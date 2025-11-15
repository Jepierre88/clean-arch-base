"use client";

import { PropsWithChildren } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function RootProviders({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider 
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      {children}
    </NextThemesProvider>
  );
}

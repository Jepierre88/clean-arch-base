import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "reflect-metadata";
import RootProviders from "@/src/app/providers";
import { AppBackground } from "@/src/shared/components/layout/app-background.component";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CHRONO PARK",
  description: "Gerstiona tu parqueadero de manera eficiente y sencilla con Chrono Park.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppBackground>
          <RootProviders>
            {children}
            <Toaster richColors />
          </RootProviders>
        </AppBackground>
      </body>
    </html>
  );
}

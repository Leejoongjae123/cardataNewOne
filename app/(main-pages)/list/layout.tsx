import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "@/app/globals.css";
import Image from "next/image";
import Script from "next/script";
import Header from "@/components/Header";
import { NextUIProvider } from "@nextui-org/react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Sincar",
  description: "Welcome to Sincar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="flex flex-col h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header></Header>
          
          <div id="wrapper" className="flex-grow flex flex-col">
            <main id="site__main" className="w-full flex-grow">
              <div className="h-[10vh]"></div>
              <div
                className="flex w-full justify-center items-center h-full"
                id="js-oversized"
              >
                <div className="flex justify-center items-center">
                  <div className="w-[50vw] ">
                    <NextUIProvider>{children}</NextUIProvider>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </ThemeProvider>
        <Script src="/js/uikit.min.js"></Script>
        <Script src="/js/simplebar.js"></Script>
        <Script src="/js/script.js"></Script>
      </body>
    </html>
  );
}

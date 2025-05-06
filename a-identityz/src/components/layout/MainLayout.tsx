"use client";

import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ThirdwebProvider } from "@/components/web3/ThirdwebProvider";
import { Toaster } from "@/components/ui/sonner";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <ThirdwebProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" />
      </div>
    </ThirdwebProvider>
  );
}

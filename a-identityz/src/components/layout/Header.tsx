"use client";

import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Identity", href: "/identity" },
    { name: "Marketplace", href: "/marketplace" },
    { name: "Quests", href: "/quests" },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 border-b border-blue-800">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative h-10 w-10">
              <Image
                src="/images/logo.png"
                alt="A-IdentityZ Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <span className="text-xl font-bold text-white">A-IdentityZ</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-white"
                    : "text-blue-200 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ConnectWallet
            theme="dark"
            btnTitle="Connect Wallet"
          />
          {pathname !== "/profile" && (
            <Button variant="outline" className="hidden md:flex bg-transparent text-white border-blue-400 hover:bg-blue-800">
              <Link href="/profile">My Profile</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

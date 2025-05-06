"use client";

import { ThirdwebProvider as ThirdwebSDKProvider } from "@thirdweb-dev/react";
import type { ReactNode } from "react";

export const ThirdwebProvider = ({ children }: { children: ReactNode }) => {
  // Set up the network - we'll use Mumbai (Polygon testnet) for development
  const activeChain = "mumbai";

  // Client ID from ThirdWeb Dashboard (this is a placeholder; you'd use your own)
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "your-client-id";

  return (
    <ThirdwebSDKProvider
      activeChain={activeChain}
      clientId={clientId}
      supportedChains={["mumbai", "ethereum", "polygon"]}
    >
      {children}
    </ThirdwebSDKProvider>
  );
};

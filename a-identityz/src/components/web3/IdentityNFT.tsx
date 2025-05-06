"use client";

import { useState } from "react";
import { useAddress, useContract } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

// This is a placeholder contract address for the Identity NFT
const IDENTITY_NFT_CONTRACT = "0x0000000000000000000000000000000000000000";

export function IdentityNFT() {
  const address = useAddress();
  const [loading, setLoading] = useState(false);
  const [identityName, setIdentityName] = useState("");

  // Connect to the Identity NFT contract
  const { contract } = useContract(IDENTITY_NFT_CONTRACT);

  // Function to mint a new identity NFT
  const mintIdentity = async () => {
    if (!address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (identityName.trim() === "") {
      toast.error("Please provide a name for your identity");
      return;
    }

    try {
      setLoading(true);

      // In a real implementation, this would call the contract's mint function
      // await contract.call("mintIdentity", [identityName]);

      // For now, just simulate the minting process
      setTimeout(() => {
        toast.success(`Successfully created your identity: ${identityName}`);
        setLoading(false);
        setIdentityName("");
      }, 2000);

    } catch (error) {
      console.error("Error minting identity NFT:", error);
      toast.error("Failed to create identity. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Create Your Digital Identity</CardTitle>
        <CardDescription>
          Mint an NFT that represents your identity in the A-IdentityZ ecosystem
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="identity-name" className="text-sm font-medium">
              Identity Name
            </label>
            <input
              id="identity-name"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter a name for your identity"
              value={identityName}
              onChange={(e) => setIdentityName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Preview</span>
            <div className="border rounded-md p-4 bg-blue-50">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ) : (
                <div>
                  <h3 className="font-bold">{identityName || "Your Identity Name"}</h3>
                  <p className="text-sm text-gray-500">Owned by: {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={mintIdentity}
          disabled={loading || !address}
        >
          {loading ? "Creating Identity..." : "Create Identity NFT"}
        </Button>
      </CardFooter>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAddress } from "@thirdweb-dev/react";
import { toast } from "sonner";
import Image from "next/image";

interface MarketplaceItemProps {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  category: "avatar" | "accessory" | "background" | "skill";
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

export function MarketplaceItem({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  rarity
}: MarketplaceItemProps) {
  const address = useAddress();
  const [purchasing, setPurchasing] = useState(false);

  const getRarityColor = () => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800";
      case "uncommon":
        return "bg-green-100 text-green-800";
      case "rare":
        return "bg-blue-100 text-blue-800";
      case "legendary":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const purchaseItem = async () => {
    if (!address) {
      toast.error("Please connect your wallet to make a purchase");
      return;
    }

    setPurchasing(true);

    // Simulate purchase process
    setTimeout(() => {
      toast.success(`Successfully purchased ${name}`);
      setPurchasing(false);
    }, 2000);
  };

  return (
    <Card className="w-full h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRarityColor()}`}>
            {rarity}
          </span>
        </div>
        <div className="absolute bottom-2 left-2">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-900 text-white">
            {category}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="font-bold text-blue-600">{price}</div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={purchaseItem}
          disabled={purchasing || !address}
        >
          {purchasing ? "Processing..." : "Purchase"}
        </Button>
      </CardFooter>
    </Card>
  );
}

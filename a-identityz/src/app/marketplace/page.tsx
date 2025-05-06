"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MarketplaceItem } from "@/components/common/MarketplaceItem";
import { useAddress } from "@thirdweb-dev/react";

// Sample marketplace items for demonstration
const SAMPLE_ITEMS = [
  {
    id: "1",
    name: "Digital Warrior Avatar",
    description: "A powerful warrior avatar to represent your identity in the digital world.",
    price: "120 IDZ",
    imageUrl: "https://api.dicebear.com/7.x/bottts/svg?seed=warrior",
    category: "avatar" as const,
    rarity: "uncommon" as const,
  },
  {
    id: "2",
    name: "Mystic Background",
    description: "Enhance your identity with this mystic background effect.",
    price: "80 IDZ",
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=mystic",
    category: "background" as const,
    rarity: "rare" as const,
  },
  {
    id: "3",
    name: "Blockchain Explorer Skill",
    description: "Add blockchain explorer skills to your identity and get bonuses in related quests.",
    price: "150 IDZ",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=blockchain",
    category: "skill" as const,
    rarity: "uncommon" as const,
  },
  {
    id: "4",
    name: "Golden Crown Accessory",
    description: "Show your status with this exclusive golden crown accessory.",
    price: "200 IDZ",
    imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=crown",
    category: "accessory" as const,
    rarity: "legendary" as const,
  },
  {
    id: "5",
    name: "Crypto Trader Avatar",
    description: "An avatar representing a savvy crypto trader for your digital identity.",
    price: "100 IDZ",
    imageUrl: "https://api.dicebear.com/7.x/micah/svg?seed=trader",
    category: "avatar" as const,
    rarity: "common" as const,
  },
  {
    id: "6",
    name: "DeFi Mastery Skill",
    description: "Gain DeFi knowledge and earn bonuses when completing financial quests.",
    price: "180 IDZ",
    imageUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=defi",
    category: "skill" as const,
    rarity: "rare" as const,
  },
];

export default function MarketplacePage() {
  const address = useAddress();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("newest");

  const categories = ["avatar", "background", "skill", "accessory"];
  const rarities = ["common", "uncommon", "rare", "legendary"];

  // Filter items based on selected filters
  const filteredItems = SAMPLE_ITEMS.filter((item) => {
    if (selectedCategory && item.category !== selectedCategory) return false;
    if (selectedRarity && item.rarity !== selectedRarity) return false;
    return true;
  });

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return Number.parseInt(a.price) - Number.parseInt(b.price);
      case "price-high":
        return Number.parseInt(b.price) - Number.parseInt(a.price);
      case "rarity":
        const rarityOrder = { legendary: 3, rare: 2, uncommon: 1, common: 0 };
        return rarityOrder[b.rarity] - rarityOrder[a.rarity];
      case "newest":
      default:
        return Number.parseInt(b.id) - Number.parseInt(a.id);
    }
  });

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Marketplace</h1>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Wallet Balance:</span>
            <span className="font-semibold">{address ? "235 IDZ" : "Connect Wallet"}</span>
          </div>
        </div>

        {/* Marketplace Info */}
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Enhance Your Identity</h3>
                <p className="text-sm text-blue-700">
                  Purchase unique items to customize and improve your digital identity.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Earn Through Quests</h3>
                <p className="text-sm text-blue-700">
                  Complete quests to earn IDZ tokens that you can spend in the marketplace.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Trade & Collect</h3>
                <p className="text-sm text-blue-700">
                  Trade items with other users or build your own unique collection.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Marketplace Items */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Filters</CardTitle>
                <CardDescription>Refine your search</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Filter */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={selectedCategory === null ? "default" : "outline"}
                      onClick={() => setSelectedCategory(null)}
                      className="text-xs"
                    >
                      All
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        size="sm"
                        variant={selectedCategory === category ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category)}
                        className="text-xs capitalize"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Rarity Filter */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Rarity</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={selectedRarity === null ? "default" : "outline"}
                      onClick={() => setSelectedRarity(null)}
                      className="text-xs"
                    >
                      All
                    </Button>
                    {rarities.map((rarity) => (
                      <Button
                        key={rarity}
                        size="sm"
                        variant={selectedRarity === rarity ? "default" : "outline"}
                        onClick={() => setSelectedRarity(rarity)}
                        className="text-xs capitalize"
                      >
                        {rarity}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sorting */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Sort By</h3>
                  <select
                    className="w-full rounded-md border p-2 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rarity">Rarity</option>
                  </select>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="ghost"
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedRarity(null);
                    setSortBy("newest");
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* My Items Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">My Items</CardTitle>
                <CardDescription>
                  Items you've purchased
                </CardDescription>
              </CardHeader>
              <CardContent>
                {address ? (
                  <div className="text-sm text-muted-foreground">
                    <p>You've purchased 3 items.</p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600"
                    >
                      View My Collection
                    </Button>
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">
                    <p>Connect your wallet to see your items.</p>
                    <Button
                      variant="outline"
                      className="mt-2 w-full"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Marketplace Items Grid */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedItems.map((item) => (
                <MarketplaceItem key={item.id} {...item} />
              ))}
              {sortedItems.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No items found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more results.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

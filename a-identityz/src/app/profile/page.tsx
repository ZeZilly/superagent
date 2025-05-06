"use client";

import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSummary } from "@/components/common/ProfileSummary";
import { Achievement } from "@/components/common/Achievement";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ProfilePage() {
  const address = useAddress();
  const [activeTab, setActiveTab] = useState("overview");

  // Sample profile data for demonstration
  const profileData = {
    username: "Crypto Explorer",
    level: 5,
    experience: 2400,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=explorer",
    reputation: 120,
    questsCompleted: 14,
    tokens: "235 IDZ",
  };

  // Sample achievements for demonstration
  const achievements = [
    {
      title: "First Identity",
      description: "Created your first blockchain identity",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      earnedDate: "2023-12-15",
      unlocked: true,
    },
    {
      title: "Quest Master",
      description: "Complete 25 quests",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
          <circle cx="17" cy="7" r="5" />
        </svg>
      ),
      progress: 14,
      maxProgress: 25,
      unlocked: false,
    },
    {
      title: "Token Collector",
      description: "Earn 1000 IDZ tokens",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
      ),
      progress: 235,
      maxProgress: 1000,
      unlocked: false,
    },
    {
      title: "Marketplace Maven",
      description: "Purchase 10 items from the marketplace",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
          <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
          <path d="M12 3v6" />
        </svg>
      ),
      progress: 3,
      maxProgress: 10,
      unlocked: false,
    },
  ];

  // Sample transaction history
  const transactions = [
    {
      id: "1",
      type: "Quest Reward",
      amount: "+25 IDZ",
      date: "2023-12-15 14:30",
      description: "Completed 'First Steps' quest"
    },
    {
      id: "2",
      type: "Purchase",
      amount: "-80 IDZ",
      date: "2023-12-14 09:15",
      description: "Bought 'Mystic Background' item"
    },
    {
      id: "3",
      type: "Quest Reward",
      amount: "+50 IDZ",
      date: "2023-12-10 11:45",
      description: "Completed 'Community Engagement' quest"
    },
    {
      id: "4",
      type: "Level Up Bonus",
      amount: "+100 IDZ",
      date: "2023-12-05 16:20",
      description: "Reached level 5"
    },
    {
      id: "5",
      type: "Purchase",
      amount: "-120 IDZ",
      date: "2023-12-01 13:10",
      description: "Bought 'Digital Warrior Avatar' item"
    },
  ];

  // Sample owned identities
  const ownedIdentities = [
    {
      id: "1",
      name: "Crypto Explorer",
      level: 5,
      createdAt: "2023-09-15",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=explorer",
      isPrimary: true,
    },
    {
      id: "2",
      name: "Space Traveler",
      level: 3,
      createdAt: "2023-10-20",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=traveler",
      isPrimary: false,
    },
  ];

  // Sample owned items
  const ownedItems = [
    {
      id: "1",
      name: "Mystic Background",
      type: "background",
      rarity: "rare",
      purchasedAt: "2023-12-14",
      image: "https://api.dicebear.com/7.x/shapes/svg?seed=mystic",
    },
    {
      id: "2",
      name: "Digital Warrior Avatar",
      type: "avatar",
      rarity: "uncommon",
      purchasedAt: "2023-12-01",
      image: "https://api.dicebear.com/7.x/bottts/svg?seed=warrior",
    },
    {
      id: "3",
      name: "Blockchain Explorer Skill",
      type: "skill",
      rarity: "uncommon",
      purchasedAt: "2023-11-15",
      image: "https://api.dicebear.com/7.x/identicon/svg?seed=blockchain",
    },
  ];

  return (
    <div className="container py-8 px-4 md:px-6">
      {!address ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Connect your Web3 wallet to view and manage your profile.
          </p>
          <Button>Connect Wallet</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">My Profile</h1>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Summary */}
            <div className="md:col-span-1">
              <ProfileSummary {...profileData} />
            </div>

            {/* Main Content */}
            <div className="md:col-span-2">
              <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="identities">Identities</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Recent Activity */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                      <CardDescription>
                        Your latest transactions and actions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {transactions.slice(0, 3).map((tx) => (
                          <div key={tx.id} className="flex justify-between items-center border-b pb-3">
                            <div>
                              <div className="font-medium">{tx.type}</div>
                              <div className="text-sm text-muted-foreground">{tx.description}</div>
                              <div className="text-xs text-muted-foreground">{tx.date}</div>
                            </div>
                            <div className={`font-semibold ${tx.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.amount}
                            </div>
                          </div>
                        ))}
                        <Button variant="ghost" className="w-full">View All Transactions</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Achievements</CardTitle>
                      <CardDescription>
                        Your progress and unlocked achievements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        {achievements.slice(0, 4).map((achievement) => (
                          <Achievement key={achievement.title} {...achievement} />
                        ))}
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full mt-4"
                        onClick={() => setActiveTab("achievements")}
                      >
                        View All Achievements
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quick Links */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Quick Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/identity">
                          <Button variant="outline" className="w-full">Manage Identity</Button>
                        </Link>
                        <Link href="/marketplace">
                          <Button variant="outline" className="w-full">Browse Market</Button>
                        </Link>
                        <Link href="/quests">
                          <Button variant="outline" className="w-full">Quests</Button>
                        </Link>
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab("settings")}>
                          Settings
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Identities Tab */}
                <TabsContent value="identities" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">My Identities</CardTitle>
                          <CardDescription>
                            Manage your digital identities
                          </CardDescription>
                        </div>
                        <Link href="/identity">
                          <Button>Create New Identity</Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {ownedIdentities.map((identity) => (
                          <div key={identity.id} className="border rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-blue-500">
                                <img
                                  src={identity.image}
                                  alt={identity.name}
                                  className="object-cover"
                                  style={{ width: '100%', height: '100%' }}
                                />
                              </div>
                              <div>
                                <div className="font-semibold flex items-center gap-2">
                                  {identity.name}
                                  {identity.isPrimary && (
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                      Primary
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Level {identity.level} • Created {new Date(identity.createdAt).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">View</Button>
                              {!identity.isPrimary && (
                                <Button variant="default" size="sm">Set as Primary</Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Inventory Tab */}
                <TabsContent value="inventory" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <CardTitle className="text-lg">My Items</CardTitle>
                          <CardDescription>
                            Items you've collected and purchased
                          </CardDescription>
                        </div>
                        <Link href="/marketplace">
                          <Button variant="outline">Browse Marketplace</Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-3">
                        {ownedItems.map((item) => (
                          <div key={item.id} className="border rounded-lg overflow-hidden">
                            <div className="aspect-square relative">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="object-cover"
                                style={{ width: '100%', height: '100%' }}
                              />
                              <div className="absolute top-2 right-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded-full
                                  ${item.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                                    item.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                                    item.rarity === 'uncommon' ? 'bg-green-100 text-green-800' :
                                    'bg-gray-100 text-gray-800'
                                  }
                                `}>
                                  {item.rarity}
                                </span>
                              </div>
                            </div>
                            <div className="p-3">
                              <div className="font-medium">{item.name}</div>
                              <div className="text-sm text-muted-foreground capitalize">{item.type}</div>
                              <div className="text-xs text-muted-foreground">
                                Purchased: {new Date(item.purchasedAt).toLocaleDateString()}
                              </div>
                              <Button className="w-full mt-2" size="sm">Equip</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Profile Settings</CardTitle>
                      <CardDescription>
                        Manage your profile settings and preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="username" className="text-sm font-medium">
                            Username
                          </label>
                          <Input
                            id="username"
                            placeholder="Enter username"
                            defaultValue={profileData.username}
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email (optional)
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Enter email"
                          />
                          <p className="text-xs text-muted-foreground">
                            Used for notifications only. Never shared with third parties.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">
                            Wallet Address
                          </label>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <span className="text-sm text-muted-foreground truncate">
                              {address}
                            </span>
                            <Button variant="ghost" size="sm">
                              Disconnect
                            </Button>
                          </div>
                        </div>
                        <div className="pt-4">
                          <Button>Save Changes</Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Notification Settings</CardTitle>
                      <CardDescription>
                        Manage your notification preferences
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Quest Updates</div>
                            <div className="text-sm text-muted-foreground">
                              Receive notifications about new and completed quests
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Marketplace Alerts</div>
                            <div className="text-sm text-muted-foreground">
                              Get notified about new items in the marketplace
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300"
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">Achievement Milestones</div>
                            <div className="text-sm text-muted-foreground">
                              Be notified when you unlock new achievements
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded border-gray-300"
                          />
                        </div>
                        <div className="pt-4">
                          <Button>Save Preferences</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

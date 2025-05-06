"use client";

import { useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { IdentityNFT } from "@/components/web3/IdentityNFT";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function IdentityPage() {
  const address = useAddress();
  const [activeTab, setActiveTab] = useState("manage");

  // Example identity data (would be loaded from blockchain in real app)
  const identities = [
    {
      id: "1",
      name: "Crypto Explorer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=explorer",
      level: 5,
      attributes: {
        strength: 35,
        intelligence: 70,
        charisma: 50,
        luck: 45,
      },
      skills: ["Web3 Navigation", "Token Trading", "NFT Collection"],
      createdAt: "2023-09-15",
    }
  ];

  const hasIdentity = address && identities.length > 0;

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Digital Identity</h1>
          <div className="flex items-center gap-2">
            {hasIdentity && (
              <Button
                variant="outline"
                onClick={() => setActiveTab("create")}
              >
                Create New Identity
              </Button>
            )}
          </div>
        </div>

        {!address ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Connect your Web3 wallet to create and manage your digital identities on the blockchain.
            </p>
            <Button>Connect Wallet</Button>
          </div>
        ) : !hasIdentity ? (
          <div className="max-w-2xl mx-auto">
            <IdentityNFT />
          </div>
        ) : (
          <Tabs
            defaultValue="manage"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="manage">Manage Identity</TabsTrigger>
              <TabsTrigger value="create">Create New</TabsTrigger>
            </TabsList>

            <TabsContent value="manage" className="space-y-8">
              {identities.map((identity) => (
                <Card key={identity.id} className="overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-700 h-32 relative">
                    <div className="absolute bottom-0 left-6 transform translate-y-1/2">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                        <AvatarImage src={identity.avatar} alt={identity.name} />
                        <AvatarFallback className="text-2xl bg-blue-100 text-blue-800">
                          {identity.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </div>

                  <CardHeader className="pt-16 pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-2xl">{identity.name}</CardTitle>
                        <CardDescription>
                          Level {identity.level} • Created {new Date(identity.createdAt).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Attributes</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {Object.entries(identity.attributes).map(([key, value]) => (
                          <div key={key} className="flex flex-col">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm capitalize">{key}</span>
                              <span className="text-sm font-medium">{value}/100</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {identity.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button variant="outline">Transfer</Button>
                      <Button variant="default">Use as Primary</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="create">
              <div className="max-w-2xl mx-auto">
                <IdentityNFT />
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Information Cards */}
        <div className="grid gap-6 md:grid-cols-3 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">What are Digital Identities?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                Digital identities are NFTs that represent your persona in the A-IdentityZ ecosystem.
                They store your attributes, skills, and achievements on the blockchain.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                <li>Full ownership of your digital persona</li>
                <li>Earn rewards through quests and activities</li>
                <li>Customize with marketplace items</li>
                <li>Level up through experiences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="text-sm text-muted-foreground space-y-1 list-decimal pl-4">
                <li>Connect your wallet</li>
                <li>Create your first identity</li>
                <li>Customize your attributes</li>
                <li>Complete quests to earn rewards</li>
                <li>Level up and unlock new abilities</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

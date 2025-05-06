"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestCard } from "@/components/common/QuestCard";
import { useAddress } from "@thirdweb-dev/react";
import { Input } from "@/components/ui/input";

// Sample quests data for demonstration
const SAMPLE_QUESTS = [
  {
    id: "1",
    title: "First Steps",
    description: "Create your first identity NFT and customize it with basic attributes.",
    reward: "25 IDZ",
    difficulty: "beginner" as const,
    timeEstimate: "1 hour",
    completed: true,
  },
  {
    id: "2",
    title: "Marketplace Explorer",
    description: "Browse the marketplace and purchase your first item.",
    reward: "30 IDZ",
    difficulty: "beginner" as const,
    timeEstimate: "1 hour",
    completed: false,
  },
  {
    id: "3",
    title: "Community Engagement",
    description: "Participate in 3 community events or discussions.",
    reward: "75 IDZ",
    difficulty: "intermediate" as const,
    timeEstimate: "1 week",
    completed: false,
  },
  {
    id: "4",
    title: "NFT Collection",
    description: "Collect 5 different NFTs from the marketplace.",
    reward: "50 IDZ",
    difficulty: "beginner" as const,
    timeEstimate: "3 days",
    completed: false,
  },
  {
    id: "5",
    title: "Skill Master",
    description: "Acquire and equip 3 different skill items to your identity.",
    reward: "100 IDZ",
    difficulty: "intermediate" as const,
    timeEstimate: "5 days",
    completed: false,
  },
  {
    id: "6",
    title: "Web3 Developer",
    description: "Create and deploy a smart contract for the community.",
    reward: "200 IDZ",
    difficulty: "advanced" as const,
    timeEstimate: "2 weeks",
    completed: false,
  },
  {
    id: "7",
    title: "Identity Level 10",
    description: "Level up your identity to reach level 10.",
    reward: "150 IDZ",
    difficulty: "intermediate" as const,
    timeEstimate: "2 weeks",
    completed: false,
  },
  {
    id: "8",
    title: "Blockchain Explorer",
    description: "Participate in cross-chain activities and bridge assets.",
    reward: "180 IDZ",
    difficulty: "advanced" as const,
    timeEstimate: "1 week",
    completed: false,
  },
];

export default function QuestsPage() {
  const address = useAddress();
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter quests based on selected filters and search query
  const filteredQuests = SAMPLE_QUESTS.filter((quest) => {
    // Filter by difficulty
    if (selectedDifficulty && quest.difficulty !== selectedDifficulty) return false;

    // Filter by completion status
    if (!showCompleted && quest.completed) return false;

    // Filter by search query
    if (searchQuery && !quest.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !quest.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    return true;
  });

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Quests & Missions</h1>
          <div className="hidden md:flex items-center gap-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Completed: </span>
              <span className="font-semibold">{address ? "1/8" : "Connect Wallet"}</span>
            </div>
          </div>
        </div>

        {/* Quest Information */}
        <Card className="bg-gradient-to-r from-blue-900 to-blue-700 text-white border-none">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Complete Quests</h2>
                <p className="text-blue-100">
                  Earn rewards by completing various quests and missions in the A-IdentityZ ecosystem.
                </p>
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">25-200</div>
                  <div className="text-blue-100">IDZ per quest</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">XP+</div>
                  <div className="text-blue-100">Level up faster</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-3xl font-bold">NFTs</div>
                  <div className="text-blue-100">Exclusive rewards</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Quest List */}
        <div className="grid md:grid-cols-7 gap-6">
          {/* Filters */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Filters</CardTitle>
                <CardDescription>Find quests that match your interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Search</h3>
                  <Input
                    type="text"
                    placeholder="Search quests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Difficulty Filter */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Difficulty</h3>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={selectedDifficulty === null ? "default" : "outline"}
                      onClick={() => setSelectedDifficulty(null)}
                      className="text-xs"
                    >
                      All
                    </Button>
                    {["beginner", "intermediate", "advanced"].map((difficulty) => (
                      <Button
                        key={difficulty}
                        size="sm"
                        variant={selectedDifficulty === difficulty ? "default" : "outline"}
                        onClick={() => setSelectedDifficulty(difficulty)}
                        className="text-xs capitalize"
                      >
                        {difficulty}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Completion Status */}
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Status</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="show-completed"
                      checked={showCompleted}
                      onChange={() => setShowCompleted(!showCompleted)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="show-completed" className="text-sm">
                      Show completed quests
                    </label>
                  </div>
                </div>

                {/* Reset Filters */}
                <Button
                  variant="ghost"
                  className="w-full mt-2"
                  onClick={() => {
                    setSelectedDifficulty(null);
                    setShowCompleted(false);
                    setSearchQuery("");
                  }}
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* Quest Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Progress</CardTitle>
                <CardDescription>
                  Track your quest completion
                </CardDescription>
              </CardHeader>
              <CardContent>
                {address ? (
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Beginner Quests</span>
                        <span className="font-medium">1/3</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '33%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Intermediate Quests</span>
                        <span className="font-medium">0/3</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Advanced Quests</span>
                        <span className="font-medium">0/2</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                    <div className="pt-2 text-sm text-center text-muted-foreground">
                      Complete all quests to earn a special reward!
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-4">
                    <p className="text-sm text-muted-foreground mb-3">
                      Connect your wallet to track your progress
                    </p>
                    <Button>Connect Wallet</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quest List */}
          <div className="md:col-span-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuests.map((quest) => (
                <QuestCard key={quest.id} {...quest} />
              ))}
              {filteredQuests.length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No quests found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your filters to see more quests.
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

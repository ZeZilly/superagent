"use client";

import { ProfileSummary } from "@/components/common/ProfileSummary";
import { Achievement } from "@/components/common/Achievement";
import { QuestCard } from "@/components/common/QuestCard";
import { useAddress } from "@thirdweb-dev/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  const address = useAddress();

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

  // Sample quest data for demonstration
  const featuredQuests = [
    {
      title: "NFT Collection",
      description: "Collect 5 different NFTs from the marketplace",
      reward: "50 IDZ",
      difficulty: "beginner" as const,
      timeEstimate: "3 days",
    },
    {
      title: "Community Engagement",
      description: "Participate in 3 community events",
      reward: "75 IDZ",
      difficulty: "intermediate" as const,
      timeEstimate: "1 week",
    },
  ];

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
  ];

  return (
    <div className="container py-8 px-4 md:px-6">
      <div className="grid gap-6 md:grid-cols-7 lg:gap-12">
        {/* Main content - takes 5/7 of grid on medium screens and above */}
        <div className="space-y-6 md:col-span-5">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="hidden md:flex">
              {!address && (
                <Button>Connect Wallet</Button>
              )}
            </div>
          </div>

          {/* Profile Summary (only visible on mobile) */}
          <div className="md:hidden">
            <ProfileSummary
              {...profileData}
              isLoading={!address}
            />
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recent Activity</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
              <div className="p-6 space-y-4">
                {address ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-blue-100 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-600"
                        >
                          <path d="M6 19V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
                          <circle cx="12" cy="10" r="2" />
                          <path d="M12 14v4" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Identity Updated</div>
                        <div className="text-sm text-muted-foreground">
                          You updated your digital identity profile.
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          2 hours ago
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-green-100 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-green-600"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Quest Completed</div>
                        <div className="text-sm text-muted-foreground">
                          You completed the "First Steps" quest and earned 25 IDZ.
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          1 day ago
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-purple-100 p-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-600"
                        >
                          <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
                          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Level Up!</div>
                        <div className="text-sm text-muted-foreground">
                          You reached Level 5 and unlocked new abilities.
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          3 days ago
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="text-muted-foreground mb-4">
                      Connect your wallet to see your activity
                    </div>
                    <Button>Connect Wallet</Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Featured Quests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Featured Quests</h2>
              <Link href="/quests">
                <Button variant="outline" size="sm">View All Quests</Button>
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredQuests.map((quest) => (
                <QuestCard key={quest.title} {...quest} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - takes 2/7 of grid on medium screens and above */}
        <div className="space-y-6 md:col-span-2">
          {/* Profile Summary (only visible on desktop) */}
          <div className="hidden md:block">
            <ProfileSummary
              {...profileData}
              isLoading={!address}
            />
          </div>

          {/* Achievements */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Achievements</h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <Achievement key={achievement.title} {...achievement} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <div className="space-y-2">
                <Link
                  href="/identity"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Manage Identity
                </Link>
                <Link
                  href="/marketplace"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Browse Marketplace
                </Link>
                <Link
                  href="/quests"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Explore Quests
                </Link>
                <Link
                  href="/whitepaper"
                  className="block text-sm text-blue-600 hover:underline"
                >
                  Read Whitepaper
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

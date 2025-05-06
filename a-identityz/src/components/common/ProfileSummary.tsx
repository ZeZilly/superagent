"use client";

import { useAddress } from "@thirdweb-dev/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileSummaryProps {
  username?: string;
  level?: number;
  experience?: number;
  avatarUrl?: string;
  reputation?: number;
  questsCompleted?: number;
  tokens?: string;
  isLoading?: boolean;
}

export function ProfileSummary({
  username,
  level = 1,
  experience = 0,
  avatarUrl,
  reputation = 0,
  questsCompleted = 0,
  tokens = "0",
  isLoading = false
}: ProfileSummaryProps) {
  const address = useAddress();
  const [copying, setCopying] = useState(false);

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "Not connected";

  const copyAddress = () => {
    if (!address) return;

    setCopying(true);
    navigator.clipboard.writeText(address)
      .then(() => {
        toast.success("Wallet address copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        toast.error("Failed to copy address");
      })
      .finally(() => {
        setTimeout(() => setCopying(false), 1000);
      });
  };

  // Calculate how much XP needed for next level (simple formula)
  const nextLevelXP = level * 1000;
  const xpProgress = (experience / nextLevelXP) * 100;

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">
            <Skeleton className="h-8 w-3/4" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-4 w-1/2" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">{username || "Anonymous Collector"}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>{displayAddress}</span>
          {address && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={copyAddress}
              disabled={copying}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                {copying ? (
                  <path d="M20 6L9 17l-5-5" />
                ) : (
                  <>
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </>
                )}
              </svg>
              <span className="sr-only">{copying ? "Copied" : "Copy"}</span>
            </Button>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-blue-500">
            <AvatarImage src={avatarUrl} alt={username || "User Avatar"} />
            <AvatarFallback className="bg-blue-100 text-blue-800 text-xl">
              {username ? username.charAt(0).toUpperCase() : "A"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Level {level}</div>
            <div className="text-sm text-muted-foreground">
              XP: {experience} / {nextLevelXP}
            </div>
            <div className="mt-1 h-2 w-[200px] rounded-full bg-blue-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Reputation</div>
            <div className="text-2xl font-bold text-blue-600">{reputation}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Quests Completed</div>
            <div className="text-2xl font-bold text-blue-600">{questsCompleted}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Tokens Earned</div>
            <div className="text-2xl font-bold text-blue-600">{tokens}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-muted-foreground">Items Owned</div>
            <div className="text-2xl font-bold text-blue-600">
              {address ? Math.floor(Math.random() * 10) : 0}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAddress } from "@thirdweb-dev/react";

interface QuestCardProps {
  title: string;
  description: string;
  reward: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeEstimate: string;
  completed?: boolean;
}

export function QuestCard({
  title,
  description,
  reward,
  difficulty,
  timeEstimate,
  completed = false
}: QuestCardProps) {
  const address = useAddress();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(completed);

  const getDifficultyColor = () => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const startQuest = async () => {
    if (!address) {
      toast.error("Please connect your wallet to start a quest");
      return;
    }

    setIsLoading(true);

    // Simulate quest completion process
    setTimeout(() => {
      toast.success(`Quest started: ${title}`);
      setIsLoading(false);
    }, 1500);
  };

  const completeQuest = async () => {
    if (!address) {
      toast.error("Please connect your wallet to complete a quest");
      return;
    }

    setIsLoading(true);

    // Simulate quest completion process
    setTimeout(() => {
      setIsCompleted(true);
      toast.success(`Quest completed! You earned ${reward}`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor()}`}
          >
            {difficulty}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <span className="text-muted-foreground">Reward: </span>
            <span className="font-medium text-blue-600">{reward}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Time: </span>
            <span>{timeEstimate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 pt-2">
        {isCompleted ? (
          <div className="w-full flex items-center justify-center gap-2">
            <span className="text-green-600 font-medium">Completed</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-green-600"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        ) : (
          <Button
            className="w-full"
            onClick={completeQuest}
            disabled={isLoading || !address}
          >
            {isLoading ? "Processing..." : "Complete Quest"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

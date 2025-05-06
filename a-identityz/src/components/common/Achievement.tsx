"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AchievementProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  earnedDate?: string;
  progress?: number;
  maxProgress?: number;
  unlocked?: boolean;
}

export function Achievement({
  title,
  description,
  icon,
  earnedDate,
  progress = 0,
  maxProgress = 100,
  unlocked = false
}: AchievementProps) {

  const formattedDate = earnedDate
    ? new Date(earnedDate).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : null;

  const progressPercentage = Math.min(100, Math.max(0, (progress / maxProgress) * 100));

  return (
    <Card className={`
      w-full transition-all duration-300
      ${unlocked ? 'bg-gradient-to-br from-blue-50 to-white' : 'bg-gray-50 opacity-75'}
    `}>
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className={`
          p-2 rounded-full
          ${unlocked ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}
        `}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {maxProgress > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">
                  {progress} / {maxProgress} ({Math.floor(progressPercentage)}%)
                </span>
              </div>
              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{width: `${progressPercentage}%`}}
                />
              </div>
            </div>
          )}

          {unlocked && formattedDate && (
            <div className="text-xs text-muted-foreground">
              Earned on {formattedDate}
            </div>
          )}

          {!unlocked && (
            <div className="text-xs text-muted-foreground">
              {progressPercentage > 0 ? "In progress..." : "Not started"}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

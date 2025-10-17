import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Zap, Target, TrendingUp } from "lucide-react";

interface Milestone {
  label: string;
  target: number;
  icon: any;
  color: string;
}

const ProgressiveContributionTracker = () => {
  const currentContribution = 2500;
  const currentCredits = 1250;

  const milestones: Milestone[] = [
    { label: "Beginner", target: 1000, icon: Target, color: "text-muted-foreground" },
    { label: "Contributor", target: 2000, icon: Zap, color: "text-primary" },
    { label: "Champion", target: 5000, icon: TrendingUp, color: "text-earth" },
    { label: "Hero", target: 10000, icon: Trophy, color: "text-success" },
  ];

  const nextMilestone = milestones.find(m => m.target > currentContribution) || milestones[milestones.length - 1];
  const currentMilestoneIndex = milestones.findIndex(m => m.target > currentContribution);
  const previousTarget = currentMilestoneIndex > 0 ? milestones[currentMilestoneIndex - 1].target : 0;
  
  const progressToNext = ((currentContribution - previousTarget) / (nextMilestone.target - previousTarget)) * 100;
  const remaining = nextMilestone.target - currentContribution;

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 via-background to-success/5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Contribution Journey
        </h3>
        <Badge className="bg-primary text-primary-foreground">
          {currentCredits} Credits
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            Progress to {nextMilestone.label}
          </span>
          <span className="text-sm text-muted-foreground">
            ₹{remaining.toLocaleString()} to go
          </span>
        </div>
        <Progress value={progressToNext} className="h-3 mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>₹{previousTarget.toLocaleString()}</span>
          <span className="font-semibold text-primary">₹{currentContribution.toLocaleString()}</span>
          <span>₹{nextMilestone.target.toLocaleString()}</span>
        </div>
      </div>

      {/* Milestones */}
      <div className="space-y-3">
        {milestones.map((milestone, index) => {
          const isCompleted = currentContribution >= milestone.target;
          const isCurrent = milestone.target === nextMilestone.target;
          const Icon = milestone.icon;

          return (
            <div
              key={milestone.label}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                isCurrent ? 'bg-primary/10 border-2 border-primary/30' : 
                isCompleted ? 'bg-success/5 border border-success/20' : 
                'bg-muted/30 border border-border'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted ? 'bg-success text-success-foreground' :
                  isCurrent ? 'bg-primary text-primary-foreground animate-pulse' :
                  'bg-muted text-muted-foreground'
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-semibold ${milestone.color} ${isCompleted || isCurrent ? 'text-foreground' : ''}`}>
                    {milestone.label}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ₹{milestone.target.toLocaleString()}
                  </span>
                </div>
                {isCurrent && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {progressToNext.toFixed(0)}% complete
                  </p>
                )}
              </div>
              {isCompleted && (
                <Badge className="bg-success text-success-foreground text-xs">
                  ✓ Achieved
                </Badge>
              )}
            </div>
          );
        })}
      </div>

      {/* Next Reward Preview */}
      <div className="mt-4 p-4 bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20">
        <div className="flex items-center gap-2 text-sm">
          <Trophy className="h-4 w-4 text-success" />
          <span className="font-medium text-foreground">
            Next reward unlocks at {nextMilestone.label}!
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProgressiveContributionTracker;

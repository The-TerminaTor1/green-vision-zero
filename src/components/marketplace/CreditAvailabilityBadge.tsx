import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp, Activity } from "lucide-react";
import { useEffect, useState } from "react";

interface CreditAvailabilityBadgeProps {
  available: number;
  total: number;
}

const CreditAvailabilityBadge = ({ available, total }: CreditAvailabilityBadgeProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');
  
  const percentage = (available / total) * 100;
  
  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setIsUpdating(true);
      const randomTrend = Math.random();
      if (randomTrend > 0.6) setTrend('down');
      else if (randomTrend > 0.3) setTrend('up');
      else setTrend('stable');
      
      setTimeout(() => setIsUpdating(false), 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getVariant = () => {
    if (percentage > 60) return "bg-success text-success-foreground";
    if (percentage > 30) return "bg-earth text-earth-foreground";
    return "bg-destructive text-destructive-foreground";
  };

  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Activity;

  return (
    <div className="flex items-center gap-2">
      <Badge 
        className={`${getVariant()} transition-all duration-300 ${isUpdating ? 'scale-105' : 'scale-100'}`}
      >
        <TrendIcon className="h-3 w-3 mr-1 animate-pulse" />
        {available.toLocaleString()} Available
      </Badge>
      <div className="flex items-center gap-1">
        <div className="h-2 w-16 bg-secondary rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              percentage > 60 ? 'bg-success' : percentage > 30 ? 'bg-earth' : 'bg-destructive'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-xs text-muted-foreground">{percentage.toFixed(0)}%</span>
      </div>
    </div>
  );
};

export default CreditAvailabilityBadge;

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Globe, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const SocialProofWidget = () => {
  const [stats, setStats] = useState({
    activeUsers: 12543,
    recentPurchases: 234,
    countriesActive: 45,
    creditsToday: 8920
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5),
        recentPurchases: prev.recentPurchases + Math.floor(Math.random() * 3),
        countriesActive: prev.countriesActive,
        creditsToday: prev.creditsToday + Math.floor(Math.random() * 50)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: Users,
      label: "Active Users",
      value: stats.activeUsers.toLocaleString(),
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Zap,
      label: "Purchases Today",
      value: stats.recentPurchases,
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      icon: Globe,
      label: "Countries",
      value: stats.countriesActive,
      color: "text-earth",
      bgColor: "bg-earth/10"
    },
    {
      icon: TrendingUp,
      label: "Credits Traded Today",
      value: stats.creditsToday.toLocaleString(),
      color: "text-accent-foreground",
      bgColor: "bg-accent"
    }
  ];

  return (
    <section className="py-8 px-4">
      <div className="container mx-auto">
        <Card className="p-6 bg-gradient-to-r from-primary/5 via-success/5 to-earth/5 border-2 border-primary/20">
          <div className="text-center mb-6">
            <Badge className="bg-success text-success-foreground mb-3 animate-pulse">
              LIVE STATS
            </Badge>
            <h3 className="text-2xl font-bold text-foreground">
              Join Thousands Making an Impact
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item) => (
              <div
                key={item.label}
                className="text-center p-4 rounded-lg bg-background border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${item.bgColor} flex items-center justify-center`}>
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className={`text-2xl font-bold ${item.color} mb-1 transition-all duration-300`}>
                  {item.value}
                </div>
                <div className="text-xs text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              🌍 Real-time data from our global community
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SocialProofWidget;

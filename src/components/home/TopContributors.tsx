import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, TrendingUp, Leaf } from "lucide-react";

const TopContributors = () => {
  const contributors = [
    {
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      credits: 15420,
      projects: 12,
      impact: 771,
      rank: 1,
      badge: "Climate Champion",
      location: "San Francisco, CA",
    },
    {
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
      credits: 12850,
      projects: 9,
      impact: 642,
      rank: 2,
      badge: "Eco Warrior",
      location: "Austin, TX",
    },
    {
      name: "Priya Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      credits: 11200,
      projects: 11,
      impact: 560,
      rank: 3,
      badge: "Green Pioneer",
      location: "Mumbai, India",
    },
    {
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
      credits: 9875,
      projects: 8,
      impact: 493,
      rank: 4,
      badge: "Earth Guardian",
      location: "Barcelona, Spain",
    },
    {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      credits: 8650,
      projects: 7,
      impact: 432,
      rank: 5,
      badge: "Nature Defender",
      location: "London, UK",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-success/10 text-success border-success/20">
            Community Heroes
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Individual Contributors
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet the individuals making the biggest impact on our planet's future
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 mb-12">
          {contributors.map((contributor, index) => (
            <Card
              key={contributor.name}
              className={`p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group animate-scale-in relative overflow-hidden ${
                contributor.rank <= 3
                  ? "border-2 border-primary/30 bg-gradient-to-b from-primary/5 to-background"
                  : ""
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-success/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="text-center relative z-10">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-20 h-20 border-4 border-background shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <AvatarImage src={contributor.avatar} alt={contributor.name} />
                    <AvatarFallback>{contributor.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                  </Avatar>
                  {contributor.rank <= 3 && (
                    <div
                      className={`absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center animate-bounce-slow ${
                        contributor.rank === 1
                          ? "bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50"
                          : contributor.rank === 2
                          ? "bg-gradient-to-br from-gray-300 to-gray-500 shadow-lg shadow-gray-400/50"
                          : "bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/50"
                      }`}
                    >
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-lg text-foreground mb-1">
                  {contributor.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{contributor.location}</p>

                <Badge
                  variant="outline"
                  className="mb-4 bg-success/10 text-success border-success/30"
                >
                  {contributor.badge}
                </Badge>

                <div className="space-y-3">
                  <div className="p-3 bg-secondary/50 rounded-lg group-hover:shadow-lg transition-shadow duration-300 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-success/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1 relative z-10">
                      <Leaf className="h-3 w-3 animate-wiggle" />
                      <span>Credits Earned</span>
                    </div>
                    <p className="text-xl font-bold text-primary group-hover:scale-110 transition-transform relative z-10">
                      {contributor.credits.toLocaleString()}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-secondary/30 rounded hover:bg-secondary/50 transition-colors group/stat">
                      <p className="text-xs text-muted-foreground">Projects</p>
                      <p className="text-sm font-bold text-foreground group-hover/stat:scale-110 transition-transform">{contributor.projects}</p>
                    </div>
                    <div className="p-2 bg-secondary/30 rounded hover:bg-secondary/50 transition-colors group/stat">
                      <p className="text-xs text-muted-foreground">CO₂ Impact</p>
                      <p className="text-sm font-bold text-success group-hover/stat:scale-110 transition-transform">{contributor.impact}T</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-success/5 to-primary/5 border-success/20 hover:shadow-2xl transition-all duration-500 animate-fade-in group">
          <div className="flex items-center gap-4 flex-wrap justify-center text-center">
            <div className="p-3 bg-background rounded-full group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <TrendingUp className="h-8 w-8 text-success animate-float" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform">
                Join the Leaderboard
              </h3>
              <p className="text-muted-foreground">
                Start your journey today and make a real difference for future generations
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TopContributors;

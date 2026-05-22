import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  TrendingUp,
  TreeDeciduous,
  Gift,
  CheckCircle,
  Trophy,
  Target,
  Clock,
} from "lucide-react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import ProgressiveContributionTracker from "@/components/dashboard/ProgressiveContributionTracker";
import CertificateModal from "@/components/dashboard/CertificateModal";
import { useState } from "react";

const UserDashboard = () => {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const userData = {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    credits: 1250,
    totalContributions: 2500,
    co2Offset: 125,
    level: "Gold Contributor",
  };

  const contributionData = [
    { name: "Reforestation", value: 45, color: "hsl(var(--success))" },
    { name: "Renewable Energy", value: 30, color: "hsl(var(--primary))" },
    { name: "Water Conservation", value: 25, color: "hsl(var(--accent-foreground))" },
  ];

  const recentContributions = [
    {
      id: 1,
      project: "Amazon Rainforest Restoration",
      amount: 500,
      date: "2024-01-15",
      status: "verified",
    },
    {
      id: 2,
      project: "Mangrove Conservation Project",
      amount: 300,
      date: "2024-01-10",
      status: "verified",
    },
    {
      id: 3,
      project: "Urban Forest Initiative",
      amount: 200,
      date: "2024-01-05",
      status: "pending",
    },
  ];

  const badges = [
    { name: "Early Adopter", icon: Award, earned: true },
    { name: "Tree Planter", icon: TreeDeciduous, earned: true },
    { name: "Carbon Warrior", icon: Target, earned: true },
    { name: "Community Leader", icon: Trophy, earned: false },
  ];

  const rewards = [
    { name: "Amazon Gift Card", points: 1000, available: true },
    { name: "Eco-Friendly Products", points: 750, available: true },
    { name: "Premium Badge", points: 1500, available: false },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  {userData.name}
                </h1>
                <p className="text-muted-foreground mb-3">{userData.email}</p>
                <Badge className="bg-success text-success-foreground">
                  {userData.level}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userData.credits}</div>
                  <div className="text-xs text-muted-foreground">Credits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-success">{userData.co2Offset}</div>
                  <div className="text-xs text-muted-foreground">Tons CO₂</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-earth">₹{userData.totalContributions}</div>
                  <div className="text-xs text-muted-foreground">Contributed</div>
                </div>
              </div>
            </div>
          </Card>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="contributions">Contributions</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
              <TabsTrigger value="badges">Badges</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Progressive Contribution Tracker */}
              <ProgressiveContributionTracker />
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Contribution Breakdown */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Contribution Breakdown
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={contributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {contributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {contributionData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">{item.name}</span>
                        </div>
                        <span className="text-sm font-semibold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Progress Toward Goals */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Progress Toward Goals
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Monthly Target</span>
                        <span className="text-sm text-muted-foreground">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        ₹750 of ₹1,000 goal
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Annual Impact</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        125 of 300 tons CO₂
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Community Rank</span>
                        <span className="text-sm text-muted-foreground">Top 15%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        #750 of 5,000 users
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Contributions Tab */}
            <TabsContent value="contributions">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Recent Contributions</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Every contribution issues a verifiable certificate of impact
                    </p>
                  </div>
                  <Badge variant="outline" className="hidden md:flex">
                    {recentContributions.length} total
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {recentContributions.map((contribution) => {
                    const isVerified = contribution.status === "verified";
                    const credits = Math.round(contribution.amount / 2);
                    const co2 = (contribution.amount / 10).toFixed(1);

                    return (
                      <Card
                        key={contribution.id}
                        className="group relative overflow-hidden border hover:border-primary/40 hover:shadow-lg transition-all duration-300"
                      >
                        {/* Accent strip */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 ${
                            isVerified ? "bg-success" : "bg-muted-foreground/30"
                          }`}
                        />

                        <div className="p-5 pl-6 flex flex-col md:flex-row md:items-center gap-5">
                          {/* Icon */}
                          <div
                            className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                              isVerified
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {isVerified ? (
                              <Award className="h-6 w-6" />
                            ) : (
                              <Clock className="h-6 w-6" />
                            )}
                          </div>

                          {/* Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <h4 className="font-semibold text-foreground leading-tight">
                                {contribution.project}
                              </h4>
                              <Badge
                                variant={isVerified ? "default" : "secondary"}
                                className={
                                  isVerified
                                    ? "bg-success/10 text-success hover:bg-success/20 border-success/20"
                                    : ""
                                }
                              >
                                {isVerified ? (
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                ) : (
                                  <Clock className="h-3 w-3 mr-1" />
                                )}
                                {contribution.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted-foreground">
                              <span>
                                {new Date(contribution.date).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <span className="font-semibold text-primary">₹{contribution.amount}</span>
                                contributed
                              </span>
                              <span>
                                <span className="font-semibold text-foreground">{credits}</span> credits
                              </span>
                              <span>
                                <span className="font-semibold text-success">{co2} kg</span> CO₂
                              </span>
                            </div>
                          </div>

                          {/* Action */}
                          <div className="shrink-0">
                            {isVerified ? (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setSelectedCert(contribution)}
                                className="border-success/30 text-success hover:bg-success hover:text-success-foreground transition-colors"
                              >
                                <Award className="h-4 w-4 mr-2" />
                                Show Certificate
                              </Button>
                            ) : (
                              <Button size="sm" variant="ghost" disabled>
                                <Clock className="h-4 w-4 mr-2" />
                                Awaiting verification
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            </TabsContent>

            {/* Rewards Tab */}
            <TabsContent value="rewards">
              <div className="grid md:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card
                    key={reward.name}
                    className={`p-6 ${
                      !reward.available ? "opacity-60" : "hover:shadow-lg transition-shadow"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Gift className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{reward.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {reward.points} points
                        </p>
                      </div>
                    </div>
                    <Badge variant={reward.available ? "default" : "secondary"} className="w-full justify-center">
                      {reward.available ? "Available" : "Locked"}
                    </Badge>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Badges Tab */}
            <TabsContent value="badges">
              <div className="grid md:grid-cols-4 gap-6">
                {badges.map((badge) => (
                  <Card
                    key={badge.name}
                    className={`p-6 text-center ${
                      !badge.earned ? "opacity-60" : "hover:shadow-lg transition-shadow"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        badge.earned ? "bg-success/10" : "bg-muted"
                      }`}
                    >
                      <badge.icon
                        className={`h-8 w-8 ${
                          badge.earned ? "text-success" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <h4 className="font-semibold text-foreground mb-2">{badge.name}</h4>
                    <Badge variant={badge.earned ? "default" : "secondary"} className={badge.earned ? "bg-success text-success-foreground" : ""}>
                      {badge.earned ? "Earned" : "Locked"}
                    </Badge>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;

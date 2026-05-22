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
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Recent Contributions
                </h3>
                <div className="space-y-4">
                  {recentContributions.map((contribution) => (
                    <div
                      key={contribution.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {contribution.project}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(contribution.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right mr-4">
                        <div className="font-semibold text-primary">
                          ₹{contribution.amount}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {contribution.amount / 2} credits
                        </div>
                      </div>
                      <Badge
                        variant={contribution.status === "verified" ? "default" : "secondary"}
                        className={
                          contribution.status === "verified"
                            ? "bg-success text-success-foreground"
                            : ""
                        }
                      >
                        {contribution.status === "verified" ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : null}
                        {contribution.status}
                      </Badge>
                    </div>
                  ))}
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

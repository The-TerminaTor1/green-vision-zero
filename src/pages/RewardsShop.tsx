import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  ShoppingCart, 
  Star, 
  Gift, 
  Smartphone, 
  Coffee,
  Zap,
  Award,
  TrendingUp
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const RewardsShop = () => {
  const { isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userCredits] = useState(450); // Mock user credits

  const rewards = [
    {
      id: 1,
      title: "Amazon Gift Card - ₹500",
      company: "Amazon",
      category: "Gift Cards",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
      credits: 100,
      inStock: true,
      popular: true,
      icon: Gift,
    },
    {
      id: 2,
      title: "Starbucks Coffee Voucher",
      company: "Starbucks",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&q=80",
      credits: 50,
      inStock: true,
      popular: true,
      icon: Coffee,
    },
    {
      id: 3,
      title: "Wireless Earbuds",
      company: "TechGear",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80",
      credits: 300,
      inStock: true,
      popular: false,
      icon: Smartphone,
    },
    {
      id: 4,
      title: "Premium Plant Subscription",
      company: "GreenBox",
      category: "Lifestyle",
      image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&q=80",
      credits: 150,
      inStock: true,
      popular: true,
      icon: Award,
    },
    {
      id: 5,
      title: "Eco-Friendly Backpack",
      company: "EcoStyle",
      category: "Fashion",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80",
      credits: 200,
      inStock: true,
      popular: false,
      icon: Gift,
    },
    {
      id: 6,
      title: "Solar Power Bank",
      company: "SolarTech",
      category: "Electronics",
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&q=80",
      credits: 180,
      inStock: true,
      popular: false,
      icon: Zap,
    },
    {
      id: 7,
      title: "Flipkart Voucher - ₹1000",
      company: "Flipkart",
      category: "Gift Cards",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
      credits: 190,
      inStock: true,
      popular: true,
      icon: Gift,
    },
    {
      id: 8,
      title: "Organic Tea Collection",
      company: "TeaTime",
      category: "Food & Beverage",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80",
      credits: 80,
      inStock: false,
      popular: false,
      icon: Coffee,
    },
  ];

  const categories = ["All", "Gift Cards", "Electronics", "Food & Beverage", "Fashion", "Lifestyle"];

  const handleRedeem = (reward: any) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (userCredits < reward.credits) {
      toast({
        title: "Insufficient credits",
        description: `You need ${reward.credits - userCredits} more credits to redeem this reward`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reward redeemed!",
      description: `You've successfully redeemed ${reward.title}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-accent-foreground text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Rewards Shop</h1>
              <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
                Exchange your carbon credits for amazing rewards from top brands
              </p>
            </div>
            
            {isAuthenticated && (
              <Card className="max-w-md mx-auto p-6 bg-card/95 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Credits</p>
                    <p className="text-3xl font-bold text-foreground">{userCredits}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-full">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-success flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    You earned 50 credits this month!
                  </p>
                </div>
              </Card>
            )}
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search rewards..." 
                className="pl-10 py-6 text-lg"
              />
            </div>

            <Tabs defaultValue="All" className="w-full">
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category}>
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="All" className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">All Rewards</h2>
                  <p className="text-muted-foreground">{rewards.length} items available</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {rewards.map((reward) => (
                    <Card 
                      key={reward.id} 
                      className={`overflow-hidden hover:shadow-xl transition-all duration-300 ${
                        !reward.inStock ? "opacity-60" : ""
                      }`}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={reward.image}
                          alt={reward.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                        {reward.popular && (
                          <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
                            <Star className="h-3 w-3 mr-1 fill-white" />
                            Popular
                          </Badge>
                        )}
                        {!reward.inStock && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Badge variant="secondary">Out of Stock</Badge>
                          </div>
                        )}
                        <Badge className="absolute top-3 left-3 bg-primary">
                          {reward.category}
                        </Badge>
                      </div>

                      <div className="p-5">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {reward.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          by {reward.company}
                        </p>

                        <div className="flex items-center justify-between mb-4 pb-4 border-b">
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" />
                            <span className="text-xl font-bold text-primary">
                              {reward.credits}
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">credits</span>
                        </div>

                        <Button 
                          className="w-full"
                          disabled={!reward.inStock || (isAuthenticated && userCredits < reward.credits)}
                          onClick={() => handleRedeem(reward)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {!reward.inStock 
                            ? "Out of Stock" 
                            : isAuthenticated && userCredits < reward.credits
                            ? "Insufficient Credits"
                            : "Redeem Now"
                          }
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {categories.slice(1).map((category) => (
                <TabsContent key={category} value={category}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rewards
                      .filter(r => r.category === category)
                      .map((reward) => (
                        <Card key={reward.id} className="overflow-hidden">
                          {/* Same card structure as above */}
                          <div className="relative h-48 overflow-hidden">
                            <img
                              src={reward.image}
                              alt={reward.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-bold mb-2">{reward.title}</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              by {reward.company}
                            </p>
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-primary" />
                                <span className="text-xl font-bold">{reward.credits}</span>
                              </div>
                            </div>
                            <Button className="w-full" onClick={() => handleRedeem(reward)}>
                              <ShoppingCart className="h-4 w-4 mr-2" />
                              Redeem Now
                            </Button>
                          </div>
                        </Card>
                      ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RewardsShop;

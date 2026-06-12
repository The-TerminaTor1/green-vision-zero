import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, ArrowRight, LayoutDashboard, ShoppingBag } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const PersonalizedWelcome = () => {
  const { isAuthenticated, profile, user, role } = useAuth();
  if (!isAuthenticated) return null;

  const name = profile?.full_name?.split(" ")[0] || user?.email?.split("@")[0] || "there";
  const initials = (profile?.full_name || user?.email || "U").slice(0, 2).toUpperCase();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const dashboardPath =
    role === "firm" ? "/firm-dashboard" :
    role === "corporate" ? "/corporate-dashboard" :
    role === "admin" ? "/admin-panel" : "/dashboard";

  const subline =
    role === "firm" ? "Manage your projects and reach new buyers." :
    role === "corporate" ? "Browse verified credits to hit your net-zero targets." :
    role === "admin" ? "Keep the platform healthy and verified." :
    "Make a contribution today and grow your impact.";

  return (
    <section className="container mx-auto px-4 -mt-6 relative z-10">
      <Card className="p-5 md:p-6 bg-gradient-to-r from-primary/10 via-success/5 to-background border-primary/20 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Avatar className="h-14 w-14 ring-2 ring-primary/30">
            <AvatarImage src={profile?.avatar_url ?? undefined} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              {greeting}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Welcome back, {name}!
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">{subline}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to={dashboardPath}>
                <LayoutDashboard className="h-4 w-4 mr-2" />
                Dashboard
              </Link>
            </Button>
            <Button asChild>
              <Link to="/marketplace">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Marketplace
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PersonalizedWelcome;

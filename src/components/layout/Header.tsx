import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, Menu, X, LogOut, User, Building2, ShoppingBag, LayoutDashboard, Upload, Settings } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationsBell from "@/components/layout/NotificationsBell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role, isAuthenticated, logout, profile, user } = useAuth();

  const getNavItems = () => {
    const baseItems = [
      { name: "Home", path: "/" },
      { name: "Marketplace", path: "/marketplace" },
    ];
    if (role === "individual") baseItems.push({ name: "Rewards", path: "/rewards" });
    return baseItems;
  };

  const navItems = getNavItems();
  const isActive = (path: string) => location.pathname === path;

  const getRoleDisplay = () => {
    if (!role) return null;
    const cfg: Record<string, { label: string; icon: any }> = {
      individual: { label: "Individual", icon: User },
      firm: { label: "Firm", icon: Building2 },
      corporate: { label: "Corporate", icon: ShoppingBag },
      admin: { label: "Admin", icon: Settings },
    };
    const c = cfg[role];
    if (!c) return null;
    const Icon = c.icon;
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {c.label}
      </Badge>
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const getDashboardPath = () => {
    switch (role) {
      case "individual": return "/dashboard";
      case "firm": return "/firm-dashboard";
      case "corporate": return "/corporate-dashboard";
      case "admin": return "/admin-panel";
      default: return "/";
    }
  };

  const displayName = profile?.full_name || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Leaf className="h-6 w-6" />
            <span>Nirmal Carbon</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${isActive(item.path) ? "text-primary" : "text-muted-foreground"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {getRoleDisplay()}
                <NotificationsBell />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url ?? undefined} alt={displayName} />
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium max-w-[120px] truncate">{displayName}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-semibold">{displayName}</span>
                        <span className="text-xs text-muted-foreground font-normal truncate">{user?.email}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    {role === "firm" && (
                      <DropdownMenuItem onClick={() => navigate("/firm-dashboard?upload=true")}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Project
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium ${isActive(item.path) ? "text-primary" : "text-muted-foreground"}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-2 py-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url ?? undefined} />
                        <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">{displayName}</span>
                      {getRoleDisplay()}
                    </div>
                    <Button variant="ghost" onClick={() => { navigate(getDashboardPath()); setMobileMenuOpen(false); }}>
                      <LayoutDashboard className="h-4 w-4 mr-2" />Dashboard
                    </Button>
                    <Button variant="ghost" onClick={() => { navigate("/profile"); setMobileMenuOpen(false); }}>
                      <Settings className="h-4 w-4 mr-2" />Profile
                    </Button>
                    <Button variant="ghost" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />Logout
                    </Button>
                  </>
                ) : (
                  <Button asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

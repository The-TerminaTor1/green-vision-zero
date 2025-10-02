import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Building2, ShoppingBag, Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/marketplace");
    }
  }, [isAuthenticated, navigate]);

  const handleRoleSelect = (role: "individual" | "firm" | "corporate") => {
    login(role);
    navigate("/marketplace");
  };

  const roles = [
    {
      id: "individual",
      title: "Individual User",
      description: "Track contributions, earn rewards, and offset your carbon footprint",
      icon: User,
      color: "from-green-500 to-emerald-600",
    },
    {
      id: "firm",
      title: "Plantation Firm",
      description: "Manage projects, issue credits, and showcase your plantations",
      icon: Building2,
      color: "from-blue-500 to-cyan-600",
    },
    {
      id: "corporate",
      title: "Corporate Buyer",
      description: "Purchase carbon credits and achieve your net-zero goals",
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">GreenVision</h1>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">Select Your Role</h2>
        <p className="text-muted-foreground">Choose how you want to participate in our Net Zero journey</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl w-full">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <Card
              key={role.id}
              className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2 hover:border-primary/50"
              onClick={() => handleRoleSelect(role.id as "individual" | "firm" | "corporate")}
            >
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{role.title}</h3>
              <p className="text-muted-foreground mb-6">{role.description}</p>
              <Button className="w-full" variant="outline">
                Continue as {role.title}
              </Button>
            </Card>
          );
        })}
      </div>

      <p className="text-sm text-muted-foreground mt-8">
        This is a demo login. Select any role to explore the platform.
      </p>
    </div>
  );
};

export default Login;

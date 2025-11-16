import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Building2, ShoppingBag, Leaf } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState<"individual" | "firm" | "corporate">("individual");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerName, setRegisterName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/marketplace");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, loginPassword);
    if (success) {
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      navigate("/marketplace");
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const success = register(registerEmail, registerPassword, registerName, selectedRole);
    if (success) {
      toast({
        title: "Account created!",
        description: "You've successfully registered.",
      });
      navigate("/marketplace");
    } else {
      toast({
        title: "Registration failed",
        description: "Email already exists.",
        variant: "destructive",
      });
    }
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4 py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Leaf className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">Nirmal Carbon</h1>
        </div>
        <p className="text-muted-foreground">Join the journey to Net Zero emissions</p>
      </div>

      <Card className="w-full max-w-md p-6">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">Login</Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>

              <div className="space-y-3">
                <Label>Select Your Role</Label>
                <div className="grid grid-cols-1 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.id}
                        onClick={() => setSelectedRole(role.id as "individual" | "firm" | "corporate")}
                        className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedRole === role.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-sm">{role.title}</p>
                          <p className="text-xs text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      <p className="text-sm text-muted-foreground mt-6 text-center max-w-md">
        Demo mode: Create an account or login to explore the platform
      </p>
    </div>
  );
};

export default Login;

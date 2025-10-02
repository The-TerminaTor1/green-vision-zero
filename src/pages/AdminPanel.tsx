import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Building2, 
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const AdminPanel = () => {
  const systemStats = {
    totalUsers: 50234,
    totalFirms: 156,
    corporateBuyers: 89,
    totalCredits: 2500000,
    co2Offset: 150000,
    activeProjects: 120,
    pendingApprovals: 8,
  };

  const revenueData = [
    { month: "Jan", revenue: 85000 },
    { month: "Feb", revenue: 92000 },
    { month: "Mar", revenue: 98000 },
    { month: "Apr", revenue: 105000 },
    { month: "May", revenue: 112000 },
    { month: "Jun", revenue: 120000 },
  ];

  const pendingProjects = [
    {
      id: 1,
      title: "New Amazon Reforestation Initiative",
      firm: "GreenTree Corp",
      credits: 45000,
      submittedDate: "2024-01-20",
    },
    {
      id: 2,
      title: "Coastal Wetland Restoration",
      firm: "OceanGuard Foundation",
      credits: 32000,
      submittedDate: "2024-01-18",
    },
  ];

  const recentUsers = [
    { id: 1, name: "John Smith", email: "john@email.com", type: "User", joinedDate: "2024-01-15" },
    { id: 2, name: "EcoTech Solutions", email: "contact@ecotech.com", type: "Firm", joinedDate: "2024-01-14" },
    { id: 3, name: "Sarah Johnson", email: "sarah@email.com", type: "User", joinedDate: "2024-01-13" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Panel</h1>
            <p className="text-muted-foreground">System overview and management</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total Users</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {systemStats.totalUsers.toLocaleString()}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="h-5 w-5 text-success" />
                <span className="text-sm text-muted-foreground">Firms</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {systemStats.totalFirms}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="h-5 w-5 text-accent-foreground" />
                <span className="text-sm text-muted-foreground">Active Projects</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {systemStats.activeProjects}
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="h-5 w-5 text-earth" />
                <span className="text-sm text-muted-foreground">Pending</span>
              </div>
              <div className="text-2xl font-bold text-foreground">
                {systemStats.pendingApprovals}
              </div>
            </Card>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="firms">Firms</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Platform Revenue
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={revenueData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                {/* System Health */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    System Health
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-success" />
                        <div>
                          <div className="font-semibold">Database</div>
                          <div className="text-sm text-muted-foreground">All systems operational</div>
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-success" />
                        <div>
                          <div className="font-semibold">API Services</div>
                          <div className="text-sm text-muted-foreground">99.9% uptime</div>
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-success/10 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-6 w-6 text-success" />
                        <div>
                          <div className="font-semibold">Payment Gateway</div>
                          <div className="text-sm text-muted-foreground">No issues detected</div>
                        </div>
                      </div>
                      <Badge className="bg-success text-success-foreground">Healthy</Badge>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Impact Overview */}
              <Card className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Global Impact Overview
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {(systemStats.totalCredits / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-muted-foreground">Total Credits in System</div>
                  </div>
                  <div className="text-center p-6 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-success mb-2">
                      {(systemStats.co2Offset / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
                  </div>
                  <div className="text-center p-6 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-earth mb-2">
                      {systemStats.activeProjects}
                    </div>
                    <div className="text-sm text-muted-foreground">Active Projects</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">User Management</h3>
                  <Button variant="outline">Export Users</Button>
                </div>
                <div className="space-y-3">
                  {recentUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <div className="font-semibold text-foreground">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>{user.type}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(user.joinedDate).toLocaleDateString()}
                        </span>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Pending Project Approvals
                </h3>
                <div className="space-y-4">
                  {pendingProjects.map((project) => (
                    <div
                      key={project.id}
                      className="p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">
                            {project.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            by {project.firm}
                          </p>
                        </div>
                        <Badge variant="secondary">Pending Review</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          {project.credits.toLocaleString()} credits • Submitted{" "}
                          {new Date(project.submittedDate).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle className="h-8 w-8 text-earth" />
                  <div>
                    <h3 className="text-xl font-bold">Fraud & Validation Monitoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time fraud detection and validation alerts
                    </p>
                  </div>
                </div>
                <div className="p-6 bg-success/10 rounded-lg border border-success/20 text-center">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-3" />
                  <p className="font-semibold text-success mb-1">No Issues Detected</p>
                  <p className="text-sm text-muted-foreground">
                    All transactions and certifications are valid
                  </p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;

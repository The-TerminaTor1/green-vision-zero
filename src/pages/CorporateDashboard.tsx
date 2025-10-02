import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  Wallet, 
  TrendingDown,
  Download,
  FileText,
  Target
} from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const CorporateDashboard = () => {
  const corporateData = {
    company: "Global Industries Corp",
    creditBalance: 85000,
    totalPurchased: 150000,
    co2Offset: 7500,
    targetReduction: 10000,
  };

  const emissionsData = [
    { month: "Jan", emissions: 1200, offset: 800 },
    { month: "Feb", emissions: 1150, offset: 900 },
    { month: "Mar", emissions: 1100, offset: 1000 },
    { month: "Apr", emissions: 1050, offset: 1100 },
    { month: "May", emissions: 1000, offset: 1200 },
    { month: "Jun", emissions: 950, offset: 1300 },
  ];

  const purchaseHistory = [
    {
      id: 1,
      project: "Amazon Rainforest Restoration",
      credits: 10000,
      cost: 120000,
      date: "2024-01-15",
      certificate: true,
    },
    {
      id: 2,
      project: "Wind Energy Initiative",
      credits: 15000,
      cost: 270000,
      date: "2024-01-10",
      certificate: true,
    },
    {
      id: 3,
      project: "Mangrove Conservation",
      credits: 8000,
      cost: 80000,
      date: "2024-01-05",
      certificate: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              {corporateData.company} Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {corporateData.creditBalance.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Credit Balance</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-success mb-1">
                  {corporateData.co2Offset.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-earth mb-1">
                  {corporateData.totalPurchased.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Credits Purchased</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-accent-foreground mb-1">
                  {Math.round((corporateData.co2Offset / corporateData.targetReduction) * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Target Progress</div>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="marketplace">Purchase Credits</TabsTrigger>
              <TabsTrigger value="history">Purchase History</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Emissions Tracking */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">
                    Emissions vs Offset
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={emissionsData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="emissions"
                          stackId="1"
                          stroke="hsl(var(--destructive))"
                          fill="hsl(var(--destructive) / 0.2)"
                        />
                        <Area
                          type="monotone"
                          dataKey="offset"
                          stackId="2"
                          stroke="hsl(var(--success))"
                          fill="hsl(var(--success) / 0.2)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-destructive/20 border-2 border-destructive rounded" />
                      <span className="text-muted-foreground">Emissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-success/20 border-2 border-success rounded" />
                      <span className="text-muted-foreground">Carbon Offset</span>
                    </div>
                  </div>
                </Card>

                {/* Target Progress */}
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Target className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Carbon Neutrality Goal</h3>
                      <p className="text-sm text-muted-foreground">Annual target progress</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">CO₂ Reduction</span>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((corporateData.co2Offset / corporateData.targetReduction) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(corporateData.co2Offset / corporateData.targetReduction) * 100}
                        className="h-3"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {corporateData.co2Offset.toLocaleString()} of{" "}
                        {corporateData.targetReduction.toLocaleString()} tons
                      </p>
                    </div>

                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingDown className="h-5 w-5 text-success" />
                        <span className="font-semibold text-success">On Track</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        You're ahead of schedule to meet your annual carbon neutrality target.
                      </p>
                    </div>

                    <Button className="w-full">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Purchase More Credits
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Credit Wallet */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Wallet className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="text-xl font-bold">Credit Wallet</h3>
                      <p className="text-sm text-muted-foreground">
                        Available carbon credits
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {corporateData.creditBalance.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">credits available</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Marketplace Tab */}
            <TabsContent value="marketplace">
              <Card className="p-6 text-center">
                <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-bold mb-2">Purchase Carbon Credits</h3>
                <p className="text-muted-foreground mb-6">
                  Browse verified projects and purchase credits to offset your emissions.
                </p>
                <Button size="lg">Go to Marketplace</Button>
              </Card>
            </TabsContent>

            {/* Purchase History Tab */}
            <TabsContent value="history">
              <Card className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Purchase History
                </h3>
                <div className="space-y-4">
                  {purchaseHistory.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {purchase.project}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {new Date(purchase.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right mr-6">
                        <div className="font-semibold text-primary">
                          {purchase.credits.toLocaleString()} credits
                        </div>
                        <div className="text-sm text-muted-foreground">
                          ${(purchase.cost / 1000).toFixed(0)}K
                        </div>
                      </div>
                      {purchase.certificate && (
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Certificate
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">ESG Report</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive Environmental, Social, and Governance report
                  </p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </Card>

                <Card className="p-6">
                  <FileText className="h-12 w-12 text-success mb-4" />
                  <h3 className="text-xl font-bold mb-2">Carbon Footprint Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    Detailed breakdown of your carbon offset activities
                  </p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CorporateDashboard;

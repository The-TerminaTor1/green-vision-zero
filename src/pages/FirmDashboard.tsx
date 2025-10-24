import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Wallet, 
  CheckCircle,
  TrendingUp,
  Plus
} from "lucide-react";
import CertificationManager from "@/components/firm/CertificationManager";
import TransactionLedger from "@/components/firm/TransactionLedger";
import ProjectManagementModal from "@/components/marketplace/ProjectManagementModal";
import UploadProjectModal from "@/components/firm/UploadProjectModal";

const FirmDashboard = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const firmData = {
    name: "EcoForest Initiative",
    totalCreditsIssued: 250000,
    availableCredits: 150000,
    soldCredits: 100000,
    activeProjects: 12,
    revenue: 1200000,
  };

  const projects = [
    {
      id: 1,
      title: "Amazon Rainforest Restoration",
      status: "active",
      creditsIssued: 50000,
      creditsSold: 35000,
      verified: true,
    },
    {
      id: 2,
      title: "Coastal Mangrove Protection",
      status: "active",
      creditsIssued: 40000,
      creditsSold: 28000,
      verified: true,
    },
    {
      id: 3,
      title: "Urban Reforestation Program",
      status: "pending",
      creditsIssued: 30000,
      creditsSold: 0,
      verified: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header Stats */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-6">
              {firmData.name} Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {firmData.totalCreditsIssued.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Credits Issued</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-success mb-1">
                  {firmData.availableCredits.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Available Credits</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-earth mb-1">
                  {firmData.soldCredits.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Credits Sold</div>
              </Card>
              <Card className="p-6">
                <div className="text-2xl font-bold text-accent-foreground mb-1">
                  ${(firmData.revenue / 1000).toFixed(0)}K
                </div>
                <div className="text-sm text-muted-foreground">Total Revenue</div>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="credits">Credit Bank</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="ledger">Ledger</TabsTrigger>
              <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
            </TabsList>

            {/* Projects Tab */}
            <TabsContent value="projects">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Your Projects</h2>
                <Button onClick={() => setIsUploadModalOpen(true)} className="hover:scale-105 transition-transform">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload New Project
                </Button>
              </div>

              <div className="space-y-4">
                {projects.map((project) => (
                  <Card key={project.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {project.title}
                          </h3>
                          <Badge
                            variant={project.status === "active" ? "default" : "secondary"}
                            className={
                              project.status === "active"
                                ? "bg-success text-success-foreground"
                                : ""
                            }
                          >
                            {project.status}
                          </Badge>
                          {project.verified && (
                            <Badge className="bg-primary text-primary-foreground">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                          <div>
                            <div className="text-sm text-muted-foreground">Credits Issued</div>
                            <div className="text-lg font-semibold text-foreground">
                              {project.creditsIssued.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Credits Sold</div>
                            <div className="text-lg font-semibold text-success">
                              {project.creditsSold.toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground">Available</div>
                            <div className="text-lg font-semibold text-primary">
                              {(project.creditsIssued - project.creditsSold).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedProject(project);
                            setIsModalOpen(true);
                          }}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Manage Project
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Credit Bank Tab */}
            <TabsContent value="credits">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Wallet className="h-8 w-8 text-primary" />
                  <div>
                    <h2 className="text-2xl font-bold">Credit Bank</h2>
                    <p className="text-muted-foreground">
                      Manage and track your carbon credits
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="p-6 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {firmData.totalCreditsIssued.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Credits Issued</div>
                  </div>
                  <div className="p-6 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-success mb-2">
                      {firmData.availableCredits.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Available for Sale</div>
                  </div>
                  <div className="p-6 bg-secondary rounded-lg">
                    <div className="text-3xl font-bold text-earth mb-2">
                      {firmData.soldCredits.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Credits Sold</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-accent rounded-lg">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6 text-accent-foreground" />
                    <div>
                      <div className="font-semibold text-accent-foreground">
                        Sales Performance
                      </div>
                      <div className="text-sm text-accent-foreground/80">
                        40% of credits sold (Industry avg: 35%)
                      </div>
                    </div>
                  </div>
                  <Button>View Ledger</Button>
                </div>
              </Card>
            </TabsContent>

            {/* Certifications Tab */}
            <TabsContent value="certifications">
              <CertificationManager />
            </TabsContent>

            {/* Ledger Tab */}
            <TabsContent value="ledger">
              <TransactionLedger />
            </TabsContent>

            {/* Marketplace Tab */}
            <TabsContent value="marketplace">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Marketplace Listing</h2>
                <p className="text-muted-foreground mb-6">
                  Preview how your projects appear to buyers in the marketplace.
                </p>
                <Button>View Live Listings</Button>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      <ProjectManagementModal
        project={selectedProject}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
      
      <UploadProjectModal
        open={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />
    </div>
  );
};

export default FirmDashboard;

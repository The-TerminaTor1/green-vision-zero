import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Search, 
  MapPin, 
  CheckCircle, 
  ShoppingCart,
  Filter,
  TrendingUp,
  Upload,
  DollarSign,
  Eye
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import CreditAvailabilityBadge from "@/components/marketplace/CreditAvailabilityBadge";
import InteractivePricingSlider from "@/components/marketplace/InteractivePricingSlider";

const Marketplace = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { role, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const contributionProjects = [
    {
      id: 1,
      title: "Plant 10 Trees in Amazon",
      provider: "EcoForest Initiative",
      location: "Brazil",
      type: "Tree Plantation",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      credits: 5,
      price: 499,
      verified: true,
      impact: "50 kg CO₂/year",
      description: "Contribute to Amazon reforestation",
    },
    {
      id: 2,
      title: "Solar Panel Contribution",
      provider: "SunPower Solutions",
      location: "India",
      type: "Renewable Energy",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      credits: 8,
      price: 799,
      verified: true,
      impact: "80 kg CO₂/year",
      description: "Support solar energy expansion",
    },
    {
      id: 3,
      title: "Mangrove Conservation",
      provider: "Coastal Guardians",
      location: "Indonesia",
      type: "Coastal Restoration",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      credits: 6,
      price: 599,
      verified: true,
      impact: "60 kg CO₂/year",
      description: "Protect coastal ecosystems",
    },
    {
      id: 4,
      title: "Wind Energy Support",
      provider: "WindTech Corp",
      location: "Denmark",
      type: "Renewable Energy",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      credits: 10,
      price: 999,
      verified: true,
      impact: "100 kg CO₂/year",
      description: "Contribute to wind energy",
    },
    {
      id: 5,
      title: "Clean Water Initiative",
      provider: "AquaPure Foundation",
      location: "Kenya",
      type: "Water Conservation",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      credits: 4,
      price: 399,
      verified: true,
      impact: "40 kg CO₂/year",
      description: "Support clean water access",
    },
    {
      id: 6,
      title: "Urban Forest Pack",
      provider: "Green Cities Alliance",
      location: "Singapore",
      type: "Urban Greening",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      credits: 7,
      price: 699,
      verified: true,
      impact: "70 kg CO₂/year",
      description: "Create urban green spaces",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Amazon Rainforest Restoration",
      provider: "EcoForest Initiative",
      location: "Brazil",
      type: "Reforestation",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      creditsAvailable: 50000,
      pricePerCredit: 12,
      verified: true,
      rating: 4.9,
      impact: "2,500 tons CO₂/year",
    },
    {
      id: 2,
      title: "Solar Energy Farm Development",
      provider: "SunPower Solutions",
      location: "India",
      type: "Renewable Energy",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80",
      creditsAvailable: 35000,
      pricePerCredit: 15,
      verified: true,
      rating: 4.8,
      impact: "3,200 tons CO₂/year",
    },
    {
      id: 3,
      title: "Mangrove Conservation Project",
      provider: "Coastal Guardians",
      location: "Indonesia",
      type: "Reforestation",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      creditsAvailable: 40000,
      pricePerCredit: 10,
      verified: true,
      rating: 4.7,
      impact: "1,800 tons CO₂/year",
    },
    {
      id: 4,
      title: "Wind Energy Initiative",
      provider: "WindTech Corp",
      location: "Denmark",
      type: "Renewable Energy",
      image: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&q=80",
      creditsAvailable: 60000,
      pricePerCredit: 18,
      verified: true,
      rating: 4.9,
      impact: "4,100 tons CO₂/year",
    },
    {
      id: 5,
      title: "Clean Water Access Program",
      provider: "AquaPure Foundation",
      location: "Kenya",
      type: "Water Conservation",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      creditsAvailable: 25000,
      pricePerCredit: 8,
      verified: true,
      rating: 4.6,
      impact: "900 tons CO₂/year",
    },
    {
      id: 6,
      title: "Urban Forest Initiative",
      provider: "Green Cities Alliance",
      location: "Singapore",
      type: "Reforestation",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      creditsAvailable: 30000,
      pricePerCredit: 14,
      verified: true,
      rating: 4.8,
      impact: "1,200 tons CO₂/year",
    },
  ];

  const projectTypes = [
    "Reforestation",
    "Renewable Energy",
    "Water Conservation",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-primary to-accent-foreground text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {role === "firm" && "Manage Your Projects & Credits"}
              {role === "corporate" && "Purchase Carbon Credits"}
              {role === "individual" && "Offset Your Carbon Footprint"}
            </h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {role === "firm" && "Upload projects, manage credits, and reach corporate buyers"}
              {role === "corporate" && "Browse verified projects and achieve your net-zero goals"}
              {role === "individual" && "Browse verified projects and make a real difference"}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-64 space-y-6">
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-bold">Filters</h2>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <Label className="mb-2 block">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search projects..." className="pl-9" />
                  </div>
                </div>

                {/* Project Type */}
                <div className="mb-6">
                  <Label className="mb-3 block">Project Type</Label>
                  <div className="space-y-3">
                    {projectTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox id={type} />
                        <label
                          htmlFor={type}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <Label className="mb-3 block">
                    Price per Credit: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                </div>

                {/* Verification Toggle */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="verified" defaultChecked />
                  <label
                    htmlFor="verified"
                    className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle className="h-4 w-4 text-success" />
                    Verified Only
                  </label>
                </div>
              </Card>

              {/* How it Works */}
              <Card className="p-6 bg-secondary/30">
                <h3 className="font-bold text-foreground mb-3">How It Works</h3>
                <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                  <li>Browse verified projects</li>
                  <li>Select carbon credits</li>
                  <li>Complete purchase</li>
                  <li>Receive certification</li>
                </ol>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {role === "firm" && (
                <Card className="p-6 mb-6 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-2 border-blue-500/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Your Projects</h3>
                      <p className="text-muted-foreground">Upload new projects and manage existing ones</p>
                    </div>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Project
                    </Button>
                  </div>
                </Card>
              )}
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    {role === "firm" ? "Your Projects" : "Available Projects"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {projects.length} projects {role === "firm" ? "listed" : "found"}
                  </p>
                </div>
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Sort by Impact
                </Button>
              </div>

              {/* Interactive Pricing Sidebar for Corporate/Firm */}
              {selectedProject && (role === "corporate" || role === "firm") && (
                <div className="mb-6">
                  <InteractivePricingSlider
                    projectTitle={selectedProject.title}
                    pricePerCredit={selectedProject.pricePerCredit}
                    maxCredits={selectedProject.creditsAvailable}
                    onPurchase={(credits, total) => {
                      console.log(`Purchasing ${credits} credits for $${total}`);
                      setSelectedProject(null);
                    }}
                  />
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(role === "individual" ? contributionProjects : projects).map((project: any) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30 cursor-pointer"
                    onClick={() => role !== "individual" && setSelectedProject(project)}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      {project.verified && (
                        <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {project.type}
                      </Badge>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-3">
                        by {project.provider}
                      </p>

                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                        <MapPin className="h-4 w-4" />
                        {project.location}
                      </div>

                      <div className="space-y-2 mb-4 pb-4 border-b border-border">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Impact</span>
                          <span className="font-semibold text-success">
                            {project.impact}
                          </span>
                        </div>
                        
                        {/* Credit Availability Badge for Corporate/Firm */}
                        {role !== "individual" && project.creditsAvailable && (
                          <div className="mb-2">
                            <CreditAvailabilityBadge 
                              available={project.creditsAvailable} 
                              total={project.creditsAvailable + 10000}
                            />
                          </div>
                        )}
                        
                        {role === "individual" ? (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Credits Earned</span>
                              <span className="font-semibold text-primary">
                                {project.credits} credits
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Contribution</span>
                              <span className="font-semibold text-lg text-primary">
                                ₹{project.price}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Available</span>
                              <span className="font-semibold">
                                {project.creditsAvailable?.toLocaleString()} credits
                              </span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Price</span>
                              <span className="font-semibold text-primary">
                                ${project.pricePerCredit}/credit
                              </span>
                            </div>
                          </>
                        )}
                      </div>

                      {role === "individual" && (
                        <Button className="w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Contribute ₹{project.price}
                        </Button>
                      )}
                      {role === "corporate" && (
                        <Button className="w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Buy Credits
                        </Button>
                      )}
                      {role === "firm" && (
                        <Button className="w-full" variant="secondary">
                          <DollarSign className="h-4 w-4 mr-2" />
                          Manage Project
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;

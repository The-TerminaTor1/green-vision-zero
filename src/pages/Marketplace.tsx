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
  TrendingUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Marketplace = () => {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [sortByImpact, setSortByImpact] = useState(false);
  const [contributeProject, setContributeProject] = useState<any>(null);
  const [purchasing, setPurchasing] = useState(false);
  const { role, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const parseImpact = (s: string) => parseFloat(s.replace(/[^\d.]/g, "")) || 0;

  const applyFilters = () => {
    const baseProjects = contributionProjects;
    
    let filtered = baseProjects.filter((project: any) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.provider.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Type filter
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(project.type);
      
      // Price filter
      const projectPrice = project.price / 100;
      const matchesPrice = projectPrice >= priceRange[0] && projectPrice <= priceRange[1];
      
      // Verified filter
      const matchesVerified = !verifiedOnly || project.verified;
      
      return matchesSearch && matchesType && matchesPrice && matchesVerified;
    });

    if (sortByImpact) {
      filtered = [...filtered].sort((a, b) => parseImpact(b.impact) - parseImpact(a.impact));
    }

    setFilteredProjects(filtered);
  };

  const handleConfirmContribute = () => {
    if (!contributeProject) return;
    setPurchasing(true);
    setTimeout(() => {
      setPurchasing(false);
      const proj = contributeProject;
      setContributeProject(null);
      toast({
        title: "Contribution successful 🎉",
        description: `You contributed ₹${proj.price} to "${proj.title}". Certificate available in your dashboard.`,
      });
    }, 900);
  };

  // Re-apply when sort toggles or role changes
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, sortByImpact]);

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
                    <Input 
                      placeholder="Search projects..." 
                      className="pl-9" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="mb-6">
                  <Label className="mb-3 block">Project Type</Label>
                  <div className="space-y-3">
                    {projectTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox 
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedTypes([...selectedTypes, type]);
                            } else {
                              setSelectedTypes(selectedTypes.filter(t => t !== type));
                            }
                          }}
                        />
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
                    Price per Credit: ₹{priceRange[0]} - ₹{priceRange[1]}
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
                <div className="flex items-center space-x-2 mb-6">
                  <Checkbox 
                    id="verified" 
                    checked={verifiedOnly}
                    onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
                  />
                  <label
                    htmlFor="verified"
                    className="text-sm font-medium leading-none cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle className="h-4 w-4 text-success" />
                    Verified Only
                  </label>
                </div>

                {/* Apply Filters Button */}
                <Button 
                  className="w-full bg-primary hover:bg-primary/90" 
                  onClick={applyFilters}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Apply Filters
                </Button>
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
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Available Projects
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {filteredProjects.length > 0 ? filteredProjects.length : contributionProjects.length} projects found
                  </p>
                </div>
                <Button
                  variant={sortByImpact ? "default" : "outline"}
                  onClick={() => setSortByImpact((v) => !v)}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  {sortByImpact ? "Sorted by Impact" : "Sort by Impact"}
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(filteredProjects.length > 0 ? filteredProjects : contributionProjects).map((project: any) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30"
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
                      </div>

                      <Button className="w-full" onClick={() => setContributeProject(project)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Contribute ₹{project.price}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Contribute confirmation dialog */}
      <Dialog open={!!contributeProject} onOpenChange={(o) => !o && setContributeProject(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm your contribution</DialogTitle>
            <DialogDescription>
              You're contributing to a verified climate project. A certificate will be issued to your dashboard.
            </DialogDescription>
          </DialogHeader>

          {contributeProject && (
            <div className="space-y-4">
              <div className="flex gap-4 items-center p-4 rounded-lg bg-secondary/40">
                <img
                  src={contributeProject.image}
                  alt={contributeProject.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-foreground truncate">{contributeProject.title}</p>
                  <p className="text-xs text-muted-foreground">{contributeProject.provider}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground">Amount</div>
                  <div className="font-bold text-primary">₹{contributeProject.price}</div>
                </div>
                <div className="p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground">Credits</div>
                  <div className="font-bold">{contributeProject.credits}</div>
                </div>
                <div className="p-3 rounded-lg border">
                  <div className="text-xs text-muted-foreground">Impact</div>
                  <div className="font-bold text-success text-sm">{contributeProject.impact}</div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setContributeProject(null)} disabled={purchasing}>
              Cancel
            </Button>
            <Button onClick={handleConfirmContribute} disabled={purchasing}>
              {purchasing ? "Processing…" : `Confirm ₹${contributeProject?.price ?? ""}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;

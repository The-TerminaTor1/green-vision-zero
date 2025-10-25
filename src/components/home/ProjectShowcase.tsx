import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectShowcase = () => {
  const projects = [
    {
      id: 1,
      title: "Amazon Rainforest Restoration",
      location: "Brazil",
      image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800&q=80",
      creditsAvailable: "50,000",
      verified: true,
      description: "Large-scale reforestation project in the Amazon basin",
      impact: "2,500 tons CO₂/year",
    },
    {
      id: 2,
      title: "Mangrove Conservation Project",
      location: "Indonesia",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
      creditsAvailable: "35,000",
      verified: true,
      description: "Protecting coastal ecosystems and marine life",
      impact: "1,800 tons CO₂/year",
    },
    {
      id: 3,
      title: "Urban Forest Initiative",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
      creditsAvailable: "25,000",
      verified: true,
      description: "Creating green spaces in urban environments",
      impact: "1,200 tons CO₂/year",
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Verified Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of certified carbon offset projects making real impact
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-500 animate-slide-up border-2 hover:border-primary/30 hover:-translate-y-2 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {project.verified && (
                  <Badge className="absolute top-3 right-3 bg-success text-success-foreground group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-foreground line-clamp-2">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div>
                    <div className="text-xs text-muted-foreground">Impact</div>
                    <div className="text-sm font-semibold text-success">{project.impact}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Credits Available</div>
                    <div className="text-sm font-semibold text-primary">{project.creditsAvailable}</div>
                  </div>
                </div>

                <Button className="w-full" asChild>
                  <Link to="/marketplace">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center animate-bounce-slow">
          <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
            <Link to="/marketplace">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase;

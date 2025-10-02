import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-forest.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lush green forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Leaf className="h-8 w-8 text-success" />
            <span className="text-sm font-semibold text-success uppercase tracking-wide">
              Net Zero Mission
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Join the Journey to{" "}
            <span className="text-primary">Net Zero</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
            Contribute to verified plantation projects, earn carbon credits, and make a real impact
            in the fight against climate change.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-base" asChild>
              <Link to="/marketplace">
                Explore Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base" asChild>
              <Link to="/user-dashboard">Track Contributions</Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50">
            <div>
              <div className="text-3xl font-bold text-primary mb-1">2.5M+</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">150K</div>
              <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-1">50K+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

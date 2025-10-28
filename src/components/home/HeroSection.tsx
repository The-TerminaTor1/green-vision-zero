import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-forest.jpg";

const HeroSection = () => {
  const [count, setCount] = useState({ trees: 0, co2: 0, users: 0 });

  useEffect(() => {
    const targets = { trees: 2.5, co2: 150, users: 50 };
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCount({
        trees: Math.floor(targets.trees * progress * 10) / 10,
        co2: Math.floor(targets.co2 * progress),
        users: Math.floor(targets.users * progress),
      });

      if (currentStep >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[700px] flex items-center overflow-hidden">
      {/* Animated particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-success/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Lush green forest"
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4 animate-slide-in-left">
            <div className="relative">
              <Leaf className="h-8 w-8 text-success animate-wiggle" />
              <Sparkles className="h-4 w-4 text-success absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-sm font-semibold text-success uppercase tracking-wide">
              Net Zero Mission
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
            Join the Journey to{" "}
            <span className="gradient-text animate-gradient-shift bg-gradient-to-r from-primary via-success to-accent">
              Net Zero
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            Contribute to verified plantation projects, earn carbon credits, and make a real impact
            in the fight against climate change.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-in-left" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="text-base group relative overflow-hidden" asChild>
              <Link to="/marketplace">
                <span className="relative z-10">Explore Marketplace</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-success to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base hover:scale-105 transition-transform" asChild>
              <Link to="/user-dashboard">Track Contributions</Link>
            </Button>
          </div>

          {/* Quick Stats with animated counters */}
          <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border/50 animate-slide-in-left" style={{ animationDelay: '0.4s' }}>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-1 animate-counter">
                {count.trees}M+
              </div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-success transition-all duration-500 rounded-full mt-2" />
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-1 animate-counter" style={{ animationDelay: '0.2s' }}>
                {count.co2}K
              </div>
              <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-success transition-all duration-500 rounded-full mt-2" />
            </div>
            <div className="group hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-primary mb-1 animate-counter" style={{ animationDelay: '0.4s' }}>
                {count.users}K+
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-success transition-all duration-500 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

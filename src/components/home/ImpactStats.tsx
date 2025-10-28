import { useEffect, useState } from "react";
import { TreeDeciduous, Zap, Users, Globe } from "lucide-react";

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setIsVisible(true);
    
    const targets = [2500000, 150000, 50000, 120];
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounts(targets.map(target => Math.floor(target * progress)));

      if (currentStep >= steps) clearInterval(timer);
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: TreeDeciduous,
      suffix: "+",
      label: "Trees Planted",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Zap,
      suffix: " tons",
      label: "CO₂ Offset",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      suffix: "+",
      label: "Users Onboarded",
      color: "text-accent-foreground",
      bgColor: "bg-accent",
    },
    {
      icon: Globe,
      suffix: "+",
      label: "Active Projects",
      color: "text-earth",
      bgColor: "bg-earth/10",
    },
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-scale" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-pulse-scale" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Global Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the real-time impact we're making together towards a sustainable future
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-500 border border-border hover:border-primary/30 hover:-translate-y-3 group relative overflow-hidden ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={`w-14 h-14 rounded-xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-float shadow-lg relative z-10`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10 animate-counter`}>
                {counts[index].toLocaleString()}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium relative z-10">{stat.label}</div>
              
              {/* Progress bar animation */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-success to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

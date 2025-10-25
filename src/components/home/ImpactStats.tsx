import { useEffect, useState } from "react";
import { TreeDeciduous, Zap, Users, Globe } from "lucide-react";

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    {
      icon: TreeDeciduous,
      value: "2,500,000",
      suffix: "+",
      label: "Trees Planted",
      color: "text-success",
    },
    {
      icon: Zap,
      value: "150,000",
      suffix: " tons",
      label: "CO₂ Offset",
      color: "text-primary",
    },
    {
      icon: Users,
      value: "50,000",
      suffix: "+",
      label: "Users Onboarded",
      color: "text-accent-foreground",
    },
    {
      icon: Globe,
      value: "120",
      suffix: "+",
      label: "Active Projects",
      color: "text-earth",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
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
              className={`bg-card rounded-2xl p-8 text-center shadow-md hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/30 hover:-translate-y-2 group ${
                isVisible ? "animate-scale-in" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 animate-float`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-105 transition-transform duration-300`}>
                {stat.value}
                <span className="text-2xl">{stat.suffix}</span>
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

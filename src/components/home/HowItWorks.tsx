import { Leaf, Award, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Leaf,
      title: "Contribute",
      description:
        "Support verified plantation projects or corporate sustainability initiatives through our platform.",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      icon: Award,
      title: "Earn Credits",
      description:
        "Receive carbon credits and rewards for your contributions. Track your impact in real-time.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: TrendingDown,
      title: "Offset CO₂",
      description:
        "Help reduce global carbon emissions and work towards a Net Zero future for our planet.",
      color: "text-accent-foreground",
      bgColor: "bg-accent",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to make a real difference in fighting climate change
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <Card
              key={step.title}
              className="relative p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-slide-up border-2 hover:border-primary/30 group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-success text-primary-foreground font-bold flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>

              {/* Connecting Line (except for last card) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}

              {/* Icon */}
              <div className={`w-20 h-20 rounded-2xl ${step.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10 shadow-md`}>
                <step.icon className={`h-10 w-10 ${step.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3 relative z-10">{step.title}</h3>
              <p className="text-muted-foreground relative z-10">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

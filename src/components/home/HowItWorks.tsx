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
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
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
              className="relative p-8 hover:shadow-lg transition-all duration-300 animate-slide-up border-2 hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-lg shadow-md">
                {index + 1}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl ${step.bgColor} flex items-center justify-center mb-6`}>
                <step.icon className={`h-8 w-8 ${step.color}`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

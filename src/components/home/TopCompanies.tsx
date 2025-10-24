import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Building2 } from "lucide-react";

const TopCompanies = () => {
  const companies = [
    {
      name: "Microsoft",
      logo: "https://logo.clearbit.com/microsoft.com",
      credits: 2500000,
      offset: 125000,
      sector: "Technology",
      badge: "Platinum Partner",
    },
    {
      name: "Amazon",
      logo: "https://logo.clearbit.com/amazon.com",
      credits: 1800000,
      offset: 90000,
      sector: "E-commerce",
      badge: "Gold Partner",
    },
    {
      name: "Apple",
      logo: "https://logo.clearbit.com/apple.com",
      credits: 1600000,
      offset: 80000,
      sector: "Technology",
      badge: "Gold Partner",
    },
    {
      name: "Google",
      logo: "https://logo.clearbit.com/google.com",
      credits: 1400000,
      offset: 70000,
      sector: "Technology",
      badge: "Gold Partner",
    },
    {
      name: "Unilever",
      logo: "https://logo.clearbit.com/unilever.com",
      credits: 950000,
      offset: 47500,
      sector: "Consumer Goods",
      badge: "Silver Partner",
    },
    {
      name: "BMW",
      logo: "https://logo.clearbit.com/bmw.com",
      credits: 820000,
      offset: 41000,
      sector: "Automotive",
      badge: "Silver Partner",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            Corporate Leaders
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Companies Leading the Change
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry pioneers investing in carbon neutrality and sustainability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {companies.map((company, index) => (
            <Card
              key={company.name}
              className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-lg p-2 shadow-sm flex items-center justify-center">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2'/%3E%3Cpath d='M9 3v18'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">{company.name}</h3>
                      <p className="text-xs text-muted-foreground">{company.sector}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>

                <Badge className="mb-3 bg-accent/10 text-accent-foreground border-accent/20">
                  <Award className="h-3 w-3 mr-1" />
                  {company.badge}
                </Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Credits Purchased</span>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      {(company.credits / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="p-3 bg-success/5 rounded-lg">
                    <div className="text-xs text-muted-foreground mb-1">CO₂ Offset</div>
                    <p className="text-lg font-bold text-success">
                      {(company.offset / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-muted-foreground">tons</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="p-3 bg-background rounded-full">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground mb-1">
                Join Leading Organizations
              </h3>
              <p className="text-muted-foreground">
                Partner with us to achieve your carbon neutrality goals and showcase your commitment to sustainability
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TopCompanies;

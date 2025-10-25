import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 left-10 w-80 h-80 bg-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-success/10 text-primary border-primary/20 animate-scale-in">
            Corporate Leaders
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Top Companies Leading the Change
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Industry pioneers investing in carbon neutrality and sustainability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {companies.map((company, index) => (
            <Card
              key={company.name}
              className="p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative overflow-hidden group animate-slide-up border-2 hover:border-primary/30"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-success/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 bg-white rounded-xl p-2.5 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ring-2 ring-primary/5">
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
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">{company.name}</h3>
                      <p className="text-xs text-muted-foreground">{company.sector}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs font-bold bg-gradient-to-br from-primary/10 to-success/10">
                    #{index + 1}
                  </Badge>
                </div>

                <Badge className={`mb-4 border group-hover:scale-105 transition-transform duration-300 ${
                  company.badge === "Platinum Partner" 
                    ? "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-900 border-slate-400" 
                    : company.badge === "Gold Partner"
                    ? "bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-950 border-yellow-500"
                    : "bg-gradient-to-r from-slate-400 to-slate-500 text-slate-900 border-slate-500"
                }`}>
                  <Award className="h-3 w-3 mr-1" />
                  {company.badge}
                </Badge>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl group-hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>Credits Purchased</span>
                    </div>
                    <p className="text-xl font-bold text-primary">
                      {(company.credits / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-success/5 to-success/10 rounded-xl group-hover:shadow-md transition-shadow duration-300">
                    <div className="text-xs text-muted-foreground mb-1">CO₂ Offset</div>
                    <p className="text-xl font-bold text-success">
                      {(company.offset / 1000).toFixed(0)}K
                    </p>
                    <p className="text-xs text-muted-foreground">tons</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-8 bg-gradient-to-r from-primary/10 via-success/5 to-accent/10 border-primary/30 hover:shadow-xl transition-all duration-500 animate-fade-in relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-success/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-center gap-6 flex-wrap justify-between relative z-10">
            <div className="flex items-center gap-6 flex-1">
              <div className="p-4 bg-background rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Join Leading Organizations
                </h3>
                <p className="text-muted-foreground text-base">
                  Partner with us to achieve your carbon neutrality goals and showcase your commitment to sustainability
                </p>
              </div>
            </div>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
              onClick={() => window.location.href = '/login?tab=register'}
            >
              Register Now
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default TopCompanies;

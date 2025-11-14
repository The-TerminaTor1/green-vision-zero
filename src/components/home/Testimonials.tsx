import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Consultant",
      company: "EcoTech Solutions",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      content:
        "Green Vision has transformed how we approach carbon offsetting. The transparency and verification process gives us complete confidence in our contributions.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Sustainability Director",
      company: "Global Industries Corp",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      content:
        "As a corporate buyer, the platform makes it incredibly easy to purchase credits and track our carbon neutrality goals. Highly recommended!",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Individual Contributor",
      company: "Community Volunteer",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
      content:
        "I love seeing the direct impact of my contributions. The reward system keeps me motivated, and I feel proud to be part of this movement.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-64 h-64 bg-success/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users making a difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-scale-in border-2 hover:border-primary/20 group relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote decoration */}
              <div className="absolute top-0 right-0 text-9xl text-primary/5 font-serif leading-none group-hover:text-primary/10 transition-colors duration-300">
                "
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-success text-success animate-scale-in" style={{ animationDelay: `${(index * 100) + (i * 50)}ms` }} />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed relative z-10 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border relative z-10">
                <Avatar className="ring-2 ring-primary/10 ring-offset-2">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-success text-primary-foreground">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold text-foreground text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

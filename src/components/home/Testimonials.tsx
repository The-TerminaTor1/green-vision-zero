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
        "GreenVision has transformed how we approach carbon offsetting. The transparency and verification process gives us complete confidence in our contributions.",
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
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Community Says
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users making a difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="p-6 hover:shadow-xl transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-success text-success" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Avatar>
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
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

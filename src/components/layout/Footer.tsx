import { Link } from "react-router-dom";
import { Leaf, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "About",
      links: [
        { name: "Our Mission", path: "/mission" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Team", path: "/team" },
        { name: "Careers", path: "/careers" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQ", path: "/faq" },
        { name: "Blog", path: "/blog" },
        { name: "Documentation", path: "/docs" },
        { name: "Support", path: "/support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-secondary border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary mb-4">
              <Leaf className="h-6 w-6" />
              <span>GreenVision</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Join the journey to Net Zero emissions. Together, we can create a sustainable future
              for generations to come.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="h-4 w-4 text-primary" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} GreenVision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

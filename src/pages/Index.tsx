import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import ImpactStats from "@/components/home/ImpactStats";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import Testimonials from "@/components/home/Testimonials";
import SocialProofWidget from "@/components/home/SocialProofWidget";
import TopCompanies from "@/components/home/TopCompanies";
import TopContributors from "@/components/home/TopContributors";
import PersonalizedWelcome from "@/components/home/PersonalizedWelcome";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <PersonalizedWelcome />
        <SocialProofWidget />
        <TopCompanies />
        <HowItWorks />
        <ImpactStats />
        <ProjectShowcase />
        <TopContributors />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

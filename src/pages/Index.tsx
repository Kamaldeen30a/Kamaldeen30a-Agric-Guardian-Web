import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Features from "@/components/landing/Features";
import CassavaDetection from "@/components/landing/CassavaDetection";
import AIIntelligence from "@/components/landing/AIIntelligence";
import DesignedForScale from "@/components/landing/DesignedForScale";
import TechnologyTrust from "@/components/landing/TechnologyTrust";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <CassavaDetection />
        <AIIntelligence />
        <DesignedForScale />
        <TechnologyTrust />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
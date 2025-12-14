import HeroSection from "@/components/HeroSection";
import SixRsSection from "@/components/SixRsSection";
import MigrationSimulator from "@/components/MigrationSimulator";
import ComparisonSection from "@/components/ComparisonSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <SixRsSection />
      <MigrationSimulator />
      <ComparisonSection />
      <Footer />
    </div>
  );
};

export default Index;

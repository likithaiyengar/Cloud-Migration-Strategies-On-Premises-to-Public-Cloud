import { Button } from "@/components/ui/button";
import { Cloud, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToSimulator = () => {
    document.getElementById("simulator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary to-background">
        <div className="absolute inset-0 opacity-30">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-accent/20 animate-float"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 5 + "s",
                animationDuration: Math.random() * 10 + 10 + "s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <div className="p-4 rounded-full bg-accent/10 backdrop-blur-sm border border-accent/20">
            <Cloud className="w-16 h-16 text-accent" />
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">
          Seamlessly Transition from On-Premises to the Cloud
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto">
          Explore strategies, analyze costs, and visualize your digital transformation journey
        </p>
        
        <Button 
          onClick={scrollToSimulator}
          size="lg"
          className="bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6 rounded-full group transition-all duration-300 hover:scale-105 shadow-lg shadow-accent/50"
        >
          Analyze My Strategy
          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

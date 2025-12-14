import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-6 bg-secondary/50 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-2">Cloud Migration Strategies</h3>
            <p className="text-muted-foreground text-sm">
              Generated for Cloud Computing Course
            </p>
            <p className="text-muted-foreground text-sm">
              © 2025 - Educational Project
            </p>
          </div>

          <div className="flex gap-6">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/40 backdrop-blur-lg border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-110"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card/40 backdrop-blur-lg border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-110"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="mailto:contact@example.com"
              className="p-3 rounded-full bg-card/40 backdrop-blur-lg border border-border/50 hover:border-accent/50 transition-all duration-300 hover:scale-110"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

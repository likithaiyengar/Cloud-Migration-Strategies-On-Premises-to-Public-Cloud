import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  RefreshCw, 
  ShoppingCart, 
  Hammer, 
  Archive, 
  Lock,
  ChevronDown,
  ChevronUp,
  Building2,
  Briefcase,
  Heart,
  Landmark,
  ShoppingBag,
  Factory
} from "lucide-react";

interface Strategy {
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  pros: string[];
  cons: string[];
  color: string;
  useCases: {
    industry: string;
    icon: any;
    example: string;
  }[];
  timeframe: string;
  costRange: string;
  complexity: string;
}

const strategies: Strategy[] = [
  {
    icon: Server,
    title: "Rehost",
    subtitle: "Lift and Shift",
    description: "Move applications to the cloud without modifications. Ideal for quick migrations with minimal risk.",
    pros: [
      "Fastest migration approach (weeks, not months)",
      "Minimal disruption to existing operations",
      "Lower initial cost and resource requirements",
      "No code changes required",
      "Easy rollback if issues arise"
    ],
    cons: [
      "Doesn't leverage cloud-native features",
      "May not be cost-efficient long-term",
      "Technical debt remains",
      "Limited scalability improvements"
    ],
    color: "from-blue-500 to-cyan-500",
    useCases: [
      { industry: "Financial Services", icon: Landmark, example: "Bank migrating core banking system during merger deadline" },
      { industry: "Healthcare", icon: Heart, example: "Hospital moving EMR system during compliance deadline" },
      { industry: "Retail", icon: ShoppingBag, example: "Retailer migrating e-commerce before peak season" }
    ],
    timeframe: "4-12 weeks",
    costRange: "$10K - $100K",
    complexity: "Low"
  },
  {
    icon: RefreshCw,
    title: "Replatform",
    subtitle: "Lift, Tinker, and Shift",
    description: "Make minimal cloud optimizations without changing core architecture. Balance speed with some cloud benefits.",
    pros: [
      "Leverages managed services (RDS, ElastiCache)",
      "Improved performance and reliability",
      "Moderate effort with good ROI",
      "Reduces operational overhead",
      "Better cost optimization than rehost"
    ],
    cons: [
      "Partial optimization only",
      "Requires some rearchitecting",
      "Team needs cloud skills",
      "Testing overhead for changes"
    ],
    color: "from-cyan-500 to-teal-500",
    useCases: [
      { industry: "E-commerce", icon: ShoppingBag, example: "Migrating to managed databases for auto-scaling during sales" },
      { industry: "SaaS", icon: Building2, example: "Moving from self-managed Postgres to Aurora" },
      { industry: "Manufacturing", icon: Factory, example: "Modernizing inventory system with managed caching" }
    ],
    timeframe: "3-6 months",
    costRange: "$50K - $200K",
    complexity: "Medium"
  },
  {
    icon: ShoppingCart,
    title: "Repurchase",
    subtitle: "Drop and Shop",
    description: "Replace existing applications with SaaS solutions. Eliminates maintenance and provides modern features.",
    pros: [
      "Access to modern features immediately",
      "Eliminates maintenance burden",
      "Automatic updates and security patches",
      "Scalability built-in",
      "Predictable subscription costs"
    ],
    cons: [
      "Potential vendor lock-in",
      "Data migration complexity",
      "Customization limitations",
      "Ongoing subscription costs",
      "Change management required"
    ],
    color: "from-teal-500 to-green-500",
    useCases: [
      { industry: "Enterprise", icon: Building2, example: "Replacing custom CRM with Salesforce" },
      { industry: "HR", icon: Briefcase, example: "Moving from legacy HRIS to Workday" },
      { industry: "Finance", icon: Landmark, example: "Adopting NetSuite for ERP consolidation" }
    ],
    timeframe: "2-6 months",
    costRange: "$20K - $100K + subscription",
    complexity: "Medium"
  },
  {
    icon: Hammer,
    title: "Refactor",
    subtitle: "Re-architect",
    description: "Redesign applications to be cloud-native. Maximum long-term benefits but requires significant investment.",
    pros: [
      "Maximum cloud benefits and scalability",
      "Best long-term performance and cost efficiency",
      "Modern architecture (microservices, serverless)",
      "Future-proof technology stack",
      "Enables rapid feature development"
    ],
    cons: [
      "Highest cost and time investment",
      "Requires specialized expertise",
      "Risk of scope creep",
      "Extended project timeline",
      "Business disruption during transition"
    ],
    color: "from-green-500 to-emerald-500",
    useCases: [
      { industry: "FinTech", icon: Landmark, example: "Breaking monolithic trading platform into microservices" },
      { industry: "Healthcare Tech", icon: Heart, example: "Rebuilding patient portal as cloud-native SaaS" },
      { industry: "Digital Commerce", icon: ShoppingBag, example: "Re-architecting for global scale and real-time personalization" }
    ],
    timeframe: "6-18 months",
    costRange: "$200K - $2M+",
    complexity: "High"
  },
  {
    icon: Archive,
    title: "Retire",
    subtitle: "Decommission",
    description: "Eliminate applications that are no longer needed. Reduces portfolio complexity and costs.",
    pros: [
      "Immediate cost savings",
      "Simplified application portfolio",
      "Reduced security attack surface",
      "Freed up resources for other projects",
      "Cleaner migration scope"
    ],
    cons: [
      "Requires careful dependency analysis",
      "Data archival and retention compliance",
      "User communication and change management",
      "Historical data access considerations"
    ],
    color: "from-orange-500 to-red-500",
    useCases: [
      { industry: "Post-M&A", icon: Building2, example: "Consolidating duplicate systems after acquisition" },
      { industry: "Enterprise", icon: Briefcase, example: "Retiring legacy reporting tool replaced by modern BI" },
      { industry: "Retail", icon: ShoppingBag, example: "Decommissioning old POS system after upgrade" }
    ],
    timeframe: "4-8 weeks",
    costRange: "$5K - $30K",
    complexity: "Low"
  },
  {
    icon: Lock,
    title: "Retain",
    subtitle: "Keep On-Premises",
    description: "Keep certain applications in their current environment. Ideal for regulated or specialized workloads.",
    pros: [
      "No migration risk",
      "Full control over infrastructure",
      "Compliance and data sovereignty",
      "Preserves existing investments",
      "Legacy system compatibility"
    ],
    cons: [
      "Hybrid environment complexity",
      "Missed cloud benefits",
      "Ongoing hardware maintenance",
      "Limited scalability",
      "Higher long-term operational costs"
    ],
    color: "from-purple-500 to-pink-500",
    useCases: [
      { industry: "Government", icon: Landmark, example: "Classified systems requiring air-gapped security" },
      { industry: "Healthcare", icon: Heart, example: "Medical devices with FDA-validated software" },
      { industry: "Manufacturing", icon: Factory, example: "SCADA systems with real-time latency requirements" }
    ],
    timeframe: "Ongoing",
    costRange: "OpEx + maintenance",
    complexity: "Low"
  }
];

const SixRsSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Industry Standard Framework</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The 6 Rs of Cloud Migration</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AWS and industry-standard framework for categorizing migration strategies. Click each card to see real-world examples.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            const isExpanded = expandedCard === index;
            
            return (
              <Card 
                key={index}
                className={`bg-card/40 backdrop-blur-lg border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer animate-fade-in-up overflow-hidden ${isExpanded ? 'md:col-span-2 lg:col-span-1' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => toggleCard(index)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${strategy.color} flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold">{strategy.title}</div>
                      <div className="text-sm text-muted-foreground font-normal">{strategy.subtitle}</div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{strategy.description}</p>
                  
                  {/* Quick Stats */}
                  <div className="flex gap-2 flex-wrap mb-4">
                    <Badge variant="outline" className="text-xs border-accent/30">{strategy.timeframe}</Badge>
                    <Badge variant="outline" className="text-xs border-accent/30">{strategy.costRange}</Badge>
                    <Badge variant="outline" className={`text-xs ${
                      strategy.complexity === "Low" ? "border-green-500/30 text-green-400" :
                      strategy.complexity === "Medium" ? "border-yellow-500/30 text-yellow-400" :
                      "border-red-500/30 text-red-400"
                    }`}>
                      {strategy.complexity} Complexity
                    </Badge>
                  </div>
                  
                  {isExpanded && (
                    <div className="space-y-4 animate-fade-in-up">
                      {/* Pros */}
                      <div>
                        <h4 className="font-semibold text-green-400 mb-2">Advantages:</h4>
                        <ul className="space-y-1">
                          {strategy.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Cons */}
                      <div>
                        <h4 className="font-semibold text-red-400 mb-2">Considerations:</h4>
                        <ul className="space-y-1">
                          {strategy.cons.map((con, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start">
                              <span className="text-red-400 mr-2 flex-shrink-0">✗</span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Real World Use Cases */}
                      <div>
                        <h4 className="font-semibold text-accent mb-3">Real-World Examples:</h4>
                        <div className="space-y-3">
                          {strategy.useCases.map((useCase, i) => {
                            const UseCaseIcon = useCase.icon;
                            return (
                              <div key={i} className="p-3 bg-background/50 rounded-lg border border-border/30">
                                <div className="flex items-center gap-2 mb-1">
                                  <UseCaseIcon className="w-4 h-4 text-accent" />
                                  <span className="text-sm font-medium">{useCase.industry}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">{useCase.example}</p>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SixRsSection;
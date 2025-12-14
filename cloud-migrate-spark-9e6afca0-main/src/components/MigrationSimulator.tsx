import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Lightbulb, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Shield,
  Zap,
  Target,
  FileText,
  Download
} from "lucide-react";

interface Recommendation {
  strategy: string;
  reason: string;
  icon: string;
  color: string;
  riskLevel: "Low" | "Medium" | "High";
  estimatedCost: string;
  timelineWeeks: string;
  steps: string[];
  tools: string[];
  bestFor: string[];
}

const MigrationSimulator = () => {
  const [budget, setBudget] = useState(50);
  const [timeConstraint, setTimeConstraint] = useState<"tight" | "moderate" | "flexible">("moderate");
  const [complexity, setComplexity] = useState<"simple" | "moderate" | "legacy">("moderate");
  const [teamSize, setTeamSize] = useState<"small" | "medium" | "large">("medium");
  const [dataVolume, setDataVolume] = useState<"small" | "medium" | "large">("medium");
  const [complianceNeeds, setComplianceNeeds] = useState<"none" | "standard" | "strict">("standard");
  const [showReport, setShowReport] = useState(false);

  const getRecommendation = (): Recommendation => {
    // Enhanced recommendation logic based on multiple factors
    const score = {
      rehost: 0,
      replatform: 0,
      repurchase: 0,
      refactor: 0,
      retain: 0,
      retire: 0
    };

    // Budget scoring
    if (budget < 30) {
      score.rehost += 3;
      score.retain += 2;
    } else if (budget < 60) {
      score.replatform += 3;
      score.rehost += 1;
    } else {
      score.refactor += 3;
      score.repurchase += 2;
    }

    // Time constraint scoring
    if (timeConstraint === "tight") {
      score.rehost += 3;
      score.repurchase += 2;
      score.retain += 1;
    } else if (timeConstraint === "moderate") {
      score.replatform += 2;
      score.rehost += 1;
    } else {
      score.refactor += 3;
      score.replatform += 1;
    }

    // Complexity scoring
    if (complexity === "legacy") {
      score.refactor += 2;
      score.retain += 2;
      score.retire += 1;
    } else if (complexity === "simple") {
      score.repurchase += 3;
      score.rehost += 2;
    } else {
      score.replatform += 2;
    }

    // Team size scoring
    if (teamSize === "small") {
      score.rehost += 2;
      score.repurchase += 2;
    } else if (teamSize === "large") {
      score.refactor += 2;
    }

    // Data volume scoring
    if (dataVolume === "large") {
      score.replatform += 1;
      score.retain += 1;
    }

    // Compliance scoring
    if (complianceNeeds === "strict") {
      score.retain += 2;
      score.replatform += 1;
    }

    const maxScore = Math.max(...Object.values(score));
    const strategy = Object.entries(score).find(([_, v]) => v === maxScore)?.[0] || "replatform";

    const recommendations: Record<string, Recommendation> = {
      rehost: {
        strategy: "Rehost (Lift & Shift)",
        reason: "Based on your tight timeline and budget constraints, a lift-and-shift approach minimizes risk while getting you to the cloud quickly. You can optimize later once workloads are running.",
        icon: "🚀",
        color: "from-blue-500 to-cyan-500",
        riskLevel: "Low",
        estimatedCost: budget < 40 ? "$10K - $50K" : "$50K - $150K",
        timelineWeeks: timeConstraint === "tight" ? "4-8 weeks" : "8-16 weeks",
        steps: [
          "Conduct application inventory and dependency mapping",
          "Set up target cloud environment (VPC, networking, security groups)",
          "Configure AWS Migration Hub or Azure Migrate",
          "Perform test migrations in staging environment",
          "Execute production migration during maintenance window",
          "Validate functionality and performance benchmarks",
          "Update DNS and redirect traffic",
          "Decommission on-premises infrastructure"
        ],
        tools: ["AWS Migration Hub", "Azure Migrate", "VMware HCX", "CloudEndure"],
        bestFor: ["Time-sensitive migrations", "Budget-conscious organizations", "Applications with minimal cloud dependencies"]
      },
      replatform: {
        strategy: "Replatform (Lift, Tinker & Shift)",
        reason: "Your moderate timeline and budget allow for optimizations that will reduce long-term costs. This balances migration speed with cloud-native benefits.",
        icon: "🔄",
        color: "from-cyan-500 to-teal-500",
        riskLevel: "Medium",
        estimatedCost: "$50K - $200K",
        timelineWeeks: "12-24 weeks",
        steps: [
          "Assess current architecture and identify optimization opportunities",
          "Design target state with managed services (RDS, ElastiCache, etc.)",
          "Refactor database layer to use cloud-managed databases",
          "Implement auto-scaling and load balancing",
          "Migrate application tier with container orchestration",
          "Set up monitoring, logging, and alerting (CloudWatch, Azure Monitor)",
          "Performance testing and optimization",
          "Gradual traffic migration with rollback plan"
        ],
        tools: ["AWS RDS", "Azure SQL", "Amazon ECS/EKS", "Terraform", "Docker"],
        bestFor: ["Organizations seeking cost optimization", "Applications that can benefit from managed services", "Teams with moderate cloud experience"]
      },
      repurchase: {
        strategy: "Repurchase (Drop & Shop)",
        reason: "Your simple application architecture and flexible timeline make SaaS adoption ideal. This eliminates maintenance overhead and provides modern features.",
        icon: "🛒",
        color: "from-teal-500 to-green-500",
        riskLevel: "Medium",
        estimatedCost: "$20K - $100K + subscription",
        timelineWeeks: "8-16 weeks",
        steps: [
          "Evaluate SaaS alternatives (Salesforce, ServiceNow, Workday, etc.)",
          "Map current features to SaaS capabilities and identify gaps",
          "Plan data migration and transformation strategy",
          "Configure new SaaS platform and custom integrations",
          "Develop API integrations with existing systems",
          "Migrate historical data with validation",
          "User training and change management",
          "Parallel run period before full cutover"
        ],
        tools: ["Salesforce", "ServiceNow", "Workday", "MuleSoft", "Zapier"],
        bestFor: ["Commodity applications (CRM, HR, Finance)", "Organizations wanting to reduce IT maintenance", "Standardized business processes"]
      },
      refactor: {
        strategy: "Refactor (Re-architect)",
        reason: "Your available budget and timeline, combined with legacy complexity, justify a complete modernization. This maximizes cloud benefits and future scalability.",
        icon: "🔨",
        color: "from-green-500 to-emerald-500",
        riskLevel: "High",
        estimatedCost: "$200K - $1M+",
        timelineWeeks: "24-52 weeks",
        steps: [
          "Domain-driven design workshops to decompose monolith",
          "Define microservices boundaries and API contracts",
          "Set up CI/CD pipelines and infrastructure-as-code",
          "Implement containerization (Docker) and orchestration (Kubernetes)",
          "Develop new services with cloud-native patterns",
          "Implement service mesh and API gateway",
          "Strangler fig pattern for gradual migration",
          "Comprehensive testing (unit, integration, chaos engineering)",
          "Production deployment with feature flags"
        ],
        tools: ["Kubernetes", "Docker", "Istio", "Terraform", "ArgoCD", "AWS Lambda", "Azure Functions"],
        bestFor: ["Strategic applications requiring agility", "Organizations with strong engineering teams", "Long-term digital transformation initiatives"]
      },
      retain: {
        strategy: "Retain (Hybrid Approach)",
        reason: "Your strict compliance requirements and current constraints suggest keeping some workloads on-premises while selectively moving others to cloud.",
        icon: "🔒",
        color: "from-purple-500 to-pink-500",
        riskLevel: "Low",
        estimatedCost: "$30K - $100K",
        timelineWeeks: "8-12 weeks",
        steps: [
          "Classify workloads by compliance and performance requirements",
          "Design hybrid architecture with secure connectivity",
          "Implement VPN or Direct Connect/ExpressRoute",
          "Set up identity federation (Azure AD, Okta)",
          "Deploy hybrid management tools",
          "Configure unified monitoring across environments",
          "Establish data synchronization patterns",
          "Document hybrid operating procedures"
        ],
        tools: ["AWS Direct Connect", "Azure ExpressRoute", "VMware Cloud", "Azure Arc", "AWS Outposts"],
        bestFor: ["Regulated industries (Finance, Healthcare)", "Applications with low-latency requirements", "Organizations with significant on-prem investments"]
      },
      retire: {
        strategy: "Retire (Decommission)",
        reason: "Consider retiring redundant or unused applications to reduce portfolio complexity before migration.",
        icon: "📦",
        color: "from-orange-500 to-red-500",
        riskLevel: "Low",
        estimatedCost: "$5K - $20K",
        timelineWeeks: "4-8 weeks",
        steps: [
          "Identify applications with low usage or business value",
          "Verify no critical dependencies exist",
          "Archive data according to retention policies",
          "Notify stakeholders and update documentation",
          "Graceful shutdown with monitoring",
          "Decommission infrastructure",
          "Update CMDB and asset inventory",
          "Reallocate resources to higher-value initiatives"
        ],
        tools: ["ServiceNow Discovery", "AWS Application Discovery", "Flexera"],
        bestFor: ["Legacy applications with modern replacements", "Duplicate systems from M&A", "Low-value applications consuming resources"]
      }
    };

    return recommendations[strategy];
  };

  const recommendation = getRecommendation();

  const generatePDFReport = () => {
    const reportContent = `
CLOUD MIGRATION ASSESSMENT REPORT
=================================
Generated: ${new Date().toLocaleDateString()}

ASSESSMENT INPUTS
-----------------
Budget Level: ${budget < 40 ? "Low" : budget < 70 ? "Medium" : "High"} (${budget}%)
Time Constraint: ${timeConstraint}
Application Complexity: ${complexity}
Team Size: ${teamSize}
Data Volume: ${dataVolume}
Compliance Requirements: ${complianceNeeds}

RECOMMENDED STRATEGY
--------------------
${recommendation.strategy}

Risk Level: ${recommendation.riskLevel}
Estimated Cost: ${recommendation.estimatedCost}
Timeline: ${recommendation.timelineWeeks}

RATIONALE
---------
${recommendation.reason}

IMPLEMENTATION STEPS
--------------------
${recommendation.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

RECOMMENDED TOOLS
-----------------
${recommendation.tools.join(', ')}

BEST SUITED FOR
---------------
${recommendation.bestFor.map(item => `• ${item}`).join('\n')}

---
This assessment is based on general industry best practices.
Consult with cloud architects for detailed planning.
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cloud-migration-assessment.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="simulator" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            <Lightbulb className="w-4 h-4 mr-2" />
            Interactive Assessment Tool
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Migration Strategy Recommender</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Answer questions about your organization to receive a personalized migration strategy with actionable steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-card/40 backdrop-blur-lg border-border/50 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Your Organization Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Budget Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    Migration Budget
                  </Label>
                  <Badge variant="outline" className="border-accent/30">
                    {budget < 40 ? "Low ($10K-$50K)" : budget < 70 ? "Medium ($50K-$200K)" : "High ($200K+)"}
                  </Badge>
                </div>
                <Slider
                  value={[budget]}
                  onValueChange={(value) => setBudget(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Time Constraint */}
              <div className="space-y-3">
                <Label className="text-base flex items-center gap-2">
                  <Clock className="w-4 h-4 text-accent" />
                  Project Timeline
                </Label>
                <Select value={timeConstraint} onValueChange={(value: "tight" | "moderate" | "flexible") => setTimeConstraint(value)}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tight">Urgent (1-3 months)</SelectItem>
                    <SelectItem value="moderate">Standard (3-6 months)</SelectItem>
                    <SelectItem value="flexible">Flexible (6-12+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Application Complexity */}
              <div className="space-y-3">
                <Label className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent" />
                  Application Architecture
                </Label>
                <Select value={complexity} onValueChange={(value: "simple" | "moderate" | "legacy") => setComplexity(value)}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Modern (Containerized, Microservices)</SelectItem>
                    <SelectItem value="moderate">Standard (N-tier, Some dependencies)</SelectItem>
                    <SelectItem value="legacy">Legacy (Monolithic, Tightly coupled)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Team Size */}
              <div className="space-y-3">
                <Label className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  Technical Team Size
                </Label>
                <Select value={teamSize} onValueChange={(value: "small" | "medium" | "large") => setTeamSize(value)}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (1-5 engineers)</SelectItem>
                    <SelectItem value="medium">Medium (6-20 engineers)</SelectItem>
                    <SelectItem value="large">Large (20+ engineers)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Data Volume */}
              <div className="space-y-3">
                <Label className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-accent" />
                  Data Volume to Migrate
                </Label>
                <Select value={dataVolume} onValueChange={(value: "small" | "medium" | "large") => setDataVolume(value)}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small (&lt;100GB)</SelectItem>
                    <SelectItem value="medium">Medium (100GB - 10TB)</SelectItem>
                    <SelectItem value="large">Large (10TB+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Compliance */}
              <div className="space-y-3">
                <Label className="text-base flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  Compliance Requirements
                </Label>
                <Select value={complianceNeeds} onValueChange={(value: "none" | "standard" | "strict") => setComplianceNeeds(value)}>
                  <SelectTrigger className="w-full bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Minimal (General business data)</SelectItem>
                    <SelectItem value="standard">Standard (SOC 2, ISO 27001)</SelectItem>
                    <SelectItem value="strict">Strict (HIPAA, PCI-DSS, GDPR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Recommendation Section */}
          <div className="space-y-6">
            <Card className="bg-card/40 backdrop-blur-lg border-border/50 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-accent" />
                    Recommended Strategy
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generatePDFReport}
                    className="border-accent/30 hover:bg-accent/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Strategy Header */}
                  <div className={`p-6 rounded-2xl bg-gradient-to-br ${recommendation.color} text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-5xl">{recommendation.icon}</div>
                      <Badge 
                        className={`${
                          recommendation.riskLevel === "Low" 
                            ? "bg-green-500/20 text-green-200 border-green-400/30" 
                            : recommendation.riskLevel === "Medium" 
                            ? "bg-yellow-500/20 text-yellow-200 border-yellow-400/30" 
                            : "bg-red-500/20 text-red-200 border-red-400/30"
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {recommendation.riskLevel} Risk
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{recommendation.strategy}</h3>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <DollarSign className="w-4 h-4" />
                        Estimated Cost
                      </div>
                      <div className="text-lg font-bold text-accent">{recommendation.estimatedCost}</div>
                    </div>
                    <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
                        <Clock className="w-4 h-4" />
                        Timeline
                      </div>
                      <div className="text-lg font-bold text-accent">{recommendation.timelineWeeks}</div>
                    </div>
                  </div>

                  {/* Rationale */}
                  <div className="p-4 bg-background/50 rounded-xl border border-border/50">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-accent" />
                      Why This Strategy?
                    </h4>
                    <p className="text-muted-foreground text-sm">{recommendation.reason}</p>
                  </div>

                  {/* Toggle Details */}
                  <Button
                    variant="outline"
                    className="w-full border-accent/30 hover:bg-accent/10"
                    onClick={() => setShowReport(!showReport)}
                  >
                    {showReport ? "Hide" : "Show"} Implementation Details
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Expanded Details */}
            {showReport && (
              <Card className="bg-card/40 backdrop-blur-lg border-border/50 animate-fade-in-up">
                <CardContent className="pt-6 space-y-6">
                  {/* Implementation Steps */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Implementation Roadmap
                    </h4>
                    <ol className="space-y-2">
                      {recommendation.steps.map((step, index) => (
                        <li key={index} className="flex items-start gap-3 text-sm">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Tools */}
                  <div>
                    <h4 className="font-semibold mb-3">Recommended Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {recommendation.tools.map((tool, index) => (
                        <Badge key={index} variant="outline" className="border-accent/30 bg-accent/5">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Best For */}
                  <div>
                    <h4 className="font-semibold mb-3">Best Suited For</h4>
                    <ul className="space-y-2">
                      {recommendation.bestFor.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MigrationSimulator;
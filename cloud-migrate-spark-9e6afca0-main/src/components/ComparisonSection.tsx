import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Building2, Cloud, TrendingUp, TrendingDown, DollarSign, Shield, Zap, Clock, Users, Server } from "lucide-react";

interface ComparisonItem {
  category: string;
  icon: any;
  onPremises: {
    label: string;
    value: number;
    hasFeature: boolean;
    details: string;
  };
  publicCloud: {
    label: string;
    value: number;
    hasFeature: boolean;
    details: string;
  };
}

const comparisons: ComparisonItem[] = [
  {
    category: "Cost Model",
    icon: DollarSign,
    onPremises: { 
      label: "CAPEX Heavy", 
      value: 30, 
      hasFeature: false,
      details: "Large upfront investment in hardware, data center, cooling. 3-5 year depreciation cycle."
    },
    publicCloud: { 
      label: "OPEX Flexible", 
      value: 90, 
      hasFeature: true,
      details: "Pay-as-you-go pricing. No upfront investment. Scale costs with actual usage."
    }
  },
  {
    category: "Scalability",
    icon: TrendingUp,
    onPremises: { 
      label: "Capacity Planning", 
      value: 40, 
      hasFeature: false,
      details: "Must predict capacity 6-12 months ahead. Risk of over/under provisioning."
    },
    publicCloud: { 
      label: "Elastic Auto-Scale", 
      value: 95, 
      hasFeature: true,
      details: "Scale up/down in minutes. Handle traffic spikes automatically. Global availability."
    }
  },
  {
    category: "Maintenance",
    icon: Server,
    onPremises: { 
      label: "Self-Managed", 
      value: 35, 
      hasFeature: false,
      details: "Full staff for patching, updates, hardware replacement. 24/7 on-call required."
    },
    publicCloud: { 
      label: "Provider-Managed", 
      value: 85, 
      hasFeature: true,
      details: "Infrastructure managed by provider. Focus on applications, not servers."
    }
  },
  {
    category: "Security",
    icon: Shield,
    onPremises: { 
      label: "Full Control", 
      value: 85, 
      hasFeature: true,
      details: "Complete control over physical and logical security. Air-gapped option available."
    },
    publicCloud: { 
      label: "Shared Responsibility", 
      value: 80, 
      hasFeature: true,
      details: "Provider secures infrastructure. You secure data and access. Compliance certifications included."
    }
  },
  {
    category: "Time to Deploy",
    icon: Clock,
    onPremises: { 
      label: "Weeks to Months", 
      value: 25, 
      hasFeature: false,
      details: "Hardware procurement, installation, configuration. Lead times 4-12 weeks typical."
    },
    publicCloud: { 
      label: "Minutes to Hours", 
      value: 95, 
      hasFeature: true,
      details: "Spin up resources instantly. Infrastructure as code for repeatable deployments."
    }
  },
  {
    category: "Innovation Speed",
    icon: Zap,
    onPremises: { 
      label: "Hardware Limited", 
      value: 40, 
      hasFeature: false,
      details: "New tech requires new hardware. AI/ML requires specialized equipment purchase."
    },
    publicCloud: { 
      label: "Rapid Adoption", 
      value: 90, 
      hasFeature: true,
      details: "Access to latest services (AI, ML, IoT) immediately. Experiment without commitment."
    }
  }
];

interface TCOData {
  year: number;
  onPrem: number;
  cloud: number;
}

const tcoData: TCOData[] = [
  { year: 1, onPrem: 500000, cloud: 180000 },
  { year: 2, onPrem: 650000, cloud: 360000 },
  { year: 3, onPrem: 800000, cloud: 540000 },
  { year: 4, onPrem: 950000, cloud: 720000 },
  { year: 5, onPrem: 1100000, cloud: 900000 },
];

const ComparisonSection = () => {
  const [selectedComparison, setSelectedComparison] = useState<number | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Decision Framework</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">On-Premises vs Public Cloud</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Data-driven comparison to support your migration business case
          </p>
        </div>

        <Tabs defaultValue="comparison" className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-card/40">
            <TabsTrigger value="comparison">Feature Comparison</TabsTrigger>
            <TabsTrigger value="tco">TCO Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="comparison" className="space-y-8">
            <Card className="bg-card/40 backdrop-blur-lg border-border/50 animate-fade-in-up">
              <CardHeader>
                <div className="grid grid-cols-4 md:grid-cols-4 gap-4 items-center">
                  <div className="text-muted-foreground font-semibold">Category</div>
                  <div className="hidden md:flex items-center justify-center gap-2 text-muted-foreground">
                    <Building2 className="w-5 h-5" />
                    On-Premises
                  </div>
                  <div className="hidden md:flex items-center justify-center gap-2 text-accent">
                    <Cloud className="w-5 h-5" />
                    Public Cloud
                  </div>
                  <div className="text-muted-foreground text-right md:text-center">Winner</div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {comparisons.map((item, index) => {
                  const Icon = item.icon;
                  const isExpanded = selectedComparison === index;
                  const cloudWins = item.publicCloud.value > item.onPremises.value;
                  
                  return (
                    <div 
                      key={index}
                      className="cursor-pointer"
                      onClick={() => setSelectedComparison(isExpanded ? null : index)}
                    >
                      <div 
                        className={`grid grid-cols-4 md:grid-cols-4 gap-4 items-center py-4 px-3 rounded-lg transition-all border ${
                          isExpanded ? 'bg-accent/5 border-accent/30' : 'border-transparent hover:bg-background/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-semibold">
                          <Icon className="w-4 h-4 text-accent hidden md:block" />
                          <span className="text-sm md:text-base">{item.category}</span>
                        </div>
                        
                        {/* On-Premises - Desktop */}
                        <div className="hidden md:block space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.onPremises.label}</span>
                            {item.onPremises.hasFeature ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <Progress value={item.onPremises.value} className="h-2" />
                        </div>

                        {/* Public Cloud - Desktop */}
                        <div className="hidden md:block space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{item.publicCloud.label}</span>
                            {item.publicCloud.hasFeature ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                          <Progress value={item.publicCloud.value} className="h-2 bg-accent/20" />
                        </div>

                        {/* Winner */}
                        <div className="flex justify-end md:justify-center">
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${
                              cloudWins 
                                ? 'border-accent/50 text-accent bg-accent/10' 
                                : 'border-purple-500/50 text-purple-400 bg-purple-500/10'
                            }`}
                          >
                            {cloudWins ? <Cloud className="w-3 h-3 mr-1" /> : <Building2 className="w-3 h-3 mr-1" />}
                            {cloudWins ? 'Cloud' : 'On-Prem'}
                          </Badge>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <div className="grid md:grid-cols-2 gap-4 mt-4 px-3 animate-fade-in-up">
                          <div className="p-4 bg-background/50 rounded-lg border border-border/30">
                            <div className="flex items-center gap-2 mb-2">
                              <Building2 className="w-4 h-4 text-muted-foreground" />
                              <span className="font-semibold text-sm">On-Premises</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.onPremises.details}</p>
                          </div>
                          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Cloud className="w-4 h-4 text-accent" />
                              <span className="font-semibold text-sm text-accent">Public Cloud</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.publicCloud.details}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Best For Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/40 backdrop-blur-lg border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    On-Premises Best For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Regulatory compliance</strong> - HIPAA, PCI-DSS with data residency requirements</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Predictable workloads</strong> - Stable capacity with no scaling needs</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Low-latency requirements</strong> - Real-time systems, manufacturing</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Existing investments</strong> - Recently purchased hardware with value remaining</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-card/40 backdrop-blur-lg border-border/50 border-accent/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Cloud className="w-5 h-5" />
                    Public Cloud Best For
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Variable workloads</strong> - E-commerce peaks, seasonal businesses</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Global expansion</strong> - Multi-region deployment in hours, not months</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                      <span><strong>Startups & innovation</strong> - Experiment fast, fail cheap, iterate quickly</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-4 h-4 text-accent mr-2 mt-1 flex-shrink-0" />
                      <span><strong>AI/ML workloads</strong> - Access GPUs and specialized hardware on-demand</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tco" className="space-y-8">
            <Card className="bg-card/40 backdrop-blur-lg border-border/50 animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  5-Year Total Cost of Ownership (TCO) Comparison
                </CardTitle>
                <p className="text-muted-foreground text-sm">
                  Sample analysis for a mid-size enterprise workload (100 VMs, 50TB storage)
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Cost Breakdown Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border/50">
                          <th className="text-left py-3 px-2">Year</th>
                          <th className="text-right py-3 px-2">
                            <span className="flex items-center justify-end gap-1">
                              <Building2 className="w-4 h-4" /> On-Premises
                            </span>
                          </th>
                          <th className="text-right py-3 px-2">
                            <span className="flex items-center justify-end gap-1">
                              <Cloud className="w-4 h-4 text-accent" /> Public Cloud
                            </span>
                          </th>
                          <th className="text-right py-3 px-2">Savings</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tcoData.map((row, index) => (
                          <tr key={index} className="border-b border-border/30">
                            <td className="py-3 px-2 font-medium">Year {row.year}</td>
                            <td className="py-3 px-2 text-right text-muted-foreground">{formatCurrency(row.onPrem)}</td>
                            <td className="py-3 px-2 text-right text-accent">{formatCurrency(row.cloud)}</td>
                            <td className="py-3 px-2 text-right">
                              <span className="flex items-center justify-end gap-1 text-green-400">
                                <TrendingDown className="w-4 h-4" />
                                {formatCurrency(row.onPrem - row.cloud)}
                              </span>
                            </td>
                          </tr>
                        ))}
                        <tr className="font-bold bg-background/30">
                          <td className="py-3 px-2">5-Year Total</td>
                          <td className="py-3 px-2 text-right">{formatCurrency(tcoData.reduce((sum, r) => sum + r.onPrem, 0))}</td>
                          <td className="py-3 px-2 text-right text-accent">{formatCurrency(tcoData.reduce((sum, r) => sum + r.cloud, 0))}</td>
                          <td className="py-3 px-2 text-right text-green-400">
                            {formatCurrency(tcoData.reduce((sum, r) => sum + (r.onPrem - r.cloud), 0))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Visual Comparison */}
                  <div className="space-y-4">
                    <h4 className="font-semibold">Cumulative Cost Over Time</h4>
                    <div className="space-y-3">
                      {tcoData.map((row, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Year {row.year}</span>
                            <span className="text-muted-foreground">
                              {Math.round((1 - row.cloud / row.onPrem) * 100)}% savings
                            </span>
                          </div>
                          <div className="relative h-6 bg-background/50 rounded-lg overflow-hidden">
                            <div 
                              className="absolute h-full bg-muted-foreground/30 rounded-lg"
                              style={{ width: `${(row.onPrem / 1100000) * 100}%` }}
                            />
                            <div 
                              className="absolute h-full bg-gradient-to-r from-accent to-accent/70 rounded-lg"
                              style={{ width: `${(row.cloud / 1100000) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key Insights */}
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                      <div className="text-3xl font-bold text-accent mb-1">32%</div>
                      <div className="text-sm text-muted-foreground">Average 5-year savings with cloud migration</div>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-1">18 mo</div>
                      <div className="text-sm text-muted-foreground">Typical break-even point for cloud investments</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                      <div className="text-3xl font-bold text-purple-400 mb-1">60%</div>
                      <div className="text-sm text-muted-foreground">Reduction in IT operational overhead</div>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground italic">
                    * TCO figures are illustrative and based on industry averages. Actual costs vary based on workload characteristics, 
                    cloud provider pricing, and operational efficiency. Contact a cloud architect for a detailed assessment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ComparisonSection;
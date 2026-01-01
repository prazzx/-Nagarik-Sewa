import { ExternalLink, Globe, MapPin, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { serviceProcedures, ProcedureStep } from "@/data/services";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProcedureGuideProps {
  serviceId?: string;
}

const ProcedureGuide = ({ serviceId = "citizenship" }: ProcedureGuideProps) => {
  const procedure = serviceProcedures[serviceId] || [];
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepId)) {
      newCompleted.delete(stepId);
    } else {
      newCompleted.add(stepId);
    }
    setCompletedSteps(newCompleted);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Step-by-Step Procedure</CardTitle>
        <p className="text-sm text-muted-foreground">
          Follow these steps to complete your citizenship application
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Progress line */}
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {procedure.map((step, index) => {
              const isCompleted = completedSteps.has(step.id);
              return (
                <div key={step.id} className="relative pl-10">
                  {/* Step indicator */}
                  <button
                    onClick={() => toggleStep(step.id)}
                    className={cn(
                      "absolute left-0 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all z-10",
                      isCompleted 
                        ? "border-success bg-success text-success-foreground" 
                        : "border-primary bg-card text-primary hover:bg-primary/10"
                    )}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </button>

                  <div className={cn(
                    "p-4 rounded-lg border transition-all",
                    isCompleted ? "border-success/30 bg-success/5" : "border-border bg-card"
                  )}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className={cn(
                            "font-semibold",
                            isCompleted ? "text-success" : "text-foreground"
                          )}>
                            {step.title}
                          </h4>
                          {step.isOnline ? (
                            <span className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                              <Globe className="h-3 w-3" />
                              Online
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                              <MapPin className="h-3 w-3" />
                              In-Person
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">{step.titleNepali}</p>
                        <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                        
                        {step.tips && step.tips.length > 0 && (
                          <div className="mt-3 p-3 rounded-md bg-accent/50">
                            <p className="text-xs font-medium text-accent-foreground mb-2">💡 Tips:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {step.tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-accent">•</span>
                                  {tip}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      {step.link && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={step.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Open
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcedureGuide;

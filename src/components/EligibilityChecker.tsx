import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEligibilityQuestions } from "@/hooks/useServices";
import { EligibilityOption } from "@/types/services";
import { cn } from "@/lib/utils";

interface EligibilityCheckerProps {
  serviceId: string; // Remove the optional
  onNext: () => void;
}

interface EligibilityResult {
  eligible: boolean;
  reason: string;
}

const EligibilityChecker = ({ serviceId, onNext }: EligibilityCheckerProps) => {
  const { data: eligibilityQuestions = [], isLoading } = useEligibilityQuestions(serviceId);
  const [currentQuestionId, setCurrentQuestionId] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<EligibilityResult | null>(null);

  // Set the first question when questions load
  useEffect(() => {
    if (eligibilityQuestions.length > 0 && !currentQuestionId) {
      setCurrentQuestionId(eligibilityQuestions[0].id);
    }
  }, [eligibilityQuestions, currentQuestionId]);

  const currentQuestion = eligibilityQuestions.find(q => q.id === currentQuestionId);

  const handleAnswer = (option: EligibilityOption) => {
    const newAnswers = { ...answers, [currentQuestionId]: option.value };
    setAnswers(newAnswers);

    if (option.eligible !== undefined) {
      setResult({
        eligible: option.eligible,
        reason: option.reason || "",
      });
    } else if (option.nextQuestion) {
      setCurrentQuestionId(option.nextQuestion);
    }
  };

  const handleReset = () => {
    if (eligibilityQuestions.length > 0) {
      setCurrentQuestionId(eligibilityQuestions[0].id);
    }
    setAnswers({});
    setResult(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (eligibilityQuestions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <p>No eligibility questions available for this service yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = Object.keys(answers).length;

  if (result) {
    return (
      <Card className={cn(
        "border-2 transition-colors",
        result.eligible ? "border-success bg-success/5" : "border-destructive bg-destructive/5"
      )}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            {result.eligible ? (
              <CheckCircle2 className="h-16 w-16 text-success animate-scale-in" />
            ) : (
              <XCircle className="h-16 w-16 text-destructive animate-scale-in" />
            )}
            <h3 className={cn(
              "text-xl font-semibold",
              result.eligible ? "text-success" : "text-destructive"
            )}>
              {result.eligible ? "You are Eligible!" : "Not Eligible"}
            </h3>
            <p className="text-muted-foreground max-w-md">{result.reason}</p>
            <div className="flex gap-3 mt-4">
              <Button onClick={handleReset} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Check Again
              </Button>
              {result.eligible && (
                <Button onClick={onNext}>
                  Next: Required Documents
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentQuestion) return null;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">
            Question {progress + 1}
          </span>
          <div className="flex gap-1">
            {eligibilityQuestions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-6 rounded-full transition-colors",
                  i < progress ? "bg-primary" : i === progress ? "bg-primary/50" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
        <p className="text-sm text-muted-foreground">{currentQuestion.questionNepali}</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option)}
            className="w-full flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:border-primary hover:bg-primary/5 transition-all text-left group"
          >
            <div>
              <span className="font-medium text-foreground">{option.label}</span>
              <span className="block text-sm text-muted-foreground">{option.labelNepali}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        ))}

        {progress > 0 && (
          <Button onClick={handleReset} variant="ghost" size="sm" className="mt-2">
            <RotateCcw className="h-4 w-4 mr-2" />
            Start Over
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default EligibilityChecker;
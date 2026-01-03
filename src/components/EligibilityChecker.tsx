import { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceEligibility, EligibilityQuestion } from "@/data/services";
import { cn } from "@/lib/utils";

interface EligibilityCheckerProps {
  serviceId?: string;
}

interface EligibilityResult {
  eligible: boolean;
  reason: string;
}

type OptionType = {
  value: string;
  label: string;
  labelNepali: string;
  nextQuestion?: string;
  eligible?: boolean;
  reason?: string;
};

const EligibilityChecker = ({ serviceId = "citizenship" }: EligibilityCheckerProps) => {
  const eligibilityQuestions = serviceEligibility[serviceId] || [];
  const firstQuestionId = eligibilityQuestions.length > 0 ? eligibilityQuestions[0].id : "";
  const [currentQuestionId, setCurrentQuestionId] = useState<string>(firstQuestionId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const currentQuestion = eligibilityQuestions.find(q => q.id === currentQuestionId);

  const handleAnswer = (option: OptionType) => {
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
    setCurrentQuestionId(firstQuestionId);
    setAnswers({});
    setResult(null);
  };

  const progress = Object.keys(answers).length;
  const totalQuestions = eligibilityQuestions.length;

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
            <Button onClick={handleReset} variant="outline" className="mt-4">
              <RotateCcw className="h-4 w-4 mr-2" />
              Check Again
            </Button>
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

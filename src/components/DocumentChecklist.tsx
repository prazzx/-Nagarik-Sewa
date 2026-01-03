import { useState } from "react";
import { Check, FileText, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRequiredDocuments } from "@/hooks/useServices";
import { cn } from "@/lib/utils";

interface DocumentChecklistProps {
  serviceId?: string;
  documentType?: string;
  onNext?: () => void;
}

const DocumentChecklist = ({ serviceId = "citizenship", documentType, onNext }: DocumentChecklistProps) => {
  const { data: documents = [], isLoading } = useRequiredDocuments(serviceId);
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());

  const relevantDocs = documentType
    ? documents.filter(doc => doc.forTypes.includes(documentType))
    : documents;

  const toggleDoc = (docId: string) => {
    const newChecked = new Set(checkedDocs);
    if (newChecked.has(docId)) {
      newChecked.delete(docId);
    } else {
      newChecked.add(docId);
    }
    setCheckedDocs(newChecked);
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

  if (relevantDocs.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No documents information available for this service yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = (checkedDocs.size / relevantDocs.length) * 100;
  const allChecked = checkedDocs.size === relevantDocs.length && relevantDocs.length > 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Required Documents
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {checkedDocs.size}/{relevantDocs.length} collected
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
          <div
            className="h-full bg-success transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {relevantDocs.map((doc) => {
            const isChecked = checkedDocs.has(doc.id);
            return (
              <button
                key={doc.id}
                onClick={() => toggleDoc(doc.id)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg border transition-all text-left",
                  isChecked
                    ? "border-success bg-success/5"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <div className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors mt-0.5",
                  isChecked
                    ? "border-success bg-success text-success-foreground"
                    : "border-muted-foreground/30"
                )}>
                  {isChecked && <Check className="h-3 w-3" />}
                </div>
                <div className="flex-1">
                  <span className={cn(
                    "font-medium transition-colors",
                    isChecked ? "text-success" : "text-foreground"
                  )}>
                    {doc.name}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {doc.nameNepali}
                  </span>
                  <span className="block text-sm text-muted-foreground mt-1">
                    {doc.description}
                  </span>
                  {doc.required && (
                    <span className="inline-block mt-2 text-xs text-primary bg-primary/10 px-2 py-0.5 rounded">
                      Required
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {onNext && allChecked && (
          <Button onClick={onNext} className="w-full">
            Next: Find Office
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default DocumentChecklist;

import { useState } from "react";
import { Check, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceDocuments, RequiredDocument } from "@/data/services";
import { cn } from "@/lib/utils";

interface DocumentChecklistProps {
  serviceId?: string;
  documentType?: string;
}

const DocumentChecklist = ({ serviceId = "citizenship", documentType }: DocumentChecklistProps) => {
  const [checkedDocs, setCheckedDocs] = useState<Set<string>>(new Set());
  const documents = serviceDocuments[serviceId] || [];

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

  const progress = (checkedDocs.size / relevantDocs.length) * 100;

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
      <CardContent className="space-y-2">
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
      </CardContent>
    </Card>
  );
};

export default DocumentChecklist;

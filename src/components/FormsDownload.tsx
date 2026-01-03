import { Download, ExternalLink, FileText, Globe, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDownloadableForms } from "@/hooks/useServices";
import { DownloadableForm } from "@/types/services";
import { cn } from "@/lib/utils";

interface FormsDownloadProps {
  serviceId: string;
  onNext?: () => void;
}

const FormsDownload = ({ serviceId, onNext }: FormsDownloadProps) => {
  const { data: forms = [], isLoading } = useDownloadableForms(serviceId);

  const getFileIcon = (form: DownloadableForm) => {
    if (form.fileType === "online") {
      return <Globe className="h-5 w-5" />;
    }
    return <FileText className="h-5 w-5" />;
  };

  const getFileTypeLabel = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return "PDF";
      case "doc":
        return "DOC";
      case "online":
        return "Online Portal";
      default:
        return fileType.toUpperCase();
    }
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

  if (forms.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No downloadable forms available for this service yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Download className="h-5 w-5 text-primary" />
          Forms & Downloads
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Download application forms or access online portals directly
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {forms.map((form) => (
            <a
              key={form.id}
              href={form.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg border transition-all",
                "border-border hover:border-primary/50 hover:bg-primary/5",
                "group cursor-pointer"
              )}
            >
              <div className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                form.fileType === "online"
                  ? "bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground"
                  : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
              )}>
                {getFileIcon(form)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {form.name}
                  </h4>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded",
                    form.fileType === "online"
                      ? "bg-success/10 text-success"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {getFileTypeLabel(form.fileType)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{form.nameNepali}</p>
                <p className="text-sm text-muted-foreground mt-1">{form.description}</p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        <div className="p-3 rounded-lg bg-accent/50">
          <p className="text-xs text-muted-foreground">
            <strong>Note:</strong> These links redirect to official government websites.
            Always verify the authenticity of the website before submitting any personal information.
          </p>
        </div>

        {onNext && (
          <Button onClick={onNext} className="w-full">
            Next: Cost & Time
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FormsDownload;

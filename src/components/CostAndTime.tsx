import { Clock, Banknote, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCosts } from "@/data/services";

interface CostAndTimeProps {
  serviceId?: string;
}

const CostAndTime = ({ serviceId = "citizenship" }: CostAndTimeProps) => {
  const costAndTime = serviceCosts[serviceId] || serviceCosts.citizenship;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estimated Cost & Time</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Banknote className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Government Fee</p>
                <p className="font-semibold text-foreground">{costAndTime.fee}</p>
                <p className="text-xs text-muted-foreground">{costAndTime.feeNepali}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
                <Clock className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Processing Time</p>
                <p className="font-semibold text-foreground">{costAndTime.processingTime}</p>
                <p className="text-xs text-muted-foreground">{costAndTime.processingTimeNepali}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-muted">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-2">Important Notes</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {costAndTime.notes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostAndTime;

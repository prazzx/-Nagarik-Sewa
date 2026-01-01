import { Link } from "react-router-dom";
import { ArrowRight, Lock } from "lucide-react";
import { Service } from "@/data/services";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const Icon = service.icon;

  if (!service.available) {
    return (
      <div className="group relative rounded-xl border border-border bg-card p-6 opacity-60">
        <div className="absolute top-4 right-4">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">{service.title}</h3>
            <p className="text-xs text-muted-foreground">{service.titleNepali}</p>
            <p className="text-sm text-muted-foreground">{service.description}</p>
            <span className="inline-block mt-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/services/${service.id}`}
      className={cn(
        "group relative rounded-xl border border-border bg-card p-6 transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        "hover:-translate-y-1"
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
            {service.title}
          </h3>
          <p className="text-xs text-muted-foreground">{service.titleNepali}</p>
          <p className="text-sm text-muted-foreground">{service.description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
      </div>
    </Link>
  );
};

export default ServiceCard;

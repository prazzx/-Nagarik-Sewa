import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Building2, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDistricts, useOffices } from "@/hooks/useServices";
import { cn } from "@/lib/utils";

interface OfficeFinderProps {
  serviceId?: string;
  onNext?: () => void;
}

const OfficeFinder = ({ serviceId = "citizenship", onNext }: OfficeFinderProps) => {
  const { data: districts = [], isLoading: loadingDistricts } = useDistricts();
  const { data: offices = [], isLoading: loadingOffices } = useOffices();
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");

  const selectedDistrictData = districts.find(d => d.id === selectedDistrict);
  const relevantOffice = offices.find(o => o.districtId === selectedDistrict && o.services.includes(serviceId));

  const isLoading = loadingDistricts || loadingOffices;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (districts.length === 0) {
    return (
      <Card>
        <CardContent className="py-8">
          <div className="text-center text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>No office information available yet.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Find Your Office
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select your location to find the nearest District Administration Office
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">District / जिल्ला</label>
            <Select value={selectedDistrict} onValueChange={(value) => {
              setSelectedDistrict(value);
              setSelectedMunicipality("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name} ({district.nameNepali})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Municipality / नगरपालिका</label>
            <Select
              value={selectedMunicipality}
              onValueChange={setSelectedMunicipality}
              disabled={!selectedDistrict}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select municipality" />
              </SelectTrigger>
              <SelectContent>
                {selectedDistrictData?.municipalities.map((municipality) => (
                  <SelectItem key={municipality.id} value={municipality.id}>
                    {municipality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {relevantOffice && selectedDistrict && (
          <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {relevantOffice.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{relevantOffice.nameNepali}</p>

            <div className="grid gap-3 mt-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{relevantOffice.address}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <a href={`tel:${relevantOffice.phone}`} className="text-primary hover:underline">
                  {relevantOffice.phone}
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <a href={`mailto:${relevantOffice.email}`} className="text-primary hover:underline">
                  {relevantOffice.email}
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{relevantOffice.hours}</span>
              </div>
            </div>
          </div>
        )}

        {!selectedDistrict && (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Select your district to find the nearest office</p>
          </div>
        )}

        {onNext && relevantOffice && selectedDistrict && (
          <Button onClick={onNext} className="w-full mt-4">
            Next: Application Procedure
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default OfficeFinder;

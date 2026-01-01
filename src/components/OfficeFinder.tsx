import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { districts, offices, Office } from "@/data/services";
import { cn } from "@/lib/utils";

interface OfficeFinderProps {
  serviceId?: string;
}

const OfficeFinder = ({ serviceId = "citizenship" }: OfficeFinderProps) => {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");

  const selectedDistrictData = districts.find(d => d.id === selectedDistrict);
  const relevantOffice = offices.find(o => o.district === selectedDistrict && o.services.includes(serviceId));

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
      </CardContent>
    </Card>
  );
};

export default OfficeFinder;

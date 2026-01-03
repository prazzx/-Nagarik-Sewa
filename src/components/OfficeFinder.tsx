import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { provinces, districts, getDAOForDistrict, getOfficesForDistrict } from "@/data/nepalData";
import { cn } from "@/lib/utils";

interface OfficeFinderProps {
  serviceId?: string;
}

const OfficeFinder = ({ serviceId = "citizenship" }: OfficeFinderProps) => {
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");

  // Filter districts by province
  const filteredDistricts = selectedProvince 
    ? districts.filter(d => d.provinceId === parseInt(selectedProvince)).sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const selectedDistrictData = districts.find(d => d.id === selectedDistrict);
  
  // Get offices for selected district
  const relevantOffices = selectedDistrict 
    ? getOfficesForDistrict(selectedDistrict, serviceId)
    : [];
  
  // If no specific office found, try to get DAO
  const daoOffice = selectedDistrict ? getDAOForDistrict(selectedDistrict) : null;
  const displayOffice = relevantOffices.length > 0 ? relevantOffices[0] : daoOffice;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Find Your Office
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Select your location to find the nearest government office
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Province Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Province / प्रदेश</label>
            <Select value={selectedProvince} onValueChange={(value) => {
              setSelectedProvince(value);
              setSelectedDistrict("");
              setSelectedMunicipality("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select province" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                {provinces.map((province) => (
                  <SelectItem key={province.id} value={province.id.toString()}>
                    {province.name} ({province.nameNepali})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* District Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">District / जिल्ला</label>
            <Select 
              value={selectedDistrict} 
              onValueChange={(value) => {
                setSelectedDistrict(value);
                setSelectedMunicipality("");
              }}
              disabled={!selectedProvince}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select district" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50 max-h-60">
                {filteredDistricts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name} ({district.nameNepali})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Municipality Selection */}
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
              <SelectContent className="bg-background border shadow-lg z-50 max-h-60">
                {selectedDistrictData?.municipalities.map((municipality) => (
                  <SelectItem key={municipality.id} value={municipality.id}>
                    {municipality.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {displayOffice && selectedDistrict && (
          <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5 animate-fade-in">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {displayOffice.name}
            </h4>
            <p className="text-sm text-muted-foreground mt-1">{displayOffice.nameNepali}</p>
            
            <div className="grid gap-3 mt-4">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{displayOffice.address}</span>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <a href={`tel:${displayOffice.phone}`} className="text-primary hover:underline">
                  {displayOffice.phone}
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <a href={`mailto:${displayOffice.email}`} className="text-primary hover:underline">
                  {displayOffice.email}
                </a>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{displayOffice.hours}</span>
              </div>
            </div>
          </div>
        )}

        {!selectedProvince && (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Select your province to find the nearest office</p>
          </div>
        )}

        {selectedProvince && !selectedDistrict && (
          <div className="text-center py-8 text-muted-foreground">
            <Building2 className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p>Select your district to see office details</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OfficeFinder;

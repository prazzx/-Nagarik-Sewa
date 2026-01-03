import { FileText, MapPin, Home, Car, GraduationCap, Heart, Briefcase, Users, LucideIcon } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  titleNepali: string;
  description: string;
  icon: LucideIcon;
  category: string;
  available: boolean;
}

export interface EligibilityOption {
  value: string;
  label: string;
  labelNepali: string;
  nextQuestion?: string;
  eligible?: boolean;
  reason?: string;
}

export interface EligibilityQuestion {
  id: string;
  questionId: string;
  question: string;
  questionNepali: string;
  options: EligibilityOption[];
}

export interface RequiredDocument {
  id: string;
  docId: string;
  name: string;
  nameNepali: string;
  description: string;
  required: boolean;
  forTypes: string[];
}

export interface Municipality {
  id: string;
  name: string;
  nameNepali: string;
  type: "metropolitan" | "sub-metropolitan" | "municipality" | "rural";
}

export interface District {
  id: string;
  name: string;
  nameNepali: string;
  province: number;
  municipalities: Municipality[];
}

export interface Office {
  id: string;
  name: string;
  nameNepali: string;
  districtId: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
}

export interface ProcedureStep {
  id: string;
  stepId: string;
  title: string;
  titleNepali: string;
  description: string;
  isOnline: boolean;
  link?: string;
  tips?: string[];
}

export interface CostAndTimeInfo {
  fee: string;
  feeNepali: string;
  processingTime: string;
  processingTimeNepali: string;
  notes: string[];
}

export interface DownloadableForm {
  id: string;
  formId: string;
  name: string;
  nameNepali: string;
  description: string;
  url: string;
  fileType: "pdf" | "doc" | "online";
  isExternal: boolean;
}

export interface ServiceInfo {
  id: string;
  title: string;
  titleNepali: string;
  description: string;
  longDescription: string;
}

// Icon mapping for services
export const iconMap: Record<string, LucideIcon> = {
  FileText,
  MapPin,
  Home,
  Car,
  GraduationCap,
  Heart,
  Briefcase,
  Users,
};

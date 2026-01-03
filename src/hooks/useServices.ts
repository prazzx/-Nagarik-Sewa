import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { 
  Service, 
  EligibilityQuestion, 
  RequiredDocument, 
  District, 
  Office, 
  ProcedureStep, 
  CostAndTimeInfo, 
  DownloadableForm, 
  ServiceInfo,
  iconMap 
} from "@/types/services";
import { FileText } from "lucide-react";

// API response types
interface ServiceResponse {
  _id: string;
  title: string;
  titleNepali: string;
  description: string;
  icon: string;
  category: string;
  available: boolean;
}

// Fetch all services
export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async (): Promise<Service[]> => {
      const data = await fetchApi<ServiceResponse[]>("/services");
      
      return data.map((s) => ({
        id: s._id,
        title: s.title,
        titleNepali: s.titleNepali,
        description: s.description,
        icon: iconMap[s.icon] || FileText,
        category: s.category,
        available: s.available,
      }));
    },
  });
};

// Fetch eligibility questions for a service
export const useEligibilityQuestions = (serviceId: string) => {
  return useQuery({
    queryKey: ["eligibility_questions", serviceId],
    queryFn: async (): Promise<EligibilityQuestion[]> => {
      const data = await fetchApi<EligibilityQuestion[]>(`/services/${serviceId}/eligibility`);
      return data;
    },
    enabled: !!serviceId,
  });
};

// Fetch required documents for a service
export const useRequiredDocuments = (serviceId: string) => {
  return useQuery({
    queryKey: ["required_documents", serviceId],
    queryFn: async (): Promise<RequiredDocument[]> => {
      const data = await fetchApi<RequiredDocument[]>(`/services/${serviceId}/documents`);
      return data;
    },
    enabled: !!serviceId,
  });
};

// Fetch all districts with municipalities
export const useDistricts = () => {
  return useQuery({
    queryKey: ["districts"],
    queryFn: async (): Promise<District[]> => {
      const data = await fetchApi<District[]>("/districts");
      return data;
    },
  });
};

// Fetch offices
export const useOffices = () => {
  return useQuery({
    queryKey: ["offices"],
    queryFn: async (): Promise<Office[]> => {
      const data = await fetchApi<Office[]>("/offices");
      return data;
    },
  });
};

// Fetch procedure steps for a service
export const useProcedureSteps = (serviceId: string) => {
  return useQuery({
    queryKey: ["procedure_steps", serviceId],
    queryFn: async (): Promise<ProcedureStep[]> => {
      const data = await fetchApi<ProcedureStep[]>(`/services/${serviceId}/procedures`);
      return data;
    },
    enabled: !!serviceId,
  });
};

// Fetch cost and time info for a service
export const useServiceCost = (serviceId: string) => {
  return useQuery({
    queryKey: ["service_costs", serviceId],
    queryFn: async (): Promise<CostAndTimeInfo | null> => {
      const data = await fetchApi<CostAndTimeInfo | null>(`/services/${serviceId}/cost`);
      return data;
    },
    enabled: !!serviceId,
  });
};

// Fetch downloadable forms for a service
export const useDownloadableForms = (serviceId: string) => {
  return useQuery({
    queryKey: ["downloadable_forms", serviceId],
    queryFn: async (): Promise<DownloadableForm[]> => {
      const data = await fetchApi<DownloadableForm[]>(`/services/${serviceId}/forms`);
      return data;
    },
    enabled: !!serviceId,
  });
};

// Fetch service info
export const useServiceInfo = (serviceId: string) => {
  return useQuery({
    queryKey: ["service_info", serviceId],
    queryFn: async (): Promise<ServiceInfo | null> => {
      const data = await fetchApi<ServiceInfo | null>(`/services/${serviceId}/info`);
      return data;
    },
    enabled: !!serviceId,
  });
};

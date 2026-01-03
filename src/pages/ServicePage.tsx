import { ArrowLeft, Loader2 } from "lucide-react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EligibilityChecker from "@/components/EligibilityChecker";
import DocumentChecklist from "@/components/DocumentChecklist";
import OfficeFinder from "@/components/OfficeFinder";
import ProcedureGuide from "@/components/ProcedureGuide";
import CostAndTime from "@/components/CostAndTime";
import FormsDownload from "@/components/FormsDownload";
import { useServices, useServiceInfo } from "@/hooks/useServices";
import { useEffect, useRef, useState } from "react";

const ServicePage = () => {

  
  const topRef = useRef<HTMLDivElement>(null);
  const documentsRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);
  const procedureRef = useRef<HTMLDivElement>(null);
  const formsRef = useRef<HTMLDivElement>(null);
  const costRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("eligibility");

  const { serviceId } = useParams<{ serviceId: string }>();
  const { data: services = [], isLoading: loadingServices } = useServices();
  const { data: info, isLoading: loadingInfo } = useServiceInfo(serviceId || "");

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [serviceId]);

  // Check if service exists and is available
  const service = services.find(s => s.id === serviceId);

  console.log('ServicePage serviceId:', serviceId);
  if (loadingServices || loadingInfo) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!service || !service.available || !info) {
    return <Navigate to="/" replace />;
  }

  const navigateToTab = (tab: string, ref: React.RefObject<HTMLDivElement>) => {
    setActiveTab(tab);
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div ref={topRef} className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground py-12">
          <div className="container">
            <Button variant="ghost" size="sm" asChild className="mb-6 hover:bg-white/10">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Services
              </Link>
            </Button>

            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">
                {info.title}
              </h1>
              <p className="text-xl opacity-90 mb-4">{info.titleNepali}</p>
              <p className="text-secondary-foreground/80 max-w-2xl">
                {info.longDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted p-1 rounded-lg mb-8">
                <TabsTrigger
                  value="eligibility"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-card"
                >
                  Eligibility
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-card"
                >
                  Documents
                </TabsTrigger>
                <TabsTrigger
                  value="office"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-card"
                >
                  Find Office
                </TabsTrigger>
                <TabsTrigger
                  value="procedure"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-card"
                >
                  Procedure
                </TabsTrigger>
                <TabsTrigger
                  value="forms"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-card"
                >
                  Forms
                </TabsTrigger>
                <TabsTrigger
                  value="cost"
                  className="flex-1 min-w-[100px] data-[state=active]:bg-card"
                >
                  Cost & Time
                </TabsTrigger>
              </TabsList>

              <TabsContent value="eligibility" className="mt-0">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Check Your Eligibility</h2>
                    <p className="text-muted-foreground">
                      Answer a few questions to determine if you are eligible for this service.
                    </p>
                  </div>
                  <EligibilityChecker
                    serviceId={serviceId}
                    onNext={() => navigateToTab("documents", documentsRef)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="documents" className="mt-0">
                <div ref={documentsRef} className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Required Documents</h2>
                    <p className="text-muted-foreground">
                      Check off documents as you collect them. All checked documents are required for your application.
                    </p>
                  </div>
                  <DocumentChecklist
                    serviceId={serviceId}
                    onNext={() => navigateToTab("office", officeRef)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="office" className="mt-0">
                <div ref={officeRef} className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Find Your Office</h2>
                    <p className="text-muted-foreground">
                      Locate the nearest office for this service based on your location.
                    </p>
                  </div>
                  <OfficeFinder
                    serviceId={serviceId}
                    onNext={() => navigateToTab("procedure", procedureRef)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="procedure" className="mt-0">
                <div ref={procedureRef} className="max-w-3xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Application Procedure</h2>
                    <p className="text-muted-foreground">
                      Follow these steps in order. Click each step to mark it as complete.
                    </p>
                  </div>
                  <ProcedureGuide
                    serviceId={serviceId}
                    onNext={() => navigateToTab("forms", formsRef)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="forms" className="mt-0">
                <div ref={formsRef} className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Forms & Downloads</h2>
                    <p className="text-muted-foreground">
                      Download application forms or access official online portals.
                    </p>
                  </div>
                  <FormsDownload
                    serviceId={serviceId!}
                    onNext={() => navigateToTab("cost", costRef)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="cost" className="mt-0">
                <div ref={costRef} className="max-w-2xl mx-auto">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Fees & Processing Time</h2>
                    <p className="text-muted-foreground">
                      Information about government fees and expected processing duration.
                    </p>
                  </div>
                  <CostAndTime serviceId={serviceId} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="pb-16">
          <div className="container">
            <div className="max-w-3xl mx-auto p-4 rounded-lg bg-muted border border-border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Disclaimer:</strong> This information is provided for guidance purposes only.
                Always verify requirements with the official government office or ministry website.
                Procedures and requirements may change.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ServicePage;

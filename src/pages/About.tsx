import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Shield, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Nagarik Sewa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            नागरिक सेवा - Bridging the gap between citizens and government services in Nepal
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-card rounded-xl border border-border p-8 mb-12">
          <h2 className="font-display text-2xl font-semibold mb-4 flex items-center gap-3">
            <Target className="h-6 w-6 text-primary" />
            Our Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Many citizens in Nepal struggle to access government services due to fragmented information, 
            unclear procedures, and reliance on middlemen. There is no proper guidance mechanism for 
            citizens seeking document-related government services. This results in repeated visits to 
            offices and unnecessary delays.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            <strong className="text-foreground">Nagarik Sewa</strong> is a web-based platform that acts as a mediator between 
            government offices and common citizens by providing step-by-step procedures, required documents, 
            office locations, official portals, and eligibility checks.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card rounded-xl border border-border p-6">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">For Citizens</h3>
            <p className="text-muted-foreground text-sm">
              No more repeated office visits. Come prepared with all required documents 
              and complete knowledge of the process.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="h-12 w-12 rounded-lg bg-accent/50 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">For Government</h3>
            <p className="text-muted-foreground text-sm">
              Eases the work of government employees as citizens arrive better prepared, 
              reducing processing time and queries.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Transparency</h3>
            <p className="text-muted-foreground text-sm">
              Blocks the path of middlemen and encourages transparent, corruption-free 
              service delivery.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-secondary/50 rounded-xl p-8 mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-foreground">Eligibility Checker</strong>
                <p className="text-sm text-muted-foreground">
                  Answer simple questions to know if you qualify for a service
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-foreground">Document Checklist</strong>
                <p className="text-sm text-muted-foreground">
                  Complete list of required documents with checkboxes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-foreground">Office Finder</strong>
                <p className="text-sm text-muted-foreground">
                  Find nearest offices sorted by province, district, and ward
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-foreground">Step-by-Step Guide</strong>
                <p className="text-sm text-muted-foreground">
                  Clear online and offline procedures with forms and links
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-foreground">Forms & Downloads</strong>
                <p className="text-sm text-muted-foreground">
                  Direct links to official government portals and PDF forms
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
              <div>
                <strong className="text-foreground">Cost & Time Estimates</strong>
                <p className="text-sm text-muted-foreground">
                  Know the fees and processing time before you start
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-accent/20 border border-accent rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> This is an informational platform. 
            Always verify information with official government sources before proceeding. 
            We are not affiliated with any government body.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

import { ArrowRight, Shield, Clock, Users, CheckCircle, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCard from "@/components/ServiceCard";
import { useServices } from "@/hooks/useServices";
import { useRef } from "react";

const Index = () => {
  const servicesRef = useRef<HTMLElement>(null);
  const { data: services = [], isLoading } = useServices();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="hero" className="relative overflow-hidden gradient-hero text-white">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="container relative pt-12 pb-20 lg:pt-16 lg:pb-32">
            <div className="max-w-4xl">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8 tracking-tight">
                Navigate Nepal's Government Services with{" "}
                <span className="text-accent inline-block">Confidence</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
                नागरिक सेवा - A comprehensive platform providing step-by-step guidance,
                required documents, office locations, and eligibility checks for all
                government services in Nepal.
              </p>

              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5 text-sm mb-8 backdrop-blur-sm border border-white/20">
                <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse-soft" />
                <span className="font-medium">Your guide to government services</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 shadow-lg hover:shadow-xl transition-all px-8 py-6 text-lg"
                  onClick={() =>
                    servicesRef.current?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/40">
          <div className="container">
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Use नागरिक सेवा?
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to understand, prepare, and complete government
                services—without confusion or middlemen.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: "Eligibility Check",
                  description:
                    "Instantly know whether you qualify before starting the application process.",
                },
                {
                  icon: Shield,
                  title: "Trusted Official",
                  description:
                    "Information sourced from official government procedures—no misinformation.",
                },
                {
                  icon: Clock,
                  title: "Save Time and Effort",
                  description:
                    "Avoid unnecessary office visits by preparing the right documents in advance.",
                },
                {
                  icon: Users,
                  title: "Accessible for Everyone",
                  description:
                    "Simple language with support in both English and Nepali.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group rounded-2xl bg-card border border-border p-6 transition-all hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" ref={servicesRef} className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Government Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select a service to view complete information including eligibility criteria,
                required documents, office locations, and step-by-step procedures.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No services available. Please seed the database with initial data.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-secondary text-secondary-foreground">
          <div className="container text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Ready to Start?
            </h2>
            <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8">
              Begin with our most popular service - Citizenship Certificate.
              Follow our comprehensive guide and complete your application with confidence.
            </p>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/services/citizenship">
                Apply for Citizenship
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

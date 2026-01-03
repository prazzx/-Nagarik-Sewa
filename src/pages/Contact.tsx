import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const governmentContacts = [
    {
      name: "Ministry of Home Affairs",
      nameNepali: "गृह मन्त्रालय",
      phone: "01-4211209",
      website: "https://moha.gov.np",
      description: "Citizenship, Passport, Immigration"
    },
    {
      name: "Department of Transport Management",
      nameNepali: "यातायात व्यवस्था विभाग",
      phone: "01-4474921",
      website: "https://dotm.gov.np",
      description: "Driving License, Vehicle Registration"
    },
    {
      name: "Department of Land Management",
      nameNepali: "भूमि व्यवस्थापन विभाग",
      phone: "01-4262652",
      website: "https://dolma.gov.np",
      description: "Land Registration, Land Records"
    },
    {
      name: "Office of Company Registrar",
      nameNepali: "कम्पनी रजिष्ट्रार कार्यालय",
      phone: "01-4224281",
      website: "https://ocr.gov.np",
      description: "Company Registration, Business"
    },
    {
      name: "Inland Revenue Department",
      nameNepali: "आन्तरिक राजस्व विभाग",
      phone: "01-4415802",
      website: "https://ird.gov.np",
      description: "PAN, VAT, Tax Registration"
    },
    {
      name: "Department of National ID & Civil Registration",
      nameNepali: "राष्ट्रिय परिचयपत्र तथा पञ्जीकरण विभाग",
      phone: "01-4221389",
      website: "https://donidcr.gov.np",
      description: "Birth, Death, Marriage Registration"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Contact & Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find official government contacts and resources for your queries
          </p>
        </div>

        {/* Nagarik Sewa Contact */}
        <div className="bg-card rounded-xl border border-border p-8 mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6 flex items-center gap-3">
            <MessageSquare className="h-6 w-6 text-primary" />
            Contact Nagarik Sewa
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-muted-foreground">info@nagariksewa.np</p>
                <p className="text-sm text-muted-foreground mt-1">For suggestions and feedback</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Location</h3>
                <p className="text-muted-foreground">Kathmandu, Nepal</p>
                <p className="text-sm text-muted-foreground mt-1">Online platform only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Government Contacts */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">
            Official Government Contacts
          </h2>
          <p className="text-muted-foreground mb-6">
            For official queries and services, please contact the respective government departments directly:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {governmentContacts.map((contact, index) => (
              <div key={index} className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 transition-colors">
                <h3 className="font-semibold text-lg">{contact.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{contact.nameNepali}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{contact.phone}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{contact.description}</p>
                </div>
                
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href={contact.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Helplines */}
        <div className="bg-secondary/50 rounded-xl p-8 mb-12">
          <h2 className="font-display text-2xl font-semibold mb-6">Important Helplines</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">1100</p>
              <p className="text-sm text-muted-foreground">Hello Sarkar</p>
            </div>
            <div className="bg-card rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">100</p>
              <p className="text-sm text-muted-foreground">Nepal Police</p>
            </div>
            <div className="bg-card rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-primary">102</p>
              <p className="text-sm text-muted-foreground">Ambulance</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-accent/20 border border-accent rounded-xl p-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> Nagarik Sewa is an informational platform. 
            For official services, please visit the respective government offices or their official websites.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

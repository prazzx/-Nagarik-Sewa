import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-secondary text-secondary-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg">
                न
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-semibold leading-tight">
                  Nagarik Sewa
                </span>
                <span className="text-xs opacity-80">नागरिक सेवा</span>
              </div>
            </div>
            <p className="text-sm opacity-80 max-w-xs">
              Bridging the gap between citizens and government services in Nepal.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><Link to="/#hero" className="hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/services/citizenship" className="hover:opacity-100 transition-opacity">Citizenship</Link></li>
              <li><Link to="/services/passport" className="hover:opacity-100 transition-opacity">Passport</Link></li>
              <li><Link to="/services/driving" className="hover:opacity-100 transition-opacity">Driving License</Link></li>
            </ul>
          </div>

         <div>
  <h4 className="font-semibold mb-4">Resources</h4>
  <ul className="space-y-2 text-sm opacity-80">
    <li>
      <a 
        href="http://nationaldata.gov.np/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:opacity-100 transition-opacity"
      >
        Government Portal
      </a>
    </li>
    <li>
      <a 
        href="https://www.moha.gov.np/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:opacity-100 transition-opacity"
      >
        Ministry of Home Affairs
      </a>
    </li>
    <li>
      <a 
        href="https://www.immigration.gov.np/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:opacity-100 transition-opacity"
      >
        Department of Immigration
      </a>
    </li>
    <li>
      <a 
        href="https://mofa.gov.np/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="hover:opacity-100 transition-opacity"
      >
        Ministry of Foreign Affairs
      </a>
    </li>
  </ul>
</div>


          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Email: Coming soon ....</li>
              <li>Phone: Coming soon ....</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/30 mt-8 pt-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} Nagarik Sewa. This is an informational platform.</p>
          <p className="mt-1">Always verify information with official government sources.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

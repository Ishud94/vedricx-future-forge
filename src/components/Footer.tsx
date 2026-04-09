import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-surface-dark text-surface-dark-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-hero-gradient" />
            <span className="font-heading text-xl font-bold">VedricX Global</span>
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Empowering the next generation of engineers and businesses with cutting-edge education and AI solutions.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/programs" className="hover:opacity-100 transition-opacity">Aircraft Design</Link></li>
            <li><Link to="/programs" className="hover:opacity-100 transition-opacity">CFD Analysis</Link></li>
            <li><Link to="/programs" className="hover:opacity-100 transition-opacity">FEA Simulation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/services" className="hover:opacity-100 transition-opacity">AI Automation</Link></li>
            <li><Link to="/services" className="hover:opacity-100 transition-opacity">Business Intelligence</Link></li>
            <li><Link to="/services" className="hover:opacity-100 transition-opacity">Custom Systems</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
            <li><a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">WhatsApp</a></li>
            <li><a href="mailto:hello@vedricx.com" className="hover:opacity-100 transition-opacity">Email</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm opacity-50">
        © {new Date().getFullYear()} VedricX Global. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

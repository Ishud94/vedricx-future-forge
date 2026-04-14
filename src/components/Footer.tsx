import { Link } from "react-router-dom";
const vedricxLogo = "/images/vedricx-logo.png";

const Footer = () => (
  <footer className="bg-surface-dark text-surface-dark-foreground">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <img src={vedricxLogo} alt="VedricX Global" className="h-10 w-auto" />
          </div>
          <p className="text-sm opacity-70 leading-relaxed">
            Empowering the next generation of engineers and businesses with cutting-edge education and AI-powered business systems.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Programs</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/programs" className="hover:opacity-100 transition-opacity">Aircraft Design & Simulation</Link></li>
            <li><Link to="/programs" className="hover:opacity-100 transition-opacity">CFD Industrial Training</Link></li>
            <li><Link to="/programs" className="hover:opacity-100 transition-opacity">FEA Industrial Training</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Solutions</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/services" className="hover:opacity-100 transition-opacity">AI & Automation</Link></li>
            <li><Link to="/services" className="hover:opacity-100 transition-opacity">Business Systems</Link></li>
            <li><Link to="/services" className="hover:opacity-100 transition-opacity">Data Intelligence</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold mb-4">Connect</h4>
          <ul className="space-y-2 text-sm opacity-70">
            <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact Us</Link></li>
<<<<<<< HEAD
            <li><a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">WhatsApp</a></li>
=======
            <li><a href="tel:+918439120370" className="hover:opacity-100 transition-opacity">+91 8439120370</a></li>
>>>>>>> c9e07404a4ab60532c920cf6f8c4b02058e5d061
            <li><a href="mailto:info@vedricxglobal.com" className="hover:opacity-100 transition-opacity">info@vedricxglobal.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm opacity-50">
<<<<<<< HEAD
        © {new Date().getFullYear()} VedricX Global. All rights reserved.
=======
        <p>© {new Date().getFullYear()} VedricX Global. All rights reserved.</p>
        <p className="mt-2">LLP Identification No. ACU-3822</p>
>>>>>>> c9e07404a4ab60532c920cf6f8c4b02058e5d061
      </div>
    </div>
  </footer>
);

export default Footer;

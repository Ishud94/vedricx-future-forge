import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Programs", path: "/programs" },
  { label: "Build Your System", path: "/services" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, role, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/vedricx-logo.png" alt="VedricX Global" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              {role === "admin" && (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin"><Shield className="mr-1.5 h-3.5 w-3.5" /> Admin</Link>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard"><LayoutDashboard className="mr-1.5 h-3.5 w-3.5" /> Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/contact">Get Started</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm font-medium py-2 transition-colors hover:text-primary ${
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <>
              {role === "admin" && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 text-muted-foreground hover:text-primary">
                  Admin Panel
                </Link>
              )}
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block text-sm font-medium py-2 text-muted-foreground hover:text-primary">
                Dashboard
              </Link>
              <Button variant="outline" className="w-full" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild className="w-full">
                <Link to="/auth" onClick={() => setMobileOpen(false)}>Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link to="/contact" onClick={() => setMobileOpen(false)}>Get Started</Link>
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

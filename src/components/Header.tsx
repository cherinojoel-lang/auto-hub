import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-lg sm:text-2xl font-heading font-bold text-primary">
              Automobile Quick
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link
              to="/"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Start
            </Link>
            <Link
              to="/vehicles"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Fahrzeugbestand
            </Link>
            <Link
              to="/autoankauf"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Autoankauf
            </Link>
            <Link
              to="/finanzierung"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Finanzierung
            </Link>
            <Link
              to="/about"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Über uns
            </Link>
            <Link
              to="/contact"
              className="text-sm lg:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Kontakt & Anfahrt
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-3 sm:gap-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Start
              </Link>
              <Link
                to="/vehicles"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Fahrzeugbestand
              </Link>
              <Link
                to="/autoankauf"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Autoankauf
              </Link>
              <Link
                to="/finanzierung"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Finanzierung
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Über uns
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm sm:text-base text-foreground hover:text-primary transition-colors duration-200 font-medium py-2"
              >
                Kontakt & Anfahrt
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

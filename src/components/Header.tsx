import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-gray-200 shadow-md" role="banner">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Automobile Quick - Startseite">
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-heading font-bold text-primary leading-tight">
                Automobile Quick
              </span>
              <span className="text-[10px] sm:text-xs text-secondary font-medium tracking-wide">
                SEIT 1982
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" role="navigation" aria-label="Hauptnavigation">
            <Link
              to="/"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium rounded-sm"
            >
              Start
            </Link>
            <Link
              to="/fahrzeugbestand"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium rounded-sm"
            >
              Fahrzeugbestand
            </Link>
            <Link
              to="/autoankauf"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium rounded-sm"
            >
              Autoankauf
            </Link>
            <Link
              to="/finanzierung"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium rounded-sm"
            >
              Finanzierung
            </Link>
            <Link
              to="/ueber-uns"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium rounded-sm"
            >
              Über uns
            </Link>
            <Link
              to="/kontakt"
              className="px-3 lg:px-4 py-2 text-sm lg:text-base text-foreground hover:text-primary hover:bg-gray-50 transition-all duration-200 font-medium rounded-sm"
            >
              Kontakt
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:+492374912912"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-medium rounded-sm hover:bg-secondary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Phone size={16} />
              <span>+49 (0) 2374 / 912912</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus:outline-none"
            aria-label={mobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-navigation" className="md:hidden py-4 border-t border-gray-200 bg-gray-50" role="navigation" aria-label="Mobile Navigation">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-white transition-all duration-200 font-medium"
              >
                Start
              </Link>
              <Link
                to="/fahrzeugbestand"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-white transition-all duration-200 font-medium"
              >
                Fahrzeugbestand
              </Link>
              <Link
                to="/autoankauf"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-white transition-all duration-200 font-medium"
              >
                Autoankauf
              </Link>
              <Link
                to="/finanzierung"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-white transition-all duration-200 font-medium"
              >
                Finanzierung
              </Link>
              <Link
                to="/ueber-uns"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-white transition-all duration-200 font-medium"
              >
                Über uns
              </Link>
              <Link
                to="/kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-sm text-foreground hover:text-primary hover:bg-white transition-all duration-200 font-medium"
              >
                Kontakt & Anfahrt
              </Link>
              <div className="border-t border-gray-200 mt-3 pt-3">
                <a
                  href="tel:+492374912912"
                  className="flex items-center justify-center gap-2 mx-4 px-4 py-3 bg-secondary text-white text-sm font-medium rounded-sm hover:bg-secondary/90 transition-all duration-200"
                >
                  <Phone size={16} />
                  <span>Anrufen</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

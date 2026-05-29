import { Link } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card-bg border-b border-border-line" role="banner">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-heading font-bold text-primary leading-tight">
                Automobile Quick
              </span>
              <span className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-normal">
                SEIT 1982
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation" aria-label="Hauptnavigation">
            <Link
              to="/"
              className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-alt-bg transition-all duration-200 font-medium rounded-sm"
            >
              Start
            </Link>
            <Link
              to="/fahrzeugbestand"
              className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-alt-bg transition-all duration-200 font-medium rounded-sm"
            >
              Fahrzeugbestand
            </Link>
            <Link
              to="/autoankauf"
              className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-alt-bg transition-all duration-200 font-medium rounded-sm"
            >
              Autoankauf
            </Link>
            <Link
              to="/finanzierung"
              className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-alt-bg transition-all duration-200 font-medium rounded-sm"
            >
              Finanzierung
            </Link>
            <Link
              to="/ueber-uns"
              className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-alt-bg transition-all duration-200 font-medium rounded-sm"
            >
              Über uns
            </Link>
            <Link
              to="/kontakt"
              className="whitespace-nowrap px-3 xl:px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-alt-bg transition-all duration-200 font-medium rounded-sm"
            >
              Kontakt
            </Link>
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+492374912912"
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-bold rounded-md hover:bg-cta-hover transition-all duration-200"
            >
              <Phone size={16} />
              <span>+49 (0) 2374 / 912912</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-11 min-w-11 p-2 text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileMenuOpen}
            aria-controls={mobileMenuOpen ? 'mobile-menu' : undefined}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" className="lg:hidden py-4 border-t border-border-line bg-alt-bg" role="navigation" aria-label="Mobile Navigation">
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-11 text-base text-foreground hover:text-primary hover:bg-card-bg transition-all duration-200 font-medium"
              >
                Start
              </Link>
              <Link
                to="/fahrzeugbestand"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-11 text-base text-foreground hover:text-primary hover:bg-card-bg transition-all duration-200 font-medium"
              >
                Fahrzeugbestand
              </Link>
              <Link
                to="/autoankauf"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-11 text-base text-foreground hover:text-primary hover:bg-card-bg transition-all duration-200 font-medium"
              >
                Autoankauf
              </Link>
              <Link
                to="/finanzierung"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-11 text-base text-foreground hover:text-primary hover:bg-card-bg transition-all duration-200 font-medium"
              >
                Finanzierung
              </Link>
              <Link
                to="/ueber-uns"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-11 text-base text-foreground hover:text-primary hover:bg-card-bg transition-all duration-200 font-medium"
              >
                Über uns
              </Link>
              <Link
                to="/kontakt"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 min-h-11 text-base text-foreground hover:text-primary hover:bg-card-bg transition-all duration-200 font-medium"
              >
                Kontakt & Anfahrt
              </Link>
              <div className="border-t border-border-line mt-3 pt-3">
                <a
                  href="tel:+492374912912"
                  className="flex items-center justify-center gap-2 mx-4 px-4 py-3 min-h-12 bg-secondary text-white text-sm font-medium rounded-sm hover:bg-cta-hover transition-all duration-200"
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

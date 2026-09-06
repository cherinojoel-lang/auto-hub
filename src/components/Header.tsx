import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: '/', label: 'Start' },
    { to: '/fahrzeugbestand', label: 'Fahrzeugbestand' },
    { to: '/autoankauf', label: 'Autoankauf' },
    { to: '/finanzierung', label: 'Finanzierung' },
    { to: '/ueber-uns', label: 'Über uns' },
    { to: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-card-bg border-b border-border-line" role="banner">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0" aria-label="Automobile Quick Startseite">
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-heading font-bold text-primary leading-tight">
                Automobile Quick
              </span>
              <span className="text-[10px] sm:text-xs text-secondary font-bold uppercase tracking-wider">
                SEIT 1982
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" role="navigation" aria-label="Hauptnavigation">
            {navLinks.map((link) => {
              const active = isActive(link.to);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`whitespace-nowrap px-3 xl:px-4 py-2 text-sm transition-all duration-200 rounded-sm ${
                    active
                      ? 'text-primary font-bold bg-alt-bg shadow-xs'
                      : 'text-foreground hover:text-primary hover:bg-alt-bg font-medium'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+492374912912"
              className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-white text-sm font-bold rounded-md hover:bg-cta-hover transition-all duration-200 shadow-xs"
              aria-label="Automobile Quick anrufen: +49 (0) 2374 / 912912"
            >
              <Phone size={16} />
              <span>+49 (0) 2374 / 912912</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden min-h-12 min-w-12 p-3 text-foreground hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md inline-flex items-center justify-center"
            aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" className="lg:hidden py-4 border-t border-border-line bg-alt-bg animate-fade-in" role="navigation" aria-label="Mobile Navigation">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 min-h-12 text-base transition-all duration-200 flex items-center ${
                      active
                        ? 'text-primary font-bold bg-white'
                        : 'text-foreground hover:text-primary hover:bg-card-bg font-medium'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="border-t border-border-line mt-3 pt-3">
                <a
                  href="tel:+492374912912"
                  className="flex items-center justify-center gap-2 mx-4 px-4 py-3.5 min-h-12 bg-secondary text-white text-sm font-bold rounded-md hover:bg-cta-hover transition-all duration-200 shadow-xs"
                >
                  <Phone size={16} />
                  <span>Jetzt anrufen: +49 (0) 2374 / 912912</span>
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

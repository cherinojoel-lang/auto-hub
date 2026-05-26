import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Start', path: '/' },
    { label: 'Fahrzeuge', path: '/fahrzeugbestand' },
    { label: 'Autoankauf', path: '/autoankauf' },
    { label: 'Finanzierung', path: '/finanzierung' },
    { label: 'Über uns', path: '/ueber-uns' },
    { label: 'Kontakt', path: '/kontakt' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-1000 h-16 bg-white/95 backdrop-blur-md border-b border-gray-100"
          role="banner"
        >
          <div className="container mx-auto px-4 max-w-[100rem] h-full flex items-center justify-between">
            {/* Logo - Hidden on mobile, visible on tablet+ */}
            <Link
              to="/"
              className="hidden sm:flex items-center flex-shrink-0"
              aria-label="Automobile Quick - Startseite"
            >
              <div className="flex flex-col">
                <span className="text-sm font-heading font-bold text-primary leading-tight">
                  Automobile Quick
                </span>
                <span className="text-[8px] text-secondary font-medium tracking-wide">
                  SEIT 1982
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on tablet and below */}
            <nav className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Hauptnavigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-200 pb-1 ${
                    isActive(link.path)
                      ? 'text-secondary border-b-2 border-secondary'
                      : 'text-foreground hover:text-secondary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Phone Button */}
            <a
              href="tel:+492374912912"
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-secondary/90 transition-all duration-200"
            >
              <Phone size={16} />
              <span>+49 2374 / 912912</span>
            </a>

            {/* Tablet/Mobile - Hamburger Menu and Phone Icon */}
            <div className="lg:hidden flex items-center gap-3">
              {/* Phone Icon - Mobile only */}
              <a
                href="tel:+492374912912"
                className="md:hidden p-2 text-secondary hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Anrufen"
              >
                <Phone size={20} />
              </a>

              {/* Phone Button - Tablet only */}
              <a
                href="tel:+492374912912"
                className="hidden md:flex lg:hidden items-center gap-2 px-3 py-2 bg-secondary text-white text-xs font-medium rounded-lg hover:bg-secondary/90 transition-all duration-200"
              >
                <Phone size={14} />
                <span>Anrufen</span>
              </a>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-foreground hover:text-secondary transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile/Tablet Slide-in Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-16 right-0 w-full md:w-80 bg-white border-b border-gray-100 shadow-lg"
              >
                <nav className="flex flex-col" role="navigation" aria-label="Mobile Navigation">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-6 py-4 text-sm font-medium border-b border-gray-100 transition-all duration-200 ${
                        isActive(link.path)
                          ? 'text-secondary bg-gray-50 border-l-4 border-l-secondary'
                          : 'text-foreground hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

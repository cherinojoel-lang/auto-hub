import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-primary text-white" role="contentinfo">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 max-w-7xl py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold mb-4">
              Automobile Quick
            </h3>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Iserlohn-Letmathe seit 1982.
            </p>
            <p className="text-xs text-white/60 font-medium">
              Ein guter Gebrauchter ist keine Glücksache
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-secondary" />
                <div className="text-sm text-white/80">
                  <p className="font-medium">Hagener Str. 126a</p>
                  <p>58642 Iserlohn</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="flex-shrink-0 text-secondary" />
                <a href="tel:+4923749157-0" className="text-sm text-white/80 hover:text-white transition-colors">
                  +49 2374 9157-0
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0 text-secondary" />
                <a href="mailto:info@automobile-quick.de" className="text-sm text-white/80 hover:text-white transition-colors">
                  info@automobile-quick.de
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={18} className="flex-shrink-0 text-secondary" />
                <div className="text-sm text-white/80">
                  <p>Mo-Fr: 09:00 - 18:00</p>
                  <p>Sa: 10:00 - 16:00</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <Link
                to="/"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Start
              </Link>
              <Link
                to="/fahrzeugbestand"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Fahrzeugbestand
              </Link>
              <Link
                to="/autoankauf"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Autoankauf
              </Link>
              <Link
                to="/finanzierung"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Finanzierung
              </Link>
              <Link
                to="/ueber-uns"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Über uns
              </Link>
              <Link
                to="/kontakt"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Kontakt & Anfahrt
              </Link>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold mb-4">Rechtliches</h3>
            <nav className="space-y-2">
              <Link
                to="/impressum"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Impressum
              </Link>
              <Link
                to="/datenschutz"
                className="block text-sm text-white/80 hover:text-white transition-colors duration-200"
              >
                Datenschutz
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 sm:py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs sm:text-sm text-white/70">
              © 2026 Automobile Quick. Alle Rechte vorbehalten.
            </p>
            <p className="text-xs sm:text-sm text-white/70">
              Hagener Str. 126a, 58642 Iserlohn | Seit 1982
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-accent text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">
              Automobile Quick
            </h3>
            <p className="text-background/80 mb-4">
              Ihr Partner für hochwertige Gebrauchtwagen in Iserlohn-Letmathe
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <div>
                  <p className="text-background/90">Delsterner Str. 92</p>
                  <p className="text-background/90">58091 Hagen</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0" />
                <p className="text-background/90">+49 (0) 2331 123456</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="flex-shrink-0" />
                <p className="text-background/90">info@automobilequick.de</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">Links</h3>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-background/90 hover:text-background transition-colors duration-200"
              >
                Start
              </Link>
              <Link
                to="/vehicles"
                className="block text-background/90 hover:text-background transition-colors duration-200"
              >
                Fahrzeugbestand
              </Link>
              <Link
                to="/about"
                className="block text-background/90 hover:text-background transition-colors duration-200"
              >
                Über uns
              </Link>
              <Link
                to="/contact"
                className="block text-background/90 hover:text-background transition-colors duration-200"
              >
                Kontakt & Anfahrt
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/80">
            © 2026 Automobile Quick - Alle Rechte vorbehalten
          </p>
        </div>
      </div>
    </footer>
  );
}

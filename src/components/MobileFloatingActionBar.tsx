import { Phone, MessageSquare, Car, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileFloatingActionBar() {
  const { pathname } = useLocation();
  const isVehicleDetailPage = pathname.startsWith('/fahrzeugdetail/');

  if (isVehicleDetailPage) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border-line"
      style={{
        maxHeight: '72px',
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex h-16 items-center justify-around max-w-7xl mx-auto px-2">
        {/* Call Button */}
        <a
          href="tel:+492374912912"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-secondary"
          aria-label="Anrufen"
        >
          <Phone size={20} />
          <span className="text-[10px] font-bold">Anrufen</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href="https://wa.me/492374912912?text=Hallo%20Automobile%20Quick,%20ich%20habe%20eine%20allgemeine%20Anfrage."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-[#25D366]"
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} />
          <span className="text-[10px] font-bold">WhatsApp</span>
        </a>

        {/* Contact Button */}
        <Link
          to="/kontakt"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-foreground"
          aria-label="Anfrage"
        >
          <MessageSquare size={20} />
          <span className="text-[10px] font-bold">Anfrage</span>
        </Link>

        {/* Vehicles Button */}
        <Link
          to="/fahrzeugbestand"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-foreground"
          aria-label="Fahrzeuge"
        >
          <Car size={20} />
          <span className="text-[10px] font-bold">Fahrzeuge</span>
        </Link>
      </div>
    </div>
  );
}

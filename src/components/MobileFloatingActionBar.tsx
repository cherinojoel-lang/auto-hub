import { Phone, MessageSquare, Car, MessageCircle, Filter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function MobileFloatingActionBar() {
  const { pathname } = useLocation();
  const isVehicleDetailPage = pathname.startsWith('/fahrzeugdetail/');
  const isInventoryPage = pathname === '/fahrzeugbestand';

  if (isVehicleDetailPage) return null;

  const itemClass =
    'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-xs font-bold transition-colors';

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border-line bg-white md:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
      }}
      aria-label="Schnellaktionen"
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-stretch px-1">
        <a
          href="tel:+492374912912"
          className={`${itemClass} text-secondary`}
          aria-label="Anrufen"
        >
          <Phone size={20} aria-hidden="true" />
          <span>Anrufen</span>
        </a>

        <a
          href="https://wa.me/492374912912?text=Hallo%20Automobile%20Quick,%20ich%20habe%20eine%20allgemeine%20Anfrage."
          target="_blank"
          rel="noopener noreferrer"
          className={`${itemClass} text-[#128C3A]`}
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <Link
          to="/kontakt"
          className={`${itemClass} text-foreground`}
          aria-label="Anfrage"
        >
          <MessageSquare size={20} aria-hidden="true" />
          <span>Anfrage</span>
        </Link>

        {isInventoryPage ? (
          <Link
            to="/fahrzeugbestand#main-content"
            className={`${itemClass} text-primary`}
            aria-label="Filter"
          >
            <Filter size={20} aria-hidden="true" />
            <span>Filter</span>
          </Link>
        ) : (
          <Link
            to="/fahrzeugbestand"
            className={`${itemClass} text-foreground`}
            aria-label="Fahrzeuge"
          >
            <Car size={20} aria-hidden="true" />
            <span>Fahrzeuge</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

import { Phone, MessageSquare, Car } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MobileFloatingActionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    // Performance optimization: Throttle scroll event using requestAnimationFrame
    // to prevent excessive re-renders and use passive listener to avoid blocking
    // the compositor thread.
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          // Show after 300px scroll
          setIsVisible(currentScrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-border-line"
      style={{
        maxHeight: '72px',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      <div className="flex h-16 items-center justify-around max-w-7xl mx-auto px-4">
        {/* Call Button */}
        <a
          href="tel:+492374912912"
          className="flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors text-secondary"
          aria-label="Anrufen"
        >
          <Phone size={20} />
          <span className="text-[10px] font-bold">Anrufen</span>
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

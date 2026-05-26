import { Phone, MessageCircle, Car } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileFloatingActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY;

          // Show after 200px scroll
          if (currentScrollY > 200) {
            if (isScrollingDown && !isHiding) {
              setIsHiding(true);
            } else if (!isScrollingDown && isHiding) {
              setIsHiding(false);
            }
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isHiding]);

  const whatsappLink = `https://wa.me/492374912912?text=${encodeURIComponent(
    'Hallo Automobile Quick, ich habe eine Frage zu Ihren Fahrzeugen.'
  )}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: isHiding ? 100 : 0, opacity: isHiding ? 0 : 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 h-16"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        >
          <div className="flex h-16 items-center justify-around">
            {/* Call Button */}
            <a
              href="tel:+492374912912"
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-secondary hover:bg-gray-50 transition-colors"
              aria-label="Anrufen"
            >
              <Phone size={20} />
              <span className="text-[10px] font-medium">Anrufen</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-green-500 hover:bg-gray-50 transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={20} />
              <span className="text-[10px] font-medium">WhatsApp</span>
            </a>

            {/* Vehicles Button */}
            <Link
              to="/fahrzeugbestand"
              className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-primary hover:bg-gray-50 transition-colors"
              aria-label="Fahrzeuge"
            >
              <Car size={20} />
              <span className="text-[10px] font-medium">Fahrzeuge</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

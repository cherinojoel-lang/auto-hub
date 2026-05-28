import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [shouldPulse, setShouldPulse] = useState(true);

  useEffect(() => {
    // Stop pulsing after 3 cycles (6 seconds)
    const timer = setTimeout(() => setShouldPulse(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href="https://wa.me/492374912912?text=Hallo%20Automobile%20Quick,%20ich%20interessiere%20mich%20für%20ein%20Fahrzeug."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Kontakt"
      className={`fixed bottom-6 right-6 md:bottom-6 md:right-6 w-15 h-15 rounded-full bg-[#25d366] flex items-center justify-center z-9999 shadow-lg hover:shadow-xl transition-transform duration-200 hover:scale-110 ${shouldPulse ? 'animate-wa-pulse' : ''}`}
      style={{
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
        bottom: '24px',
        right: '24px',
      }}
    >
      <MessageCircle size={28} className="text-white" />
    </a>
  );
}

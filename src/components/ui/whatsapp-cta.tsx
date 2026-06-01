import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCtaProps {
  vehicleTitle: string;
  className?: string;
  compact?: boolean;
}

const WA_NUMBER = '4923749129120';

export const WhatsAppCta: React.FC<WhatsAppCtaProps> = ({ vehicleTitle, className = '', compact = false }) => {
  const message = encodeURIComponent(`Hallo, ich interessiere mich für: ${vehicleTitle}. Ist das Fahrzeug noch verfügbar?`);
  const href = `https://wa.me/${WA_NUMBER}?text=${message}`;

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp: Anfrage zu ${vehicleTitle}`}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#25D366] text-white text-xs font-bold rounded-md hover:bg-[#1ebe5a] transition-colors duration-200 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <MessageCircle size={14} />
        <span>Anfragen</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp: Anfrage zu ${vehicleTitle}`}
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#25D366] text-white font-bold rounded-md hover:bg-[#1ebe5a] transition-colors duration-200 ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <MessageCircle size={18} />
      <span>Über WhatsApp anfragen</span>
    </a>
  );
};

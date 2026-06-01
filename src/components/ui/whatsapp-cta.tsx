import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppCtaProps {
  vehicleTitle: string;
  className?: string;
  compact?: boolean;
  variant?: 'solid' | 'subtle';
}

const WA_NUMBER = '4923749129120';

export const WhatsAppCta: React.FC<WhatsAppCtaProps> = ({ vehicleTitle, className = '', compact = false, variant = 'solid' }) => {
  const message = encodeURIComponent(`Hallo, ich interessiere mich für: ${vehicleTitle}. Ist das Fahrzeug noch verfügbar?`);
  const href = `https://wa.me/${WA_NUMBER}?text=${message}`;
  const toneClasses = variant === 'subtle'
    ? 'bg-white text-[#128C7E] border border-[#25D366]/40 hover:bg-[#F0FFF6]'
    : 'bg-[#25D366] text-white hover:bg-[#1ebe5a]';

  if (compact) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`WhatsApp: Anfrage zu ${vehicleTitle}`}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-md transition-colors duration-200 ${toneClasses} ${className}`}
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
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-md transition-colors duration-200 ${toneClasses} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <MessageCircle size={18} />
      <span>Über WhatsApp anfragen</span>
    </a>
  );
};

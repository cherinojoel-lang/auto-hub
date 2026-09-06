import React from 'react';
import { Mail } from 'lucide-react';

interface InquiryCtaProps {
  vehicleTitle: string;
  className?: string;
  compact?: boolean;
  variant?: 'solid' | 'subtle';
}

const CONTACT_EMAIL = 'auto-quick@t-online.de';

// E-Mail is used instead of WhatsApp because the dealership's phone number
// is not registered as a WhatsApp Business account — a wa.me link to it
// fails for visitors. E-Mail (and the "tel:" call button next to this CTA)
// are channels we can verify actually work.
export const InquiryCta: React.FC<InquiryCtaProps> = ({ vehicleTitle, className = '', compact = false, variant = 'solid' }) => {
  const subject = encodeURIComponent(`Anfrage: ${vehicleTitle}`);
  const body = encodeURIComponent(`Hallo, ich interessiere mich für: ${vehicleTitle}. Ist das Fahrzeug noch verfügbar?`);
  const href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  const toneClasses = variant === 'subtle'
    ? 'bg-white text-primary border border-primary/30 hover:bg-alt-bg'
    : 'bg-primary text-white hover:bg-primary/90';

  if (compact) {
    return (
      <a
        href={href}
        aria-label={`E-Mail-Anfrage zu ${vehicleTitle}`}
        className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-md transition-colors duration-200 ${toneClasses} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Mail size={14} />
        <span>Anfragen</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      aria-label={`E-Mail-Anfrage zu ${vehicleTitle}`}
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 font-bold rounded-md transition-colors duration-200 ${toneClasses} ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Mail size={18} />
      <span>Per E-Mail anfragen</span>
    </a>
  );
};

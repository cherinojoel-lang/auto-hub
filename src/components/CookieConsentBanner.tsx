import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'aq_cookie_consent_v1';

type ConsentState = 'accepted' | 'rejected' | null;

function readConsent(): ConsentState {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === 'accepted' || raw === 'rejected') return raw;
    return null;
  } catch {
    return null;
  }
}

function writeConsent(value: 'accepted' | 'rejected') {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new CustomEvent('aq:consent-changed', { detail: { value } }));
  } catch {
    /* ignore */
  }
}

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readConsent() === null) {
      const t = window.setTimeout(() => setVisible(true), 350);
      return () => window.clearTimeout(t);
    }
    return undefined;
  }, []);

  if (!visible) return null;

  const accept = () => {
    writeConsent('accepted');
    setVisible(false);
  };
  const reject = () => {
    writeConsent('rejected');
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-2 bottom-2 w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] sm:inset-x-4 sm:bottom-4 sm:w-auto lg:left-auto lg:right-6 lg:bottom-6 lg:max-w-[420px] z-[60]"
    >
      <div className="bg-white border border-border-line rounded-md shadow-xl p-4 sm:p-5">
        <div className="flex items-start gap-3 mb-3">
          <Cookie size={22} className="text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground mb-1">Cookies & Datenschutz</p>
            <p className="max-w-[17rem] sm:max-w-none text-xs sm:text-sm text-text-secondary leading-relaxed break-words">
              Wir verwenden nur technisch notwendige Cookies. Optionale Analyse-Cookies setzen wir
              nur mit Ihrer Zustimmung ein. Details in unserer{' '}
              <Link to="/datenschutz" className="underline text-primary hover:text-secondary">
                Datenschutzerklärung
              </Link>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={reject}
            className="text-text-secondary hover:text-foreground flex-shrink-0"
            aria-label="Banner schließen und Auswahl ablehnen"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={accept}
            className="flex-1 bg-secondary text-white font-bold text-sm px-4 py-2.5 rounded-md hover:bg-cta-hover transition-colors min-h-[44px]"
          >
            Alle akzeptieren
          </button>
          <button
            type="button"
            onClick={reject}
            className="flex-1 bg-white text-primary border border-primary font-bold text-sm px-4 py-2.5 rounded-md hover:bg-primary/5 transition-colors min-h-[44px]"
          >
            Nur notwendige
          </button>
        </div>
      </div>
    </div>
  );
}

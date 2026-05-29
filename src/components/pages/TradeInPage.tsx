import { useRef, useState, useEffect } from 'react';
import { FileText, CheckCircle, Clock } from 'lucide-react';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import { trackEvent } from '@/lib/analytics';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default function TradeInPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    brand: '',
    model: '',
    firstRegistration: '',
    mileage: '',
    fuel: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    updateMetaTags({
      title: PAGE_METADATA.tradeIn.title,
      description: PAGE_METADATA.tradeIn.description,
      keywords: 'Auto verkaufen Iserlohn, Autoankauf, Gebrauchtwagen verkaufen, Auto bewertung, Fahrzeug verkaufen',
      ogTitle: 'Auto verkaufen - Automobile Quick',
      ogDescription: PAGE_METADATA.tradeIn.description,
      canonicalUrl: `${SITE_CONFIG.url}${PAGE_METADATA.tradeIn.path}`,
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Autoankauf', url: `${SITE_CONFIG.url}${PAGE_METADATA.tradeIn.path}` },
      ]),
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      trackEvent({ action: 'submit_form', category: 'Lead', label: 'TradeInPage' });
      setFormData({
        name: '',
        phone: '',
        email: '',
        brand: '',
        model: '',
        firstRegistration: '',
        mileage: '',
        fuel: '',
        message: '',
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead 
        title={PAGE_METADATA.tradeIn.title}
        description={PAGE_METADATA.tradeIn.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.tradeIn.path}`}
      />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary/80 text-background py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <AnimatedElement>
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Auto verkaufen in Iserlohn
              </h1>
              <p className="text-lg md:text-xl text-background/90 leading-relaxed">
                Sie möchten Ihr Fahrzeug verkaufen? Automobile Quick prüft Ihr Fahrzeug persönlich vor Ort und erstellt ein faires Angebot. Senden Sie uns die wichtigsten Fahrzeugdaten oder vereinbaren Sie direkt einen Termin zur Bewertung.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Ablauf in 3 Schritten
              </h2>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedElement delay={100}>
              <div className="bg-neutral-100 rounded-lg p-8 text-center">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <FileText className="text-background" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Fahrzeugdaten senden
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Füllen Sie unser Formular mit den wichtigsten Fahrzeugdaten aus.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={150}>
              <div className="bg-neutral-100 rounded-lg p-8 text-center">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="text-background" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Bewertungsangebot erhalten
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Wir prüfen Ihr Fahrzeug und erstellen ein faires Angebot.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-neutral-100 rounded-lg p-8 text-center">
                <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Clock className="text-background" size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Termin vor Ort vereinbaren
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed">
                  Vereinbaren Sie einen Besichtigungstermin in Iserlohn.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-neutral-100">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                Fahrzeugdaten senden
              </h2>
              <p className="text-foreground/70">
                Füllen Sie das Formular aus und wir melden uns zeitnah bei Ihnen.
              </p>
            </div>
          </AnimatedElement>

          <AnimatedElement delay={100}>
            <form onSubmit={handleSubmit} className="bg-background rounded-lg p-8 shadow-sm border border-neutral-200">
              {/* Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name <span className="text-secondary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Ihr Name"
                />
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefon <span className="text-secondary">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Ihre Telefonnummer"
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-Mail
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="Ihre E-Mail"
                />
              </div>

              {/* Brand */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Marke
                </label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="z.B. BMW, Opel, Fiat"
                />
              </div>

              {/* Model */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Modell
                </label>
                <input
                  type="text"
                  value={formData.model}
                  onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="z.B. X1, Mokka, 500"
                />
              </div>

              {/* First Registration */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Erstzulassung
                </label>
                <input
                  type="text"
                  value={formData.firstRegistration}
                  onChange={(e) => setFormData({ ...formData, firstRegistration: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="z.B. 2020"
                />
              </div>

              {/* Mileage */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kilometerstand
                </label>
                <input
                  type="text"
                  value={formData.mileage}
                  onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                  placeholder="z.B. 85.000 km"
                />
              </div>

              {/* Fuel */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kraftstoff
                </label>
                <select
                  value={formData.fuel}
                  onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
                >
                  <option value="">-- Bitte wählen --</option>
                  <option value="benzin">Benzin</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="elektro">Elektro</option>
                  <option value="lpg">LPG</option>
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nachricht / Anmerkungen
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
                  placeholder="Weitere Informationen zu Ihrem Fahrzeug..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-background font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Autoankauf anfragen'}
              </button>

              {/* Legal Notice */}
              <div className="mt-8 p-4 bg-neutral-100 rounded-lg border border-neutral-300">
                <p className="text-xs text-foreground/70 leading-relaxed">
                  <strong>Unverbindliche Anfrage.</strong> Kein verbindliches Angebot. Keine Sofortzusage.
                </p>
              </div>
            </form>
          </AnimatedElement>
        </div>
      </section>

      
    </div>
  );
}

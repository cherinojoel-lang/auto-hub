import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Handshake } from 'lucide-react';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import { submitLead } from '@/lib/lead-client';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`transition-all duration-700 ${className}`}>
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
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    setSubmitError(null);

    const vehicleSummary = [
      formData.brand && `Marke: ${formData.brand}`,
      formData.model && `Modell: ${formData.model}`,
      formData.firstRegistration && `Erstzulassung: ${formData.firstRegistration}`,
      formData.mileage && `Kilometerstand: ${formData.mileage} km`,
      formData.fuel && `Kraftstoff: ${formData.fuel}`,
      formData.message && `Anmerkungen: ${formData.message}`,
    ].filter(Boolean).join(' | ');

    try {
      const res = await submitLead({
        name: formData.name,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        message: vehicleSummary,
        intent: 'trade-in',
      });

      if (res.success) {
        setSubmitSuccess(true);
        setSubmitError(null);
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
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitSuccess(false);
        setSubmitError(res.error || 'Ihre Anfrage konnte nicht übermittelt werden.');
      }
    } catch {
      setSubmitSuccess(false);
      setSubmitError('Ihre Anfrage konnte nicht übermittelt werden. Bitte rufen Sie uns direkt an: +49 (0) 2374 / 912912.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground">
      <SeoHead
        title={PAGE_METADATA.tradeIn.title}
        description={PAGE_METADATA.tradeIn.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.tradeIn.path}`}
      />
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <AnimatedElement>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-3">
              Automobile Quick · Iserlohn-Letmathe
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Auto verkaufen in Iserlohn
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Sie möchten Ihr Fahrzeug verkaufen? Automobile Quick prüft Ihr Fahrzeug persönlich vor Ort und erstellt ein faires Angebot. Senden Sie uns die wichtigsten Fahrzeugdaten oder vereinbaren Sie direkt einen Termin.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Ablauf in 3 einfachen Schritten
              </h2>
              <p className="text-text-secondary text-base">Unkompliziert, transparent und ohne lange Wartezeiten</p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedElement delay={100}>
              <div className="bg-white border border-border-line rounded-xl p-8 text-center shadow-sm h-full flex flex-col items-center">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <FileText size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  1. Fahrzeugdaten senden
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Füllen Sie das Online-Formular mit den wichtigsten Daten Ihres Autos aus oder rufen Sie uns direkt an.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white border border-border-line rounded-xl p-8 text-center shadow-sm h-full flex flex-col items-center">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  2. Bewertung vor Ort
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Wir begutachten Ihr Fahrzeug persönlich und transparent bei uns in Iserlohn-Letmathe.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white border border-border-line rounded-xl p-8 text-center shadow-sm h-full flex flex-col items-center">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <Handshake size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  3. Faires Angebot
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Sie erhalten ein faires Ankaufangebot. Auf Wunsch übernehmen wir auch die Abmeldung für Sie.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-background" id="ankauf-formular">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedElement>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-3">
                Unverbindliche Ankaufanfrage
              </h2>
              <p className="text-text-secondary text-sm">
                Tragen Sie hier die Eckdaten Ihres Fahrzeugs ein. Wir melden uns zeitnah bei Ihnen.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border-line shadow-sm space-y-5">
              {submitSuccess && (
                <div role="status" className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm font-medium">
                  Vielen Dank! Ihre Anfrage ist eingegangen. Wir prüfen die Daten und melden uns schnellstmöglich.
                </div>
              )}

              {submitError && (
                <div role="alert" className="p-4 bg-amber-50 border border-amber-300 rounded-md text-amber-900 text-sm font-medium">
                  {submitError}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                  placeholder="Ihr vollständiger Name"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Telefon *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="+49 (0) 123 / 456789"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="ihre.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Marke
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="z. B. Volkswagen, BMW, Opel"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Modell
                  </label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="z. B. Golf, 3er, Corsa"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Erstzulassung
                  </label>
                  <input
                    type="text"
                    value={formData.firstRegistration}
                    onChange={(e) => setFormData({ ...formData, firstRegistration: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="z. B. 2019"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Kilometerstand
                  </label>
                  <input
                    type="text"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="z. B. 75.000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Kraftstoff
                  </label>
                  <select
                    value={formData.fuel}
                    onChange={(e) => setFormData({ ...formData, fuel: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm bg-white"
                  >
                    <option value="">Auswählen</option>
                    <option value="Benzin">Benzin</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Elektro">Elektro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Nachricht / Zustand / Ausstattung
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm resize-none"
                  placeholder="Besonderheiten, Vorschäden, Ausstattung..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors disabled:opacity-50 min-h-[48px] text-base"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Unverbindliche Anfrage senden'}
              </button>

              <p className="text-xs text-text-secondary text-center">
                Unverbindliche Ersteinschätzung. Mit dem Absenden stimmen Sie unserer{' '}
                <a href="/datenschutz" className="text-primary hover:underline font-medium">
                  Datenschutzerklärung
                </a>{' '}
                zu.
              </p>
            </form>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}

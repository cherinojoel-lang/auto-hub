import { useState, useEffect } from 'react';
import { FileText, CheckCircle, Handshake } from 'lucide-react';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import { submitLead } from '@/lib/lead-client';
import { AnimatedElement } from '@/components/ui/animated-element';
import TurnstileWidget from '@/components/TurnstileWidget';

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
  const [turnstileToken, setTurnstileToken] = useState('');
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
        turnstile_token: turnstileToken || undefined,
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
        setTurnstileToken('');
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitSuccess(false);
        setSubmitError(res.error || 'Ihre Anfrage konnte nicht gesendet werden.');
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
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>

      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <AnimatedElement>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-3">
              Automobile Quick · Iserlohn-Letmathe
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">
              Fahrzeug verkaufen
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Faire Preise, transparente Bewertung und unkomplizierte Abwicklung. Verkaufen Sie Ihr Auto direkt vor Ort.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Main Content */}
      <section id="main-content" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <AnimatedElement>
              <div className="bg-white rounded-xl p-6 border border-border-line text-center shadow-sm h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">1. Daten senden</h3>
                <p className="text-text-secondary text-sm">
                  Füllen Sie unser kurzes Formular mit den wichtigsten Fahrzeugdaten aus.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={100}>
              <div className="bg-white rounded-xl p-6 border border-border-line text-center shadow-sm h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">2. Bewertung erhalten</h3>
                <p className="text-text-secondary text-sm">
                  Wir prüfen Ihre Angaben und erstellen ein faires, unverbindliches Angebot.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white rounded-xl p-6 border border-border-line text-center shadow-sm h-full flex flex-col items-center">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
                  <Handshake size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-2">3. Auszahlung</h3>
                <p className="text-text-secondary text-sm">
                  Bei Einigung erfolgt die Übergabe und sofortige, sichere Bezahlung vor Ort.
                </p>
              </div>
            </AnimatedElement>
          </div>

          {/* Form */}
          <AnimatedElement>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-border-line shadow-sm space-y-6">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
                Fahrzeugdaten eingeben
              </h2>
              <p className="text-text-secondary text-sm mb-6">
                Teilen Sie uns die wichtigsten Eckdaten mit. Wir melden uns zeitnah mit einer Einschätzung.
              </p>

              {submitSuccess && (
                <div
                  role="status"
                  aria-live="polite"
                  className="p-4 mb-6 bg-green-50 border border-green-200 text-green-800 rounded-md text-sm"
                >
                  Vielen Dank für Ihre Anfrage! Wir prüfen die Angaben und melden uns zeitnah bei Ihnen.
                </div>
              )}

              {submitError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="p-4 mb-6 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm"
                >
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                    Telefonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                    placeholder="z. B. 0171 1234567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  E-Mail-Adresse (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                  placeholder="ihre.email@example.com"
                />
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
                    placeholder="z. B. 05/2018"
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
                    placeholder="z. B. 85.000"
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

              {/* Cloudflare Turnstile Spam-Schutz */}
              <TurnstileWidget onToken={setTurnstileToken} />

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

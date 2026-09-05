import { useState, useEffect } from 'react';
import { Zap, Percent, Clock } from 'lucide-react';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import FinancingCalculatorSection from '@/components/FinancingCalculatorSection';
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

export default function FinancingPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    updateMetaTags({
      title: PAGE_METADATA.financing.title,
      description: PAGE_METADATA.financing.description,
      keywords: 'Gebrauchtwagen Finanzierung, Autofinanzierung Iserlohn, Kredit Auto, Finanzierungsangebot, Automobile Quick',
      ogTitle: 'Gebrauchtwagen-Finanzierung - Automobile Quick',
      ogDescription: PAGE_METADATA.financing.description,
      canonicalUrl: `${SITE_CONFIG.url}${PAGE_METADATA.financing.path}`,
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Finanzierung', url: `${SITE_CONFIG.url}${PAGE_METADATA.financing.path}` },
      ]),
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const fullMessage = [
      formData.vehicle && `Wunschfahrzeug: ${formData.vehicle}`,
      formData.message && `Anmerkungen: ${formData.message}`,
    ].filter(Boolean).join(' | ');

    try {
      const res = await submitLead({
        name: formData.name,
        phone: formData.phone || undefined,
        email: formData.email || undefined,
        message: fullMessage,
        intent: 'finance',
      });

      if (res.success) {
        setSubmitSuccess(true);
        setSubmitError(null);
        setFormData({
          name: '',
          phone: '',
          email: '',
          vehicle: '',
          message: '',
        });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitSuccess(false);
        setSubmitError(res.error);
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
        title={PAGE_METADATA.financing.title}
        description={PAGE_METADATA.financing.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.financing.path}`}
      />
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center">
          <AnimatedElement>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-3">
              Automobile Quick · Iserlohn-Letmathe
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Gebrauchtwagen-Finanzierung
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Automobile Quick unterstützt Sie bei der passenden Finanzierung für Ihren Gebrauchtwagen. Fragen Sie Ihr Wunschfahrzeug direkt an und erhalten Sie persönliche Beratung zu flexiblen Laufzeiten.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4 max-w-5xl">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Ihre Finanzierungsvorteile
              </h2>
              <p className="text-text-secondary text-base">Transparent, planbar und auf Ihre Situation abgestimmt</p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AnimatedElement delay={100}>
              <div className="bg-white rounded-xl p-8 text-center border border-border-line shadow-sm h-full flex flex-col items-center">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <Percent size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Attraktive Konditionen
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Faire Zinssätze und transparente Kosten ohne versteckte Gebühren.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white rounded-xl p-8 text-center border border-border-line shadow-sm h-full flex flex-col items-center">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <Clock size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Flexible Laufzeiten
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Individuelle Monatsraten mit Laufzeiten von 12 bis 84 Monaten.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white rounded-xl p-8 text-center border border-border-line shadow-sm h-full flex flex-col items-center">
                <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
                  <Zap size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Schnelle Abwicklung
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Unkomplizierte Prüfung und zügige Bearbeitung direkt bei uns vor Ort.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <FinancingCalculatorSection />

      {/* Form Section */}
      <section className="py-16 md:py-20 bg-background" id="finanzierungs-formular">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedElement>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-3">
                Unverbindliche Finanzierungsanfrage
              </h2>
              <p className="text-text-secondary text-sm">
                Fragen Sie unverbindlich an. Wir beraten Sie persönlich und vertraulich.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-border-line shadow-sm space-y-5">
              {submitSuccess && (
                <div role="status" className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm font-medium">
                  Vielen Dank! Ihre Anfrage ist eingegangen. Wir melden uns zeitnah mit einer persönlichen Einschätzung bei Ihnen.
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

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Gewünschtes Fahrzeug
                </label>
                <input
                  type="text"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                  placeholder="z. B. BMW X1, Fiat 500, Opel Corsa..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                  Nachricht / Anmerkungen
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm resize-none"
                  placeholder="Gewünschte Laufzeit, Anzahlung oder sonstige Fragen..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors disabled:opacity-50 min-h-[48px] text-base"
              >
                {isSubmitting ? 'Wird gesendet...' : 'Finanzierung anfragen'}
              </button>

              <div className="p-4 bg-alt-bg rounded-md border border-border-line">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong>Hinweis:</strong> Unverbindliche Anfrage. Keine Kreditzusage und kein Online-Abschluss. Finanzierungsvermittlung erfolgt in Kooperation mit Partnerbanken nach persönlicher Beratung.
                </p>
              </div>
            </form>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}

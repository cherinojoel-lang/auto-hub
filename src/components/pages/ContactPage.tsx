import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    updateMetaTags({
      title: PAGE_METADATA.contact.title,
      description: PAGE_METADATA.contact.description,
      keywords: 'Kontakt Automobile Quick, Anfahrt, Telefon, E-Mail, Iserlohn, Letmathe, Öffnungszeiten, Autohaus',
      ogTitle: 'Kontakt & Anfahrt - Automobile Quick',
      ogDescription: PAGE_METADATA.contact.description,
      canonicalUrl: `${SITE_CONFIG.url}${PAGE_METADATA.contact.path}`,
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Kontakt', url: `${SITE_CONFIG.url}${PAGE_METADATA.contact.path}` },
      ]),
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        message: formData.message || undefined,
        intent: 'general',
      });

      if (res.success) {
        setSubmitSuccess(true);
        setSubmitError(null);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setSubmitSuccess(false);
        setSubmitError(res.error || 'Ihre Anfrage konnte nicht gesendet werden.');
      }
    } catch {
      setSubmitSuccess(false);
      setSubmitError('Ihre Nachricht konnte nicht übermittelt werden. Bitte rufen Sie uns direkt an: +49 (0) 2374 / 912912.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground">
      <SeoHead
        title={PAGE_METADATA.contact.title}
        description={PAGE_METADATA.contact.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.contact.path}`}
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
              Kontakt & Anfahrt
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Wir freuen uns auf Ihren Besuch oder Ihre Nachricht. Persönliche Beratung direkt vor Ort.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-16 md:py-20 bg-surface" id="main-content">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <AnimatedElement>
              <div className="bg-white rounded-xl p-8 border border-border-line shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-4">
                  Senden Sie uns eine Nachricht
                </h2>
                <p className="text-sm text-text-secondary mb-6">
                  Nutzen Sie das Kontaktformular für Fragen zu Fahrzeugen, Besichtigungen oder allgemeinen Anliegen.
                </p>

                {submitSuccess && (
                  <div role="status" className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm font-medium">
                    Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.
                  </div>
                )}

                {submitError && (
                  <div role="alert" className="mb-6 p-4 bg-amber-50 border border-amber-300 rounded-md text-amber-900 text-sm font-medium">
                    {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                      placeholder="Ihr vollständiger Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                      placeholder="ihre.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm"
                      placeholder="+49 (0) 123 / 456789"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-text-secondary mb-1.5">
                      Nachricht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border-line rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary text-sm resize-none"
                      placeholder="Ihre Nachricht an uns..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors disabled:opacity-50 min-h-[48px] text-base"
                  >
                    {isSubmitting ? 'Wird gesendet...' : 'Nachricht absenden'}
                  </button>

                  <p className="text-xs text-text-secondary text-center">
                    Mit dem Absenden stimmen Sie unserer{' '}
                    <a href="/datenschutz" className="text-primary hover:underline font-medium">
                      Datenschutzerklärung
                    </a>{' '}
                    zu.
                  </p>
                </form>
              </div>
            </AnimatedElement>

            {/* Contact Information */}
            <AnimatedElement delay={200}>
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-8 border border-border-line shadow-sm">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground mb-6">
                    Kontaktdaten
                  </h3>

                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">Adresse</p>
                        <p className="text-text-secondary text-sm">Hagener Str. 126a</p>
                        <p className="text-text-secondary text-sm">58642 Iserlohn-Letmathe</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">Telefon</p>
                        <a
                          href="tel:+492374912912"
                          className="text-text-secondary hover:text-primary transition-colors text-sm"
                        >
                          +49 (0) 2374 / 912912
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">E-Mail</p>
                        <a
                          href="mailto:auto-quick@t-online.de"
                          className="text-text-secondary hover:text-primary transition-colors text-sm"
                        >
                          auto-quick@t-online.de
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/10 text-secondary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-sm">Öffnungszeiten</p>
                        <p className="text-text-secondary text-sm">Mo–Fr: 09:00 – 18:00 Uhr</p>
                        <p className="text-text-secondary text-sm">Sa: 09:00 – 13:00 Uhr</p>
                        <p className="text-text-secondary text-xs mt-1">Besichtigung jederzeit nach Absprache</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="bg-white rounded-xl overflow-hidden border border-border-line shadow-sm h-72">
                  <iframe
                    src="https://www.google.com/maps?q=Automobile%20Quick%20Hagener%20Str.%20126a%2058642%20Iserlohn&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Standort Automobile Quick"
                    aria-label="Karte: Standort Automobile Quick in Iserlohn-Letmathe"
                  />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>
    </div>
  );
}

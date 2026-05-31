import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';

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

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Update SEO for contact page
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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SeoHead 
        title={PAGE_METADATA.contact.title}
        description={PAGE_METADATA.contact.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.contact.path}`}
      />
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-accent to-primary/20 text-background py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
                Kontakt & Anfahrt
              </h1>
              <p className="text-xl md:text-2xl text-background/90">
                Wir freuen uns auf Ihre Nachricht
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5" id="main-content">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <AnimatedElement>
                <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">
                    Senden Sie uns eine Nachricht
                  </h2>

                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-primary font-medium">
                        Vielen Dank für Ihre Nachricht! Wir melden uns schnellstmöglich bei Ihnen.
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="Ihr Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        E-Mail *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="ihre.email@beispiel.de"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                        placeholder="+49 123 456789"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Nachricht *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                        placeholder="Wie können wir Ihnen helfen?"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>Wird gesendet...</>
                      ) : (
                        <>
                          <Send size={20} />
                          Nachricht senden
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </AnimatedElement>

              {/* Contact Information */}
              <div className="space-y-6">
                <AnimatedElement delay={100}>
                  <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                      Kontaktinformationen
                    </h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Adresse</p>
                          <p className="text-foreground/70">Hagener Str. 126a</p>
                          <p className="text-foreground/70">58642 Iserlohn</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Telefon</p>
                          <a 
                            href="tel:+492374912912"
                            className="text-foreground/70 hover:text-primary transition-colors"
                          >
                            +49 (0) 2374 / 912912
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">E-Mail</p>
                          <a 
                            href="mailto:info@automobilequick.de"
                            className="text-foreground/70 hover:text-primary transition-colors"
                          >
                            info@automobilequick.de
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="text-primary" size={24} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Öffnungszeiten</p>
                          <p className="text-foreground/70">Mo-Fr: 9:00 - 18:00 Uhr</p>
                          <p className="text-foreground/70">Sa: 10:00 - 14:00 Uhr</p>
                          <p className="text-foreground/70">So: Geschlossen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>

                <AnimatedElement delay={200}>
                  <div className="bg-primary/5 rounded-2xl p-8 border border-primary/20">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Persönlicher Besuch
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      Wir laden Sie herzlich ein, uns in unserem Autohaus in Iserlohn-Letmathe zu besuchen. 
                      Vor Ort können Sie unsere Fahrzeuge in Ruhe besichtigen und eine Probefahrt vereinbaren. 
                      Parkplätze sind direkt vor Ort vorhanden.
                    </p>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  So finden Sie uns
                </h2>
                <p className="text-lg text-foreground/70">
                  Hagener Str. 126a, 58642 Iserlohn
                </p>
              </div>
              <div className="bg-background rounded-2xl shadow-lg overflow-hidden border border-border/50">
                <div className="aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.123456789!2d7.4567890!3d51.3567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDIxJzI0LjQiTiA3wrAyNycyNC40IkU!5e0!3m2!1sde!2sde!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Standort Automobile Quick"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

    </div>
  );
}

import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ChevronRight, Award, Users, Target } from 'lucide-react';
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
          observer.unobserve(entry.target); // ⚡ Bolt: Use entry.target instead of closed-over variable to prevent memory leak
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

export default function AboutPage() {
  useEffect(() => {
    // Update SEO for about page
    updateMetaTags({
      title: PAGE_METADATA.about.title,
      description: PAGE_METADATA.about.description,
      keywords: 'Über Automobile Quick, Autohaus Geschichte, Gebrauchtwagen Händler, Iserlohn, Letmathe, seit 1982, vertrauensvoller Partner',
      ogTitle: 'Über uns - Automobile Quick',
      ogDescription: PAGE_METADATA.about.description,
      canonicalUrl: `${SITE_CONFIG.url}${PAGE_METADATA.about.path}`,
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Über uns', url: `${SITE_CONFIG.url}${PAGE_METADATA.about.path}` },
      ]),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground">
      <SeoHead 
        title={PAGE_METADATA.about.title}
        description={PAGE_METADATA.about.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.about.path}`}
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
              Über uns
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Iserlohn-Letmathe seit 1982.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20 bg-surface" id="main-content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="bg-white rounded-xl p-8 md:p-12 shadow-sm border border-border-line">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6 text-center">
                  Automobile Quick in Iserlohn-Letmathe
                </h2>
                <div className="space-y-6 text-base text-text-secondary leading-relaxed">
                  <p>
                    Unser tägliches Ziel ist es, unseren Kunden möglichst viel Auto für einen fairen Preis anzubieten. 
                    Dieses Ziel realisieren wir durch Vertragsungebundenheit und somit einer enormen Fixkostenersparnis 
                    gegenüber gebundenen Vertragshändlern.
                  </p>
                  <p>
                    Neben unserem Preiskonzept streben wir mit jedem Kunden eine langfristige Zusammenarbeit an und sind 
                    daran interessiert, Sie vollumfänglich fair und in Ihrem eigenen Interesse gut zu beraten.
                  </p>
                  <div className="bg-alt-bg rounded-lg p-6 border-l-4 border-secondary mt-8">
                    <p className="text-lg font-heading font-bold text-primary mb-2">
                      Wir sind für Sie da!
                    </p>
                    <p className="text-foreground text-sm leading-relaxed">
                      In jedem Fall: Wir freuen uns sehr, Sie persönlich kennen zu lernen und in unserem Geschäft begrüßen zu dürfen!
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                Unsere Werte
              </h2>
              <p className="text-base text-text-secondary max-w-2xl mx-auto">
                Was uns auszeichnet und warum Kunden uns seit 1982 vertrauen
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border-line h-full flex flex-col items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary">
                  <Award size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Faire Preise
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Durch Vertragsungebundenheit können wir Ihnen erstklassige Fahrzeuge zu besonders fairen Konditionen anbieten.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border-line h-full flex flex-col items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary">
                  <Users size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Persönliche Beratung
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Wir nehmen uns Zeit für Sie und beraten Sie umfassend, fair und in Ihrem eigenen Interesse.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-white rounded-xl p-8 shadow-sm border border-border-line h-full flex flex-col items-start">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 text-secondary">
                  <Target size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-foreground mb-3">
                  Langfristige Partnerschaft
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Wir streben mit jedem Kunden eine langfristige Zusammenarbeit an, die auf gegenseitigem Vertrauen basiert.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 md:py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                  Besuchen Sie uns
                </h2>
                <p className="text-base text-text-secondary">
                  Wir freuen uns auf Ihren Besuch in Iserlohn-Letmathe
                </p>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedElement delay={100}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-border-line h-full">
                  <h3 className="text-xl font-heading font-bold text-foreground mb-6">
                    Kontaktinformationen
                  </h3>
                  <div className="space-y-4">
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
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="bg-white rounded-xl p-8 shadow-sm border border-border-line h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-foreground mb-4">
                      Anfahrt
                    </h3>
                    <div className="aspect-video bg-alt-bg rounded-lg overflow-hidden mb-4 border border-border-line">
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
                    <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                      Unser Autohaus befindet sich in verkehrsgünstiger Lage in Iserlohn-Letmathe. Parkplätze sind direkt vor Ort vorhanden.
                    </p>
                  </div>
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline text-sm"
                  >
                    Kontakt aufnehmen
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedElement>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Bereit für Ihr neues Fahrzeug?
            </h2>
            <p className="text-base text-text-secondary mb-8 max-w-2xl mx-auto">
              Entdecken Sie unsere Auswahl an geprüften Gebrauchtwagen oder kontaktieren Sie uns für eine persönliche Beratung.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/fahrzeugbestand"
                className="px-8 py-3.5 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-colors text-base min-h-[48px] inline-flex items-center justify-center"
              >
                Fahrzeuge ansehen
              </Link>
              <Link
                to="/kontakt"
                className="px-8 py-3.5 bg-secondary text-white font-bold rounded-md hover:bg-cta-hover transition-colors text-base min-h-[48px] inline-flex items-center justify-center"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}

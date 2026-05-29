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
    <div className="min-h-screen flex flex-col">
      <SeoHead 
        title={PAGE_METADATA.about.title}
        description={PAGE_METADATA.about.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.about.path}`}
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
                Über uns
              </h1>
              <p className="text-xl md:text-2xl text-background/90">
                Ihr vertrauensvoller Partner für hochwertige Gebrauchtwagen in Iserlohn-Letmathe
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="bg-background rounded-3xl p-8 md:p-12 shadow-lg border border-border/50">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 text-center">
                  Automobile Quick in Iserlohn-Letmathe
                </h2>
                <div className="space-y-6 text-lg text-foreground/80 leading-relaxed">
                  <p>
                    Unser tägliches Ziel ist es, unseren Kunden möglichst viel Auto für einen fairen Preis anzubieten. 
                    Dieses Ziel realisieren wir durch Vertragsungebundenheit und somit einer enormen Fixkostenersparnis 
                    gegenüber gebundenen Vertragshändlern.
                  </p>
                  <p>
                    Neben unserem Preiskonzept streben wir mit jedem Kunden eine langfristige Zusammenarbeit an und sind 
                    daran interessiert, Sie vollumfänglich fair und in Ihrem eigenem Interesse gut zu beraten.
                  </p>
                  <div className="bg-primary/5 rounded-2xl p-6 border-l-4 border-primary mt-8">
                    <p className="text-xl font-heading font-bold text-primary mb-2">
                      Wir sind für Sie da!
                    </p>
                    <p className="text-foreground/80">
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
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Unsere Werte
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Was uns auszeichnet und warum Kunden uns vertrauen
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Award className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Faire Preise
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Durch Vertragsungebundenheit können wir Ihnen erstklassige Fahrzeuge zu besonders fairen Konditionen anbieten.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Users className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Persönliche Beratung
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Wir nehmen uns Zeit für Sie und beraten Sie umfassend, fair und in Ihrem eigenen Interesse.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Target className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">
                  Langfristige Partnerschaft
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  Wir streben mit jedem Kunden eine langfristige Zusammenarbeit an, die auf Vertrauen basiert.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                  Besuchen Sie uns
                </h2>
                <p className="text-lg text-foreground/70">
                  Wir freuen uns auf Ihren Besuch in Iserlohn-Letmathe
                </p>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedElement delay={100}>
                <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                    Kontaktinformationen
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-medium text-foreground">Adresse</p>
                        <p className="text-foreground/70">Hagener Str. 126a</p>
                        <p className="text-foreground/70">58642 Iserlohn</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Phone className="text-primary flex-shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-medium text-foreground">Telefon</p>
                        <a 
                          href="tel:+492374912912"
                          className="text-foreground/70 hover:text-primary transition-colors"
                        >
                          +49 (0) 2374 / 912912
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Mail className="text-primary flex-shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-medium text-foreground">E-Mail</p>
                        <a 
                          href="mailto:auto-quick@t-online.de"
                          className="text-foreground/70 hover:text-primary transition-colors"
                        >
                          auto-quick@t-online.de
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <Clock className="text-primary flex-shrink-0 mt-1" size={24} />
                      <div>
                        <p className="font-medium text-foreground">Öffnungszeiten</p>
                        <p className="text-foreground/70">Mo-Fr: 9:00 - 18:00 Uhr</p>
                        <p className="text-foreground/70">Sa: 10:00 - 14:00 Uhr</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement delay={200}>
                <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                    Anfahrt
                  </h3>
                  <div className="aspect-video bg-secondary/10 rounded-lg overflow-hidden mb-6">
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
                  <p className="text-foreground/70 mb-4">
                    Unser Autohaus befindet sich in verkehrsgünstiger Lage in Iserlohn-Letmathe. 
                    Parkplätze sind direkt vor Ort vorhanden.
                  </p>
                  <Link
                    to="/kontakt"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200"
                  >
                    Termin vereinbaren
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Bereit für Ihr neues Fahrzeug?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Entdecken Sie unsere große Auswahl an hochwertigen Gebrauchtwagen oder kontaktieren Sie uns für eine persönliche Beratung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/fahrzeugbestand"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
                >
                  Fahrzeuge ansehen
                </Link>
                <Link
                  to="/kontakt"
                  className="bg-secondary/10 text-foreground px-8 py-4 rounded-lg font-medium hover:bg-secondary/20 transition-all duration-200"
                >
                  Kontakt aufnehmen
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

    </div>
  );
}

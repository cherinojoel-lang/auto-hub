import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, DollarSign, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';

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
  useEffect(() => {
    updateMetaTags({
      title: 'Auto verkaufen in Iserlohn - Automobile Quick | Autoankauf',
      description: 'Verkaufen Sie Ihr Auto an Automobile Quick in Iserlohn. Faire Preise, schnelle Abwicklung, kostenlose Bewertung. Jetzt Ihr Fahrzeug bewerten lassen!',
      keywords: 'Auto verkaufen Iserlohn, Autoankauf, Gebrauchtwagen verkaufen, Auto bewertung, Fahrzeug verkaufen',
      ogTitle: 'Auto verkaufen - Automobile Quick',
      ogDescription: 'Verkaufen Sie Ihr Auto mit fairen Preisen und schneller Abwicklung.',
      canonicalUrl: 'https://automobilequick.de/autoankauf',
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: 'https://automobilequick.de/' },
        { name: 'Autoankauf', url: 'https://automobilequick.de/autoankauf' },
      ]),
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
                Auto verkaufen in Iserlohn
              </h1>
              <p className="text-xl md:text-2xl text-background/90">
                Faire Preise, schnelle Abwicklung, kostenlose Bewertung
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                So einfach verkaufen Sie Ihr Auto
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Vier einfache Schritte zum besten Preis für Ihr Fahrzeug
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Car className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  1. Fahrzeug eintragen
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Geben Sie die Daten Ihres Fahrzeugs ein oder kontaktieren Sie uns direkt.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <DollarSign className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  2. Kostenlose Bewertung
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Wir bewerten Ihr Fahrzeug fair und transparent – völlig kostenlos.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Clock className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  3. Schnelle Abwicklung
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Besichtigung und Vertragsabschluss – alles an einem Tag möglich.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={400}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  4. Geld erhalten
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Zahlung nach Vertragsabschluss – sicher und zuverlässig.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Warum Automobile Quick?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Wir bieten Ihnen die besten Konditionen für Ihren Autoverkauf
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    Faire Preise
                  </h3>
                  <p className="text-foreground/70">
                    Wir zahlen marktgerechte Preise für Ihr Fahrzeug – ohne versteckte Gebühren.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={150}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    Schnelle Abwicklung
                  </h3>
                  <p className="text-foreground/70">
                    Von der Besichtigung bis zur Zahlung – alles läuft reibungslos ab.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    Kostenlose Bewertung
                  </h3>
                  <p className="text-foreground/70">
                    Lassen Sie Ihr Fahrzeug kostenlos und unverbindlich bewerten.
                  </p>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={250}>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    Persönliche Beratung
                  </h3>
                  <p className="text-foreground/70">
                    Unser Team berät Sie kompetent und fair bei jedem Schritt.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
                Bereit, Ihr Auto zu verkaufen?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Kontaktieren Sie uns noch heute für eine kostenlose Bewertung Ihres Fahrzeugs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Jetzt anfragen
                  <ChevronRight size={20} />
                </Link>
                <a
                  href="tel:+4923311234567"
                  className="bg-secondary/10 text-foreground px-8 py-4 rounded-lg font-medium hover:bg-secondary/20 transition-all duration-200"
                >
                  +49 (0) 2331 123456
                </a>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}

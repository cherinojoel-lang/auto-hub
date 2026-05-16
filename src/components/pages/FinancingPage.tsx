import { AnimatedElement } from "@/components/ui/animated-element";
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TrendingDown, Percent, Clock, CheckCircle, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';


export default function FinancingPage() {
  useEffect(() => {
    updateMetaTags({
      title: 'Gebrauchtwagen-Finanzierung in Iserlohn-Letmathe | Automobile Quick',
      description: 'Flexible Finanzierungslösungen für Gebrauchtwagen bei Automobile Quick. Faire Konditionen, schnelle Abwicklung, persönliche Beratung. Jetzt Finanzierung anfragen!',
      keywords: 'Gebrauchtwagen Finanzierung, Autofinanzierung Iserlohn, Kredit Auto, Finanzierungsangebot, Automobile Quick',
      ogTitle: 'Gebrauchtwagen-Finanzierung - Automobile Quick',
      ogDescription: 'Flexible Finanzierungslösungen mit fairen Konditionen für Ihr Fahrzeug.',
      canonicalUrl: 'https://automobilequick.de/finanzierung',
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: 'https://automobilequick.de/' },
        { name: 'Finanzierung', url: 'https://automobilequick.de/finanzierung' },
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
                Gebrauchtwagen-Finanzierung in Iserlohn-Letmathe
              </h1>
              <p className="text-xl md:text-2xl text-background/90">
                Flexible Lösungen mit fairen Konditionen
              </p>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Unsere Finanzierungsvorteile
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Wir bieten Ihnen flexible und faire Finanzierungslösungen
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Percent className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Faire Zinssätze
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Wettbewerbsfähige Zinssätze für Ihre Finanzierung.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={150}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <TrendingDown className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Flexible Laufzeiten
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Wählen Sie die Laufzeit, die zu Ihnen passt.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Clock className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Schnelle Abwicklung
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Schnelle Genehmigung und Auszahlung.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={250}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 text-center">
                  Persönliche Beratung
                </h3>
                <p className="text-foreground/70 leading-relaxed text-center">
                  Unser Team berät Sie kompetent und fair.
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Options Section */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Finanzierungsoptionen
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Wir bieten verschiedene Finanzierungsmöglichkeiten für Ihr Fahrzeug
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={100}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Autokredit
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Klassischer Autokredit mit flexiblen Laufzeiten und fairen Zinssätzen.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Flexible Laufzeiten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Faire Zinssätze</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Schnelle Genehmigung</span>
                  </li>
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={150}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Leasing
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Fahren Sie ein neues Auto ohne Kaufverpflichtung. Ideal für Vielfahrer.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Keine Kaufverpflichtung</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Wartung inklusive</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Versicherung inklusive</span>
                  </li>
                </ul>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="bg-background rounded-2xl p-8 shadow-lg border border-border/50">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Ballonfinanzierung
                </h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Niedrige monatliche Raten mit Schlussrate am Ende der Laufzeit.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Niedrige Monatsraten</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Flexible Schlussrate</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span className="text-foreground/70">Kaufoption am Ende</span>
                  </li>
                </ul>
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
                Interessiert an einer Finanzierung?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Kontaktieren Sie uns noch heute für ein unverbindliches Finanzierungsangebot.
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

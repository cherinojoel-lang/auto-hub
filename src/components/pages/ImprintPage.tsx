import { useEffect } from 'react';
import { updateMetaTags } from '@/lib/seo';

export default function ImprintPage() {
  useEffect(() => {
    updateMetaTags({
      title: 'Impressum - Automobile Quick',
      description: 'Impressum und rechtliche Informationen von Automobile Quick in Iserlohn-Letmathe.',
      robots: 'index, follow',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background font-paragraph text-foreground">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 max-w-3xl text-center">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-2">
            Rechtliche Angaben
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-3">
            Impressum
          </h1>
          <p className="text-sm sm:text-base text-white/80">
            Angaben gemäß § 5 TMG und § 55 Abs. 2 RStV
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-surface">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 sm:p-10 shadow-sm border border-border-line">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="space-y-1.5 text-text-secondary text-sm">
                  <p className="font-bold text-foreground">Automobile Quick</p>
                  <p>Inhaber: Konstantinos Pappas</p>
                  <p>Hagener Str. 126a</p>
                  <p>58642 Iserlohn-Letmathe</p>
                  <p>Deutschland</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Kontaktinformationen
                </h2>
                <div className="space-y-1.5 text-text-secondary text-sm">
                  <p>
                    <span className="font-bold text-foreground">Telefon:</span>{' '}
                    <a href="tel:+492374912912" className="hover:text-primary transition-colors">
                      +49 (0) 2374 / 912912
                    </a>
                  </p>
                  <p>
                    <span className="font-bold text-foreground">Telefax:</span> +49 (0) 2374 / 2813
                  </p>
                  <p>
                    <span className="font-bold text-foreground">E-Mail:</span>{' '}
                    <a href="mailto:auto-quick@t-online.de" className="hover:text-primary transition-colors">
                      auto-quick@t-online.de
                    </a>
                  </p>
                  <p>
                    <span className="font-bold text-foreground">Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:</span>{' '}
                    DE196524275
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <div className="space-y-1 text-text-secondary text-sm">
                  <p className="font-bold text-foreground">Konstantinos Pappas</p>
                  <p>Hagener Str. 126a</p>
                  <p>58642 Iserlohn-Letmathe</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Haftung für Inhalte
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                  Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. 
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                  nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 des TMG sind wir als 
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                  Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                  Tätigkeit hinweisen.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Haftung für Links
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche 
                  Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Urheberrecht
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
                  des Autors oder Schöpfers. Downloads und Kopien dieser Seite sind nur für den privaten, 
                  nicht kommerziellen Gebrauch gestattet.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Online-Streitbeilegung
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie
                  unter{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>{' '}
                  finden. Unsere E-Mail-Adresse lautet:{' '}
                  <a href="mailto:auto-quick@t-online.de" className="text-primary font-bold hover:underline">
                    auto-quick@t-online.de
                  </a>.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                  Verbraucherstreitbeilegung
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

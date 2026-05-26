import { useEffect } from 'react';
import { updateMetaTags } from '@/lib/seo';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ImprintPage() {
  useEffect(() => {
    updateMetaTags({
      title: 'Impressum - Automobile Quick',
      description: 'Impressum und rechtliche Informationen von Automobile Quick in Iserlohn-Letmathe.',
      robots: 'index, follow',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-accent to-primary/20 text-background py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Impressum
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-background rounded-2xl p-8 shadow-lg border border-border/50">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Angaben gemäß § 5 TMG
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p className="font-medium">Automobile Quick</p>
                  <p>Konstantinos Pappas</p>
                  <p>Hagener Str. 126a</p>
                  <p>58642 Iserlohn-Letmathe</p>
                  <p>Deutschland</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Kontaktinformationen
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>
                    <span className="font-medium">Telefon:</span> +49 (0) 2374 / 912912
                  </p>
                  <p>
                    <span className="font-medium">Telefax:</span> +49 (0) 2374 / 2813
                  </p>
                  <p>
                    <span className="font-medium">E-Mail:</span> auto-quick@t-online.de
                  </p>
                  <p>
                    <span className="font-medium">USt-IdNr.:</span> DE196524275
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>Automobile Quick</p>
                  <p>Konstantinos Pappas</p>
                  <p>Hagener Str. 126a</p>
                  <p>58642 Iserlohn-Letmathe</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Haftungsausschluss
                </h2>
                <p className="text-foreground/80 leading-relaxed">
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
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Haftung für Links
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Unsere Website enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                  Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                  Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche 
                  Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Urheberrecht
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                  dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
                  des Autors oder Schöpfers. Downloads und Kopien dieser Seite sind nur für den privaten, 
                  nicht kommerziellen Gebrauch gestattet.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Datenschutz
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich. 
                  Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder 
                  E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. 
                  Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben. 
                  Bitte beachten Sie unsere <a href="/datenschutz" className="text-primary hover:underline">Datenschutzerklärung</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

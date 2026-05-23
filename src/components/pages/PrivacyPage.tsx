import { useEffect } from 'react';
import { updateMetaTags } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  useEffect(() => {
    updateMetaTags({
      title: 'Datenschutzerklärung - Automobile Quick',
      description: 'Datenschutzerklärung von Automobile Quick. Stand: Mai 2026.',
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
              Datenschutzerklärung
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-background rounded-2xl p-8 shadow-lg border border-border/50">
            <div className="space-y-8">
              {/* Status Notice */}
              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <p className="text-foreground/80 text-sm">
                  Stand: Mai 2026. Diese Datenschutzerklärung informiert über die Verarbeitung personenbezogener Daten auf dieser Website.
                </p>
              </div>

              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Datenschutzerklärung
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Der Schutz personenbezogener Daten ist uns wichtig. Diese Datenschutzerklärung informiert darüber, welche personenbezogenen Daten bei der Nutzung dieser Website verarbeitet werden können.
                  </p>
                </div>
              </div>

              {/* Responsible Party */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Verantwortlicher
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p className="font-medium">Automobile Quick</p>
                  <p>Konstantinos Pappas</p>
                  <p>Hagener Str. 126a</p>
                  <p>58642 Iserlohn-Letmathe</p>
                  <p className="mt-3">
                    <span className="font-medium">Telefon:</span> +49 (0) 2374 / 912912
                  </p>
                </div>
              </div>

              {/* Data Processing */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Verarbeitung personenbezogener Daten
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Personenbezogene Daten werden verarbeitet, wenn Besucher über die Website Kontakt aufnehmen, eine Anfrage stellen, telefonisch Kontakt aufnehmen oder ein Formular nutzen. Dazu können insbesondere Name, Telefonnummer, E-Mail-Adresse, Fahrzeugdaten und Nachrichteninhalte gehören.
                  </p>
                </div>
              </div>

              {/* Processing Purposes */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Zwecke der Verarbeitung
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Die Daten werden genutzt zur Bearbeitung von Kontaktanfragen, Fahrzeuganfragen, Besichtigungsanfragen, Finanzierungsanfragen und Autoankauf-Anfragen.
                  </p>
                </div>
              </div>

              {/* Contact Forms */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Kontaktformulare
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Wenn Besucher ein Formular verwenden, werden die eingegebenen Daten zur Bearbeitung der Anfrage verarbeitet. Eine Weitergabe erfolgt nur, soweit dies zur Bearbeitung der Anfrage erforderlich ist oder eine gesetzliche Verpflichtung besteht.
                  </p>
                </div>
              </div>

              {/* Cookies and Tracking */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Cookies und Tracking
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Nicht notwendige Cookies oder Tracking-Technologien dürfen erst nach gültiger Einwilligung eingesetzt werden. Technisch notwendige Funktionen können zur Bereitstellung der Website erforderlich sein.
                  </p>
                </div>
              </div>

              {/* Rights of Data Subjects */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Rechte der betroffenen Personen
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Betroffene Personen haben im Rahmen der gesetzlichen Vorgaben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

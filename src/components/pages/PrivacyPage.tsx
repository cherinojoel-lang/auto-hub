import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags } from '@/lib/seo';

export default function PrivacyPage() {
  useEffect(() => {
    updateMetaTags({
      title: 'Datenschutz - Automobile Quick',
      description: 'Datenschutzerklärung von Automobile Quick in Iserlohn-Letmathe.',
      robots: 'noindex, follow',
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-accent to-primary/20 text-background py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Datenschutz
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
                  1. Datenschutz auf einen Blick
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    <span className="font-medium">Allgemeine Hinweise</span>
                  </p>
                  <p>
                    Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                    personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene
                    Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  2. Allgemeine Hinweise und Pflichtinformationen
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    <span className="font-medium">Datenschutz</span>
                  </p>
                  <p>
                    Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                    Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen
                    Datenschutzvorschriften sowie dieser Datenschutzerklärung.
                  </p>
                  <p>
                    Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                    Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
                    Diese Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen.
                    Sie erläutert auch, wie und zu welchem Zweck das geschieht.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  3. Datenerfassung auf unserer Website
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    <span className="font-medium">Cookies</span>
                  </p>
                  <p>
                    Die Internetseiten verwenden an mehreren Stellen sogenannte Cookies. Cookies richten
                    auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu,
                    unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine
                    Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
                  </p>
                  <p>
                    Die meisten der von uns verwendeten Cookies sind sogenannte „Session-Cookies". Diese werden
                    nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät
                    gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim
                    nächsten Besuch wiederzuerkennen.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  4. Kontaktformular
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                    Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                    der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                    wir nicht ohne Ihre Einwilligung weiter.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  5. Ihre Rechte
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Sie haben das Recht:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Auskunft über die bei uns gespeicherten personenbezogenen Daten zu erhalten</li>
                    <li>Berichtigung unrichtiger Daten zu verlangen</li>
                    <li>Löschung Ihrer Daten zu verlangen</li>
                    <li>Einschränkung der Verarbeitung zu verlangen</li>
                    <li>Der Verarbeitung zu widersprechen</li>
                    <li>Datenübertragbarkeit zu verlangen</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  6. Kontakt zum Datenschutzbeauftragten
                </h2>
                <div className="space-y-2 text-foreground/80">
                  <p>
                    Bei Fragen zum Datenschutz kontaktieren Sie uns bitte unter:
                  </p>
                  <p>
                    <span className="font-medium">E-Mail:</span> info@automobilequick.de
                  </p>
                  <p>
                    <span className="font-medium">Telefon:</span> +49 (0) 2331 123456
                  </p>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
                <p className="text-foreground/80">
                  Diese Datenschutzerklärung wurde zuletzt aktualisiert am 16. Mai 2026.
                  Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu ändern.
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

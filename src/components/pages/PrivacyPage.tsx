import { useEffect } from 'react';
import { updateMetaTags } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';

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
      <section className="relative bg-primary text-white py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
              Datenschutzerklärung
            </h1>
            <p className="text-white/80 text-sm">Stand: Mai 2026</p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-md p-8 border border-border-line">
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

              {/* Legal Basis */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Rechtsgrundlagen
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Die Verarbeitung erfolgt im Rahmen vorvertraglicher Maßnahmen und zur Vertragsanbahnung gemäß Art. 6 Abs. 1 lit. b DSGVO, aufgrund berechtigter Interessen gemäß Art. 6 Abs. 1 lit. f DSGVO (z. B. zur Bereitstellung und Sicherheit der Website) sowie, soweit erforderlich, auf Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.
                  </p>
                </div>
              </div>

              {/* Hosting */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Hosting der Website
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Diese Website wird über die Plattform Wix.com (Wix.com Ltd., Tel Aviv, Israel; in der EU vertreten durch Wix Online Platform Limited, Dublin, Irland) bereitgestellt. Beim Aufruf der Website können technische Verbindungsdaten verarbeitet werden, die zur Auslieferung der Website notwendig sind (z. B. IP-Adresse, Browser-Typ, Zeitstempel). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren Bereitstellung).
                  </p>
                </div>
              </div>

              {/* Storage Duration */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Speicherdauer
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen dies vorschreiben (z. B. handels- und steuerrechtliche Pflichten gemäß § 257 HGB, § 147 AO). Nach Wegfall des Zwecks werden Daten gelöscht oder eingeschränkt.
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
                    Betroffene Personen haben im Rahmen der gesetzlichen Vorgaben das Recht auf:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Auskunft über die verarbeiteten Daten (Art. 15 DSGVO)</li>
                    <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                    <li>Löschung (Art. 17 DSGVO)</li>
                    <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                    <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                    <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                    <li>Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
                  </ul>
                  <p>
                    Zur Ausübung dieser Rechte genügt eine formlose Nachricht an die oben genannte Adresse oder per Telefon.
                  </p>
                </div>
              </div>

              {/* Right of Complaint */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Beschwerderecht bei der Aufsichtsbehörde
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Betroffene Personen haben das Recht, Beschwerde bei einer Datenschutz-Aufsichtsbehörde einzulegen. Zuständig für Nordrhein-Westfalen ist:
                  </p>
                  <p>
                    Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen<br />
                    Kavalleriestraße 2–4, 40213 Düsseldorf<br />
                    Web:{' '}
                    <a
                      href="https://www.ldi.nrw.de"
                      rel="noopener noreferrer"
                      target="_blank"
                      className="text-primary underline hover:text-secondary"
                    >
                      www.ldi.nrw.de
                    </a>
                  </p>
                </div>
              </div>

              {/* SSL */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  SSL/TLS-Verschlüsselung
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Diese Website nutzt aus Sicherheitsgründen eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung ist erkennbar an der Adresszeile des Browsers (https) und am Schloss-Symbol.
                  </p>
                </div>
              </div>

              {/* Changes */}
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Änderungen dieser Datenschutzerklärung
                </h2>
                <div className="space-y-4 text-foreground/80">
                  <p>
                    Diese Datenschutzerklärung wird bei Änderungen der Rechtslage oder der angebotenen Funktionen angepasst. Die jeweils aktuelle Fassung ist auf dieser Seite abrufbar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

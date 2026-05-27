import { Calendar, Check, MapPin, Shield } from 'lucide-react';

const trustItems = [
  {
    icon: Calendar,
    title: 'Seit 1982',
    text: 'Erfahrung mit Gebrauchtwagen und persönlicher Beratung vor Ort.',
  },
  {
    icon: MapPin,
    title: 'Iserlohn-Letmathe',
    text: 'Besichtigung und Beratung an der Hagener Str. 126a.',
  },
  {
    icon: Shield,
    title: 'Geprüfte Fahrzeuge',
    text: 'Fahrzeugauswahl mit klaren Daten, Bildern und unverbindlicher Anfrage.',
  },
];

export default function SocialProofSection() {
  return (
    <section className="w-full bg-primary py-16 sm:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Warum Automobile Quick?
          </h2>
          <p className="text-base sm:text-lg text-white/75">
            Lokale Ansprechpartner, transparente Fahrzeugdaten und Besichtigung nach Vereinbarung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {trustItems.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-sm p-6">
                <Icon size={28} className="text-secondary mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{item.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/75">
          <Check size={18} className="text-secondary" />
          <span>Keine Online-Zahlung, keine verbindliche Reservierung, Anfrage bleibt unverbindlich.</span>
        </div>
      </div>
    </section>
  );
}

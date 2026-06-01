import type { Vehicle } from '@/data/vehiclesData.generated';

interface Props {
  vehicle: Vehicle;
}

const CO2_CLASSES = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const;

const CLASS_COLORS: Record<typeof CO2_CLASSES[number], string> = {
  A: 'bg-green-600',
  B: 'bg-lime-500',
  C: 'bg-yellow-500',
  D: 'bg-amber-500',
  E: 'bg-orange-500',
  F: 'bg-red-500',
  G: 'bg-red-700',
};

export function EnvkvDisclosure({ vehicle }: Props) {
  const envkv = vehicle.envkv;
  const hasData = !!(envkv?.consumptionCombined || envkv?.co2Combined || envkv?.co2Class);

  return (
    <section
      aria-labelledby="envkv-heading"
      className="mt-8 rounded-lg border border-border-line bg-surface-elevated p-6 sm:p-8"
    >
      <h3
        id="envkv-heading"
        className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-4"
      >
        Pflichtangaben gemäß Pkw-EnVKV
      </h3>

      {hasData ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {envkv.consumptionCombined && (
              <div>
                <dt className="text-text-secondary">Kraftstoffverbrauch komb.</dt>
                <dd className="font-bold text-foreground">{envkv.consumptionCombined}</dd>
              </div>
            )}
            {envkv.consumptionInner && (
              <div>
                <dt className="text-text-secondary">innerorts</dt>
                <dd className="font-bold text-foreground">{envkv.consumptionInner}</dd>
              </div>
            )}
            {envkv.consumptionOuter && (
              <div>
                <dt className="text-text-secondary">außerorts</dt>
                <dd className="font-bold text-foreground">{envkv.consumptionOuter}</dd>
              </div>
            )}
            {envkv.co2Combined && (
              <div>
                <dt className="text-text-secondary">CO₂-Emissionen komb.</dt>
                <dd className="font-bold text-foreground">{envkv.co2Combined}</dd>
              </div>
            )}
            {envkv.electricRange && (
              <div>
                <dt className="text-text-secondary">Elektrische Reichweite</dt>
                <dd className="font-bold text-foreground">{envkv.electricRange}</dd>
              </div>
            )}
            {envkv.measurementProcedure && (
              <div>
                <dt className="text-text-secondary">Messverfahren</dt>
                <dd className="font-bold text-foreground">{envkv.measurementProcedure}</dd>
              </div>
            )}
          </div>

          {envkv.co2Class && (
            <div>
              <p className="text-text-secondary text-sm mb-2">CO₂-Effizienzklasse</p>
              <div
                className="flex overflow-hidden rounded-md border border-border-line"
                role="img"
                aria-label={`CO2-Effizienzklasse ${envkv.co2Class}`}
              >
                {CO2_CLASSES.map((cls) => (
                  <div
                    key={cls}
                    className={`flex-1 py-2 text-center text-xs font-bold text-white ${
                      cls === envkv.co2Class
                        ? `${CLASS_COLORS[cls]} ring-2 ring-foreground ring-offset-1`
                        : `${CLASS_COLORS[cls]} opacity-30`
                    }`}
                  >
                    {cls}
                  </div>
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-text-secondary leading-relaxed pt-2 border-t border-border-line">
            Werte ermittelt nach dem vorgeschriebenen Messverfahren. Sie dienen nur dem Vergleich
            zwischen verschiedenen Fahrzeugtypen. Weitere Informationen zum offiziellen
            Kraftstoffverbrauch und den offiziellen spezifischen CO₂-Emissionen neuer Personenkraftwagen
            können dem „Leitfaden über den Kraftstoffverbrauch, die CO₂-Emissionen und den Stromverbrauch
            neuer Personenkraftwagen" entnommen werden, der an allen Verkaufsstellen und bei der
            Deutschen Automobil Treuhand GmbH unter{' '}
            <a
              href="https://www.dat.de/co2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline hover:no-underline"
            >
              www.dat.de/co2
            </a>{' '}
            unentgeltlich erhältlich ist.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-sm text-foreground">
            Die verbindlichen Verbrauchs- und Emissionswerte gemäß Pkw-EnVKV erhalten Sie auf
            Nachfrage und werden Ihnen vor Kaufabschluss schriftlich übermittelt.
          </p>
          <p className="text-xs text-text-secondary leading-relaxed">
            Weitere Informationen zum offiziellen Kraftstoffverbrauch und den offiziellen
            spezifischen CO₂-Emissionen neuer Personenkraftwagen können dem „Leitfaden über den
            Kraftstoffverbrauch, die CO₂-Emissionen und den Stromverbrauch neuer Personenkraftwagen"
            entnommen werden, der an allen Verkaufsstellen und bei der Deutschen Automobil Treuhand
            GmbH unter{' '}
            <a
              href="https://www.dat.de/co2"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary underline hover:no-underline"
            >
              www.dat.de/co2
            </a>{' '}
            unentgeltlich erhältlich ist.
          </p>
        </div>
      )}
    </section>
  );
}

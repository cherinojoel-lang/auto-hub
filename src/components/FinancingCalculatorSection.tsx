import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ⚡ Bolt: Hoisted Intl.NumberFormat outside the component to prevent expensive
// re-instantiation on every render when the user rapidly interacts with the range sliders.
const currencyFormatter = new Intl.NumberFormat('de-DE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function FinancingCalculatorSection() {
  const navigate = useNavigate();
  const [purchasePrice, setPurchasePrice] = useState(25000);
  const [downPayment, setDownPayment] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(48);
  const [interestRate] = useState(5.9);

  // Calculate monthly rate
  const monthlyRate = useMemo(() => {
    const principal = purchasePrice - downPayment;
    const monthlyInterestRate = interestRate / 100 / 12;
    
    if (monthlyInterestRate === 0) {
      return principal / loanTerm;
    }
    
    const numerator = principal * monthlyInterestRate;
    const denominator = 1 - Math.pow(1 + monthlyInterestRate, -loanTerm);
    
    return numerator / denominator;
  }, [purchasePrice, downPayment, loanTerm, interestRate]);

  const formatCurrency = (value: number) => {
    return currencyFormatter.format(value);
  };

  const handleFinancingRequest = () => {
    // Navigate to financing page or open contact form
    navigate('/finanzierung');
  };

  return (
    <section className="w-full bg-gradient-to-r from-slate-900 to-slate-700 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Text & Benefits */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ihr Traumauto finanzieren
            </h2>
            <p className="text-lg text-slate-200 mb-10">
              Flexible Finanzierung und attraktive Leasing-Angebote.
            </p>

            {/* Benefits List */}
            <div className="space-y-6">
              {[
                {
                  title: 'Individuelle Finanzierungspläne',
                  description: 'Wir passen die Rate an Ihr Budget an',
                },
                {
                  title: 'Schnelle Kreditentscheidung',
                  description: 'In der Regel innerhalb von 24 Stunden',
                },
                {
                  title: 'Auch ohne Anzahlung möglich',
                  description: 'Flexibel gestaltbare Konditionen',
                },
                {
                  title: 'Inzahlungnahme Ihres Altautos',
                  description: 'Wir übernehmen Ihren Gebrauchten',
                },
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <ChevronRight className="w-6 h-6 text-red-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-300 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Calculator */}
          <div className="flex items-center justify-center">
            <div className="w-full bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">
                Monatsrate berechnen
              </h3>

              {/* Input Fields */}
              <div className="space-y-6">
                {/* Purchase Price */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Kaufpreis (EUR)
                  </label>
                  <input
                    type="number"
                    min="5000"
                    max="100000"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                {/* Down Payment */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Anzahlung (EUR)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={purchasePrice}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  />
                  <input
                    type="range"
                    min="0"
                    max={purchasePrice}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full mt-2 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                </div>

                {/* Loan Term */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Laufzeit (Monate)
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                  >
                    <option value={12}>12 Monate</option>
                    <option value={24}>24 Monate</option>
                    <option value={36}>36 Monate</option>
                    <option value={48}>48 Monate</option>
                    <option value={60}>60 Monate</option>
                    <option value={72}>72 Monate</option>
                  </select>
                </div>

                {/* Interest Rate (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Zinssatz (%)
                  </label>
                  <input
                    type="number"
                    value={interestRate}
                    readOnly
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg bg-slate-50 text-slate-600 cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Result */}
              <div className="mt-8 p-6 bg-slate-100 rounded-xl">
                <p className="text-sm text-slate-600 mb-3">
                  Ihre geschätzte Monatsrate:
                </p>
                <p
                  aria-live="polite"
                  className="text-4xl font-bold text-red-600 mb-4"
                >
                  {formatCurrency(monthlyRate)} EUR / Monat
                </p>
                <p className="text-xs text-slate-600 mb-6">
                  Unverbindliche Schätzung. Kontaktieren Sie uns für ein persönliches Angebot.
                </p>
                <Button
                  onClick={handleFinancingRequest}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Finanzierungsberatung anfragen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

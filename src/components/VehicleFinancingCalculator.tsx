import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ShieldCheck, CheckCircle2, Award, Clock, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface VehicleFinancingCalculatorProps {
  vehiclePrice: number;
  vehicleTitle: string;
  vehicleId: string;
}

export default function VehicleFinancingCalculator({
  vehiclePrice,
  vehicleTitle,
  vehicleId
}: VehicleFinancingCalculatorProps) {
  // If price is missing or 0, fallback
  const price = vehiclePrice > 0 ? vehiclePrice : 15000;
  
  // Down payment state: default 20%
  const defaultDownPayment = Math.round((price * 0.2) / 500) * 500;
  const [downPayment, setDownPayment] = useState(defaultDownPayment);
  const [loanTerm, setLoanTerm] = useState(48); // months
  const interestRate = 5.99; // APR %

  // Calculate monthly installment using annuity formula
  const { monthlyRate, totalRepayment, loanAmount, totalInterest } = useMemo(() => {
    const principal = Math.max(0, price - downPayment);
    if (principal === 0) {
      return { monthlyRate: 0, totalRepayment: 0, loanAmount: 0, totalInterest: 0 };
    }
    const monthlyInterestRate = interestRate / 100 / 12;
    const rate = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));
    const roundedRate = Math.round(rate * 100) / 100;
    const total = Math.round(roundedRate * loanTerm * 100) / 100;
    const interest = Math.round((total - principal) * 100) / 100;

    return {
      monthlyRate: roundedRate,
      totalRepayment: total,
      loanAmount: principal,
      totalInterest: interest
    };
  }, [price, downPayment, loanTerm, interestRate]);

  const formatEuro = (val: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const termOptions = [24, 36, 48, 60, 72, 84];

  return (
    <div className="bg-white rounded-2xl border border-border-line p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border-line pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
            <Calculator size={22} />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-primary">
              Finanzierungsrechner
            </h3>
            <p className="text-xs text-text-secondary">
              Individuelle Monatsrate für dieses Fahrzeug berechnen
            </p>
          </div>
        </div>
        <Badge variant="outline" className="border-secondary/40 text-secondary font-semibold text-xs">
          5,99% eff. Jahreszins
        </Badge>
      </div>

      {/* Down payment control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <label htmlFor="down-payment-slider" className="font-medium text-foreground">
            Anzahlung:
          </label>
          <span className="font-bold text-primary font-mono">
            {formatEuro(downPayment)} ({price > 0 ? Math.round((downPayment / price) * 100) : 0}%)
          </span>
        </div>
        <input
          id="down-payment-slider"
          type="range"
          min="0"
          max={Math.round(price * 0.6)}
          step="250"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-secondary"
        />
        <div className="flex justify-between text-[11px] text-text-secondary">
          <span>0 € (Ohne Anzahlung)</span>
          <span>Max. {formatEuro(Math.round(price * 0.6))}</span>
        </div>
      </div>

      {/* Term options */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Laufzeit wählen:
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {termOptions.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => setLoanTerm(term)}
              className={`py-2 px-3 text-xs font-bold rounded-lg border transition-all ${
                loanTerm === term
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-warm-bg text-text-secondary border-border-line hover:border-primary/50'
              }`}
            >
              {term} Mon.
            </button>
          ))}
        </div>
      </div>

      {/* Result Callout */}
      <div className="p-5 bg-gradient-to-br from-warm-bg to-slate-50 rounded-xl border border-border-line text-center space-y-2">
        <span className="text-xs text-text-secondary uppercase tracking-wider font-semibold block">
          Ihre geschätzte monatliche Rate
        </span>
        <div className="text-3xl sm:text-4xl font-extrabold font-heading text-secondary">
          ab {formatEuro(monthlyRate)}{' '}
          <span className="text-sm font-normal text-text-secondary font-paragraph">/ Monat</span>
        </div>
        <div className="pt-2 grid grid-cols-2 gap-2 text-xs text-text-secondary border-t border-border-line/60 mt-3">
          <div>Nettodarlehen: <strong className="text-foreground">{formatEuro(loanAmount)}</strong></div>
          <div>Gesamtbetrag: <strong className="text-foreground">{formatEuro(totalRepayment)}</strong></div>
        </div>
      </div>

      {/* Trust Architecture Badges */}
      <div className="space-y-2.5 pt-2 border-t border-border-line">
        <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
          Automobile Quick Qualitätsversprechen
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>150-Punkte Werkstatt-Check</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>12 Monate Gebrauchtwagengarantie</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
            <span>TÜV & AU neu bei Übergabe</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-600 flex-shrink-0" />
            <span>Inzahlungnahme mit Sofort-Verrechnung</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <Link
        to={`/kontakt?vehicle=${encodeURIComponent(vehicleTitle)}&rate=${monthlyRate}&term=${loanTerm}`}
        className="w-full py-3.5 bg-secondary text-white font-bold rounded-xl hover:bg-cta-hover transition-all text-center flex items-center justify-center gap-2 shadow-sm text-sm"
      >
        <span>Finanzierungsanfrage für {formatEuro(monthlyRate)}/Mt. stellen</span>
        <ArrowRight size={16} />
      </Link>

      {/* PAngV Disclosure */}
      <p className="text-[10px] text-text-secondary text-center leading-normal">
        Repräsentatives 2/3-Beispiel gem. § 17 PAngV: Fahrzeugpreis: {formatEuro(price)}, Anzahlung: {formatEuro(downPayment)}, Nettodarlehensbetrag: {formatEuro(loanAmount)}, {loanTerm} Monatsraten à {formatEuro(monthlyRate)}, eff. Jahreszins: {interestRate}%, fester Sollzinssatz: 5,83% p.a., Gesamtbetrag: {formatEuro(totalRepayment)}. Bonität vorausgesetzt. Unverbindliche Beispielrechnung. Vermittlung erfolgt als freier Kreditvermittler für kooperierende Partnerbanken (z. B. Santander Consumer Bank AG, Santander-Platz 1, 41061 Mönchengladbach oder Bank11 GmbH, Hammer Landstraße 91, 41460 Neuss).
      </p>
    </div>
  );
}

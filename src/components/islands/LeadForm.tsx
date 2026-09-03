import { type FormEvent, useEffect, useState } from 'react';
import { extractAttribution, type Attribution } from '@/domain/attribution';

type Props = {
  vehicleId?: string;
  topic?: string;
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success'; leadId: string }
  | { status: 'error'; message: string };

const ATTRIBUTION_KEY = 'aq-attribution-v1';
const CONSENT_KEY = 'aq-consent-v1';

const emptyAttribution: Attribution = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  gclid: null,
  wbraid: null,
  gbraid: null,
};

function readConsent() {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return { analytics: false, marketing: false, updatedAt: null };
    const parsed = JSON.parse(stored) as { analytics?: boolean; marketing?: boolean; updatedAt?: string };
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : null,
    };
  } catch {
    return { analytics: false, marketing: false, updatedAt: null };
  }
}

function storeFirstTouchAttribution() {
  try {
    const existing = sessionStorage.getItem(ATTRIBUTION_KEY);
    if (existing) return JSON.parse(existing) as Attribution;
    const extracted = extractAttribution(new URL(window.location.href));
    sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(extracted));
    return extracted;
  } catch {
    return emptyAttribution;
  }
}

export default function LeadForm({ vehicleId = '', topic = '' }: Props) {
  const [state, setState] = useState<SubmitState>({ status: 'idle' });
  const [attribution, setAttribution] = useState<Attribution>(emptyAttribution);

  useEffect(() => {
    setAttribution(storeFirstTouchAttribution());
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState({ status: 'submitting' });

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const privacyAccepted = form.get('privacy_acknowledged') === 'on';
    if (!privacyAccepted) {
      setState({ status: 'error', message: 'Bitte bestätigen Sie die Datenschutzhinweise für die Kontaktanfrage.' });
      return;
    }

    const consent = readConsent();
    const intent = topic === 'finance' ? 'finance' : topic === 'trade-in' ? 'trade-in' : topic === 'appointment' ? 'appointment' : vehicleId ? 'vehicle' : 'general';

    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      message: form.get('message'),
      intent,
      vehicle_id: vehicleId || null,
      source: 'automobile-quick-website',
      landing_page: window.location.pathname,
      channel: 'web',
      referrer: document.referrer || null,
      marketing_consent: form.get('marketing_consent') === 'on',
      consent_analytics: consent.analytics,
      consent_marketing: consent.marketing,
      consent_updated_at: consent.updatedAt,
      privacy_acknowledged_at: new Date().toISOString(),
      ...attribution,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { ok?: boolean; lead_id?: string; error?: string };

      if (response.ok && result.ok && result.lead_id) {
        setState({ status: 'success', leadId: result.lead_id });
        formElement.reset();
        return;
      }

      if (response.status === 503) {
        setState({ status: 'error', message: 'Die Anfrage konnte noch nicht dauerhaft gespeichert werden. Bitte versuchen Sie es später erneut.' });
        return;
      }

      const knownErrors: Record<string, string> = {
        name_required: 'Bitte geben Sie Ihren Namen an.',
        contact_required: 'Bitte geben Sie mindestens E-Mail oder Telefonnummer an.',
        invalid_intent: 'Die Anfrageart ist nicht gültig.',
      };
      setState({ status: 'error', message: knownErrors[result.error ?? ''] ?? 'Die Anfrage konnte nicht gesendet werden.' });
    } catch {
      setState({ status: 'error', message: 'Die Verbindung ist fehlgeschlagen. Bitte versuchen Sie es erneut.' });
    }
  }

  return (
    <form onSubmit={onSubmit} className="card-premium rounded-2xl p-6 sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-primary">
          Name *
          <input className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 py-3" name="name" autoComplete="name" required maxLength={120} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-primary">
          Telefon
          <input className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 py-3" name="phone" autoComplete="tel" inputMode="tel" maxLength={80} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-primary sm:col-span-2">
          E-Mail
          <input className="min-h-12 rounded-lg border border-slate-300 bg-white px-4 py-3" type="email" name="email" autoComplete="email" maxLength={254} />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-bold text-primary">
        Nachricht
        <textarea className="min-h-40 rounded-lg border border-slate-300 bg-white px-4 py-3" name="message" maxLength={4000} defaultValue={vehicleId ? `Ich interessiere mich für das Fahrzeug ${vehicleId}.` : topic ? `Thema: ${topic}` : ''} />
      </label>

      <div className="mt-5 grid gap-3 text-sm text-slate-600">
        <label className="flex items-start gap-3">
          <input className="mt-1 h-5 w-5 shrink-0" type="checkbox" name="privacy_acknowledged" required />
          <span>Ich habe die <a className="font-bold text-primary underline" href="/datenschutz">Datenschutzhinweise</a> zur Bearbeitung meiner Kontaktanfrage gelesen. *</span>
        </label>
        <label className="flex items-start gap-3">
          <input className="mt-1 h-5 w-5 shrink-0" type="checkbox" name="marketing_consent" />
          <span>Optional: Ich möchte zu passenden Fahrzeugen oder Angeboten kontaktiert werden. Diese Einwilligung ist nicht Voraussetzung für die Anfrage.</span>
        </label>
      </div>

      <button type="submit" className="btn-premium-secondary mt-7 w-full sm:w-auto" disabled={state.status === 'submitting'}>
        {state.status === 'submitting' ? 'Wird gesendet …' : 'Anfrage senden'}
      </button>

      <div className="mt-4 min-h-6" aria-live="polite">
        {state.status === 'success' && <p className="font-bold text-emerald-700">Anfrage gespeichert. Referenz: {state.leadId}</p>}
        {state.status === 'error' && <p className="font-bold text-red-700">{state.message}</p>}
      </div>
    </form>
  );
}

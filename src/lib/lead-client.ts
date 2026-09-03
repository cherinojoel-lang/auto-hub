export type SubmitLeadParams = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  intent?: 'vehicle' | 'appointment' | 'finance' | 'trade-in' | 'general';
  vehicle_id?: string;
  turnstile_token?: string;
};

export type SubmitLeadResult = {
  success: boolean;
  leadId?: string;
  error?: string;
  isPreview?: boolean;
};

export async function submitLead(params: SubmitLeadParams): Promise<SubmitLeadResult> {
  try {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        ...params,
        landing_page: typeof window !== 'undefined' ? window.location.href : null,
        referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      }),
    });

    const data = await res.json().catch(() => ({}));

    if (res.ok && data.ok) {
      return { success: true, leadId: data.lead_id };
    }

    if (data.error === 'preview_mode' || res.status === 503) {
      return {
        success: false,
        error: 'In der Vorschau-Umgebung ist der Formularversand deaktiviert. Bitte rufen Sie uns direkt an: +49 (0) 2374 / 912912.',
        isPreview: true,
      };
    }

    if (data.error === 'turnstile_required' || data.error === 'turnstile_rejected') {
      return {
        success: false,
        error: 'Sicherheitsüberprüfung fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an.',
      };
    }

    return {
      success: false,
      error: 'Übertragungsfehler. Bitte kontaktieren Sie uns direkt telefonisch: +49 (0) 2374 / 912912.',
    };
  } catch {
    return {
      success: false,
      error: 'Verbindungsfehler. Bitte kontaktieren Sie uns telefonisch: +49 (0) 2374 / 912912.',
    };
  }
}

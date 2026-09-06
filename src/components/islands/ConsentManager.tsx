import React, { useEffect, useState } from 'react';

type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const STORAGE_KEY = 'aq-consent-v1';

function persist(next: ConsentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('aq:consent', { detail: next }));
}

export default function ConsentManager() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const save = (nextAnalytics: boolean, nextMarketing: boolean) => {
    const next = { analytics: nextAnalytics, marketing: nextMarketing, updatedAt: new Date().toISOString() };
    persist(next);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="fixed inset-x-3 bottom-3 z-[1000] mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6" aria-label="Datenschutz-Einstellungen">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-base font-black text-primary">Datenschutz-Einstellungen</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">Notwendige Funktionen bleiben aktiv. Analyse- und Marketing-Technologien werden nur nach Ihrer Auswahl aktiviert. Die Kontaktanfrage funktioniert unabhängig von Marketing-Einwilligungen.</p>
        </div>
      </div>

      {showPreferences && (
        <div className="mt-5 grid gap-3 rounded-xl bg-slate-50 p-4 text-sm">
          <label className="flex min-h-12 items-center gap-3 font-semibold text-primary">
            <input type="checkbox" checked disabled />
            Notwendige Funktionen
          </label>
          <label className="flex min-h-12 items-center gap-3 font-semibold text-primary">
            <input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} />
            Analyse
          </label>
          <label className="flex min-h-12 items-center gap-3 font-semibold text-primary">
            <input type="checkbox" checked={marketing} onChange={(event) => setMarketing(event.target.checked)} />
            Marketing / Ads
          </label>
        </div>
      )}

      <div className="mt-5 grid gap-2 sm:grid-cols-3">
        <button type="button" className="btn-premium-primary" onClick={() => save(false, false)}>Nur notwendige</button>
        {showPreferences ? (
          <button type="button" className="btn-premium-secondary" onClick={() => save(analytics, marketing)}>Auswahl speichern</button>
        ) : (
          <button type="button" className="btn-premium-primary" onClick={() => setShowPreferences(true)}>Einstellungen</button>
        )}
        <button type="button" className="btn-premium-secondary" onClick={() => save(true, true)}>Alle akzeptieren</button>
      </div>
    </aside>
  );
}

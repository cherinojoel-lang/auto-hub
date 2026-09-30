import { useEffect, useRef } from 'react';

type Props = {
  siteKey?: string;
  onToken: (token: string) => void;
  onExpire?: () => void;
  action?: string;
};

const TURNSTILE_SCRIPT = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

export default function TurnstileWidget({
  siteKey = '1x00000000000000000000AA',
  onToken,
  onExpire,
  action = 'lead_form'
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    let cancelled = false;
    const renderWidget = () => {
      const api = (window as any).turnstile;
      if (cancelled || !api || !containerRef.current || widgetId.current) return;
      try {
        widgetId.current = api.render(containerRef.current, {
          sitekey: siteKey,
          action,
          callback: (token: string) => onToken(token),
          'expired-callback': () => {
            onToken('');
            onExpire?.();
          },
          'error-callback': () => onToken(''),
        });
      } catch (e) {
        console.warn('Turnstile render warning:', e);
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${TURNSTILE_SCRIPT}"]`);
    if (existing) {
      if ((window as any).turnstile) {
        renderWidget();
      } else {
        const interval = setInterval(() => {
          if ((window as any).turnstile) {
            clearInterval(interval);
            renderWidget();
          }
        }, 100);
        return () => clearInterval(interval);
      }
    } else {
      const script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT;
      script.async = true;
      script.defer = true;
      script.onload = () => renderWidget();
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      if (widgetId.current && (window as any).turnstile) {
        try {
          (window as any).turnstile.reset(widgetId.current);
        } catch {}
        widgetId.current = null;
      }
    };
  }, [siteKey, action]);

  return (
    <div className="my-3 min-h-[65px] flex items-center justify-center">
      <div ref={containerRef} aria-label="Cloudflare Turnstile Spam-Schutz" />
    </div>
  );
}

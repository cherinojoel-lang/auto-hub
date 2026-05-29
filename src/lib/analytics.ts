export const pageView = (url: string) => {
  if (typeof window.gtag === 'function') {
    window.gtag('config', 'G-VXQH8F5D33', {
      page_path: url,
    });
  }
};

export const trackEvent = ({ action, category, label, value }: { action: string; category?: string; label?: string; value?: number }) => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

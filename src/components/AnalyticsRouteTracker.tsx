import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pageView } from '@/lib/analytics';

export const AnalyticsRouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location]);

  return null;
};

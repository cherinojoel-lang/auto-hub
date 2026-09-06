import { useState, useEffect } from 'react';
import {
  StaticRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import VehiclesPage from '@/components/pages/VehiclesPage';
import VehicleDetailPage from '@/components/pages/VehicleDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import TradeInPage from '@/components/pages/TradeInPage';
import FinancingPage from '@/components/pages/FinancingPage';
import ImprintPage from '@/components/pages/ImprintPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import BlogPage from '@/components/pages/BlogPage';
import BlogDetailPage from '@/components/pages/BlogDetailPage';
import AppRouter from '@/components/Router';

interface AppRouterIsomorphicProps {
  pathname: string;
}

export default function AppRouterIsomorphic({ pathname }: AppRouterIsomorphicProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Once hydrated on client, hand over to the full client-side router for SPA navigation
  if (isHydrated) {
    return <AppRouter />;
  }

  // Server-Side Rendering (SSR) during initial HTML generation:
  return (
    <StaticRouter location={pathname} basename={import.meta.env.BASE_NAME}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="fahrzeugbestand" element={<VehiclesPage />} />
          <Route path="fahrzeugdetail/:id" element={<VehicleDetailPage />} />
          <Route path="ueber-uns" element={<AboutPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="autoankauf" element={<TradeInPage />} />
          <Route path="finanzierung" element={<FinancingPage />} />
          <Route path="impressum" element={<ImprintPage />} />
          <Route path="datenschutz" element={<PrivacyPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </StaticRouter>
  );
}

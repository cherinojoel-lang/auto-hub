import { MemberProvider } from '@/integrations';
import ErrorBoundary from '@/components/ErrorBoundary';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import VehiclesPage from '@/components/pages/VehiclesPage';
import VehicleDetailPage from '@/components/pages/VehicleDetailPage';
import AboutPage from '@/components/pages/AboutPage';
import ContactPage from '@/components/pages/ContactPage';
import TradeInPage from '@/components/pages/TradeInPage';
import FinancingPage from '@/components/pages/FinancingPage';
import ImprintPage from '@/components/pages/ImprintPage';
import PrivacyPage from '@/components/pages/PrivacyPage';

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "fahrzeugbestand",
        element: <VehiclesPage />,
      },
      {
        path: "fahrzeugdetail/:id",
        element: <VehicleDetailPage />,
      },
      {
        path: "ueber-uns",
        element: <AboutPage />,
      },
      {
        path: "kontakt",
        element: <ContactPage />,
      },
      {
        path: "autoankauf",
        element: <TradeInPage />,
      },
      {
        path: "finanzierung",
        element: <FinancingPage />,
      },
      {
        path: "impressum",
        element: <ImprintPage />,
      },
      {
        path: "datenschutz",
        element: <PrivacyPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </MemberProvider>
  );
}

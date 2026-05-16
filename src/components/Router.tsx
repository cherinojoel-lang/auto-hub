import { MemberProvider } from '@/integrations';
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
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "vehicles",
        element: <VehiclesPage />,
        routeMetadata: {
          pageIdentifier: 'vehicles',
        },
      },
      {
        path: "vehicles/:id",
        element: <VehicleDetailPage />,
        routeMetadata: {
          pageIdentifier: 'vehicle-detail',
        },
      },
      {
        path: "about",
        element: <AboutPage />,
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "contact",
        element: <ContactPage />,
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "autoankauf",
        element: <TradeInPage />,
        routeMetadata: {
          pageIdentifier: 'trade-in',
        },
      },
      {
        path: "finanzierung",
        element: <FinancingPage />,
        routeMetadata: {
          pageIdentifier: 'financing',
        },
      },
      {
        path: "impressum",
        element: <ImprintPage />,
        routeMetadata: {
          pageIdentifier: 'imprint',
        },
      },
      {
        path: "datenschutz",
        element: <PrivacyPage />,
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
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
      <RouterProvider router={router} />
    </MemberProvider>
  );
}

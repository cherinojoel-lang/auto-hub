import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <>
            <ScrollToTop />
            <HomePage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "fahrzeugbestand",
        element: (
          <>
            <ScrollToTop />
            <VehiclesPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'vehicles',
        },
      },
      {
        path: "fahrzeugdetail/:id",
        element: (
          <>
            <ScrollToTop />
            <VehicleDetailPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'vehicle-detail',
        },
      },
      {
        path: "ueber-uns",
        element: (
          <>
            <ScrollToTop />
            <AboutPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "kontakt",
        element: (
          <>
            <ScrollToTop />
            <ContactPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "autoankauf",
        element: (
          <>
            <ScrollToTop />
            <TradeInPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'trade-in',
        },
      },
      {
        path: "finanzierung",
        element: (
          <>
            <ScrollToTop />
            <FinancingPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'financing',
        },
      },
      {
        path: "impressum",
        element: (
          <>
            <ScrollToTop />
            <ImprintPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'imprint',
        },
      },
      {
        path: "datenschutz",
        element: (
          <>
            <ScrollToTop />
            <PrivacyPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "blog",
        element: (
          <>
            <ScrollToTop />
            <BlogPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "blog/:slug",
        element: (
          <>
            <ScrollToTop />
            <BlogDetailPage />
          </>
        ),
        routeMetadata: {
          pageIdentifier: 'blog-detail',
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
    <RouterProvider router={router} />
  );
}

import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import RouteLoader from '@/components/RouteLoader';

const VehiclesPage = React.lazy(() => import('@/components/pages/VehiclesPage'));
const VehicleDetailPage = React.lazy(() => import('@/components/pages/VehicleDetailPage'));
const AboutPage = React.lazy(() => import('@/components/pages/AboutPage'));
const ContactPage = React.lazy(() => import('@/components/pages/ContactPage'));
const TradeInPage = React.lazy(() => import('@/components/pages/TradeInPage'));
const FinancingPage = React.lazy(() => import('@/components/pages/FinancingPage'));
const ImprintPage = React.lazy(() => import('@/components/pages/ImprintPage'));
const PrivacyPage = React.lazy(() => import('@/components/pages/PrivacyPage'));
const BlogPage = React.lazy(() => import('@/components/pages/BlogPage'));
const BlogDetailPage = React.lazy(() => import('@/components/pages/BlogDetailPage'));

const getBasename = () => {
  const baseName = import.meta.env.BASE_NAME;
  if (!baseName) return '/';

  // If it's a full URL, extract the pathname
  if (baseName.startsWith('http://') || baseName.startsWith('https://')) {
    try {
      const url = new URL(baseName);
      const pathname = url.pathname;
      return (pathname.endsWith('/') && pathname.length > 1) ? pathname.slice(0, -1) : pathname;
    } catch (e) {
      return '/';
    }
  }

  // If it's just a domain name or something that doesn't start with '/', default to '/'
  // React Router expects basename to start with '/' (e.g. '/subpath')
  if (!baseName.startsWith('/')) {
    return '/';
  }

  return baseName;
};

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
        handle: {
          pageIdentifier: 'home',
        },
      },
      {
        path: "fahrzeugbestand",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <VehiclesPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'vehicles',
        },
      },
      {
        path: "fahrzeugdetail/:id",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <VehicleDetailPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'vehicle-detail',
        },
      },
      {
        path: "ueber-uns",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <AboutPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'about',
        },
      },
      {
        path: "kontakt",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <ContactPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'contact',
        },
      },
      {
        path: "autoankauf",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <TradeInPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'trade-in',
        },
      },
      {
        path: "finanzierung",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <FinancingPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'financing',
        },
      },
      {
        path: "impressum",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <ImprintPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'imprint',
        },
      },
      {
        path: "datenschutz",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <PrivacyPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'privacy',
        },
      },
      {
        path: "blog",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <BlogPage />
          </Suspense>
        ),
        handle: {
          pageIdentifier: 'blog',
        },
      },
      {
        path: "blog/:slug",
        element: (
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <BlogDetailPage />
          </Suspense>
        ),
        handle: {
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
  basename: getBasename(),
});

export default function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}

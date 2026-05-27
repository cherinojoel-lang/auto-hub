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
          <Suspense fallback={<RouteLoader />}>
            <ScrollToTop />
            <VehiclesPage />
          </Suspense>
        ),
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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
        routeMetadata: {
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

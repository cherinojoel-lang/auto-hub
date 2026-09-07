import React, { Suspense } from 'react';
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
import RouteLoader from '@/components/RouteLoader';

export const routes = [
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
];

let routerInstance: ReturnType<typeof createBrowserRouter> | null = null;
export function getRouter() {
  if (!routerInstance && typeof window !== "undefined") {
    routerInstance = createBrowserRouter(routes, {
      basename: import.meta.env.BASE_NAME,
    });
  }
  return routerInstance;
}

export default function AppRouter() {
  const router = getRouter();
  if (!router) return null;
  return (
    <RouterProvider router={router} />
  );
}

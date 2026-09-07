import { Outlet } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { DynamicCanonical } from '@/components/DynamicCanonical';
import MobileFloatingActionBar from '@/components/MobileFloatingActionBar';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <DynamicCanonical />
      <Header />
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>
      <Footer />
      <MobileFloatingActionBar />
      <CookieConsentBanner />
    </div>
  );
}

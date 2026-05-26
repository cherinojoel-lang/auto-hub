import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Gauge, Zap, Fuel, ArrowLeft, Phone, MapPin, Wrench, Check } from 'lucide-react';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { updateMetaTags, getStructuredDataProduct } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, generateProductSchema, SITE_CONFIG } from '@/lib/seo-config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Mock features for the demo vehicle
const DEMO_FEATURES = [
  'Klimaanlage',
  'Einparkhilfe hinten',
  'Apple CarPlay',
  'Android Auto',
  'Sitzheizung',
  'Tempomat',
  'Alu 16"',
];

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [similarVehicle, setSimilarVehicle] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const safeVehicles = Array.isArray(vehiclesData) ? vehiclesData : []; 
      const data = safeVehicles.find((v: any) => v.id === id) || null;
      setVehicle(data);
      
      // Load similar vehicles
      setSimilarVehicle(safeVehicles.filter((v: any) => v.id !== id).slice(0, 4));
      
      // Update SEO for vehicle detail page
      if (data) {
        const title = PAGE_METADATA.vehicleDetail.title
          .replace('{title}', data.title || 'Fahrzeug')
          .replace('{manufacturer}', data.manufacturer || '')
          .replace('{model}', data.model || '')
          .replace('{year}', data.firstRegistration?.toString() || '');
        
        updateMetaTags({
          title: title,
          description: data.description || `${data.title} - Hochwertiger Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe. Faire Preise und persönliche Beratung.`,
          keywords: `${data.title}, Gebrauchtwagen, ${data.fuel}, Iserlohn, Letmathe`,
          ogTitle: `${data.title} - Automobile Quick`,
          ogDescription: data.description || `${data.title} - Hochwertiger Gebrauchtwagen`,
          ogImage: data.mainImage,
          canonicalUrl: `${SITE_CONFIG.url}/fahrzeugdetail/${id}`,
          structuredData: getStructuredDataProduct(data),
        });
      }
    } catch (error) {
      console.error('Error loading vehicle:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price?: number) => {
    if (!price) return 'Preis auf Anfrage';
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SeoHead 
        title={vehicle ? `${vehicle.title} - Gebrauchtwagen bei Automobile Quick` : 'Fahrzeug nicht gefunden'}
        description={vehicle?.description || 'Hochwertiger Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe'}
        url={`${SITE_CONFIG.url}/fahrzeugdetail/${id}`}
        schema={vehicle ? generateProductSchema(vehicle) : undefined}
      />
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>

      <div className="flex-1">
        {isLoading ? (
          <div className="container mx-auto px-4 max-w-7xl py-20 flex justify-center items-center min-h-[600px]">
            <LoadingSpinner className="w-12 h-12 text-primary" />
          </div>
        ) : !vehicle ? (
          <div className="container mx-auto px-4 max-w-7xl py-20 text-center min-h-[600px] flex flex-col justify-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
              Fahrzeug nicht gefunden
            </h2>
            <Link
              to="/fahrzeugbestand"
              className="text-primary hover:text-primary/80 font-bold text-lg transition-colors inline-block"
            >
              Zurück zur Übersicht
            </Link>
          </div>
        ) : (
          <>
            {/* MOBILE LAYOUT */}
            {/* Mobile: Full-width Image */}
            <div className="lg:hidden w-full" id="main-content">
              <div className="aspect-video bg-alt-bg flex items-center justify-center">
                {vehicle.mainImage ? (
                  <div className="w-full h-full flex flex-col">
                    <Image
                      src={vehicle.mainImage}
                      alt={vehicle.alt || vehicle.title}
                      className="w-full aspect-video object-cover"
                      width={1200}
                      height={675}
                    />
                    {vehicle.gallery && vehicle.gallery.length > 0 && (
                      <div className="grid grid-cols-4 gap-2 p-4 bg-warm-bg overflow-x-auto">
                        {vehicle.gallery.map((img, idx) => (
                          <div key={idx} className="aspect-video relative rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={img}
                              alt={`${vehicle.title} Galeriebild ${idx + 1}`}
                              className="w-full h-full object-cover"
                              width={150}
                              height={100}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-alt-bg to-border-line">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-text-secondary mb-4">📷</div>
                      <p className="text-xl font-bold text-text-secondary">Bild folgt</p>
                      <p className="text-sm text-text-secondary mt-2">Hochwertige Fotos in Kürze verfügbar</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile: Title Section */}
            <div className="lg:hidden container mx-auto px-4 max-w-7xl py-6">
              <h1 className="text-3xl sm:text-4xl font-heading font-bold text-primary mb-3">
                {vehicle.title}
              </h1>
              <p className="text-base text-text-secondary leading-relaxed font-paragraph">
                Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe
              </p>
            </div>

            {/* Mobile: Price Section */}
            <div className="lg:hidden bg-card-bg border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-6">
                <p className="text-sm text-text-secondary font-medium mb-2">Verkaufspreis</p>
                <p className="text-4xl font-bold text-secondary mb-6">
                  {vehicle.price}
                </p>
                <p className="text-sm text-success font-bold mb-4">✓ Verfügbar</p>
              </div>
            </div>

            {/* Mobile: Financing Box */}
            <div className="lg:hidden bg-card-bg border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-6">
                <div className="p-4 rounded-lg border" style={{ backgroundColor: '#FCFCFA', borderColor: '#D8DEE8' }}>
                  <p className="text-sm font-bold mb-3" style={{ color: '#101828' }}>Finanzierung auf Anfrage</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#536075' }}>
                    Wir prüfen passende Finanzierungsoptionen gerne persönlich.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile: CTA Buttons */}
            <div className="lg:hidden bg-background border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-6 space-y-3">
                <a
                  href="tel:+4923749157-0"
                  className="flex items-center justify-center gap-2 w-full bg-secondary text-white px-6 py-4 rounded-lg font-bold hover:bg-cta-hover transition-all duration-300 text-base min-h-[48px]"
                >
                  <Phone size={20} />
                  Anrufen
                </a>
                <Link
                  to="/kontakt"
                  className="block w-full bg-primary text-white text-center px-6 py-4 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 text-base min-h-[48px] flex items-center justify-center"
                >
                  Anfrage senden
                </Link>
                <Link
                  to="/finanzierung"
                  className="block w-full bg-white text-primary border-2 border-primary text-center px-6 py-4 rounded-lg font-bold hover:bg-primary/5 transition-all duration-300 text-base min-h-[48px] flex items-center justify-center"
                >
                  Finanzierung anfragen
                </Link>
                <Link
                  to="/fahrzeugbestand"
                  className="block w-full bg-neutral-100 text-foreground text-center px-6 py-4 rounded-lg font-bold hover:bg-neutral-100/80 transition-all duration-300 text-base min-h-[48px] flex items-center justify-center"
                >
                  Zurück zum Fahrzeugbestand
                </Link>
              </div>
            </div>

            {/* Mobile: Core Data Section */}
            <div className="lg:hidden bg-card-bg border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-8">
                <h2 className="text-xl font-heading font-bold text-primary mb-6">Kerndaten</h2>
                <div className="grid grid-cols-1 gap-4">
                  {vehicle.firstRegistration && (
                    <div className="flex justify-between items-center pb-4 border-b border-border-line">
                      <p className="text-sm text-text-secondary font-medium">Erstzulassung</p>
                      <p className="font-bold text-primary">{vehicle.firstRegistration}</p>
                    </div>
                  )}
                  {vehicle.mileage && (
                    <div className="flex justify-between items-center pb-4 border-b border-border-line">
                      <p className="text-sm text-text-secondary font-medium">Kilometerstand</p>
                      <p className="font-bold text-primary">{vehicle.mileage}</p>
                    </div>
                  )}
                  {vehicle.power && (
                    <div className="flex justify-between items-center pb-4 border-b border-border-line">
                      <p className="text-sm text-text-secondary font-medium">Leistung</p>
                      <p className="font-bold text-primary">{vehicle.power}</p>
                    </div>
                  )}
                  {vehicle.fuel && (
                    <div className="flex justify-between items-center pb-4 border-b border-border-line">
                      <p className="text-sm text-text-secondary font-medium">Kraftstoff</p>
                      <p className="font-bold text-primary">{vehicle.fuel}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center pb-4 border-b border-border-line">
                    <p className="text-sm text-text-secondary font-medium">Getriebe</p>
                    <p className="font-bold text-primary">Automatik</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-text-secondary font-medium">Standort</p>
                    <p className="font-bold text-primary">Iserlohn-Letmathe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Trust Section */}
            <div className="lg:hidden bg-warm-bg border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-8">
                <h2 className="text-xl font-heading font-bold text-primary mb-6">Warum Automobile Quick?</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
                    <div>
                      <p className="font-bold text-foreground">Persönliche Beratung</p>
                      <p className="text-sm text-text-secondary">Fachkundige Unterstützung vor Ort</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
                    <div>
                      <p className="font-bold text-foreground">Besichtigung vor Ort</p>
                      <p className="text-sm text-text-secondary">Fahrzeug gründlich inspizieren</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
                    <div>
                      <p className="font-bold text-foreground">Unverbindliche Anfrage</p>
                      <p className="text-sm text-text-secondary">Keine versteckten Gebühren</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-card-bg rounded-lg border border-border-line">
                  <p className="text-sm font-bold text-foreground mb-2">Automobile Quick</p>
                  <p className="text-sm text-text-secondary">Hagener Str. 126a<br />58642 Iserlohn</p>
                </div>
              </div>
            </div>

            {/* DESKTOP LAYOUT */}
            {/* Desktop: Back Link */}
            <div className="hidden lg:block container mx-auto px-4 max-w-7xl pt-6 sm:pt-8" id="main-content">
              <Link
                to="/fahrzeugbestand"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-200 text-base sm:text-lg"
              >
                <ArrowLeft size={22} />
                Zurück zur Übersicht
              </Link>
            </div>

            {/* Desktop: Image Gallery Section */}
            <AnimatedElement className="hidden lg:block container mx-auto px-4 max-w-7xl py-8 sm:py-12">
              <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden border border-border-line">
                <div className="aspect-video bg-alt-bg flex items-center justify-center">
                  {vehicle.mainImage ? (
                    <div className="w-full h-full flex flex-col">
                      <Image
                        src={vehicle.mainImage}
                        alt={vehicle.alt || vehicle.title}
                        className="w-full aspect-video object-cover"
                        width={1200}
                        height={675}
                      />
                      {vehicle.gallery && vehicle.gallery.length > 0 && (
                        <div className="grid grid-cols-6 md:grid-cols-8 gap-2 p-4 bg-warm-bg overflow-x-auto">
                          {vehicle.gallery.map((img, idx) => (
                            <div key={idx} className="aspect-video relative rounded overflow-hidden">
                              <Image
                                src={img}
                                alt={`${vehicle.title} Galeriebild ${idx + 1}`}
                                className="w-full h-full object-cover"
                                width={150}
                                height={100}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-alt-bg to-border-line">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-text-secondary mb-4">📷</div>
                        <p className="text-xl font-bold text-text-secondary">Bild folgt</p>
                        <p className="text-sm text-text-secondary mt-2">Hochwertige Fotos in Kürze verfügbar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </AnimatedElement>

            {/* Desktop: Main Content Grid */}
            <div className="hidden lg:block container mx-auto px-4 max-w-7xl pb-12 lg:pb-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-12">
                  {/* Title & Intro */}
                  <AnimatedElement>
                    <div>
                      <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
                        {vehicle.title}
                      </h1>
                      <p className="text-lg text-text-secondary leading-relaxed font-paragraph">
                        Gepflegter Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe. Persönliche Beratung, Besichtigung vor Ort und unverbindliche Finanzierungsanfrage möglich.
                      </p>
                    </div>
                  </AnimatedElement>

                  {/* Technical Data */}
                  <AnimatedElement>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                        Technische Kerndaten
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {vehicle.firstRegistration && (
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Erstzulassung</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{vehicle.firstRegistration}</p>
                          </div>
                        )}

                        {vehicle.mileage && (
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Gauge className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Kilometerstand</p>
                            </div>
                            <p className="font-bold text-lg text-primary">
                              {vehicle.mileage}
                            </p>
                          </div>
                        )}

                        {vehicle.power && (
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Zap className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Leistung</p>
                            </div>
                            <p className="font-bold text-lg text-primary">
                              {vehicle.power}
                            </p>
                          </div>
                        )}

                        {vehicle.fuel && (
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-2">
                              <Fuel className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Kraftstoff</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{vehicle.fuel}</p>
                          </div>
                        )}

                        <div className="bg-card-bg p-5 rounded-lg border border-border-line shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <Wrench className="text-secondary flex-shrink-0" size={24} />
                            <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Getriebe</p>
                          </div>
                          <p className="font-bold text-lg text-primary">Automatik</p>
                        </div>

                        <div className="bg-card-bg p-5 rounded-lg border border-border-line shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-secondary flex-shrink-0" size={24} />
                            <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Standort</p>
                          </div>
                          <p className="font-bold text-lg text-primary">Iserlohn-Letmathe</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>

                  {/* Features/Equipment */}
                  <AnimatedElement>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                        Ausstattung
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {DEMO_FEATURES.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-warm-bg rounded-lg border border-border-line">
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                            <span className="font-medium text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </AnimatedElement>

                  {/* Description */}
                  {vehicle.description && (
                    <AnimatedElement>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-4">
                          Beschreibung
                        </h2>
                        <p className="text-text-secondary leading-relaxed text-base font-paragraph">
                          {vehicle.description}
                        </p>
                      </div>
                    </AnimatedElement>
                  )}

                  {/* Similar Vehicle */}
                  {similarVehicle.length > 0 && (
                    <AnimatedElement>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                          Ähnliche Fahrzeuge
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {similarVehicle.map((v) => (
                            <Link
                              key={v.id}
                              to={`/fahrzeugdetail/${v.id}`}
                              className="group bg-card-bg rounded-lg overflow-hidden border border-border-line shadow-sm hover:shadow-lg transition-all duration-300"
                            >
                              <div className="aspect-video bg-alt-bg overflow-hidden">
                                {v.mainImage ? (
                                  <Image
                                    src={v.mainImage || ""}
                                    alt={v.alt || v.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    width={400}
                                    height={225}
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-border-line">
                                    <span className="text-4xl font-bold text-text-secondary">📷</span>
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-lg text-primary mb-2 group-hover:text-secondary transition-colors">
                                  {v.title}
                                </h3>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-text-secondary">
                                    {v.firstRegistration} • {v.mileage}
                                  </span>
                                  <span className="font-bold text-secondary">{v.price}</span>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </AnimatedElement>
                  )}
                </div>

                {/* Right Column - Desktop Price Box */}
                <div className="lg:col-span-1">
                  <div className="sticky top-32 w-full">
                    <AnimatedElement className="bg-card-bg rounded-lg shadow-xl border border-border-line p-6 sm:p-8">
                      {/* Price */}
                      <div className="mb-8">
                        <p className="text-sm text-text-secondary font-medium mb-2">Verkaufspreis</p>
                        <p className="text-5xl sm:text-6xl font-bold text-secondary">
                          {vehicle.price}
                        </p>
                      </div>

                      {/* Financing */}
                      <div className="mb-8 p-4 rounded-lg border" style={{ backgroundColor: '#FCFCFA', borderColor: '#D8DEE8' }}>
                        <p className="text-sm font-bold mb-3" style={{ color: '#101828' }}>Finanzierung auf Anfrage</p>
                        <p className="text-sm leading-relaxed" style={{ color: '#536075' }}>
                          Wir prüfen passende Finanzierungsoptionen gerne persönlich.
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <a
                          href="tel:+4923749157-0"
                          className="flex items-center justify-center gap-2 w-full bg-secondary text-white px-6 py-4 rounded-lg font-bold hover:bg-cta-hover transition-all duration-300 transform hover:-translate-y-0.5 shadow-md text-base min-h-[48px]"
                        >
                          <Phone size={20} />
                          Anrufen
                        </a>
                        <Link
                          to="/kontakt"
                          className="block w-full bg-primary text-white text-center px-6 py-4 rounded-lg font-bold hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md text-base min-h-[48px] flex items-center justify-center"
                        >
                          Anfrage senden
                        </Link>
                        <Link
                          to="/finanzierung"
                          className="block w-full bg-white text-primary border-2 border-primary text-center px-6 py-4 rounded-lg font-bold hover:bg-primary/5 transition-all duration-300 text-base min-h-[48px] flex items-center justify-center"
                        >
                          Finanzierung anfragen
                        </Link>
                      </div>

                      {/* Info Text */}
                      <p className="text-xs text-text-secondary text-center mt-6 leading-relaxed">
                        Alle Angaben ohne Gewähr. Besichtigung und Beratung vor Ort möglich.
                      </p>
                    </AnimatedElement>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Spacing for Mobile */}
            <div className="lg:hidden h-24"></div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

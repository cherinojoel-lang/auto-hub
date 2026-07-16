import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Gauge, Zap, Fuel, ArrowLeft, Phone, MapPin, Wrench, ChevronLeft, ChevronRight } from 'lucide-react';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';

import { updateMetaTags, getStructuredDataProduct } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, generateProductSchema, SITE_CONFIG } from '@/lib/seo-config';
import CarSchema from '@/components/schemas/CarSchema';
import { Lightbox } from '@/components/ui/lightbox';
import { WhatsAppCta } from '@/components/ui/whatsapp-cta';
import { EnvkvDisclosure } from '@/components/EnvkvDisclosure';
import { getAllFeatures, getTransmission } from '@/lib/domain/vehicleFeatures';

const AnimatedElement: React.FC<{ children: React.ReactNode; className?: string; priority?: boolean }> = ({
  children, 
  className = '',
  priority = false
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(priority || false);

  useEffect(() => {
    if (priority) return;
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

const SAFE_SERVICE_POINTS = [
  'Persönliche Beratung vor Ort',
  'Besichtigung nach Vereinbarung',
  'Unverbindliche Fahrzeuganfrage',
  'Echte Fahrzeugbilder',
  'Finanzierung auf Anfrage',
  'Seit 1982 in Iserlohn-Letmathe',
];

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [similarVehicle, setSimilarVehicle] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const safeVehicles = Array.isArray(vehiclesData) ? vehiclesData : []; 
      const data = safeVehicles.find((v: Vehicle) => v.id === id) || null;
      setVehicle(data);
      setCurrentGalleryIndex(0);
      
      // Load similar vehicles
      // ⚡ BOLT: Early Exit Loop Optimization
      // Replaced `.filter().slice(0, 4)` with a single-pass loop.
      // This stops iterating once 4 items are found, saving memory allocations.
      const similar = [];
      for (const v of safeVehicles) {
        if (v.id !== id) {
          similar.push(v);
          if (similar.length === 4) break;
        }
      }
      setSimilarVehicle(similar);
      
      // Update SEO for vehicle detail page
      if (data) {
        const title = PAGE_METADATA.vehicleDetail.title
          .replace('{title}', data.title || 'Fahrzeug')
          .replace('{manufacturer}', data.make || '')
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
      toast({
        title: "Fehler",
        description: "Fahrzeugdaten konnten nicht geladen werden.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getGalleryImages = () => {
    if (!vehicle) return [];
    const images: string[] = [];
    if (vehicle.mainImage) images.push(vehicle.mainImage);
    if (Array.isArray(vehicle.gallery) && vehicle.gallery.length > 0) {
      images.push(...vehicle.gallery);
    }
    return Array.from(new Set(images));
  };

  const galleryImages = getGalleryImages();
  const hasMultipleImages = galleryImages.length > 1;
  const currentImage = galleryImages[currentGalleryIndex] || vehicle?.mainImage;

  const vehicleFeatures = vehicle ? getAllFeatures(vehicle) : [];
  const transmission = vehicle ? getTransmission(vehicle) : null;

  const handlePrevImage = () => {
    setCurrentGalleryIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1);
  };

  const handleNextImage = () => {
    setCurrentGalleryIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1);
  };

  const openLightbox = () => setLightboxOpen(true);
  const closeLightbox = () => setLightboxOpen(false);
  const goToImage = (index: number) => setCurrentGalleryIndex(index);

  const carSchemaData = vehicle ? {
    id: vehicle.id,
    brand: vehicle.make,
    model: vehicle.model,
    year: parseInt(vehicle.firstRegistration.split('/').pop() || '0'),
    price: vehicle.priceValue,
    mileage: parseInt(vehicle.mileage.replace(/\D/g, '')),
    fuel: vehicle.fuel,
    description: vehicle.description,
    imageUrl: vehicle.mainImage ? `${SITE_CONFIG.url}${vehicle.mainImage}` : undefined,
  } : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {carSchemaData && <CarSchema vehicle={carSchemaData} />}
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
            {/* Mobile: Full-width Image Gallery */}
            <div className="lg:hidden w-full" id="main-content">
              <div className="bg-card-bg border-b border-border-line">
                {vehicle.mainImage ? (
                  <div className="w-full flex flex-col">
                    {/* Main Image */}
                    <div className="relative w-full aspect-video overflow-hidden bg-alt-bg cursor-pointer" onClick={openLightbox}>
                      <Image
                        src={currentImage || vehicle.mainImage}
                        alt={vehicle.alt || vehicle.title}
                        className="w-full h-full object-cover"
                        width={1200}
                        height={675}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                      />
                      {/* Image Counter - only show if multiple images */}
                      {hasMultipleImages && (
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1.5 text-xs font-bold rounded-sm shadow-md">
                          {currentGalleryIndex + 1} / {galleryImages.length}
                        </div>
                      )}
                      {/* Navigation Arrows - only show if multiple images */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-all"
                            aria-label="Vorheriges Bild"
                          >
                            <ChevronLeft size={24} />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-md transition-all"
                            aria-label="Nächstes Bild"
                          >
                            <ChevronRight size={24} />
                          </button>
                        </>
                      )}
                    </div>
                    {/* Thumbnails - only show if multiple images */}
                    {hasMultipleImages && (
                      <div className="bg-warm-bg p-3 overflow-x-auto">
                        <div className="flex gap-2">
                          {galleryImages.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentGalleryIndex(idx)}
                              className={`flex-shrink-0 aspect-video rounded overflow-hidden border-2 transition-all ${
                                currentGalleryIndex === idx ? 'border-secondary' : 'border-border-line'
                              }`}
                              style={{ width: '96px' }}
                            >
                              <Image
                                src={img}
                                alt={`${vehicle.title} Galeriebild ${idx + 1}`}
                                className="w-full h-full object-cover"
                                width={80}
                                height={60}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-alt-bg">
                    <div className="text-center">
                      <p className="text-lg font-bold text-text-secondary">Bild folgt</p>
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
                <p className="text-sm text-primary font-bold mb-4">Verfügbar</p>
              </div>
            </div>

            {/* Mobile: Financing Box */}
            <div className="lg:hidden bg-card-bg border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-6">
                <div className="p-4 rounded-lg border border-border-line bg-card-bg">
                  <p className="text-sm font-bold mb-3 text-foreground">Finanzierung auf Anfrage</p>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    Wir prüfen passende Finanzierungsoptionen gerne persönlich.
                  </p>
                </div>
              </div>
            </div>

            {/* Mobile: CTA Buttons */}
            <div className="lg:hidden bg-background border-t border-border-line">
              <div className="container mx-auto px-4 max-w-7xl py-6 space-y-3">
                <a
                  href="tel:+492374912912"
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
                  {transmission && (
                    <div className="flex justify-between items-center pb-4 border-b border-border-line">
                      <p className="text-sm text-text-secondary font-medium">Getriebe</p>
                      <p className="font-bold text-primary">{transmission}</p>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-text-secondary font-medium">Standort</p>
                    <p className="font-bold text-primary">Iserlohn-Letmathe</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Ausstattung */}
            {vehicleFeatures.length > 0 && (
              <div className="lg:hidden bg-background border-t border-border-line">
                <div className="container mx-auto px-4 max-w-7xl py-8">
                  <h2 className="text-xl font-heading font-bold text-primary mb-6">Ausstattung</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {vehicleFeatures.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-warm-bg rounded-lg border border-border-line">
                        <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                        <span className="font-medium text-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
            <AnimatedElement className="hidden lg:block container mx-auto px-4 max-w-7xl py-8 sm:py-12" priority={true}>
              <div className="bg-card-bg rounded-lg shadow-lg overflow-hidden border border-border-line">
                <div className="bg-alt-bg">
                  {vehicle.mainImage ? (
                    <div className="w-full flex flex-col">
                      <div className="relative w-full aspect-video overflow-hidden bg-alt-bg cursor-pointer" onClick={openLightbox}>
                        <Image
                          src={currentImage || vehicle.mainImage}
                          alt={vehicle.alt || vehicle.title}
                          className="w-full h-full object-cover"
                          width={1200}
                          height={675}
                          fetchPriority="high"
                          loading="eager"
                          decoding="async"
                        />
                        {hasMultipleImages && (
                          <>
                            <div className="absolute top-5 right-5 bg-primary text-white px-4 py-2 text-sm font-bold rounded-sm shadow-md">
                              {currentGalleryIndex + 1} / {galleryImages.length}
                            </div>
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-primary p-3 rounded-full shadow-md transition-all"
                              aria-label="Vorheriges Bild"
                            >
                              <ChevronLeft size={28} />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-primary p-3 rounded-full shadow-md transition-all"
                              aria-label="Nächstes Bild"
                            >
                              <ChevronRight size={28} />
                            </button>
                          </>
                        )}
                      </div>
                      {hasMultipleImages && (
                        <div className="grid grid-cols-6 md:grid-cols-8 xl:grid-cols-10 gap-2 p-4 bg-warm-bg max-h-52 overflow-y-auto">
                          {galleryImages.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentGalleryIndex(idx)}
                              className={`aspect-video relative rounded overflow-hidden border-2 transition-all ${
                                currentGalleryIndex === idx ? 'border-secondary' : 'border-border-line'
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`${vehicle.title} Galeriebild ${idx + 1}`}
                                className="w-full h-full object-cover"
                                width={150}
                                height={100}
                                loading="lazy"
                                decoding="async"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-alt-bg">
                      <div className="text-center">
                        <p className="text-xl font-bold text-text-secondary">Bild folgt</p>
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
                  <AnimatedElement priority={true}>
                    <div>
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary mb-6">
                        {vehicle.title}
                      </h2>
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
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line">
                            <div className="flex items-center gap-3 mb-2">
                              <Calendar className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Erstzulassung</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{vehicle.firstRegistration}</p>
                          </div>
                        )}

                        {vehicle.mileage && (
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line">
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
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line">
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
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line">
                            <div className="flex items-center gap-3 mb-2">
                              <Fuel className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Kraftstoff</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{vehicle.fuel}</p>
                          </div>
                        )}

                        {transmission && (
                          <div className="bg-card-bg p-5 rounded-lg border border-border-line">
                            <div className="flex items-center gap-3 mb-2">
                              <Wrench className="text-secondary flex-shrink-0" size={24} />
                              <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Getriebe</p>
                            </div>
                            <p className="font-bold text-lg text-primary">{transmission}</p>
                          </div>
                        )}

                        <div className="bg-card-bg p-5 rounded-lg border border-border-line">
                          <div className="flex items-center gap-3 mb-2">
                            <MapPin className="text-secondary flex-shrink-0" size={24} />
                            <p className="text-xs font-bold text-text-secondary uppercase tracking-wide">Standort</p>
                          </div>
                          <p className="font-bold text-lg text-primary">Iserlohn-Letmathe</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>

                  {/* Features/Equipment — echte abgeleitete Ausstattung */}
                  <AnimatedElement>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                        Ausstattung
                      </h2>
                      {vehicleFeatures.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {vehicleFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-warm-bg rounded-lg border border-border-line">
                              <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                              <span className="font-medium text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-text-secondary leading-relaxed font-paragraph">
                          Ausstattungsdetails nennen wir Ihnen gerne persönlich — rufen Sie an oder fragen Sie unverbindlich an.
                        </p>
                      )}
                    </div>
                  </AnimatedElement>

                  {/* Service bei Automobile Quick — bewusst getrennt von Fahrzeug-Ausstattung */}
                  <AnimatedElement>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                        Service bei Automobile Quick
                      </h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {SAFE_SERVICE_POINTS.map((point, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-warm-bg rounded-lg border border-border-line">
                            <div className="w-2 h-2 bg-secondary rounded-full flex-shrink-0"></div>
                            <span className="font-medium text-foreground">{point}</span>
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
                              className="group bg-card-bg rounded-lg overflow-hidden border border-border-line hover:border-secondary/70 transition-colors duration-200"
                            >
                              <div className="aspect-video bg-alt-bg overflow-hidden">
                                {v.mainImage ? (
                                  <Image
                                    src={v.mainImage || ""}
                                    alt={v.alt || v.title}
                                    className="w-full h-full object-cover"
                                    width={400}
                                    height={225}
                                    loading="lazy"
                                    decoding="async"
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
                    <AnimatedElement className="bg-surface-elevated shadow-md rounded-xl border border-border-line p-6 sm:p-8" priority={true}>
                      {/* Price */}
                      <div className="mb-8">
                        <p className="text-sm text-text-secondary font-medium mb-2">Verkaufspreis</p>
                        <p className="text-5xl sm:text-6xl font-bold text-secondary">
                          {vehicle.price}
                        </p>
                      </div>

                      {/* Financing */}
                      <div className="mb-8 p-4 rounded-lg border border-border-line bg-card-bg">
                        <p className="text-sm font-bold mb-3 text-foreground">Finanzierung auf Anfrage</p>
                        <p className="text-sm leading-relaxed text-text-secondary">
                          Wir prüfen passende Finanzierungsoptionen gerne persönlich.
                        </p>
                      </div>

                      {/* CTA Buttons */}
                      <div className="space-y-3">
                        <a
                          href="tel:+492374912912"
                          className="flex items-center justify-center gap-2 w-full bg-secondary text-white px-6 py-4 rounded-md font-bold hover:bg-cta-hover transition-colors duration-200 text-base min-h-[48px]"
                        >
                          <Phone size={20} />
                          Anrufen
                        </a>
                        <Link
                          to="/kontakt"
                          className="block w-full bg-primary text-white text-center px-6 py-4 rounded-md font-bold hover:bg-primary/90 transition-colors duration-200 text-base min-h-[48px] flex items-center justify-center"
                        >
                          Anfrage senden
                        </Link>
                        <Link
                          to="/finanzierung"
                          className="block w-full bg-white text-primary border-2 border-primary text-center px-6 py-4 rounded-md font-bold hover:bg-primary/5 transition-colors duration-200 text-base min-h-[48px] flex items-center justify-center"
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

            {/* EnVKV — Pflichtangaben */}
            {vehicle && (
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pb-8">
                <EnvkvDisclosure vehicle={vehicle} />
              </div>
            )}

          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && galleryImages.length > 0 && (
        <Lightbox
          images={galleryImages}
          currentIndex={currentGalleryIndex}
          alt={vehicle?.alt || vehicle?.title || 'Fahrzeugbild'}
          onClose={closeLightbox}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onGoTo={goToImage}
        />
      )}

      {/* Sticky Mobile CTA Bar */}
      {vehicle && (
        <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white border-t border-border-line shadow-[0_-2px_8px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3">
          <a
            href="tel:+492374912912"
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white font-bold rounded-md text-sm hover:bg-primary/90 transition-colors min-h-[48px]"
            aria-label="Automobile Quick anrufen"
          >
            <Phone size={16} />
            <span>Anrufen</span>
          </a>
          <WhatsAppCta
            vehicleTitle={vehicle.title}
            className="flex-1 min-h-[48px]"
          />
        </div>
      )}
      {/* Spacer so footer doesn't hide behind sticky bar */}
      {vehicle && <div className="h-[76px] lg:hidden" aria-hidden="true" />}
    </div>
  );
}

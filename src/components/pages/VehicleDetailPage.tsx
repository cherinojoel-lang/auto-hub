import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Gauge, Zap, Fuel, ArrowLeft } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Vehicles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { updateMetaTags, getStructuredDataProduct, getStructuredDataBreadcrumb } from '@/lib/seo';

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

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<Vehicles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicle();
  }, [id]);

  const loadVehicle = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<Vehicles>('vehicles', id);
      setVehicle(data);
      
      // Update SEO for vehicle detail page
      if (data) {
        updateMetaTags({
          title: `${data.manufacturer} ${data.model} - Gebrauchtwagen bei Automobile Quick`,
          description: data.description || `${data.manufacturer} ${data.model} - Hochwertiger Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe. Faire Preise und persönliche Beratung.`,
          keywords: `${data.manufacturer}, ${data.model}, Gebrauchtwagen, ${data.driveType}, Iserlohn, Letmathe`,
          ogTitle: `${data.manufacturer} ${data.model} - Automobile Quick`,
          ogDescription: data.description || `${data.manufacturer} ${data.model} - Hochwertiger Gebrauchtwagen`,
          ogImage: data.mainImage,
          canonicalUrl: `https://automobilequick.de/vehicles/${id}`,
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
      <Header />

      <div className="flex-1">
        <div className="container mx-auto px-4 max-w-7xl py-8 sm:py-12">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all duration-200 mb-8 sm:mb-12 text-base sm:text-lg"
          >
            <ArrowLeft size={22} />
            Zurück zur Übersicht
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner className="w-12 h-12 text-primary" />
              </div>
            ) : !vehicle ? (
              <div className="text-center py-20">
                <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                  Fahrzeug nicht gefunden
                </h2>
                <Link
                  to="/vehicles"
                  className="text-primary hover:text-primary/80 font-bold text-lg transition-colors"
                >
                  Zurück zur Übersicht
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                {/* Image Section */}
                <AnimatedElement>
                  <div className="bg-white rounded-sm shadow-2xl overflow-hidden border border-gray-100">
                    <div className="aspect-[4/3] bg-gray-100">
                      {vehicle.mainImage ? (
                        <Image
                          src={vehicle.mainImage}
                          alt={`${vehicle.manufacturer} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                          width={800}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <span className="text-9xl font-bold text-gray-400">
                            {vehicle.manufacturer?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedElement>

                {/* Details Section */}
                <AnimatedElement>
                  <div className="bg-white rounded-sm shadow-2xl p-8 sm:p-10 border border-gray-100">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
                      {vehicle.manufacturer} {vehicle.model}
                    </h1>
                    
                    <div className="mb-8 sm:mb-10">
                      <span className="text-4xl sm:text-5xl font-bold text-secondary">
                        {formatPrice(vehicle.price)}
                      </span>
                      <p className="text-sm text-gray-600 mt-2 font-medium">inkl. 19% MwSt.</p>
                    </div>

                    <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-12">
                      {vehicle.firstRegistrationYear && (
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-sm border border-gray-200">
                          <Calendar className="text-secondary flex-shrink-0" size={28} />
                          <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Erstzulassung</p>
                            <p className="font-bold text-lg text-primary">{vehicle.firstRegistrationYear}</p>
                          </div>
                        </div>
                      )}

                      {vehicle.mileage && (
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-sm border border-gray-200">
                          <Gauge className="text-secondary flex-shrink-0" size={28} />
                          <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Kilometerstand</p>
                            <p className="font-bold text-lg text-primary">
                              {vehicle.mileage.toLocaleString('de-DE')} km
                            </p>
                          </div>
                        </div>
                      )}

                      {vehicle.power && (
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-sm border border-gray-200">
                          <Zap className="text-secondary flex-shrink-0" size={28} />
                          <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Leistung</p>
                            <p className="font-bold text-lg text-primary">
                              {vehicle.power} kW ({Math.round(vehicle.power * 1.36)} PS)
                            </p>
                          </div>
                        </div>
                      )}

                      {vehicle.driveType && (
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-sm border border-gray-200">
                          <Fuel className="text-secondary flex-shrink-0" size={28} />
                          <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Antriebsart</p>
                            <p className="font-bold text-lg text-primary">{vehicle.driveType}</p>
                          </div>
                        </div>
                      )}

                      {vehicle.electricalRange && (
                        <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-sm border border-gray-200">
                          <Zap className="text-secondary flex-shrink-0" size={28} />
                          <div>
                            <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">Elektrische Reichweite</p>
                            <p className="font-bold text-lg text-primary">{vehicle.electricalRange} km</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {vehicle.description && (
                      <div className="mb-10 sm:mb-12">
                        <h2 className="text-2xl font-heading font-bold text-primary mb-4">
                          Beschreibung
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-base">
                          {vehicle.description}
                        </p>
                      </div>
                    )}

                    <div className="space-y-4 sm:space-y-5">
                      <Link
                        to="/contact"
                        className="block w-full bg-primary text-white text-center px-8 py-4 rounded-sm font-bold hover:bg-primary/90 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-lg shadow-md"
                      >
                        Jetzt anfragen
                      </Link>
                      <a
                        href="tel:+4923311234567"
                        className="block w-full bg-secondary text-white text-center px-8 py-4 rounded-sm font-bold hover:bg-secondary/90 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 text-lg shadow-md"
                      >
                        +49 2331 123456 anrufen
                      </a>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

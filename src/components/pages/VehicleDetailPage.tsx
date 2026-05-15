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
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gradient-to-b from-background to-secondary/5">
        <div className="container mx-auto px-4 py-8">
          <Link
            to="/vehicles"
            className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-200 mb-6"
          >
            <ArrowLeft size={20} />
            Zurück zur Übersicht
          </Link>

          <div className="min-h-[600px]">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <LoadingSpinner />
              </div>
            ) : !vehicle ? (
              <div className="text-center py-20">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Fahrzeug nicht gefunden
                </h2>
                <Link
                  to="/vehicles"
                  className="text-primary hover:underline"
                >
                  Zurück zur Übersicht
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image Section */}
                <AnimatedElement>
                  <div className="bg-background rounded-2xl shadow-lg overflow-hidden border border-border/50">
                    <div className="aspect-[4/3] bg-secondary/5">
                      {vehicle.mainImage ? (
                        <Image
                          src={vehicle.mainImage}
                          alt={`${vehicle.manufacturer} ${vehicle.model}`}
                          className="w-full h-full object-cover"
                          width={800}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                          <span className="text-8xl font-bold text-secondary/30">
                            {vehicle.manufacturer?.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedElement>

                {/* Details Section */}
                <AnimatedElement>
                  <div className="bg-background rounded-2xl shadow-lg p-8 border border-border/50">
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                      {vehicle.manufacturer} {vehicle.model}
                    </h1>
                    
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary">
                        {formatPrice(vehicle.price)}
                      </span>
                      <p className="text-sm text-foreground/60 mt-1">inkl. 19% MwSt.</p>
                    </div>

                    <div className="space-y-4 mb-8">
                      {vehicle.firstRegistrationYear && (
                        <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
                          <Calendar className="text-primary flex-shrink-0" size={24} />
                          <div>
                            <p className="text-sm text-foreground/60">Erstzulassung</p>
                            <p className="font-medium text-foreground">{vehicle.firstRegistrationYear}</p>
                          </div>
                        </div>
                      )}

                      {vehicle.mileage && (
                        <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
                          <Gauge className="text-primary flex-shrink-0" size={24} />
                          <div>
                            <p className="text-sm text-foreground/60">Kilometerstand</p>
                            <p className="font-medium text-foreground">
                              {vehicle.mileage.toLocaleString('de-DE')} km
                            </p>
                          </div>
                        </div>
                      )}

                      {vehicle.power && (
                        <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
                          <Zap className="text-primary flex-shrink-0" size={24} />
                          <div>
                            <p className="text-sm text-foreground/60">Leistung</p>
                            <p className="font-medium text-foreground">
                              {vehicle.power} kW ({Math.round(vehicle.power * 1.36)} PS)
                            </p>
                          </div>
                        </div>
                      )}

                      {vehicle.driveType && (
                        <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
                          <Fuel className="text-primary flex-shrink-0" size={24} />
                          <div>
                            <p className="text-sm text-foreground/60">Antriebsart</p>
                            <p className="font-medium text-foreground">{vehicle.driveType}</p>
                          </div>
                        </div>
                      )}

                      {vehicle.electricalRange && (
                        <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg">
                          <Zap className="text-primary flex-shrink-0" size={24} />
                          <div>
                            <p className="text-sm text-foreground/60">Elektrische Reichweite</p>
                            <p className="font-medium text-foreground">{vehicle.electricalRange} km</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {vehicle.description && (
                      <div className="mb-8">
                        <h2 className="text-xl font-heading font-bold text-foreground mb-3">
                          Beschreibung
                        </h2>
                        <p className="text-foreground/80 leading-relaxed">
                          {vehicle.description}
                        </p>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Link
                        to="/contact"
                        className="block w-full bg-primary text-primary-foreground text-center px-6 py-4 rounded-lg font-medium hover:bg-primary/90 hover:shadow-lg transition-all duration-200"
                      >
                        Jetzt anfragen
                      </Link>
                      <a
                        href="tel:+4923311234567"
                        className="block w-full bg-secondary/10 text-foreground text-center px-6 py-4 rounded-lg font-medium hover:bg-secondary/20 transition-all duration-200"
                      >
                        Anrufen
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

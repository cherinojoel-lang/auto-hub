import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Camera, Fuel, Gauge, ShieldCheck, Zap } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { WhatsAppCta } from '@/components/ui/whatsapp-cta';
import { getVehicleImageCount, getFeatureChips } from '@/lib/domain/vehicleFeatures';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const imageCount = getVehicleImageCount(vehicle);
  const featureChips = getFeatureChips(vehicle);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setIsVisible(true), index * 100);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [index]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <div className="group flex flex-col h-full bg-surface-elevated shadow-sm rounded-lg hover:shadow-md transition-shadow duration-200 overflow-hidden border border-border-line">
        {/* Image Container */}
        <Link to={`/fahrzeugdetail/${vehicle.id}`} className="relative aspect-[4/3] overflow-hidden bg-alt-bg block">
          <Image
            src={vehicle.mainImage}
            alt={vehicle.alt || vehicle.title}
            className="w-full h-full object-cover"
            width={400}
            height={250}
            loading={index < 3 ? 'eager' : 'lazy'}
            fetchPriority={index < 3 ? 'high' : 'auto'}
          />
          <div className="absolute top-3 left-3 bg-white/95 text-primary px-3 py-1.5 text-xs font-bold rounded-md border border-border-line">
            {vehicle.isNew ? 'Neu eingetroffen' : 'Verfügbar'}
          </div>
          {imageCount > 1 && (
            <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-primary/95 text-white px-3 py-1.5 text-xs font-bold rounded-md">
              <Camera size={13} />
              <span>{imageCount} {imageCount === 1 ? 'Foto' : 'Fotos'}</span>
            </div>
          )}
          <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-white/95 text-primary px-3 py-1.5 text-xs font-bold rounded-md border border-border-line">
            <ShieldCheck size={13} className="text-secondary" />
            <span>Geprüft</span>
          </div>
        </Link>

        {/* Content Area */}
        <div className="p-5 sm:p-6 flex flex-col flex-grow">
          {/* Brand + Model */}
          <Link to={`/fahrzeugdetail/${vehicle.id}`} className="mb-2">
            <h3 className="text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {vehicle.title}
            </h3>
          </Link>

          {/* Trim Line */}
          <p className="text-xs text-text-secondary mb-4 line-clamp-2 min-h-[2rem]">
            {vehicle.description || `${vehicle.make} ${vehicle.model} aus gepflegtem Bestand in Iserlohn-Letmathe`}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs text-text-secondary mb-4">
            <div className="flex min-w-0 items-center gap-2">
              <Calendar size={14} className="text-secondary flex-shrink-0" />
              <span className="truncate">EZ {vehicle.firstRegistration || 'Neu'}</span>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Gauge size={14} className="text-secondary flex-shrink-0" />
              <span className="truncate">{vehicle.mileage || '0 km'}</span>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Zap size={14} className="text-secondary flex-shrink-0" />
              <span className="truncate">{vehicle.power || '-'}</span>
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <Fuel size={14} className="text-secondary flex-shrink-0" />
              <span className="truncate">{vehicle.fuel || '-'}</span>
            </div>
          </div>

          {featureChips.length > 0 && (
            <div className="mb-4 flex min-h-[28px] flex-wrap gap-2">
              {featureChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-md border border-border-line bg-white px-2.5 py-1 text-[11px] font-bold text-primary"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Separator */}
          <div className="border-t border-border-line my-4"></div>

          {/* Price */}
          <p className="text-xs text-text-secondary mb-1">Barpreis</p>
          <p className="text-2xl font-bold text-secondary mb-1">{vehicle.price}</p>

          {/* Monthly Rate */}
          <p className="text-xs text-text-secondary mb-4">{vehicle.financing}</p>

          {/* CTA Button */}
          <div className="mt-auto flex flex-col gap-2">
            <Link
              to={`/fahrzeugdetail/${vehicle.id}`}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-md font-bold text-sm hover:bg-primary/90 transition-colors min-h-[48px]"
            >
              Fahrzeug ansehen
              <ArrowRight size={16} />
            </Link>
            <WhatsAppCta
              vehicleTitle={vehicle.title}
              compact
              variant="subtle"
              className="w-full justify-center min-h-[44px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function VehicleInventorySection() {
  const topVehicles = vehiclesData.filter((vehicle) => vehicle.status === 'available').slice(0, 6);

  return (
    <section className="py-16 sm:py-20 bg-surface" id="main-content">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight text-foreground mb-4">
            Unsere aktuellen Top-Fahrzeuge
          </h2>
          <p className="text-base text-text-secondary mb-8">
            Kompakt genug zum Vergleichen, mit den wichtigsten Daten direkt auf der Karte.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {topVehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>

        {/* All Vehicles Button */}
        <div className="flex justify-center">
          <Link
            to="/fahrzeugbestand"
            className="border border-primary text-primary px-8 py-3.5 rounded-md font-bold hover:bg-primary hover:text-white transition-colors duration-200 min-h-[48px] inline-flex items-center"
          >
            ALLE FAHRZEUGE ANSEHEN
          </Link>
        </div>
      </div>
    </section>
  );
}

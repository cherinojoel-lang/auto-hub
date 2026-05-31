import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
      <Link
        to={`/fahrzeugdetail/${vehicle.id}`}
        className="group flex flex-col h-full bg-white rounded-md border border-border-line hover:border-secondary/70 transition-colors duration-200 overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-alt-bg">
          <Image
            src={vehicle.mainImage}
            alt={vehicle.alt || vehicle.title}
            className="w-full h-full object-cover"
            width={400}
            height={250}
            loading="lazy"
          />
          {/* Badge Overlay */}
          <div className="absolute top-3 left-3 bg-white/95 text-primary px-3 py-1.5 text-xs font-bold rounded-md border border-border-line">
            Verfügbar
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Brand + Model */}
          <h3 className="text-base font-bold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors leading-snug">
            {vehicle.title}
          </h3>

          {/* Trim Line */}
          <p className="text-sm text-text-secondary mb-3">
            {vehicle.fuel} | {vehicle.power}
          </p>

          {/* Specs Row */}
          <div className="grid grid-cols-1 gap-2 text-xs text-text-secondary mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-secondary" />
              <span>{vehicle.firstRegistration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={14} className="text-secondary" />
              <span>{vehicle.mileage}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel size={14} className="text-secondary" />
              <span>{vehicle.fuel}</span>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-border-line my-4"></div>

          {/* Price */}
          <p className="text-xl font-bold text-secondary mb-1">{vehicle.price}</p>

          {/* Monthly Rate */}
          <p className="text-xs text-text-secondary mb-4">{vehicle.financing}</p>

          {/* CTA Button */}
          <span className="w-full flex items-center justify-center bg-primary text-white py-3 rounded-md font-bold text-sm hover:bg-primary/90 transition-colors mt-auto min-h-[48px]">
            Details ansehen
          </span>
        </div>
      </Link>
    </div>
  );
};

export default function VehicleInventorySection() {
  const topVehicles = vehiclesData.slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Unsere aktuellen Top-Fahrzeuge
          </h2>
          <p className="text-base text-text-secondary mb-8">
            Jedes Fahrzeug wird von uns persönlich geprüft und aufbereitet
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

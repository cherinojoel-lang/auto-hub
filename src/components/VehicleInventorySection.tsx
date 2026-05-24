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
    let timeout: NodeJS.Timeout;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => setIsVisible(true), index * 100);
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
      clearTimeout(timeout);
    };
  }, [index]);

  const isNew = vehicle.firstRegistration && new Date(vehicle.firstRegistration).getFullYear() >= 2023;
  const badgeText = isNew ? 'NEU' : 'TOP ANGEBOT';
  const badgeColor = isNew ? 'bg-green-500' : 'bg-red-600';

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <Link
        to={`/fahrzeugdetail/${vehicle.id}`}
        className="group flex flex-col h-full bg-white rounded-[12px] shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
      >
        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden bg-gray-100 rounded-t-[12px]">
          <Image
            src={vehicle.mainImage}
            alt={vehicle.alt || vehicle.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            width={400}
            height={250}
            loading="lazy"
          />
          {/* Badge Overlay */}
          <div className={`absolute top-0 left-0 ${badgeColor} text-white px-3 py-1 text-xs font-semibold rounded-br-lg`}>
            {badgeText}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Brand + Model */}
          <h3 className="text-base font-semibold text-slate-900 line-clamp-1 mb-1 group-hover:text-red-600 transition-colors">
            {vehicle.title}
          </h3>

          {/* Trim Line */}
          <p className="text-sm text-slate-600 mb-3">
            {vehicle.fuel} | {vehicle.power}
          </p>

          {/* Specs Row */}
          <div className="flex gap-4 text-xs text-slate-700 mb-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} className="text-slate-500" />
              <span>{vehicle.firstRegistration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Gauge size={14} className="text-slate-500" />
              <span>{vehicle.mileage}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel size={14} className="text-slate-500" />
              <span>{vehicle.fuel}</span>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-slate-200 my-4"></div>

          {/* Price */}
          <p className="text-xl font-bold text-red-600 mb-1">{vehicle.price}</p>

          {/* Monthly Rate */}
          <p className="text-xs text-slate-600 mb-4">{vehicle.financing}</p>

          {/* CTA Button */}
          <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-slate-800 transition-colors mt-auto">
            Details ansehen
          </button>
        </div>
      </Link>
    </div>
  );
};

export default function VehicleInventorySection() {
  const topVehicles = vehiclesData.slice(0, 6);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Unsere aktuellen Top-Fahrzeuge
          </h2>
          <p className="text-base text-slate-600 mb-8">
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
            className="border-2 border-slate-900 text-slate-900 px-8 py-3.5 rounded-lg font-medium hover:bg-slate-900 hover:text-white transition-all duration-300"
          >
            ALLE FAHRZEUGE ANSEHEN
          </Link>
        </div>
      </div>
    </section>
  );
}

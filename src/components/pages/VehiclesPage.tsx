import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Camera,
  ChevronDown,
  Filter,
  Fuel,
  Gauge,
  SlidersHorizontal,
  X,
  Zap,
} from 'lucide-react';
import { vehiclesData, type Vehicle } from '@/data/vehiclesData.generated';
import { Image } from '@/components/ui/image';
import { InquiryCta } from '@/components/ui/inquiry-cta';
import { updateMetaTags, getStructuredDataBreadcrumb } from '@/lib/seo';
import SeoHead from '@/components/SeoHead';
import { PAGE_METADATA, SITE_CONFIG } from '@/lib/seo-config';
import {
  filterVehicles,
  FilterCriteriaSchema,
  deriveManufacturerOptions,
  deriveFuelOptions,
} from '@/lib/domain/vehicleFilter';
import {
  getFeatureChips,
  getTransmission,
  getVehicleImageCount,
} from '@/lib/domain/vehicleFeatures';

const MANUFACTURER_OPTIONS = deriveManufacturerOptions(vehiclesData);
const FUEL_OPTIONS = deriveFuelOptions(vehiclesData);

type SortOption = 'newest' | 'price-asc' | 'price-desc';

function registrationTimestamp(value?: string) {
  if (!value) return 0;
  const parts = value.split('/').map((part) => Number(part));
  if (parts.length === 2 && Number.isFinite(parts[0]) && Number.isFinite(parts[1])) {
    return new Date(parts[1], Math.max(0, parts[0] - 1), 1).getTime();
  }
  const year = Number(parts.at(-1));
  return Number.isFinite(year) ? new Date(year, 0, 1).getTime() : 0;
}

function splitMarketplaceTitle(title: string) {
  const parts = title
    .split('*')
    .map((part) => part.trim())
    .filter(Boolean);

  return {
    title: parts[0] || title,
    highlights: parts.slice(1, 4),
  };
}

export default function VehiclesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'newest',
  );

  const [manufacturer, setManufacturer] = useState(searchParams.get('manufacturer') || '');
  const [priceMax, setPriceMax] = useState(searchParams.get('priceMax') || '');
  const [driveType, setDriveType] = useState(searchParams.get('driveType') || '');
  const [maxMileage, setMaxMileage] = useState(searchParams.get('maxMileage') || '');
  const [yearFrom, setYearFrom] = useState(searchParams.get('yearFrom') || '');

  useEffect(() => {
    updateMetaTags({
      title: PAGE_METADATA.vehicles.title,
      description: PAGE_METADATA.vehicles.description,
      keywords:
        'Fahrzeugbestand, Gebrauchtwagen kaufen, Gebrauchtwagen Iserlohn, Gebrauchtwagen Letmathe, Autohaus Iserlohn, Automobile Quick Fahrzeuge',
      ogTitle: 'Fahrzeugbestand - Automobile Quick',
      ogDescription: PAGE_METADATA.vehicles.description,
      canonicalUrl: `${SITE_CONFIG.url}${PAGE_METADATA.vehicles.path}`,
      structuredData: getStructuredDataBreadcrumb([
        { name: 'Home', url: `${SITE_CONFIG.url}/` },
        { name: 'Fahrzeugbestand', url: `${SITE_CONFIG.url}${PAGE_METADATA.vehicles.path}` },
      ]),
    });
  }, []);

  const appliedCriteria = useMemo(() => {
    try {
      return FilterCriteriaSchema.parse({
        manufacturer: searchParams.get('manufacturer') || '',
        priceMax: searchParams.get('priceMax') || '',
        fuel: searchParams.get('driveType') || '',
        maxMileage: searchParams.get('maxMileage') || '',
        yearFrom: searchParams.get('yearFrom') || '',
      });
    } catch {
      return FilterCriteriaSchema.parse({});
    }
  }, [searchParams]);

  const filteredVehicles = useMemo(
    () => filterVehicles(vehiclesData, appliedCriteria),
    [appliedCriteria],
  );

  const sortedVehicles = useMemo(() => {
    const next = [...filteredVehicles];

    if (sort === 'price-asc') {
      return next.sort((a, b) => (a.priceValue || 0) - (b.priceValue || 0));
    }

    if (sort === 'price-desc') {
      return next.sort((a, b) => (b.priceValue || 0) - (a.priceValue || 0));
    }

    return next.sort((a, b) => {
      if (Boolean(a.isNew) !== Boolean(b.isNew)) return a.isNew ? -1 : 1;
      return registrationTimestamp(b.firstRegistration) - registrationTimestamp(a.firstRegistration);
    });
  }, [filteredVehicles, sort]);

  const activeFilters = useMemo(() => {
    const filters: Array<{ key: string; label: string }> = [];
    const appliedManufacturer = searchParams.get('manufacturer');
    const appliedPrice = searchParams.get('priceMax');
    const appliedFuel = searchParams.get('driveType');
    const appliedMileage = searchParams.get('maxMileage');
    const appliedYear = searchParams.get('yearFrom');

    if (appliedManufacturer) filters.push({ key: 'manufacturer', label: appliedManufacturer });
    if (appliedPrice) {
      filters.push({
        key: 'priceMax',
        label: `bis ${Number(appliedPrice).toLocaleString('de-DE')} €`,
      });
    }
    if (appliedFuel) filters.push({ key: 'driveType', label: appliedFuel });
    if (appliedMileage) {
      filters.push({
        key: 'maxMileage',
        label: `bis ${Number(appliedMileage).toLocaleString('de-DE')} km`,
      });
    }
    if (appliedYear) filters.push({ key: 'yearFrom', label: `ab ${appliedYear}` });

    return filters;
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (manufacturer) params.set('manufacturer', manufacturer);
    if (priceMax) params.set('priceMax', priceMax);
    if (driveType) params.set('driveType', driveType);
    if (maxMileage) params.set('maxMileage', maxMileage);
    if (yearFrom) params.set('yearFrom', yearFrom);
    if (sort !== 'newest') params.set('sort', sort);
    setSearchParams(params);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setManufacturer('');
    setPriceMax('');
    setDriveType('');
    setMaxMileage('');
    setYearFrom('');

    const params = new URLSearchParams();
    if (sort !== 'newest') params.set('sort', sort);
    setSearchParams(params);
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);

    if (key === 'manufacturer') setManufacturer('');
    if (key === 'priceMax') setPriceMax('');
    if (key === 'driveType') setDriveType('');
    if (key === 'maxMileage') setMaxMileage('');
    if (key === 'yearFrom') setYearFrom('');

    setSearchParams(params);
  };

  const updateSort = (value: SortOption) => {
    setSort(value);
    const params = new URLSearchParams(searchParams);
    if (value === 'newest') params.delete('sort');
    else params.set('sort', value);
    setSearchParams(params);
  };

  const filterFields = (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
        Marke
        <select
          value={manufacturer}
          onChange={(event) => setManufacturer(event.target.value)}
          className="min-h-12 w-full rounded-md border border-border-line bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Alle Marken</option>
          {MANUFACTURER_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
        Preis
        <select
          value={priceMax}
          onChange={(event) => setPriceMax(event.target.value)}
          className="min-h-12 w-full rounded-md border border-border-line bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Alle Preise</option>
          <option value="15000">bis 15.000 €</option>
          <option value="25000">bis 25.000 €</option>
          <option value="40000">bis 40.000 €</option>
          <option value="60000">bis 60.000 €</option>
          <option value="100000">bis 100.000 €</option>
        </select>
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
        Kraftstoff
        <select
          value={driveType}
          onChange={(event) => setDriveType(event.target.value)}
          className="min-h-12 w-full rounded-md border border-border-line bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Alle Kraftstoffe</option>
          {FUEL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
        Kilometerstand
        <select
          value={maxMileage}
          onChange={(event) => setMaxMileage(event.target.value)}
          className="min-h-12 w-full rounded-md border border-border-line bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Alle km</option>
          <option value="20000">bis 20.000</option>
          <option value="50000">bis 50.000</option>
          <option value="100000">bis 100.000</option>
          <option value="150000">bis 150.000</option>
          <option value="200000">bis 200.000</option>
        </select>
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-wide text-foreground">
        Erstzulassung
        <select
          value={yearFrom}
          onChange={(event) => setYearFrom(event.target.value)}
          className="min-h-12 w-full rounded-md border border-border-line bg-white px-4 py-3 text-sm font-medium normal-case tracking-normal text-foreground focus:border-primary focus:outline-none"
        >
          <option value="">Alle Jahre</option>
          <option value="2024">ab 2024</option>
          <option value="2023">ab 2023</option>
          <option value="2022">ab 2022</option>
          <option value="2021">ab 2021</option>
          <option value="2020">ab 2020</option>
          <option value="2019">ab 2019</option>
          <option value="2018">ab 2018</option>
        </select>
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-28 md:pb-0">
      <SeoHead
        title={PAGE_METADATA.vehicles.title}
        description={PAGE_METADATA.vehicles.description}
        url={`${SITE_CONFIG.url}${PAGE_METADATA.vehicles.path}`}
      />
      <a href="#main-content" className="skip-to-main">
        Zum Hauptinhalt springen
      </a>

      <section className="bg-primary py-8 text-white sm:py-12 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 text-center sm:px-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary">
            Automobile Quick · Iserlohn-Letmathe
          </p>
          <h1 className="mx-auto max-w-4xl font-heading text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Aktuelle Gebrauchtwagen in Iserlohn-Letmathe
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            Preise, Bilder und die wichtigsten Fahrzeugdaten auf einen Blick.
          </p>
        </div>
      </section>

      <main id="main-content" className="mx-auto max-w-[1400px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-4 flex items-center gap-2 md:hidden">
          <div className="mr-auto min-w-0">
            <p className="text-base font-bold text-foreground">
              {sortedVehicles.length} {sortedVehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
            </p>
            <p className="text-xs text-text-secondary">Aktueller Bestand</p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            aria-label={showFilters ? 'Filter schließen' : 'Filter öffnen'}
            aria-expanded={showFilters}
            aria-controls="vehicle-filters"
            className="inline-flex min-h-12 items-center gap-2 rounded-md border border-border-line bg-white px-4 text-sm font-bold text-primary shadow-sm"
          >
            <Filter size={18} />
            Filter
            {activeFilters.length > 0 && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-white">
                {activeFilters.length}
              </span>
            )}
          </button>

          <label className="relative">
            <span className="sr-only">Fahrzeuge sortieren</span>
            <select
              value={sort}
              onChange={(event) => updateSort(event.target.value as SortOption)}
              className="min-h-12 appearance-none rounded-md border border-border-line bg-white py-2 pl-3 pr-8 text-sm font-bold text-foreground shadow-sm focus:border-primary focus:outline-none"
            >
              <option value="newest">Neueste</option>
              <option value="price-asc">Preis ↑</option>
              <option value="price-desc">Preis ↓</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-secondary"
            />
          </label>
        </div>

        {activeFilters.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2" aria-label="Aktive Filter">
            {activeFilters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => removeFilter(filter.key)}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border-line bg-white px-3 text-xs font-bold text-primary"
                aria-label={`${filter.label} entfernen`}
              >
                {filter.label}
                <X size={13} />
              </button>
            ))}
            <button
              type="button"
              onClick={clearFilters}
              className="min-h-9 px-2 text-xs font-bold text-secondary underline-offset-4 hover:underline"
            >
              Alle zurücksetzen
            </button>
          </div>
        )}

        <section className="mb-8 hidden rounded-lg border border-border-line bg-white p-5 shadow-sm md:block">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
                <SlidersHorizontal size={19} className="text-secondary" />
                Bestand filtern
              </h2>
              <p className="mt-1 text-sm text-text-secondary">
                {sortedVehicles.length} passende {sortedVehicles.length === 1 ? 'Fahrzeug' : 'Fahrzeuge'}
              </p>
            </div>
            <label className="flex items-center gap-2 text-sm font-bold text-foreground">
              Sortieren
              <select
                value={sort}
                onChange={(event) => updateSort(event.target.value as SortOption)}
                className="min-h-11 rounded-md border border-border-line bg-white px-3 text-sm font-medium focus:border-primary focus:outline-none"
              >
                <option value="newest">Neueste zuerst</option>
                <option value="price-asc">Preis aufsteigend</option>
                <option value="price-desc">Preis absteigend</option>
              </select>
            </label>
          </div>

          {filterFields}

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={applyFilters}
              className="min-h-12 rounded-md bg-primary px-7 text-sm font-bold text-white transition-colors hover:bg-primary/90"
            >
              {filteredVehicles.length} Fahrzeuge anzeigen
            </button>
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="min-h-12 rounded-md px-4 text-sm font-bold text-secondary hover:bg-secondary/5"
              >
                Zurücksetzen
              </button>
            )}
          </div>
        </section>

        {showFilters && (
          <div className="fixed inset-0 z-[70] flex items-end bg-black/45 md:hidden" role="presentation">
            <section
              id="vehicle-filters"
              role="dialog"
              aria-modal="true"
              aria-labelledby="vehicle-filter-title"
              className="max-h-[88svh] w-full overflow-y-auto rounded-t-2xl bg-white px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 shadow-2xl"
            >
              <div className="sticky top-0 z-10 mb-4 flex items-center justify-between border-b border-border-line bg-white pb-3">
                <div>
                  <h2 id="vehicle-filter-title" className="font-heading text-xl font-bold text-foreground">
                    Fahrzeuge filtern
                  </h2>
                  <p className="text-xs text-text-secondary">
                    {filteredVehicles.length} Ergebnisse mit aktueller Auswahl
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(false)}
                  aria-label="Filter schließen"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-border-line text-foreground"
                >
                  <X size={20} />
                </button>
              </div>

              {filterFields}

              <div className="sticky bottom-0 -mx-4 mt-5 flex gap-3 border-t border-border-line bg-white px-4 pb-1 pt-3">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-12 flex-1 rounded-md border border-border-line px-4 text-sm font-bold text-foreground"
                >
                  Zurücksetzen
                </button>
                <button
                  type="button"
                  onClick={applyFilters}
                  className="min-h-12 flex-[1.5] rounded-md bg-primary px-4 text-sm font-bold text-white"
                >
                  {filteredVehicles.length} anzeigen
                </button>
              </div>
            </section>
          </div>
        )}

        {sortedVehicles.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {sortedVehicles.map((vehicle, index) => {
              const imageCount = getVehicleImageCount(vehicle);
              const transmission = getTransmission(vehicle);
              const parsedTitle = splitMarketplaceTitle(vehicle.title);
              const featureChips = parsedTitle.highlights.length
                ? parsedTitle.highlights
                : getFeatureChips(vehicle).slice(0, 3);

              return (
                <article
                  key={vehicle.id}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-border-line bg-surface-elevated shadow-sm transition-shadow hover:shadow-md"
                >
                  <Link
                    to={`/fahrzeugdetail/${vehicle.id}`}
                    className="relative block aspect-[4/3] overflow-hidden bg-alt-bg"
                    aria-label={`${parsedTitle.title} ansehen`}
                  >
                    <Image
                      src={vehicle.mainImage}
                      alt={vehicle.alt || `${parsedTitle.title}, Fahrzeugansicht`}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
                      width={520}
                      height={390}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      fetchPriority={index === 0 ? 'high' : 'auto'}
                      decoding="async"
                    />

                    {vehicle.isNew && (
                      <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-primary shadow-sm">
                        Neu
                      </span>
                    )}

                    {imageCount > 1 && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-primary/90 px-3 py-1 text-[11px] font-bold text-white shadow-sm backdrop-blur-sm">
                        <Camera size={13} />
                        {imageCount}
                      </span>
                    )}
                  </Link>

                  <div className="flex flex-1 flex-col p-5">
                    <Link to={`/fahrzeugdetail/${vehicle.id}`} className="block">
                      <h2 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                        {parsedTitle.title}
                      </h2>
                    </Link>

                    {featureChips.length > 0 && (
                      <p className="mt-2 line-clamp-1 text-sm text-text-secondary">
                        {featureChips.join(' · ')}
                      </p>
                    )}

                    <div className="mt-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">Barpreis</p>
                      <p className="mt-0.5 text-2xl font-bold text-secondary">{vehicle.price}</p>
                      {vehicle.financing && (
                        <p className="mt-1 text-xs text-text-secondary">{vehicle.financing}</p>
                      )}
                    </div>

                    <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border-line py-4 text-xs text-text-secondary">
                      <div className="flex min-w-0 items-center gap-2">
                        <Calendar size={14} className="shrink-0 text-secondary" />
                        <span className="truncate">EZ {vehicle.firstRegistration || '—'}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2">
                        <Gauge size={14} className="shrink-0 text-secondary" />
                        <span className="truncate">{vehicle.mileage || '—'}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2">
                        <Zap size={14} className="shrink-0 text-secondary" />
                        <span className="truncate">{vehicle.power || '—'}</span>
                      </div>
                      <div className="flex min-w-0 items-center gap-2">
                        <Fuel size={14} className="shrink-0 text-secondary" />
                        <span className="truncate">{vehicle.fuel || '—'}</span>
                      </div>
                      {transmission && (
                        <div className="col-span-2 flex min-w-0 items-center gap-2">
                          <SlidersHorizontal size={14} className="shrink-0 text-secondary" />
                          <span className="truncate">{transmission}</span>
                        </div>
                      )}
                    </dl>

                    <div className="mt-auto grid gap-2 pt-5">
                      <Link
                        to={`/fahrzeugdetail/${vehicle.id}`}
                        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white transition-colors hover:bg-primary/90"
                      >
                        Fahrzeug ansehen
                        <ArrowRight size={16} />
                      </Link>
                      <InquiryCta
                        vehicleTitle={vehicle.title}
                        compact
                        variant="subtle"
                        className="min-h-11 w-full justify-center"
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-border-line bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-xl font-bold text-foreground">Keine Fahrzeuge gefunden</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-text-secondary">
              Ändern Sie die Filter oder setzen Sie die Auswahl zurück, um den gesamten Bestand zu sehen.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 min-h-12 rounded-md bg-secondary px-7 text-sm font-bold text-white"
            >
              Alle Filter zurücksetzen
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

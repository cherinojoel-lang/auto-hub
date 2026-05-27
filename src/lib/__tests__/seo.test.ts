import { describe, it, expect } from 'vitest';
import { getStructuredDataProduct } from '../seo';

describe('getStructuredDataProduct', () => {
  it('should return a valid schema object for a given vehicle with full data', () => {
    const mockVehicle = {
      manufacturer: 'Audi',
      model: 'A4',
      description: 'A great car.',
      mainImage: 'https://example.com/audi-a4.jpg',
      price: 25000,
      firstRegistrationYear: '2020',
      mileage: 50000,
    };

    const result = getStructuredDataProduct(mockVehicle);

    expect(result).toBeDefined();
    expect(result['@context']).toBe('https://schema.org');
    expect(result['@type']).toBe('Product');
    expect(result.name).toBe('Audi A4');
    expect(result.description).toBe('A great car.');
    expect(result.image).toBe('https://example.com/audi-a4.jpg');

    expect(result.offers).toBeDefined();
    expect(result.offers['@type']).toBe('Offer');
    expect(result.offers.price).toBe(25000);
    expect(result.offers.priceCurrency).toBe('EUR');
    expect(result.offers.availability).toBe('https://schema.org/InStock');
    expect(result.offers.seller).toBeDefined();
    expect(result.offers.seller['@type']).toBe('LocalBusiness');
    expect(result.offers.seller.name).toBe('Automobile Quick');
    expect(result.offers.seller.url).toBe('https://automobilequick.de');

    expect(result.aggregateRating).toBeDefined();
    expect(result.aggregateRating['@type']).toBe('AggregateRating');
    expect(result.aggregateRating.ratingValue).toBe('4.9');
    expect(result.aggregateRating.reviewCount).toBe('157');

    expect(result.vehicleSpecializations).toBeDefined();
    expect(result.vehicleSpecializations['@type']).toBe('Vehicle');
    expect(result.vehicleSpecializations.manufacturer).toBe('Audi');
    expect(result.vehicleSpecializations.model).toBe('A4');
    expect(result.vehicleSpecializations.productionDate).toBe('2020');

    expect(result.vehicleSpecializations.mileageFromOdometer).toBeDefined();
    expect(result.vehicleSpecializations.mileageFromOdometer['@type']).toBe('QuantitativeValue');
    expect(result.vehicleSpecializations.mileageFromOdometer.value).toBe(50000);
    expect(result.vehicleSpecializations.mileageFromOdometer.unitCode).toBe('KMT');
  });

  it('should use default description when vehicle description is missing', () => {
    const mockVehicle = {
      manufacturer: 'BMW',
      model: '320i',
      mainImage: 'https://example.com/bmw.jpg',
      price: 30000,
      firstRegistrationYear: '2021',
      mileage: 30000,
      // No description provided
    };

    const result = getStructuredDataProduct(mockVehicle);

    expect(result.description).toBe('BMW 320i - Hochwertiger Gebrauchtwagen bei Automobile Quick in Iserlohn-Letmathe');
  });

  it('should handle missing numeric fields gracefully', () => {
    const mockVehicle = {
      manufacturer: 'Mercedes',
      model: 'C-Class',
      // Missing price, mileage, etc.
    };

    const result = getStructuredDataProduct(mockVehicle);

    expect(result.offers.price).toBeUndefined();
    expect(result.vehicleSpecializations.productionDate).toBeUndefined();
    expect(result.vehicleSpecializations.mileageFromOdometer.value).toBeUndefined();
  });
});

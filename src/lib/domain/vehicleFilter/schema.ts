import { z } from 'zod';

const CURRENT_YEAR = new Date().getFullYear();

const trimmed = z.string().transform((s) => s.trim());

const numericString = z
  .string()
  .transform((s) => s.trim())
  .refine((s) => s === '' || /^\d+$/.test(s), { message: 'Muss leer oder rein numerisch sein' });

const yearString = z
  .string()
  .transform((s) => s.trim())
  .refine(
    (s) => s === '' || (/^\d{4}$/.test(s) && Number(s) >= 1900 && Number(s) <= CURRENT_YEAR + 1),
    { message: 'yearFrom muss leer oder vierstellige Jahreszahl 1900..nächstes Jahr sein' },
  );

export const FilterCriteriaSchema = z
  .object({
    manufacturer: trimmed.default(''),
    priceMax: numericString.default(''),
    fuel: trimmed.default(''),
    maxMileage: numericString.default(''),
    yearFrom: yearString.default(''),
  })
  .strict();

export type FilterCriteria = z.infer<typeof FilterCriteriaSchema>;

export const EMPTY_CRITERIA: FilterCriteria = {
  manufacturer: '',
  priceMax: '',
  fuel: '',
  maxMileage: '',
  yearFrom: '',
};

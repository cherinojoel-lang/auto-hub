const onlyDigits = (raw: string): string => raw.replace(/\D/g, '');

export const parseMileageKm = (raw: string | null | undefined): number | null => {
  if (!raw) return null;
  const digits = onlyDigits(raw);
  if (digits === '') return null;
  return Number(digits);
};

export const parseYearFromRegistration = (raw: string | null | undefined): number | null => {
  if (!raw) return null;
  const slashMatch = raw.match(/(\d{4})/);
  if (!slashMatch) return null;
  const year = Number(slashMatch[1]);
  if (year < 1900 || year > new Date().getFullYear() + 1) return null;
  return year;
};

export const parsePriceValue = (raw: string | null | undefined): number | null => {
  if (!raw) return null;
  const cleaned = raw.replace(/[€\s]/g, '');
  const beforeDecimal = cleaned.split(',')[0] ?? '';
  const digits = onlyDigits(beforeDecimal);
  if (digits === '') return null;
  return Number(digits);
};

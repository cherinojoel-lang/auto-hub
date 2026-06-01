import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn', () => {
  it('merges standard classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('overrides classes using tailwind-merge', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('mt-2 text-red-500', 'mt-4 text-blue-500')).toBe('mt-4 text-blue-500');
    // Tailwind-specific behavior tests:
    // Conflicting text sizes
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
    // Conflicting flex directions
    expect(cn('flex-row', 'flex-col')).toBe('flex-col');
    // Margin resolution
    expect(cn('mx-2', 'mx-4')).toBe('mx-4');
    // Background color resolution
    expect(cn('bg-white', 'bg-black')).toBe('bg-black');
  });

  it('handles conditional classes via clsx', () => {
    expect(
      cn('font-bold', {
        'text-red-500': true,
        'text-blue-500': false,
        'bg-gray-100': true,
      })
    ).toBe('font-bold text-red-500 bg-gray-100');
  });

  it('handles arrays, falsy values, and mixed inputs', () => {
    expect(
      cn(
        ['flex', 'items-center'],
        null,
        undefined,
        false,
        '',
        'justify-between'
      )
    ).toBe('flex items-center justify-between');
  });

  it('handles deeply nested arrays and complex falsy conditions', () => {
    expect(
      cn(
        ['p-2', ['bg-white', ['text-black']]],
        false && 'hidden',
        0 && 'w-0', // Number 0 is falsy
        NaN && 'h-0', // NaN is falsy
        '' && 'm-0', // Empty string is falsy
        null,
        undefined,
        'flex'
      )
    ).toBe('p-2 bg-white text-black flex');
  });

  it('handles complex combinations', () => {
    expect(
      cn(
        'base-class',
        ['arr-1', 'arr-2'],
        { 'cond-true': true, 'cond-false': false },
        'p-4',
        'p-8 text-black',
        undefined
      )
    ).toBe('base-class arr-1 arr-2 cond-true p-8 text-black');
  });
});

import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility function', () => {
  it('should merge basic classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes', () => {
    expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
  });

  it('should handle array inputs', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });

  it('should ignore falsy values', () => {
    expect(cn('class1', undefined, null, false, '', 'class2')).toBe('class1 class2');
  });

  it('should merge tailwind classes properly', () => {
    expect(cn('p-2 p-4')).toBe('p-4');
    expect(cn('p-2', 'p-4')).toBe('p-4');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    expect(cn('bg-red-500 text-white', 'bg-blue-500')).toBe('text-white bg-blue-500');
  });

  it('should handle complex combinations', () => {
    expect(
      cn(
        'base-class',
        ['array-class'],
        { 'conditional-class': true, 'ignored-class': false },
        'p-2',
        'p-4 text-red-500'
      )
    ).toBe('base-class array-class conditional-class p-4 text-red-500');
  });
});

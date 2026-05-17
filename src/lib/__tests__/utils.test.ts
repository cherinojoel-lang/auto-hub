import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn utility', () => {
  it('merges simple class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional class names', () => {
    expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
  });

  it('resolves tailwind class conflicts', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('text-sm', 'text-lg')).toBe('text-lg');
  });

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('gracefully ignores falsy values', () => {
    expect(cn('class1', null, undefined, false, 0, '', 'class2')).toBe('class1 class2');
  });

  it('handles complex combinations', () => {
    expect(cn(
      'base-class',
      { 'active': true, 'disabled': false },
      ['array-1', 'array-2'],
      'bg-red-500',
      'bg-blue-500', // Should override bg-red-500
      null,
      undefined
    )).toBe('base-class active array-1 array-2 bg-blue-500');
  });
});

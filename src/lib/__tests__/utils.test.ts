import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('cn', () => {
  it('merges standard classes', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('overrides classes using tailwind-merge', () => {
    expect(cn('p-4', 'p-8')).toBe('p-8');
    expect(cn('mt-2 text-red-500', 'mt-4 text-blue-500')).toBe('mt-4 text-blue-500');
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

  it('handles empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null, undefined, false)).toBe('');
  });

  it('handles nested arrays', () => {
    expect(cn(['class-a', ['class-b', ['class-c']]])).toBe('class-a class-b class-c');
  });

  it('handles tailwind conflict resolution with specific properties', () => {
    // p-4 adds padding to all sides, px-2 overrides horizontal padding
    expect(cn('p-4', 'px-2')).toBe('p-4 px-2');
    // pb-4 overrides the bottom padding of py-2
    expect(cn('py-2', 'pb-4')).toBe('py-2 pb-4');
  });

  it('preserves custom non-tailwind classes alongside tailwind classes', () => {
    expect(cn('custom-class', 'text-red-500', 'my-custom-module_class')).toBe('custom-class text-red-500 my-custom-module_class');
  });

  it('handles object notation with complex logic', () => {
    expect(
      cn(
        'base-btn',
        {
          'bg-blue-500': true,
          'bg-gray-500': false,
          'text-white': 1 > 0,
        },
        ['hover:bg-blue-600', { 'cursor-not-allowed': false }]
      )
    ).toBe('base-btn bg-blue-500 text-white hover:bg-blue-600');
  });

});

import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn function', () => {
  it('merges basic string classes', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    expect(cn('class1', { class2: true, class3: false })).toBe('class1 class2')
  })

  it('handles arrays of classes', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2')
  })

  it('handles falsy values gracefully', () => {
    expect(cn('class1', null, undefined, false, 0, '')).toBe('class1')
  })

  it('merges tailwind classes using tailwind-merge', () => {
    // p-4 should override p-2
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })

  it('handles complex combinations of tailwind classes and conditionals', () => {
    expect(
      cn(
        'base-class',
        ['arr-class1', 'arr-class2'],
        { 'cond-class': true, 'bg-red-500': false },
        'bg-blue-500 bg-red-500', // Note bg-red-500 overrides bg-blue-500 in twMerge
        'text-center',
        null
      )
    ).toBe('base-class arr-class1 arr-class2 cond-class bg-red-500 text-center')
  })
})

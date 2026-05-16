import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges basic class names', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('handles conditional classes', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2')
  })

  it('resolves conflicting tailwind classes', () => {
    expect(cn('p-4 text-red-500', 'p-8')).toBe('text-red-500 p-8')
    expect(cn('bg-blue-500 hover:bg-blue-600', 'bg-red-500')).toBe('hover:bg-blue-600 bg-red-500')
  })

  it('handles objects and arrays', () => {
    expect(cn(['class1', 'class2'], { class3: true, class4: false })).toBe('class1 class2 class3')
  })

  it('ignores falsy values', () => {
    expect(cn('', null, undefined, 0, false, 'class1')).toBe('class1')
  })

  it('handles complex combinations', () => {
    expect(cn(
      'base-class',
      ['array-class1', 'array-class2'],
      { 'obj-class1': true, 'obj-class2': false },
      'p-4',
      'p-8',
      null,
      undefined
    )).toBe('base-class array-class1 array-class2 obj-class1 p-8')
  })
})

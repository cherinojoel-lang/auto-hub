import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AnimatedElement } from '../animated-element';

describe('AnimatedElement', () => {
  it('renders children and is immediately visible when priority is true', () => {
    render(
      <AnimatedElement priority={true} className="test-class">
        <span>Hero Title</span>
      </AnimatedElement>
    );

    const el = screen.getByText('Hero Title').parentElement;
    expect(el).toBeInTheDocument();
    // After LCP optimization, priority true completely bypasses transform classes
    // and returns the element with just its base className to prevent styling jumps
    expect(el?.className).toBe('test-class');
    expect(el?.className).not.toContain('opacity-0');
  });

  it('renders children with initial transform when priority is false', () => {
    render(
      <AnimatedElement direction="up" priority={false}>
        <span>Delayed Content</span>
      </AnimatedElement>
    );

    const el = screen.getByText('Delayed Content').parentElement;
    expect(el).toBeInTheDocument();
    expect(el?.className).toContain('opacity-0');
  });
});

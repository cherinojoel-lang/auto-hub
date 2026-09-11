import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AnimatedElement } from '../animated-element';

describe('AnimatedElement', () => {
  it('renders children and is immediately visible when priority is true', () => {
    render(
      <AnimatedElement priority={true}>
        <span>Hero Title</span>
      </AnimatedElement>
    );

    const el = screen.getByText('Hero Title').parentElement;
    expect(el).toBeInTheDocument();
    expect(el?.className).toContain('opacity-100');
    expect(el?.className).toContain('translate-x-0');
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

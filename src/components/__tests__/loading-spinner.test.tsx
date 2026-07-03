import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../ui/loading-spinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    const { container } = render(<LoadingSpinner />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('min-h-screen flex items-center justify-center');

    // Check for default spinner class
    const spinner = container.querySelector('.animate-spin');
    expect(spinner).toHaveClass('animate-spin rounded-full h-8 w-8 border-b-2 border-primary');
  });

  it('renders with a custom message', () => {
    render(<LoadingSpinner message="Please wait..." />);
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('applies custom className and spinnerClassName', () => {
    const { container } = render(
      <LoadingSpinner
        className="custom-container-class"
        spinnerClassName="custom-spinner-class"
      />
    );

    expect(container.firstChild).toHaveClass('custom-container-class');
    expect(container.firstChild).not.toHaveClass('min-h-screen flex items-center justify-center');

    const spinner = container.querySelector('.custom-spinner-class');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('custom-spinner-class');
    expect(spinner).not.toHaveClass('animate-spin rounded-full h-8 w-8 border-b-2 border-primary');
  });
});

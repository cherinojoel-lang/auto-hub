import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ContactSection from '../ContactSection';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('ContactSection Error Handling', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('handles form submission errors gracefully', async () => {
    // 1. Mock console.log to throw an error
    // The component uses `console.log('Form submitted:', formData)` inside `handleSubmit`.
    // By throwing an error here, we simulate a failure in the async operation (or any part of the try block)
    // without having to mess with timers or other global state.
    const mockError = new Error('Simulated submission error');
    vi.spyOn(console, 'log').mockImplementationOnce(() => {
      throw mockError;
    });

    render(<ContactSection />);

    // 2. Fill out the form fields with valid data
    const nameInput = screen.getByLabelText(/name \*/i);
    const emailInput = screen.getByLabelText(/e-mail \*/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    // 3. Submit the form
    const submitButton = screen.getByRole('button', { name: /anfrage senden/i });
    fireEvent.click(submitButton);

    // Verify it's submitting
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Wird gesendet...');

    // 4. Assert error handling
    await waitFor(() => {
      // The error should be caught and logged
      expect(console.error).toHaveBeenCalled();
    });

    // 5. Assert UI state recovery (finally block)
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Anfrage senden');
    });
  });
});

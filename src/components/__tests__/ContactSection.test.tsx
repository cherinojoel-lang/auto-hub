import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ContactSection from '../ContactSection';
import { vi } from 'vitest';

describe('ContactSection', () => {
  it('renders successfully', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { name: /Schnellanfrage/i })).toBeInTheDocument();
  });

  it('handles submission errors', async () => {
    render(<ContactSection />);

    const nameInput = screen.getByLabelText(/Name \*/i);
    const emailInput = screen.getByLabelText(/E-Mail \*/i);
    const submitButton = screen.getByRole('button', { name: /Anfrage senden/i });

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    const logSpy = vi.spyOn(console, 'log').mockImplementationOnce(() => {
      throw new Error('Submission failed');
    });

    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    fireEvent.click(submitButton);

    await waitFor(() => {
      const errorCall = errorSpy.mock.calls.find(call => String(call[0]).includes('Form submission error:'));
      expect(errorCall).toBeTruthy();
    });

    logSpy.mockRestore();
    errorSpy.mockRestore();
  });
});

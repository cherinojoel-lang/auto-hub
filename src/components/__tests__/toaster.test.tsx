import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toaster } from '../ui/toaster';
import { toast } from '@/hooks/use-toast';
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import * as React from 'react';

// Wrapper component to trigger toasts
function ToastTestComponent() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast({ title: 'Test Toast', description: 'This is a test toast' })}>
        Show Toast
      </button>
      <button onClick={() => toast({ title: 'Action Toast', action: <button>Action</button> })}>
        Show Action Toast
      </button>
      <button onClick={() => toast({ title: 'Destructive Toast', variant: 'destructive' })}>
        Show Destructive Toast
      </button>
    </div>
  );
}

describe('Toaster', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render toaster without toasts initially', () => {
    const { container } = render(<Toaster />);
    expect(container.querySelector('.fixed')).toBeInTheDocument(); // Viewport is rendered
    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();
  });

  it('should display a toast when triggered', async () => {
    const user = userEvent.setup();
    render(<ToastTestComponent />);

    // Trigger toast
    await user.click(screen.getByText('Show Toast'));

    // Check if toast title and description are displayed
    expect(await screen.findByText('Test Toast')).toBeInTheDocument();
    expect(screen.getByText('This is a test toast')).toBeInTheDocument();
  });

  it('should display an action within a toast', async () => {
    const user = userEvent.setup();
    render(<ToastTestComponent />);

    await user.click(screen.getByText('Show Action Toast'));

    expect(await screen.findByText('Action Toast')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument(); // The action button
  });

  it('should dismiss a toast after a while', async () => {
    vi.useFakeTimers();
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<ToastTestComponent />);

    await user.click(screen.getByText('Show Toast'));
    expect(await screen.findByText('Test Toast')).toBeInTheDocument();

    // Fast-forward timers to let the toast disappear
    act(() => {
      vi.runAllTimers();
    });

    expect(screen.queryByText('Test Toast')).not.toBeInTheDocument();

    vi.useRealTimers();
  });
});

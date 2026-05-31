import { describe, it, expect } from 'vitest';
import { reducer } from '../use-toast';

describe('use-toast reducer', () => {
  it('ADD_TOAST adds a toast and respects TOAST_LIMIT', () => {
    const initialState = { toasts: [] };
    const toast1 = { id: '1', title: 'Toast 1' };
    const toast2 = { id: '2', title: 'Toast 2' };

    // Assuming TOAST_LIMIT is 1 based on the implementation
    const state1 = reducer(initialState, { type: 'ADD_TOAST', toast: toast1 });
    expect(state1.toasts).toEqual([toast1]);

    const state2 = reducer(state1, { type: 'ADD_TOAST', toast: toast2 });
    expect(state2.toasts).toEqual([toast2]); // Since limit is 1, toast1 is removed
  });

  it('UPDATE_TOAST updates the matching toast', () => {
    const toast1 = { id: '1', title: 'Toast 1' };
    const toast2 = { id: '2', title: 'Toast 2' };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, {
      type: 'UPDATE_TOAST',
      toast: { id: '1', title: 'Updated Toast 1' }
    });

    expect(state.toasts).toEqual([
      { id: '1', title: 'Updated Toast 1' },
      toast2
    ]);
  });

  it('DISMISS_TOAST dismisses a specific toast', () => {
    const toast1 = { id: '1', title: 'Toast 1', open: true };
    const toast2 = { id: '2', title: 'Toast 2', open: true };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, { type: 'DISMISS_TOAST', toastId: '1' });

    expect(state.toasts).toEqual([
      { id: '1', title: 'Toast 1', open: false },
      { id: '2', title: 'Toast 2', open: true }
    ]);
  });

  it('DISMISS_TOAST dismisses all toasts if no toastId is provided', () => {
    const toast1 = { id: '1', title: 'Toast 1', open: true };
    const toast2 = { id: '2', title: 'Toast 2', open: true };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, { type: 'DISMISS_TOAST' });

    expect(state.toasts).toEqual([
      { id: '1', title: 'Toast 1', open: false },
      { id: '2', title: 'Toast 2', open: false }
    ]);
  });

  it('REMOVE_TOAST removes a specific toast', () => {
    const toast1 = { id: '1', title: 'Toast 1' };
    const toast2 = { id: '2', title: 'Toast 2' };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, { type: 'REMOVE_TOAST', toastId: '1' });

    expect(state.toasts).toEqual([toast2]);
  });

  it('REMOVE_TOAST removes all toasts if no toastId is provided', () => {
    const toast1 = { id: '1', title: 'Toast 1' };
    const toast2 = { id: '2', title: 'Toast 2' };
    const initialState = { toasts: [toast1, toast2] };

    const state = reducer(initialState, { type: 'REMOVE_TOAST' });

    expect(state.toasts).toEqual([]);
  });
});

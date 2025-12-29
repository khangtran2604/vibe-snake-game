import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { GameScreen } from '@/screens/GameScreen';
import { useSettingsStore } from '@/stores';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
}));

describe('GameScreen DPad Integration', () => {
  // Mock matchMedia to simulate mobile viewport
  const originalMatchMedia = window.matchMedia;
  
  beforeEach(() => {
    // Mock matchMedia to return matches: true for width < 1024px
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('max-width'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    // Clear storage and reset store BEFORE tests
    localStorage.clear();
    useSettingsStore.persist.clearStorage();
    // Reset to initial state
    useSettingsStore.setState({ showDPad: true });
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it('renders DPad controls when showDPad is true', () => {
    // Ensure showDPad is true (default)
    const { showDPad } = useSettingsStore.getState();
    expect(showDPad).toBe(true);

    render(<GameScreen />);

    // Check that D-pad buttons are present
    expect(screen.getByLabelText('Move up')).toBeInTheDocument();
    expect(screen.getByLabelText('Move down')).toBeInTheDocument();
    expect(screen.getByLabelText('Move left')).toBeInTheDocument();
    expect(screen.getByLabelText('Move right')).toBeInTheDocument();
  });

  it('does not render DPad controls when showDPad is false', () => {
    // Set showDPad to false
    useSettingsStore.getState().toggleDPad();
    expect(useSettingsStore.getState().showDPad).toBe(false);

    render(<GameScreen />);

    // Check that D-pad buttons are not present
    expect(screen.queryByLabelText('Move up')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Move down')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Move left')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Move right')).not.toBeInTheDocument();
  });

  it('DPad visibility toggles dynamically', async () => {
    const { rerender } = render(<GameScreen />);

    // Initially visible (showDPad is true by default)
    expect(screen.getByLabelText('Move up')).toBeInTheDocument();

    // Toggle off
    useSettingsStore.getState().toggleDPad();
    
    // Force re-render to reflect state change
    rerender(<GameScreen />);
    
    // Wait for the component to update
    await waitFor(() => {
      expect(screen.queryByLabelText('Move up')).not.toBeInTheDocument();
    });

    // Toggle back on
    useSettingsStore.getState().toggleDPad();
    rerender(<GameScreen />);
    
    // Should be visible again after second toggle
    await waitFor(() => {
      expect(screen.getByLabelText('Move up')).toBeInTheDocument();
    });
  });

  it('DPad has directional controls group when visible', () => {
    render(<GameScreen />);

    const controlsGroup = screen.queryByRole('group', { name: 'Directional controls' });
    expect(controlsGroup).toBeInTheDocument();
  });
});

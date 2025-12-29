import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModeSelector } from '@/components/ui/ModeSelector';
import { useSettingsStore } from '@/stores/settingsStore';

describe('ModeSelector', () => {
  beforeEach(() => {
    useSettingsStore.setState({ gameMode: 'classic' });
  });

  it('renders both mode buttons', () => {
    render(<ModeSelector />);
    expect(screen.getByText(/Classic/i)).toBeInTheDocument();
    expect(screen.getByText(/Speed/i)).toBeInTheDocument();
  });

  it('renders mode selection heading', () => {
    render(<ModeSelector />);
    expect(screen.getByText('Choose Your Mode')).toBeInTheDocument();
  });

  it('highlights classic mode by default', () => {
    render(<ModeSelector />);
    const classicButton = screen.getByLabelText('Classic mode');
    expect(classicButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('changes mode when clicking Speed button', async () => {
    const user = userEvent.setup();
    render(<ModeSelector />);
    const speedButton = screen.getByLabelText('Speed mode');
    
    await user.click(speedButton);
    
    expect(useSettingsStore.getState().gameMode).toBe('speed');
  });

  it('changes mode when clicking Classic button', async () => {
    const user = userEvent.setup();
    useSettingsStore.setState({ gameMode: 'speed' });
    render(<ModeSelector />);
    const classicButton = screen.getByLabelText('Classic mode');
    
    await user.click(classicButton);
    
    expect(useSettingsStore.getState().gameMode).toBe('classic');
  });

  it('updates visual highlight when mode changes', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ModeSelector />);
    const speedButton = screen.getByLabelText('Speed mode');
    
    await user.click(speedButton);
    rerender(<ModeSelector />);
    
    expect(speedButton).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Classic mode')).toHaveAttribute('aria-pressed', 'false');
  });

  it('is keyboard accessible', () => {
    render(<ModeSelector />);
    const classicButton = screen.getByLabelText('Classic mode');
    const speedButton = screen.getByLabelText('Speed mode');
    
    classicButton.focus();
    expect(document.activeElement).toBe(classicButton);
    
    speedButton.focus();
    expect(document.activeElement).toBe(speedButton);
  });
});

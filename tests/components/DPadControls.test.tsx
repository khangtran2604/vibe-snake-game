import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DPadControls } from '@/components/game/DPadControls';
import type { Direction } from '@/types';

describe('DPadControls', () => {
  const defaultProps = {
    onDirectionChange: vi.fn(),
    currentDirection: 'RIGHT' as Direction,
    isRunning: true,
    isVisible: true,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all four directional buttons', () => {
    render(<DPadControls {...defaultProps} />);
    
    expect(screen.getByLabelText('Move up')).toBeInTheDocument();
    expect(screen.getByLabelText('Move down')).toBeInTheDocument();
    expect(screen.getByLabelText('Move left')).toBeInTheDocument();
    expect(screen.getByLabelText('Move right')).toBeInTheDocument();
  });

  it('does not render when isVisible is false', () => {
    const { container } = render(
      <DPadControls {...defaultProps} isVisible={false} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('calls onDirectionChange with correct direction when button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <DPadControls {...defaultProps} onDirectionChange={handleChange} />
    );
    
    fireEvent.click(screen.getByLabelText('Move up'));
    expect(handleChange).toHaveBeenCalledWith('UP');
    
    handleChange.mockClear();
    fireEvent.click(screen.getByLabelText('Move down'));
    expect(handleChange).toHaveBeenCalledWith('DOWN');
  });

  it('disables all buttons when game is not running', () => {
    render(<DPadControls {...defaultProps} isRunning={false} />);
    
    expect(screen.getByLabelText('Move up')).toBeDisabled();
    expect(screen.getByLabelText('Move down')).toBeDisabled();
    expect(screen.getByLabelText('Move left')).toBeDisabled();
    expect(screen.getByLabelText('Move right')).toBeDisabled();
  });

  describe('opposite direction prevention', () => {
    it('disables left button when moving right', () => {
      render(
        <DPadControls {...defaultProps} currentDirection="RIGHT" />
      );
      
      expect(screen.getByLabelText('Move left')).toBeDisabled();
      expect(screen.getByLabelText('Move up')).not.toBeDisabled();
      expect(screen.getByLabelText('Move down')).not.toBeDisabled();
      expect(screen.getByLabelText('Move right')).not.toBeDisabled();
    });

    it('disables right button when moving left', () => {
      render(
        <DPadControls {...defaultProps} currentDirection="LEFT" />
      );
      
      expect(screen.getByLabelText('Move right')).toBeDisabled();
      expect(screen.getByLabelText('Move up')).not.toBeDisabled();
      expect(screen.getByLabelText('Move down')).not.toBeDisabled();
      expect(screen.getByLabelText('Move left')).not.toBeDisabled();
    });

    it('disables down button when moving up', () => {
      render(
        <DPadControls {...defaultProps} currentDirection="UP" />
      );
      
      expect(screen.getByLabelText('Move down')).toBeDisabled();
      expect(screen.getByLabelText('Move left')).not.toBeDisabled();
      expect(screen.getByLabelText('Move right')).not.toBeDisabled();
      expect(screen.getByLabelText('Move up')).not.toBeDisabled();
    });

    it('disables up button when moving down', () => {
      render(
        <DPadControls {...defaultProps} currentDirection="DOWN" />
      );
      
      expect(screen.getByLabelText('Move up')).toBeDisabled();
      expect(screen.getByLabelText('Move left')).not.toBeDisabled();
      expect(screen.getByLabelText('Move right')).not.toBeDisabled();
      expect(screen.getByLabelText('Move down')).not.toBeDisabled();
    });
  });

  it('has correct ARIA labels on all buttons', () => {
    render(<DPadControls {...defaultProps} />);
    
    const upButton = screen.getByLabelText('Move up');
    const downButton = screen.getByLabelText('Move down');
    const leftButton = screen.getByLabelText('Move left');
    const rightButton = screen.getByLabelText('Move right');
    
    expect(upButton).toHaveAttribute('aria-label', 'Move up');
    expect(downButton).toHaveAttribute('aria-label', 'Move down');
    expect(leftButton).toHaveAttribute('aria-label', 'Move left');
    expect(rightButton).toHaveAttribute('aria-label', 'Move right');
  });

  it('has role="group" on container with proper aria-label', () => {
    render(<DPadControls {...defaultProps} />);
    
    const container = screen.getByRole('group', { name: 'Directional controls' });
    expect(container).toBeInTheDocument();
  });

  it('has responsive visibility classes applied', () => {
    const { container } = render(<DPadControls {...defaultProps} />);
    
    const dpadContainer = container.querySelector('[role="group"]');
    expect(dpadContainer).toHaveClass('lg:hidden');
    expect(dpadContainer).toHaveClass('print:hidden');
  });

  it('does not call onDirectionChange when disabled button is clicked', () => {
    const handleChange = vi.fn();
    render(
      <DPadControls
        {...defaultProps}
        onDirectionChange={handleChange}
        currentDirection="RIGHT"
      />
    );
    
    // Try to click the disabled left button (opposite of right)
    const leftButton = screen.getByLabelText('Move left');
    fireEvent.click(leftButton);
    
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <DPadControls {...defaultProps} className="custom-test-class" />
    );
    
    const dpadContainer = container.querySelector('[role="group"]');
    expect(dpadContainer).toHaveClass('custom-test-class');
  });
});

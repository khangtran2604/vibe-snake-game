import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies secondary variant styles correctly', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('applies tertiary variant styles correctly', () => {
    render(<Button variant="tertiary">Tertiary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent');
  });

  it('applies size lg styles correctly', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    // Button uses responsive sizing: px-6 md:px-8, py-3 md:py-4, text-lg md:text-xl
    expect(button).toHaveClass('md:px-8', 'md:py-4', 'md:text-xl');
  });

  it('applies size md styles by default', () => {
    render(<Button>Medium</Button>);
    const button = screen.getByRole('button');
    // Button uses responsive sizing: px-4 md:px-6, py-2 md:py-3, text-base md:text-lg
    expect(button).toHaveClass('md:px-6', 'md:py-3', 'md:text-lg');
  });

  it('applies size sm styles correctly', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    // Button uses responsive sizing: px-3 md:px-4, py-1.5 md:py-2, text-sm md:text-base
    expect(button).toHaveClass('md:px-4', 'md:py-2', 'text-sm');
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Button ref={ref}>Button</Button>);
    expect(ref).toHaveBeenCalled();
  });

  it('merges custom className with default styles', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-primary');
  });

  it('is keyboard accessible with focus styles', () => {
    render(<Button>Press me</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none', 'focus:ring-2');
  });

  it('is disabled when disabled prop is passed', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MainMenu } from '@/screens/MainMenu';

const mockNavigate = vi.fn();
const mockStartGame = vi.fn();
const mockSetGameMode = vi.fn();

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock game store
vi.mock('@/stores', () => ({
  useGameStore: <T,>(selector: (state: { startGame: () => void }) => T) => {
    const state = {
      startGame: mockStartGame,
    };
    return selector ? selector(state) : state;
  },
  useSettingsStore: <T,>(selector?: (state: { gameMode: string; setGameMode: (mode: string) => void }) => T) => {
    const state = {
      gameMode: 'classic',
      setGameMode: mockSetGameMode,
    };
    return selector ? selector(state) : state;
  },
  GameMode: undefined,
}));

describe('MainMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays the game title', () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );
    expect(screen.getByText('Snake Game')).toBeInTheDocument();
  });

  it('displays the Play button', () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument();
  });

  it('calls startGame and navigates to /game when Play is clicked', () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );
    const playButton = screen.getByRole('button', { name: /play/i });
    fireEvent.click(playButton);
    
    expect(mockStartGame).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/game');
  });

  it('has keyboard accessible Play button', () => {
    render(
      <BrowserRouter>
        <MainMenu />
      </BrowserRouter>
    );
    const playButton = screen.getByRole('button', { name: /play/i });
    
    // Verify button can be focused
    playButton.focus();
    expect(playButton).toHaveFocus();
  });
});

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { shallow } from 'zustand/shallow';
import {
  GameBoard,
  Snake,
  Food,
  ScoreDisplay,
  GameOverScreen,
  DPadControls,
} from '@/components/game';
import { useGameLoop, useKeyboardControls, useTouchControls, useReducedMotion } from '@/hooks';
import { useGameStore, useSettingsStore } from '@/stores';
import { cn } from '@/utils/cn';
import {
  pageVariants,
  pageVariantsReduced,
  pageTransition,
  pageTransitionReduced,
} from '@/utils/animations';

export function GameScreen() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? pageVariantsReduced : pageVariants;
  const transition = prefersReducedMotion ? pageTransitionReduced : pageTransition;

  // PERFORMANCE: Use shallow comparison to prevent re-renders when object reference changes
  // but values are the same
  const {
    snake,
    food,
    direction,
    score,
    gameStatus,
    currentMode,
    speed,
    isNewHighScore,
    setDirection,
    tick,
    pauseGame,
    resumeGame,
    resetGame,
    endGame,
    startGame,
  } = useGameStore(
    (state) => ({
      snake: state.snake,
      food: state.food,
      direction: state.direction,
      score: state.score,
      gameStatus: state.gameStatus,
      currentMode: state.currentMode,
      speed: state.speed,
      isNewHighScore: state.isNewHighScore,
      setDirection: state.setDirection,
      tick: state.tick,
      pauseGame: state.pauseGame,
      resumeGame: state.resumeGame,
      resetGame: state.resetGame,
      endGame: state.endGame,
      startGame: state.startGame,
    }),
    shallow
  );

  // Get settings from settings store
  const showDPad = useSettingsStore((state) => state.showDPad);

  // UI-only local state for flash and shake animations
  const [isFlashing, setIsFlashing] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // Derive running state from gameStatus
  const isRunning = gameStatus === 'playing';

  // Handle collision and trigger game over
  const handleGameOver = useCallback(() => {
    // Trigger screen shake if not reduced motion
    if (!prefersReducedMotion) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    }

    // Trigger death flash
    setIsFlashing(true);

    // Clear flash after animation completes
    setTimeout(() => {
      setIsFlashing(false);
      endGame();
    }, 500);
  }, [endGame, prefersReducedMotion]);

  // Handle each game tick - uses store's tick action
  const handleTick = useCallback(() => {
    const { died } = tick();

    if (died) {
      handleGameOver();
    }
  }, [tick, handleGameOver]);

  // Use the game loop to update at fixed intervals
  useGameLoop({
    onTick: handleTick,
    interval: speed,
    isRunning: isRunning && !isFlashing,
  });

  // Use keyboard controls for snake direction
  useKeyboardControls({
    onDirectionChange: setDirection,
    isRunning,
  });

  // Use touch controls for snake direction
  useTouchControls({
    onDirectionChange: setDirection,
    isRunning,
  });

  // Toggle pause state or start game from idle
  const handleToggle = useCallback(() => {
    if (gameStatus === 'idle') {
      startGame();
    } else if (gameStatus === 'playing') {
      pauseGame();
    } else {
      resumeGame();
    }
  }, [gameStatus, startGame, pauseGame, resumeGame]);

  // Reset game to initial state
  const handlePlayAgain = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-6 lg:p-8 gap-2 md:gap-3 lg:gap-4"
    >
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">Snake Game</h1>
      <ScoreDisplay score={score} />
      <div className="relative w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-2 md:top-4 right-2 md:right-4 px-2 md:px-3 py-1 md:py-1.5 rounded-lg text-xs md:text-sm font-bold z-10"
          style={{
            backgroundColor: currentMode === 'classic' ? '#22c55e' : '#3b82f6',
            color: 'white',
          }}
        >
          {currentMode === 'classic' ? '🐢 Classic Mode' : '⚡ Speed Mode'}
        </motion.div>
        <div
          className={cn(
            'w-full max-w-[90vw] md:max-w-md lg:max-w-xl mx-auto',
            isFlashing && 'animate-death-flash',
            isShaking && !prefersReducedMotion && 'animate-screen-shake'
          )}
        >
          <GameBoard>
            <Snake segments={snake} />
            <Food position={food} />
          </GameBoard>
        </div>
        {gameStatus === 'gameOver' && (
          <GameOverScreen
            score={score}
            onPlayAgain={handlePlayAgain}
            isHighScore={isNewHighScore}
          />
        )}
      </div>
      {gameStatus !== 'gameOver' && (
        <button
          onClick={handleToggle}
          className="px-4 md:px-6 py-2 md:py-3 text-base md:text-lg bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          {gameStatus === 'idle' ? 'Start' : gameStatus === 'playing' ? 'Pause' : 'Resume'}
        </button>
      )}

      {/* On-screen D-pad controls for mobile/tablet */}
      <DPadControls
        onDirectionChange={setDirection}
        currentDirection={direction}
        isRunning={isRunning}
        isVisible={showDPad}
      />
    </motion.div>
  );
}

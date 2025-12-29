import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { Button, ModeSelector } from '@/components/ui';
import { useGameStore, useSettingsStore } from '@/stores';
import { useReducedMotion } from '@/hooks';
import {
  pageVariants,
  pageVariantsReduced,
  pageTransition,
  pageTransitionReduced,
} from '@/utils/animations';

export function MainMenu() {
  const navigate = useNavigate();
  const startGame = useGameStore((state) => state.startGame);
  const showDPad = useSettingsStore((state) => state.showDPad);
  const toggleDPad = useSettingsStore((state) => state.toggleDPad);
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? pageVariantsReduced : pageVariants;
  const transition = prefersReducedMotion ? pageTransitionReduced : pageTransition;

  const handlePlay = () => {
    startGame();
    navigate('/game');
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="min-h-screen flex flex-col items-center justify-center bg-background p-4 md:p-6 lg:p-8 gap-4 md:gap-6 lg:gap-8"
    >
      <motion.h1
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-game"
      >
        Snake Game
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ModeSelector />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Button size="lg" onClick={handlePlay}>
          Play
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="flex items-center gap-3 px-4 md:px-6 py-2 md:py-3 bg-surface/50 rounded-lg backdrop-blur-sm border border-white/10"
      >
        <label htmlFor="dpad-toggle" className="text-white text-sm md:text-base font-medium cursor-pointer">
          Show On-Screen D-Pad
        </label>
        <button
          id="dpad-toggle"
          type="button"
          role="switch"
          aria-checked={showDPad}
          aria-label="Toggle on-screen D-pad controls"
          onClick={toggleDPad}
          className={`
            relative inline-flex h-6 w-11 items-center rounded-full
            transition-colors duration-200 ease-in-out focus:outline-none
            focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-background
            ${showDPad ? 'bg-primary' : 'bg-gray-600'}
          `}
        >
          <span
            className={`
              inline-block h-4 w-4 transform rounded-full bg-white
              transition-transform duration-200 ease-in-out
              ${showDPad ? 'translate-x-6' : 'translate-x-1'}
            `}
          />
        </button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button variant="secondary" size="lg" onClick={() => navigate('/themes')}>
          <Palette className="mr-2" />
          Themes
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button variant="secondary" size="lg" onClick={() => navigate('/leaderboard')}>
          🏆 Leaderboard
        </Button>
      </motion.div>
    </motion.div>
  );
}

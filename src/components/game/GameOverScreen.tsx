import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { useReducedMotion } from '@/hooks';
import { gameOverVariants, gameOverVariantsReduced } from '@/utils/animations';

export interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
  isHighScore?: boolean;
}

/**
 * Overlay screen displayed when the game ends.
 * Shows the final score and options to restart or return to main menu.
 * Displays celebration animation when a new high score is achieved.
 * Features impact animation sequence with delay for death flash.
 */
export function GameOverScreen({
  score,
  onPlayAgain,
  isHighScore = false,
}: GameOverScreenProps) {
  const navigate = useNavigate();
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? gameOverVariantsReduced : gameOverVariants;

  const handleMainMenu = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn(
        'absolute inset-0 z-10',
        'flex flex-col items-center justify-center',
        'bg-black/80 backdrop-blur-sm',
        'rounded-lg'
      )}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-4 md:gap-6 p-4 md:p-8"
      >
        {/* HIGH SCORE CELEBRATION */}
        {isHighScore && (
          <motion.div
            initial={{ scale: 0, rotate: prefersReducedMotion ? 0 : -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.5,
              delay: 0.8,
              type: prefersReducedMotion ? 'tween' : 'spring',
              stiffness: 200,
            }}
            className="flex flex-col items-center gap-1 md:gap-2 mb-1 md:mb-2"
          >
            <div className="text-4xl md:text-5xl">🎉</div>
            <h3 className="text-xl md:text-2xl font-bold text-yellow-400 text-center">
              New High Score!
            </h3>
            <p className="text-xs md:text-sm text-yellow-300">
              You made the leaderboard! 🌟
            </p>
          </motion.div>
        )}

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-red-500">Game Over</h2>

        <div className="flex flex-col items-center gap-1 md:gap-2">
          <p className="text-base md:text-lg text-gray-400">Final Score</p>
          <p className="text-3xl md:text-4xl font-bold text-primary">{score}</p>
        </div>

        <div className="flex flex-col gap-2 md:gap-3 w-full mt-2 md:mt-4">
          <button
            onClick={onPlayAgain}
            className={cn(
              'px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-base md:text-lg',
              'bg-primary text-white',
              'hover:bg-primary-dark transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black'
            )}
          >
            Play Again
          </button>

          <button
            onClick={handleMainMenu}
            className={cn(
              'px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold text-base md:text-lg',
              'bg-transparent text-gray-300 border border-gray-600',
              'hover:bg-gray-800 hover:text-white transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black'
            )}
          >
            Main Menu
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

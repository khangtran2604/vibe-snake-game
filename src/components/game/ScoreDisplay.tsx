import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks';
import {
  scoreVariants,
  scoreVariantsReduced,
  floatingScoreVariants,
  floatingScoreVariantsReduced,
} from '@/utils/animations';

export interface ScoreDisplayProps {
  score: number;
}

/**
 * Displays the current score during gameplay with animated feedback.
 * Features:
 * - Pop animation when score increases
 * - Floating "+X" indicator showing points gained
 * - Respects reduced motion preferences
 */
export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const prefersReducedMotion = useReducedMotion();
  const [prevScore, setPrevScore] = useState(score);
  const [animationKey, setAnimationKey] = useState(0);
  const [showFloatingScore, setShowFloatingScore] = useState(false);
  const [scoreIncrease, setScoreIncrease] = useState(0);

  // Detect score changes and trigger animations
  useEffect(() => {
    if (score > prevScore) {
      const increase = score - prevScore;
      setScoreIncrease(increase);
      setShowFloatingScore(true);
      
      // Trigger pop animation by changing the key
      setAnimationKey((prev) => prev + 1);

      // Hide floating score after animation completes
      const timer = setTimeout(() => {
        setShowFloatingScore(false);
      }, 1000);

      setPrevScore(score);

      return () => clearTimeout(timer);
    } else if (score < prevScore) {
      // Score reset (new game)
      setPrevScore(score);
    }
  }, [score, prevScore]);

  const variants = prefersReducedMotion ? scoreVariantsReduced : scoreVariants;
  const floatingVariants = prefersReducedMotion
    ? floatingScoreVariantsReduced
    : floatingScoreVariants;

  return (
    <div className="text-center relative">
      <motion.span
        key={animationKey}
        variants={variants}
        initial="normal"
        animate={score > 0 && score !== prevScore ? 'pop' : 'normal'}
        className="text-xl md:text-2xl lg:text-3xl font-bold text-primary"
      >
        Score: {score}
      </motion.span>

      {/* Floating score indicator */}
      <AnimatePresence>
        {showFloatingScore && !prefersReducedMotion && (
          <motion.div
            variants={floatingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute left-1/2 -translate-x-1/2 top-0 text-lg md:text-xl lg:text-2xl font-bold text-yellow-400 pointer-events-none"
            style={{ textShadow: '0 0 10px rgba(250, 204, 21, 0.5)' }}
          >
            +{scoreIncrease}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

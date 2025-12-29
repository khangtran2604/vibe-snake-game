import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { useLeaderboardStore, useGameStore } from '@/stores';
import { Button } from '@/components/ui';
import { useReducedMotion } from '@/hooks';
import {
  pageVariants,
  pageVariantsReduced,
  pageTransition,
  pageTransitionReduced,
} from '@/utils/animations';
import type { HighScoreEntry } from '@/types';

/**
 * Formats a date string from YYYY-MM-DD to a more readable format
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Individual score entry component with rank, medal, score, mode, and date
 */
interface ScoreEntryProps {
  entry: HighScoreEntry;
  rank: number;
  prefersReducedMotion: boolean;
}

function ScoreEntry({ entry, rank, prefersReducedMotion }: ScoreEntryProps) {
  const getMedalIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="text-yellow-500" size={24} />;
    if (rank === 2) return <Medal className="text-gray-400" size={24} />;
    if (rank === 3) return <Award className="text-orange-600" size={24} />;
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : rank * 0.05 }}
      className="bg-surface rounded-xl p-3 md:p-4 flex items-center gap-2 md:gap-4"
    >
      <div className="flex items-center gap-1 md:gap-2 min-w-[50px] md:min-w-[60px]">
        {getMedalIcon(rank)}
        <span className="text-lg md:text-2xl font-bold text-primary">#{rank}</span>
      </div>

      <div className="flex-1">
        <div className="text-2xl md:text-3xl font-bold text-text-primary">{entry.score}</div>
      </div>

      <div className="flex flex-col items-end gap-1">
        <span
          className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-semibold ${
            entry.mode === 'classic'
              ? 'bg-green-500 text-white'
              : 'bg-blue-500 text-white'
          }`}
        >
          {entry.mode.charAt(0).toUpperCase() + entry.mode.slice(1)}
        </span>
        <span className="text-xs md:text-sm text-text-secondary">
          {formatDate(entry.date)}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Leaderboard screen displaying the top 10 high scores
 * Shows empty state when no scores exist
 */
export function LeaderboardScreen() {
  const scores = useLeaderboardStore((state) => state.getTopScores());
  const navigate = useNavigate();
  const startGame = useGameStore((state) => state.startGame);
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? pageVariantsReduced : pageVariants;
  const transition = prefersReducedMotion ? pageTransitionReduced : pageTransition;

  const handleBack = () => {
    navigate('/');
  };

  const handlePlayNow = () => {
    startGame();
    navigate('/game');
  };

  // Empty state when no scores exist
  if (scores.length === 0) {
    return (
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="min-h-screen flex flex-col items-center justify-center bg-background p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-4 md:gap-6 text-center"
        >
          <Trophy size={60} className="text-primary md:w-20 md:h-20" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary font-game">
            No High Scores Yet!
          </h1>
          <p className="text-base md:text-lg text-text-secondary">
            Start playing to become the champion!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 md:mt-4">
            <Button onClick={handlePlayNow}>Play Now</Button>
            <Button variant="secondary" onClick={handleBack}>
              Back to Menu
            </Button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Leaderboard content with scores
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="min-h-screen flex flex-col items-center bg-background p-4 md:p-6 lg:p-8 py-6 md:py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary text-center mb-6 md:mb-8 font-game">
          🏆 Leaderboard
        </h1>

        <div className="max-h-[70vh] overflow-y-auto space-y-2 md:space-y-3">
          {scores.map((entry, index) => (
            <ScoreEntry
              key={`${entry.score}-${entry.date}-${index}`}
              entry={entry}
              rank={index + 1}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <div className="mt-6 md:mt-8 text-center">
          <Button variant="secondary" onClick={handleBack}>
            Back to Menu
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

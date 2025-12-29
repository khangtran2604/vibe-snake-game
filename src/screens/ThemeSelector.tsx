import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowLeft } from 'lucide-react';
import { useSettingsStore } from '@/stores';
import { themes, type Theme, type ThemeId } from '@/themes';
import { Button } from '@/components/ui';
import { useReducedMotion } from '@/hooks';
import {
  pageVariants,
  pageVariantsReduced,
  pageTransition,
  pageTransitionReduced,
} from '@/utils/animations';
import { cn } from '@/utils/cn';
import { applyTheme } from '@/utils/theme';
import { getTheme } from '@/themes';

/**
 * Theme Card Component Props
 */
interface ThemeCardProps {
  theme: Theme;
  isSelected: boolean;
  onSelect: () => void;
  prefersReducedMotion: boolean;
}

/**
 * Theme Card Component
 * Displays a theme preview with emoji, name, and color swatches
 */
function ThemeCard({ theme, isSelected, onSelect, prefersReducedMotion }: ThemeCardProps) {
  return (
    <motion.button
      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      onClick={onSelect}
      className={cn(
        'relative p-4 md:p-6 rounded-2xl border-4 transition-all focus:outline-none focus:ring-4 focus:ring-primary/50',
        isSelected
          ? 'border-primary shadow-xl bg-surface'
          : 'border-transparent hover:border-surface bg-surface/50'
      )}
      aria-label={`Select ${theme.name} theme`}
      aria-current={isSelected ? 'true' : undefined}
    >
      {/* Selected indicator */}
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          className="absolute top-2 right-2 bg-primary text-white rounded-full p-1"
        >
          <Check className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      )}

      {/* Theme emoji */}
      <div className="text-4xl md:text-5xl lg:text-6xl mb-2 md:mb-3 select-none" aria-hidden="true">
        {theme.emoji}
      </div>

      {/* Theme name */}
      <h3 className="text-base md:text-lg font-bold text-text mb-3 md:mb-4">{theme.name}</h3>

      {/* Color swatches */}
      <div className="flex gap-1.5 md:gap-2 justify-center" aria-label="Color preview">
        <div
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-text/20"
          style={{ backgroundColor: theme.colors.primary }}
          title="Primary color"
        />
        <div
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-text/20"
          style={{ backgroundColor: theme.colors.snake }}
          title="Snake color"
        />
        <div
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-text/20"
          style={{ backgroundColor: theme.colors.food }}
          title="Food color"
        />
        <div
          className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-text/20"
          style={{ backgroundColor: theme.colors.background }}
          title="Background color"
        />
      </div>
    </motion.button>
  );
}

/**
 * Theme Selector Screen
 * Displays all available themes in a responsive grid
 * Allows users to preview and select themes with immediate application
 */
export function ThemeSelector() {
  const navigate = useNavigate();
  const { currentTheme, setTheme } = useSettingsStore();
  const prefersReducedMotion = useReducedMotion();

  const variants = prefersReducedMotion ? pageVariantsReduced : pageVariants;
  const transition = prefersReducedMotion ? pageTransitionReduced : pageTransition;

  // Apply current theme on component mount
  useEffect(() => {
    const theme = getTheme(currentTheme);
    if (theme) {
      applyTheme(theme);
    }
  }, [currentTheme]);

  // Handle theme selection
  const handleThemeSelect = (themeId: ThemeId) => {
    setTheme(themeId); // Updates store and auto-persists to localStorage
    // Note: setTheme already calls applyTheme internally in the store
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/');
  };

  // Animation variants for staggered card entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className="min-h-screen bg-background p-4 md:p-6 lg:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text mb-2 font-game">
            Choose Your Theme
          </h1>
          <p className="text-text-secondary text-base md:text-lg">
            Pick your favorite look and feel
          </p>
        </motion.div>

        {/* Theme Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8"
        >
          {Object.values(themes)
            .filter((theme) => theme.id !== 'default') // Filter out duplicate default theme
            .map((theme) => (
              <motion.div key={theme.id} variants={itemVariants}>
                <ThemeCard
                  theme={theme}
                  isSelected={theme.id === currentTheme}
                  onSelect={() => handleThemeSelect(theme.id)}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </motion.div>
            ))}
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: prefersReducedMotion ? 0 : 0.5 }}
        >
          <Button variant="secondary" onClick={handleBack} className="gap-2">
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

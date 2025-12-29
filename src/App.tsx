import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { MainMenu, GameScreen, LeaderboardScreen, ThemeSelector } from '@/screens';
import { useSettingsStore } from '@/stores';
import { applyTheme } from '@/utils/theme';
import { getTheme } from '@/themes';

/**
 * AnimatedRoutes component with AnimatePresence for smooth transitions.
 * Uses location key to trigger exit animations when navigating.
 */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainMenu />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/leaderboard" element={<LeaderboardScreen />} />
        <Route path="/themes" element={<ThemeSelector />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  // Apply persisted theme on mount
  useEffect(() => {
    const currentThemeId = useSettingsStore.getState().currentTheme;
    const theme = getTheme(currentThemeId);
    if (theme) {
      applyTheme(theme);
    }
  }, []);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;

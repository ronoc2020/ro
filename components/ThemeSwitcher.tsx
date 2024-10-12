'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handler for toggling the theme
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  // Prevent rendering until mounted
  if (!mounted) {
    return null; // Prevents hydration issues
  }

  return (
    <button
      onClick={handleThemeToggle}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleThemeToggle();
        }
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-all duration-300 transform hover:scale-110 lightsaber-button"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-500 transition-transform duration-300 transform" style={{ transform: theme === 'dark' ? 'rotate(180deg)' : 'none' }} />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-800 transition-transform duration-300 transform" style={{ transform: theme === 'light' ? 'rotate(180deg)' : 'none' }} />
      )}
    </button>
  );
};

export default ThemeSwitcher;

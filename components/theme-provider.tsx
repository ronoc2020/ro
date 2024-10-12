'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

interface CustomThemeProviderProps extends ThemeProviderProps {
  defaultTheme?: 'light' | 'dark'; // Optional prop for default theme
}

export function ThemeProvider({ children, defaultTheme = "light", ...props }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider 
      defaultTheme={defaultTheme} 
      storageKey="myAppTheme" 
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

// Theme toggle component (optional)
const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button 
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className="p-2 bg-gray-800 text-white rounded focus:outline-none"
    >
      {theme === 'light' ? '🌙' : '☀️'} {/* Emoji for visual indication */}
    </button>
  );
};

// Usage example in your app
const App = () => {
  return (
    <ThemeProvider>
      <ThemeToggle />
      {/* Other components */}
    </ThemeProvider>
  );
};

export default App;

import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from '@phosphor-icons/react';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </Button>
  );
}

export default ThemeToggle;
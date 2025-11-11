'use client';
import { cn } from '@/src/lib/utils';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
const themes = [
  {
    key: 'system',
    icon: Monitor,
    label: 'System theme',
  },
  {
    key: 'light',
    icon: Sun,
    label: 'Light theme',
  },
  {
    key: 'dark',
    icon: Moon,
    label: 'Dark theme',
  },
];
export type ThemeSwitcherProps = {
  value?: 'light' | 'dark' | 'system';
  onChange?: (theme: 'light' | 'dark' | 'system') => void;
  defaultValue?: 'light' | 'dark' | 'system';
  className?: string;
};
export const ThemeSwitcher = ({
  value,
  onChange,
  defaultValue = 'system',
  className,
}: ThemeSwitcherProps) => {
  const STORAGE_KEY = 'theme';
  const [theme, setTheme] = useControllableState({
    defaultProp: defaultValue,
    prop: value,
    onChange,
  });
  const [mounted, setMounted] = useState(false);
  
  // Initialize from localStorage (only when uncontrolled)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (value === undefined) {
      const saved = localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | 'system' | null;
      if (saved === 'light' || saved === 'dark' || saved === 'system') {
        setTheme(saved);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme to :root and keep in sync with system preference when theme === 'system'
  useEffect(() => {
    if (!mounted) return;
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const applyMode = (mode: 'light' | 'dark') => {
      // Tailwind dark mode uses the 'dark' class
      root.classList.remove('light', 'dark');
      if (mode === 'dark') root.classList.add('dark');
      // Also expose an attribute and color-scheme for CSS
      root.setAttribute('data-theme', mode);
      root.style.colorScheme = mode;
    };

    const resolved: 'light' | 'dark' = theme === 'system' ? (mq.matches ? 'dark' : 'light') : theme;
    applyMode(resolved);

    // Persist preference
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}

    // React to OS changes when in 'system'
    if (theme === 'system') {
      const handler = (e: MediaQueryListEvent) => applyMode(e.matches ? 'dark' : 'light');
      mq.addEventListener?.('change', handler);
      return () => mq.removeEventListener?.('change', handler);
    }
  }, [theme, mounted]);
  const handleThemeClick = useCallback(
    (themeKey: 'light' | 'dark' | 'system') => {
      setTheme(themeKey);
    },
    [setTheme]
  );
  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <div
      className={cn(
        'relative isolate flex h-8 rounded-full bg-background p-1 ring-1 ring-border',
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = theme === key;
        return (
          <button
            aria-label={label}
            className="relative h-6 w-6 rounded-full"
            key={key}
            onClick={() => handleThemeClick(key as 'light' | 'dark' | 'system')}
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-primary"
                layoutId="activeTheme"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              className={cn(
                'relative z-10 m-auto h-4 w-4',
                isActive ? 'text-primary-foreground' : 'text-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
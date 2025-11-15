'use client';

import { cn } from '@/src/lib/utils';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const themes = [
  { key: 'system', icon: Monitor, label: 'System theme' },
  { key: 'light', icon: Sun, label: 'Light theme' },
  { key: 'dark', icon: Moon, label: 'Dark theme' },
];

export const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatches
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
            key={key}
            type="button"
            aria-label={label}
            onClick={() => setTheme(key)}
            className="relative h-6 w-6 rounded-full"
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

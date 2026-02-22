import { Settings, Sun, Moon, Eye, EyeOff, Check, ChevronRight } from 'lucide-react';

export const icons = {
  settings: Settings,
  sun: Sun,
  moon: Moon,
  eye: Eye,
  eyeOff: EyeOff,
  check: Check,
  chevronRight: ChevronRight,
} as const;

export type IconName = keyof typeof icons;

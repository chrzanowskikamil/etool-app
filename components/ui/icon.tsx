import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { IconName, icons } from './icons';

export interface IconProps extends Omit<React.ComponentPropsWithoutRef<LucideIcon>, 'icon'> {
  icon: IconName;
  size?: number;
  className?: string;
}

export function Icon({ icon, size = 24, className, ...props }: IconProps) {
  const IconComponent = icons[icon];
  
  return (
    <IconComponent
      size={size}
      className={cn('text-foreground', className)}
      {...props}
    />
  );
} 
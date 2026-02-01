import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300',
        // Variants
        variant === 'primary' &&
          'bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-600 hover:to-violet-600 hover:shadow-lg hover:shadow-indigo-500/25',
        variant === 'secondary' &&
          'border border-white/10 bg-white/5 text-white hover:bg-white/10',
        variant === 'ghost' &&
          'text-slate-300 hover:bg-white/5 hover:text-white',
        // Sizes
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5',
        size === 'lg' && 'px-8 py-3 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

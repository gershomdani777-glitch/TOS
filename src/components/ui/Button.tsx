import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
        const variants = {
            primary: 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:brightness-110 border-0',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm border-0',
            outline: 'border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/50 text-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground border-0',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20 border-0',
        };

        const sizes = {
            sm: 'h-9 px-4 text-xs rounded-lg',
            md: 'h-11 px-6 py-2 rounded-xl',
            lg: 'h-14 px-8 rounded-2xl text-lg',
        };

        return (
            <motion.button
                ref={ref as any}
                disabled={disabled || isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                className={cn(
                    'inline-flex items-center justify-center font-bold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:grayscale',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...(props as any)}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export { Button };

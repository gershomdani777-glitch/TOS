import { cn } from '../../lib/utils';

interface RiskBadgeProps {
    level: 'Low' | 'Moderate' | 'High';
    className?: string;
}

export function RiskBadge({ level, className }: RiskBadgeProps) {
    const colors = {
        Low: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
        Moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
        High: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
    };

    return (
        <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2', colors[level], className)}>
            {level} Risk
        </span>
    );
}

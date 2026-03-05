import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface RiskMeterProps {
    score: number; // 1-10
    className?: string;
}

export function RiskMeter({ score, className }: RiskMeterProps) {
    // 1-3: Low (Green), 4-6: Moderate (Yellow), 7-10: High (Red)
    const getColor = (s: number) => {
        if (s <= 3) return 'text-green-500';
        if (s <= 6) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getBarColor = (s: number) => {
        if (s <= 3) return 'stroke-green-500';
        if (s <= 6) return 'stroke-yellow-500';
        return 'stroke-red-500';
    }

    // Need to map tailwind color classes to actual stroke colors if I wasn't using classes, but I can use classes on SVG elements.

    return (
        <div className={cn("flex flex-col items-center justify-center p-4", className)}>
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                    <circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-muted/20"
                    />
                    {/* Meter Circle */}
                    <motion.circle
                        cx="64"
                        cy="64"
                        r="58"
                        fill="transparent"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className={cn(getBarColor(score))}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: score / 10 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className={cn("text-6xl font-bold", getColor(score))}>{score}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Risk</span>
                </div>
            </div>
        </div>
    );
}

import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { ShieldCheck } from 'lucide-react';

export function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                    <span>ToS Illuminator</span>
                </Link>
                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <Link to="/" className="transition-colors hover:text-primary text-muted-foreground">Home</Link>
                    <a href="/#how-it-works" className="transition-colors hover:text-primary text-muted-foreground">How it Works</a>
                    <a href="/#features" className="transition-colors hover:text-primary text-muted-foreground">Features</a>
                </div>
                <div className="flex items-center gap-4">
                    <Link to="/scan">
                        <Button size="sm">Scan My Terms</Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

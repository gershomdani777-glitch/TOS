import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="border-t bg-muted/30">
            <div className="container max-w-7xl mx-auto px-4 py-12 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                            <span>ToS Illuminator</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Empowering consumers to understand what they are agreeing to. AI-powered transparency for the digital age.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link to="/scan" className="hover:text-foreground">Scanner</Link></li>
                            <li><a href="/#how-it-works" className="hover:text-foreground">How it Works</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-foreground">Disclaimer</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-4">Connect</h4>
                        <p className="text-sm text-muted-foreground">
                            Built for consumer rights.
                        </p>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t text-center md:flex md:justify-between text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} ToS Illuminator. All rights reserved.</p>
                    <p>This tool does not provide legal advice.</p>
                </div>
            </div>
        </footer>
    );
}

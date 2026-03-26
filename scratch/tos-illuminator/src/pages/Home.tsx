import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { ShieldAlert, FileText, CheckCircle, ArrowRight, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

export function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-6 lg:py-32 overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
                <div className="container max-w-6xl mx-auto flex flex-col items-center text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            AI-Powered Legal Transparency
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Understand What You’re <br className="hidden sm:inline" />
                            <span className="text-primary">Really Agreeing To</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                            Nobody reads the fine print. We do it for you. Scan Terms of Service agreements to instantly spot dangerous clauses, privacy risks, and unfair terms.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                    >
                        <Link to="/scan">
                            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base gap-2">
                                Scan My Terms Now <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
                            View Sample Report
                        </Button>
                    </motion.div>

                    <motion.div
                        id="features"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full max-w-5xl mt-16 rounded-xl border bg-card shadow-2xl overflow-hidden"
                    >
                        <div className="bg-muted/50 p-2 border-b flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                        </div>
                        <div className="p-8 grid md:grid-cols-2 gap-8 text-left">
                            <div className="space-y-4">
                                <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Original Text</h3>
                                <div className="p-4 rounded bg-muted/30 font-mono text-xs md:text-sm text-foreground/70 leading-relaxed border-l-4 border-red-500">
                                    "By uploading Content to the Service, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display such Content relating to the Service."
                                </div>
                                <div className="p-4 rounded bg-muted/30 font-mono text-xs md:text-sm text-foreground/70 leading-relaxed border-l-4 border-yellow-500">
                                    "We reserve the right to terminate your account at any time for any reason without notice."
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="font-semibold text-muted-foreground uppercase tracking-wider text-xs">Analysis</h3>
                                <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10">
                                    <CardHeader className="p-4 pb-2">
                                        <CardTitle className="text-red-700 dark:text-red-400 text-sm flex items-center gap-2">
                                            <ShieldAlert className="h-4 w-4" /> Intellectual Property Grab
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-2 text-sm text-muted-foreground">
                                        They can use your photos and content in ads without paying you.
                                    </CardContent>
                                </Card>
                                <Card className="border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10">
                                    <CardHeader className="p-4 pb-2">
                                        <CardTitle className="text-yellow-700 dark:text-yellow-400 text-sm flex items-center gap-2">
                                            <Lock className="h-4 w-4" /> Account Termination
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-2 text-sm text-muted-foreground">
                                        You can be banned instantly with no warning.
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features / How it works */}
            <section id="how-it-works" className="py-20 bg-muted/30">
                <div className="container max-w-6xl mx-auto px-4 md:px-6">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-bold tracking-tight">How ToS Illuminator Works</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">Complex legalese turned into simple, actionable insights in seconds.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center space-y-4 p-6">
                            <div className="p-4 rounded-full bg-primary/10 text-primary">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">1. Upload or Paste</h3>
                            <p className="text-muted-foreground">Copy the Terms of Service text or upload the pdf/doc file you want to check.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 p-6">
                            <div className="p-4 rounded-full bg-primary/10 text-primary">
                                <ShieldAlert className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">2. AI Scan</h3>
                            <p className="text-muted-foreground">Our intelligent system scans for 50+ types of risky clauses, from data selling to forced arbitration.</p>
                        </div>
                        <div className="flex flex-col items-center text-center space-y-4 p-6">
                            <div className="p-4 rounded-full bg-primary/10 text-primary">
                                <CheckCircle className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold">3. Get Clarity</h3>
                            <p className="text-muted-foreground">See a color-coded report with a privacy score and plain-English translations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="container max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold tracking-tight mb-6">Ready to reclaim your digital rights?</h2>
                    <p className="text-xl text-muted-foreground mb-10">Stop agreeing blindly. Start understanding today.</p>
                    <Link to="/scan">
                        <Button size="lg" className="h-14 px-10 text-lg">Scan a Document</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

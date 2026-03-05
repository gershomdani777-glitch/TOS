†<import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { RiskMeter } from '../components/ui/RiskMeter';
import { RiskBadge } from '../components/ui/RiskBadge';
import { mockAnalyze, type AnalysisResult } from '../lib/mockAnalysis';
import { Loader2, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export function Results() {
    const location = useLocation();
    const navigate = useNavigate();
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const text = location.state?.text;
        if (!text) {
            navigate('/scan');
            return;
        }

        const analyze = async () => {
            setLoading(true);
            const data = await mockAnalyze(text);
            setResult(data);
            setLoading(false);
        };

        analyze();
    }, [location.state, navigate]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-medium animate-pulse">Analyzing legal jargon...</p>
                <p className="text-sm text-muted-foreground">Checking for privacy risks, arbitration clauses, and more.</p>
            </div>
        );
    }

    if (!result) return null;

    return (
        <div className="container max-w-6xl mx-auto py-8 px-4 md:px-6">
            <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate('/scan')}>
                <ArrowLeft className="h-4 w-4" /> Scan Another
            </Button>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Sidebar / Score */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-1 space-y-6"
                >
                    <Card className="sticky top-24 shadow-lg border-2 border-muted/50">
                        <CardHeader className="text-center pb-2">
                            <CardTitle>Risk Score</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center">
                            <RiskMeter score={result.score} />
                            <div className="text-center mt-4 p-4 bg-muted/30 rounded-lg">
                                <h3 className="font-bold mb-2 flex items-center justify-center gap-2">
                                    <RiskBadge level={result.riskLevel} /> Risk Detected
                                </h3>
                                <p className="text-sm text-muted-foreground">{result.summary}</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Main Content / Clauses */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-2 space-y-6"
                >
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold">Flagged Clauses ({result.clauses.length})</h2>
                        <Button variant="outline" size="sm" onClick={() => window.print()}>Export Report</Button>
                    </div>

                    <div className="space-y-4">
                        {result.clauses.map((clause, index) => (
                            <motion.div
                                key={clause.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md border-l-4 ${clause.riskLevel === 'High' ? 'border-l-red-500 border-red-200' :
                                        clause.riskLevel === 'Moderate' ? 'border-l-yellow-500 border-yellow-200' :
                                            'border-l-green-500 border-green-200'
                                    }`}>
                                    <CardHeader className="bg-muted/10 pb-3">
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex items-center gap-2">
                                                <AlertCircle className={`h-5 w-5 ${clause.riskLevel === 'High' ? 'text-red-500' :
                                                    clause.riskLevel === 'Moderate' ? 'text-yellow-500' : 'text-green-500'
                                                    }`} />
                                                <CardTitle className="text-base">{clause.category}</CardTitle>
                                            </div>
                                            <RiskBadge level={clause.riskLevel} />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="grid md:grid-cols-2 gap-6 p-6">
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Original Text</h4>
                                            <p className="text-sm font-mono bg-muted/30 p-3 rounded text-foreground/80 leading-relaxed border border-border/50">
                                                "{clause.originalText}"
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <h4 className="text-xs font-bold uppercase text-primary tracking-wider flex items-center gap-2">
                                                Translation <RefreshCw className="h-3 w-3" />
                                            </h4>
                                            <div className="bg-primary/5 p-3 rounded border border-primary/10">
                                                <p className="text-sm font-medium text-foreground">
                                                    {clause.simplifiedText}
                                                </p>
                                                <p className="text-xs text-muted-foreground mt-2 pt-2 border-t border-primary/10">
                                                    <span className="font-semibold">Why it matters:</span> {clause.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
†<2$file:///c:/website/pages/Results.tsx
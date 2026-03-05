import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { UploadCloud, FileText, Loader2, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple Textarea component since we didn't create it in UI folder yet
const SimpleTextarea = ({ className, ...props }: any) => (
    <textarea
        className={`flex min-h-[300px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
    />
);

export function Scanner() {
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleScan = async () => {
        if (!text.trim()) return;
        setIsLoading(true);
        // Simulate processing time here or in Results
        // We pass the text to results page which will trigger the "analysis"
        setTimeout(() => {
            setIsLoading(false);
            navigate('/results', { state: { text } });
        }, 500);
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Simulate reading file
            setText("Simulated file content from " + file.name + "...\n(In a real app, we would parse the PDF/Doc here)...\n\n" +
                "Here are some simulated risky terms for demonstration:\n" +
                "1. We may sell your personal data.\n" +
                "2. Binding arbitration is required.\n" +
                "3. You grant us a worldwide license to your content.");
        }
    }

    return (
        <div className="container max-w-4xl mx-auto py-12 px-4 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight">Scan Your Agreements</h1>
                    <p className="text-muted-foreground">Paste the Terms of Service below or upload a document to detect traps.</p>
                </div>

                <Card className="border-2 border-muted/40 shadow-lg">
                    <CardHeader>
                        <CardTitle>Input Text</CardTitle>
                        <CardDescription>Supported formats: Text, PDF, DOCX</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <SimpleTextarea
                            placeholder="Paste legal text here..."
                            value={text}
                            onChange={(e: any) => setText(e.target.value)}
                        />

                        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                            <div>
                                <input
                                    type="file"
                                    id="file-upload"
                                    className="hidden"
                                    accept=".txt,.pdf,.doc,.docx"
                                    onChange={handleFileUpload}
                                />
                                <Button variant="outline" className="cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                                    <UploadCloud className="mr-2 h-4 w-4" /> Upload Document
                                </Button>
                            </div>
                            <Button
                                size="lg"
                                onClick={handleScan}
                                disabled={!text.trim() || isLoading}
                                className="w-full sm:w-auto min-w-[150px]"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
                                    </>
                                ) : (
                                    <>
                                        <FileText className="mr-2 h-4 w-4" /> Scan Text
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-400">
                    <AlertTriangle className="h-5 w-5 shrink-0" />
                    <p>
                        <strong>Disclaimer:</strong> This tool uses AI to analyze text and provides informational insights only. It does not constitute legal advice. Always consult a qualified attorney for legal matters.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

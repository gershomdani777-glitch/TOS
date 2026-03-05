import { mockAnalyze } from './src/lib/mockAnalysis.ts';
import * as fs from 'fs';

const testCases = [
    // Previous High Risk (Should still be High)
    "We sell your data to third parties.",
    "You agree to mandatory arbitration.",
    "We collect your social security number.",

    // New "Bad" terms that might be Low/Moderate currently
    "We reserve the right to modify these terms at any time without notice.", // Unilateral modification
    "You waive your right to a trial by jury.", // Jury waiver (should catch, but checking)
    "We obtain rights to all your content forever.", // IP rights partial match?
    "You agree to indemnify us for everything.", // Indemnification
    "We are not liable for any damages regardless of cause.", // Liability cap
    "This subscription automatically renews every month.", // Auto-renewal
    "You waive all moral rights to your content.", // Moral rights
    "We share your info with our marketing partners.", // Third-party sharing
    "We collect your biometric data for security.", // Biometrics
];

async function run() {
    let output = "Running EXPANDED risk detection tests...\n\n";
    for (const text of testCases) {
        const result = await mockAnalyze(text);
        output += `Text: "${text}"\n`;
        output += `Score: ${result.score}\n`;
        output += `Risk Level: ${result.riskLevel}\n`;
        output += `Detected Clauses: ${result.clauses.map(c => c.id).join(', ') || 'None'}\n`;
        output += '---\n';
    }
    fs.writeFileSync('reproduce_output_v2.txt', output);
    console.log("Output written to reproduce_output_v2.txt");
}

run();

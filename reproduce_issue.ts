import { mockAnalyze } from './src/lib/mockAnalysis.ts';

const testCases = [
    "We sell your data to third parties.", // predicted fail: 'data' is not 'personal data'
    "You agree to mandatory arbitration.", // predicted fail: order is adjective then noun
    "We collect your social security number.", // predicted pass
    "Arbitration is binding.", // predicted pass
    "We share your location with partners.", // predicted fail: 'location' vs 'precise location' or 'gps'
];

import * as fs from 'fs';

async function run() {
    let output = "Running risk detection tests...\n\n";
    for (const text of testCases) {
        const result = await mockAnalyze(text);
        output += `Text: "${text}"\n`;
        output += `Score: ${result.score}\n`;
        output += `Risk Level: ${result.riskLevel}\n`;
        output += `Detected Clauses: ${result.clauses.map(c => c.id).join(', ') || 'None'}\n`;
        output += '---\n';
    }
    fs.writeFileSync('reproduce_output.txt', output);
    console.log("Output written to reproduce_output.txt");
}

run();

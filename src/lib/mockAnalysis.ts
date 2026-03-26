export interface AnalyzedClause {
    id: string;
    originalText: string;
    simplifiedText: string;
    riskLevel: 'Low' | 'Moderate' | 'High';
    category: 'Privacy' | 'IP Rights' | 'Arbitration' | 'Termination' | 'Financial' | 'Other';
    explanation: string;
}

export interface AnalysisResult {
    score: number; // 1-10
    riskLevel: 'Low' | 'Moderate' | 'High';
    summary: string;
    clauses: AnalyzedClause[];
}

interface RiskPattern {
    id: string;
    category: AnalyzedClause['category'];
    risk: 'Low' | 'Moderate' | 'High';
    scoreWeight: number; // 1-10
    // We will use a string source for the regex to allow easier "fuzzy" matching logic if needed later, 
    // but for now we stick to refined regexes that are less brittle.
    regex: RegExp;
    simplified: string;
    explanation: string;
}


// Configuration of Risk Patterns
const RISK_PATTERNS: RiskPattern[] = [
    // --- CRITICAL PRIVACY & PII ---
    {
        id: 'pii-general',
        category: 'Privacy',
        risk: 'Moderate',
        scoreWeight: 6,
        regex: /(ask for|collect|gather|store|require|process).{0,50}(personal (info|information|data)|personally identifiable information|pii|contact (info|details))/i,
        simplified: "Collects personal information.",
        explanation: "The service gathers standard personal data. Review their privacy policy to understand how this info is used and secured."
    },
    {
        id: 'pii-ssn-govt',
        category: 'Privacy',
        risk: 'High',
        scoreWeight: 9,
        regex: /(social security|ssn|driver'?s? license|passport|government id|tax id|national id).{0,50}(collect|store|require|process|upload)|(collect|store|require|process|upload).{0,50}(social security|ssn|driver'?s? license|passport|government id|tax id|national id)/i,
        simplified: "Collects sensitive government IDs.",
        explanation: "High-risk collection of government-issued identification."
    },
    {
        id: 'pii-biometrics',
        category: 'Privacy',
        risk: 'High',
        scoreWeight: 9,
        regex: /(biometric|fingerprint|face scan|facial recognition|voice print|retina|iris)/i, // Just mentioning these usually implies collection in ToS context
        simplified: "Collects biometric data.",
        explanation: "Biometric data collection is permanent and high-risk."
    },
    {
        id: 'pii-financial',
        category: 'Financial',
        risk: 'High',
        scoreWeight: 8,
        regex: /(credit card|bank account|routing number|financial info|payment (method|details|info)).{0,100}(store|save|keep|retain|database)/i,
        simplified: "Stores financial details.",
        explanation: "Storage of financial data increases fraud risk."
    },
    {
        id: 'pii-location',
        category: 'Privacy',
        risk: 'High',
        scoreWeight: 8,
        regex: /(gps|precise location|geolocation|location history|real-time tracking|(track|share).{0,50}(location|proximity|movements))/i,
        simplified: "Tracks precise location.",
        explanation: "Real-time or precise location tracking is invasive."
    },
    {
        id: 'data-sell',
        category: 'Privacy',
        risk: 'High',
        scoreWeight: 9,
        regex: /(sell|lease|rent|monetize|trade).{0,100}(data|info|profile|history|content)|(data|info|profile|history|content).{0,100}(sell|lease|rent|monetize|trade)/i,
        simplified: "Rights to sell your data.",
        explanation: "Explicit permission to sell user data to third parties."
    },
    {
        id: 'third-party-sharing',
        category: 'Privacy',
        risk: 'High',
        scoreWeight: 7,
        regex: /(share|disclose|provide|transfer).{0,100}(partners|affiliates|third possibilities|advertisers|marketing)/i,
        simplified: "Broad sharing with third parties.",
        explanation: "Data may be shared with advertisers or affiliates."
    },
    {
        id: 'tracking-history',
        category: 'Privacy',
        risk: 'High',
        scoreWeight: 7,
        regex: /(browsing history|search history|online activity|behavioral tracking|device fingerprint)/i,
        simplified: "Tracks browsing or behavioral history.",
        explanation: "Monitoring of user activity across the web or app."
    },

    // --- USER RIGHT WAIVERS ---
    {
        id: 'arbitration',
        category: 'Arbitration',
        risk: 'High',
        scoreWeight: 9,
        regex: /((arbitration|class action|jury trial|trial by jury|dispute resolution).{0,150}(waive|binding|mandatory|renounce|give up)|(waive|binding|mandatory|renounce|give up).{0,150}(arbitration|class action|jury trial|trial by jury|dispute resolution))/i,
        simplified: "Forced arbitration / No Jury.",
        explanation: "You waive your constitutional right to a court trial."
    },
    {
        id: 'liability-cap',
        category: 'Financial',
        risk: 'High',
        scoreWeight: 8,
        regex: /(not liable|no liability|limitation of liability|liability.{0,20}limited|reject.{0,20}warranties|as is|with all faults)/i,
        simplified: "Limits their liability significantly.",
        explanation: "They refuse to be held responsible for damages, often even if they are at fault."
    },
    {
        id: 'indemnification',
        category: 'Financial',
        risk: 'High',
        scoreWeight: 8,
        regex: /(indemnify|hold harmless|defend).{0,50}(us|company|provider)/i,
        simplified: "You must pay their legal fees.",
        explanation: "Indemnification clauses require you to cover their costs if they get sued because of you."
    },
    {
        id: 'moral-rights',
        category: 'IP Rights',
        risk: 'High',
        scoreWeight: 6,
        regex: /(waive|give up).{0,50}(moral rights)/i,
        simplified: "Waiver of moral rights.",
        explanation: "You give up personal rights to your creation (e.g., right to be credited)."
    },

    // --- CONTENT & OWNERSHIP ---
    {
        id: 'ip-grab',
        category: 'IP Rights',
        risk: 'High',
        scoreWeight: 8,
        regex: /((perpetual|irrevocable|worldwide).{0,100}(license|rights?|ownership)|(license|rights?|ownership).{0,100}(content|media|submission).{0,100}(forever|perpetual)|(obtain|grant).{0,100}(rights?|ownership).{0,100}(content|media).{0,100}(forever|perpetual))/i,
        simplified: "They own/license your content forever.",
        explanation: "You grant them a permanent right to use your content."
    },

    // --- CONTROL & TERMINATION ---
    {
        id: 'unilateral-change',
        category: 'Other',
        risk: 'High',
        scoreWeight: 7,
        regex: /(modify|change|update).{0,50}(terms|agreement|policy).{0,50}(any time|sole discretion|without notice)/i,
        simplified: "Can change terms without notice.",
        explanation: "They can rewrite the rules at any time without telling you."
    },
    {
        id: 'auto-renewal',
        category: 'Financial',
        risk: 'Moderate', // Sometimes standard, but risky if buried
        scoreWeight: 6,
        regex: /(auto-renew|automatic renewal|automatically renew|recurring billing|subscription will continue)/i,
        simplified: "Automatic subscription renewal.",
        explanation: "Charges may continue until you explicitly cancel."
    }
];

export const mockAnalyze = (text: string): Promise<AnalysisResult> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let totalScore = 0;
            const clauses: AnalyzedClause[] = [];

            // Normalize text: remove huge spaces/newlines
            const cleanText = text.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ');

            // 1. Check ALL Risk Patterns
            RISK_PATTERNS.forEach(pattern => {
                const match = pattern.regex.exec(cleanText);

                if (match) {
                    // Avoid duplicate hits for the exact same pattern ID
                    if (!clauses.some(c => c.id === pattern.id)) {
                        clauses.push({
                            id: pattern.id,
                            originalText: `"...${match[0]}..."`,
                            simplifiedText: pattern.simplified,
                            riskLevel: pattern.risk,
                            category: pattern.category,
                            explanation: pattern.explanation
                        });

                        // Weighted scoring accumulation
                        totalScore += pattern.scoreWeight;
                    }
                }
            });

            // 2. Base Score Calculation
            // If we found ANY High risk clause, the score starts high.
            const highRiskCount = clauses.filter(c => c.riskLevel === 'High').length;
            const moderateRiskCount = clauses.filter(c => c.riskLevel === 'Moderate').length;

            if (highRiskCount > 0) {
                // If there's at least one high risk item, score is roughly 7 + (count/2), max 10
                totalScore = Math.min(10, 7 + (highRiskCount * 1.5));
            } else if (moderateRiskCount > 0) {
                // Moderate items start around 4
                totalScore = Math.min(6, 4 + moderateRiskCount);
            } else {
                // Low risk default
                totalScore = 1;
            }

            // 3. Heuristic: Length detection (Very short texts might just be snippets)
            // If text is super short (< 10 words) and we found nothing, it's likely safe or partial.
            if (cleanText.length < 50 && clauses.length === 0) {
                totalScore = 1;
            }

            // 4. Determine final Risk Level Label
            let riskLevel: 'Low' | 'Moderate' | 'High' = 'Low';
            let summary = "These terms appear mostly safe.";

            if (totalScore >= 8) {
                riskLevel = 'High';
                summary = "CRITICAL WARNING: Contains multiple high-risk clauses such as data selling, tracking, or rights waivers.";
            } else if (totalScore >= 5) {
                riskLevel = 'Moderate';
                summary = "Caution advised: Standard but potentially burdensome terms detected.";
            }

            resolve({
                score: Math.floor(totalScore),
                riskLevel,
                summary,
                clauses
            });
        }, 800);
    });
};

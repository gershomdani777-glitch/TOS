# Rewrite Risk Detection Logic

The current risk detection is too conservative and relies on strict regex/keyword matching, causing high-risk clauses like "unilateral modification" or "limit of liability" to result in "Low Risk".

## Proposed Changes

### Logic Layer

#### [MODIFY] [mockAnalysis.ts](file:///c:/Users/GERSHOM%20DANI/.gemini/antigravity/scratch/tos-illuminator/src/lib/mockAnalysis.ts)

I will completely overhaul `mockAnalysis.ts` to include:

1.  **Expanded `RISK_PATTERNS`**:
    -   **Unilateral Modification**: "modify at any time", "change terms without notice".
    -   **Indemnification**: "indemnify", "hold harmless".
    -   **Liability Caps**: "not liable", "limitation of liability", "as is", "reject all warranties".
    -   **Jury Waiver**: "waive right to trial", "jury trial", "class action waiver".
    -   **Tracking/Profiling**: "browsing history", "behavioral tracking", "device fingerprinting".
    -   **Content Rights**: "perpetual license", "rights to your content", "moral rights".
    -   **Auto-Renewal**: "automatically renew", "recurring charge", "subscription continues".
    -   **Broad Sharing**: "share with partners", "marketing affiliates", "third party advertisers".

2.  **Scoring Overhaul**:
    -   High Risk clauses (like Indemnification or Class Action Waiver) will have a `High` risk level immediately, regardless of other text.
    -   "Bad Vibes" keywords will contribute more significantly to the score.

3.  **Pattern Simplification**:
    -   Use simpler regexes that catch the *intent* rather than precise grammar.
    -   Example: `/(modify|change).{0,50}(terms|agreement).{0,50}(any time|sole discretion)/i`

## Verification Plan

### Automated Tests
-   Run `reproduce_issue_v2.ts`.
-   **Expectation**: ALL 9 test cases must result in **High Risk**.

### Manual Verification
-   Paste the problematic phrases into the UI.

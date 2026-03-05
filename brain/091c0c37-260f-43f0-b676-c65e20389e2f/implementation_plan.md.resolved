# Improve Risk Detection and Highlighting

The current risk detection logic is too strict, causing some high-risk texts to receive low scores. Additionally, the highlighting of high-risk text in the UI can be improved.

## User Review Required

> [!IMPORTANT]
> I will be relaxing the regex proximity constraints (e.g. allowing more words between keywords) to catch more "high risk" clauses. This might slightly increase false positives but favors safety.

## Proposed Changes

### Logic

#### [MODIFY] [mockAnalysis.ts](file:///c:/Users/GERSHOM%20DANI/.gemini/antigravity/scratch/tos-illuminator/src/lib/mockAnalysis.ts)
- Increase the wildcard range in regex patterns (e.g., from `.{0,50}` to `.{0,200}`) to capture clauses where the keywords are further apart.
- Add a "Severe" risk level or ensure High risks bump the score significantly reliably.
- Improve the `originalText` capture to ensure it captures enough context but not too much, or format it better.

### UI

#### [MODIFY] [Results.tsx](file:///c:/Users/GERSHOM%20DANI/.gemini/antigravity/scratch/tos-illuminator/src/pages/Results.tsx)
- Update the clause card to highlight the text background red/yellow/green based on the risk level, making it more obvious than `bg-muted/30`.

## Verification Plan

### Manual Verification
1.  Run the app.
2.  Paste a known high-risk clause (e.g., "We will collect your Social Security Number and share it with third parties").
3.  Verify that it is detected as High Risk.
4.  Verify that the text is highlighted in Red in the results page.

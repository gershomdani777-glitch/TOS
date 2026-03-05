# ToS Illuminator Implementation Plan

## Goal Description
Create "ToS Illuminator", a modern legal-tech website that analyzes Terms of Service agreements to highlight dangerous clauses and provide a privacy risk score. The goal is to make legal agreement transparent for everyday users.

## User Review Required
> [!NOTE]
> AI Analysis Logic: Since this is a frontend demo/prototype, the "AI" analysis will be simulated using keyword matching and heuristics to demonstrate the functionality without needing a live backend/LLM connection immediately.

## Proposed Changes
We will create a new Vite + React application.

### Project Structure
- `src/components`: Reusable UI components (Hero, Analyzer, Card, etc.)
- `src/styles`: CSS modules/Global styles
- `src/utils`: Mock analysis logic

### Dependencies
- `vite` (Build tool)
- `react`, `react-dom` (Framework)
- `lucide-react` (Icons)
- Google Fonts (Inter/Outfit for typography)

## Verification Plan
### Automated Tests
- Build verification: `npm run build`

### Manual Verification
- Check responsiveness on mobile/desktop.
- Test the "Scan" functionality with sample text to ensure red flags are highlighted.
- Verify risk score calculation visual updates.

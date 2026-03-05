# ToS Illuminator - Implementation Plan

ToS Illuminator is a legal-tech website designed to help consumers understand Terms of Service agreements by highlighting dangerous clauses and providing plain-English translations.

## User Review Required
- **Mock AI Logic**: The "AI-powered" analysis will be simulated with mock data for this frontend implementation, as no backend API was provided.
- **Design Style**: Will use a clean, trustworthy aesthetic with "soft white/dark mode" and risk-associated color coding (Green/Yellow/Red).

## Proposed Changes

### Tech Stack
- **Framework**: React (Vite)
- **Styling**: TailwindCSS (Custom configuration for risk colors)
- **Animation**: Framer Motion (for "wow" factor and transitions)
- **Routing**: React Router DOM
- **Icons**: Lucide React

### Project Structure

#### [NEW] Dependencies
- `react-router-dom`: For navigation between Home, Scan, and Results pages.
- `framer-motion`: For smooth UI interactions and risk score animations.
- `lucide-react`: For iconography.
- `clsx`, `tailwind-merge`: For dynamic class handling.

#### [NEW] Components
- `components/ui/Button.tsx`: Primary and secondary action buttons.
- `components/ui/Card.tsx`: Container for clauses and content.
- `components/ui/RiskBadge.tsx`: Visual indicator for risk levels (Low, Moderate, High).
- `components/ui/RiskMeter.tsx`: Animated gauge or bar showing the 1-10 score.
- `components/layout/Navbar.tsx`: Main navigation.
- `components/layout/Footer.tsx`: Legal disclaimers and links.

#### [NEW] Pages
- `pages/Home.tsx`: Hero section, value prop, how it works, sample preview.
- `pages/Scanner.tsx`: Input area for pasting text or uploading files.
- `pages/Results.tsx`: Display analysis results, risk score, and highlighted clauses.

#### [NEW] Utilities
- `lib/mockAnalysis.ts`: Simulation logic to return "analyzed" results from input text.
- `lib/theme.ts`: Centralized theme tokens if needed outside Tailwind.

## Verification Plan

### Automated Tests
- Build verification using `npm run build`.
- Lint checks using `npm run lint`.

### Manual Verification
1.  **Home Page**: Verify responsiveness and navigation links.
2.  **Scanner**: Test pasting text and clicking "Scan".
3.  **Results**:
    -   Verify risk score animation.
    -   Check that high-risk clauses are red, moderate are yellow.
    -   Ensure "Plain-English" tooltips or expansions work.
4.  **Theme**: Toggle/check adaptation to dark/light mode preferences if implemented (or stick to a polished dark/light hybrid as requested).

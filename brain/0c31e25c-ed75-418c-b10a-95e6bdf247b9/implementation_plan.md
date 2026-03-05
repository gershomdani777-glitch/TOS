# ToS Illuminator - Implementation Plan

## Goal Description
Build a modern, interactive legal-tech website that scans Terms of Service (ToS) agreements and highlights dangerous clauses. The goal is to demystify legal jargon for everyday users through a simple, high-design interface.

## User Review Required
> [!NOTE]
> **Tech Stack**:
> - **Framework**: React (Vite) for fast performance and interactivity.
> - **Styling**: Vanilla CSS with CSS Variables for a premium, custom look (aiming for "Soft White" & "Sleek Dark" themes).
> - **Animations**: `framer-motion` for smooth, high-quality micro-interactions.
> - **Icons**: `lucide-react` for clean, professional iconography.

> [!IMPORTANT]
> **Mock AI Logic**:
> Since this is a frontend implementation, the "AI" analysis will be simulated using local keyword matching and pattern recognition to demonstrate the *experience* without needing a live backend API key immediately.

## Proposed Changes

### Project Structure (Root)
#### [NEW] [package.json](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/package.json)
- Dependencies: `react`, `react-dom`, `framer-motion`, `lucide-react`.
- DevDependencies: `vite`, `@vitejs/plugin-react`.

#### [NEW] [vite.config.js](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/vite.config.js)
- Standard Vite React configuration.

### Source Code (`/src`)

#### [NEW] [main.jsx](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/src/main.jsx)
- Entry point.

#### [NEW] [App.jsx](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/src/App.jsx)
- Main application layout and router (if needed, or single page scroll).

#### [NEW] [index.css](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/src/index.css)
- **Core Design System**:
    - CSS Variables for Colors (Primary: Deep Navy/Legal Blue, Accents: Red/Yellow/Green for risk).
    - Typography: Inter/Outfit font setup.
    - Global styles for glassmorphism and card layouts.

#### [NEW] [components](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/src/components)
- `Header.jsx`: Navigation and logo.
- `Hero.jsx`: Landing section with "Understand What You’re Really Agreeing To".
- `HowItWorks.jsx`: 3-step process.
- `Scanner.jsx`: The main interactive input area (Paste/Upload).
- `AnalysisReport.jsx`: The dashboard showing Risk Score (1-10) and flagged clauses.
- `RiskCard.jsx`: Individual cards for flagged items with "Plain English" translation.
- `Footer.jsx`: Trust details and disclaimers.

#### [NEW] [utils](file:///c:/Users/GERSHOM%20DANI/OneDrive/Desktop/hackthon%20project%201/src/utils)
- `analyzer.js`: Mock logic to scan text and return risk objects.

## Verification Plan

### Automated Tests
- `npm run dev` to launch the dev server.
- Verify build with `npm run build`.

### Manual Verification
- **Aesthetics Check**: Verify "Premium" feel (spacing, fonts, smooth transitions).
- **Flow Check**:
    1.  User lands on pages.
    2.  Clicks "Scan My Terms Now".
    3.  Pastes dummy text.
    4.  Sees "Scanning..." animation.
    5.  Views Risk Score and translated clauses.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
// Import Scan and Results pages later when they are created
import { Scanner } from './pages/Scanner'; // Will create next
import { Results } from './pages/Results'; // Will create next



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Using temporary placeholders if real components not actively exported yet, but I will create them shortly. */}
            <Route path="/scan" element={<Scanner />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

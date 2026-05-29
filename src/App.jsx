import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Journey from './pages/Journey';
import Tools from './pages/Tools';
import Toolkit from './pages/Toolkit';
import DeepAutonomyEval from './pages/DeepAutonomyEval';
import PhaseRouter from './pages/PhaseRouter';
import Cases from './pages/Cases';
import Playthrough from './pages/Playthrough';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const close = () => setNavOpen(false);

  return (
    <div className="app">
      <ScrollToTop />
      <Sidebar open={navOpen} onClose={close} />
      <div className="main">
        <div className="topbar">
          <button className="menu-btn" onClick={() => setNavOpen(true)} aria-label="Open menu">☰</button>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>Agentic AI Playbook</span>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<Journey />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/case/:caseId" element={<Playthrough />} />
          <Route path="/phase/:slug" element={<PhaseRouter />} />
          <Route path="/deep/autonomy-eval" element={<DeepAutonomyEval />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

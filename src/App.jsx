import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Budgeting from './pages/Budgeting';
import Inflation from './pages/Inflation';
import BusinessProfit from './pages/BusinessProfit';
import Progress from './pages/Progress';
import About from './pages/About';
import NotFound from './pages/NotFound';

const PAGE_TITLES = {
  '/': 'MoneyQuest | Financial Literacy for Students',
  '/budgeting': 'Budgeting & Cash Flow | MoneyQuest',
  '/inflation': 'Inflation & Purchasing Power | MoneyQuest',
  '/profit': 'Business Profit & Break-Even | MoneyQuest',
  '/progress': 'Your Learning Progress | MoneyQuest',
  '/about': 'About & Sources | MoneyQuest',
};

function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLES[pathname] || 'Page Not Found | MoneyQuest';
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ProgressProvider>
      <HashRouter>
        <PageTitle />
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
          <Navbar />
          <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/budgeting" element={<Budgeting />} />
              <Route path="/inflation" element={<Inflation />} />
              <Route path="/profit" element={<BusinessProfit />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ProgressProvider>
  );
}

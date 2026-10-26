import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <ProgressProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </ProgressProvider>
  );
}

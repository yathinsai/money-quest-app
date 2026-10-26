import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Coins, Menu, X, Award, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { getOverallStats } = useProgress();
  const { completedCount, totalModules } = getOverallStats();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/budgeting', label: 'Budgeting' },
    { to: '/inflation', label: 'Inflation' },
    { to: '/profit', label: 'Business Profit' },
    { to: '/progress', label: 'My Progress' },
    { to: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 font-bold text-xl text-slate-900 hover:text-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Coins className="w-5 h-5" />
            </div>
            <span className="tracking-tight">
              Money<span className="text-emerald-600">Quest</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-slate-650 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Quick Progress Indicator */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/progress"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
              title="View your saved progress"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {completedCount} of {totalModules} Completed
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-650 text-slate-700 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-emerald-600"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <Link
              to="/progress"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 text-sm font-semibold"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Progress Status
              </span>
              <span>{completedCount}/{totalModules} Done</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

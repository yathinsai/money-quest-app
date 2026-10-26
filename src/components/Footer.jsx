import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-slate-600 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <span>MoneyQuest</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">v1.0</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              An interactive, safe learning environment designed for students ages 12–16 to master budgeting, inflation, and business math.
            </p>
          </div>

          {/* Privacy & Safety Guarantee */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Privacy & Safety</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero accounts, zero tracking, and no personal data collected. All quiz scores and progress are saved solely inside your local browser.
            </p>
          </div>

          {/* Educational Disclaimer */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Educational Use Only</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              All scenarios, currency values, and calculations are fictional mathematical models created for teaching purposes. Not financial advice.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} MoneyQuest. Built for curious young minds.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-emerald-700 underline underline-offset-2">About & Sources</Link>
            <Link to="/progress" className="hover:text-emerald-700 underline underline-offset-2">Reset Progress</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

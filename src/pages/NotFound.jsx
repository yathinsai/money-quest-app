import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="text-center py-20 max-w-md mx-auto space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
        <Compass className="w-8 h-8" />
      </div>
      <div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">404 Error</span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-1">Page Not Found</h1>
        <p className="text-sm text-slate-500 mt-2">
          Looks like you wandered off the map! Let's get you back to your learning quest.
        </p>
      </div>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600"
        >
          <Home className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}

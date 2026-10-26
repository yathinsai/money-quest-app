import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, AlertCircle } from 'lucide-react';

/**
 * Accessible status badge that uses both icon and clear text to communicate status.
 * @param {{
 *   status: 'completed' | 'not-started' | 'surplus' | 'balanced' | 'deficit' | 'warning',
 *   label?: string,
 *   className?: string
 * }} props
 */
export default function StatusBadge({ status, label, className = '' }) {
  switch (status) {
    case 'completed':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>{label || 'Completed'}</span>
        </span>
      );

    case 'not-started':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
        >
          <Clock className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
          <span>{label || 'Not Started'}</span>
        </span>
      );

    case 'surplus':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" aria-hidden="true" />
          <span>{label || 'Surplus (Under Budget)'}</span>
        </span>
      );

    case 'balanced':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" aria-hidden="true" />
          <span>{label || 'Balanced (Zero Remaining)'}</span>
        </span>
      );

    case 'deficit':
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200 ${className}`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-700" aria-hidden="true" />
          <span>{label || 'Deficit (Over Budget)'}</span>
        </span>
      );

    case 'warning':
    default:
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200 ${className}`}
        >
          <AlertTriangle className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
          <span>{label || 'Warning'}</span>
        </span>
      );
  }
}

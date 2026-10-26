import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function ModuleCard({
  title,
  description,
  to,
  icon: Icon,
  badgeText,
  completed = false,
  bestScore = null,
  totalQuestions = 5,
  colorScheme = 'emerald',
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
            {Icon && <Icon className="w-6 h-6" />}
          </div>
          <StatusBadge
            status={completed ? 'completed' : 'not-started'}
            label={completed ? 'Passed' : 'Incomplete'}
          />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-6">{description}</p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="text-xs text-slate-500">
          {completed && bestScore !== null ? (
            <span className="font-semibold text-emerald-800">
              Best Score: {bestScore} / {totalQuestions} ({Math.round((bestScore / totalQuestions) * 100)}%)
            </span>
          ) : (
            <span>5 Interactive Quiz Questions</span>
          )}
        </div>

        <Link
          to={to}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
        >
          <span>{completed ? 'Review' : 'Start'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

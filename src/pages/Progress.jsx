import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Award,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  HardDrive
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import StatusBadge from '../components/StatusBadge';

const MODULE_META = [
  { id: 'budgeting', title: 'Budgeting & Cash Flow', path: '/budgeting' },
  { id: 'inflation', title: 'Inflation & Purchasing Power', path: '/inflation' },
  { id: 'businessProfit', title: 'Business Profit & Break-Even', path: '/profit' },
];

export default function Progress() {
  const { progress, resetAllProgress, getOverallStats } = useProgress();
  const { completedCount, totalModules, percentage, totalAttempts } = getOverallStats();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmReset = () => {
    resetAllProgress();
    setShowConfirmModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Your Learning Progress</h1>
          <p className="text-sm text-slate-600 mt-1">Track quiz scores, attempts, and completed learning milestones.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowConfirmModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All Progress</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Modules Passed</span>
            <Award className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">
            {completedCount} <span className="text-base text-slate-400 font-normal">/ {totalModules}</span>
          </p>
          <div className="w-full h-2 bg-slate-100 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Mastery Level</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-800">{percentage}%</p>
          <span className="text-xs text-slate-500 block mt-3">
            {percentage === 100
              ? '🎉 All core modules completed!'
              : `${totalModules - completedCount} module${totalModules - completedCount > 1 ? 's' : ''} left to master`}
          </span>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Quiz Attempts</span>
            <Clock className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900">{totalAttempts}</p>
          <span className="text-xs text-slate-500 block mt-3">Practice makes intuition</span>
        </div>
      </div>

      {/* Detailed Module Score Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Module Performance Breakdown</h2>
          <p className="text-xs text-slate-500 mt-0.5">Scoring 70% or higher unlocks the completed status.</p>
        </div>

        <div className="divide-y divide-slate-100">
          {MODULE_META.map((meta) => {
            const data = progress.modules[meta.id] || {
              completed: false,
              bestScore: null,
              lastScore: null,
              attempts: 0,
              lastAttemptAt: null,
            };

            return (
              <div
                key={meta.id}
                className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-slate-900 text-base">{meta.title}</h3>
                    <StatusBadge
                      status={data.completed ? 'completed' : 'not-started'}
                      label={data.completed ? 'Passed' : 'Incomplete'}
                    />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span>
                      Best Score:{' '}
                      <strong className="text-slate-800">
                        {data.bestScore !== null ? `${data.bestScore} / 5` : 'None'}
                      </strong>
                    </span>
                    <span>•</span>
                    <span>
                      Attempts: <strong className="text-slate-800">{data.attempts}</strong>
                    </span>
                    {data.lastAttemptAt && (
                      <>
                        <span>•</span>
                        <span>
                          Last active: {new Date(data.lastAttemptAt).toLocaleDateString()}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <Link
                  to={meta.path}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 transition-colors self-start sm:self-auto border border-slate-200"
                >
                  <span>{data.completed ? 'Review Module' : 'Start Module'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Storage Privacy Explanation */}
      <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <HardDrive className="w-4 h-4 text-emerald-600" />
          <span>How Your Progress is Stored</span>
        </div>
        <p className="leading-relaxed">
          MoneyQuest uses your browser's private <code>localStorage</code> (key: <code>moneyquest:v1</code>).
          No information is ever uploaded to a server, cloud database, or third-party company.
        </p>
        <p className="leading-relaxed text-slate-500">
          <strong>Note for students:</strong> Because your progress lives only in this browser, switching to a different computer or clearing your browser cookies/history will reset your scores.
        </p>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-sm w-full shadow-xl space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center">
              <h3 className="text-lg font-bold text-slate-900">Reset All Progress?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will erase all module completion checkmarks, quiz scores, and attempt counts. This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                Yes, Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

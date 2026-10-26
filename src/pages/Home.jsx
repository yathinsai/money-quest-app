import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wallet,
  TrendingUp,
  Briefcase,
  PieChart,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Award,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import ModuleCard from '../components/ModuleCard';

export default function Home() {
  const { progress, getOverallStats } = useProgress();
  const { completedCount, totalModules, percentage } = getOverallStats();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 mb-6">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>Interactive Financial Literacy for Ages 12–16</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Master Money with <span className="text-emerald-600">Simulations</span>, Not Memorization.
        </h1>

        <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Make real-world financial choices in a safe, fictional sandbox. Learn how budgets balance, how inflation impacts prices, and how businesses make profits.
        </p>

        {/* Progress Quick Banner */}
        <div className="mt-8 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-md mx-auto text-left">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
            <span>Your Overall Quest Progress</span>
            <span className="text-emerald-700">{percentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-3 text-xs text-slate-500">
            <span>
              {completedCount} of {totalModules} modules mastered
            </span>
            <Link
              to="/progress"
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <span>View Report</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Learning Modules</h2>
            <p className="text-sm text-slate-500 mt-1">Each module includes an explanation, a live simulator, and a 5-question quiz.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Module 1: Budgeting */}
          <ModuleCard
            title="Budgeting & Cash Flow"
            description="Balance income against needs and wants. Discover how to build a savings buffer without double-counting your cash."
            to="/budgeting"
            icon={Wallet}
            completed={progress.modules.budgeting.completed}
            bestScore={progress.modules.budgeting.bestScore}
            totalQuestions={5}
          />

          {/* Module 2: Inflation */}
          <ModuleCard
            title="Inflation & Purchasing Power"
            description="See why a movie ticket cost $5 twenty years ago and why money loses purchasing power over time."
            to="/inflation"
            icon={TrendingUp}
            completed={progress.modules.inflation.completed}
            bestScore={progress.modules.inflation.bestScore}
            totalQuestions={5}
          />

          {/* Module 3: Business Profit */}
          <ModuleCard
            title="Business Profit & Break-Even"
            description="Calculate revenue, variable costs, and fixed overhead. Discover the exact number of units you must sell to break even."
            to="/profit"
            icon={Briefcase}
            completed={progress.modules.businessProfit.completed}
            bestScore={progress.modules.businessProfit.bestScore}
            totalQuestions={5}
          />
        </div>

        {/* Future Teaser: Investing */}
        <div className="mt-6 bg-slate-100/70 border border-dashed border-slate-300 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h4 className="text-sm font-bold text-slate-800">Investing Basics & Historical Returns</h4>
                <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-semibold">Planned for V2</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Compound growth, index funds, and risk trade-offs with cited historical data. Unlocks after completing core modules.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-slate-500 px-3 py-1.5 rounded-lg bg-white border border-slate-200">
            Coming Soon
          </span>
        </div>
      </section>

      {/* 5-Step Learning Loop Feature */}
      <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl font-bold text-slate-900">How You Learn on MoneyQuest</h2>
          <p className="text-sm text-slate-500 mt-1">Every module follows a battle-tested educational cycle</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { step: '1', title: 'Learn', desc: 'Read short, plain-language concepts with no financial jargon.' },
            { step: '2', title: 'Experiment', desc: 'Change numbers in live calculators and observe instant results.' },
            { step: '3', title: 'Take a Quiz', desc: 'Test your understanding with 5 practical scenario questions.' },
            { step: '4', title: 'Review', desc: 'Read clear explanations for every correct and incorrect answer.' },
            { step: '5', title: 'Track', desc: 'Save your achievements in your browser and celebrate mastery.' },
          ].map((item) => (
            <div key={item.step} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mb-3">
                  {item.step}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy Guarantee Banner */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Built for Student Safety & Zero Friction</span>
          </div>
          <h3 className="text-2xl font-bold">No accounts, no ads, no trackers.</h3>
          <p className="text-sm text-emerald-100 max-w-xl">
            MoneyQuest is 100% private. All your progress stays in this browser. Perfect for classrooms, workshops, or self-paced learning.
          </p>
        </div>
        <Link
          to="/about"
          className="shrink-0 px-5 py-3 rounded-xl text-sm font-semibold bg-white text-emerald-950 hover:bg-emerald-50 transition-colors shadow-sm"
        >
          Read About Sources & Math
        </Link>
      </section>
    </div>
  );
}

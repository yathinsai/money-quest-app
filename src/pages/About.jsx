import React from 'react';
import {
  ShieldCheck,
  BookOpen,
  Code2,
  FileText,
  Calculator,
  ExternalLink,
  Award,
  Users
} from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About MoneyQuest
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Educational mission, formulas, limitations, and citations for students, parents, and educators.
        </p>
      </div>

      {/* Mission & Purpose */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-emerald-800 font-bold text-lg">
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <h2>Project Purpose & Philosophy</h2>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          MoneyQuest is a free, student-built financial literacy platform created for young people ages 12–16.
          Rather than memorizing abstract economic definitions, students learn best by playing with real mathematical models:
          adjusting income, seeing prices rise over time, and testing break-even points in small business scenarios.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Every concept is taught with nonjudgmental language. Financial decisions involve natural trade-offs (needs versus wants, present spending versus future security), and MoneyQuest helps learners understand those trade-offs in a risk-free fictional environment.
        </p>
      </section>

      {/* Mathematical Formulas Used */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <Calculator className="w-5 h-5 text-emerald-600" />
          <h2>Formulas & Simulation Logic</h2>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">1. Zero-Based Budgeting</h3>
            <p className="font-mono text-xs text-emerald-800 bg-white p-2 rounded border border-slate-200 inline-block my-1">
              Remaining Balance = Income - Total Planned Expenses
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Savings rate is calculated as <code>(Remaining Balance / Income) × 100</code> when remaining balance is positive.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">2. Compound Inflation Growth</h3>
            <p className="font-mono text-xs text-emerald-800 bg-white p-2 rounded border border-slate-200 inline-block my-1">
              Future Price = Current Price × (1 + Annual Inflation Rate) ^ Years
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Standard compound interest formula representing exponential price adjustments over time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-1">3. Business Profit & Break-Even Analysis</h3>
            <div className="space-y-1 font-mono text-xs text-emerald-800 bg-white p-2 rounded border border-slate-200 my-1">
              <p>Total Revenue = Selling Price × Units Sold</p>
              <p>Total Cost = (Variable Cost Per Unit × Units Sold) + Fixed Costs</p>
              <p>Profit = Total Revenue - Total Cost</p>
              <p>Break-Even Units = Ceil(Fixed Costs / (Selling Price - Variable Cost))</p>
            </div>
            <p className="text-slate-600 text-xs mt-1">
              If selling price is less than or equal to variable cost per unit, break-even is flagged as unattainable.
            </p>
          </div>
        </div>
      </section>

      {/* Limitations & Disclaimers */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-amber-800 font-bold text-lg">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <h2>Educational Limitations & Privacy</h2>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
          <li>
            <strong>Not Financial Advice:</strong> All scenarios, currency amounts, and business calculations are simplified educational illustrations. They do not constitute personalized financial, tax, or investment advice.
          </li>
          <li>
            <strong>Zero Data Collection (COPPA/FERPA Compliant):</strong> MoneyQuest does not collect names, email addresses, phone numbers, or school information. All progress is kept strictly inside the user's browser.
          </li>
          <li>
            <strong>Simplified Modeling:</strong> Real inflation fluctuates year-to-year based on macroeconomic variables, and real-world business taxation, shipping, and shrinkage are omitted for pedagogical clarity.
          </li>
        </ul>
      </section>

      {/* Educational Sources & Citations */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
          <FileText className="w-5 h-5 text-emerald-600" />
          <h2>Educational References & Standards</h2>
        </div>
        <p className="text-xs text-slate-600">
          Concepts and pedagogy are aligned with national youth financial literacy standards:
        </p>
        <div className="space-y-3 text-xs text-slate-700">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong>Council for Economic Education (CEE):</strong> National Standards for Personal Finance Education (Spending and Saving, Earning Income).
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong>U.S. Bureau of Labor Statistics (BLS):</strong> Consumer Price Index (CPI) historical inflation data methodology.
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <strong>Federal Deposit Insurance Corporation (FDIC):</strong> Money Smart for Young People curriculum guides.
          </div>
        </div>
      </section>
    </div>
  );
}

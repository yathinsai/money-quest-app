import React, { useState } from 'react';
import {
  Wallet,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
  DollarSign,
  TrendingDown,
  PiggyBank
} from 'lucide-react';
import FormField from '../components/FormField';
import StatusBadge from '../components/StatusBadge';
import Quiz from '../components/Quiz';
import { calculateBudget } from '../utils/calculations';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { budgetingQuestions } from '../data/budgetingQuestions';

const DEFAULT_EXPENSES = [
  { id: '1', name: 'Snacks & Lunch Out', amount: 35, category: 'wants' },
  { id: '2', name: 'Phone & Internet Share', amount: 25, category: 'needs' },
  { id: '3', name: 'Video Games & Apps', amount: 20, category: 'wants' },
  { id: '4', name: 'Transportation / Bus Pass', amount: 20, category: 'needs' },
];

export default function Budgeting() {
  const [income, setIncome] = useState(120);
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES);
  const [newExpenseName, setNewExpenseName] = useState('');
  const [newExpenseAmount, setNewExpenseAmount] = useState('');

  // Run pure calculation utility
  const budgetResult = calculateBudget(income, expenses);

  const handleUpdateAmount = (id, newAmount) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === id ? { ...item, amount: Math.max(0, Number(newAmount) || 0) } : item))
    );
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpenseName.trim() || Number(newExpenseAmount) <= 0) return;

    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newExpenseName.trim(),
        amount: Number(newExpenseAmount),
        category: 'custom',
      },
    ]);
    setNewExpenseName('');
    setNewExpenseAmount('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Wallet className="w-3.5 h-3.5" />
          <span>Module 1</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Budgeting & Cash Flow
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Learn how to give every dollar a job, avoid deficit spending, and build a savings cushion.
        </p>
      </div>

      {/* Lesson & Worked Example */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">1. Learn the Basics: The Zero-Based Budget</h2>
        <div className="prose prose-slate text-sm text-slate-600 space-y-4">
          <p>
            A <strong>budget</strong> is simply a roadmap for your money before you spend it. When you earn money
            (from chores, a part-time job, or a gift), your goal is to make sure your <strong>Total Income</strong> is
            greater than or equal to your <strong>Total Expenses</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Needs vs. Wants</h3>
              <p className="text-xs text-slate-600">
                <strong>Needs</strong> are necessities like food, basic clothing, and school transit.
                <strong>Wants</strong> are fun extras like bubble tea, gaming skins, and concerts. When money is tight, always trim wants first.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Paying Yourself First</h3>
              <p className="text-xs text-slate-600">
                Instead of waiting to see what is left at the end of the month, save a portion of your money immediately. That remaining money becomes your emergency safety net.
              </p>
            </div>
          </div>
        </div>

        {/* Worked Example */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
          <div className="flex items-center gap-2 font-bold mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Worked Example: Maya's Weekend Earnings</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            Maya earns <strong>$100</strong> babysitting. She plans for $30 in school transit (Need) and $40 on movie tickets and snacks (Want). Her total planned expenses are $70.
            Her remaining cash is <strong>$100 - $70 = $30 Surplus</strong>, which represents a <strong>30% savings rate</strong>.
          </p>
        </div>

        {/* Model Note: Double Counting Rule */}
        <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 flex items-start gap-3 text-xs text-blue-900">
          <Info className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Our Budget Model Rule: </span>
            In this app, savings is the <em>remaining unspent balance</em> (Income minus Planned Expenses). You should
            not list savings as an expense item if you also count it as remaining cash — that would double-count your dollars!
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">2. Interactive Budget Simulator</h2>
            <p className="text-xs text-slate-500">Edit income and spending amounts to see how your balance responds in real time.</p>
          </div>
          <StatusBadge status={budgetResult.status} />
        </div>

        {/* Income Input */}
        <div className="max-w-xs">
          <FormField
            id="fictional-income"
            label="Total Fictional Income (Monthly or Bi-Weekly)"
            prefix="$"
            value={income}
            onChange={(e) => setIncome(Math.max(0, Number(e.target.value) || 0))}
            hint="Try changing this to $80 or $150"
          />
        </div>

        {/* Expenses List */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3">Planned Expense Categories</h3>
          <div className="space-y-2">
            {expenses.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200"
              >
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-800 block truncate">{item.name}</span>
                </div>
                <div className="w-28">
                  <div className="relative rounded-lg shadow-sm">
                    <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-xs text-slate-400 font-medium">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      value={item.amount}
                      onChange={(e) => handleUpdateAmount(item.id, e.target.value)}
                      className="block w-full rounded-lg border border-slate-300 py-1.5 pl-6 pr-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveExpense(item.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
                  title="Remove category"
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleAddExpense} className="mt-4 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Add new category (e.g., Books, Gym)"
              value={newExpenseName}
              onChange={(e) => setNewExpenseName(e.target.value)}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <div className="relative w-full sm:w-28">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-xs text-slate-400 font-medium">
                $
              </span>
              <input
                type="number"
                min="1"
                placeholder="0"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
                className="w-full rounded-lg border border-slate-300 py-1.5 pl-6 pr-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
            <button
              type="submit"
              disabled={!newExpenseName.trim() || Number(newExpenseAmount) <= 0}
              className="px-4 py-1.5 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Live Calculation Output Dashboard */}
        <div className="pt-4 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Total Income</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(budgetResult.totalIncome)}</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Total Planned Spending</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(budgetResult.totalExpenses)}</span>
            </div>
            <div
              className={`p-4 rounded-xl border ${
                budgetResult.status === 'surplus'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : budgetResult.status === 'balanced'
                  ? 'bg-blue-50 border-blue-200 text-blue-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <span className="text-xs font-semibold block opacity-80">Remaining Balance</span>
              <span className="text-2xl font-bold">
                {formatCurrency(budgetResult.remainingMoney)}
              </span>
              {budgetResult.savingsRate > 0 && (
                <span className="text-xs block mt-1 font-medium">
                  Savings Rate: {formatPercent(budgetResult.savingsRate)}
                </span>
              )}
            </div>
          </div>

          <div
            className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
              budgetResult.status === 'surplus'
                ? 'bg-emerald-100/70 text-emerald-900'
                : budgetResult.status === 'balanced'
                ? 'bg-blue-100/70 text-blue-900'
                : 'bg-rose-100/70 text-rose-900'
            }`}
          >
            {budgetResult.status === 'deficit' ? (
              <AlertCircle className="w-5 h-5 shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0" />
            )}
            <span>{budgetResult.statusMessage}</span>
          </div>
        </div>
      </section>

      {/* Reusable Quiz Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">3. Test Your Knowledge: Budgeting Quiz</h2>
          <p className="text-xs text-slate-500">Answer 5 questions to test your budget intuition. Score 70% or higher to pass!</p>
        </div>
        <Quiz
          moduleId="budgeting"
          moduleTitle="Budgeting & Cash Flow"
          questions={budgetingQuestions}
        />
      </section>

      {/* Summary Box */}
      <section className="bg-slate-100 rounded-2xl p-6 text-sm text-slate-700 space-y-2">
        <h3 className="font-bold text-slate-900">Key Takeaway</h3>
        <p className="text-xs leading-relaxed text-slate-600">
          A successful budget is not about never spending money; it is about choosing what matters most to you. When you plan where every dollar goes before the month begins, you take control of your financial future.
        </p>
      </section>
    </div>
  );
}

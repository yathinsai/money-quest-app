import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Info,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Package,
  Layers
} from 'lucide-react';
import FormField from '../components/FormField';
import StatusBadge from '../components/StatusBadge';
import Quiz from '../components/Quiz';
import { calculateBusinessProfit } from '../utils/calculations';
import { formatCurrency, formatUnits } from '../utils/formatters';
import { businessProfitQuestions } from '../data/businessProfitQuestions';

const BUSINESS_TEMPLATES = [
  { name: 'Lemonade Stand', price: 2.5, varCost: 0.75, fixedCost: 25, units: 30 },
  { name: 'Custom Stickers', price: 4.0, varCost: 1.2, fixedCost: 50, units: 45 },
  { name: 'T-Shirt Printing', price: 22.0, varCost: 9.0, fixedCost: 180, units: 25 },
];

export default function BusinessProfit() {
  const [sellingPrice, setSellingPrice] = useState(5.0);
  const [variableCost, setVariableCost] = useState(2.0);
  const [fixedCosts, setFixedCosts] = useState(60.0);
  const [unitsSold, setUnitsSold] = useState(25);

  const businessResult = calculateBusinessProfit(sellingPrice, unitsSold, variableCost, fixedCosts);

  const handleApplyTemplate = (tpl) => {
    setSellingPrice(tpl.price);
    setVariableCost(tpl.varCost);
    setFixedCosts(tpl.fixedCost);
    setUnitsSold(tpl.units);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Module 3</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Business Profit & Break-Even
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Learn how real businesses turn sales into profit, manage costs, and reach their break-even target.
        </p>
      </div>

      {/* Lesson & Worked Example */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">1. Learn the Core Rules of Business Math</h2>
        <div className="prose prose-slate text-sm text-slate-600 space-y-4">
          <p>
            Many people confuse <strong>Revenue</strong> with <strong>Profit</strong>. Revenue is all the money you
            collect from your customers at the register. But before you can take any money home, you must pay all your costs!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Fixed Costs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Costs that stay the same no matter how many items you sell (e.g., table rental, equipment purchase, website domain).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Variable Costs</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Costs that increase with every single unit made (e.g., cups, lemons, packaging, blank t-shirts).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Break-Even Point</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The exact number of sales needed where Total Revenue equals Total Cost ($0 profit, $0 loss). Past this point, you make profit!
              </p>
            </div>
          </div>
        </div>

        {/* Worked Example */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
          <div className="flex items-center gap-2 font-bold mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Worked Example: Jordan's Handmade Keychains</span>
          </div>
          <div className="text-slate-700 leading-relaxed space-y-1">
            <p>• Selling Price = $8 per keychain | Variable Cost = $3 for metal and ring</p>
            <p>• Fixed Costs = $50 for tools and table permit</p>
            <p>• Contribution per unit = $8 - $3 = <strong>$5.00</strong></p>
            <p>• Break-Even = $50 ÷ $5 = <strong>10 keychains</strong></p>
            <p>If Jordan sells 15 keychains: Revenue is $120, Costs are $95, and <strong>Profit is $25</strong>.</p>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">2. Business Profit Simulator</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Set your pricing, production costs, and sales volume to see if your business makes money.
          </p>
        </div>

        {/* Templates */}
        <div>
          <span className="text-xs font-semibold text-slate-600 block mb-2">Load a Business Example:</span>
          <div className="flex flex-wrap gap-2">
            {BUSINESS_TEMPLATES.map((tpl) => (
              <button
                key={tpl.name}
                type="button"
                onClick={() => handleApplyTemplate(tpl)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 transition-colors"
              >
                {tpl.name}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <FormField
            id="selling-price"
            label="Selling Price / Unit"
            prefix="$"
            step="0.25"
            value={sellingPrice}
            onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value) || 0))}
            hint="Customer price"
          />

          <FormField
            id="variable-cost"
            label="Variable Cost / Unit"
            prefix="$"
            step="0.25"
            value={variableCost}
            onChange={(e) => setVariableCost(Math.max(0, Number(e.target.value) || 0))}
            hint="Materials per item"
          />

          <FormField
            id="fixed-costs"
            label="Total Fixed Costs"
            prefix="$"
            step="1"
            value={fixedCosts}
            onChange={(e) => setFixedCosts(Math.max(0, Number(e.target.value) || 0))}
            hint="Equipment, rent, permits"
          />

          <div>
            <FormField
              id="units-sold"
              label="Units Sold"
              suffix="items"
              min={0}
              step="1"
              value={unitsSold}
              onChange={(e) => setUnitsSold(Math.max(0, Math.round(Number(e.target.value) || 0)))}
              hint="Total units manufactured & sold"
            />
            <input
              type="range"
              min="0"
              max="150"
              step="1"
              value={unitsSold}
              onChange={(e) => setUnitsSold(Number(e.target.value))}
              className="w-full mt-2 accent-emerald-600"
              aria-label="Units sold slider"
            />
          </div>
        </div>

        {/* Warning if selling price <= variable cost */}
        {!businessResult.canBreakEven && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs sm:text-sm text-rose-950 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Unsustainable Price Warning: </span>
              Your selling price (${sellingPrice.toFixed(2)}) is less than or equal to your variable cost (${variableCost.toFixed(2)})!
              You lose money on every unit made. You must raise your selling price or lower your material costs.
            </div>
          </div>
        )}

        {/* Financial Results Dashboard */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Total Revenue</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(businessResult.revenue)}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">{unitsSold} × ${sellingPrice.toFixed(2)}</span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Total Costs</span>
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(businessResult.totalCost)}</span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                ${businessResult.variableCosts.toFixed(2)} var + ${fixedCosts.toFixed(2)} fixed
              </span>
            </div>

            <div
              className={`p-4 rounded-xl border ${
                businessResult.profit > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : businessResult.profit === 0
                  ? 'bg-blue-50 border-blue-200 text-blue-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <span className="text-xs font-semibold block opacity-80">Net Profit / Loss</span>
              <span className="text-2xl font-extrabold">{formatCurrency(businessResult.profit)}</span>
              <span className="text-[11px] block mt-0.5 font-medium">
                {businessResult.profit > 0 ? '✓ Profitable Business' : businessResult.profit === 0 ? 'Balanced ($0 Profit)' : 'Operating at a Loss'}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 block">Break-Even Target</span>
              <span className="text-2xl font-bold text-slate-900">
                {businessResult.canBreakEven ? `${businessResult.breakEvenUnits} units` : 'N/A'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                {businessResult.canBreakEven ? `$${businessResult.contributionMargin.toFixed(2)} margin/unit` : 'Price too low'}
              </span>
            </div>
          </div>

          {/* Strategy Tip Message */}
          <div
            className={`p-4 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2.5 ${
              businessResult.profit > 0
                ? 'bg-emerald-100/70 text-emerald-900'
                : 'bg-amber-100/70 text-amber-900'
            }`}
          >
            {businessResult.profit > 0 ? (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-700" />
            ) : (
              <AlertCircle className="w-5 h-5 shrink-0 text-amber-700" />
            )}
            <span>{businessResult.breakEvenMessage}</span>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">3. Test Your Knowledge: Business Profit Quiz</h2>
          <p className="text-xs text-slate-500">Test your mastery of revenue, variable costs, and break-even points.</p>
        </div>
        <Quiz
          moduleId="businessProfit"
          moduleTitle="Business Profit & Break-Even"
          questions={businessProfitQuestions}
        />
      </section>

      {/* Summary Box */}
      <section className="bg-slate-100 rounded-2xl p-6 text-sm text-slate-700 space-y-2">
        <h3 className="font-bold text-slate-900">Key Takeaway</h3>
        <p className="text-xs leading-relaxed text-slate-600">
          A business is only healthy when its selling price comfortably exceeds variable costs, and sales volume is high enough to cover fixed overhead. Understanding break-even allows entrepreneurs to price products confidently.
        </p>
      </section>
    </div>
  );
}

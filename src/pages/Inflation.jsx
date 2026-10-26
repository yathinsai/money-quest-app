import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Info,
  DollarSign,
  Calendar,
  Percent,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import FormField from '../components/FormField';
import Quiz from '../components/Quiz';
import { calculateFuturePrice } from '../utils/calculations';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { inflationQuestions } from '../data/inflationQuestions';

const PRESETS = [
  { name: 'Slice of Pizza', price: 3.5 },
  { name: 'Movie Ticket', price: 14.0 },
  { name: 'Video Game', price: 70.0 },
  { name: 'Gaming Laptop', price: 1200.0 },
];

export default function Inflation() {
  const [currentPrice, setCurrentPrice] = useState(15);
  const [annualRate, setAnnualRate] = useState(3.5);
  const [years, setYears] = useState(10);

  // Pure compound calculation
  const inflationResult = calculateFuturePrice(currentPrice, annualRate, years);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-3">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Module 2</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Inflation & Purchasing Power
        </h1>
        <p className="mt-2 text-base text-slate-600">
          Discover why prices rise over time and what it means for the value of your savings.
        </p>
      </div>

      {/* Lesson & Worked Example */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-slate-900">1. Learn the Concept: The Shrinking Dollar</h2>
        <div className="prose prose-slate text-sm text-slate-600 space-y-4">
          <p>
            Have you ever heard an older relative say, <em>"Back in my day, a movie ticket was only two dollars!"</em>?
            That is not just nostalgia — it is the effect of <strong>inflation</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">What is Purchasing Power?</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Purchasing power is the quantity of goods or services that one dollar can buy. When inflation causes general prices to go up, your dollar buys fewer items than before.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm mb-1">Why Compound Math Matters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Inflation compounds like interest. A 3% increase this year applies to next year’s higher price, snowballing over 10, 20, or 30 years into substantial price increases.
              </p>
            </div>
          </div>
        </div>

        {/* Worked Example */}
        <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs sm:text-sm text-emerald-950">
          <div className="flex items-center gap-2 font-bold mb-1">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>Worked Example: A $10 Book Over 10 Years</span>
          </div>
          <p className="text-slate-700 leading-relaxed">
            If a book costs <strong>$10.00</strong> today and inflation averages <strong>3% per year</strong>:
            <br />
            Formula: <code>$10.00 × (1 + 0.03)¹⁰ = $13.44</code>
            <br />
            In 10 years, you will need <strong>$13.44</strong> to buy the exact same book!
          </p>
        </div>

        {/* Disclaimer Callout */}
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 flex items-start gap-3 text-xs text-amber-950">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Important Modeling Note: </span>
            This calculator demonstrates a mathematical scenario. In the real world, inflation rates fluctuate every year based on oil prices, supply chains, interest rates, and consumer demand.
          </div>
        </div>
      </section>

      {/* Interactive Simulator */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900">2. Future Price Simulator</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Adjust the sliders and numbers below to calculate how inflation impacts future prices.
          </p>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-semibold text-slate-600 block mb-2">Try a Quick Preset:</span>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => setCurrentPrice(preset.price)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-slate-200 transition-colors"
              >
                {preset.name} (${preset.price})
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <FormField
            id="current-price"
            label="Current Price"
            prefix="$"
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Math.max(0, Number(e.target.value) || 0))}
            hint="Price of item today"
          />

          <div>
            <FormField
              id="inflation-rate"
              label="Annual Inflation Rate (%)"
              suffix="%"
              step="0.1"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value) || 0)}
              hint="US historical avg is ~2.5% to 3.5%"
            />
            <input
              type="range"
              min="0"
              max="15"
              step="0.5"
              value={annualRate}
              onChange={(e) => setAnnualRate(Number(e.target.value))}
              className="w-full mt-2 accent-emerald-600"
              aria-label="Inflation rate slider"
            />
          </div>

          <div>
            <FormField
              id="years"
              label="Years into the Future"
              suffix="yrs"
              min={0}
              max={50}
              value={years}
              onChange={(e) => setYears(Math.max(0, Math.round(Number(e.target.value) || 0)))}
              hint="How long until you buy it"
            />
            <input
              type="range"
              min="1"
              max="40"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full mt-2 accent-emerald-600"
              aria-label="Years slider"
            />
          </div>
        </div>

        {/* Calculation Output Card */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Today's Price</span>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(currentPrice)}</p>
            </div>

            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              <span>Over {years} Years at {annualRate}%</span>
              <ArrowRight className="w-4 h-4" />
            </div>

            <div className="text-center sm:text-right">
              <span className="text-xs uppercase tracking-wider font-bold text-emerald-700">Projected Future Price</span>
              <p className="text-3xl font-extrabold text-emerald-800">{formatCurrency(inflationResult.futurePrice)}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">Extra Cash Needed:</span>
              <span>
                You will need <strong className="text-slate-900">+{formatCurrency(inflationResult.priceDifference)}</strong> more
                ({formatPercent(inflationResult.percentIncrease)} increase) to buy the exact same item.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="font-bold text-slate-800 block mb-0.5">Purchasing Power Impact:</span>
              <span>
                A fixed dollar amount saved without earning interest would lose{' '}
                <strong className="text-rose-700">{formatPercent(inflationResult.purchasingPowerLostPercent)}</strong> of its buying capability.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">3. Test Your Knowledge: Inflation Quiz</h2>
          <p className="text-xs text-slate-500">Test how well you understand purchasing power and inflation math.</p>
        </div>
        <Quiz
          moduleId="inflation"
          moduleTitle="Inflation & Purchasing Power"
          questions={inflationQuestions}
        />
      </section>

      {/* Summary Box */}
      <section className="bg-slate-100 rounded-2xl p-6 text-sm text-slate-700 space-y-2">
        <h3 className="font-bold text-slate-900">Key Takeaway</h3>
        <p className="text-xs leading-relaxed text-slate-600">
          Inflation is why keeping all your long-term savings in cash under a mattress is risky over decades. To preserve your wealth, your money eventually needs to grow at a rate equal to or higher than inflation.
        </p>
      </section>
    </div>
  );
}

/**
 * Pure calculation utilities for MoneyQuest financial simulators.
 * All functions are pure, deterministic, and free of side-effects.
 */

/**
 * Validates and sanitizes a numeric input to be non-negative and finite.
 * @param {any} value 
 * @param {number} fallback 
 * @returns {number}
 */
export function sanitizeNonNegative(value, fallback = 0) {
  const num = Number(value);
  if (isNaN(num) || !isFinite(num) || num < 0) {
    return fallback;
  }
  return num;
}

/**
 * Calculates budget status, total expenses, remaining balance, and savings rate.
 * @param {number} income - Total fictional income
 * @param {Array<{id: string, name: string, amount: number}> | Record<string, number>} expenses
 * @returns {{
 *   totalIncome: number,
 *   totalExpenses: number,
 *   remainingMoney: number,
 *   savingsRate: number,
 *   status: 'surplus' | 'balanced' | 'deficit',
 *   statusMessage: string
 * }}
 */
export function calculateBudget(income, expenses) {
  const cleanIncome = sanitizeNonNegative(income, 0);
  
  let totalExpenses = 0;
  if (Array.isArray(expenses)) {
    totalExpenses = expenses.reduce((sum, item) => sum + sanitizeNonNegative(item.amount, 0), 0);
  } else if (expenses && typeof expenses === 'object') {
    totalExpenses = Object.values(expenses).reduce((sum, val) => sum + sanitizeNonNegative(val, 0), 0);
  }

  const remainingMoney = cleanIncome - totalExpenses;
  
  let savingsRate = 0;
  if (cleanIncome > 0 && remainingMoney > 0) {
    savingsRate = (remainingMoney / cleanIncome) * 100;
  }

  let status = 'balanced';
  let statusMessage = 'Every dollar has a job! Income equals planned expenses.';

  if (remainingMoney > 0) {
    status = 'surplus';
    statusMessage = 'Great job! Planned spending is below income. You have room to save or invest.';
  } else if (remainingMoney < 0) {
    status = 'deficit';
    statusMessage = 'Warning: Planned spending exceeds income. Consider cutting wants to balance your budget.';
  }

  return {
    totalIncome: cleanIncome,
    totalExpenses,
    remainingMoney,
    savingsRate: Math.round(savingsRate * 10) / 10,
    status,
    statusMessage
  };
}

/**
 * Calculates projected future price under compound inflation.
 * Formula: futurePrice = currentPrice * (1 + rate / 100) ** years
 * @param {number} currentPrice - Current price in dollars
 * @param {number} annualRatePercent - Annual inflation percentage (e.g., 3 for 3%)
 * @param {number} years - Number of elapsed years
 * @returns {{
 *   currentPrice: number,
 *   annualRate: number,
 *   years: number,
 *   futurePrice: number,
 *   priceDifference: number,
 *   percentIncrease: number,
 *   purchasingPowerLostPercent: number
 * }}
 */
export function calculateFuturePrice(currentPrice, annualRatePercent, years) {
  const cleanPrice = sanitizeNonNegative(currentPrice, 0);
  const cleanYears = sanitizeNonNegative(years, 0);
  const cleanRate = sanitizeNonNegative(annualRatePercent, 0);

  const decimalRate = cleanRate / 100;
  const factor = Math.pow(1 + decimalRate, cleanYears);
  const futurePrice = cleanPrice * factor;
  const priceDifference = futurePrice - cleanPrice;

  const percentIncrease = cleanPrice > 0 ? ((futurePrice - cleanPrice) / cleanPrice) * 100 : 0;
  
  // Purchasing power of the same fixed dollar amount over time
  // $100 in future buys what ($100 / factor) buys today
  const purchasingPowerRetained = factor > 0 ? (1 / factor) * 100 : 0;
  const purchasingPowerLostPercent = Math.max(0, 100 - purchasingPowerRetained);

  return {
    currentPrice: cleanPrice,
    annualRate: cleanRate,
    years: cleanYears,
    futurePrice: Math.round(futurePrice * 100) / 100,
    priceDifference: Math.round(priceDifference * 100) / 100,
    percentIncrease: Math.round(percentIncrease * 10) / 10,
    purchasingPowerLostPercent: Math.round(purchasingPowerLostPercent * 10) / 10
  };
}

/**
 * Calculates business revenue, costs, profit, and break-even units.
 * @param {number} sellingPrice - Price per unit sold
 * @param {number} unitsSold - Quantity sold
 * @param {number} variableCostPerUnit - Direct cost to produce one unit
 * @param {number} fixedCosts - Ongoing costs regardless of production (e.g., rent, equipment)
 * @returns {{
 *   revenue: number,
 *   variableCosts: number,
 *   fixedCosts: number,
 *   totalCost: number,
 *   profit: number,
 *   isProfitable: boolean,
 *   contributionMargin: number,
 *   canBreakEven: boolean,
 *   breakEvenUnits: number | null,
 *   breakEvenMessage: string
 * }}
 */
export function calculateBusinessProfit(sellingPrice, unitsSold, variableCostPerUnit, fixedCosts) {
  const cleanPrice = sanitizeNonNegative(sellingPrice, 0);
  const cleanUnits = sanitizeNonNegative(unitsSold, 0);
  const cleanVarCost = sanitizeNonNegative(variableCostPerUnit, 0);
  const cleanFixedCost = sanitizeNonNegative(fixedCosts, 0);

  const revenue = cleanPrice * cleanUnits;
  const variableCosts = cleanVarCost * cleanUnits;
  const totalCost = variableCosts + cleanFixedCost;
  const profit = revenue - totalCost;

  const contributionMargin = cleanPrice - cleanVarCost;
  let canBreakEven = false;
  let breakEvenUnits = null;
  let breakEvenMessage = '';

  if (contributionMargin > 0) {
    canBreakEven = true;
    breakEvenUnits = Math.ceil(cleanFixedCost / contributionMargin);
    if (cleanUnits >= breakEvenUnits) {
      breakEvenMessage = `You are past break-even (${breakEvenUnits} units needed). Every extra unit adds $${contributionMargin.toFixed(2)} in profit!`;
    } else {
      breakEvenMessage = `You need to sell ${breakEvenUnits} units to cover all costs. You are currently ${breakEvenUnits - cleanUnits} units away.`;
    }
  } else if (contributionMargin === 0) {
    breakEvenMessage = 'Selling price equals variable cost per unit. You cannot cover fixed costs at this price.';
  } else {
    breakEvenMessage = 'Warning: Selling price is below variable cost per unit. You lose money on every unit sold!';
  }

  return {
    revenue: Math.round(revenue * 100) / 100,
    variableCosts: Math.round(variableCosts * 100) / 100,
    fixedCosts: cleanFixedCost,
    totalCost: Math.round(totalCost * 100) / 100,
    profit: Math.round(profit * 100) / 100,
    isProfitable: profit > 0,
    contributionMargin: Math.round(contributionMargin * 100) / 100,
    canBreakEven,
    breakEvenUnits,
    breakEvenMessage
  };
}

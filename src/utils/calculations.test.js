import { describe, it, expect } from 'vitest';
import {
  calculateBudget,
  calculateFuturePrice,
  calculateBusinessProfit,
  sanitizeNonNegative
} from './calculations.js';

describe('Financial Calculation Utilities', () => {
  describe('sanitizeNonNegative', () => {
    it('returns valid positive numbers', () => {
      expect(sanitizeNonNegative(50)).toBe(50);
      expect(sanitizeNonNegative('25.5')).toBe(25.5);
    });

    it('falls back to 0 for negative numbers or invalid input', () => {
      expect(sanitizeNonNegative(-10)).toBe(0);
      expect(sanitizeNonNegative('not-a-number')).toBe(0);
      expect(sanitizeNonNegative(null)).toBe(0);
      expect(sanitizeNonNegative(undefined)).toBe(0);
    });
  });

  describe('calculateBudget', () => {
    it('correctly calculates surplus budget', () => {
      const expenses = [
        { id: '1', name: 'Snacks', amount: 30 },
        { id: '2', name: 'Games', amount: 20 }
      ];
      const result = calculateBudget(100, expenses);
      expect(result.totalIncome).toBe(100);
      expect(result.totalExpenses).toBe(50);
      expect(result.remainingMoney).toBe(50);
      expect(result.savingsRate).toBe(50);
      expect(result.status).toBe('surplus');
    });

    it('correctly handles balanced budget', () => {
      const expenses = [{ id: '1', name: 'School Supplies', amount: 40 }];
      const result = calculateBudget(40, expenses);
      expect(result.remainingMoney).toBe(0);
      expect(result.savingsRate).toBe(0);
      expect(result.status).toBe('balanced');
    });

    it('correctly handles deficit (over-budget)', () => {
      const expenses = [{ id: '1', name: 'Concert Ticket', amount: 120 }];
      const result = calculateBudget(100, expenses);
      expect(result.remainingMoney).toBe(-20);
      expect(result.savingsRate).toBe(0);
      expect(result.status).toBe('deficit');
    });

    it('safely handles zero income and empty expenses', () => {
      const result = calculateBudget(0, []);
      expect(result.totalIncome).toBe(0);
      expect(result.totalExpenses).toBe(0);
      expect(result.remainingMoney).toBe(0);
      expect(result.savingsRate).toBe(0);
      expect(result.status).toBe('balanced');
    });
  });

  describe('calculateFuturePrice (Inflation)', () => {
    it('calculates compound growth accurately', () => {
      // $100 at 5% inflation for 2 years = 100 * (1.05)^2 = 110.25
      const result = calculateFuturePrice(100, 5, 2);
      expect(result.futurePrice).toBe(110.25);
      expect(result.priceDifference).toBe(10.25);
      expect(result.percentIncrease).toBe(10.3); // rounded to 1 decimal
    });

    it('handles 0 years (no price change)', () => {
      const result = calculateFuturePrice(50, 3, 0);
      expect(result.futurePrice).toBe(50);
      expect(result.priceDifference).toBe(0);
    });

    it('handles 0% inflation rate', () => {
      const result = calculateFuturePrice(75, 0, 10);
      expect(result.futurePrice).toBe(75);
      expect(result.priceDifference).toBe(0);
    });
  });

  describe('calculateBusinessProfit & Break-Even', () => {
    it('calculates profitable business with break-even units', () => {
      // Selling price: $10, variable cost: $4, fixed costs: $120, units sold: 30
      // Contribution margin = 10 - 4 = $6
      // Break even = ceil(120 / 6) = 20 units
      // Revenue = 10 * 30 = $300
      // Total cost = (4 * 30) + 120 = $240
      // Profit = 300 - 240 = $60
      const result = calculateBusinessProfit(10, 30, 4, 120);
      expect(result.revenue).toBe(300);
      expect(result.totalCost).toBe(240);
      expect(result.profit).toBe(60);
      expect(result.isProfitable).toBe(true);
      expect(result.contributionMargin).toBe(6);
      expect(result.canBreakEven).toBe(true);
      expect(result.breakEvenUnits).toBe(20);
    });

    it('detects loss when units sold are below break-even', () => {
      // Same parameters as above, but only 10 units sold
      const result = calculateBusinessProfit(10, 10, 4, 120);
      expect(result.revenue).toBe(100);
      expect(result.totalCost).toBe(160);
      expect(result.profit).toBe(-60);
      expect(result.isProfitable).toBe(false);
      expect(result.breakEvenUnits).toBe(20);
    });

    it('handles edge case where selling price is less than variable cost', () => {
      // Selling price: $5, variable cost: $8, fixed: $100
      // Contribution margin = -3
      const result = calculateBusinessProfit(5, 10, 8, 100);
      expect(result.canBreakEven).toBe(false);
      expect(result.breakEvenUnits).toBeNull();
      expect(result.profit).toBe(-130);
    });

    it('handles edge case where selling price equals variable cost', () => {
      // Selling price: $5, variable cost: $5, fixed: $100
      const result = calculateBusinessProfit(5, 10, 5, 100);
      expect(result.canBreakEven).toBe(false);
      expect(result.breakEvenUnits).toBeNull();
      expect(result.profit).toBe(-100);
    });
  });
});

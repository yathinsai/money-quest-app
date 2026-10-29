import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App page titles', () => {
  it.each([
    ['#/', 'MoneyQuest | Financial Literacy for Students'],
    ['#/budgeting', 'Budgeting & Cash Flow | MoneyQuest'],
    ['#/inflation', 'Inflation & Purchasing Power | MoneyQuest'],
    ['#/profit', 'Business Profit & Break-Even | MoneyQuest'],
    ['#/progress', 'Your Learning Progress | MoneyQuest'],
    ['#/about', 'About & Sources | MoneyQuest'],
    ['#/missing-page', 'Page Not Found | MoneyQuest'],
  ])('sets a descriptive title for %s', async (hash, expectedTitle) => {
    window.location.hash = hash;
    render(<App />);

    await waitFor(() => expect(document.title).toBe(expectedTitle));
  });
});

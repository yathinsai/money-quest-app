export const businessProfitQuestions = [
  {
    id: 'p1',
    difficulty: 'beginner',
    question: 'What is the key difference between Revenue and Profit?',
    options: [
      'Revenue is the total money collected from sales; profit is what remains after paying all expenses.',
      'Revenue only counts credit card payments; profit only counts cash.',
      'Revenue is always smaller than profit.',
      'Revenue and profit mean the exact same thing.'
    ],
    correctIndex: 0,
    explanation: 'Revenue (also called "top line") is total sales money before paying anything. Profit ("bottom line") is Revenue minus Total Costs.'
  },
  {
    id: 'p2',
    difficulty: 'beginner',
    question: 'Which of the following is the best example of a "fixed cost" for a lemonade stand?',
    options: [
      'The fresh lemons and sugar bought for each glass of lemonade.',
      'The paper cups used for each serving.',
      'A $15 wooden table and sign banner bought once to set up the stand.',
      'The ice cubes that melt when poured into a glass.'
    ],
    correctIndex: 2,
    explanation: 'Fixed costs remain the same regardless of how many units you sell (like tables, booth fees, or website hosting). Lemons, sugar, and cups are variable costs because you need more of them with every glass sold.'
  },
  {
    id: 'p3',
    difficulty: 'advanced',
    question: 'You sell handmade bracelets for $10 each. The beads for each bracelet cost $4. Your table rental fee is $30. What is your break-even point?',
    options: [
      '3 bracelets',
      '5 bracelets',
      '10 bracelets',
      '30 bracelets'
    ],
    correctIndex: 1,
    explanation: 'Contribution margin per bracelet = $10 selling price - $4 variable cost = $6. Break-even units = Fixed Costs / Contribution Margin = $30 / $6 = 5 bracelets.'
  },
  {
    id: 'p4',
    difficulty: 'intermediate',
    question: 'What happens if a baker sells cupcakes for $2 each, but the flour, sugar, and frosting cost $2.50 per cupcake?',
    options: [
      'The bakery breaks even on the 100th cupcake.',
      'The baker makes a 50-cent profit per cupcake.',
      'The baker loses 50 cents on every single cupcake and can never break even.',
      'The fixed costs automatically drop to zero.'
    ],
    correctIndex: 2,
    explanation: 'When the selling price is less than variable cost per unit ($2.00 < $2.50), the contribution margin is negative (-$0.50). Selling more cupcakes only increases total losses!'
  },
  {
    id: 'p5',
    difficulty: 'intermediate',
    question: 'If you sell 50 custom t-shirts at $20 each (Revenue = $1,000), and total costs (shirts + printing screen) are $650, what is your net profit?',
    options: [
      '$1,650',
      '$350',
      '$650',
      '$1,000'
    ],
    correctIndex: 1,
    explanation: 'Profit = Total Revenue - Total Cost = $1,000 - $650 = $350.'
  }
];

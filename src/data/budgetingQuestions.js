export const budgetingQuestions = [
  {
    id: 'b1',
    difficulty: 'beginner',
    question: 'What is the main difference between a "need" and a "want"?',
    options: [
      'Needs are things essential for living and health; wants are things that are nice to have.',
      'Needs are always expensive, while wants are always cheap.',
      'Needs only apply to adults, while wants apply to teenagers.',
      'Needs are bought with cash, while wants must be bought with a credit card.'
    ],
    correctIndex: 0,
    explanation: 'Needs are essentials like food, shelter, warm clothes, and basic healthcare. Wants are extras (like video games, eating out, or brand-name sneakers) that bring joy but are not required to survive.'
  },
  {
    id: 'b2',
    difficulty: 'intermediate',
    question: 'If you earn $50 from weekend chores and plan to spend $20 on snacks, $15 on movies, and $25 on a new game, what is your budget status?',
    options: [
      'You have a $10 surplus (extra money).',
      'You are perfectly balanced at $0.',
      'You have a $10 deficit (spending more than you earn).',
      'You have saved 50% of your earnings.'
    ],
    correctIndex: 2,
    explanation: 'Total planned spending is $20 + $15 + $25 = $60. Since your income is only $50, you are $10 over budget ($50 - $60 = -$10 deficit).'
  },
  {
    id: 'b3',
    difficulty: 'beginner',
    question: 'What does "paying yourself first" mean in budgeting?',
    options: [
      'Buying whatever you want before paying your bills.',
      'Putting a planned amount directly into savings as soon as you earn money, before spending on wants.',
      'Giving cash gifts to your friends first.',
      'Hiding money under your mattress so nobody can see it.'
    ],
    correctIndex: 1,
    explanation: 'Paying yourself first means treating savings like an essential goal: you move money into savings right away, rather than hoping there is something left over at the end of the month.'
  },
  {
    id: 'b4',
    difficulty: 'advanced',
    question: 'Why should you avoid counting the same savings amount as both an "expense" and "available money to spend"?',
    options: [
      'Because the bank will close your account.',
      'Because it double-counts the money, making you think you have more cash than you really do.',
      'Because money in savings automatically loses 50% of its value.',
      'Because taxes will be deducted twice.'
    ],
    correctIndex: 1,
    explanation: 'If you allocate $20 into savings and also leave it in your spending wallet, you are counting the exact same $20 twice. A sound budget gives every single dollar only one job.'
  },
  {
    id: 'b5',
    difficulty: 'intermediate',
    question: 'What is the best way to handle an unexpected expense (like a broken bicycle tire)?',
    options: [
      'Borrow money with high-interest loans immediately.',
      'Ignore it and stop budgeting completely.',
      'Use money from an emergency or rainy-day fund set aside in your budget.',
      'Spend next month’s rent money today.'
    ],
    correctIndex: 2,
    explanation: 'An emergency fund is a pool of saved money specifically reserved for unplanned surprises, protecting your everyday budget from breaking down.'
  }
];

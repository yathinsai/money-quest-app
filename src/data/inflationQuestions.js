export const inflationQuestions = [
  {
    id: 'i1',
    question: 'What is inflation in simple terms?',
    options: [
      'The process of banks printing shiny new gold coins.',
      'A general increase in prices over time, which reduces the purchasing power of your money.',
      'A guaranteed way to make all investments double in value each year.',
      'When your wallet gets physically larger from holding too many dollar bills.'
    ],
    correctIndex: 1,
    explanation: 'Inflation means everyday goods and services cost more money on average. When prices rise, each dollar buys fewer items than it used to (purchasing power goes down).'
  },
  {
    id: 'i2',
    question: 'If a concert ticket costs $50 today and annual inflation averages 10% per year, what will the ticket cost in 2 years under compound inflation?',
    options: [
      '$60.50',
      '$55.00',
      '$70.00',
      '$50.10'
    ],
    correctIndex: 0,
    explanation: 'Year 1: $50 × 1.10 = $55.00. Year 2: $55.00 × 1.10 = $60.50. Compound inflation applies to the new increased price each year, not just the original price.'
  },
  {
    id: 'i3',
    question: 'If your savings account pays 1% interest per year, but inflation is 4% per year, what happens to your purchasing power?',
    options: [
      'Your purchasing power increases by 3% every year.',
      'Your purchasing power stays exactly the same.',
      'Your purchasing power decreases because prices are rising faster than your money is growing.',
      'Your bank balance decreases into negative numbers.'
    ],
    correctIndex: 2,
    explanation: 'Even though your account balance grows by 1%, prices grew by 4%. The "real" return is approximately 1% - 4% = -3%, meaning you can afford fewer goods over time.'
  },
  {
    id: 'i4',
    question: 'Which of the following people is typically hurt most by high inflation?',
    options: [
      'Someone living on a fixed income who does not get raises as prices rise.',
      'A person who borrows money with a fixed low interest rate.',
      'A business owner who can immediately raise prices on luxury goods.',
      'Someone who owns valuable real estate that increases in price.'
    ],
    correctIndex: 0,
    explanation: 'People on fixed incomes (like retirees on fixed pensions) receive the exact same dollar amount each month, so when prices surge, they can afford less and less.'
  },
  {
    id: 'i5',
    question: 'Why do future-price calculators represent mathematical scenarios rather than exact forecasts?',
    options: [
      'Because the calculators make up numbers randomly.',
      'Because actual inflation fluctuates constantly based on economic factors, technology, supply, and demand.',
      'Because future prices are legally required to drop every 5 years.',
      'Because compound math does not work on currency.'
    ],
    correctIndex: 1,
    explanation: 'Calculators use constant mathematical rates (like assuming exactly 3% every year). In the real world, inflation goes up and down due to supply chains, energy costs, and policy.'
  }
];

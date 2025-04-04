// Mock user data
export const users = [
  { "userId": "parent_001", "role": "Parent", "name": "Mum" },
  { "userId": "co_parent_001", "role": "Co-Parent", "name": "Dad" },
  { "userId": "child_001", "role": "Child", "name": "Sophie" }
];

// Mock portfolio data
export const portfolioData = {
  portfolioValue: 3200,
  monthlyChange: 120,
  historicalValues: [
    { date: '2025-01-01', value: 3000 },
    { date: '2025-02-01', value: 3080 },
    { date: '2025-03-01', value: 3200 }
  ]
};

// Mock investment data
export const investmentsData = [
  {
    symbol: 'AAPL',
    name: 'Apple',
    logoUrl: '/logos/apple.png',
    funFact: 'Apple sells over 1.5 billion devices worldwide.'
  },
  {
    symbol: 'NKE',
    name: 'Nike',
    logoUrl: '/logos/nike.png',
    funFact: 'Nike produces over 780 million pairs of shoes each year.'
  },
  {
    symbol: 'TSLA',
    name: 'Tesla',
    logoUrl: '/logos/tesla.png',
    funFact: 'Tesla\'s Model Y was the world\'s best-selling car in 2023.'
  }
];

// Mock chat messages
export const chatMessagesData = [
  {
    senderId: 'parent_001',
    role: 'Parent',
    message: 'Hey Sophie, your portfolio went up this month!',
    timestamp: '2025-03-20T08:35:00Z'
  },
  {
    senderId: 'child_001',
    role: 'Child',
    message: 'Yay! What does that mean?',
    timestamp: '2025-03-20T08:36:00Z'
  }
];

/**
 * Wealth management model for investment data analysis and AI insights
 */

/**
 * User Portfolio schema
 * @typedef {Object} UserPortfolio
 * @property {string} userId - ID of the user
 * @property {Array<Investment>} investments - Array of user investments
 * @property {Object} cashBalance - Cash balance in the account
 * @property {Object} marketInsights - AI-generated market insights
 */

/**
 * Investment schema
 * @typedef {Object} Investment
 * @property {string} id - Investment ID
 * @property {string} type - Type of investment (e.g., "vehicle")
 * @property {string} name - Name of the investment
 * @property {number} amount - Amount invested
 * @property {number} acquisitionDate - When the investment was acquired
 * @property {Object} metrics - Performance metrics
 */

/**
 * Simple in-memory storage for user portfolios
 * In a production environment, this would be replaced with a database
 */
const userPortfolios = new Map();

/**
 * Sample vehicle data used for analysis and simulations
 */
const sampleVehicleData = [
  {
    id: 'v001',
    name: 'Porsche 911 GT3 RS',
    type: 'Sports Car',
    basePrice: 759000,
    monthlyRent: 15000,
    expectedROI: 15.2,
    annualYield: 8.5,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'strongly bullish',
    marketShare: 23.5
  },
  {
    id: 'v002',
    name: 'Tesla Model S Plaid',
    type: 'Electric Sedan',
    basePrice: 520000,
    monthlyRent: 12000,
    expectedROI: 18.7,
    annualYield: 9.2,
    riskLevel: 'medium',
    liquidity: 'medium',
    volatility: 'medium',
    marketTrend: 'bullish',
    marketShare: 15.8
  },
  {
    id: 'v003',
    name: 'Lamborghini Urus',
    type: 'Luxury SUV',
    basePrice: 850000,
    monthlyRent: 18000,
    expectedROI: 12.8,
    annualYield: 7.9,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'strongly bullish',
    marketShare: 28.3
  }
];

/**
 * Create a new user portfolio
 * @param {string} userId - ID of the user
 * @returns {UserPortfolio} The created portfolio
 */
const createUserPortfolio = (userId) => {
  const portfolio = {
    userId,
    investments: [],
    cashBalance: {
      total: 0,
      available: 0,
      currency: 'AED'
    },
    marketInsights: {},
    createdAt: new Date(),
    updatedAt: new Date()
  };

  userPortfolios.set(userId, portfolio);
  return portfolio;
};

/**
 * Get a user portfolio by ID
 * @param {string} userId - ID of the user
 * @returns {UserPortfolio|null} The portfolio or null if not found
 */
const getUserPortfolio = (userId) => {
  return userPortfolios.get(userId) || null;
};

/**
 * Get or create a user portfolio
 * @param {string} userId - ID of the user
 * @returns {UserPortfolio} The existing or new portfolio
 */
const getOrCreateUserPortfolio = (userId) => {
  let portfolio = getUserPortfolio(userId);
  if (!portfolio) {
    portfolio = createUserPortfolio(userId);
  }
  return portfolio;
};

/**
 * Update a user portfolio
 * @param {string} userId - ID of the user
 * @param {Object} updates - Updates to apply to the portfolio
 * @returns {UserPortfolio|null} Updated portfolio or null if not found
 */
const updateUserPortfolio = (userId, updates) => {
  const portfolio = userPortfolios.get(userId);
  if (!portfolio) return null;

  const updatedPortfolio = { ...portfolio, ...updates, updatedAt: new Date() };
  userPortfolios.set(userId, updatedPortfolio);
  return updatedPortfolio;
};

/**
 * Get sample vehicle data for analysis
 * @returns {Array} Array of vehicle data
 */
const getSampleVehicleData = () => {
  return [...sampleVehicleData];
};

/**
 * Get user's market data for analysis
 * @param {string} userId - ID of the user
 * @returns {Object} Market data for analysis
 */
const getUserMarketData = (userId) => {
  const portfolio = getOrCreateUserPortfolio(userId);
  
  // In a real implementation, we would fetch actual user data
  // For now, we'll use a combination of sample data and portfolio data
  return {
    portfolio: portfolio,
    marketData: {
      vehicles: getSampleVehicleData(),
      globalMarketMetrics: {
        overallGrowth: 15.8,
        luxurySegmentGrowth: 18.2,
        electricSegmentGrowth: 32.4,
        volatilityIndex: 23
      },
      trends: [
        { segment: 'Luxury SUV', trend: 'bullish', confidence: 85 },
        { segment: 'Sports Car', trend: 'very bullish', confidence: 92 },
        { segment: 'Electric Vehicle', trend: 'strongly bullish', confidence: 88 }
      ]
    },
    marketTrends: [
      { 
        category: 'Exotic Sports Cars', 
        growth: 12.4, 
        volatility: 5.8,
        demandIndex: 85,
        supplyIndex: 42
      },
      { 
        category: 'Luxury SUVs', 
        growth: 15.6, 
        volatility: 3.2,
        demandIndex: 92,
        supplyIndex: 65
      },
      { 
        category: 'Electric Performance Vehicles', 
        growth: 25.8, 
        volatility: 8.7,
        demandIndex: 78,
        supplyIndex: 38
      },
      { 
        category: 'Limited Edition Hypercars', 
        growth: 18.3, 
        volatility: 6.2,
        demandIndex: 95,
        supplyIndex: 15
      }
    ],
    economicFactors: {
      interestRates: 4.2,
      inflationRate: 3.8,
      luxuryConsumerConfidence: 72.5,
      investorSentiment: 'positive'
    },
    seasonalFactors: {
      currentSeason: getSeason(),
      seasonalDemandMultiplier: getSeasonalDemandMultiplier(),
      upcomingEvents: [
        "Monaco Grand Prix",
        "Pebble Beach Concours d'Elegance",
        "International Auto Show"
      ]
    }
  };
};

/**
 * Helper function to get current season
 * @returns {string} Current season
 */
function getSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Fall';
  return 'Winter';
}

/**
 * Helper function to get seasonal demand multiplier
 * @returns {number} Seasonal demand multiplier
 */
function getSeasonalDemandMultiplier() {
  const season = getSeason();
  switch (season) {
    case 'Spring': return 1.2;
    case 'Summer': return 1.5;
    case 'Fall': return 1.1;
    case 'Winter': return 0.8;
    default: return 1.0;
  }
}

module.exports = {
  createUserPortfolio,
  getUserPortfolio,
  getOrCreateUserPortfolio,
  updateUserPortfolio,
  getUserMarketData,
  getSampleVehicleData
};
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
    id: 'v004',
    name: 'Mercedes-AMG GT',
    type: 'Sports Car',
    basePrice: 680000,
    monthlyRent: 14500,
    expectedROI: 14.8,
    annualYield: 8.2,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'bullish',
    marketShare: 22.1,
    imageUrl: 'mercedes/amg-gt.jpg',
    description: 'The Mercedes-AMG GT combines elegance with brute force, delivering a sophisticated grand tourer experience with supercar credentials.'
  },
  {
    id: 'v005',
    name: 'Mercedes-AMG C63',
    type: 'Sports Sedan',
    basePrice: 380000,
    monthlyRent: 9000,
    expectedROI: 16.5,
    annualYield: 8.7,
    riskLevel: 'medium',
    liquidity: 'medium',
    volatility: 'medium',
    marketTrend: 'bullish',
    marketShare: 19.8,
    imageUrl: 'mercedes/c63.webp',
    description: 'The Mercedes-AMG C63 delivers supercar performance in a practical sedan package, with its handcrafted engine and race-derived technology.'
  },
  {
    id: 'v006',
    name: 'Mercedes-AMG C63 Red Edition',
    type: 'Sports Sedan',
    basePrice: 420000,
    monthlyRent: 10000,
    expectedROI: 17.2,
    annualYield: 9.0,
    riskLevel: 'medium',
    liquidity: 'medium',
    volatility: 'medium',
    marketTrend: 'bullish',
    marketShare: 16.3,
    imageUrl: 'mercedes/c63red.webp',
    description: 'The exclusive Red Edition of the Mercedes-AMG C63 adds distinctive styling and limited production numbers to an already potent performance sedan.'
  },
  {
    id: 'v007',
    name: 'Mercedes-Benz CLE',
    type: 'Luxury Coupe',
    basePrice: 310000,
    monthlyRent: 7500,
    expectedROI: 13.5,
    annualYield: 7.6,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'stable',
    marketShare: 14.2,
    imageUrl: 'mercedes/cle.jpg',
    description: 'The Mercedes-Benz CLE combines sleek coupe styling with advanced technology and refined comfort for a sophisticated driving experience.'
  },
  {
    id: 'v008',
    name: 'Mercedes-AMG E63',
    type: 'Executive Sports Sedan',
    basePrice: 450000,
    monthlyRent: 11000,
    expectedROI: 15.8,
    annualYield: 8.3,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'bullish',
    marketShare: 21.7,
    imageUrl: 'mercedes/e63.jpg',
    description: 'The Mercedes-AMG E63 blends executive luxury with raw performance, offering supercar acceleration in a sophisticated business sedan package.'
  },
  {
    id: 'v009',
    name: 'Mercedes-Benz EQS',
    type: 'Electric Luxury Sedan',
    basePrice: 580000,
    monthlyRent: 13500,
    expectedROI: 19.2,
    annualYield: 9.5,
    riskLevel: 'medium',
    liquidity: 'medium',
    volatility: 'medium',
    marketTrend: 'strongly bullish',
    marketShare: 17.9,
    imageUrl: 'mercedes/eqs.avif',
    description: 'The Mercedes-Benz EQS represents the future of luxury, combining electric performance with class-leading range and revolutionary technology.'
  },
  {
    id: 'v010',
    name: 'Mercedes-AMG G63',
    type: 'Luxury Off-Road SUV',
    basePrice: 920000,
    monthlyRent: 20000,
    expectedROI: 13.8,
    annualYield: 7.8,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'strongly bullish',
    marketShare: 26.5,
    imageUrl: 'mercedes/g63.webp',
    description: 'The Mercedes-AMG G63 is an icon of off-road capability transformed into a high-performance luxury vehicle with unmistakable presence.'
  },
  {
    id: 'v011',
    name: 'Mercedes-Benz G-Class',
    type: 'Luxury Off-Road SUV',
    basePrice: 780000,
    monthlyRent: 17000,
    expectedROI: 12.5,
    annualYield: 7.4,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'bullish',
    marketShare: 24.8,
    imageUrl: 'mercedes/gclass.avif',
    description: 'The Mercedes-Benz G-Class combines legendary off-road capability with luxurious appointments, creating an unmatched blend of ruggedness and refinement.'
  },
  {
    id: 'v012',
    name: 'Mercedes-Maybach S-Class',
    type: 'Ultra-Luxury Sedan',
    basePrice: 1250000,
    monthlyRent: 25000,
    expectedROI: 11.5,
    annualYield: 7.2,
    riskLevel: 'low',
    liquidity: 'medium',
    volatility: 'low',
    marketTrend: 'stable',
    marketShare: 18.9,
    imageUrl: 'mercedes/maybach.avif',
    description: 'The Mercedes-Maybach S-Class represents the pinnacle of automotive luxury, offering unparalleled comfort, craftsmanship, and exclusivity.'
  },
  {
    id: 'v013',
    name: 'Alfa Romeo Giulia',
    type: 'Sports Sedan',
    basePrice: 340000,
    monthlyRent: 8500,
    expectedROI: 16.8,
    annualYield: 8.9,
    riskLevel: 'medium',
    liquidity: 'medium',
    volatility: 'medium',
    marketTrend: 'bullish',
    marketShare: 12.6,
    imageUrl: 'mercedes/romeo.jpg',
    description: 'The Alfa Romeo Giulia combines Italian passion with precision engineering, delivering emotional driving dynamics in a stylish sedan package.'
  },
  {
    id: 'v014',
    name: 'Mercedes-Benz S600',
    type: 'Luxury Sedan',
    basePrice: 680000,
    monthlyRent: 15500,
    expectedROI: 12.2,
    annualYield: 7.3,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'stable',
    marketShare: 20.4,
    imageUrl: 'mercedes/s600.jpg',
    description: 'The Mercedes-Benz S600 is the flagship of the S-Class range, offering V12 power combined with the latest technological innovations and supreme comfort.'
  },
  {
    id: 'v015',
    name: 'Mercedes-Benz S-Class',
    type: 'Luxury Sedan',
    basePrice: 520000,
    monthlyRent: 12500,
    expectedROI: 11.8,
    annualYield: 7.1,
    riskLevel: 'low',
    liquidity: 'high',
    volatility: 'low',
    marketTrend: 'stable',
    marketShare: 22.3,
    imageUrl: 'mercedes/sclass.jpg',
    description: 'The Mercedes-Benz S-Class sets the standard for luxury sedans, offering pioneering technology, exceptional comfort, and timeless design.'
  },
  {//add gac gs3 car with 699000 aed price
	id: 'v016',
	name: 'GAC GS3',
	type: ' SUV',
	basePrice: 69900,
	monthlyRent: 2000,
	expectedROI: 14.0,
	annualYield: 8.0,
	riskLevel: 'medium',
	liquidity: 'medium',
	volatility: 'medium',
	marketTrend: 'bullish',
	marketShare: 15.4,
	imageUrl: 'mercedes/gs3.webp',
	description: 'The GAC GS3 is a small SUV that combines modern design with advanced technology, offering a comfortable and stylish driving experience.'
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
 * Get all vehicles data including those with imageUrl properties
 * @returns {Array} Complete array of vehicle data
 */
const getAllVehicles = () => {
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
  getSampleVehicleData,
  getAllVehicles
};
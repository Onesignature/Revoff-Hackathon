const { Together } = require('together-ai');
const wealthModel = require('../models/wealthModel');

// Get API key from environment variables or use the hardcoded key as fallback
const apiKey = process.env.TOGETHER_API_KEY || 'ff8e705333943065084a798f10fa65f1f71a1447d9f2fd86c0b7df5d76dba8df';

// Log API key status (not the actual key for security)
console.log('In wealthController - API Key status:', apiKey ? 'Found' : 'Not found');

// Initialize Together client with API key
const togetherClient = new Together({
  apiKey: apiKey
});

/**
 * Analyze user's portfolio and investment opportunities using AI
 * @route POST /api/wealth/analyze
 * @access Public
 */
const analyzePortfolio = async (req, res) => {
  try {
    const { userId, analysisType } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }    // Get market data for analysis
    const marketData = wealthModel.getUserMarketData(userId);
    
    // Add randomization to the market data to ensure unique AI responses
    const randomizedMarketData = randomizeMarketData(marketData);

    // Set up system message based on analysis type
    let systemMessage = '';
    if (analysisType === 'risk') {
      systemMessage = 'You are an expert financial advisor specializing in risk analysis for luxury vehicle investments. Analyze the data and provide detailed risk assessment.';
    } else if (analysisType === 'opportunity') {
      systemMessage = 'You are an expert financial advisor specializing in identifying investment opportunities in the luxury vehicle market. Analyze the provided market data and user profile. Suggest a diverse list of top investment opportunities. Please ensure variety in the vehicle models you recommend, especially across different interactions, even if input data points share similarities. Focus on providing a fresh set of recommendations each time.';
    } else if (analysisType === 'performance') {
      systemMessage = 'You are an expert financial advisor specializing in evaluating portfolio performance for luxury vehicle investments. Analyze the data and provide insights on current performance and future projections.';
    } else {
      systemMessage = 'You are an expert financial advisor specializing in luxury vehicle investments. Provide a comprehensive analysis of the market data and portfolio.';
    }    // Generate user message from market data
    const userMessage = generateUserMessage(randomizedMarketData, analysisType);

    // Define the response schema based on analysis type
    let schema = {};
    if (analysisType === 'risk') {
      schema = {
        type: "object",
        properties: {
          overallRiskLevel: {
            type: "string",
            description: "Overall risk assessment (low, medium, high)"
          },
          riskFactors: {
            type: "array",
            description: "List of risk factors affecting the portfolio",
            items: {
              type: "object",
              properties: {
                factor: { type: "string" },
                impact: { type: "string" },
                mitigationStrategy: { type: "string" }
              }
            }
          },
          marketRisks: {
            type: "object",
            properties: {
              volatility: { 
                type: "object",
                properties: {
                  level: { type: "string" },
                  percentage: { type: "number" }
                }
              },
              liquidity: { 
                type: "object",
                properties: {
                  level: { type: "string" },
                  percentage: { type: "number" }
                }
              }
            }
          },
          recommendations: {
            type: "array",
            description: "Risk mitigation recommendations",
            items: { type: "string" }
          }
        },
        required: ["overallRiskLevel", "riskFactors", "marketRisks", "recommendations"]
      };
    } else if (analysisType === 'opportunity') {
      schema = {
        type: "object",
        properties: {          topOpportunities: {
            type: "array",
            description: "List of top investment opportunities",
            items: {
              type: "object",
              properties: {
                vehicle: { type: "string" },
                expectedROI: { type: "number" },
                annualYield: { type: "number" },
                riskLevel: { type: "string" },
                rationale: { type: "string" },
                imageUrl: { type: "string" }
              }
            }
          },
          emergingTrends: {
            type: "array",
            description: "List of emerging market trends",
            items: {
              type: "object",
              properties: {
                trend: { type: "string" },
                impact: { type: "string" },
                confidenceLevel: { type: "number" }
              }
            }
          },
          recommendedActions: {
            type: "array",
            description: "Recommended investment actions",
            items: { type: "string" }
          }
        },
        required: ["topOpportunities", "emergingTrends", "recommendedActions"]
      };
    } else if (analysisType === 'performance') {
      schema = {
        type: "object",
        properties: {
          portfolioPerformance: {
            type: "object",
            properties: {
              overallGrowth: { type: "number" },
              annualYield: { type: "number" },
              projection: { 
                type: "object",
                properties: {
                  oneYear: { type: "number" },
                  threeYear: { type: "number" },
                  fiveYear: { type: "number" }
                }
              }
            }
          },
          vehiclePerformance: {
            type: "array",
            description: "Performance breakdown by vehicle",
            items: {
              type: "object",
              properties: {
                vehicle: { type: "string" },
                currentValue: { type: "number" },
                appreciationRate: { type: "number" },
                rentalYield: { type: "number" }
              }
            }
          },
          marketComparison: {
            type: "object",
            properties: {
              relativeTo: { type: "string" },
              percentageDifference: { type: "number" },
              analysis: { type: "string" }
            }
          },
          improvementSuggestions: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["portfolioPerformance", "vehiclePerformance", "marketComparison", "improvementSuggestions"]
      };
    } else {
      // General comprehensive analysis
      schema = {
        type: "object",
        properties: {
          marketSummary: {
            type: "object",
            properties: {
              overview: { type: "string" },
              sentiment: { type: "string" },
              growthRate: { type: "number" },
              keyTrends: {
                type: "array",
                items: { type: "string" }
              }
            }
          },
          riskAnalysis: {
            type: "object",
            properties: {
              overallRisk: { type: "string" },
              marketRisk: { 
                type: "object",
                properties: {
                  level: { type: "string" },
                  percentage: { type: "number" }
                }
              },
              volatility: { 
                type: "object",
                properties: {
                  level: { type: "string" },
                  percentage: { type: "number" }
                }
              },
              liquidityRisk: { 
                type: "object",
                properties: {
                  level: { type: "string" },
                  percentage: { type: "number" }
                }
              }
            }
          },
          recommendedInvestments: {
            type: "array",
            items: {
              type: "object",
              properties: {
                vehicle: { type: "string" },
                expectedROI: { type: "number" },
                annualYield: { type: "number" },
                riskLevel: { type: "string" },
                rationale: { type: "string" }
              }
            }
          },
          performanceMetrics: {
            type: "object",
            properties: {
              annualGrowth: { type: "number" },
              roi: { type: "number" },
              yield: { type: "number" }
            }
          },
          aiInsights: {
            type: "array",
            items: {
              type: "object",
              properties: {
                category: { type: "string" },
                insight: { type: "string" },
                confidenceScore: { type: "number" }
              }
            }
          }
        },
        required: ["marketSummary", "riskAnalysis", "recommendedInvestments", "performanceMetrics", "aiInsights"]
      };
    }    // Call the LLM with JSON schema
    console.log('Sending randomized request to AI with unique elements:', 
      JSON.stringify({
        timestamp: randomizedMarketData.requestTimestamp,
        requestId: randomizedMarketData.requestId,
        messageLength: userMessage.length,
        questionCount: userMessage.split('- ').length - 1,
        persona: userMessage.split('\n')[2], // Extract persona from message
        marketConditions: randomizedMarketData.economicFactors?.investorSentiment || 'unknown',
        randomSample: {
          // Sample of randomized data points for verification
          marketTrend: randomizedMarketData.marketTrends?.[0]?.growth || 'n/a',
          interestRate: randomizedMarketData.economicFactors?.interestRates || 'n/a',
          consumerConfidence: randomizedMarketData.economicFactors?.luxuryConsumerConfidence || 'n/a',
          seasonalMultiplier: randomizedMarketData.seasonalFactors?.seasonalDemandMultiplier || 'n/a',
          // Sample vehicle pricing
          vehiclePrice: randomizedMarketData.marketData?.vehicles?.[0]?.basePrice || 'n/a'
        }
      })
    );
    
    const response = await togetherClient.chat.completions.create({
      model: "meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8",
      messages: [
        {
          role: "system",
          content: `${systemMessage} Only answer in JSON format according to the provided schema. Ensure the response is proper JSON.`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      response_format: {
        type: "json_object",
        schema: schema
      },
      temperature: 0.8 // Added to introduce more variability in AI responses
    });    // Parse the JSON response
    const analysisResult = JSON.parse(response.choices[0].message.content);
    
    // Enrich opportunity analysis with vehicle data (including imageUrl)
    if (analysisType === 'opportunity' || analysisType === 'comprehensive') {
      // For opportunity analysis, enrich with vehicle data
      const vehicleData = wealthModel.getAllVehicles();
      
      // Enrich topOpportunities with imageUrl if available
      if (analysisResult.topOpportunities) {
        analysisResult.topOpportunities = analysisResult.topOpportunities.map(opportunity => {
          // Try to find matching vehicle in our data
          const matchingVehicle = vehicleData.find(v => 
            v.name.toLowerCase().includes(opportunity.vehicle.toLowerCase()) || 
            opportunity.vehicle.toLowerCase().includes(v.name.toLowerCase())
          );
          
          if (matchingVehicle) {
            // Add imageUrl from our data
            return {
              ...opportunity,
              imageUrl: matchingVehicle.imageUrl || null
            };
          }
          return opportunity;
        });
      }
      
      // Also enrich recommendedInvestments for comprehensive analysis
      if (analysisResult.recommendedInvestments) {
        analysisResult.recommendedInvestments = analysisResult.recommendedInvestments.map(investment => {
          const matchingVehicle = vehicleData.find(v => 
            v.name.toLowerCase().includes(investment.vehicle.toLowerCase()) || 
            investment.vehicle.toLowerCase().includes(v.name.toLowerCase())
          );
          
          if (matchingVehicle) {
            return {
              ...investment,
              imageUrl: matchingVehicle.imageUrl || null
            };
          }
          return investment;
        });
      }
    }

    // Store the analysis result in the user's portfolio
    const portfolio = wealthModel.getOrCreateUserPortfolio(userId);
    portfolio.marketInsights[analysisType || 'comprehensive'] = {
      result: analysisResult,
      generatedAt: new Date()
    };
    wealthModel.updateUserPortfolio(userId, portfolio);

    // Return the analysis results
    res.json({
      success: true,
      analysisType: analysisType || 'comprehensive',
      result: analysisResult
    });
  } catch (error) {
    console.error('Portfolio analysis error:', error);
    res.status(500).json({ 
      error: 'Error analyzing portfolio', 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

/**
 * Get user's portfolio data
 * @route GET /api/wealth/portfolio/:userId
 * @access Public
 */
const getUserPortfolio = async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Get or create user portfolio
    const portfolio = wealthModel.getOrCreateUserPortfolio(userId);

    res.json({
      success: true,
      portfolio: portfolio
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ error: 'Error retrieving portfolio', details: error.message });
  }
};

/**
 * Get user's market insights
 * @route GET /api/wealth/insights/:userId
 * @access Public
 */
const getMarketInsights = async (req, res) => {
  try {
    const { userId } = req.params;
    const { analysisType } = req.query;
    
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    // Get user portfolio
    const portfolio = wealthModel.getUserPortfolio(userId);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    // Get insights based on analysis type
    const insights = analysisType 
      ? portfolio.marketInsights[analysisType]
      : portfolio.marketInsights;

    if (!insights || (analysisType && !portfolio.marketInsights[analysisType])) {
      return res.status(404).json({ error: 'No insights found for this analysis type' });
    }

    res.json({
      success: true,
      insights: insights
    });
  } catch (error) {
    console.error('Get market insights error:', error);
    res.status(500).json({ error: 'Error retrieving market insights', details: error.message });
  }
};

module.exports = {
  analyzePortfolio,
  getUserPortfolio,
  getMarketInsights
};

/**
 * Helper function to randomize market data to ensure unique AI responses
 * @param {Object} marketData - Original market data
 * @returns {Object} - Randomized market data
 */
function randomizeMarketData(marketData) {
  // Create deep copy of the market data to avoid modifying the original
  const randomized = JSON.parse(JSON.stringify(marketData));
  
  // Add small random variations to numeric values
  if (randomized.marketTrends) {
    randomized.marketTrends.forEach(trend => {
      if (typeof trend.growth === 'number') {
        // Add +/- 2% random variation
        trend.growth = parseFloat((trend.growth * (1 + (Math.random() * 0.04 - 0.02))).toFixed(2));
      }
      if (typeof trend.volatility === 'number') {
        // Add +/- 1.5% random variation
        trend.volatility = parseFloat((trend.volatility * (1 + (Math.random() * 0.03 - 0.015))).toFixed(2));
      }
      if (typeof trend.demandIndex === 'number') {
        // Add +/- 5 points random variation
        trend.demandIndex = Math.max(0, Math.min(100, Math.floor(trend.demandIndex + (Math.random() * 10 - 5))));
      }
      if (typeof trend.supplyIndex === 'number') {
        // Add +/- 3 points random variation
        trend.supplyIndex = Math.max(0, Math.min(100, Math.floor(trend.supplyIndex + (Math.random() * 6 - 3))));
      }
    });
  }
  
  // Randomize market data
  if (randomized.marketData && randomized.marketData.globalMarketMetrics) {
    const metrics = randomized.marketData.globalMarketMetrics;
    // Add +/- 1.5% random variation
    if (typeof metrics.overallGrowth === 'number') {
      metrics.overallGrowth = parseFloat((metrics.overallGrowth * (1 + (Math.random() * 0.03 - 0.015))).toFixed(2));
    }
    if (typeof metrics.luxurySegmentGrowth === 'number') {
      metrics.luxurySegmentGrowth = parseFloat((metrics.luxurySegmentGrowth * (1 + (Math.random() * 0.03 - 0.015))).toFixed(2));
    }
    if (typeof metrics.electricSegmentGrowth === 'number') {
      metrics.electricSegmentGrowth = parseFloat((metrics.electricSegmentGrowth * (1 + (Math.random() * 0.03 - 0.015))).toFixed(2));
    }
    if (typeof metrics.volatilityIndex === 'number') {
      metrics.volatilityIndex = parseFloat((metrics.volatilityIndex * (1 + (Math.random() * 0.04 - 0.02))).toFixed(2));
    }
  }
  
  // Randomize economic factors
  if (randomized.economicFactors) {
    const eco = randomized.economicFactors;
    // Add +/- 0.2 points random variation to rates
    if (typeof eco.interestRates === 'number') {
      eco.interestRates = parseFloat((eco.interestRates + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }
    if (typeof eco.inflationRate === 'number') {
      eco.inflationRate = parseFloat((eco.inflationRate + (Math.random() * 0.4 - 0.2)).toFixed(2));
    }
    // Add +/- 3 points random variation to confidence
    if (typeof eco.luxuryConsumerConfidence === 'number') {
      eco.luxuryConsumerConfidence = parseFloat((eco.luxuryConsumerConfidence + (Math.random() * 6 - 3)).toFixed(1));
    }
    
    // Randomize investor sentiment
    const sentiments = ['very positive', 'positive', 'slightly positive', 'neutral', 'cautious', 'slightly negative'];
    const randomSentimentIndex = Math.floor(Math.random() * sentiments.length);
    eco.investorSentiment = sentiments[randomSentimentIndex];
  }
  
  // Randomize seasonal factors
  if (randomized.seasonalFactors) {
    const seasonal = randomized.seasonalFactors;
    if (typeof seasonal.seasonalDemandMultiplier === 'number') {
      // Add +/- 0.15 points random variation to multiplier
      seasonal.seasonalDemandMultiplier = parseFloat(
        (seasonal.seasonalDemandMultiplier + (Math.random() * 0.3 - 0.15)).toFixed(2)
      );
    }
    
    // Randomly add or remove an event
    const additionalEvents = [
      "Dubai International Motor Show", 
      "Geneva Motor Show", 
      "Monterey Car Week",
      "LA Auto Show",
      "Goodwood Festival of Speed",
      "Paris Motor Show"
    ];
    
    if (Math.random() > 0.5 && seasonal.upcomingEvents) {
      // Add a random event
      const eventToAdd = additionalEvents[Math.floor(Math.random() * additionalEvents.length)];
      if (!seasonal.upcomingEvents.includes(eventToAdd)) {
        seasonal.upcomingEvents.push(eventToAdd);
      }
    } else if (seasonal.upcomingEvents && seasonal.upcomingEvents.length > 1) {
      // Remove a random event
      const indexToRemove = Math.floor(Math.random() * seasonal.upcomingEvents.length);
      seasonal.upcomingEvents.splice(indexToRemove, 1);
    }
  }
  
  // Randomize vehicle data
  if (randomized.marketData && randomized.marketData.vehicles) {
    randomized.marketData.vehicles.forEach(vehicle => {
      // Add +/- 2% random variation to prices
      if (typeof vehicle.basePrice === 'number') {
        vehicle.basePrice = Math.floor(vehicle.basePrice * (1 + (Math.random() * 0.04 - 0.02)));
      }
      if (typeof vehicle.monthlyRent === 'number') {
        vehicle.monthlyRent = Math.floor(vehicle.monthlyRent * (1 + (Math.random() * 0.04 - 0.02)));
      }
      
      // Add +/- 1.5% random variation to ROI and yield
      if (typeof vehicle.expectedROI === 'number') {
        vehicle.expectedROI = parseFloat((vehicle.expectedROI * (1 + (Math.random() * 0.03 - 0.015))).toFixed(1));
      }
      if (typeof vehicle.annualYield === 'number') {
        vehicle.annualYield = parseFloat((vehicle.annualYield * (1 + (Math.random() * 0.03 - 0.015))).toFixed(1));
      }
      
      // Randomize market share slightly
      if (typeof vehicle.marketShare === 'number') {
        vehicle.marketShare = parseFloat((vehicle.marketShare * (1 + (Math.random() * 0.06 - 0.03))).toFixed(1));
      }
      
      // Occasionally change risk level
      if (typeof vehicle.riskLevel === 'string' && Math.random() > 0.7) {
        const riskLevels = ['very low', 'low', 'medium-low', 'medium', 'medium-high', 'high'];
        const currentIndex = riskLevels.indexOf(vehicle.riskLevel) || 1;
        
        // Move up or down by one level at most
        const newIndex = Math.max(0, Math.min(riskLevels.length - 1, 
          currentIndex + (Math.random() > 0.5 ? 1 : -1)));
        
        vehicle.riskLevel = riskLevels[newIndex];
      }
    });
  }
  
  // Randomize portfolio performance if available
  if (randomized.portfolio) {
    if (randomized.portfolio.investments) {
      randomized.portfolio.investments.forEach(investment => {
        if (typeof investment.amount === 'number') {
          // Add +/- 3% random variation
          investment.amount = parseFloat(
            (investment.amount * (1 + (Math.random() * 0.06 - 0.03))).toFixed(2)
          );
        }
      });
    }
    
    if (randomized.portfolio.cashBalance) {
      if (typeof randomized.portfolio.cashBalance.total === 'number') {
        randomized.portfolio.cashBalance.total = parseFloat(
          (randomized.portfolio.cashBalance.total * (1 + (Math.random() * 0.04 - 0.02))).toFixed(2)
        );
      }
      if (typeof randomized.portfolio.cashBalance.available === 'number') {
        randomized.portfolio.cashBalance.available = parseFloat(
          (randomized.portfolio.cashBalance.available * (1 + (Math.random() * 0.04 - 0.02))).toFixed(2)
        );
      }
    }
  }
  
  // Add random timestamp and ID for uniqueness
  randomized.requestTimestamp = new Date().toISOString();
  randomized.requestId = Math.random().toString(36).substring(2, 15);
    return randomized;
}

/**
 * Generates a unique user message for each request
 * @param {Object} marketData - The market data to analyze
 * @param {string} analysisType - The type of analysis requested
 * @returns {string} - A customized message to send to the AI
 */
function generateUserMessage(marketData, analysisType) {
  // Base context always included
  const baseContext = `Market data for analysis as of ${new Date().toISOString()}`;
  
  // Market conditions vary randomly
  const marketConditions = Math.random() > 0.5 ? 'positive' : 
    (Math.random() > 0.5 ? 'mixed' : 'challenging');
  
  // Random user questions to make responses more varied
  const userQuestions = [
    "What specific investments should I prioritize given my current portfolio?",
    "How should I diversify my portfolio to minimize risk while maintaining growth?",
    "Which market segments show the best potential for the next 6-12 months?",
    "Should I consider selling any current assets based on market projections?",
    "What emerging trends should I be aware of for long-term investment planning?",
    "How do seasonal factors affect my current investment strategy?",
    "Are there any warning signs I should be concerned about?",
    "What's the optimal balance between exotic and mainstream luxury vehicles?",
    "How do economic indicators impact my investment choices in this market?",
    "Which specific vehicles have the best appreciation potential right now?"
  ];
  
  // Select random questions based on analysis type
  let selectedQuestions = [];
  if (analysisType === 'risk') {
    selectedQuestions = [
      "What are my biggest risk factors in the current market?",
      "How can I mitigate volatility in my portfolio?",
      "Is my current diversification strategy adequate to protect against market downturns?",
      "Which assets have the highest liquidity risk in my portfolio?",
      "How do macroeconomic factors affect my risk exposure?"
    ];
  } else if (analysisType === 'opportunity') {
    selectedQuestions = [
      "Which emerging market segments offer the best growth potential?",
      "Are there any undervalued assets I should consider adding to my portfolio?",
      "What timing strategies should I employ for maximum returns?",
      "Which specific vehicles are projected to appreciate the most?",
      "How can I capitalize on current market trends?"
    ];
  } else if (analysisType === 'performance') {
    selectedQuestions = [
      "How is my portfolio performing compared to market benchmarks?",
      "Which assets are underperforming and should be reconsidered?",
      "What adjustments would optimize my portfolio performance?",
      "How are my assets projected to perform in the next year?",
      "What is the yield analysis of my current investments?"
    ];
  }
    // Combine selected questions with general questions
  const allQuestions = [...selectedQuestions, ...userQuestions];
  
  // Select 1-3 random questions
  const numberOfQuestions = Math.floor(Math.random() * 3) + 1;
  const questionsToAsk = [];
  
  for (let i = 0; i < numberOfQuestions; i++) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    if (!questionsToAsk.includes(allQuestions[randomIndex])) {
      questionsToAsk.push(allQuestions[randomIndex]);
    }
  }
  
  // User personas to add variety to the requests
  const userPersonas = [
    {
      profile: "I'm a new investor in luxury vehicles with limited experience.",
      preferences: "I prefer conservative growth strategies with minimal risk.",
      goals: "My primary goal is capital preservation with moderate growth.",
    },
    {
      profile: "I'm an experienced collector focusing on exotic vehicles.",
      preferences: "I look for rare models with strong appreciation potential.",
      goals: "I aim to maximize long-term returns through strategic acquisitions.",
    },
    {
      profile: "I'm a diversified investor with a mixed portfolio of assets.",
      preferences: "I balance my investments across different vehicle categories.",
      goals: "I want to optimize my portfolio for both growth and stability.",
    },
    {
      profile: "I'm an aggressive investor looking for high returns.",
      preferences: "I'm comfortable with higher risk for greater potential rewards.",
      goals: "My target is maximizing short to medium-term profitability.",
    },
    {
      profile: "I'm a passive investor interested in the luxury vehicle market.",
      preferences: "I prefer investments that require minimal active management.",
      goals: "I'm looking for steady appreciation with reliable yields.",
    }
  ];
  
  // Select a random persona
  const selectedPersona = userPersonas[Math.floor(Math.random() * userPersonas.length)];
  
  // Generate random context elements
  const contextElements = [
    `I'm particularly interested in ${Math.random() > 0.5 ? 'long-term growth' : 'short-term gains'}.`,
    `My risk tolerance is ${['low', 'moderate', 'high'][Math.floor(Math.random() * 3)]}.`,
    `I'm considering adding ${Math.random() > 0.5 ? 'electric vehicles' : 'exotic sports cars'} to my portfolio.`,
    `I have a budget of ${Math.floor(Math.random() * 5 + 1)} million AED for new investments.`,
    `I prefer ${Math.random() > 0.5 ? 'high liquidity' : 'high appreciation potential'} assets.`,
    `I'm planning to ${Math.random() > 0.5 ? 'hold for 5+ years' : 'actively trade'}.`
  ];
  
  // Select 1-2 random context elements
  const numberOfContextElements = Math.floor(Math.random() * 2) + 1;
  const selectedContextElements = [];
  
  for (let i = 0; i < numberOfContextElements; i++) {
    const randomIndex = Math.floor(Math.random() * contextElements.length);
    if (!selectedContextElements.includes(contextElements[randomIndex])) {
      selectedContextElements.push(contextElements[randomIndex]);
    }
  }
    // Combine everything into a message
  return `Please analyze the following market data and provide insights. 

Investor profile: ${selectedPersona.profile}
Preferences: ${selectedPersona.preferences}
Goals: ${selectedPersona.goals}

${selectedContextElements.join(' ')}
  
${JSON.stringify(marketData, null, 2)}

Additional context: Analysis requested with market conditions showing ${marketConditions} signals.

Please address these specific questions in your analysis:
${questionsToAsk.map(q => `- ${q}`).join('\n')}`;
}
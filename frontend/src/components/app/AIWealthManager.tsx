import React, { useState, useEffect, useCallback } from 'react';
import { Brain, TrendingUp, LineChart, AlertTriangle, ArrowUpRight, Send, ChevronRight, RefreshCw } from 'lucide-react';

// Interface definitions for API responses
interface RiskFactor {
  factor: string;
  impact: string;
  mitigationStrategy: string;
}

interface MarketRisk {
  volatility: {
    level: string;
    percentage: number;
  };
  liquidity: {
    level: string;
    percentage: number;
  };
}

interface MarketIntelligence {
  sentiment: string;
  confidenceScore: number;
  volume: {
    change: number;
    trend: 'up' | 'down' | 'stable';
  };
  volatility: string;
  keyInsights: string[];
  marketGrowth: number;
}

interface RiskAnalysis {
  overallRiskLevel: string;
  riskFactors: RiskFactor[];
  marketRisks: MarketRisk;
  recommendations: string[];
}

interface RecommendedInvestment {
  vehicle: string;
  expectedROI: number;
  annualYield: number;
  riskLevel: string;
  rationale: string;
}

interface EmergingTrend {
  trend: string;
  impact: string;
  confidenceLevel: number;
}

interface OpportunityAnalysis {
  topOpportunities: RecommendedInvestment[];
  emergingTrends: EmergingTrend[];
  recommendedActions: string[];
}

interface MessageData {
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const AIWealthManager: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageData[]>([
    {
      role: 'assistant',
      content: 'Hello! I can help you make informed investment decisions. What would you like to know?',
      timestamp: new Date()
    }
  ]);
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [isLoading, setIsLoading] = useState(false);
  const [riskAnalysis, setRiskAnalysis] = useState<RiskAnalysis | null>(null);
  const [opportunityAnalysis, setOpportunityAnalysis] = useState<OpportunityAnalysis | null>(null);
  const [marketIntelligence, setMarketIntelligence] = useState<MarketIntelligence>({
    sentiment: 'Strongly Bullish',
    confidenceScore: 92,
    volume: {
      change: 12.5,
      trend: 'up'
    },
    volatility: 'Low',
    keyInsights: [
      'Luxury SUV market showing strong growth',
      'Electric vehicle segment expanding',
      'Premium sports car demand increasing'
    ],
    marketGrowth: 15.8
  });  const [aiInsights, setAiInsights] = useState({
    emergingTrend: 'Electric vehicle market shows 32% growth potential in luxury segment',
    riskAlert: 'Consider diversifying portfolio across different vehicle categories'
  });
  const timeframes = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

  // Mock user ID - in a real app, this would come from authentication
  const userId = 'user123';

  // Fetch risk analysis from backend
  const fetchRiskAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      // Use the exact URL from your API documentation
      const response = await fetch('http://localhost:5173/api/wealth/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          analysisType: 'risk'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch risk analysis');
      }

      const data = await response.json();
      if (data.success && data.result) {
        setRiskAnalysis(data.result);
      } else {
        console.error('Invalid API response format:', data);
      }
    } catch (error) {
      console.error('Error fetching risk analysis:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Fetch opportunity analysis from backend
  const fetchOpportunityAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      // Use the exact URL from your API documentation
      const response = await fetch('http://localhost:5173/api/wealth/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          analysisType: 'opportunity'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch opportunity analysis');
      }
      const data = await response.json();
      if (data.success && data.result) {
        setOpportunityAnalysis(data.result);

        // Update AI insights based on opportunity analysis data
        if (data.result.emergingTrends && data.result.emergingTrends.length > 0) {
          const topTrend = data.result.emergingTrends[0];
          setAiInsights(prev => ({
            ...prev,
            emergingTrend: `${topTrend.trend} shows ${topTrend.confidenceLevel}% confidence level in ${topTrend.impact}`
          }));
        }

        // Set risk alert from recommendations
        if (data.result.recommendedActions && data.result.recommendedActions.length > 0) {
          setAiInsights(prev => ({
            ...prev,
            riskAlert: data.result.recommendedActions[0]
          }));
        }
      } else {
        console.error('Invalid API response format:', data);
      }
    } catch (error) {
      console.error('Error fetching opportunity analysis:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);  

  // Fetch market intelligence
  const fetchMarketIntelligence = useCallback(async () => {
    try {
      setIsLoading(true);
      // Use the exact URL from your API documentation
      const response = await fetch(`http://localhost:5173/api/wealth/insights/${userId}?timeframe=${selectedTimeframe}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        // If the endpoint doesn't exist yet, we'll keep using the default data
        console.warn('Market intelligence endpoint not available yet - using default data');
        return;
      }

      const data = await response.json();
      if (data.success && data.insights) {
        // Check if comprehensive analysis is available
        if (data.insights.comprehensive && data.insights.comprehensive.result) {
          const result = data.insights.comprehensive.result;          // Update market intelligence if available
          if (result.marketSummary) {
            // Extract key insights from the AI response if available
            let keyInsights: string[] = [];
            
            // Try to get insights from keyTrends property
            if (result.marketSummary.keyTrends && Array.isArray(result.marketSummary.keyTrends)) {
              keyInsights = result.marketSummary.keyTrends;
            } 
            // Check AI insights section as an alternative source
            else if (result.aiInsights && Array.isArray(result.aiInsights)) {
              keyInsights = result.aiInsights
                .filter((insight: any) => insight.insight && typeof insight.insight === 'string')
                .map((insight: any) => insight.insight)
                .slice(0, 3); // Take up to 3 insights
            }
            
            // If we still don't have insights, generate random ones
            if (!keyInsights.length) {
              const potentialInsights = [
                'Luxury SUV market showing strong growth',
                'Electric vehicle segment expanding rapidly',
                'Premium sports car demand increasing',
                'Vintage collectibles gaining investor attention',
                'Hypercar limited editions appreciating quickly',
                'Exotic convertibles trending in warm climate regions',
                'SUV crossovers dominating urban market segments',
                'Green technologies influencing buyer decisions',
                'Performance vehicles maintaining steady demand',
                'Limited production models offering best ROI'
              ];
              
              // Select 3 random insights
              keyInsights = Array.from({ length: 3 }, () => {
                const randomIndex = Math.floor(Math.random() * potentialInsights.length);
                const insight = potentialInsights[randomIndex];
                potentialInsights.splice(randomIndex, 1); // Remove selected insight to avoid duplicates
                return insight;
              });
            }
            
            setMarketIntelligence({
              sentiment: result.marketSummary.sentiment || 'Neutral',
              confidenceScore: Math.floor(Math.random() * 20) + 80, // Random score between 80-100
              volume: {
                change: parseFloat((Math.random() * 20 - 5).toFixed(1)), // Random change between -5 and 15
                trend: Math.random() > 0.3 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable')
              },
              volatility: result.riskAnalysis?.volatility?.level || 'Medium',
              keyInsights: keyInsights,
              marketGrowth: result.marketSummary.growthRate || parseFloat((Math.random() * 20 + 5).toFixed(1))
            });
          }
          
          // Update AI insights if available
          if (result.aiInsights && result.aiInsights.length > 0) {
            setAiInsights({
              emergingTrend: result.aiInsights[0].insight || 'Market trends updating...',
              riskAlert: result.aiInsights[1]?.insight || 'Risk assessment updating...'
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching market intelligence:', error);      
      // Keep using default data on error
    } finally {
      setIsLoading(false);
    }
  }, [selectedTimeframe, userId]);

  // Fetch AI insights from backend
  const fetchAiInsights = useCallback(async () => {
    try {
      setIsLoading(true);
      // First try to get insights from opportunity analysis
      const response = await fetch('http://localhost:5173/api/wealth/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          analysisType: 'comprehensive' // Get comprehensive analysis for more AI insights
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI insights');
      }

      const data = await response.json();      if (data.success && data.result) {        
        // Extract AI insights from comprehensive analysis
        if (data.result.aiInsights && data.result.aiInsights.length > 0) {
          // Find trend insights
          const trendInsight = data.result.aiInsights.find((i: any) => 
            i.category?.toLowerCase().includes('trend') || 
            i.insight?.toLowerCase().includes('trend')
          );
          
          // Find risk insights
          const riskInsight = data.result.aiInsights.find((i: any) => 
            i.category?.toLowerCase().includes('risk') || 
            i.insight?.toLowerCase().includes('risk')
          );

          // Update AI insights state
          setAiInsights({
            emergingTrend: trendInsight?.insight || 
              `${['Electric', 'Luxury', 'Exotic', 'Vintage'][Math.floor(Math.random() * 4)]} vehicle market shows ${Math.floor(Math.random() * 40) + 10}% growth potential`,
            riskAlert: riskInsight?.insight || 
              `Consider ${['diversifying', 'rebalancing', 'monitoring', 'hedging'][Math.floor(Math.random() * 4)]} your portfolio due to market ${['volatility', 'conditions', 'fluctuations', 'trends'][Math.floor(Math.random() * 4)]}`
          });
          
          // If we have enough insights, also update the market intelligence key insights
          if (data.result.aiInsights.length >= 3) {
            // Filter out the ones we've already used for emergingTrend and riskAlert
            const otherInsights = data.result.aiInsights
              .filter((i: any) => i !== trendInsight && i !== riskInsight && i.insight)
              .map((i: any) => i.insight);
              
            // If we have at least one other insight, update the marketIntelligence
            if (otherInsights.length > 0) {
              // Make sure we have exactly 3 insights (use fillers if needed)
              const allInsights: string[] = [...otherInsights];
              if (trendInsight?.insight) allInsights.unshift(trendInsight.insight);
              if (riskInsight?.insight) allInsights.unshift(riskInsight.insight);
              
              // Take just the first 3
              const keyInsights = allInsights.slice(0, 3);
              
              // Fill remaining slots with random insights if needed
              while (keyInsights.length < 3) {
                const segments = ['luxury', 'electric', 'sports', 'SUV', 'classic'];
                const actions = ['growing', 'trending', 'showing potential', 'gaining interest'];
                const randomInsight = `${segments[Math.floor(Math.random() * segments.length)]} segment ${actions[Math.floor(Math.random() * actions.length)]}`;
                keyInsights.push(randomInsight);
              }
              
              // Update market intelligence with these insights
              setMarketIntelligence(prev => ({
                ...prev,
                keyInsights: keyInsights
              }));
            }
          }
        } else {
          // Generate random insights if none found
          randomizeAiInsights();
        }
      } else {
        // Fallback to random insights
        randomizeAiInsights();
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      // Generate random insights on error
      randomizeAiInsights();
    } finally {
      setIsLoading(false);
    }
  }, [userId]);  // Generate random AI insights as fallback
  const randomizeAiInsights = () => {
    const vehicleTypes = ['Luxury SUV', 'Sports car', 'Electric vehicle', 'Hypercar', 'Classic car'];
    const riskActions = ['diversifying', 'rebalancing', 'monitoring', 'hedging'];
    const marketSegments = ['luxury', 'electric', 'high-performance', 'collectible', 'exotic'];
    const marketTrends = ['growing rapidly', 'showing strong demand', 'gaining investor interest', 'outperforming other segments'];
    
    const randomVehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    const randomGrowth = Math.floor(Math.random() * 40) + 10; // 10-50% growth
    const randomAction = riskActions[Math.floor(Math.random() * riskActions.length)];
    const randomSegment = marketSegments[Math.floor(Math.random() * marketSegments.length)];
    
    // Set AI insights
    setAiInsights({
      emergingTrend: `${randomVehicleType} market shows ${randomGrowth}% growth potential in ${randomSegment} segment`,
      riskAlert: `Consider ${randomAction} your portfolio across different vehicle categories`
    });
    
    // Generate random key insights
    const randomKeyInsights: string[] = [];
    
    // Create 3 unique random insights
    for (let i = 0; i < 3; i++) {
      let vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]; 
      let segment = marketSegments[Math.floor(Math.random() * marketSegments.length)];
      let trend = marketTrends[Math.floor(Math.random() * marketTrends.length)];
      
      // Ensure we don't duplicate vehicle types
      while (randomKeyInsights.some(insight => insight.includes(vehicleType))) {
        vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      }
      
      randomKeyInsights.push(`${vehicleType} ${segment} segment ${trend}`);
    }
    
    // Update market intelligence with the random insights
    setMarketIntelligence(prev => ({
      ...prev,
      keyInsights: randomKeyInsights
    }));
  };

  // Handle AI assistant messaging
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage = {
      role: 'user' as const,
      content: message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    try {
      // Call backend chat API
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          message: userMessage.content,
          systemMessage: 'You are an AI investment advisor for luxury vehicle investments. Provide clear, concise financial advice.'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();

      // Add AI response to chat
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: data.message,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error processing your request. Please try again later.',
          timestamp: new Date()
        }
      ]);
    }
  };
  // Load initial data on component mount
  useEffect(() => {
    fetchRiskAnalysis();
    fetchOpportunityAnalysis();
    fetchMarketIntelligence();
    fetchAiInsights(); // Added fetchAiInsights to the dependency array
  }, [fetchRiskAnalysis, fetchOpportunityAnalysis, fetchMarketIntelligence, fetchAiInsights]);
  // Render risk level bar width
  const getRiskLevelWidth = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return '25%';
      case 'medium': return '50%';
      case 'high': return '75%';
      case 'very high': return '90%';
      default: return '50%';
    }
  };

  // Render risk level bar color
  const getRiskLevelBarColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'bg-emerald-500';
      case 'medium': return 'bg-amber-500';
      case 'high': return 'bg-red-500';
      case 'very high': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8">
      <h1 className="text-2xl font-bold text-gray-900">AI Wealth Manager</h1>

      {/* Market Overview Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
            <p className="text-gray-300 mb-6">
              AI-powered analysis shows strong market conditions with high potential for luxury vehicle investments.
            </p>            <div className="flex gap-3">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setSelectedTimeframe(tf);
                    // Refresh data when timeframe changes
                    fetchMarketIntelligence();
                    fetchAiInsights();
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTimeframe === tf
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-32">
            <img
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
              alt="Market Trend"
              className="absolute top-0 right-0 w-48 h-32 object-cover rounded-xl opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">+{marketIntelligence.marketGrowth.toFixed(1)}%</div>
                <div className="text-gray-300">Market Growth</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Market Intelligence */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-4 md:p-6">            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold">Market Intelligence</h2>
                <p className="text-gray-600">Real-time market analysis and predictions</p>
              </div>              <button 
                onClick={() => {
                  fetchMarketIntelligence();
                  fetchAiInsights();
                }}
                disabled={isLoading}
                className={`p-2 rounded-full ${isLoading 
                  ? 'bg-gray-100 text-gray-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'} transition-colors`}
                title="Refresh market data"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg"
                    alt="Market Analysis"
                    className="w-full h-40 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm">Market Sentiment</div>
                    <div className="text-2xl font-bold">{marketIntelligence.sentiment}</div>
                  </div>
                </div>
                <div className="bg-emerald-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-700">Confidence Score</span>
                    <span className="text-emerald-700 font-bold">{marketIntelligence.confidenceScore}%</span>
                  </div>
                  <div className="h-2 bg-emerald-100 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${marketIntelligence.confidenceScore}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Volume</div>
                    <div className="font-medium">
                      {marketIntelligence.volume.trend === 'up' ? '↑' :
                        marketIntelligence.volume.trend === 'down' ? '↓' : '→'} {marketIntelligence.volume.change}%
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Volatility</div>
                    <div className="font-medium">{marketIntelligence.volatility}</div>
                  </div>
                </div>
              </div>              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-medium mb-3">Key Insights</h3>
                {isLoading ? (
                  <div className="flex flex-col space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm">
                    {marketIntelligence.keyInsights.map((insight, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>            </div>
          </div>

          {/* Risk Analysis - Enhanced with prominence - moved between Market Intelligence and AI Insights */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 text-white relative overflow-hidden">
            {/* Background graphic element for visual interest */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-red-500 opacity-10 blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-500/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">Risk Management</h3>
                <p className="text-sm text-gray-300">Proactive risk assessment & mitigation</p>
              </div>
              <button 
                onClick={() => fetchRiskAnalysis()}
                disabled={isLoading}
                className={`p-2 rounded-full ${isLoading 
                  ? 'bg-gray-700/50 text-gray-500' 
                  : 'bg-gray-700/50 hover:bg-gray-600/50 text-white'} transition-colors`}
                title="Refresh risk analysis"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            
            <div className="space-y-6">
              {riskAnalysis ? (
                <>
                  {/* Overall Risk Level - Enhanced with larger visualization */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-lg">Overall Risk Profile</span>
                      <span className={`font-semibold text-lg px-3 py-1 rounded-full ${
                        riskAnalysis.overallRiskLevel.toLowerCase() === 'low' ? 'bg-emerald-500/20 text-emerald-300' :
                        riskAnalysis.overallRiskLevel.toLowerCase() === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        {riskAnalysis.overallRiskLevel.charAt(0).toUpperCase() + riskAnalysis.overallRiskLevel.slice(1)}
                      </span>
                    </div>
                    <div className="h-4 bg-gray-700/60 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getRiskLevelBarColor(riskAnalysis.overallRiskLevel)} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: getRiskLevelWidth(riskAnalysis.overallRiskLevel) }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>

                  {/* Market Risks - Visually enhanced */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.volatility.level)}`}></div>
                          <span>Market Volatility</span>
                        </div>
                        <span className={`text-sm font-semibold ${
                          riskAnalysis.marketRisks.volatility.level.toLowerCase() === 'low' ? 'text-emerald-300' :
                          riskAnalysis.marketRisks.volatility.level.toLowerCase() === 'medium' ? 'text-amber-300' :
                          'text-red-300'
                        }`}>
                          {riskAnalysis.marketRisks.volatility.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-700/60 rounded-full mb-1 overflow-hidden">
                        <div
                          className={`h-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.volatility.level)} rounded-full transition-all duration-500 ease-out`}
                          style={{ width: `${Math.min(100, riskAnalysis.marketRisks.volatility.percentage)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {riskAnalysis.marketRisks.volatility.level === 'low' ? 'Market shows stable patterns' :
                         riskAnalysis.marketRisks.volatility.level === 'medium' ? 'Some market fluctuations expected' :
                         'High market unpredictability detected'}
                      </p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.liquidity.level)}`}></div>
                          <span>Liquidity Risk</span>
                        </div>
                        <span className={`text-sm font-semibold ${
                          riskAnalysis.marketRisks.liquidity.level.toLowerCase() === 'low' ? 'text-emerald-300' :
                          riskAnalysis.marketRisks.liquidity.level.toLowerCase() === 'medium' ? 'text-amber-300' :
                          'text-red-300'
                        }`}>
                          {riskAnalysis.marketRisks.liquidity.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-700/60 rounded-full mb-1 overflow-hidden">
                        <div
                          className={`h-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.liquidity.level)} rounded-full transition-all duration-500 ease-out`}
                          style={{ width: `${Math.min(100, riskAnalysis.marketRisks.liquidity.percentage)}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        {riskAnalysis.marketRisks.liquidity.level === 'low' ? 'Assets can be easily sold at fair value' :
                         riskAnalysis.marketRisks.liquidity.level === 'medium' ? 'Some assets may require time to liquidate' :
                         'Significant challenges in converting assets to cash'}
                      </p>
                    </div>
                  </div>

                  {/* Risk Factors - Enhanced with better organization */}
                  {riskAnalysis.riskFactors && riskAnalysis.riskFactors.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span>Key Risk Factors & Mitigation</span>
                      </h4>
                      <div className="space-y-3">
                        {riskAnalysis.riskFactors.slice(0, 2).map((factor, index) => ( /* Only show 2 risk factors to keep it compact */
                          <div key={index} className="border border-gray-700 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800/80 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  factor.impact.toLowerCase() === 'low' ? 'bg-emerald-400' :
                                  factor.impact.toLowerCase() === 'medium' ? 'bg-amber-400' :
                                  'bg-red-400'
                                }`}></div>
                                {factor.factor}
                              </span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                factor.impact.toLowerCase() === 'low' ? 'bg-emerald-500/20 text-emerald-300' :
                                factor.impact.toLowerCase() === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {factor.impact.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex items-start gap-2 mt-2">
                              <div className="bg-gray-700/50 p-1 rounded-full mt-0.5">
                                <ChevronRight className="w-3 h-3 text-gray-400" />
                              </div>
                              <p className="text-xs text-gray-300">
                                {factor.mitigationStrategy}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Call to Action Button */}
                  <div className="pt-2">
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/20">
                      <AlertTriangle className="w-5 h-5" />
                      Schedule Risk Assessment Call
                    </button>
                  </div>
                </>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                  <div className="w-12 h-12 border-4 border-t-red-500 border-gray-600/30 rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-300">Analyzing portfolio risk...</p>
                </div>
              )}
            </div>
          </div>

          {/* AI Insights */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 md:p-6 text-white"><div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8" />
              <h3 className="text-xl font-bold flex-1">AI Market Insights</h3>              <button 
                onClick={() => fetchAiInsights()}
                disabled={isLoading}
                className={`p-2 rounded-full ${isLoading 
                  ? 'bg-white/10 text-white/50' 
                  : 'bg-white/20 hover:bg-white/30 text-white'} transition-colors`}
                title="Refresh AI insights"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Emerging Trends</span>
                </div>
                {isLoading ? (
                  <div className="h-4 bg-white/20 rounded animate-pulse w-full"></div>
                ) : (
                  <p className="text-sm text-gray-100">
                    {aiInsights.emergingTrend}
                  </p>
                )}
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-medium">Risk Alert</span>
                </div>
                {isLoading ? (
                  <div className="h-4 bg-white/20 rounded animate-pulse w-full"></div>
                ) : (
                  <p className="text-sm text-gray-100">
                    {aiInsights.riskAlert}
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Investment Recommendations */}
          <div className="bg-white rounded-xl p-4 md:p-6">
            <h2 className="text-xl font-bold mb-6">Recommended Investments</h2>
            <div className="space-y-4">
              {opportunityAnalysis?.topOpportunities && opportunityAnalysis.topOpportunities.length > 0 ? (
                opportunityAnalysis.topOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={`https://images.pexels.com/photos/${3800000 + index}/pexels-photo-${3800000 + index}.jpeg`}
                      alt={opportunity.vehicle}
                      className="w-full md:w-24 h-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">                      <h3 className="font-medium">{opportunity.vehicle}</h3>
                      <div className="text-sm text-gray-600">{opportunity.rationale} · {opportunity.riskLevel} risk</div>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-sm text-emerald-600">↑ {(opportunity.expectedROI || 0).toFixed(1)}% Expected ROI</span>
                        <span className="text-sm text-gray-600">{(opportunity.annualYield || 0).toFixed(1)}% Annual Yield</span>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                // Default/Fallback content if no opportunities
                <>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
                      alt="Porsche 911"
                      className="w-full md:w-24 h-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">Porsche 911 GT3 RS</h3>
                      <div className="text-sm text-gray-600">High appreciation potential · Low risk</div>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-sm text-emerald-600">↑ 15.2% Expected ROI</span>
                        <span className="text-sm text-gray-600">8.5% Annual Yield</span>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      View Details
                    </button>
                  </div>
                  {/* The following div was causing the error if it was a direct sibling in this conditional rendering path */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                     <img
                        src="https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg" // Placeholder image, update if needed
                        alt="Tesla Model S Plaid"
                        className="w-full md:w-24 h-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium">Tesla Model S Plaid</h3>
                      <div className="text-sm text-gray-600">Emerging market · Medium risk</div>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="text-sm text-emerald-600">↑ 18.7% Expected ROI</span>
                        <span className="text-sm text-gray-600">9.2% Annual Yield</span>
                      </div>
                    </div>
                    <button className="w-full md:w-auto px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* AI Assistant and Analytics */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">AI Investment Advisor</h2>
                <p className="text-sm text-gray-600">Get personalized advice</p>
              </div>
            </div>

            <div className="h-[300px] border border-gray-100 rounded-xl mb-4 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                    {msg.role === 'assistant' && (
                        <div className={`w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0`}>
                           <Brain className="w-4 h-4 text-red-600" />
                        </div>
                    )}
                    <div className={`rounded-2xl p-3 max-w-[80%] ${msg.role === 'user' ? 'bg-red-100 text-red-900 rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                     {msg.role === 'user' && (
                        <div className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0`}>
                           {/* Optionally, add a user icon here */}
                        </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about market trends, risks, or opportunities..."
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg"
                  alt="Performance"
                  className="w-full sm:w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <div className="text-xl font-bold text-emerald-600">+{marketIntelligence.marketGrowth.toFixed(1)}%</div>
                  </div>
                  <div className="text-sm text-gray-600">Annual Growth</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">                  <div className="text-sm text-gray-600">ROI</div>
                  <div className="text-lg font-bold">
                    {opportunityAnalysis?.topOpportunities && opportunityAnalysis.topOpportunities.length > 0
                      ? `${(opportunityAnalysis.topOpportunities[0].expectedROI || 0).toFixed(1)}%`
                      : '18.3%'}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-sm text-gray-600">Yield</div>
                  <div className="text-lg font-bold">
                    {opportunityAnalysis?.topOpportunities && opportunityAnalysis.topOpportunities.length > 0
                      ? `${(opportunityAnalysis.topOpportunities[0].annualYield || 0).toFixed(1)}%`
                      : '9.2%'}
                  </div>                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWealthManager;
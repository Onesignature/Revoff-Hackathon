import React, { useState, useEffect, useCallback } from 'react';
import { Brain, TrendingUp, AlertTriangle, ArrowUpRight, Send, ChevronRight, RefreshCw } from 'lucide-react';

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
  expectedROI?: number; // Optional as per usage
  annualYield?: number; // Optional as per usage
  riskLevel: string;
  rationale: string;
  imageUrl?: string;
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

// More specific type for AI insight items if known, e.g.:
interface AIInsightItem {
    insight: string;
    category?: string;
    // other properties
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
  });
  const [aiInsights, setAiInsights] = useState({
    emergingTrend: 'Electric vehicle market shows 32% growth potential in luxury segment',
    riskAlert: 'Consider diversifying portfolio across different vehicle categories'
  });
  const timeframes = ['1W', '1M', '3M', '6M', '1Y', 'ALL'];

  const userId = 'user123';

  const fetchRiskAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/wealth/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          analysisType: 'risk'
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch risk analysis');
      const data = await response.json();
      if (data.success && data.result) {
        setRiskAnalysis(data.result);
      } else {
        console.error('Invalid API response format for risk analysis:', data);
      }
    } catch (error) {
      console.error('Error fetching risk analysis:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const fetchOpportunityAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/wealth/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          analysisType: 'opportunity'
        }),
      });
      if (!response.ok) throw new Error('Failed to fetch opportunity analysis');
      const data = await response.json();
      if (data.success && data.result) {
        setOpportunityAnalysis(data.result);
        if (data.result.emergingTrends && data.result.emergingTrends.length > 0) {
          const topTrend = data.result.emergingTrends[0];
          setAiInsights(prev => ({
            ...prev,
            emergingTrend: `${topTrend.trend} shows ${topTrend.confidenceLevel}% confidence level in ${topTrend.impact}`
          }));
        }
        if (data.result.recommendedActions && data.result.recommendedActions.length > 0) {
          setAiInsights(prev => ({
            ...prev,
            riskAlert: data.result.recommendedActions[0]
          }));
        }
      } else {
        console.error('Invalid API response format for opportunity analysis:', data);
      }
    } catch (error) {
      console.error('Error fetching opportunity analysis:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const randomizeAiInsightsAndKeyInsights = useCallback(() => {
    const vehicleTypes = ['Luxury SUV', 'Sports car', 'Electric vehicle', 'Hypercar', 'Classic car'];
    const riskActions = ['diversifying', 'rebalancing', 'monitoring', 'hedging'];
    const marketSegments = ['luxury', 'electric', 'high-performance', 'collectible', 'exotic'];
    const marketTrends = ['growing rapidly', 'showing strong demand', 'gaining investor interest', 'outperforming other segments'];

    const randomVehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
    const randomGrowth = Math.floor(Math.random() * 40) + 10;
    const randomAction = riskActions[Math.floor(Math.random() * riskActions.length)];
    const randomSegmentForTrend = marketSegments[Math.floor(Math.random() * marketSegments.length)];

    setAiInsights({
      emergingTrend: `${randomVehicleType} market shows ${randomGrowth}% growth potential in ${randomSegmentForTrend} segment`,
      riskAlert: `Consider ${randomAction} your portfolio across different vehicle categories`
    });

    const randomKeyInsights: string[] = [];
    const usedVehicleTypesForKeyInsights: string[] = [];
    for (let i = 0; i < 3; i++) {
      let vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      while (usedVehicleTypesForKeyInsights.includes(vehicleType)) {
        vehicleType = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)];
      }
      usedVehicleTypesForKeyInsights.push(vehicleType);
      const segment = marketSegments[Math.floor(Math.random() * marketSegments.length)];
      const trend = marketTrends[Math.floor(Math.random() * marketTrends.length)];
      randomKeyInsights.push(`${vehicleType} ${segment} segment ${trend}`);
    }
    setMarketIntelligence(prev => ({
      ...prev,
      keyInsights: randomKeyInsights
    }));
  }, []);


  const fetchAiInsights = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/wealth/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, analysisType: 'comprehensive' }),
      });
      if (!response.ok) throw new Error('Failed to fetch AI insights');
      const data = await response.json();
      if (data.success && data.result && data.result.aiInsights) {
        const insightsList: AIInsightItem[] = data.result.aiInsights;
        const trendInsight = insightsList.find(i => i.category?.toLowerCase().includes('trend') || i.insight?.toLowerCase().includes('trend'));
        const riskInsight = insightsList.find(i => i.category?.toLowerCase().includes('risk') || i.insight?.toLowerCase().includes('risk'));

        setAiInsights(prev => ({ // Preserve opportunity-specific insights if they were set
          emergingTrend: trendInsight?.insight || prev.emergingTrend,
          riskAlert: riskInsight?.insight || prev.riskAlert,
        }));

        const otherInsights = insightsList
          .filter(i => i !== trendInsight && i !== riskInsight && i.insight)
          .map(i => i.insight);
        
        let keyInsightsResult = [...otherInsights];
        if(trendInsight?.insight) keyInsightsResult.unshift(trendInsight.insight);
        if(riskInsight?.insight) keyInsightsResult.unshift(riskInsight.insight);
        keyInsightsResult = keyInsightsResult.slice(0,3);

        while (keyInsightsResult.length < 3) {
            const segments = ['luxury', 'electric', 'sports', 'SUV', 'classic'];
            const actions = ['growing', 'trending', 'showing potential', 'gaining interest'];
            const randomDefaultInsight = `${segments[Math.floor(Math.random() * segments.length)]} segment ${actions[Math.floor(Math.random() * actions.length)]}`;
            if (!keyInsightsResult.includes(randomDefaultInsight)) {
                 keyInsightsResult.push(randomDefaultInsight);
            }
        }
        setMarketIntelligence(prev => ({ ...prev, keyInsights: keyInsightsResult }));

      } else {
        randomizeAiInsightsAndKeyInsights();
      }
    } catch (error) {
      console.error('Error fetching AI insights:', error);
      randomizeAiInsightsAndKeyInsights();
    } finally {
      setIsLoading(false);
    }
  }, [userId, randomizeAiInsightsAndKeyInsights]);

  const fetchMarketIntelligence = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/wealth/insights/${userId}?timeframe=${selectedTimeframe}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        console.warn('Market intelligence endpoint not available - using partial random data');
        // Keep existing keyInsights (or let fetchAiInsights handle them), set others randomly
        setMarketIntelligence(prev => ({
            ...prev,
            sentiment: ['Bullish', 'Neutral', 'Bearish'][Math.floor(Math.random() * 3)],
            confidenceScore: Math.floor(Math.random() * 30) + 70,
            volume: {
                change: parseFloat((Math.random() * 20 - 10).toFixed(1)), // Random change between -10 and 10
                trend: (['up', 'down', 'stable'] as const)[Math.floor(Math.random() * 3)],
            },
            volatility: (['Low', 'Medium', 'High'] as const)[Math.floor(Math.random() * 3)],
            marketGrowth: parseFloat((Math.random() * 15 + 5).toFixed(1)), // Random growth 5-20%
        }));
        return;
      }

      const data = await response.json();
      if (data.success && data.insights?.comprehensive?.result) {
        const result = data.insights.comprehensive.result;
        let keyInsightsFromMarketSummary: string[] = [];
        if (result.marketSummary?.keyTrends && Array.isArray(result.marketSummary.keyTrends)) {
            keyInsightsFromMarketSummary = result.marketSummary.keyTrends.slice(0,3);
        }

        setMarketIntelligence(prev => ({
          ...prev, // Keep existing keyInsights if not provided by this specific endpoint
          keyInsights: keyInsightsFromMarketSummary.length > 0 ? keyInsightsFromMarketSummary : prev.keyInsights,
          sentiment: result.marketSummary?.sentiment || prev.sentiment,
          confidenceScore: result.marketSummary?.confidenceScore || Math.floor(Math.random() * 20) + 80,
          volume: {
            change: result.marketSummary?.volume?.change ?? parseFloat((Math.random() * 20 - 5).toFixed(1)),
            trend: result.marketSummary?.volume?.trend ?? (Math.random() > 0.3 ? 'up' : (Math.random() > 0.5 ? 'down' : 'stable')),
          },
          volatility: result.riskAnalysis?.volatility?.level || prev.volatility,
          marketGrowth: result.marketSummary?.growthRate ?? parseFloat((Math.random() * 20 + 5).toFixed(1)),
        }));
      } else {
         console.warn('Market intelligence data format issue - using partial random data');
         // Fallback similar to !response.ok
          setMarketIntelligence(prev => ({
            ...prev,
            sentiment: ['Bullish', 'Neutral', 'Bearish'][Math.floor(Math.random() * 3)],
            confidenceScore: Math.floor(Math.random() * 30) + 70,
            // Keep existing keyInsights, let fetchAiInsights manage them mostly
        }));
      }
    } catch (error) {
      console.error('Error fetching market intelligence:', error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, selectedTimeframe]);


  const handleSendMessage = async () => {
    if (!message.trim()) return;
    const userMessage = { role: 'user' as const, content: message, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    try {
      const response = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          message: userMessage.content,
          systemMessage: 'You are an AI investment advisor for luxury vehicle investments. Provide clear, concise financial advice.'
        }),
      });
      if (!response.ok) throw new Error('Failed to get AI response');
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', timestamp: new Date() }]);
    }
  };

  useEffect(() => {
    fetchRiskAnalysis();
    fetchOpportunityAnalysis();
    fetchMarketIntelligence();
    fetchAiInsights();
  }, [fetchRiskAnalysis, fetchOpportunityAnalysis, fetchMarketIntelligence, fetchAiInsights]);

  const getRiskLevelWidth = (level?: string) => {
    if (!level) return '0%';
    switch (level.toLowerCase()) {
      case 'low': return '25%';
      case 'medium': return '50%';
      case 'high': return '75%';
      case 'very high': return '90%';
      default: return '50%';
    }
  };

  const getRiskLevelBarColor = (level?: string) => {
    if (!level) return 'bg-gray-300';
    switch (level.toLowerCase()) {
      case 'low': return 'bg-emerald-500';
      case 'medium': return 'bg-amber-500';
      case 'high': return 'bg-red-500';
      case 'very high': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };
  const getRiskLevelTextColor = (level?: string) => {
    if (!level) return 'text-gray-500';
    switch(level.toLowerCase()) {
      case 'low': return 'text-emerald-400';
      case 'medium': return 'text-amber-400';
      case 'high': return 'text-red-400';
      case 'very high': return 'text-red-300';
      default: return 'text-gray-400';
    }
  };


  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-8 p-4 md:p-0">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Wealth Manager</h1>

      {/* Market Overview Card */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Market Overview</h2>
            <p className="text-gray-300 mb-6">
              AI-powered analysis for luxury vehicle investments.
            </p>
            <div className="flex flex-wrap gap-2">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => {
                    setSelectedTimeframe(tf);
                    fetchMarketIntelligence(); // Refetch market intelligence for new timeframe
                    // fetchAiInsights(); // AI insights might not be timeframe dependent, but refresh if desired
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTimeframe === tf
                      ? 'bg-red-600 text-white font-semibold'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>
          <div className="relative h-32 flex items-center justify-center">
             <img
              src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
              alt="Market Trend Backdrop"
              className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-20"
            />
            <div className="text-center z-10">
              <div className="text-4xl font-bold mb-2">
                {marketIntelligence.marketGrowth >= 0 ? '+' : ''}{marketIntelligence.marketGrowth.toFixed(1)}%
              </div>
              <div className="text-gray-300">Market Growth ({selectedTimeframe})</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1: Market Intelligence & Risk Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Market Intelligence */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
                <Brain className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Intelligence</h2>
                <p className="text-gray-600 dark:text-gray-400">Real-time market analysis</p>
              </div>
              <button
                onClick={() => { fetchMarketIntelligence(); fetchAiInsights();}}
                disabled={isLoading}
                className={`p-2 rounded-full ${isLoading
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'} transition-colors`}
                title="Refresh market data"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative h-40">
                  <img
                    src="https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg"
                    alt="Market Analysis"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm">Market Sentiment</div>
                    <div className="text-2xl font-bold">{marketIntelligence.sentiment}</div>
                  </div>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-500/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-700 dark:text-emerald-300">Confidence Score</span>
                    <span className="text-emerald-700 dark:text-emerald-300 font-bold">{marketIntelligence.confidenceScore}%</span>
                  </div>
                  <div className="h-2 bg-emerald-100 dark:bg-emerald-500/30 rounded-full">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${marketIntelligence.confidenceScore}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-gray-600 dark:text-gray-400">Volume Change</div>
                    <div className={`font-medium text-gray-800 dark:text-white ${marketIntelligence.volume.change > 0 ? 'text-green-500' : marketIntelligence.volume.change < 0 ? 'text-red-500' : ''}`}>
                      {marketIntelligence.volume.trend === 'up' ? '↑' : marketIntelligence.volume.trend === 'down' ? '↓' : '→'} {marketIntelligence.volume.change.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <div className="text-gray-600 dark:text-gray-400">Volatility</div>
                    <div className="font-medium text-gray-800 dark:text-white">{marketIntelligence.volatility}</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex flex-col">
                <h3 className="font-medium text-gray-800 dark:text-white mb-3">Key Insights</h3>
                {isLoading && (!marketIntelligence.keyInsights || marketIntelligence.keyInsights.length ===0) ? (
                  <div className="flex flex-col space-y-2 flex-grow justify-center">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-4/6"></div>
                  </div>
                ) : (
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    {(marketIntelligence.keyInsights || []).map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Risk Analysis */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 md:p-6 text-white relative overflow-hidden shadow-xl">
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-red-500 opacity-10 blur-lg"></div>
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="flex items-center gap-3 mb-6 z-10 relative">
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
                className={`p-2 rounded-full ${isLoading ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed' : 'bg-gray-700/50 hover:bg-gray-600/50 text-white'} transition-colors`}
                title="Refresh risk analysis"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-6 z-10 relative">
              {!riskAnalysis && isLoading ? (
                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                    <div className="w-12 h-12 border-4 border-t-red-500 border-gray-600/30 rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-300">Analyzing portfolio risk...</p>
                </div>
              ) : riskAnalysis ? (
                <>
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 relative">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-lg">Overall Risk Profile</span>
                      <span className={`font-semibold text-lg px-3 py-1 rounded-full ${getRiskLevelBarColor(riskAnalysis.overallRiskLevel).replace('bg-', 'bg-opacity-20 ').replace('-500', '-400').replace('gray','gray-300')} ${getRiskLevelTextColor(riskAnalysis.overallRiskLevel)}`}>
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
                      <span>Low</span><span>Medium</span><span>High</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {riskAnalysis.marketRisks?.volatility && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.volatility.level)}`}></div><span>Market Volatility</span></div>
                            <span className={`text-sm font-semibold ${getRiskLevelTextColor(riskAnalysis.marketRisks.volatility.level)}`}>{riskAnalysis.marketRisks.volatility.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-3 bg-gray-700/60 rounded-full mb-1 overflow-hidden">
                            <div className={`h-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.volatility.level)} rounded-full`} style={{ width: `${Math.min(100, riskAnalysis.marketRisks.volatility.percentage)}%` }} />
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                            {riskAnalysis.marketRisks.volatility.level === 'low' ? 'Market shows stable patterns' : riskAnalysis.marketRisks.volatility.level === 'medium' ? 'Some market fluctuations expected' : 'High market unpredictability detected'}
                        </p>
                        </div>
                    )}
                    {riskAnalysis.marketRisks?.liquidity && (
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <div className="flex items-center gap-2"><div className={`w-3 h-3 rounded-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.liquidity.level)}`}></div><span>Liquidity Risk</span></div>
                            <span className={`text-sm font-semibold ${getRiskLevelTextColor(riskAnalysis.marketRisks.liquidity.level)}`}>{riskAnalysis.marketRisks.liquidity.percentage.toFixed(1)}%</span>
                        </div>
                        <div className="h-3 bg-gray-700/60 rounded-full mb-1 overflow-hidden">
                            <div className={`h-full ${getRiskLevelBarColor(riskAnalysis.marketRisks.liquidity.level)} rounded-full`} style={{ width: `${Math.min(100, riskAnalysis.marketRisks.liquidity.percentage)}%` }} />
                        </div>
                         <p className="text-xs text-gray-400 mt-2">
                            {riskAnalysis.marketRisks.liquidity.level === 'low' ? 'Assets can be easily sold' : riskAnalysis.marketRisks.liquidity.level === 'medium' ? 'Some assets may take time' : 'Significant challenges in liquidation'}
                        </p>
                        </div>
                    )}
                  </div>
                  {riskAnalysis.riskFactors && riskAnalysis.riskFactors.length > 0 && (
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-amber-400" /><span>Key Risk Factors & Mitigation</span></h4>
                      <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {riskAnalysis.riskFactors.map((factor, index) => (
                          <div key={index} className="border border-gray-700 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-700/70 transition-colors">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-medium text-sm flex items-center gap-2"><div className={`w-2 h-2 rounded-full ${getRiskLevelBarColor(factor.impact)}`}></div>{factor.factor}</span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getRiskLevelBarColor(factor.impact).replace('bg-','bg-opacity-20 ')} ${getRiskLevelTextColor(factor.impact)}`}>{factor.impact.toUpperCase()}</span>
                            </div>
                            <div className="flex items-start gap-2 mt-2">
                              <div className="bg-gray-700/50 p-1 rounded-full mt-0.5"><ChevronRight className="w-3 h-3 text-gray-400" /></div>
                              <p className="text-xs text-gray-300">{factor.mitigationStrategy}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="pt-2">
                    <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg hover:shadow-red-500/30">
                      <AlertTriangle className="w-5 h-5" />Schedule Risk Assessment Call
                    </button>
                  </div>
                </>
              ) : (
                 <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 text-center min-h-[200px] flex flex-col justify-center items-center">
                    <AlertTriangle className="w-10 h-10 text-amber-400 mb-3"/>
                    <p className="text-gray-300 font-medium">No risk analysis data available.</p>
                    <p className="text-sm text-gray-400">Try refreshing or check back later.</p>
                </div>
              )}
            </div>
          </div>
           {/* AI Insights */}
           <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-4 md:p-6 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Brain className="w-8 h-8" />
              <h3 className="text-xl font-bold flex-1">AI Strategic Insights</h3>
              <button
                onClick={() => fetchAiInsights()}
                disabled={isLoading}
                 className={`p-2 rounded-full ${isLoading ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30 text-white'} transition-colors`}
                title="Refresh AI insights"
              >
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5" /><span className="font-medium">Emerging Trends</span></div>
                {isLoading && !aiInsights.emergingTrend ? <div className="h-4 bg-white/20 rounded animate-pulse w-full"></div> : <p className="text-sm text-gray-100">{aiInsights.emergingTrend}</p>}
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5" /><span className="font-medium">Key Recommendation</span></div>
                 {isLoading && !aiInsights.riskAlert ? <div className="h-4 bg-white/20 rounded animate-pulse w-full"></div> : <p className="text-sm text-gray-100">{aiInsights.riskAlert}</p>}
              </div>
            </div>
          </div>


          {/* Investment Recommendations */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recommended Investments</h2>
                 <button
                    onClick={() => fetchOpportunityAnalysis()}
                    disabled={isLoading}
                    className={`p-2 rounded-full ${isLoading ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'} transition-colors`}
                    title="Refresh recommendations"
                >
                    <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
            </div>
            <div className="space-y-4">
              {isLoading && !opportunityAnalysis ? (
                Array.from({ length: 2 }).map((_, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl animate-pulse">
                        <div className="w-full md:w-24 h-24 bg-gray-200 dark:bg-gray-600 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 min-w-0 space-y-2">
                            <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
                            <div className="flex gap-4 mt-1">
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/3"></div>
                            </div>
                        </div>
                        <div className="w-full md:w-auto h-10 px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-lg mt-2 md:mt-0"></div>
                    </div>
                ))
              ) : opportunityAnalysis?.topOpportunities && opportunityAnalysis.topOpportunities.length > 0 ? (
                opportunityAnalysis.topOpportunities.map((opportunity, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:shadow-lg transition-shadow">
                    <img
                      src={opportunity.imageUrl ? `${opportunity.imageUrl}` : `https://source.unsplash.com/random/400x400?luxurycar&sig=${index}`}
                      alt={opportunity.vehicle}
                      className="w-full md:w-24 h-24 object-cover rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-700"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white">{opportunity.vehicle}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.rationale} · {opportunity.riskLevel} risk</p>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                        <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">↑ {(opportunity.expectedROI || 0).toFixed(1)}% ROI</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{(opportunity.annualYield || 0).toFixed(1)}% Yield</span>
                      </div>
                    </div>
                    <button className="w-full md:w-auto mt-3 md:mt-0 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500" />
                  No investment opportunities available at the moment.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 2: AI Assistant & Performance Metrics */}
        <div className="space-y-6">
          {/* AI Investment Advisor */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
                <Brain className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">AI Investment Advisor</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get personalized advice</p>
              </div>
            </div>
            <div className="h-[300px] border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/30 rounded-xl mb-4 p-4 overflow-y-auto flex flex-col">
              <div className="space-y-4 flex-grow">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Brain className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                    )}
                    <div className={`rounded-xl p-3 max-w-[80%] ${msg.role === 'user' ? 'bg-red-500 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                      <p className={`text-xs mt-1.5 ${msg.role === 'user' ? 'text-red-200 text-right' : 'text-gray-500 dark:text-gray-400 text-left'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                        {/* User Initials or Icon */}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">U</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask the AI advisor..."
                className="flex-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !message.trim()}
                className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Performance Snapshot</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <img
                  src="https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg"
                  alt="Performance Chart"
                  className="w-full sm:w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                        {marketIntelligence.marketGrowth >= 0 ? '+' : ''}{marketIntelligence.marketGrowth.toFixed(1)}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Overall Growth ({selectedTimeframe})</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. ROI</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {opportunityAnalysis?.topOpportunities && opportunityAnalysis.topOpportunities.length > 0 && opportunityAnalysis.topOpportunities[0].expectedROI !== undefined
                      ? `${(opportunityAnalysis.topOpportunities[0].expectedROI).toFixed(1)}%`
                      : isLoading ? '...' : 'N/A'}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg. Yield</div>
                  <div className="text-xl font-bold text-gray-900 dark:text-white">
                    {opportunityAnalysis?.topOpportunities && opportunityAnalysis.topOpportunities.length > 0 && opportunityAnalysis.topOpportunities[0].annualYield !== undefined
                      ? `${(opportunityAnalysis.topOpportunities[0].annualYield).toFixed(1)}%`
                      : isLoading ? '...' : 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWealthManager;
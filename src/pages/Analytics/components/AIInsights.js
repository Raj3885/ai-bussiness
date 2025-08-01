import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { 
  Brain, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Lightbulb,
  Target,
  Zap,
  Download,
  RefreshCw,
  Eye,
  BarChart3,
  Users,
  DollarSign
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const AIInsights = () => {
  const [analysisType, setAnalysisType] = useState('comprehensive');
  const [insights, setInsights] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate AI insights mutation
  const generateInsightsMutation = useMutation(
    (data) => analyticsAPI.generateInsights(data),
    {
      onSuccess: (response) => {
        setInsights(response.data.analysis);
        toast.success('AI insights generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate insights');
      },
      onSettled: () => {
        setIsGenerating(false);
      }
    }
  );

  const handleGenerateInsights = () => {
    setIsGenerating(true);
    generateInsightsMutation.mutate({
      analysisType,
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date()
      },
      includeCompetitive: true,
      includeCustomerSegments: true,
      includePredictions: true
    });
  };

  // Mock insights data for demonstration
  const mockInsights = {
    overallPerformance: {
      score: 78,
      status: 'good',
      summary: 'Your business is performing well with strong revenue growth and customer acquisition. Focus on improving conversion rates for optimal performance.'
    },
    keyInsights: [
      {
        category: 'revenue',
        insight: 'Revenue has increased by 15% this month, driven primarily by repeat customers and higher average order values.',
        impact: 'high',
        trend: 'increasing'
      },
      {
        category: 'customers',
        insight: 'Customer acquisition cost has decreased by 8% while retention rate improved to 85%.',
        impact: 'high',
        trend: 'increasing'
      },
      {
        category: 'traffic',
        insight: 'Website traffic shows seasonal patterns with 20% higher engagement on weekends.',
        impact: 'medium',
        trend: 'stable'
      },
      {
        category: 'marketing',
        insight: 'Email campaigns are outperforming social media ads with 3x higher conversion rates.',
        impact: 'medium',
        trend: 'increasing'
      }
    ],
    recommendations: [
      {
        priority: 'high',
        action: 'Optimize website conversion funnel to reduce drop-off at checkout',
        expectedImpact: 'Could increase revenue by 12-18% within 2 months',
        timeframe: 'short-term'
      },
      {
        priority: 'high',
        action: 'Expand email marketing campaigns based on current success',
        expectedImpact: 'Potential 25% increase in customer engagement',
        timeframe: 'immediate'
      },
      {
        priority: 'medium',
        action: 'Implement weekend-specific promotions to capitalize on higher engagement',
        expectedImpact: 'Expected 10-15% boost in weekend sales',
        timeframe: 'short-term'
      }
    ],
    predictions: {
      nextMonth: {
        revenue: '+12%',
        customers: '+8%',
        traffic: '+5%'
      }
    },
    riskFactors: [
      {
        risk: 'Increasing customer acquisition cost in competitive market',
        severity: 'medium',
        mitigation: 'Focus on organic growth and referral programs'
      },
      {
        risk: 'Seasonal decline expected in Q4 based on historical patterns',
        severity: 'low',
        mitigation: 'Prepare targeted holiday campaigns early'
      }
    ],
    opportunities: [
      {
        opportunity: 'Untapped mobile user segment showing high engagement',
        potential: 'high',
        requirements: 'Mobile app development or mobile-optimized experience'
      },
      {
        opportunity: 'Cross-selling potential to existing customer base',
        potential: 'medium',
        requirements: 'Product recommendation system implementation'
      }
    ]
  };

  const displayInsights = insights || mockInsights;

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'revenue': return DollarSign;
      case 'customers': return Users;
      case 'traffic': return Eye;
      case 'marketing': return BarChart3;
      default: return Sparkles;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Insights</h2>
            <p className="text-gray-600 mt-1">Intelligent analysis of your business performance</p>
          </div>
        </div>
        <button
          onClick={handleGenerateInsights}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate New Insights</span>
            </>
          )}
        </button>
      </div>

      {/* Overall Performance Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border border-blue-200"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Overall Performance Score</h3>
            <p className="text-gray-700 mb-4">{displayInsights.overallPerformance.summary}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-4xl font-bold text-blue-600">{displayInsights.overallPerformance.score}</span>
                <span className="text-gray-600">/100</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                displayInsights.overallPerformance.status === 'excellent' ? 'bg-green-100 text-green-700' :
                displayInsights.overallPerformance.status === 'good' ? 'bg-blue-100 text-blue-700' :
                displayInsights.overallPerformance.status === 'average' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {displayInsights.overallPerformance.status.charAt(0).toUpperCase() + displayInsights.overallPerformance.status.slice(1)}
              </span>
            </div>
          </div>
          <div className="w-32 h-32 relative">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray={`${displayInsights.overallPerformance.score}, 100`}
              />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayInsights.keyInsights.map((insight, index) => {
          const CategoryIcon = getCategoryIcon(insight.category);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CategoryIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900 capitalize">{insight.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                    {insight.impact} impact
                  </span>
                  {insight.trend === 'increasing' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : insight.trend === 'decreasing' ? (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  ) : (
                    <Target className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </div>
              <p className="text-gray-700">{insight.insight}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>AI Recommendations</span>
        </h3>
        <div className="space-y-4">
          {displayInsights.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.action}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                  {rec.priority} priority
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{rec.expectedImpact}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Timeframe: {rec.timeframe}</span>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Implement →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Predictions and Risks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Predictions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-purple-500" />
            <span>Next Month Predictions</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Revenue</span>
              <span className="text-green-600 font-semibold">{displayInsights.predictions.nextMonth.revenue}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Customers</span>
              <span className="text-blue-600 font-semibold">{displayInsights.predictions.nextMonth.customers}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Traffic</span>
              <span className="text-purple-600 font-semibold">{displayInsights.predictions.nextMonth.traffic}</span>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span>Risk Factors</span>
          </h3>
          <div className="space-y-3">
            {displayInsights.riskFactors.map((risk, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-red-900">{risk.risk}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    risk.severity === 'high' ? 'bg-red-100 text-red-700' :
                    risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {risk.severity}
                  </span>
                </div>
                <p className="text-xs text-red-700">{risk.mitigation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Opportunities */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>Growth Opportunities</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayInsights.opportunities.map((opp, index) => (
            <div key={index} className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-900">{opp.opportunity}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  opp.potential === 'high' ? 'bg-green-100 text-green-700' :
                  opp.potential === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {opp.potential} potential
                </span>
              </div>
              <p className="text-sm text-green-700">{opp.requirements}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="flex items-center justify-center">
        <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-colors">
          <Download className="w-5 h-5" />
          <span>Export Insights Report</span>
        </button>
      </div>
    </div>
  );
};

export default AIInsights;

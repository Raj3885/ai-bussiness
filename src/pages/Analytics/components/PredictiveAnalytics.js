import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Target,
  Calendar,
  BarChart3,
  DollarSign,
  Users,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lightbulb
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const PredictiveAnalytics = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [selectedTimeframe, setSelectedTimeframe] = useState('quarterly');
  const [isGenerating, setIsGenerating] = useState(false);
  const [predictions, setPredictions] = useState(null);

  // Generate predictions mutation
  const generatePredictionsMutation = useMutation(
    (data) => analyticsAPI.generatePredictions(data),
    {
      onSuccess: (response) => {
        setPredictions(response.data.predictions);
        toast.success('Predictions generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate predictions');
      },
      onSettled: () => {
        setIsGenerating(false);
      }
    }
  );

  // Mock predictions data
  const mockPredictions = {
    predictions: {
      nextQuarter: {
        trend: 'increasing',
        confidence: 'high',
        expectedChange: '+18%',
        factors: ['Seasonal uptick', 'New product launch', 'Marketing campaign']
      },
      nextYear: {
        trend: 'increasing',
        confidence: 'medium',
        expectedChange: '+35%',
        factors: ['Market expansion', 'Product improvements', 'Customer retention']
      }
    },
    scenarios: [
      {
        name: 'optimistic',
        probability: '25%',
        outcome: 'Revenue grows by 45% with successful product launches and market expansion'
      },
      {
        name: 'realistic',
        probability: '50%',
        outcome: 'Revenue grows by 25-30% with steady customer acquisition and retention'
      },
      {
        name: 'pessimistic',
        probability: '25%',
        outcome: 'Revenue grows by 10-15% due to market challenges and increased competition'
      }
    ],
    recommendations: [
      {
        timeframe: 'immediate',
        action: 'Increase marketing spend by 20% to capitalize on predicted growth',
        rationale: 'High confidence prediction shows strong ROI potential'
      },
      {
        timeframe: 'short-term',
        action: 'Expand customer support team to handle increased volume',
        rationale: 'Customer growth prediction requires adequate support infrastructure'
      },
      {
        timeframe: 'long-term',
        action: 'Invest in product development for next-generation features',
        rationale: 'Sustained growth requires continuous innovation'
      }
    ]
  };

  const metrics = [
    { id: 'revenue', label: 'Revenue', icon: DollarSign, color: 'green' },
    { id: 'customers', label: 'Customers', icon: Users, color: 'blue' },
    { id: 'traffic', label: 'Website Traffic', icon: Eye, color: 'purple' },
    { id: 'conversion', label: 'Conversion Rate', icon: Target, color: 'orange' }
  ];

  const timeframes = [
    { id: 'monthly', label: 'Next Month' },
    { id: 'quarterly', label: 'Next Quarter' },
    { id: 'yearly', label: 'Next Year' }
  ];

  const displayPredictions = predictions || mockPredictions;

  const handleGeneratePredictions = () => {
    setIsGenerating(true);
    generatePredictionsMutation.mutate({
      metric: selectedMetric,
      timeframe: selectedTimeframe,
      includeScenarios: true
    });
  };

  const getConfidenceColor = (confidence) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return TrendingUp;
      case 'decreasing': return TrendingDown;
      default: return Target;
    }
  };

  const getScenarioColor = (scenario) => {
    switch (scenario) {
      case 'optimistic': return 'border-green-200 bg-green-50';
      case 'realistic': return 'border-blue-200 bg-blue-50';
      case 'pessimistic': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Predictive Analytics</h2>
            <p className="text-gray-600 mt-1">AI-powered forecasting and trend analysis</p>
          </div>
        </div>
        <button
          onClick={handleGeneratePredictions}
          disabled={isGenerating}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Generate Predictions</span>
            </>
          )}
        </button>
      </div>

      {/* Configuration */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Prediction Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metric Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Metric</label>
            <div className="grid grid-cols-2 gap-3">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <button
                    key={metric.id}
                    onClick={() => setSelectedMetric(metric.id)}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      selectedMetric === metric.id
                        ? `border-${metric.color}-500 bg-${metric.color}-50 text-${metric.color}-700`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{metric.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timeframe Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Prediction Timeframe</label>
            <div className="space-y-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.id}
                  onClick={() => setSelectedTimeframe(timeframe.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-colors ${
                    selectedTimeframe === timeframe.id
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">{timeframe.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Quarter Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Next Quarter Forecast</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(displayPredictions.predictions.nextQuarter.confidence)}`}>
              {displayPredictions.predictions.nextQuarter.confidence} confidence
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            {React.createElement(getTrendIcon(displayPredictions.predictions.nextQuarter.trend), {
              className: `w-8 h-8 ${displayPredictions.predictions.nextQuarter.trend === 'increasing' ? 'text-green-500' : 'text-red-500'}`
            })}
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {displayPredictions.predictions.nextQuarter.expectedChange}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {displayPredictions.predictions.nextQuarter.trend} trend
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Factors</h4>
            <div className="space-y-1">
              {displayPredictions.predictions.nextQuarter.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Next Year Prediction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Next Year Forecast</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getConfidenceColor(displayPredictions.predictions.nextYear.confidence)}`}>
              {displayPredictions.predictions.nextYear.confidence} confidence
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            {React.createElement(getTrendIcon(displayPredictions.predictions.nextYear.trend), {
              className: `w-8 h-8 ${displayPredictions.predictions.nextYear.trend === 'increasing' ? 'text-green-500' : 'text-red-500'}`
            })}
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {displayPredictions.predictions.nextYear.expectedChange}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                {displayPredictions.predictions.nextYear.trend} trend
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Factors</h4>
            <div className="space-y-1">
              {displayPredictions.predictions.nextYear.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{factor}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scenario Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Scenario Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayPredictions.scenarios.map((scenario, index) => (
            <motion.div
              key={scenario.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${getScenarioColor(scenario.name)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 capitalize">{scenario.name}</h4>
                <span className="text-sm font-medium text-gray-600">{scenario.probability}</span>
              </div>
              <p className="text-sm text-gray-700">{scenario.outcome}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-500" />
          <span>Strategic Recommendations</span>
        </h3>
        <div className="space-y-4">
          {displayPredictions.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rec.action}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rec.timeframe === 'immediate' ? 'bg-red-100 text-red-700' :
                  rec.timeframe === 'short-term' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {rec.timeframe}
                </span>
              </div>
              <p className="text-sm text-gray-600">{rec.rationale}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Historical Accuracy */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Prediction Accuracy</h3>
            <p className="text-gray-600">Our AI model's historical performance</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">87%</div>
            <div className="text-sm text-gray-600">Average Accuracy</div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xl font-semibold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Short-term (1 month)</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-blue-600">87%</div>
            <div className="text-sm text-gray-600">Medium-term (3 months)</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-semibold text-purple-600">78%</div>
            <div className="text-sm text-gray-600">Long-term (1 year)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;

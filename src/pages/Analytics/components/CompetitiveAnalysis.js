import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import { 
  TrendingUp, 
  Plus, 
  Shield, 
  AlertTriangle, 
  Target,
  Users,
  DollarSign,
  BarChart3,
  Eye,
  Zap,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const CompetitiveAnalysis = () => {
  const [showAddCompetitor, setShowAddCompetitor] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({
    name: '',
    website: '',
    marketPosition: 'competitor'
  });
  const [analysis, setAnalysis] = useState(null);
  const queryClient = useQueryClient();

  // Generate competitive analysis mutation
  const generateAnalysisMutation = useMutation(
    (data) => analyticsAPI.generateCompetitiveAnalysis(data),
    {
      onSuccess: (response) => {
        setAnalysis(response.data.analysis);
        toast.success('Competitive analysis generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate analysis');
      },
      onSettled: () => {
        setIsGenerating(false);
      }
    }
  );

  // Mock competitive analysis data
  const mockAnalysis = {
    marketAnalysis: {
      marketSize: '$2.5B and growing at 15% annually',
      growthRate: '15% YoY',
      trends: [
        'Increased demand for AI-powered solutions',
        'Shift towards mobile-first experiences',
        'Growing emphasis on data privacy and security'
      ]
    },
    competitivePosition: {
      strengths: [
        'Strong brand recognition',
        'Superior customer service',
        'Innovative product features',
        'Competitive pricing strategy'
      ],
      weaknesses: [
        'Limited market presence in emerging markets',
        'Slower product development cycle',
        'Higher customer acquisition costs'
      ],
      opportunities: [
        'Expansion into mobile market',
        'Partnership opportunities with tech giants',
        'AI integration potential',
        'International market expansion'
      ],
      threats: [
        'New market entrants with disruptive technology',
        'Economic downturn affecting customer spending',
        'Regulatory changes in data privacy'
      ]
    },
    recommendations: [
      {
        strategy: 'Accelerate mobile product development',
        rationale: 'Mobile usage is growing 40% YoY in target market',
        implementation: 'Allocate 30% more resources to mobile team, hire mobile specialists'
      },
      {
        strategy: 'Implement AI-powered customer insights',
        rationale: 'Competitors gaining advantage with AI features',
        implementation: 'Partner with AI vendors, develop in-house ML capabilities'
      },
      {
        strategy: 'Expand into European markets',
        rationale: 'Lower competition and high demand in EU',
        implementation: 'Establish EU office, hire local sales team, adapt product for GDPR'
      }
    ],
    benchmarks: {
      industryAverages: {
        customerAcquisitionCost: '$150-250',
        customerLifetimeValue: '$1,200-2,000',
        conversionRate: '2.5-4.2%'
      }
    }
  };

  const mockCompetitors = [
    {
      name: 'TechCorp Solutions',
      website: 'techcorp.com',
      marketShare: 25,
      strengths: ['Market leader', 'Strong R&D', 'Global presence'],
      weaknesses: ['High prices', 'Complex UI', 'Slow support'],
      pricing: { tier: 'Premium', range: '$99-299/month' }
    },
    {
      name: 'InnovateLabs',
      website: 'innovatelabs.io',
      marketShare: 18,
      strengths: ['Innovative features', 'Great UX', 'Fast growth'],
      weaknesses: ['Limited integrations', 'New to market', 'Small team'],
      pricing: { tier: 'Mid-range', range: '$49-149/month' }
    },
    {
      name: 'StartupX',
      website: 'startupx.com',
      marketShare: 12,
      strengths: ['Low cost', 'Simple setup', 'Good for SMBs'],
      weaknesses: ['Limited features', 'Scalability issues', 'Basic support'],
      pricing: { tier: 'Budget', range: '$19-79/month' }
    }
  ];

  const displayAnalysis = analysis || mockAnalysis;

  const handleGenerateAnalysis = () => {
    setIsGenerating(true);
    generateAnalysisMutation.mutate({
      competitors: mockCompetitors.map(c => c.name),
      marketPosition: 'challenger'
    });
  };

  const handleAddCompetitor = () => {
    if (!newCompetitor.name.trim()) {
      toast.error('Please enter competitor name');
      return;
    }
    // Add competitor logic here
    toast.success('Competitor added successfully!');
    setShowAddCompetitor(false);
    setNewCompetitor({ name: '', website: '', marketPosition: 'competitor' });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-lg">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Competitive Analysis</h2>
            <p className="text-gray-600 mt-1">AI-powered market positioning and competitor insights</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowAddCompetitor(true)}
            className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Competitor</span>
          </button>
          <button
            onClick={handleGenerateAnalysis}
            disabled={isGenerating}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Analysis</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{displayAnalysis.marketAnalysis.marketSize}</div>
            <p className="text-sm text-gray-600">Market Size</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{displayAnalysis.marketAnalysis.growthRate}</div>
            <p className="text-sm text-gray-600">Growth Rate</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{mockCompetitors.length}</div>
            <p className="text-sm text-gray-600">Key Competitors</p>
          </div>
        </div>
        
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Market Trends</h4>
          <div className="space-y-2">
            {displayAnalysis.marketAnalysis.trends.map((trend, index) => (
              <div key={index} className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{trend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockCompetitors.map((competitor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Market Share</span>
                <span className="font-medium">{competitor.marketShare}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${competitor.marketShare}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Strengths</h4>
              <div className="space-y-1">
                {competitor.strengths.slice(0, 3).map((strength, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-600">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Weaknesses</h4>
              <div className="space-y-1">
                {competitor.weaknesses.slice(0, 3).map((weakness, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <XCircle className="w-3 h-3 text-red-500" />
                    <span className="text-xs text-gray-600">{weakness}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pricing</span>
                <span className="text-sm font-medium">{competitor.pricing.range}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* SWOT Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths & Opportunities */}
        <div className="space-y-6">
          <div className="bg-green-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Strengths</span>
            </h3>
            <div className="space-y-2">
              {displayAnalysis.competitivePosition.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-800">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Opportunities</span>
            </h3>
            <div className="space-y-2">
              {displayAnalysis.competitivePosition.opportunities.map((opportunity, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">{opportunity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weaknesses & Threats */}
        <div className="space-y-6">
          <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Weaknesses</span>
            </h3>
            <div className="space-y-2">
              {displayAnalysis.competitivePosition.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-yellow-600" />
                  <span className="text-yellow-800">{weakness}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-red-50 p-6 rounded-xl border border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Threats</span>
            </h3>
            <div className="space-y-2">
              {displayAnalysis.competitivePosition.threats.map((threat, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-red-800">{threat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Strategic Recommendations</h3>
        <div className="space-y-4">
          {displayAnalysis.recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h4 className="font-medium text-gray-900 mb-2">{rec.strategy}</h4>
              <p className="text-sm text-gray-600 mb-2">{rec.rationale}</p>
              <p className="text-sm text-blue-600">{rec.implementation}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Industry Benchmarks */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industry Benchmarks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <DollarSign className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">
              {displayAnalysis.benchmarks.industryAverages.customerAcquisitionCost}
            </div>
            <p className="text-sm text-gray-600">Customer Acquisition Cost</p>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">
              {displayAnalysis.benchmarks.industryAverages.customerLifetimeValue}
            </div>
            <p className="text-sm text-gray-600">Customer Lifetime Value</p>
          </div>
          <div className="text-center">
            <BarChart3 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-lg font-semibold text-gray-900">
              {displayAnalysis.benchmarks.industryAverages.conversionRate}
            </div>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
        </div>
      </div>

      {/* Add Competitor Modal */}
      {showAddCompetitor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Competitor</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Competitor Name *</label>
                <input
                  type="text"
                  value={newCompetitor.name}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., TechCorp Solutions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={newCompetitor.website}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://competitor.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Market Position</label>
                <select
                  value={newCompetitor.marketPosition}
                  onChange={(e) => setNewCompetitor(prev => ({ ...prev, marketPosition: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="leader">Market Leader</option>
                  <option value="challenger">Challenger</option>
                  <option value="follower">Follower</option>
                  <option value="niche">Niche Player</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddCompetitor(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCompetitor}
                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                Add Competitor
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CompetitiveAnalysis;

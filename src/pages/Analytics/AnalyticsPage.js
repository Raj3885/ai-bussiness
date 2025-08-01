import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  BarChart3,
  Plus,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  Eye,
  MessageSquare,
  Brain,
  Zap,
  Download,
  RefreshCw,
  Calendar,
  Filter,
  Search,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsAPI } from '../../services/api';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import KPIManager from './components/KPIManager';
import FeedbackAnalyzer from './components/FeedbackAnalyzer';
import AIInsights from './components/AIInsights';
import CompetitiveAnalysis from './components/CompetitiveAnalysis';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const AnalyticsPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [showKPIManager, setShowKPIManager] = useState(false);
  const [showFeedbackAnalyzer, setShowFeedbackAnalyzer] = useState(false);
  const queryClient = useQueryClient();

  // Fetch dashboard data
  const { data: dashboardData, isLoading: dashboardLoading } = useQuery(
    'analytics-dashboard',
    () => analyticsAPI.getDashboard().then(res => res.data),
    { enabled: activeTab === 'dashboard' }
  );

  // Fetch KPIs
  const { data: kpisData, isLoading: kpisLoading } = useQuery(
    'analytics-kpis',
    () => analyticsAPI.getKPIs().then(res => res.data),
    { enabled: activeTab === 'kpis' }
  );

  // Fetch feedback
  const { data: feedbackData, isLoading: feedbackLoading } = useQuery(
    'analytics-feedback',
    () => analyticsAPI.getFeedback().then(res => res.data),
    { enabled: activeTab === 'feedback' }
  );

  // Generate AI analysis mutation
  const generateAnalysisMutation = useMutation(
    (data) => analyticsAPI.generateInsights(data),
    {
      onSuccess: (response) => {
        setShowAIAnalysis(true);
        toast.success('AI analysis generated successfully!');
        queryClient.invalidateQueries('analytics-dashboard');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate analysis');
      }
    }
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'kpis', label: 'KPIs', icon: Target },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'insights', label: 'AI Insights', icon: Brain },
    { id: 'competitive', label: 'Competitive', icon: TrendingUp },
    { id: 'predictions', label: 'Predictions', icon: Zap }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AnalyticsDashboard data={dashboardData} loading={dashboardLoading} />;
      case 'kpis':
        return <KPIManager data={kpisData} loading={kpisLoading} />;
      case 'feedback':
        return <FeedbackAnalyzer data={feedbackData} loading={feedbackLoading} />;
      case 'insights':
        return <AIInsights />;
      case 'competitive':
        return <CompetitiveAnalysis />;
      case 'predictions':
        return <PredictiveAnalytics />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Business Analytics</h1>
              <p className="text-gray-600 mt-1">
                AI-powered insights and data-driven business intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
              <Brain className="w-4 h-4 text-green-500" />
              <span className="font-medium">AI-Powered</span>
            </div>
            <button
              onClick={() => generateAnalysisMutation.mutate({})}
              disabled={generateAnalysisMutation.isLoading}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
            >
              {generateAnalysisMutation.isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Generate AI Analysis</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  ${dashboardData?.dashboardData?.performanceMetrics?.revenue || '0'}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">+12.5%</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Active Customers</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData?.dashboardData?.overview?.totalCustomers || '0'}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-600 font-medium">+8.2%</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Website Views</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData?.dashboardData?.performanceMetrics?.websiteViews || '0'}
                </p>
                <div className="flex items-center mt-2">
                  <ArrowDown className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">-2.1%</span>
                </div>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Satisfaction</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {dashboardData?.dashboardData?.performanceMetrics?.customerSatisfaction || '0'}%
                </p>
                <div className="flex items-center mt-2">
                  <Minus className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 font-medium">No change</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <MessageSquare className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>

      {/* Modals */}
      {showAIAnalysis && (
        <AIInsights
          onClose={() => setShowAIAnalysis(false)}
          onSuccess={() => {
            setShowAIAnalysis(false);
            queryClient.invalidateQueries('analytics-dashboard');
          }}
        />
      )}

      {showKPIManager && (
        <KPIManager
          onClose={() => setShowKPIManager(false)}
          onSuccess={() => {
            setShowKPIManager(false);
            queryClient.invalidateQueries('analytics-kpis');
          }}
        />
      )}

      {showFeedbackAnalyzer && (
        <FeedbackAnalyzer
          onClose={() => setShowFeedbackAnalyzer(false)}
          onSuccess={() => {
            setShowFeedbackAnalyzer(false);
            queryClient.invalidateQueries('analytics-feedback');
          }}
        />
      )}
    </div>
  );
};

export default AnalyticsPage;

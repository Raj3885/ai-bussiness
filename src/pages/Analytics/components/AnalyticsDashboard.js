import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Eye, 
  MessageSquare,
  Calendar,
  ArrowUp,
  ArrowDown,
  Minus,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const AnalyticsDashboard = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  const mockChartData = [
    { name: 'Jan', revenue: 4000, customers: 240, traffic: 1200 },
    { name: 'Feb', revenue: 3000, customers: 139, traffic: 1100 },
    { name: 'Mar', revenue: 2000, customers: 980, traffic: 1300 },
    { name: 'Apr', revenue: 2780, customers: 390, traffic: 1400 },
    { name: 'May', revenue: 1890, customers: 480, traffic: 1600 },
    { name: 'Jun', revenue: 2390, customers: 380, traffic: 1800 }
  ];

  const recentActivities = [
    { id: 1, type: 'revenue', message: 'New sale recorded: $1,250', time: '2 hours ago', icon: DollarSign, color: 'green' },
    { id: 2, type: 'customer', message: 'New customer registered', time: '4 hours ago', icon: Users, color: 'blue' },
    { id: 3, type: 'feedback', message: 'Positive feedback received', time: '6 hours ago', icon: MessageSquare, color: 'purple' },
    { id: 4, type: 'traffic', message: 'Traffic spike detected', time: '8 hours ago', icon: Eye, color: 'orange' }
  ];

  const topInsights = [
    {
      title: 'Revenue Growth',
      description: 'Monthly revenue increased by 15% compared to last month',
      impact: 'high',
      trend: 'positive'
    },
    {
      title: 'Customer Retention',
      description: 'Customer retention rate improved to 85%',
      impact: 'medium',
      trend: 'positive'
    },
    {
      title: 'Website Performance',
      description: 'Page load time decreased by 20%',
      impact: 'medium',
      trend: 'positive'
    },
    {
      title: 'Conversion Rate',
      description: 'Conversion rate needs attention - down 5%',
      impact: 'high',
      trend: 'negative'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-2">
                  <option>Last 6 months</option>
                  <option>Last 3 months</option>
                  <option>Last month</option>
                </select>
              </div>
            </div>
            
            {/* Simple Chart Representation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Revenue Trend</span>
                <span className="flex items-center text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  +15.3%
                </span>
              </div>
              <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-end justify-around p-4">
                {mockChartData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t w-8"
                      style={{ height: `${(item.revenue / 4000) * 120}px` }}
                    ></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-${activity.color}-100`}>
                    <Icon className={`w-4 h-4 text-${activity.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Key Insights</h3>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View All Insights
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <div className="flex items-center space-x-1">
                  {insight.trend === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                    insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {insight.impact} impact
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600">{insight.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Conversion Rate</h4>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">3.2%</span>
              <span className="text-sm text-red-600 flex items-center">
                <ArrowDown className="w-4 h-4 mr-1" />
                -0.5%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Target: 5.0%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Avg. Session Duration</h4>
            <Activity className="w-5 h-5 text-green-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">4:32</span>
              <span className="text-sm text-green-600 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" />
                +12%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Industry avg: 3:45</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Customer Lifetime Value</h4>
            <Zap className="w-5 h-5 text-purple-500" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">$1,247</span>
              <span className="text-sm text-green-600 flex items-center">
                <ArrowUp className="w-4 h-4 mr-1" />
                +8%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <p className="text-xs text-gray-500">Goal: $1,500</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready for deeper insights?</h3>
            <p className="text-gray-600">Generate AI-powered analysis to uncover hidden patterns and opportunities.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Export Data
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Generate AI Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

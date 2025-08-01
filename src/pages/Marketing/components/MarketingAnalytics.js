import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  BarChart3,
  TrendingUp,
  Users,
  Mail,
  Eye,
  MousePointer,
  DollarSign,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import { marketingAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const MarketingAnalytics = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [campaignFilter, setCampaignFilter] = useState('all');

  // Fetch analytics data
  const { data: analyticsData, isLoading } = useQuery(
    ['marketing-analytics', dateRange, campaignFilter],
    () => marketingAPI.getCampaigns({ range: dateRange, filter: campaignFilter }).then(res => res.data),
    {
      // Mock data for now since we don't have the analytics endpoint
      enabled: false
    }
  );

  // Mock data for demonstration
  const mockData = {
    overview: {
      totalCampaigns: 12,
      totalSent: 15420,
      totalOpened: 3284,
      totalClicked: 456,
      revenue: 12500
    },
    metrics: {
      openRate: 21.3,
      clickRate: 2.96,
      conversionRate: 1.8,
      unsubscribeRate: 0.5
    },
    campaignPerformance: [
      { name: 'Welcome Series', sent: 2500, opened: 875, clicked: 125, revenue: 3200 },
      { name: 'Product Launch', sent: 5000, opened: 1200, clicked: 180, revenue: 5500 },
      { name: 'Newsletter #1', sent: 3200, opened: 640, clicked: 64, revenue: 800 },
      { name: 'Black Friday', sent: 4720, opened: 1420, clicked: 284, revenue: 8900 }
    ],
    trends: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      openRates: [18.5, 21.2, 23.1, 21.3],
      clickRates: [2.1, 2.8, 3.2, 2.96]
    }
  };

  const data = analyticsData || mockData;

  if (isLoading) {
    return <LoadingSpinner message="Loading analytics..." />;
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Marketing Analytics</h2>
          <p className="text-neutral-600">Track your campaign performance and engagement metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn btn-ghost btn-sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Campaigns</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalCampaigns}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Emails Sent</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalSent.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Opens</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalOpened.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Clicks</p>
              <p className="text-2xl font-bold text-neutral-900">{data.overview.totalClicked.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <MousePointer className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Revenue</p>
              <p className="text-2xl font-bold text-neutral-900">${data.overview.revenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-primary-600 mb-2">{data.metrics.openRate}%</div>
          <div className="text-sm text-neutral-600">Open Rate</div>
          <div className="text-xs text-success-600 mt-1">+2.1% vs last period</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-secondary-600 mb-2">{data.metrics.clickRate}%</div>
          <div className="text-sm text-neutral-600">Click Rate</div>
          <div className="text-xs text-success-600 mt-1">+0.3% vs last period</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-success-600 mb-2">{data.metrics.conversionRate}%</div>
          <div className="text-sm text-neutral-600">Conversion Rate</div>
          <div className="text-xs text-success-600 mt-1">+0.5% vs last period</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="card p-6 text-center"
        >
          <div className="text-3xl font-bold text-error-600 mb-2">{data.metrics.unsubscribeRate}%</div>
          <div className="text-sm text-neutral-600">Unsubscribe Rate</div>
          <div className="text-xs text-success-600 mt-1">-0.1% vs last period</div>
        </motion.div>
      </div>

      {/* Campaign Performance Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-neutral-900">Campaign Performance</h3>
          <select
            value={campaignFilter}
            onChange={(e) => setCampaignFilter(e.target.value)}
            className="px-3 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Campaigns</option>
            <option value="email">Email Campaigns</option>
            <option value="newsletter">Newsletters</option>
            <option value="promotional">Promotional</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-700">Campaign</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-700">Sent</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-700">Opened</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-700">Clicked</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-700">Open Rate</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-700">Click Rate</th>
                <th className="text-right py-3 px-4 font-medium text-neutral-700">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.campaignPerformance.map((campaign, index) => (
                <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4 font-medium text-neutral-900">{campaign.name}</td>
                  <td className="py-3 px-4 text-right text-neutral-600">{campaign.sent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-neutral-600">{campaign.opened.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-neutral-600">{campaign.clicked.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-neutral-600">
                    {((campaign.opened / campaign.sent) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-right text-neutral-600">
                    {((campaign.clicked / campaign.sent) * 100).toFixed(1)}%
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-success-600">
                    ${campaign.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Trends Chart Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="card p-6"
      >
        <h3 className="text-lg font-semibold text-neutral-900 mb-6">Performance Trends</h3>
        <div className="h-64 bg-neutral-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
            <p className="text-neutral-600">Chart visualization would go here</p>
            <p className="text-sm text-neutral-500">Integration with charting library needed</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MarketingAnalytics;

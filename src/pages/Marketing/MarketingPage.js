import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Mail,
  Plus,
  Users,
  TrendingUp,
  Send,
  Eye,
  Edit,
  Trash2,
  BarChart3,
  Target,
  Zap,
  MessageSquare,
  Share2,
  FileText,
  Download,
  Upload,
  Filter,
  Search
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { marketingAPI, leadsAPI } from '../../services/api';

// Import components
import CampaignGenerator from './components/CampaignGenerator';
import CampaignList from './components/CampaignList';
import LeadManagement from './components/LeadManagement';
import SocialMediaGenerator from './components/SocialMediaGenerator';
import NewsletterGenerator from './components/NewsletterGenerator';
import MarketingAnalytics from './components/MarketingAnalytics';

const MarketingPage = () => {
  const [activeTab, setActiveTab] = useState('campaigns');
  const [showCampaignGenerator, setShowCampaignGenerator] = useState(false);
  const [showSocialGenerator, setShowSocialGenerator] = useState(false);
  const [showNewsletterGenerator, setShowNewsletterGenerator] = useState(false);
  const queryClient = useQueryClient();

  // Fetch campaigns
  const { data: campaignsData, isLoading: campaignsLoading } = useQuery(
    'campaigns',
    () => marketingAPI.getCampaigns().then(res => res.data),
    { enabled: activeTab === 'campaigns' }
  );

  // Fetch leads
  const { data: leadsData, isLoading: leadsLoading } = useQuery(
    'leads',
    () => leadsAPI.getLeads().then(res => res.data),
    { enabled: activeTab === 'leads' }
  );

  const tabs = [
    { id: 'campaigns', label: 'Email Campaigns', icon: Mail },
    { id: 'leads', label: 'Lead Management', icon: Users },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'newsletter', label: 'Newsletter', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'campaigns':
        return (
          <div className="space-y-6">
            {/* Campaign Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Campaigns</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {campaignsData?.campaigns?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Active Campaigns</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {campaignsData?.campaigns?.filter(c => c.status === 'active').length || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Send className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Total Sent</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {campaignsData?.campaigns?.reduce((sum, c) => sum + (c.analytics?.sent || 0), 0) || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Avg. Open Rate</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {campaignsData?.campaigns?.length > 0
                        ? (campaignsData.campaigns.reduce((sum, c) => sum + parseFloat(c.openRate || 0), 0) / campaignsData.campaigns.length).toFixed(1)
                        : 0}%
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Eye className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Campaign Actions */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-neutral-900">Email Campaigns</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCampaignGenerator(true)}
                  className="btn btn-primary"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </button>
              </div>
            </div>

            {/* Campaign List */}
            <CampaignList
              campaigns={campaignsData?.campaigns || []}
              loading={campaignsLoading}
            />
          </div>
        );

      case 'leads':
        return <LeadManagement leads={leadsData} loading={leadsLoading} />;

      case 'social':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Social Media Content</h2>
                <p className="text-neutral-600">Generate engaging content for your social platforms</p>
              </div>
              <button
                onClick={() => setShowSocialGenerator(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Generate Content
              </button>
            </div>
            <SocialMediaGenerator />
          </div>
        );

      case 'newsletter':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">Newsletter</h2>
                <p className="text-neutral-600">Create engaging newsletters for your audience</p>
              </div>
              <button
                onClick={() => setShowNewsletterGenerator(true)}
                className="btn btn-primary"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Newsletter
              </button>
            </div>
            <NewsletterGenerator />
          </div>
        );

      case 'analytics':
        return <MarketingAnalytics />;

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
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Marketing Automation</h1>
              <p className="text-neutral-600 mt-1">
                AI-powered campaigns, lead management, and customer engagement
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-neutral-600 bg-green-50 px-3 py-2 rounded-lg">
              <Zap className="w-4 h-4 text-green-500" />
              <span className="font-medium">AI-Powered</span>
            </div>
            <button
              onClick={() => setShowCampaignGenerator(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="border-b border-neutral-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
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
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>

      {/* Modals */}
      {showCampaignGenerator && (
        <CampaignGenerator
          onClose={() => setShowCampaignGenerator(false)}
          onSuccess={() => {
            setShowCampaignGenerator(false);
            queryClient.invalidateQueries('campaigns');
          }}
        />
      )}

      {showSocialGenerator && (
        <SocialMediaGenerator
          onClose={() => setShowSocialGenerator(false)}
        />
      )}

      {showNewsletterGenerator && (
        <NewsletterGenerator
          onClose={() => setShowNewsletterGenerator(false)}
        />
      )}
    </div>
  );
};

export default MarketingPage;

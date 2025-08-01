import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import {
  Eye,
  Edit,
  Trash2,
  Send,
  Pause,
  Play,
  MoreVertical,
  Calendar,
  Users,
  TrendingUp,
  Mail
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { marketingAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const CampaignList = ({ campaigns, loading }) => {
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const queryClient = useQueryClient();

  const deleteCampaignMutation = useMutation(
    (campaignId) => marketingAPI.deleteCampaign(campaignId),
    {
      onSuccess: () => {
        toast.success('Campaign deleted successfully');
        queryClient.invalidateQueries('campaigns');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete campaign');
      }
    }
  );

  const sendCampaignMutation = useMutation(
    (campaignId) => marketingAPI.sendCampaign(campaignId),
    {
      onSuccess: () => {
        toast.success('Campaign sent successfully');
        queryClient.invalidateQueries('campaigns');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to send campaign');
      }
    }
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'bg-neutral-100 text-neutral-700';
      case 'active': return 'bg-success-100 text-success-700';
      case 'scheduled': return 'bg-warning-100 text-warning-700';
      case 'completed': return 'bg-primary-100 text-primary-700';
      case 'paused': return 'bg-error-100 text-error-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const handlePreview = (campaign) => {
    setSelectedCampaign(campaign);
    setShowPreview(true);
  };

  const handleDelete = (campaignId) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      deleteCampaignMutation.mutate(campaignId);
    }
  };

  const handleSend = (campaignId) => {
    if (window.confirm('Are you sure you want to send this campaign?')) {
      sendCampaignMutation.mutate(campaignId);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading campaigns..." />;
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-12 text-center"
      >
        <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <Mail className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-lg font-medium text-neutral-900 mb-2">No campaigns yet</h3>
        <p className="text-neutral-600 mb-6">
          Create your first AI-powered email campaign to get started.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <motion.div
            key={campaign._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-medium text-neutral-900">
                    {campaign.name}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                  {campaign.content?.aiGenerated && (
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      AI Generated
                    </span>
                  )}
                </div>
                
                <p className="text-neutral-600 mb-3">{campaign.subject}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600">
                      {campaign.audience?.totalRecipients || 0} recipients
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Send className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600">
                      {campaign.analytics?.sent || 0} sent
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600">
                      {campaign.openRate || 0}% open rate
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-neutral-400" />
                    <span className="text-neutral-600">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => handlePreview(campaign)}
                  className="btn btn-sm btn-ghost"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                
                {campaign.status === 'draft' && (
                  <button
                    onClick={() => handleSend(campaign._id)}
                    className="btn btn-sm btn-primary"
                    title="Send Campaign"
                    disabled={sendCampaignMutation.isLoading}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                )}
                
                <button
                  onClick={() => handleDelete(campaign._id)}
                  className="btn btn-sm btn-ghost text-error-600 hover:bg-error-50"
                  title="Delete"
                  disabled={deleteCampaignMutation.isLoading}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {/* Performance Metrics for Active/Completed Campaigns */}
            {(campaign.status === 'active' || campaign.status === 'completed') && campaign.analytics?.sent > 0 && (
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-900">
                      {campaign.analytics.delivered || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success-600">
                      {campaign.analytics.opened || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Opened</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-600">
                      {campaign.analytics.clicked || 0}
                    </div>
                    <div className="text-sm text-neutral-600">Clicked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning-600">
                      {campaign.clickRate || 0}%
                    </div>
                    <div className="text-sm text-neutral-600">Click Rate</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Campaign Preview Modal */}
      {showPreview && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900">
                  Campaign Preview
                </h2>
                <p className="text-sm text-neutral-600">
                  {selectedCampaign.name}
                </p>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <Eye className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6">
                {/* Email Details */}
                <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-neutral-600">Subject:</span>
                      <p className="font-medium">{selectedCampaign.subject}</p>
                    </div>
                    <div>
                      <span className="text-neutral-600">Status:</span>
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedCampaign.status)}`}>
                        {selectedCampaign.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Email Preview */}
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200">
                    <div className="text-sm text-neutral-600">
                      Subject: <span className="font-medium text-neutral-900">{selectedCampaign.subject}</span>
                    </div>
                  </div>
                  <div 
                    className="p-4"
                    dangerouslySetInnerHTML={{ __html: selectedCampaign.content?.html || selectedCampaign.content?.text || 'No content available' }}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end p-6 border-t border-neutral-200">
              <button
                onClick={() => setShowPreview(false)}
                className="btn btn-ghost"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CampaignList;

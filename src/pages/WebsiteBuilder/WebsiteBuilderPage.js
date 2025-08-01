import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Globe,
  Plus,
  Sparkles,
  Eye,
  Edit,
  Download,
  Share,
  Trash2,
  ExternalLink,
  Palette,
  Layout,
  Type,
  Settings
} from 'lucide-react';
import { websiteAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';
import WebsiteCreationModal from '../../components/WebsiteBuilder/WebsiteCreationModal';
import WebsitePreview from '../../components/WebsiteBuilder/WebsitePreview';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const WebsiteBuilderPage = () => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch user's websites
  const { data: websites, isLoading, error } = useQuery(
    'websites',
    () => websiteAPI.getAll(),
    {
      select: (response) => response.data.websites || []
    }
  );

  // Delete website mutation
  const deleteMutation = useMutation(
    (websiteId) => websiteAPI.delete(websiteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('websites');
        toast.success('Website deleted successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete website');
      }
    }
  );

  // Publish website mutation
  const publishMutation = useMutation(
    (websiteId) => websiteAPI.publish(websiteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('websites');
        toast.success('Website published successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to publish website');
      }
    }
  );

  const handleDeleteWebsite = (websiteId) => {
    if (window.confirm('Are you sure you want to delete this website?')) {
      deleteMutation.mutate(websiteId);
    }
  };

  const handlePublishWebsite = (websiteId) => {
    publishMutation.mutate(websiteId);
  };

  const handlePreviewWebsite = (website) => {
    setSelectedWebsite(website);
    setShowPreview(true);
  };

  const handleOpenWebsite = (website) => {
    if (website.status === 'published') {
      // Generate username from user's name (remove spaces and convert to lowercase)
      const username = user?.name?.replace(/\s+/g, '').toLowerCase() || 'user';
      const websiteUrl = `${window.location.origin}/websites/${username}`;
      window.open(websiteUrl, '_blank');
    } else {
      toast.error('Website must be published first');
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading your websites..." />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">AI Website Builder</h1>
            <p className="text-neutral-600 mt-2">
              Create professional websites with AI in minutes
            </p>
          </div>
          <button
            onClick={() => setShowCreationModal(true)}
            className="btn btn-primary"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Website
          </button>
        </div>
      </motion.div>

      {/* Websites Grid */}
      {websites && websites.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {websites.map((website, index) => (
            <motion.div
              key={website._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card card-hover p-6"
            >
              {/* Website Preview Image */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-4 flex items-center justify-center">
                <Globe className="w-12 h-12 text-primary-500" />
              </div>

              {/* Website Info */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {website.businessInfo?.name || 'Untitled Website'}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {website.businessInfo?.industry || 'General Business'}
                  </p>
                </div>

                {/* Status Badge */}
                <div className="flex items-center space-x-2">
                  <span className={`badge ${
                    website.status === 'published' ? 'badge-success' :
                    website.status === 'draft' ? 'badge-warning' : 'badge-neutral'
                  }`}>
                    {website.status}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {new Date(website.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => handlePreviewWebsite(website)}
                    className="btn btn-sm btn-outline"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </button>

                  {website.status === 'draft' ? (
                    <button
                      onClick={() => handlePublishWebsite(website._id)}
                      className="btn btn-sm btn-primary"
                      disabled={publishMutation.isLoading}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Publish
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => handleOpenWebsite(website)}
                        className="btn btn-sm btn-primary"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Open
                      </button>
                      <button className="btn btn-sm btn-accent">
                        <Share className="w-4 h-4 mr-1" />
                        Share
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => handleDeleteWebsite(website._id)}
                    className="btn btn-sm btn-ghost text-error-600 hover:bg-error-50"
                    disabled={deleteMutation.isLoading}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-12 text-center"
        >
          <div className="w-24 h-24 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <Globe className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">
            Create Your First AI Website
          </h2>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Our advanced AI analyzes your business information and creates a professional,
            responsive website tailored to your industry and target audience.
          </p>
          <button
            onClick={() => setShowCreationModal(true)}
            className="btn btn-primary btn-lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Get Started
          </button>
        </motion.div>
      )}

      {/* Website Creation Modal */}
      <AnimatePresence>
        {showCreationModal && (
          <WebsiteCreationModal
            isOpen={showCreationModal}
            onClose={() => setShowCreationModal(false)}
            onSuccess={() => {
              setShowCreationModal(false);
              queryClient.invalidateQueries('websites');
            }}
          />
        )}
      </AnimatePresence>

      {/* Website Preview Modal */}
      <AnimatePresence>
        {showPreview && selectedWebsite && (
          <WebsitePreview
            website={selectedWebsite}
            isOpen={showPreview}
            onClose={() => {
              setShowPreview(false);
              setSelectedWebsite(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WebsiteBuilderPage;

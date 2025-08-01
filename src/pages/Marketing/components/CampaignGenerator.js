import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { X, Sparkles, Send, Eye, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { marketingAPI } from '../../../services/api';

const CampaignGenerator = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    campaignType: 'promotional',
    businessInfo: {
      company: '',
      industry: '',
      description: ''
    },
    audience: 'customers',
    tone: 'professional',
    goals: 'increase_sales',
    productInfo: ''
  });
  const [generatedCampaign, setGeneratedCampaign] = useState(null);

  const generateCampaignMutation = useMutation(
    (data) => marketingAPI.generateCampaign(data),
    {
      onSuccess: (response) => {
        setGeneratedCampaign(response.data);
        setStep(2);
        toast.success('Campaign generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate campaign');
      }
    }
  );

  const sendCampaignMutation = useMutation(
    (campaignId) => marketingAPI.sendCampaign(campaignId),
    {
      onSuccess: () => {
        toast.success('Campaign sent successfully!');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to send campaign');
      }
    }
  );

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleGenerate = () => {
    if (!formData.businessInfo.company || !formData.businessInfo.industry) {
      toast.error('Please fill in all required fields');
      return;
    }
    generateCampaignMutation.mutate(formData);
  };

  const handleSend = () => {
    if (generatedCampaign?.campaign?._id) {
      sendCampaignMutation.mutate(generatedCampaign.campaign._id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-neutral-900">
                {step === 1 ? 'Generate AI Campaign' : 'Review & Send Campaign'}
              </h2>
              <p className="text-sm text-neutral-600">
                {step === 1 ? 'Create compelling email campaigns with AI' : 'Review your generated campaign'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-160px)]">
          {step === 1 ? (
            /* Step 1: Campaign Configuration */
            <div className="p-8 space-y-8 bg-gray-50">
              {/* Campaign Type */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Campaign Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { value: 'promotional', label: 'Promotional', desc: 'Sales & offers' },
                    { value: 'welcome', label: 'Welcome', desc: 'New subscribers' },
                    { value: 'newsletter', label: 'Newsletter', desc: 'Regular updates' },
                    { value: 'follow_up', label: 'Follow-up', desc: 'After purchase' }
                  ].map((type) => (
                    <button
                      key={type.value}
                      onClick={() => handleInputChange('campaignType', type.value)}
                      className={`p-3 rounded-lg border text-left transition-colors ${
                        formData.campaignType === type.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="font-medium text-sm">{type.label}</div>
                      <div className="text-xs text-neutral-500">{type.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Business Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.businessInfo.company}
                    onChange={(e) => handleInputChange('businessInfo.company', e.target.value)}
                    className="input"
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Industry *
                  </label>
                  <select
                    value={formData.businessInfo.industry}
                    onChange={(e) => handleInputChange('businessInfo.industry', e.target.value)}
                    className="input"
                  >
                    <option value="">Select industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="finance">Finance</option>
                    <option value="retail">Retail</option>
                    <option value="education">Education</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Business Description
                </label>
                <textarea
                  value={formData.businessInfo.description}
                  onChange={(e) => handleInputChange('businessInfo.description', e.target.value)}
                  className="input"
                  rows={3}
                  placeholder="Brief description of your business..."
                />
              </div>

              {/* Target Audience */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Target Audience
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { value: 'customers', label: 'Existing Customers' },
                    { value: 'prospects', label: 'Prospects' },
                    { value: 'subscribers', label: 'Newsletter Subscribers' },
                    { value: 'leads', label: 'New Leads' },
                    { value: 'inactive', label: 'Inactive Users' },
                    { value: 'vip', label: 'VIP Customers' }
                  ].map((audience) => (
                    <button
                      key={audience.value}
                      onClick={() => handleInputChange('audience', audience.value)}
                      className={`p-3 rounded-lg border text-sm transition-colors ${
                        formData.audience === audience.value
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      {audience.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone & Goals */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value)}
                    className="input"
                  >
                    <option value="professional">Professional</option>
                    <option value="friendly">Friendly</option>
                    <option value="casual">Casual</option>
                    <option value="urgent">Urgent</option>
                    <option value="luxury">Luxury</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Campaign Goal
                  </label>
                  <select
                    value={formData.goals}
                    onChange={(e) => handleInputChange('goals', e.target.value)}
                    className="input"
                  >
                    <option value="increase_sales">Increase Sales</option>
                    <option value="brand_awareness">Brand Awareness</option>
                    <option value="engagement">Engagement</option>
                    <option value="retention">Customer Retention</option>
                    <option value="lead_generation">Lead Generation</option>
                  </select>
                </div>
              </div>

              {/* Product Information */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Product/Service Information
                </label>
                <textarea
                  value={formData.productInfo}
                  onChange={(e) => handleInputChange('productInfo', e.target.value)}
                  className="input"
                  rows={3}
                  placeholder="Describe the product or service you're promoting..."
                />
              </div>
            </div>
          ) : (
            /* Step 2: Campaign Preview */
            <div className="p-6 space-y-6">
              {generatedCampaign && (
                <>
                  {/* Campaign Details */}
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <h3 className="font-medium text-neutral-900 mb-2">Campaign Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-neutral-600">Subject:</span>
                        <p className="font-medium">{generatedCampaign.aiContent.subject}</p>
                      </div>
                      <div>
                        <span className="text-neutral-600">Type:</span>
                        <p className="font-medium capitalize">{formData.campaignType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Email Preview */}
                  <div>
                    <h3 className="font-medium text-neutral-900 mb-3">Email Preview</h3>
                    <div className="border border-neutral-200 rounded-lg overflow-hidden">
                      <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200">
                        <div className="text-sm text-neutral-600">
                          Subject: <span className="font-medium text-neutral-900">{generatedCampaign.aiContent.subject}</span>
                        </div>
                      </div>
                      <div 
                        className="p-4 max-h-96 overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: generatedCampaign.aiContent.html }}
                      />
                    </div>
                  </div>

                  {/* CTA Suggestions */}
                  {generatedCampaign.suggestions && generatedCampaign.suggestions.length > 0 && (
                    <div>
                      <h3 className="font-medium text-neutral-900 mb-3">CTA Suggestions</h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedCampaign.suggestions.map((cta, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {cta}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-neutral-200">
          <div className="flex items-center space-x-2 text-sm text-neutral-600">
            <Sparkles className="w-4 h-4 text-primary-500" />
            <span>AI-Generated Content</span>
          </div>
          <div className="flex space-x-3">
            {step === 1 ? (
              <>
                <button
                  onClick={onClose}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generateCampaignMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generateCampaignMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Campaign
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="btn btn-ghost"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleSend}
                  disabled={sendCampaignMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sendCampaignMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Campaign
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CampaignGenerator;

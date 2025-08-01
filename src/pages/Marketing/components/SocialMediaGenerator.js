import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import {
  Share2,
  Sparkles,
  Copy,
  Download,
  Loader,
  Instagram,
  Twitter,
  Linkedin,
  Facebook
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { marketingAPI } from '../../../services/api';

const SocialMediaGenerator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    platform: 'instagram',
    contentType: 'promotional',
    businessInfo: {
      company: '',
      industry: ''
    },
    topic: '',
    tone: 'engaging',
    hashtags: ''
  });
  const [generatedContent, setGeneratedContent] = useState(null);

  const generateContentMutation = useMutation(
    (data) => marketingAPI.generateSocial(data),
    {
      onSuccess: (response) => {
        setGeneratedContent(response.data.content);
        toast.success('Social media content generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate content');
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
    if (!formData.businessInfo.company || !formData.topic) {
      toast.error('Please fill in all required fields');
      return;
    }
    generateContentMutation.mutate(formData);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return Instagram;
      case 'twitter': return Twitter;
      case 'linkedin': return Linkedin;
      case 'facebook': return Facebook;
      default: return Share2;
    }
  };

  const platforms = [
    { value: 'instagram', label: 'Instagram', color: 'bg-pink-500' },
    { value: 'twitter', label: 'Twitter', color: 'bg-blue-400' },
    { value: 'linkedin', label: 'LinkedIn', color: 'bg-blue-600' },
    { value: 'facebook', label: 'Facebook', color: 'bg-blue-700' }
  ];

  return (
    <div className="space-y-6">
      {!generatedContent ? (
        /* Generation Form */
        <div className="card p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <Share2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Generate Social Media Content</h3>
              <p className="text-sm text-neutral-600">Create engaging posts for your social platforms</p>
            </div>
          </div>

          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Platform
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {platforms.map((platform) => {
                const Icon = getPlatformIcon(platform.value);
                return (
                  <button
                    key={platform.value}
                    onClick={() => handleInputChange('platform', platform.value)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      formData.platform === platform.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 ${platform.color} rounded flex items-center justify-center`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-sm">{platform.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Business Info */}
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
                Industry
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

          {/* Content Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Content Type
              </label>
              <select
                value={formData.contentType}
                onChange={(e) => handleInputChange('contentType', e.target.value)}
                className="input"
              >
                <option value="promotional">Promotional</option>
                <option value="educational">Educational</option>
                <option value="behind_scenes">Behind the Scenes</option>
                <option value="user_generated">User Generated</option>
                <option value="announcement">Announcement</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="input"
              >
                <option value="engaging">Engaging</option>
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Topic/Message *
            </label>
            <textarea
              value={formData.topic}
              onChange={(e) => handleInputChange('topic', e.target.value)}
              className="input"
              rows={3}
              placeholder="What do you want to post about? (e.g., new product launch, company milestone, industry insights)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Suggested Hashtags
            </label>
            <input
              type="text"
              value={formData.hashtags}
              onChange={(e) => handleInputChange('hashtags', e.target.value)}
              className="input"
              placeholder="Enter relevant hashtags (optional)"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={generateContentMutation.isLoading}
            className="btn btn-primary w-full"
          >
            {generateContentMutation.isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Content
              </>
            )}
          </button>
        </div>
      ) : (
        /* Generated Content Display */
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${platforms.find(p => p.value === formData.platform)?.color} rounded flex items-center justify-center`}>
                  {React.createElement(getPlatformIcon(formData.platform), { className: "w-4 h-4 text-white" })}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900">
                  {platforms.find(p => p.value === formData.platform)?.label} Content
                </h3>
              </div>
              <button
                onClick={() => setGeneratedContent(null)}
                className="btn btn-ghost btn-sm"
              >
                Generate New
              </button>
            </div>

            {/* Main Content */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Post Content
                </label>
                <div className="relative">
                  <textarea
                    value={generatedContent.content}
                    readOnly
                    className="input min-h-[120px] pr-10"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedContent.content)}
                    className="absolute top-2 right-2 p-2 hover:bg-neutral-100 rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Hashtags */}
              {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Suggested Hashtags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {generatedContent.hashtags.map((hashtag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm cursor-pointer hover:bg-primary-200 transition-colors"
                        onClick={() => copyToClipboard(`#${hashtag}`)}
                      >
                        #{hashtag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              {generatedContent.cta && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Call to Action
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={generatedContent.cta}
                      readOnly
                      className="input pr-10"
                    />
                    <button
                      onClick={() => copyToClipboard(generatedContent.cta)}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 hover:bg-neutral-100 rounded transition-colors"
                      title="Copy to clipboard"
                    >
                      <Copy className="w-4 h-4 text-neutral-500" />
                    </button>
                  </div>
                </div>
              )}

              {/* Additional Tips */}
              {generatedContent.engagementTips && generatedContent.engagementTips.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Engagement Tips
                  </label>
                  <ul className="space-y-1 text-sm text-neutral-600">
                    {generatedContent.engagementTips.map((tip, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-primary-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Best Time to Post */}
              {generatedContent.bestTimeToPost && (
                <div className="bg-neutral-50 rounded-lg p-4">
                  <h4 className="font-medium text-neutral-900 mb-1">Best Time to Post</h4>
                  <p className="text-sm text-neutral-600">{generatedContent.bestTimeToPost}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaGenerator;

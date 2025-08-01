import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import {
  FileText,
  Sparkles,
  Copy,
  Download,
  Loader,
  Plus,
  X,
  Eye
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { marketingAPI } from '../../../services/api';

const NewsletterGenerator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    businessInfo: {
      company: '',
      industry: ''
    },
    topics: [''],
    audience: 'customers',
    frequency: 'monthly',
    tone: 'professional'
  });
  const [generatedNewsletter, setGeneratedNewsletter] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const generateNewsletterMutation = useMutation(
    (data) => marketingAPI.generateNewsletter(data),
    {
      onSuccess: (response) => {
        setGeneratedNewsletter(response.data.newsletter);
        toast.success('Newsletter generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate newsletter');
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

  const addTopic = () => {
    setFormData(prev => ({
      ...prev,
      topics: [...prev.topics, '']
    }));
  };

  const removeTopic = (index) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.filter((_, i) => i !== index)
    }));
  };

  const updateTopic = (index, value) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.map((topic, i) => i === index ? value : topic)
    }));
  };

  const handleGenerate = () => {
    const validTopics = formData.topics.filter(topic => topic.trim() !== '');
    if (!formData.businessInfo.company || validTopics.length === 0) {
      toast.error('Please fill in company name and at least one topic');
      return;
    }
    
    generateNewsletterMutation.mutate({
      ...formData,
      topics: validTopics
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {!generatedNewsletter ? (
        /* Generation Form */
        <div className="card p-6 space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">Generate Newsletter</h3>
              <p className="text-sm text-neutral-600">Create engaging newsletters for your audience</p>
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

          {/* Newsletter Topics */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-3">
              Newsletter Topics *
            </label>
            <div className="space-y-3">
              {formData.topics.map((topic, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => updateTopic(index, e.target.value)}
                    className="input flex-1"
                    placeholder={`Topic ${index + 1} (e.g., Industry trends, Company updates, Tips & tricks)`}
                  />
                  {formData.topics.length > 1 && (
                    <button
                      onClick={() => removeTopic(index)}
                      className="p-2 text-error-600 hover:bg-error-50 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addTopic}
                className="btn btn-ghost btn-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Topic
              </button>
            </div>
          </div>

          {/* Newsletter Settings */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Target Audience
              </label>
              <select
                value={formData.audience}
                onChange={(e) => handleInputChange('audience', e.target.value)}
                className="input"
              >
                <option value="customers">Existing Customers</option>
                <option value="prospects">Prospects</option>
                <option value="subscribers">Newsletter Subscribers</option>
                <option value="industry">Industry Professionals</option>
                <option value="general">General Public</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Frequency
              </label>
              <select
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="input"
              >
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
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
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="casual">Casual</option>
                <option value="informative">Informative</option>
                <option value="inspiring">Inspiring</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generateNewsletterMutation.isLoading}
            className="btn btn-primary w-full"
          >
            {generateNewsletterMutation.isLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Generating Newsletter...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Newsletter
              </>
            )}
          </button>
        </div>
      ) : (
        /* Generated Newsletter Display */
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded flex items-center justify-center">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">Generated Newsletter</h3>
                  <p className="text-sm text-neutral-600">Subject: {generatedNewsletter.subject}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="btn btn-ghost btn-sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {showPreview ? 'Hide' : 'Show'} Preview
                </button>
                <button
                  onClick={() => setGeneratedNewsletter(null)}
                  className="btn btn-ghost btn-sm"
                >
                  Generate New
                </button>
              </div>
            </div>

            {/* Newsletter Sections */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Subject Line
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={generatedNewsletter.subject}
                    readOnly
                    className="input pr-10"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedNewsletter.subject)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 hover:bg-neutral-100 rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Newsletter Sections */}
              {generatedNewsletter.sections && generatedNewsletter.sections.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Newsletter Sections
                  </label>
                  <div className="space-y-3">
                    {generatedNewsletter.sections.map((section, index) => (
                      <div key={index} className="border border-neutral-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-neutral-900">{section.title}</h4>
                          <span className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs">
                            {section.type}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600 whitespace-pre-wrap">{section.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* HTML Content */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  HTML Content
                </label>
                <div className="relative">
                  <textarea
                    value={generatedNewsletter.html}
                    readOnly
                    className="input min-h-[200px] pr-10 font-mono text-xs"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedNewsletter.html)}
                    className="absolute top-2 right-2 p-2 hover:bg-neutral-100 rounded transition-colors"
                    title="Copy HTML"
                  >
                    <Copy className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>

              {/* Plain Text Version */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Plain Text Version
                </label>
                <div className="relative">
                  <textarea
                    value={generatedNewsletter.text}
                    readOnly
                    className="input min-h-[150px] pr-10"
                  />
                  <button
                    onClick={() => copyToClipboard(generatedNewsletter.text)}
                    className="absolute top-2 right-2 p-2 hover:bg-neutral-100 rounded transition-colors"
                    title="Copy text"
                  >
                    <Copy className="w-4 h-4 text-neutral-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* HTML Preview */}
            {showPreview && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Newsletter Preview
                </label>
                <div className="border border-neutral-200 rounded-lg overflow-hidden">
                  <div className="bg-neutral-100 px-4 py-2 border-b border-neutral-200">
                    <div className="text-sm text-neutral-600">
                      Subject: <span className="font-medium text-neutral-900">{generatedNewsletter.subject}</span>
                    </div>
                  </div>
                  <div 
                    className="p-4 max-h-96 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: generatedNewsletter.html }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsletterGenerator;

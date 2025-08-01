import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import {
  X,
  Sparkles,
  Globe,
  Palette,
  Layout,
  Users,
  Briefcase,
  ArrowRight,
  Loader,
  Image,
  Wand2
} from 'lucide-react';
import { websiteAPI, imagesAPI } from '../../services/api';
import toast from 'react-hot-toast';

const WebsiteCreationModal = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [businessInfo, setBusinessInfo] = useState({});
  const [preferences, setPreferences] = useState({});
  const [generatedImages, setGeneratedImages] = useState({});
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // Website generation mutation
  const generateMutation = useMutation(
    (data) => websiteAPI.generate(data),
    {
      onSuccess: (response) => {
        toast.success('Website generated successfully!');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate website');
      }
    }
  );

  // Image generation mutation using Gemini AI
  const generateImagesMutation = useMutation(
    (data) => imagesAPI.generateWebsiteImagesGemini(data),
    {
      onSuccess: (response) => {
        setGeneratedImages(response.data.images);
        setIsGeneratingImages(false);
        toast.success('Images generated successfully with Gemini AI!');
      },
      onError: (error) => {
        setIsGeneratingImages(false);
        toast.error(error.response?.data?.message || 'Failed to generate images');
      }
    }
  );

  const industries = [
    'Technology', 'Healthcare', 'Finance', 'Education', 'Retail',
    'Food & Beverage', 'Real Estate', 'Automotive', 'Travel & Tourism',
    'Entertainment', 'Fashion', 'Beauty & Wellness', 'Sports & Fitness',
    'Professional Services', 'Manufacturing', 'Construction', 'Other'
  ];

  const templates = [
    { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
    { id: 'classic', name: 'Classic', description: 'Traditional and professional' },
    { id: 'creative', name: 'Creative', description: 'Bold and artistic' },
    { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' }
  ];

  const colorSchemes = [
    { id: 'default', name: 'Default', primary: '#e855ff', secondary: '#00bfff' },
    { id: 'professional', name: 'Professional', primary: '#2563eb', secondary: '#64748b' },
    { id: 'warm', name: 'Warm', primary: '#dc2626', secondary: '#f59e0b' },
    { id: 'nature', name: 'Nature', primary: '#059669', secondary: '#84cc16' },
    { id: 'sunset', name: 'Sunset', primary: '#ea580c', secondary: '#f59e0b' }
  ];

  const handleStep1Submit = (data) => {
    setBusinessInfo(data);
    setStep(2);
  };

  const handleStep2Submit = (data) => {
    setPreferences(data);
    setStep(3);
  };

  const handleGenerateImages = () => {
    if (!businessInfo.businessName || !businessInfo.industry) {
      toast.error('Please fill in business name and industry first');
      return;
    }

    setIsGeneratingImages(true);
    generateImagesMutation.mutate({
      businessName: businessInfo.businessName,
      industry: businessInfo.industry,
      style: preferences.style || 'professional',
      description: businessInfo.description
    });
  };

  const handleFinalSubmit = () => {
    const finalData = {
      businessInfo: {
        name: businessInfo.businessName,
        industry: businessInfo.industry,
        description: businessInfo.description,
        targetAudience: businessInfo.targetAudience,
        keyServices: businessInfo.keyServices?.split(',').map(s => s.trim()) || []
      },
      preferences: {
        template: preferences.template || 'modern',
        colorScheme: colorSchemes.find(c => c.id === preferences.colorScheme) || colorSchemes[0],
        layout: preferences.layout || 'single-page'
      },
      generatedImages: generatedImages // Include the AI-generated images
    };

    generateMutation.mutate(finalData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-neutral-900">Create AI Website</h2>
              <p className="text-sm text-neutral-600">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-neutral-50">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  stepNum <= step 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-neutral-200 text-neutral-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    stepNum < step ? 'bg-primary-500' : 'bg-neutral-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Globe className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Tell us about your business
                </h3>
                <p className="text-neutral-600">
                  We'll use this information to create a personalized website
                </p>
              </div>

              <form onSubmit={handleSubmit(handleStep1Submit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Business Name *
                  </label>
                  <input
                    {...register('businessName', { required: 'Business name is required' })}
                    className="input"
                    placeholder="Enter your business name"
                  />
                  {errors.businessName && (
                    <p className="text-error-600 text-sm mt-1">{errors.businessName.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Industry *
                  </label>
                  <select
                    {...register('industry', { required: 'Industry is required' })}
                    className="input"
                  >
                    <option value="">Select your industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                  {errors.industry && (
                    <p className="text-error-600 text-sm mt-1">{errors.industry.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Business Description *
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="input h-24 resize-none"
                    placeholder="Describe what your business does..."
                  />
                  {errors.description && (
                    <p className="text-error-600 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Target Audience
                  </label>
                  <input
                    {...register('targetAudience')}
                    className="input"
                    placeholder="Who are your ideal customers?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Key Services
                  </label>
                  <input
                    {...register('keyServices')}
                    className="input"
                    placeholder="Service 1, Service 2, Service 3..."
                  />
                  <p className="text-xs text-neutral-500 mt-1">Separate multiple services with commas</p>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Palette className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Choose your design
                </h3>
                <p className="text-neutral-600">
                  Select a template and color scheme that matches your brand
                </p>
              </div>

              <form onSubmit={handleSubmit(handleStep2Submit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Template
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {templates.map((template) => (
                      <label key={template.id} className="cursor-pointer">
                        <input
                          {...register('template')}
                          type="radio"
                          value={template.id}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg transition-all ${
                          watch('template') === template.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}>
                          <Layout className="w-8 h-8 text-primary-500 mb-2" />
                          <h4 className="font-medium text-neutral-900">{template.name}</h4>
                          <p className="text-sm text-neutral-600">{template.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-3">
                    Color Scheme
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {colorSchemes.map((scheme) => (
                      <label key={scheme.id} className="cursor-pointer">
                        <input
                          {...register('colorScheme')}
                          type="radio"
                          value={scheme.id}
                          className="sr-only"
                        />
                        <div className={`p-3 border-2 rounded-lg transition-all flex items-center space-x-3 ${
                          watch('colorScheme') === scheme.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-neutral-200 hover:border-neutral-300'
                        }`}>
                          <div className="flex space-x-1">
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: scheme.primary }}
                            />
                            <div 
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: scheme.secondary }}
                            />
                          </div>
                          <span className="font-medium text-neutral-900">{scheme.name}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Image Generation Section */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Image className="w-6 h-6 text-blue-600" />
                      <div>
                        <h4 className="font-semibold text-gray-900">AI Image Generation</h4>
                        <p className="text-sm text-gray-600">Generate custom images for your website</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleGenerateImages}
                      disabled={isGeneratingImages || !businessInfo.businessName}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGeneratingImages ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4" />
                          <span>Generate Images with Gemini AI</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Generated Images Preview */}
                  {Object.keys(generatedImages).length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-gray-900 mb-3">Generated Images:</h5>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {Object.entries(generatedImages).map(([type, image]) => (
                          <div key={type} className="relative group">
                            <img
                              src={`http://localhost:3000${image.url}`}
                              alt={`${type} image`}
                              className="w-full h-20 object-cover rounded-lg border border-gray-200"
                              onError={(e) => {
                                e.target.src = `https://via.placeholder.com/150x80/6366f1/ffffff?text=${type}`;
                              }}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                              <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity capitalize">
                                {type}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {isGeneratingImages && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center space-x-2 text-blue-600">
                        <Loader className="w-4 h-4 animate-spin" />
                        <span className="text-sm">Generating custom images for your website...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="btn btn-outline flex-1"
                  >
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary flex-1">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <Sparkles className="w-16 h-16 text-primary-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                  Ready to generate!
                </h3>
                <p className="text-neutral-600">
                  Review your information and let AI create your website
                </p>
              </div>

              <div className="space-y-4">
                <div className="card p-4">
                  <h4 className="font-medium text-neutral-900 mb-2">Business Information</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p><strong>Name:</strong> {businessInfo.businessName}</p>
                    <p><strong>Industry:</strong> {businessInfo.industry}</p>
                    <p><strong>Description:</strong> {businessInfo.description}</p>
                  </div>
                </div>

                <div className="card p-4">
                  <h4 className="font-medium text-neutral-900 mb-2">Design Preferences</h4>
                  <div className="space-y-1 text-sm text-neutral-600">
                    <p><strong>Template:</strong> {preferences.template || 'Modern'}</p>
                    <p><strong>Color Scheme:</strong> {
                      colorSchemes.find(c => c.id === preferences.colorScheme)?.name || 'Default'
                    }</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button 
                  onClick={() => setStep(2)}
                  className="btn btn-outline flex-1"
                  disabled={generateMutation.isLoading}
                >
                  Back
                </button>
                <button 
                  onClick={handleFinalSubmit}
                  className="btn btn-primary flex-1"
                  disabled={generateMutation.isLoading}
                >
                  {generateMutation.isLoading ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Website
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default WebsiteCreationModal;

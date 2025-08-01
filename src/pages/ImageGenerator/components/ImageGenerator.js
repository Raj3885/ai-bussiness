import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { X, Sparkles, Wand2, Loader, Copy, Download, Eye } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { imagesAPI } from '../../../services/api';

const ImageGenerator = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    description: '',
    style: 'realistic',
    mood: 'neutral',
    colors: [],
    composition: 'centered',
    aspectRatio: '1:1',
    quality: 'high',
    subject: '',
    environment: '',
    lighting: 'natural'
  });
  const [generatedPrompt, setGeneratedPrompt] = useState(null);
  const [generatedImages, setGeneratedImages] = useState(null);
  const [imageCount, setImageCount] = useState(4);

  const generatePromptMutation = useMutation(
    (data) => imagesAPI.generatePrompt(data),
    {
      onSuccess: (response) => {
        setGeneratedPrompt(response.data);
        setStep(2);
        toast.success('Image prompt generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate prompt');
      }
    }
  );

  const generateImagesMutation = useMutation(
    (data) => imagesAPI.generateWithGemini(data),
    {
      onSuccess: (response) => {
        setGeneratedImages(response.data);
        setStep(3);
        toast.success('Images generated successfully with Gemini AI!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate images');
      }
    }
  );

  const enhancePromptMutation = useMutation(
    (data) => imagesAPI.enhancePrompt(data),
    {
      onSuccess: (response) => {
        setGeneratedPrompt(prev => ({
          ...prev,
          promptData: {
            ...prev.promptData,
            optimizedPrompt: response.data.enhancedData.enhancedPrompt,
            improvements: response.data.enhancedData.improvements
          }
        }));
        toast.success('Prompt enhanced successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to enhance prompt');
      }
    }
  );

  const generateImageMutation = useMutation(
    (data) => imagesAPI.generateFromPrompt(data),
    {
      onSuccess: (response) => {
        setGeneratedImages(response.data.images);
        setStep(3);
        toast.success('Images generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate images');
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
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleGenerate = () => {
    if (!formData.description) {
      toast.error('Please provide a description');
      return;
    }
    generatePromptMutation.mutate(formData);
  };

  const handleEnhance = () => {
    if (generatedPrompt?.promptData?.optimizedPrompt) {
      enhancePromptMutation.mutate({
        originalPrompt: generatedPrompt.promptData.optimizedPrompt,
        enhancementType: 'quality'
      });
    }
  };

  const handleGenerateImages = () => {
    if (generatedPrompt?.promptData?.optimizedPrompt) {
      console.log('Generating images with Gemini AI:', generatedPrompt.promptData.optimizedPrompt);
      console.log('Settings:', {
        aspectRatio: formData.aspectRatio,
        quality: formData.quality,
        style: formData.style,
        count: imageCount
      });

      generateImagesMutation.mutate({
        prompt: generatedPrompt.promptData.optimizedPrompt,
        style: formData.style,
        quality: formData.quality,
        aspectRatio: formData.aspectRatio,
        numberOfImages: imageCount
      });
    } else {
      toast.error('Please generate a prompt first');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {step === 1 ? 'AI Image Generator' : step === 2 ? 'Generated Prompt' : 'Generated Images'}
              </h2>
              <p className="text-sm text-gray-600">
                {step === 1 ? 'Create detailed prompts for AI image generation' :
                 step === 2 ? 'Review your optimized prompt and generate images' :
                 'Your AI-generated images are ready!'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-md rounded-lg transition-all duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-160px)]">
          {step === 1 ? (
            /* Step 1: Image Configuration */
            <div className="p-8 space-y-8 bg-gray-50">
              {/* Description */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <label className="block text-lg font-semibold text-gray-900 mb-4">
                  Image Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  rows="4"
                  placeholder="Describe the image you want to create in detail..."
                />
              </div>

              {/* Style and Mood */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Style</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['realistic', 'artistic', 'cartoon', 'minimalist', 'vintage', 'modern'].map((style) => (
                      <button
                        key={style}
                        onClick={() => handleInputChange('style', style)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          formData.style === style
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm capitalize">{style}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">Mood</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['neutral', 'happy', 'dramatic', 'calm', 'energetic', 'mysterious'].map((mood) => (
                      <button
                        key={mood}
                        onClick={() => handleInputChange('mood', mood)}
                        className={`p-3 rounded-lg border text-left transition-colors ${
                          formData.mood === mood
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-sm capitalize">{mood}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Settings */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
                    <select
                      value={formData.aspectRatio}
                      onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="1:1">Square (1:1)</option>
                      <option value="16:9">Landscape (16:9)</option>
                      <option value="9:16">Portrait (9:16)</option>
                      <option value="4:3">Standard (4:3)</option>
                      <option value="3:2">Photo (3:2)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                    <select
                      value={formData.quality}
                      onChange={(e) => handleInputChange('quality', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="draft">Draft</option>
                      <option value="standard">Standard</option>
                      <option value="high">High</option>
                      <option value="ultra">Ultra</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lighting</label>
                    <select
                      value={formData.lighting}
                      onChange={(e) => handleInputChange('lighting', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="natural">Natural</option>
                      <option value="studio">Studio</option>
                      <option value="dramatic">Dramatic</option>
                      <option value="soft">Soft</option>
                      <option value="golden_hour">Golden Hour</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Optional Details */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Optional Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Main subject of the image"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Environment</label>
                    <input
                      type="text"
                      value={formData.environment}
                      onChange={(e) => handleInputChange('environment', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Setting or background"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : step === 2 ? (
            /* Step 2: Generated Prompt */
            <div className="p-8 space-y-6">
              {generatedPrompt && (
                <>
                  {/* Optimized Prompt */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Optimized Prompt</h3>
                      <button
                        onClick={() => copyToClipboard(generatedPrompt.promptData.optimizedPrompt)}
                        className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </button>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-800">{generatedPrompt.promptData.optimizedPrompt}</p>
                    </div>
                  </div>

                  {/* Negative Prompt */}
                  {generatedPrompt.promptData.negativePrompt && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Negative Prompt</h3>
                        <button
                          onClick={() => copyToClipboard(generatedPrompt.promptData.negativePrompt)}
                          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                        >
                          <Copy className="w-4 h-4" />
                          <span className="text-sm">Copy</span>
                        </button>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <p className="text-gray-800">{generatedPrompt.promptData.negativePrompt}</p>
                      </div>
                    </div>
                  )}

                  {/* Style Keywords */}
                  {generatedPrompt.promptData.styleKeywords && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Style Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {generatedPrompt.promptData.styleKeywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tips */}
                  {generatedPrompt.promptData.tips && (
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Results</h3>
                      <ul className="space-y-2">
                        {generatedPrompt.promptData.tips.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Image Generation Settings */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Image Generation Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Images</label>
                        <select
                          value={imageCount}
                          onChange={(e) => setImageCount(parseInt(e.target.value))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        >
                          <option value={1}>1 Image</option>
                          <option value={2}>2 Images</option>
                          <option value={4}>4 Images</option>
                          <option value={6}>6 Images</option>
                          <option value={8}>8 Images</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Aspect Ratio</label>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                          {formData.aspectRatio} ({formData.aspectRatio === '1:1' ? 'Square' :
                           formData.aspectRatio === '16:9' ? 'Landscape' :
                           formData.aspectRatio === '9:16' ? 'Portrait' :
                           formData.aspectRatio === '4:3' ? 'Standard' : 'Photo'})
                        </p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button
                        onClick={handleGenerateImages}
                        disabled={generateImageMutation.isLoading}
                        className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {generateImagesMutation.isLoading ? (
                          <>
                            <Loader className="w-6 h-6 mr-2 animate-spin" />
                            Generating {imageCount} Image{imageCount > 1 ? 's' : ''} with Gemini AI...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-6 h-6 mr-2" />
                            Generate {imageCount} Image{imageCount > 1 ? 's' : ''} with Gemini AI
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            /* Step 3: Generated Images */
            <div className="p-8 space-y-6">
              {generatedImages && (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Generated Images</h3>
                    <p className="text-gray-600">
                      {generatedImages.length} image{generatedImages.length > 1 ? 's' : ''} generated successfully
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedImages.map((image, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="aspect-square bg-gray-100 relative">
                          <img
                            src={image.imageUrl}
                            alt={`Generated image ${index + 1}`}
                            className="w-full h-full object-cover"
                            onLoad={(e) => {
                              console.log(`Image ${index + 1} loaded successfully`);
                              e.target.style.opacity = '1';
                            }}
                            onError={(e) => {
                              console.log(`Image ${index + 1} failed to load, trying alternative`);
                              console.log('Failed URL:', e.target.src);

                              // Try alternative URL if available
                              if (image.alternativeUrls && image.alternativeUrls[1] && !e.target.dataset.retried) {
                                e.target.dataset.retried = 'true';
                                e.target.src = image.alternativeUrls[1];
                              } else if (!e.target.dataset.fallback) {
                                // Fallback to a working placeholder
                                e.target.dataset.fallback = 'true';
                                e.target.src = `https://via.placeholder.com/${image.width}x${image.height}/6366f1/ffffff?text=AI+Generated+Image`;
                              }
                            }}
                            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                          />
                          <div className="absolute top-2 right-2">
                            <span className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                              #{index + 1}
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                              {image.model}
                            </span>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-900">
                              {image.width} × {image.height}
                            </span>
                            <span className="text-sm text-gray-500">
                              Seed: {image.seed}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => copyToClipboard(image.imageUrl)}
                              className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Copy className="w-4 h-4 inline mr-1" />
                              Copy URL
                            </button>
                            <button
                              onClick={() => window.open(image.imageUrl, '_blank')}
                              className="flex-1 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg text-sm font-medium transition-colors"
                            >
                              <Download className="w-4 h-4 inline mr-1" />
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Generation Details */}
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Generation Details</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Model:</span>
                        <p className="font-medium">{generatedImages[0]?.model}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Steps:</span>
                        <p className="font-medium">{generatedImages[0]?.steps}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Guidance:</span>
                        <p className="font-medium">{generatedImages[0]?.guidance}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Processing Time:</span>
                        <p className="font-medium">{(generatedImages[0]?.processingTime / 1000).toFixed(1)}s</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>AI-Generated Content</span>
          </div>
          <div className="flex space-x-3">
            {step === 1 ? (
              <>
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={generatePromptMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatePromptMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Prompt
                    </>
                  )}
                </button>
              </>
            ) : step === 2 ? (
              <>
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Back to Edit
                </button>
                <button
                  onClick={handleEnhance}
                  disabled={enhancePromptMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enhancePromptMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Enhance Prompt
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
                >
                  Back to Prompt
                </button>
                <button
                  onClick={() => handleGenerateImages()}
                  disabled={generateImagesMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generateImagesMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Generating with Gemini AI...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5 mr-2" />
                      Generate More with Gemini AI
                    </>
                  )}
                </button>
                <button
                  onClick={onSuccess}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Save & Close
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageGenerator;

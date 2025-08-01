import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  Image,
  Plus,
  Sparkles,
  Wand2,
  Eye,
  Download,
  Heart,
  Share2,
  Settings,
  Palette,
  Camera,
  Lightbulb,
  Zap,
  Grid3X3,
  Filter,
  Search,
  Upload,
  Trash2,
  Edit3,
  Loader
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { imagesAPI } from '../../services/api';
import ImageGenerator from './components/ImageGenerator';
import ImageGallery from './components/ImageGallery';
import ImageAnalyzer from './components/ImageAnalyzer';
import ConceptGenerator from './components/ConceptGenerator';
import LoadingSpinner from '../../components/UI/LoadingSpinner';

const ImageGeneratorPage = () => {
  const [activeTab, setActiveTab] = useState('generator');
  const [showImageGenerator, setShowImageGenerator] = useState(false);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [showConceptGenerator, setShowConceptGenerator] = useState(false);
  const [testImage, setTestImage] = useState(null);
  const queryClient = useQueryClient();

  // Test image generation
  const testGenerationMutation = useMutation(
    (data) => imagesAPI.testGeneration(data),
    {
      onSuccess: (response) => {
        setTestImage(response.data.image);
        toast.success('Test image generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Test generation failed');
      }
    }
  );

  // Fetch image statistics
  const { data: imageStats, isLoading: statsLoading } = useQuery(
    'image-stats',
    () => imagesAPI.getImageStats().then(res => res.data),
    { enabled: activeTab === 'gallery' }
  );

  // Fetch user's images
  const { data: imagesData, isLoading: imagesLoading } = useQuery(
    'user-images',
    () => imagesAPI.getImages().then(res => res.data),
    { enabled: activeTab === 'gallery' }
  );

  // Fetch available styles
  const { data: stylesData } = useQuery(
    'image-styles',
    () => imagesAPI.getStyles().then(res => res.data)
  );

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const tabs = [
    { id: 'generator', label: 'AI Generator', icon: Wand2 },
    { id: 'gallery', label: 'My Images', icon: Grid3X3 },
    { id: 'analyzer', label: 'Image Analyzer', icon: Eye },
    { id: 'concepts', label: 'Concept Generator', icon: Lightbulb }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'generator':
        return (
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setShowImageGenerator(true)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                    <Wand2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Generate Image</h3>
                    <p className="text-sm text-gray-600">Create AI-powered images from text</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setShowAnalyzer(true)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Analyze Image</h3>
                    <p className="text-sm text-gray-600">Get AI insights and suggestions</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setShowConceptGenerator(true)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Generate Concepts</h3>
                    <p className="text-sm text-gray-600">Explore creative ideas and themes</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Test Image Generation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Test Image Generation</h3>
                  <p className="text-sm text-gray-600">Verify that image generation is working</p>
                </div>
                <button
                  onClick={() => testGenerationMutation.mutate({ prompt: "a beautiful sunset over mountains, digital art, high quality" })}
                  disabled={testGenerationMutation.isLoading}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 disabled:opacity-50"
                >
                  {testGenerationMutation.isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Testing...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Test Generate</span>
                    </>
                  )}
                </button>
              </div>

              {testImage && (
                <div className="mt-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testImage.imageUrl}
                        alt="Test generated image"
                        className="w-24 h-24 object-cover rounded-lg border-2 border-green-200"
                        onLoad={() => {
                          console.log('Test image loaded successfully');
                          console.log('Image URL:', testImage.imageUrl);
                        }}
                        onError={(e) => {
                          console.log('Test image failed to load, URL:', e.target.src);
                          e.target.src = `https://via.placeholder.com/96x96/10b981/ffffff?text=✓+Generated`;
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">✅ Test Image Generated Successfully!</p>
                        <p className="text-xs text-gray-600 mt-1">Model: {testImage.model}</p>
                        <p className="text-xs text-gray-600">Processing: {(testImage.processingTime / 1000).toFixed(1)}s</p>
                        <p className="text-xs text-gray-600">Seed: {testImage.seed}</p>
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => window.open(testImage.imageUrl, '_blank')}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View Full Size
                          </button>
                          <button
                            onClick={() => copyToClipboard(testImage.imageUrl)}
                            className="text-xs text-green-600 hover:text-green-700 font-medium"
                          >
                            Copy URL
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Demo Image Example */}
              <div className="mt-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://image.pollinations.ai/prompt/a%20beautiful%20sunset%20over%20mountains%2C%20digital%20art%2C%20high%20quality?width=96&height=96&seed=42&model=flux&nologo=true"
                      alt="Demo AI generated image"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-blue-300"
                      onLoad={() => console.log('Demo image loaded')}
                      onError={(e) => {
                        console.log('Demo image failed, using fallback');
                        e.target.src = 'https://via.placeholder.com/96x96/3b82f6/ffffff?text=Demo+Image';
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">🎨 Example AI Generated Image</p>
                      <p className="text-xs text-blue-700 mt-1">Prompt: "a beautiful sunset over mountains, digital art, high quality"</p>
                      <p className="text-xs text-blue-600">This shows what you can expect from the AI image generator</p>
                      <div className="mt-2">
                        <button
                          onClick={() => window.open('https://image.pollinations.ai/prompt/a%20beautiful%20sunset%20over%20mountains%2C%20digital%20art%2C%20high%20quality?width=1024&height=1024&seed=42&model=flux&nologo=true', '_blank')}
                          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                        >
                          View Full Size Demo
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Styles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white p-8 rounded-xl shadow-sm border border-gray-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Styles</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {stylesData?.styles?.general?.map((style, index) => (
                  <div
                    key={style}
                    className="p-4 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition-colors cursor-pointer"
                    onClick={() => setShowImageGenerator(true)}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <Palette className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-medium text-gray-900 capitalize">{style.replace('_', ' ')}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'gallery':
        return <ImageGallery images={imagesData} loading={imagesLoading} stats={imageStats} />;

      case 'analyzer':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Image Analyzer</h2>
              <p className="text-gray-600 mb-8">Upload an image to get AI-powered analysis and suggestions</p>
              <button
                onClick={() => setShowAnalyzer(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Eye className="w-5 h-5" />
                <span>Analyze Image</span>
              </button>
            </div>
          </div>
        );

      case 'concepts':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Concept Generator</h2>
              <p className="text-gray-600 mb-8">Generate creative concepts and ideas for your next image project</p>
              <button
                onClick={() => setShowConceptGenerator(true)}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Lightbulb className="w-5 h-5" />
                <span>Generate Concepts</span>
              </button>
            </div>
          </div>
        );

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
              <Image className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Image Generator</h1>
              <p className="text-gray-600 mt-1">
                Create stunning images with AI-powered tools and prompts
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
              <Zap className="w-4 h-4 text-green-500" />
              <span className="font-medium">AI-Powered</span>
            </div>
            <button
              onClick={() => setShowImageGenerator(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              <span>Generate Image</span>
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
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {renderTabContent()}
      </motion.div>

      {/* Modals */}
      {showImageGenerator && (
        <ImageGenerator
          onClose={() => setShowImageGenerator(false)}
          onSuccess={() => {
            setShowImageGenerator(false);
            queryClient.invalidateQueries('user-images');
            toast.success('Image prompt generated successfully!');
          }}
        />
      )}

      {showAnalyzer && (
        <ImageAnalyzer
          onClose={() => setShowAnalyzer(false)}
          onSuccess={() => {
            setShowAnalyzer(false);
            toast.success('Image analyzed successfully!');
          }}
        />
      )}

      {showConceptGenerator && (
        <ConceptGenerator
          onClose={() => setShowConceptGenerator(false)}
          onSuccess={() => {
            setShowConceptGenerator(false);
            toast.success('Concepts generated successfully!');
          }}
        />
      )}
    </div>
  );
};

export default ImageGeneratorPage;

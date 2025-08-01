import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { X, Lightbulb, Loader, Copy, Sparkles, Palette, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { imagesAPI } from '../../../services/api';

const ConceptGenerator = ({ onClose, onSuccess }) => {
  const [theme, setTheme] = useState('');
  const [conceptCount, setConceptCount] = useState(5);
  const [concepts, setConcepts] = useState(null);

  const generateConceptsMutation = useMutation(
    (data) => imagesAPI.generateConcepts(data),
    {
      onSuccess: (response) => {
        setConcepts(response.data.conceptsData);
        toast.success('Concepts generated successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate concepts');
      }
    }
  );

  const handleGenerate = () => {
    if (!theme.trim()) {
      toast.error('Please provide a theme');
      return;
    }
    generateConceptsMutation.mutate({ theme, count: conceptCount });
  };

  const copyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    toast.success('Prompt copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Concept Generator</h2>
              <p className="text-sm text-gray-600">
                Generate creative concepts and ideas for your image projects
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
          <div className="p-8 space-y-6">
            {/* Input Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Theme or Topic
                  </label>
                  <input
                    type="text"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="e.g., futuristic cities, nature photography, abstract art..."
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-900 mb-4">
                    Number of Concepts
                  </label>
                  <select
                    value={conceptCount}
                    onChange={(e) => setConceptCount(parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value={3}>3 Concepts</option>
                    <option value={5}>5 Concepts</option>
                    <option value={8}>8 Concepts</option>
                    <option value={10}>10 Concepts</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={generateConceptsMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generateConceptsMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Generate Concepts
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Generated Concepts */}
            {concepts && concepts.concepts && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Generated Concepts</h3>
                  <p className="text-gray-600">
                    {concepts.concepts.length} creative concepts for "{theme}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {concepts.concepts.map((concept, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                      {/* Concept Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                            <Camera className="w-5 h-5 text-green-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">{concept.title}</h4>
                        </div>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-700 mb-4 leading-relaxed">{concept.description}</p>

                      {/* Style and Mood */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Style</h5>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {concept.style}
                          </span>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 mb-2">Mood</h5>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {concept.mood}
                          </span>
                        </div>
                      </div>

                      {/* Elements */}
                      {concept.elements && (
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 mb-2">Key Elements</h5>
                          <div className="flex flex-wrap gap-2">
                            {concept.elements.map((element, elemIndex) => (
                              <span
                                key={elemIndex}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                              >
                                {element}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Generated Prompt */}
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">Ready-to-use Prompt</h5>
                          <button
                            onClick={() => copyPrompt(concept.prompt)}
                            className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                            <span className="text-sm">Copy</span>
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{concept.prompt}</p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => copyPrompt(concept.prompt)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-all duration-200"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Use This Concept</span>
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200"
          >
            Close
          </button>
          {concepts && (
            <button
              onClick={onSuccess}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200"
            >
              Save Concepts
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ConceptGenerator;

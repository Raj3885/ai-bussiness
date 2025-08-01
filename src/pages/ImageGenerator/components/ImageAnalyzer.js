import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { X, Eye, Upload, Loader, Lightbulb, Target, Palette } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { imagesAPI } from '../../../services/api';

const ImageAnalyzer = ({ onClose, onSuccess }) => {
  const [description, setDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const analyzeRequirementsMutation = useMutation(
    (data) => imagesAPI.analyzeRequirements(data),
    {
      onSuccess: (response) => {
        setAnalysis(response.data.analysisData);
        toast.success('Analysis completed successfully!');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to analyze requirements');
      }
    }
  );

  const handleAnalyze = () => {
    if (!description.trim()) {
      toast.error('Please provide a description to analyze');
      return;
    }
    analyzeRequirementsMutation.mutate({ description });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[95vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl shadow-lg">
              <Eye className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Image Analyzer</h2>
              <p className="text-sm text-gray-600">
                Get AI-powered insights and suggestions for your image ideas
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
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Describe Your Image Idea
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows="4"
                placeholder="Describe the image you want to create or analyze. Be as detailed as possible..."
              />
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleAnalyze}
                  disabled={analyzeRequirementsMutation.isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {analyzeRequirementsMutation.isLoading ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5 mr-2" />
                      Analyze Requirements
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Analysis Results */}
            {analysis && (
              <div className="space-y-6">
                {/* Main Analysis */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-3 mb-4">
                    <Target className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Analysis Results</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Main Subject</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {analysis.analysis?.mainSubject || 'Not specified'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Suggested Style</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg capitalize">
                        {analysis.analysis?.suggestedStyle || 'Not specified'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Complexity</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        analysis.analysis?.complexity === 'simple' ? 'bg-green-100 text-green-700' :
                        analysis.analysis?.complexity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {analysis.analysis?.complexity || 'Unknown'}
                      </span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Recommended Aspect Ratio</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {analysis.analysis?.recommendedAspectRatio || 'Not specified'}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Mood</h4>
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg capitalize">
                        {analysis.analysis?.mood || 'Not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Suggested Colors */}
                {analysis.analysis?.suggestedColors && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Palette className="w-6 h-6 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Suggested Colors</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {analysis.analysis.suggestedColors.map((color, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium capitalize"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Keywords */}
                {analysis.keywords && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggestions */}
                {analysis.suggestions && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <Lightbulb className="w-6 h-6 text-yellow-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Suggestions</h3>
                    </div>
                    <ul className="space-y-3">
                      {analysis.suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technical Requirements */}
                {analysis.analysis?.technicalRequirements && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Requirements</h3>
                    <ul className="space-y-2">
                      {analysis.analysis.technicalRequirements.map((requirement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Alternatives */}
                {analysis.alternatives && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Alternative Interpretations</h3>
                    <div className="space-y-3">
                      {analysis.alternatives.map((alternative, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700">{alternative}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
          {analysis && (
            <button
              onClick={onSuccess}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200"
            >
              Save Analysis
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ImageAnalyzer;

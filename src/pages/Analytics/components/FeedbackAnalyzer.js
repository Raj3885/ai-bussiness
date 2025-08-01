import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import { 
  MessageSquare, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  Meh,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  Calendar,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const FeedbackAnalyzer = ({ data, loading }) => {
  const [showSubmitFeedback, setShowSubmitFeedback] = useState(false);
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  const [newFeedback, setNewFeedback] = useState({
    content: '',
    source: 'website',
    metadata: {}
  });
  const queryClient = useQueryClient();

  // Submit feedback mutation
  const submitFeedbackMutation = useMutation(
    (data) => analyticsAPI.submitFeedback(data),
    {
      onSuccess: () => {
        toast.success('Feedback submitted successfully!');
        setShowSubmitFeedback(false);
        setNewFeedback({ content: '', source: 'website', metadata: {} });
        queryClient.invalidateQueries('analytics-feedback');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to submit feedback');
      }
    }
  );

  // Mock feedback data
  const mockFeedback = {
    feedback: [
      {
        _id: '1',
        content: 'Great product! The user interface is intuitive and easy to navigate.',
        source: 'website',
        sentiment: { label: 'positive', score: 0.8, confidence: 0.9 },
        metadata: { customerName: 'John Doe', rating: 5 },
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        _id: '2',
        content: 'The checkout process is too complicated and takes too long.',
        source: 'survey',
        sentiment: { label: 'negative', score: -0.6, confidence: 0.85 },
        metadata: { customerName: 'Jane Smith', rating: 2 },
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
      },
      {
        _id: '3',
        content: 'Customer service was helpful but response time could be better.',
        source: 'support',
        sentiment: { label: 'neutral', score: 0.1, confidence: 0.7 },
        metadata: { customerName: 'Mike Johnson', rating: 3 },
        createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000)
      }
    ],
    sentimentSummary: [
      { _id: 'positive', count: 45, avgScore: 0.7 },
      { _id: 'negative', count: 12, avgScore: -0.6 },
      { _id: 'neutral', count: 23, avgScore: 0.05 }
    ]
  };

  const feedbackData = data || mockFeedback;
  const sources = ['all', 'website', 'email', 'social', 'survey', 'review', 'support'];
  const sentiments = ['all', 'positive', 'negative', 'neutral'];

  const filteredFeedback = feedbackData.feedback.filter(item => {
    const sourceMatch = selectedSource === 'all' || item.source === selectedSource;
    const sentimentMatch = selectedSentiment === 'all' || item.sentiment.label === selectedSentiment;
    return sourceMatch && sentimentMatch;
  });

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return ThumbsUp;
      case 'negative': return ThumbsDown;
      default: return Meh;
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSubmitFeedback = () => {
    if (!newFeedback.content.trim()) {
      toast.error('Please enter feedback content');
      return;
    }
    submitFeedbackMutation.mutate(newFeedback);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Feedback Analysis</h2>
          <p className="text-gray-600 mt-1">AI-powered sentiment analysis and insights</p>
        </div>
        <button
          onClick={() => setShowSubmitFeedback(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Feedback</span>
        </button>
      </div>

      {/* Sentiment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {feedbackData.sentimentSummary.map((sentiment, index) => {
          const SentimentIcon = getSentimentIcon(sentiment._id);
          const total = feedbackData.sentimentSummary.reduce((sum, s) => sum + s.count, 0);
          const percentage = ((sentiment.count / total) * 100).toFixed(1);
          
          return (
            <motion.div
              key={sentiment._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getSentimentColor(sentiment._id)}`}>
                    <SentimentIcon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900 capitalize">{sentiment._id}</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">{sentiment.count}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Percentage</span>
                  <span className="font-medium">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      sentiment._id === 'positive' ? 'bg-green-500' :
                      sentiment._id === 'negative' ? 'bg-red-500' : 'bg-gray-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Avg Score</span>
                  <span className="font-medium">{sentiment.avgScore.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 overflow-x-auto">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Source:</span>
          <select
            value={selectedSource}
            onChange={(e) => setSelectedSource(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {sources.map(source => (
              <option key={source} value={source}>
                {source.charAt(0).toUpperCase() + source.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">Sentiment:</span>
          <select
            value={selectedSentiment}
            onChange={(e) => setSelectedSentiment(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            {sentiments.map(sentiment => (
              <option key={sentiment} value={sentiment}>
                {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {filteredFeedback.map((feedback, index) => {
          const SentimentIcon = getSentimentIcon(feedback.sentiment.label);
          
          return (
            <motion.div
              key={feedback._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getSentimentColor(feedback.sentiment.label)}`}>
                    <SentimentIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-medium text-gray-900 capitalize">{feedback.source}</span>
                    {feedback.metadata.customerName && (
                      <p className="text-sm text-gray-600">by {feedback.metadata.customerName}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {feedback.metadata.rating && (
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < feedback.metadata.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  <span className="text-sm text-gray-500">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-800 mb-4">{feedback.content}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(feedback.sentiment.label)}`}>
                    {feedback.sentiment.label}
                  </span>
                  <span className="text-sm text-gray-600">
                    Confidence: {(feedback.sentiment.confidence * 100).toFixed(0)}%
                  </span>
                  <span className="text-sm text-gray-600">
                    Score: {feedback.sentiment.score.toFixed(2)}
                  </span>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Submit Feedback Modal */}
      {showSubmitFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Submit Customer Feedback</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Source</label>
                <select
                  value={newFeedback.source}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, source: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="website">Website</option>
                  <option value="email">Email</option>
                  <option value="social">Social Media</option>
                  <option value="survey">Survey</option>
                  <option value="review">Review</option>
                  <option value="support">Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback Content *</label>
                <textarea
                  value={newFeedback.content}
                  onChange={(e) => setNewFeedback(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                  placeholder="Enter customer feedback..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name (Optional)</label>
                <input
                  type="text"
                  value={newFeedback.metadata.customerName || ''}
                  onChange={(e) => setNewFeedback(prev => ({ 
                    ...prev, 
                    metadata: { ...prev.metadata, customerName: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Customer name"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSubmitFeedback(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                disabled={submitFeedbackMutation.isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {submitFeedbackMutation.isLoading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FeedbackAnalyzer;

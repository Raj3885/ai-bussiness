import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Grid3X3,
  List,
  Eye,
  Download,
  Heart,
  Share2,
  Edit3,
  Trash2,
  Copy,
  Filter,
  Search,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  Loader
} from 'lucide-react';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const ImageGallery = ({ images, loading, stats }) => {
  const [viewMode, setViewMode] = useState('grid');
  const [filterStyle, setFilterStyle] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredImages = images?.images?.filter(image => {
    const matchesSearch = !searchQuery || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStyle = filterStyle === 'all' || image.style === filterStyle;
    
    return matchesSearch && matchesStyle;
  }) || [];

  const copyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt);
    // You might want to add a toast notification here
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
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Images</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.stats?.total || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <ImageIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Generated</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.stats?.generated || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Sparkles className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.stats?.pending || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Most Used Style</p>
                <p className="text-lg font-bold text-gray-900 mt-2 capitalize">
                  {stats.stats?.styleBreakdown?.[0]?._id || 'None'}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Filter className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Style Filter */}
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Styles</option>
            <option value="realistic">Realistic</option>
            <option value="artistic">Artistic</option>
            <option value="cartoon">Cartoon</option>
            <option value="minimalist">Minimalist</option>
            <option value="vintage">Vintage</option>
            <option value="modern">Modern</option>
          </select>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Images Grid/List */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-600 mb-6">
            {searchQuery || filterStyle !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Start by generating your first AI image prompt'
            }
          </p>
        </div>
      ) : (
        <div className={
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }>
          {filteredImages.map((image, index) => (
            <motion.div
              key={image._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 ${
                viewMode === 'list' ? 'flex items-center p-4 space-x-4' : 'overflow-hidden'
              }`}
            >
              {viewMode === 'grid' ? (
                <>
                  {/* Image Placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                    {image.imageUrl ? (
                      <>
                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-full object-cover"
                        />
                        {image.status === 'generating' && (
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <div className="text-center text-white">
                              <Loader className="w-8 h-8 animate-spin mx-auto mb-2" />
                              <p className="text-sm font-medium">Generating...</p>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center">
                        <ImageIcon className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                        <p className="text-sm text-purple-600 font-medium">
                          {image.status === 'generating' ? 'Generating...' : 'Prompt Generated'}
                        </p>
                        {image.status === 'generating' && (
                          <Loader className="w-6 h-6 text-purple-500 animate-spin mx-auto mt-2" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">{image.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        image.status === 'generated' ? 'bg-green-100 text-green-700' :
                        image.status === 'generating' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {image.status.replace('_', ' ')}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                          {image.style}
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          {image.aspectRatio}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => copyPrompt(image.prompt)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Copy prompt"
                        >
                          <Copy className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <Download className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* List View */}
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {image.imageUrl ? (
                      <img 
                        src={image.imageUrl} 
                        alt={image.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-purple-400" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{image.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        image.status === 'generated' ? 'bg-green-100 text-green-700' :
                        image.status === 'generating' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {image.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mb-2">{image.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full capitalize">
                        {image.style}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        {image.aspectRatio}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                      onClick={() => copyPrompt(image.prompt)}
                      className="p-2 hover:bg-gray-100 rounded transition-colors"
                      title="Copy prompt"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;

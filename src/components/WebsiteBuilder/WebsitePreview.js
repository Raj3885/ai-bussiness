import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  Download, 
  Edit,
  Share,
  Code,
  Eye
} from 'lucide-react';

const WebsitePreview = ({ website, isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState('desktop');
  const [activeTab, setActiveTab] = useState('preview');

  if (!isOpen || !website) return null;

  const getViewportClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'w-80 h-[600px]';
      case 'tablet':
        return 'w-[768px] h-[600px]';
      default:
        return 'w-full h-[600px]';
    }
  };

  const renderWebsiteContent = () => {
    const { content } = website;
    const colorScheme = website.design?.colorScheme || {
      primary: '#e855ff',
      secondary: '#00bfff'
    };

    return (
      <div className="h-full overflow-y-auto bg-white">
        {/* Hero Section */}
        {content?.hero && (
          <section 
            className="py-20 px-6 text-center text-white"
            style={{ 
              background: `linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary})` 
            }}
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {content.hero.headline}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {content.hero.subheadline}
              </p>
              <button 
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {content.hero.ctaText || 'Get Started'}
              </button>
            </div>
          </section>
        )}

        {/* About Section */}
        {content?.about && (
          <section className="py-16 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {content.about.title}
              </h2>
              <div className="text-lg text-gray-600 leading-relaxed">
                {content.about.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Services Section */}
        {content?.services && content.services.length > 0 && (
          <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.services.map((service, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {content?.features && content.features.length > 0 && (
          <section className="py-16 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Why Choose Us
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {content.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                      style={{ backgroundColor: colorScheme.primary }}
                    >
                      ✓
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {content?.testimonials && content.testimonials.length > 0 && (
          <section className="py-16 px-6 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                What Our Clients Say
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {content.testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating || 5)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {content?.contact && (
          <section 
            className="py-16 px-6 text-white"
            style={{ 
              background: `linear-gradient(135deg, ${colorScheme.secondary}, ${colorScheme.primary})` 
            }}
          >
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                {content.contact.title}
              </h2>
              <p className="text-xl mb-8 opacity-90">
                {content.contact.description}
              </p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; 2024 {website.businessInfo?.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-neutral-900">
              {website.businessInfo?.name || 'Website Preview'}
            </h2>
            
            {/* View Mode Toggles */}
            <div className="flex items-center space-x-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'desktop' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('tablet')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'tablet' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'mobile' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Toggles */}
            <div className="flex items-center space-x-1 bg-neutral-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'preview' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Eye className="w-4 h-4 mr-1 inline" />
                Preview
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeTab === 'code' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Code className="w-4 h-4 mr-1 inline" />
                Code
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="btn btn-sm btn-outline">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </button>
            <button className="btn btn-sm btn-outline">
              <Share className="w-4 h-4 mr-1" />
              Share
            </button>
            <button className="btn btn-sm btn-primary">
              <ExternalLink className="w-4 h-4 mr-1" />
              Open
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 bg-neutral-50 overflow-hidden">
          <div className="h-full flex items-center justify-center">
            <div className={`${getViewportClass()} bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300`}>
              {activeTab === 'preview' ? (
                renderWebsiteContent()
              ) : (
                <div className="h-full p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-y-auto">
                  <pre>{JSON.stringify(website.content, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WebsitePreview;

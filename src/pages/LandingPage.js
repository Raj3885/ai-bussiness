import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Globe, 
  Mail, 
  MessageCircle, 
  BarChart3, 
  Image,
  ArrowRight,
  Check,
  Star,
  Users,
  Zap,
  Shield
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: Globe,
      title: 'AI Website Builder',
      description: 'Generate professional websites from simple business inputs with real-time preview and customization.',
      color: 'text-primary-600'
    },
    {
      icon: Mail,
      title: 'Marketing Automation',
      description: 'AI-powered email campaigns, automated newsletters, and customer engagement tracking.',
      color: 'text-secondary-600'
    },
    {
      icon: MessageCircle,
      title: 'Smart Chatbot',
      description: '24/7 customer support with business-specific training and natural language processing.',
      color: 'text-accent-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Sentiment analysis, feedback summarization, and actionable business insights.',
      color: 'text-success-600'
    },
    {
      icon: Image,
      title: 'Image Generation',
      description: 'AI-powered image creation, product enhancement, and sketch-to-image conversion.',
      color: 'text-warning-600'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'Seamless coordination between all AI modules for a unified business experience.',
      color: 'text-error-600'
    }
  ];

  const benefits = [
    'No technical expertise required',
    'Save thousands on development costs',
    'Launch your online presence in minutes',
    'AI-powered content generation',
    'Responsive and mobile-friendly designs',
    '24/7 customer support automation'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      business: 'Local Bakery',
      content: 'This platform helped me create a professional website and automate my customer communications. Sales increased by 40% in just 2 months!',
      rating: 5
    },
    {
      name: 'Mike Chen',
      business: 'Consulting Firm',
      content: 'The AI chatbot handles most customer inquiries automatically, freeing up my time to focus on growing the business.',
      rating: 5
    },
    {
      name: 'Lisa Rodriguez',
      business: 'Online Store',
      content: 'The marketing automation features are incredible. My email campaigns now generate 3x more engagement.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-secondary-50/30">
      {/* Navigation */}
      <nav className="container-custom py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gradient">AI Business Toolkit</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="btn btn-ghost">
              Sign In
            </Link>
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container-custom section-padding">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6">
              Empower Your Business with{' '}
              <span className="text-gradient">AI-Driven</span> Digital Tools
            </h1>
            
            <p className="text-xl lg:text-2xl text-neutral-600 mb-8 leading-relaxed">
              Build, manage, and grow your online presence without needing technical staff. 
              Our AI handles website creation, marketing, customer service, and analytics.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/register" className="btn btn-primary btn-xl group">
                Start Building for Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="btn btn-outline btn-xl">
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-neutral-500">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-success-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-success-600" />
                <span>Setup in 5 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-success-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-custom section-padding bg-white/50 backdrop-blur-sm">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            Everything You Need to Succeed Online
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Our comprehensive AI toolkit replaces the need for multiple expensive services and technical staff.
          </p>
        </div>
        
        <div className="grid-responsive">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card card-hover p-8 text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Why Choose Our AI Platform?
            </h2>
            <p className="text-xl text-neutral-600 mb-8">
              Join thousands of small businesses that have transformed their digital presence with our AI-powered tools.
            </p>
            
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-success-600" />
                  </div>
                  <span className="text-neutral-700">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary-100 to-secondary-100 rounded-3xl p-8">
              <div className="w-full h-full bg-white rounded-2xl shadow-large flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">AI-Powered</h3>
                  <p className="text-neutral-600">Smart automation for your business</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container-custom section-padding bg-neutral-900 text-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Loved by Business Owners
          </h2>
          <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
            See how our AI platform has helped businesses like yours succeed online.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-warning-400 fill-current" />
                ))}
              </div>
              <p className="text-neutral-200 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-neutral-400 text-sm">{testimonial.business}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom section-padding">
        <div className="text-center bg-gradient-primary rounded-3xl p-12 lg:p-16 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who are already using AI to grow their businesses. 
            Start your free trial today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/register" className="btn bg-white text-primary-600 hover:bg-neutral-100 btn-xl">
              Start Free Trial
            </Link>
            <button className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 btn-xl">
              Schedule Demo
            </button>
          </div>
          
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>10,000+ businesses</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Enterprise security</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>99.9% uptime</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-custom py-12 border-t border-neutral-200">
        <div className="text-center text-neutral-600">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gradient">AI Business Toolkit</span>
          </div>
          <p>&copy; 2024 AI Business Toolkit. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

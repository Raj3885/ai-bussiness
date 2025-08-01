import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Globe,
  Mail,
  MessageCircle,
  BarChart3,
  Image,
  TrendingUp,
  Users,
  Zap,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Websites Created',
      value: '3',
      change: '+2 this month',
      changeType: 'positive',
      icon: Globe,
      color: 'text-primary-500'
    },
    {
      name: 'Email Campaigns',
      value: '12',
      change: '+4 this week',
      changeType: 'positive',
      icon: Mail,
      color: 'text-secondary-500'
    },
    {
      name: 'Chat Interactions',
      value: '89',
      change: '+23 today',
      changeType: 'positive',
      icon: MessageCircle,
      color: 'text-accent-500'
    },
    {
      name: 'Images Generated',
      value: '45',
      change: '+12 this week',
      changeType: 'positive',
      icon: Image,
      color: 'text-success-500'
    }
  ];

  const quickActions = [
    {
      name: 'Create Website',
      description: 'Generate a new AI-powered website',
      href: '/app/websites',
      icon: Globe,
      color: 'bg-primary-500'
    },
    {
      name: 'Send Campaign',
      description: 'Create and send marketing emails',
      href: '/app/marketing',
      icon: Mail,
      color: 'bg-secondary-500'
    },
    {
      name: 'Train Chatbot',
      description: 'Improve your AI assistant',
      href: '/app/chatbot',
      icon: MessageCircle,
      color: 'bg-accent-500'
    },
    {
      name: 'Generate Images',
      description: 'Create product images with AI',
      href: '/app/images',
      icon: Image,
      color: 'bg-success-500'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'website',
      title: 'Website "Modern Bakery" published',
      time: '2 hours ago',
      icon: Globe,
      color: 'text-primary-500'
    },
    {
      id: 2,
      type: 'email',
      title: 'Newsletter sent to 150 subscribers',
      time: '4 hours ago',
      icon: Mail,
      color: 'text-secondary-500'
    },
    {
      id: 3,
      type: 'chat',
      title: 'Chatbot answered 12 customer queries',
      time: '6 hours ago',
      icon: MessageCircle,
      color: 'text-accent-500'
    },
    {
      id: 4,
      type: 'image',
      title: 'Generated 5 product images',
      time: '1 day ago',
      icon: Image,
      color: 'text-success-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.name?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-lg opacity-90 mb-4">
                Your AI-powered business toolkit is ready to help you grow.
              </p>
              <div className="flex items-center space-x-2 text-sm opacity-80">
                <Sparkles className="w-4 h-4" />
                <span>All AI services are active and running</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                <Zap className="w-16 h-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-600">{stat.name}</p>
                <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                <p className={`text-sm mt-2 ${
                  stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                }`}>
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-neutral-100 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">Quick Actions</h2>
          <Link to="/app/websites" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View all tools →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <Link
              key={action.name}
              to={action.href}
              className="card card-hover p-6 text-center group"
            >
              <div className={`w-16 h-16 ${action.color} rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{action.name}</h3>
              <p className="text-neutral-600 text-sm">{action.description}</p>
              <div className="mt-4 flex items-center justify-center text-primary-600 group-hover:text-primary-700">
                <span className="text-sm font-medium">Get started</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Analytics */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-neutral-900">Recent Activity</h3>
            <Link to="/app/analytics" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all →
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-neutral-50">
                <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                  <activity.icon className={`w-5 h-5 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">{activity.title}</p>
                  <p className="text-xs text-neutral-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-neutral-900">Performance Overview</h3>
            <Link to="/app/analytics" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View details →
            </Link>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Website Traffic</span>
                <span className="text-sm font-semibold text-neutral-900">+24%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Email Open Rate</span>
                <span className="text-sm font-semibold text-neutral-900">68%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-secondary-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-600">Customer Satisfaction</span>
                <span className="text-sm font-semibold text-neutral-900">92%</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2">
                <div className="bg-success-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-center space-x-2 text-success-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">All metrics trending up</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardPage;

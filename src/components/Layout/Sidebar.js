import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  LayoutDashboard,
  Globe,
  Mail,
  MessageCircle,
  BarChart3,
  Image,
  User,
  Settings,
  X,
  Zap
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    {
      name: 'Dashboard',
      href: '/app',
      icon: LayoutDashboard,
      current: location.pathname === '/app'
    },
    {
      name: 'Website Builder',
      href: '/app/websites',
      icon: Globe,
      current: location.pathname.startsWith('/app/websites')
    },
    {
      name: 'Marketing',
      href: '/app/marketing',
      icon: Mail,
      current: location.pathname.startsWith('/app/marketing')
    },
    {
      name: 'AI Chatbot',
      href: '/app/chatbot',
      icon: MessageCircle,
      current: location.pathname.startsWith('/app/chatbot')
    },
    {
      name: 'Analytics',
      href: '/app/analytics',
      icon: BarChart3,
      current: location.pathname.startsWith('/app/analytics')
    },
    {
      name: 'Image Generator',
      href: '/app/images',
      icon: Image,
      current: location.pathname.startsWith('/app/images')
    }
  ];

  const secondaryNavigation = [
    {
      name: 'Profile',
      href: '/app/profile',
      icon: User,
      current: location.pathname === '/app/profile'
    },
    {
      name: 'Settings',
      href: '/app/settings',
      icon: Settings,
      current: location.pathname === '/app/settings'
    }
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-neutral-200 px-6 pb-4">
          {/* Logo */}
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">AI Business Toolkit</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 shadow-soft'
                              : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                          }`
                        }
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
                            item.current ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-600'
                          }`}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {/* AI Features Badge */}
              <li>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-primary-900">AI-Powered</span>
                  </div>
                  <p className="text-xs text-primary-700">
                    All tools are enhanced with artificial intelligence for better results.
                  </p>
                </div>
              </li>

              {/* Secondary navigation */}
              <li className="mt-auto">
                <ul role="list" className="-mx-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 shadow-soft'
                              : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                          }`
                        }
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
                            item.current ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-600'
                          }`}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 z-50 flex w-64 flex-col lg:hidden"
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-neutral-200 px-6 pb-4">
          {/* Header with close button */}
          <div className="flex h-16 shrink-0 items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gradient">AI Business Toolkit</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 shadow-soft'
                              : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                          }`
                        }
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
                            item.current ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-600'
                          }`}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {/* AI Features Badge */}
              <li>
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4 border border-primary-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-medium text-primary-900">AI-Powered</span>
                  </div>
                  <p className="text-xs text-primary-700">
                    All tools are enhanced with artificial intelligence for better results.
                  </p>
                </div>
              </li>

              {/* Secondary navigation */}
              <li className="mt-auto">
                <ul role="list" className="-mx-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={({ isActive }) =>
                          `group flex gap-x-3 rounded-lg p-3 text-sm leading-6 font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-primary-50 text-primary-700 shadow-soft'
                              : 'text-neutral-700 hover:text-primary-700 hover:bg-neutral-50'
                          }`
                        }
                      >
                        <item.icon
                          className={`h-5 w-5 shrink-0 transition-colors ${
                            item.current ? 'text-primary-600' : 'text-neutral-400 group-hover:text-primary-600'
                          }`}
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;

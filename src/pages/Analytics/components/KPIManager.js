import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from 'react-query';
import { 
  Target, 
  Plus, 
  Edit3, 
  Trash2, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  CheckCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Zap
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const KPIManager = ({ data, loading }) => {
  const [showCreateKPI, setShowCreateKPI] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newKPI, setNewKPI] = useState({
    name: '',
    category: 'financial',
    description: '',
    target: { value: '', period: 'monthly' },
    unit: ''
  });
  const queryClient = useQueryClient();

  // Create KPI mutation
  const createKPIMutation = useMutation(
    (data) => analyticsAPI.createKPI(data),
    {
      onSuccess: () => {
        toast.success('KPI created successfully!');
        setShowCreateKPI(false);
        setNewKPI({
          name: '',
          category: 'financial',
          description: '',
          target: { value: '', period: 'monthly' },
          unit: ''
        });
        queryClient.invalidateQueries('analytics-kpis');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create KPI');
      }
    }
  );

  // Update KPI mutation
  const updateKPIMutation = useMutation(
    ({ id, value, note }) => analyticsAPI.updateKPI(id, { value, note }),
    {
      onSuccess: () => {
        toast.success('KPI updated successfully!');
        queryClient.invalidateQueries('analytics-kpis');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update KPI');
      }
    }
  );

  const mockKPIs = [
    {
      _id: '1',
      name: 'Monthly Revenue',
      category: 'financial',
      currentValue: 45000,
      target: { value: 50000, period: 'monthly' },
      unit: '$',
      trend: 'increasing',
      performance: { percentage: 90, status: 'on-track' },
      history: [
        { date: '2024-01-01', value: 42000 },
        { date: '2024-02-01', value: 44000 },
        { date: '2024-03-01', value: 45000 }
      ]
    },
    {
      _id: '2',
      name: 'Customer Acquisition',
      category: 'customer',
      currentValue: 120,
      target: { value: 150, period: 'monthly' },
      unit: 'customers',
      trend: 'increasing',
      performance: { percentage: 80, status: 'on-track' },
      history: [
        { date: '2024-01-01', value: 100 },
        { date: '2024-02-01', value: 110 },
        { date: '2024-03-01', value: 120 }
      ]
    },
    {
      _id: '3',
      name: 'Website Conversion Rate',
      category: 'marketing',
      currentValue: 3.2,
      target: { value: 5.0, period: 'monthly' },
      unit: '%',
      trend: 'decreasing',
      performance: { percentage: 64, status: 'behind' },
      history: [
        { date: '2024-01-01', value: 3.8 },
        { date: '2024-02-01', value: 3.5 },
        { date: '2024-03-01', value: 3.2 }
      ]
    },
    {
      _id: '4',
      name: 'Customer Satisfaction',
      category: 'operational',
      currentValue: 4.6,
      target: { value: 4.5, period: 'monthly' },
      unit: '/5',
      trend: 'stable',
      performance: { percentage: 102, status: 'achieved' },
      history: [
        { date: '2024-01-01', value: 4.5 },
        { date: '2024-02-01', value: 4.6 },
        { date: '2024-03-01', value: 4.6 }
      ]
    }
  ];

  const kpis = data?.kpis || mockKPIs;
  const categories = ['all', 'financial', 'customer', 'marketing', 'operational', 'growth'];

  const filteredKPIs = selectedCategory === 'all' 
    ? kpis 
    : kpis.filter(kpi => kpi.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'financial': return DollarSign;
      case 'customer': return Users;
      case 'marketing': return BarChart3;
      case 'operational': return Activity;
      case 'growth': return TrendingUp;
      default: return Target;
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return TrendingUp;
      case 'decreasing': return TrendingDown;
      default: return Minus;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'achieved': return 'text-green-600 bg-green-100';
      case 'on-track': return 'text-blue-600 bg-blue-100';
      case 'behind': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleCreateKPI = () => {
    if (!newKPI.name || !newKPI.target.value) {
      toast.error('Please fill in all required fields');
      return;
    }
    createKPIMutation.mutate(newKPI);
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
          <h2 className="text-2xl font-bold text-gray-900">KPI Management</h2>
          <p className="text-gray-600 mt-1">Track and manage your key performance indicators</p>
        </div>
        <button
          onClick={() => setShowCreateKPI(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add KPI</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredKPIs.map((kpi, index) => {
          const CategoryIcon = getCategoryIcon(kpi.category);
          const TrendIcon = getTrendIcon(kpi.trend);
          
          return (
            <motion.div
              key={kpi._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CategoryIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{kpi.name}</h3>
                    <p className="text-sm text-gray-500 capitalize">{kpi.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Edit3 className="w-4 h-4 text-gray-500" />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Trash2 className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Current Value */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {kpi.unit === '$' ? '$' : ''}{kpi.currentValue.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}
                  </span>
                  <div className="flex items-center space-x-1">
                    <TrendIcon className={`w-4 h-4 ${
                      kpi.trend === 'increasing' ? 'text-green-500' :
                      kpi.trend === 'decreasing' ? 'text-red-500' : 'text-gray-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      kpi.performance.status === 'achieved' ? 'text-green-600' :
                      kpi.performance.status === 'on-track' ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {kpi.performance.percentage}%
                    </span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${
                      kpi.performance.status === 'achieved' ? 'bg-green-500' :
                      kpi.performance.status === 'on-track' ? 'bg-blue-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(kpi.performance.percentage, 100)}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Target: {kpi.unit === '$' ? '$' : ''}{kpi.target.value.toLocaleString()}{kpi.unit !== '$' ? kpi.unit : ''}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(kpi.performance.status)}`}>
                    {kpi.performance.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="mb-4">
                <div className="flex items-end justify-between h-16 space-x-1">
                  {kpi.history.slice(-6).map((point, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-200 rounded-t flex-1"
                      style={{ 
                        height: `${(point.value / Math.max(...kpi.history.map(h => h.value))) * 100}%`,
                        minHeight: '4px'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Update value"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      updateKPIMutation.mutate({
                        id: kpi._id,
                        value: parseFloat(e.target.value),
                        note: 'Manual update'
                      });
                      e.target.value = '';
                    }
                  }}
                />
                <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors">
                  Update
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Create KPI Modal */}
      {showCreateKPI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New KPI</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">KPI Name *</label>
                <input
                  type="text"
                  value={newKPI.name}
                  onChange={(e) => setNewKPI(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Monthly Revenue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newKPI.category}
                  onChange={(e) => setNewKPI(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="financial">Financial</option>
                  <option value="customer">Customer</option>
                  <option value="marketing">Marketing</option>
                  <option value="operational">Operational</option>
                  <option value="growth">Growth</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newKPI.description}
                  onChange={(e) => setNewKPI(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="2"
                  placeholder="Brief description of this KPI"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Value *</label>
                  <input
                    type="number"
                    value={newKPI.target.value}
                    onChange={(e) => setNewKPI(prev => ({ 
                      ...prev, 
                      target: { ...prev.target, value: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <input
                    type="text"
                    value={newKPI.unit}
                    onChange={(e) => setNewKPI(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="$, %, customers"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateKPI(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateKPI}
                disabled={createKPIMutation.isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {createKPIMutation.isLoading ? 'Creating...' : 'Create KPI'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default KPIManager;

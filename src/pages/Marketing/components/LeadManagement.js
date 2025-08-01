import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Plus,
  Search,
  Filter,
  Mail,
  Phone,
  Building,
  Star,
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { leadsAPI } from '../../../services/api';
import LoadingSpinner from '../../../components/UI/LoadingSpinner';

const LeadManagement = ({ leads, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddLead, setShowAddLead] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'proposal': return 'bg-purple-100 text-purple-700';
      case 'closed_won': return 'bg-success-100 text-success-700';
      case 'closed_lost': return 'bg-error-100 text-error-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getEngagementLevel = (score) => {
    if (score >= 80) return { label: 'High', color: 'text-success-600' };
    if (score >= 50) return { label: 'Medium', color: 'text-warning-600' };
    return { label: 'Low', color: 'text-error-600' };
  };

  if (loading) {
    return <LoadingSpinner message="Loading leads..." />;
  }

  const filteredLeads = leads?.leads?.filter(lead => {
    const matchesSearch = !searchTerm || 
      lead.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  }) || [];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Total Leads</p>
              <p className="text-2xl font-bold text-neutral-900">
                {leads?.stats?.totalLeads || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">New Leads</p>
              <p className="text-2xl font-bold text-neutral-900">
                {leads?.stats?.newLeads || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Qualified</p>
              <p className="text-2xl font-bold text-neutral-900">
                {leads?.stats?.qualifiedLeads || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-success-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-600">Avg. Engagement</p>
              <p className="text-2xl font-bold text-neutral-900">
                {Math.round(leads?.stats?.avgEngagementScore || 0)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-warning-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="proposal">Proposal</option>
            <option value="closed_won">Closed Won</option>
            <option value="closed_lost">Closed Lost</option>
          </select>
        </div>

        <button
          onClick={() => setShowAddLead(true)}
          className="btn btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </button>
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-12 text-center"
        >
          <div className="w-16 h-16 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Users className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No leads found</h3>
          <p className="text-neutral-600 mb-6">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters.'
              : 'Add your first lead to get started with lead management.'
            }
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead, index) => (
            <motion.div
              key={lead._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {lead.fullName?.charAt(0) || lead.email?.charAt(0) || '?'}
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">
                      {lead.fullName || 'No Name'}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-neutral-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      {lead.company && (
                        <div className="flex items-center space-x-1">
                          <Building className="w-4 h-4" />
                          <span>{lead.company}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                      {lead.status?.replace('_', ' ')}
                    </span>
                    <div className="text-sm text-neutral-600 mt-1">
                      Engagement: <span className={getEngagementLevel(lead.engagement?.engagementScore || 0).color}>
                        {getEngagementLevel(lead.engagement?.engagementScore || 0).label}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button className="btn btn-sm btn-ghost" title="View Details">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="btn btn-sm btn-ghost" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="btn btn-sm btn-ghost text-error-600 hover:bg-error-50" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Lead Stats */}
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="grid grid-cols-4 gap-4 text-center text-sm">
                  <div>
                    <div className="font-medium text-neutral-900">{lead.engagement?.totalEmails || 0}</div>
                    <div className="text-neutral-600">Emails Sent</div>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">{lead.engagement?.emailsOpened || 0}</div>
                    <div className="text-neutral-600">Opened</div>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">{lead.engagement?.linksClicked || 0}</div>
                    <div className="text-neutral-600">Clicked</div>
                  </div>
                  <div>
                    <div className="font-medium text-neutral-900">{lead.engagementRate || 0}%</div>
                    <div className="text-neutral-600">Rate</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadManagement;

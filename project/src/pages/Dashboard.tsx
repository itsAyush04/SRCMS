import React, { useState } from 'react';
import { BarChart3, Users, Clock, TrendingUp, Filter, Download } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const stats = [
    { label: 'Total Complaints', value: '1,247', change: '+12%', color: 'blue' },
    { label: 'Pending Resolution', value: '89', change: '-8%', color: 'orange' },
    { label: 'Resolved Today', value: '34', change: '+15%', color: 'green' },
    { label: 'Avg Resolution Time', value: '2.3 days', change: '-5%', color: 'purple' }
  ];

  const recentComplaints = [
    {
      id: 'RWY-2024-001234',
      subject: 'Train delay and poor cleanliness',
      category: 'Train Delay',
      priority: 'high',
      status: 'in_progress',
      created: '2024-01-16T14:20:00',
      sentiment: 'negative',
      urgency: 85
    },
    {
      id: 'RWY-2024-001235',
      subject: 'Staff behavior issue at platform',
      category: 'Staff Behavior',
      priority: 'medium',
      status: 'assigned',
      created: '2024-01-16T13:45:00',
      sentiment: 'neutral',
      urgency: 62
    },
    {
      id: 'RWY-2024-001236',
      subject: 'Ticket booking system error',
      category: 'Technical',
      priority: 'urgent',
      status: 'submitted',
      created: '2024-01-16T13:20:00',
      sentiment: 'negative',
      urgency: 92
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'assigned': return 'bg-purple-100 text-purple-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'urgent': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personnel Dashboard</h1>
          <p className="text-gray-600">AI-assisted complaint management and analytics</p>
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'complaints', label: 'Active Complaints', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <IconComponent className="h-4 w-4 inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Priority Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Urgent', count: 23, color: 'bg-red-500' },
                      { label: 'High', count: 45, color: 'bg-orange-500' },
                      { label: 'Medium', count: 78, color: 'bg-yellow-500' },
                      { label: 'Low', count: 34, color: 'bg-green-500' }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                        <span className="text-sm text-gray-600">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Category Breakdown</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Train Delays', count: 67 },
                      { label: 'Cleanliness', count: 45 },
                      { label: 'Staff Behavior', count: 34 },
                      { label: 'Technical Issues', count: 23 }
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.label}</span>
                        <span className="text-sm text-gray-600">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'complaints' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Recent Complaints</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Complaint ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        AI Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentComplaints.map((complaint) => (
                      <tr key={complaint.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {complaint.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {complaint.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getPriorityColor(complaint.priority)}`}>
                            {complaint.priority.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(complaint.status)}`}>
                            {complaint.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex items-center">
                            <span className="mr-2">{complaint.urgency}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-orange-600 h-2 rounded-full" 
                                style={{ width: `${complaint.urgency}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-green-600 hover:text-green-900">Assign</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {selectedTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Resolution Trends</h4>
                  <div className="h-32 bg-white rounded flex items-center justify-center">
                    <p className="text-gray-500">Chart visualization would go here</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Sentiment Analysis</h4>
                  <div className="h-32 bg-white rounded flex items-center justify-center">
                    <p className="text-gray-500">Sentiment trends chart</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">AI Insights</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Train delay complaints increased 15% this week</li>
                  <li>• Peak complaint hours: 8-10 AM and 6-8 PM</li>
                  <li>• 89% accuracy in automated categorization</li>
                  <li>• Average sentiment score improved by 12%</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
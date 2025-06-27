import React, { useState } from 'react';
import { Search, Clock, CheckCircle, AlertTriangle, MessageSquare } from 'lucide-react';

export const TrackComplaint: React.FC = () => {
  const [tokenId, setTokenId] = useState('');
  const [complaint, setComplaint] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrack = async () => {
    if (!tokenId.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setComplaint({
        id: tokenId,
        subject: 'Train delay and poor cleanliness',
        category: 'Train Delay/Cancellation',
        priority: 'high',
        status: 'in_progress',
        created: '2024-01-15T10:30:00',
        updated: '2024-01-16T14:20:00',
        assignedTo: 'Railway Officer - John Doe',
        sentiment: 'negative',
        urgencyScore: 85,
        estimatedResolution: '2024-01-18T16:00:00',
        updates: [
          {
            date: '2024-01-15T10:30:00',
            status: 'submitted',
            message: 'Complaint received and assigned token ID',
            officer: 'System'
          },
          {
            date: '2024-01-15T11:15:00',
            status: 'categorized',
            message: 'Complaint categorized as Train Delay/Cancellation with HIGH priority',
            officer: 'AI System'
          },
          {
            date: '2024-01-16T09:00:00',
            status: 'assigned',
            message: 'Complaint assigned to Railway Officer - John Doe',
            officer: 'Admin'
          },
          {
            date: '2024-01-16T14:20:00',
            status: 'in_progress',
            message: 'Investigation started. Station manager contacted for details.',
            officer: 'John Doe'
          }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-100';
      case 'categorized': return 'text-yellow-600 bg-yellow-100';
      case 'assigned': return 'text-purple-600 bg-purple-100';
      case 'in_progress': return 'text-orange-600 bg-orange-100';
      case 'resolved': return 'text-green-600 bg-green-100';
      case 'closed': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">Track Your Complaint</h1>
          <p className="text-green-100">Enter your token ID to view complaint status and updates</p>
        </div>

        <div className="p-6">
          {/* Search Section */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Complaint Token ID
              </label>
              <input
                type="text"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter your token ID (e.g., RWY-2024-001234)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleTrack}
                disabled={isLoading || !tokenId.trim()}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Track
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Complaint Details */}
          {complaint && (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Current Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(complaint.status)}`}>
                    {complaint.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Priority Level</h3>
                  <span className={`text-lg font-bold ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority.toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Urgency Score</h3>
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-orange-600">{complaint.urgencyScore}%</span>
                    <div className="ml-2 flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full" 
                        style={{ width: `${complaint.urgencyScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complaint Info */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Subject</p>
                    <p className="font-medium">{complaint.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-medium">{complaint.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Assigned To</p>
                    <p className="font-medium">{complaint.assignedTo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Resolution</p>
                    <p className="font-medium">{new Date(complaint.estimatedResolution).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Timeline</h3>
                <div className="space-y-4">
                  {complaint.updates.map((update: any, index: number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(update.status)}`}>
                          {update.status === 'resolved' ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : update.status === 'in_progress' ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <AlertTriangle className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {update.status.replace('_', ' ').toUpperCase()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(update.date).toLocaleString()}
                          </p>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{update.message}</p>
                        <p className="text-xs text-gray-500 mt-1">by {update.officer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </button>
                <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!complaint && !isLoading && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter a token ID to track your complaint status</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, BarChart3, Clock, Users, Shield } from 'lucide-react';

export const HomePage: React.FC = () => {
  const features = [
    {
      icon: FileText,
      title: 'Submit Complaint',
      description: 'File your complaint with multimodal inputs including text, images, and documents.',
      link: '/submit',
      color: 'bg-blue-600'
    },
    {
      icon: Search,
      title: 'Track Status',
      description: 'Monitor your complaint progress with real-time updates and notifications.',
      link: '/track',
      color: 'bg-green-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Personnel dashboard with insights, trends, and complaint management tools.',
      link: '/dashboard',
      color: 'bg-orange-600'
    }
  ];

  const stats = [
    { label: 'Complaints Resolved', value: '12,458', icon: Shield },
    { label: 'Average Resolution Time', value: '2.5 days', icon: Clock },
    { label: 'Active Personnel', value: '84', icon: Users },
    { label: 'Satisfaction Rate', value: '94.2%', icon: BarChart3 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Assisted Railway Complaint Management
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Streamlined complaint handling system powered by artificial intelligence to ensure quick resolution 
          and improved passenger satisfaction across the Indian Railway network.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/submit"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Submit New Complaint
          </Link>
          <Link
            to="/track"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            Track Existing Complaint
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className={`${feature.color} p-3 rounded-lg w-fit mb-4`}>
                <IconComponent className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link
                to={feature.link}
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
              >
                Learn More →
              </Link>
            </div>
          );
        })}
      </div>

      {/* Process Flow */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Submit', desc: 'File complaint with details' },
            { step: '2', title: 'Process', desc: 'AI categorizes and prioritizes' },
            { step: '3', title: 'Assign', desc: 'Routed to appropriate personnel' },
            { step: '4', title: 'Resolve', desc: 'Quick resolution and feedback' }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                {item.step}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
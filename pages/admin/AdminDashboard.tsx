import React, { useState } from 'react';
import AdminEvents from './AdminEvents';
import AdminGallery from './AdminGallery';
import AdminVideos from './AdminVideos';
import AdminProfile from './AdminProfile';

type AdminTab = 'events' | 'gallery' | 'videos' | 'profile';

interface AdminDashboardProps {
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('events');

  const tabs: { key: AdminTab; label: string; icon: string }[] = [
    { key: 'events', label: 'Events', icon: '📅' },
    { key: 'gallery', label: 'Gallery', icon: '🖼️' },
    { key: 'videos', label: 'Videos', icon: '🎥' },
    { key: 'profile', label: 'Profile', icon: '👤' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'events':
        return <AdminEvents />;
      case 'gallery':
        return <AdminGallery />;
      case 'videos':
        return <AdminVideos />;
      case 'profile':
        return <AdminProfile />;
      default:
        return <AdminEvents />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pastel-pink to-lavender bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm p-2 mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-pastel-pink to-lavender text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

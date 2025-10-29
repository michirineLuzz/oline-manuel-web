import React from 'react';

const AdminProfile: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Profile</h2>
      <p className="text-gray-600">Profile management coming soon. Use Supabase dashboard to edit for now.</p>
      <a 
        href="https://app.supabase.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block mt-4 px-6 py-3 bg-gradient-to-r from-pastel-pink to-lavender text-white rounded-lg hover:shadow-lg transition-all"
      >
        Open Supabase Dashboard
      </a>
    </div>
  );
};

export default AdminProfile;

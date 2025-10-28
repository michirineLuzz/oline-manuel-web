import React, { useState, useEffect } from 'react';
import { supabase, Video } from '../../lib/supabase';

const AdminVideos: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState({
    youtube_id: '',
    title: '',
    thumbnail_url: '',
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const extractYoutubeId = (url: string): string => {
    // Support multiple YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    // If it's already just an ID
    return url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const youtubeId = extractYoutubeId(formData.youtube_id);
      const thumbnailUrl = formData.thumbnail_url || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;

      const videoData = {
        youtube_id: youtubeId,
        title: formData.title,
        thumbnail_url: thumbnailUrl,
      };

      if (editingVideo) {
        const { error } = await supabase
          .from('videos')
          .update(videoData)
          .eq('id', editingVideo.id);

        if (error) throw error;
        alert('Video updated successfully!');
      } else {
        const { error } = await supabase
          .from('videos')
          .insert([videoData]);

        if (error) throw error;
        alert('Video added successfully!');
      }

      resetForm();
      fetchVideos();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    setFormData({
      youtube_id: video.youtube_id,
      title: video.title,
      thumbnail_url: video.thumbnail_url,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      const { error } = await supabase
        .from('videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Video deleted successfully!');
      fetchVideos();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      youtube_id: '',
      title: '',
      thumbnail_url: '',
    });
    setEditingVideo(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Videos</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-pastel-pink to-lavender text-white rounded-lg hover:shadow-lg transition-all"
        >
          {showForm ? 'Cancel' : '+ Add Video'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">
            {editingVideo ? 'Edit Video' : 'Add New Video'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                YouTube URL or Video ID *
              </label>
              <input
                type="text"
                value={formData.youtube_id}
                onChange={(e) => setFormData({ ...formData, youtube_id: e.target.value })}
                required
                placeholder="https://www.youtube.com/watch?v=... or just the video ID"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste full YouTube URL or just the video ID (e.g., dQw4w9WgXcQ)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custom Thumbnail URL (Optional)
              </label>
              <input
                type="url"
                value={formData.thumbnail_url}
                onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                placeholder="Leave empty to use YouTube default thumbnail"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pastel-pink to-lavender text-white rounded-lg hover:shadow-lg transition-all"
              >
                {editingVideo ? 'Update Video' : 'Add Video'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center py-8">No videos yet. Add your first video!</p>
        ) : (
          videos.map((video) => (
            <div
              key={video.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={video.thumbnail_url}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-800">{video.title}</p>
                <p className="text-xs text-gray-500 mt-1">ID: {video.youtube_id}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(video)}
                    className="flex-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="flex-1 px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminVideos;

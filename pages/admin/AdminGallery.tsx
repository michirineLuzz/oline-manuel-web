import React, { useState, useEffect } from 'react';
import { supabase, GalleryImage } from '../../lib/supabase';

const AdminGallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] = useState({
    url: '',
    thumbnail_url: '',
    caption: '',
    category: 'performance' as 'performance' | 'photoshoot' | 'RabOline',
    width: 800,
    height: 1000,
  });

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingImage) {
        const { error } = await supabase
          .from('gallery_images')
          .update(formData)
          .eq('id', editingImage.id);

        if (error) throw error;
        alert('Image updated successfully!');
      } else {
        const { error } = await supabase
          .from('gallery_images')
          .insert([formData]);

        if (error) throw error;
        alert('Image added successfully!');
      }

      resetForm();
      fetchImages();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setFormData({
      url: image.url,
      thumbnail_url: image.thumbnail_url,
      caption: image.caption,
      category: image.category,
      width: image.width || 800,
      height: image.height || 1000,
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;
      alert('Image deleted successfully!');
      fetchImages();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      url: '',
      thumbnail_url: '',
      caption: '',
      category: 'performance',
      width: 800,
      height: 1000,
    });
    setEditingImage(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Gallery</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gradient-to-r from-pastel-pink to-lavender text-white rounded-lg hover:shadow-lg transition-all"
        >
          {showForm ? 'Cancel' : '+ Add Image'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">
            {editingImage ? 'Edit Image' : 'Add New Image'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image URL (Twitter/X) *
              </label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value, thumbnail_url: e.target.value })}
                required
                placeholder="https://pbs.twimg.com/media/..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Copy image URL from Twitter/X (right-click image → Copy image address)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Caption *
                </label>
                <input
                  type="text"
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
                >
                  <option value="performance">Performance</option>
                  <option value="photoshoot">Photoshoot</option>
                  <option value="RabOline">#RabOline</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-lavender focus:ring-2 focus:ring-lavender/20 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-pastel-pink to-lavender text-white rounded-lg hover:shadow-lg transition-all"
              >
                {editingImage ? 'Update Image' : 'Add Image'}
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

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center py-8">No images yet. Add your first image!</p>
        ) : (
          images.map((image) => (
            <div
              key={image.id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={image.thumbnail_url}
                alt={image.caption}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <p className="text-sm font-semibold text-gray-800 truncate">{image.caption}</p>
                <p className="text-xs text-gray-500 mt-1">{image.category}</p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(image)}
                    className="flex-1 px-2 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="flex-1 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
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

export default AdminGallery;

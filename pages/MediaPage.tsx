
import React, { useState } from 'react';
import { useVideos } from '../hooks/useSupabaseData';
import CloseIcon from '../components/icons/CloseIcon';

const MediaPage: React.FC = () => {
  const { videos, loading } = useVideos();
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading videos...</div>
      </div>
    );
  }

  const openModal = (id: string) => {
    setSelectedVideoId(id);
  };
  
  const closeModal = () => {
    setSelectedVideoId(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pastel-blue/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-pastel-pink/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-dark mb-4">
              <span className="inline-block animate-typing-fast">Video <span className="bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent">Media</span></span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Watch music videos, live performances, and behind-the-scenes content.</p>
          </div>
          
          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {videos.map(video => (
              <div key={video.id} className="cursor-pointer group" onClick={() => openModal(video.youtube_id)}>
                <div className="relative overflow-hidden rounded-2xl shadow-xl bg-white/60 backdrop-blur-xl border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <img src={video.thumbnail_url} alt={video.title} className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-lavender ml-1" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                        </svg>
                      </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-semibold text-white">
                    Video
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold text-text-dark group-hover:text-lavender transition-colors duration-300">{video.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideoId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="relative w-full max-w-4xl bg-black rounded-lg shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                className="w-full h-full rounded-lg"
              />
            </div>
             <button
              onClick={closeModal}
              className="absolute -top-4 -right-4 md:-top-5 md:-right-5 bg-white rounded-full p-2 text-text-dark hover:bg-gray-200 transition"
              aria-label="Close video"
            >
                <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default MediaPage;

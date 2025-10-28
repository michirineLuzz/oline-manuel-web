
import React, { useState } from 'react';
import { useGalleryImages } from '../hooks/useSupabaseData';
import Lightbox from '../components/Lightbox';

type Category = 'all' | 'performance' | 'photoshoot' | 'RabOline';

const GalleryPage: React.FC = () => {
  const { images, loading } = useGalleryImages();
  const [filter, setFilter] = useState<Category>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number>(-1);

  const filteredImages = filter === 'all' ? images : images.filter(img => img.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading gallery...</div>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };
  
  const closeLightbox = () => {
    setLightboxIndex(-1);
  };

  const nextImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setLightboxIndex((prevIndex) => (prevIndex - 1 + filteredImages.length) % filteredImages.length);
  };
  
  const categories: { key: Category, name: string }[] = [
    { key: 'all', name: 'All' },
    { key: 'performance', name: 'Performance' },
    { key: 'photoshoot', name: 'Photoshoot' },
    { key: 'RabOline', name: '#RabOline' },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pastel-pink/5 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-20 left-0 w-96 h-96 bg-pastel-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
          {/* Page Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-dark mb-4">
              <span className="inline-block animate-typing-fast">Photo <span className="bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent">Gallery</span></span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">A collection of moments from performances, photoshoots, and more.</p>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 px-4">
            {categories.map(cat => (
               <button
                  key={cat.key}
                  onClick={() => setFilter(cat.key)}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    filter === cat.key 
                      ? 'bg-gradient-to-r from-pastel-pink to-lavender text-white shadow-lg' 
                      : 'bg-white/60 backdrop-blur-xl border border-white/20 text-gray-700 hover:shadow-md'
                  }`}
               >
                  {cat.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 lg:gap-6">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="mb-4 lg:mb-6 break-inside-avoid cursor-pointer group" onClick={() => openLightbox(index)}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white/60 backdrop-blur-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
                  <img
                    src={image.thumbnail_url}
                    alt={image.caption}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                     <p className="text-white text-center font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{image.caption}</p>
                  </div>
                  {/* Category Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {lightboxIndex !== -1 && (
        <Lightbox 
            images={filteredImages}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNext={nextImage}
            onPrev={prevImage}
        />
      )}
    </>
  );
};

export default GalleryPage;

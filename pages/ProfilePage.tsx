
import React from 'react';
import { useProfile, useGalleryImages } from '../hooks/useSupabaseData';

const ProfilePage: React.FC = () => {
    const { profile, loading: profileLoading } = useProfile();
    const { images, loading: imagesLoading } = useGalleryImages();
    const miniGallery = images.slice(0, 4);

    if (profileLoading || imagesLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-600">Loading profile...</div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-600">Profile not found.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pastel-pink/5 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-0 w-96 h-96 bg-pastel-blue/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
                {/* Page Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-dark mb-4">
                        <span className="inline-block animate-typing-fast">Profile <span className="bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent">{profile.stage_name}</span></span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">{profile.bio}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
                    {/* Left Column: Image and Mini Gallery */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Main Profile Image */}
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue rounded-2xl blur-lg opacity-25 group-hover:opacity-50 transition duration-500"></div>
                                <img src="https://i.pinimg.com/736x/02/50/98/0250985a818e585ab9d7da170d04087b.jpg" alt="Oline Manuel Profile" className="relative w-full h-auto rounded-2xl shadow-2xl object-cover aspect-[3/4]" />
                            </div>
                            
                            {/* Mini Gallery Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {miniGallery.map(img => (
                                    <div key={img.id} className="relative group overflow-hidden rounded-xl">
                                        <img src={img.thumbnail_url} alt={img.caption} className="w-full h-auto object-cover aspect-square transform group-hover:scale-110 transition-transform duration-500"/>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Profile Details */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Info Cards with Glass Effect */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:border-pastel-pink/30 transition-all duration-300">
                                <dt className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Stage Name</dt>
                                <dd className="text-base sm:text-lg font-bold text-text-dark">{profile.stage_name}</dd>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:border-pastel-pink/30 transition-all duration-300">
                                <dt className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Born</dt>
                                <dd className="text-base sm:text-lg font-bold text-text-dark">{profile.dob}</dd>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:border-pastel-blue/30 transition-all duration-300">
                                <dt className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Height</dt>
                                <dd className="text-base sm:text-lg font-bold text-text-dark">{profile.height}</dd>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:border-pastel-blue/30 transition-all duration-300">
                                <dt className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Hobbies</dt>
                                <dd className="text-base sm:text-lg font-bold text-text-dark">{profile.hobbies}</dd>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:border-pastel-blue/30 transition-all duration-300">
                                <dt className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Debut</dt>
                                <dd className="text-base sm:text-lg font-bold text-text-dark">{profile.debut}</dd>
                            </div>
                            <div className="bg-white/60 backdrop-blur-xl p-4 sm:p-6 rounded-2xl shadow-lg border border-white/20 hover:shadow-xl hover:border-pastel-pink/30 transition-all duration-300">
                                <dt className="text-xs sm:text-sm font-semibold text-gray-500 mb-2">Total Show</dt>
                                <dd className="text-base sm:text-lg font-bold text-text-dark">{profile.total_show}</dd>
                            </div>
                        </div>

                        {/* Fun Facts Section */}
                        <div className="bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/20">
                            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6 flex items-center gap-3">
                                <span className="text-pastel-pink">✨</span> Fun Facts
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profile.fun_facts.map((fact, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-pastel-pink/10 to-lavender/10 rounded-xl hover:shadow-md transition-shadow duration-300">
                                        <span className="text-lavender font-bold text-lg flex-shrink-0">•</span>
                                        <p className="text-gray-700">{fact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/20">
                            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6 flex items-center gap-3">
                                <span className="text-pastel-pink">#</span> Hashtags
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {profile.hashtags.map((fact, i) => (
                                    <div key={i} className="flex items-start gap-3 p-4 bg-gradient-to-r from-pastel-pink/10 to-lavender/10 rounded-xl hover:shadow-md transition-shadow duration-300">
                                        <span className="text-lavender font-bold text-lg flex-shrink-0">•</span>
                                        <p className="text-gray-700">{fact}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Career Timeline Section */}
                        <div className="bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/20">
                            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6 sm:mb-8 flex items-center gap-3">
                                <span className="text-pastel-blue">🎤</span> Career Timeline
                            </h2>
                            <div className="relative border-l-4 border-gradient-to-b from-pastel-pink via-lavender to-pastel-blue ml-4">
                                {profile.career_timeline.map((item, i) => (
                                    <div key={i} className="mb-10 ml-10 group">
                                        <span className="absolute -left-6 flex items-center justify-center w-12 h-12 bg-gradient-to-br from-pastel-pink to-lavender rounded-full ring-4 ring-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                                        </span>
                                        <time className="inline-block mb-2 px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-pastel-blue to-lavender rounded-full">{item.date}</time>
                                        <h3 className="text-lg font-semibold text-text-dark mb-1">{item.event}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Discography Section */}
                        <div className="bg-white/60 backdrop-blur-xl p-6 sm:p-8 rounded-3xl shadow-xl border border-white/20">
                            <h2 className="text-2xl sm:text-3xl font-bold font-heading mb-6 flex items-center gap-3">
                                <span className="text-lavender">🎵</span> Song Albums
                            </h2>
                            <div className="space-y-4">
                                {profile.singles.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-5 bg-gradient-to-r from-lavender/10 to-pastel-blue/10 rounded-xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-pastel-pink to-lavender rounded-lg flex items-center justify-center shadow-md">
                                            <span className="text-white font-bold text-lg">{item.year}</span>
                                        </div>
                                        <p className="text-gray-700 font-medium text-lg">{item.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;

import React from 'react';
import { Link } from 'react-router-dom';
import { useProfile, useEvents, useVideos } from '../hooks/useSupabaseData';

const HomePage: React.FC = () => {
  const { profile, loading: profileLoading } = useProfile();
  const { events, loading: eventsLoading } = useEvents();
  const { videos, loading: videosLoading } = useVideos();

  const loading = profileLoading || eventsLoading || videosLoading;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  const sortedEvents = events.slice().sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const nextEvent = sortedEvents.length > 0 ? sortedEvents[0] : null;
  const latestVideo = videos[0];

  return (
    <>
      {/* Hero Section - Modern Split Layout */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-pastel-pink/5">
        {/* Animated Background with Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large floating orbs - blurred */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-pastel-pink/30 to-lavender/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/4 right-10 w-80 h-80 bg-gradient-to-br from-lavender/25 to-pastel-blue/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pastel-blue/20 to-pastel-pink/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-gradient-to-br from-pastel-pink/20 to-pastel-blue/15 rounded-full blur-3xl animate-float-delayed"></div>
          
          {/* Medium decorative circles - outlined */}
          <div className="absolute top-20 right-1/4 w-32 h-32 border-4 border-lavender/10 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 border-4 border-pastel-pink/10 rounded-full animate-float-diagonal"></div>
          <div className="absolute top-1/3 left-20 w-40 h-40 border-4 border-pastel-blue/10 rounded-full animate-float"></div>
          <div className="absolute bottom-1/4 left-1/3 w-28 h-28 border-3 border-lavender/15 rounded-full animate-float-delayed"></div>
          <div className="absolute top-3/4 right-20 w-36 h-36 border-3 border-pastel-pink/10 rounded-full animate-float-slow"></div>
          
          {/* Small filled circles */}
          <div className="absolute top-40 left-1/3 w-6 h-6 bg-pastel-pink/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-40 right-1/4 w-8 h-8 bg-lavender/30 rounded-full animate-float-diagonal"></div>
          <div className="absolute top-2/3 right-1/3 w-4 h-4 bg-pastel-blue/30 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/4 left-1/4 w-5 h-5 bg-pastel-pink/25 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-1/3 right-1/2 w-7 h-7 bg-lavender/25 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-pastel-blue/30 rounded-full animate-float-diagonal"></div>
          
          {/* Tiny accent dots */}
          <div className="absolute top-16 right-40 w-2 h-2 bg-lavender/40 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-40 w-2 h-2 bg-pastel-pink/40 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-3/4 left-16 w-2 h-2 bg-pastel-blue/40 rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-1/2 right-16 w-2 h-2 bg-lavender/40 rounded-full animate-pulse-slow"></div>
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20">
            
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full shadow-lg">
                <span className="w-2 h-2 bg-pastel-pink rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-gray-700">JKT48 Generation 12</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight leading-[1.1]">
                <span className="block text-gray-900">Hello, I'm</span>
                <span className="block bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent animate-text-shimmer bg-[length:200%_auto]">
                  Oline Manuel
                </span>
              </h1>

              {/* Subtitle with icon */}
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-gray-600 leading-relaxed">
                Semangatku full terus! 💪
                <span className="block mt-2 font-semibold bg-gradient-to-r from-pastel-pink to-lavender bg-clip-text text-transparent">
                  Gas gas gas Oline!
                </span>
              </p>

              {/* Role Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                <span className="group px-6 py-3 bg-gradient-to-r from-lavender/10 to-pastel-blue/10 backdrop-blur-md rounded-2xl border border-lavender/20 hover:border-lavender/40 transition-all duration-300 hover:scale-105">
                  <span className="text-2xl group-hover:scale-110 inline-block transition-transform">✨</span>
                  <span className="ml-2 text-sm font-semibold text-gray-700">Idol</span>
                </span>
                <span className="group px-6 py-3 bg-gradient-to-r from-pastel-blue/10 to-pastel-pink/10 backdrop-blur-md rounded-2xl border border-pastel-blue/20 hover:border-pastel-blue/40 transition-all duration-300 hover:scale-105">
                  <span className="text-2xl group-hover:scale-110 inline-block transition-transform">💃🏻</span>
                  <span className="ml-2 text-sm font-semibold text-gray-700">Dancer</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  to="/profile"
                  className="group relative px-8 py-4 bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue text-white font-bold rounded-2xl shadow-2xl hover:shadow-pastel-pink/50 overflow-hidden transition-all duration-500 text-center"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Explore Profile
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-lavender via-pastel-blue to-pastel-pink opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </Link>
                <Link
                  to="/media"
                  className="group px-8 py-4 bg-white/80 backdrop-blur-md text-gray-700 font-bold rounded-2xl border-2 border-lavender/20 hover:border-lavender hover:bg-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Media
                </Link>
              </div>
            </div>

            {/* Right Side - Image with Creative Frame */}
            <div className="relative animate-fade-in flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Decorative Background Elements */}
                <div className="absolute -inset-8 bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue rounded-full opacity-20 blur-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
                
                {/* Main Image Container */}
                <div className="relative">
                  {/* Floating decorative circles around image */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-pastel-pink to-lavender rounded-full opacity-60 animate-float"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-lavender to-pastel-blue rounded-full opacity-60 animate-float-delayed"></div>
                  
                  {/* Image Frame */}
                  <div className="relative w-80 h-80 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
                    {/* Gradient border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue rounded-[2.5rem] opacity-75 blur-sm"></div>
                    
                    {/* Image */}
                    <img 
                      src="https://i.pinimg.com/736x/02/50/98/0250985a818e585ab9d7da170d04087b.jpg" 
                      alt="Oline Manuel" 
                      className="relative w-full h-full rounded-[2.5rem] object-cover border-8 border-white shadow-2xl"
                    />
                    
                    {/* Floating badge */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-pastel-pink/20 animate-float-slow">
                      <p className="text-sm font-bold text-gray-700">🌟 JKT48 Member</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-pastel-pink/5 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pastel-pink to-lavender bg-clip-text text-transparent mb-2">12th</div>
              <p className="text-sm text-gray-600 font-medium">Generation</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-lavender to-pastel-blue bg-clip-text text-transparent mb-2">JKT48</div>
              <p className="text-sm text-gray-600 font-medium">Member</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pastel-pink to-lavender bg-clip-text text-transparent mb-2">✨</div>
              <p className="text-sm text-gray-600 font-medium">Full Energy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Section with Interactive Cards */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-pastel-pink/5 relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-pastel-pink/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold font-heading text-text-dark mb-4">
              <span className="inline-block animate-typing-fast">Explore <span className="bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent">Oline World</span></span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Journey through performances, events, and exclusive content</p>
          </div>

          {/* Interactive Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Profile Card */}
            <div className="group relative bg-gradient-to-br from-white to-pastel-pink/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:border-pastel-pink/30 transition-all duration-500 hover:-translate-y-3">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-pink to-lavender rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <span className="text-3xl">👤</span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                About Oline
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Learn about her journey as JKT48 12th Generation member, achievements, and personality
              </p>
              
              {/* Button */}
              <Link
                to="/profile"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-pink to-lavender text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View Profile
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-pastel-pink/20 rounded-tr-lg group-hover:border-pastel-pink/50 transition-colors"></div>
            </div>

            {/* Events Card */}
            <div className="group relative bg-gradient-to-br from-white to-pastel-blue/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:border-pastel-blue/30 transition-all duration-500 hover:-translate-y-3">
              {/* Icon with notification badge */}
              <div className="relative w-16 h-16 bg-gradient-to-br from-pastel-blue to-lavender rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🎉</span>
                {nextEvent && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></div>
                )}
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                Upcoming Events
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Don't miss upcoming theater shows and special performances
              </p>
              
              {/* Button */}
              <Link
                to="/events"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pastel-blue to-lavender text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                View Schedule
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-pastel-blue/20 rounded-tr-lg group-hover:border-pastel-blue/50 transition-colors"></div>
            </div>

            {/* Media Card */}
            <div className="group relative bg-gradient-to-br from-white to-lavender/5 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:border-lavender/30 transition-all duration-500 hover:-translate-y-3">
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-lavender to-pastel-pink rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                <span className="text-3xl">🎬</span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">
                Media & Videos
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Watch performances, behind the scenes, and Singels
              </p>
              
              {/* Button */}
              <Link
                to="/media"
                className="group/btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lavender to-pastel-pink text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
              >
                Watch Now
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              {/* Decorative corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-lavender/20 rounded-tr-lg group-hover:border-lavender/50 transition-colors"></div>
            </div>

          </div>

          {/* Gallery Showcase - Full Width */}
          <div className="mt-16">
            <div className="group relative bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-3xl font-bold font-heading text-text-dark mb-3">
                    <span className="inline-block animate-typing-fast">Explore <span className="bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent">Photo Gallery</span></span>
                  </h3>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Browse through stunning collection of Oline Photos
                  </p>
                  <div className="mt-6"></div>
                  <Link
                    to="/gallery"
                    className="group/btn inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue text-white font-bold rounded-2xl hover:shadow-xl transition-all duration-300"
                  >
                    View Gallery
                    <svg className="w-8 h-8 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
                <div className="flex-shrink-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-pastel-pink/20 to-lavender/20 rounded-2xl animate-float"></div>
                    <div className="w-32 h-32 bg-gradient-to-br from-lavender/20 to-pastel-blue/20 rounded-2xl animate-float-delayed"></div>
                    <div className="w-32 h-32 bg-gradient-to-br from-pastel-blue/20 to-pastel-pink/20 rounded-2xl animate-float-delayed"></div>
                    <div className="w-32 h-32 bg-gradient-to-br from-pastel-pink/20 to-pastel-blue/20 rounded-2xl animate-float"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </>
  );
};

export default HomePage;

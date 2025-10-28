import React from 'react';
import { useEvents } from '../hooks/useSupabaseData';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  ticket_url?: string;
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const eventDate = new Date(event.date);
  const day = eventDate.toLocaleDateString('en-US', { day: '2-digit', timeZone: 'UTC' });
  const month = eventDate.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
  const year = eventDate.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });

  const typeColors = {
    'Concert': 'from-pastel-pink to-lavender',
    'Fanmeeting': 'from-lavender to-pastel-blue',
    'Showcase': 'from-pastel-blue to-pastel-pink',
    'TV Show': 'from-pastel-pink/80 to-lavender/80',
    'Video Call': 'from-blue-400 to-purple-500',
    'Two Shot': 'from-pink-400 to-rose-500',
    'Meet n Greet': 'from-purple-400 to-indigo-500'
  };

  const typeIcons = {
    'Concert': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
      </svg>
    ),
    'Fanmeeting': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
      </svg>
    ),
    'Showcase': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
      </svg>
    ),
    'TV Show': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
      </svg>
    ),
    'Video Call': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
      </svg>
    ),
    'Two Shot': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
    'Meet n Greet': (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
      </svg>
    )
  };

  return (
    <div className="group relative bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      <div className="relative flex flex-col sm:flex-row items-stretch">
        {/* Date Section */}
        <div className="flex-shrink-0 w-full sm:w-32 flex flex-row sm:flex-col items-center justify-center bg-gradient-to-br from-pastel-pink via-lavender to-pastel-blue text-white text-center p-6 sm:p-8">
          <div className="flex flex-col items-center">
            <span className="text-5xl font-bold font-heading drop-shadow-lg">{day}</span>
            <span className="text-lg font-semibold mt-1">{month.toUpperCase()}</span>
            <span className="text-sm opacity-90 mt-1">{year}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-8">
          <h3 className="text-2xl font-bold font-heading text-text-dark mb-3 group-hover:text-lavender transition-colors duration-300">{event.title}</h3>
          <div className="space-y-2 text-gray-600">
            <p className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-lavender" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {event.location}
            </p>
            <p className="text-sm">{event.description}</p>
          </div>
        </div>

        {/* Button Section */}
        <div className="flex-shrink-0 p-8 flex items-center justify-center sm:justify-start">
          {event.ticket_url ? (
            <a href={event.ticket_url} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-pastel-pink to-lavender text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Tickets
            </a>
          ) : (
            <span className="inline-block px-8 py-4 bg-gray-200 text-gray-500 font-bold rounded-full cursor-not-allowed">TBA</span>
          )}
        </div>
      </div>
    </div>
  );
};

const EventsPage: React.FC = () => {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading events...</div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pastel-pink/5 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-pastel-blue/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-lavender/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {/* Page Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-dark mb-4">
            <span className="inline-block animate-typing-fast">Events <span className="bg-gradient-to-r from-pastel-pink via-lavender to-pastel-blue bg-clip-text text-transparent">Schedule</span></span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Stay updated with Oline's upcoming performances, fan meetings, and other appearances.
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-8 max-w-6xl mx-auto">
          {events.length > 0 ? (
            events
                .slice()
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(event => (
                    <EventCard key={event.id} event={event} />
                ))
            ) : (
                <div className="text-center py-20">
                  <div className="inline-block p-8 bg-white/60 backdrop-blur-xl rounded-3xl shadow-xl border border-white/20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-xl text-gray-500 font-semibold">No shows. Please check back later!</p>
                  </div>
                </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
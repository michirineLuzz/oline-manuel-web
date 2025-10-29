export type Page = 'Home' | 'Profile' | 'Gallery' | 'Events' | 'Media' | 'AdminLogin' | 'AdminDashboard';

export interface GalleryImage {
  id: number;
  url: string;
  thumbnail_url: string;
  category: 'performance' | 'photoshoot' | 'RabOline';
  caption: string;
  width: number;
  height: number;
}

export interface Video {
    id: string;
    title: string;
    thumbnail: string;
}

export interface Event {
    id: number;
    type: 'Concert' | 'Fanmeeting' | 'Showcase' | 'TV Show' | 'Video Call' | 'Two Shot' | 'Meet n Greet';
    title: string;
    date: string;
    time: string;
    location: string;
    ticketLink?: string;
}
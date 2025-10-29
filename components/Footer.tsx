import React from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from './icons/InstagramIcon';
import TwitterIcon from './icons/TwitterIcon';

const Footer: React.FC = () => {
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/profile', label: 'Profile' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/media', label: 'Media' },
        { path: '/events', label: 'Events' },
    ];
    const socialLinks = [
        { icon: <InstagramIcon />, href: 'http://instagram.com/jkt48.oline', name: 'Instagram', isComponent: true },
        { icon: <TwitterIcon />, href: 'https://x.com/M_OlineJKT48', name: 'Twitter/X', isComponent: true },
        { icon: null, iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/IDN_App.svg/1024px-IDN_App.svg.png', href: 'https://www.idn.app/jkt48_oline', name: 'IDN', isComponent: false },
        { icon: null, iconUrl: 'https://www.vhv.rs/dpng/d/404-4049061_tiktok-social-media-icons-tiktok-logo-transparent-hd.png', href: 'https://www.tiktok.com/@jkt48.oline', name: 'TikTok', isComponent: false },
    ];

  return (
    <footer className="bg-gray-50 text-text-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="sm:col-span-2 md:col-span-1">
                 <Link to="/" className="text-2xl font-bold font-heading text-text-dark tracking-wider inline-block mb-4">
                    Oline Manuel
                </Link>
                <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} Made by Rizz With ❤️</p>
            </div>
            <div>
                <h3 className="font-semibold font-heading tracking-wide mb-4">Quick Links</h3>
                <ul className="space-y-2">
                    {navItems.map(item => (
                        <li key={item.path}>
                             <Link
                                to={item.path}
                                className="text-sm text-gray-600 hover:text-pastel-pink transition-colors duration-300"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
             <div>
                <h3 className="font-semibold font-heading tracking-wide mb-4">Follow Oline</h3>
                <div className="flex justify-center md:justify-start space-x-4">
                    {socialLinks.map(social => (
                        <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-pastel-pink transition-colors duration-300">
                            <span className="sr-only">{social.name}</span>
                            {social.isComponent ? (
                                social.icon
                            ) : (
                                <img 
                                    src={social.iconUrl} 
                                    alt={social.name}
                                    className="w-6 h-6 object-contain"
                                />
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
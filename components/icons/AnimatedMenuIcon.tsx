import React from 'react';

interface AnimatedMenuIconProps {
  isOpen: boolean;
}

const AnimatedMenuIcon: React.FC<AnimatedMenuIconProps> = ({ isOpen }) => {
  return (
    <div className="w-7 h-7 flex flex-col justify-center items-center relative">
      <div className="w-full flex flex-col items-center justify-center gap-1.5">
        {/* Top line */}
        <span
          className={`block h-0.5 w-6 bg-text-dark rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
          }`}
        />
        {/* Middle line */}
        <span
          className={`block h-0.5 w-6 bg-text-dark rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}
        />
        {/* Bottom line */}
        <span
          className={`block h-0.5 w-6 bg-text-dark rounded-full transition-all duration-300 ease-in-out ${
            isOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
          }`}
        />
      </div>
    </div>
  );
};

export default AnimatedMenuIcon;

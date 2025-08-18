import React from 'react';
import NeonButton from './NeonButton';

interface SplashScreenProps {
  onStartGame: () => void;
}

const ArrowIcon: React.FC = () => (
    <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
        <defs>
            <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#60a5fa', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path 
            d="M50,0 L100,40 L80,40 L80,100 L20,100 L20,40 L0,40 Z" 
            fill="url(#arrowGradient)" 
            stroke="#a78bfa" 
            strokeWidth="3"
        />
    </svg>
);


const SplashScreen: React.FC<SplashScreenProps> = ({ onStartGame }) => {
  return (
    <div className="flex flex-col items-center justify-around h-screen text-center p-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 -z-10"></div>
      
      <div className="relative z-10">
        <h1 className="font-display text-7xl md:text-9xl text-white animate-pulseGlow">
          Truth or Dare
        </h1>
        <p className="font-body text-purple-300 text-xl mt-2">The Ultimate Party Game</p>
      </div>

      <div className="relative z-10 animate-float">
        <ArrowIcon />
      </div>

      <div className="relative z-10">
        <NeonButton onClick={onStartGame}>Start Game</NeonButton>
      </div>
    </div>
  );
};

export default SplashScreen;
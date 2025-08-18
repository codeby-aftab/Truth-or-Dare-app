import React from 'react';
import NeonButton from './NeonButton';

interface SplashScreenProps {
  onStartGame: () => void;
}

const BottleIcon: React.FC = () => (
    <svg viewBox="0 0 100 300" className="w-24 h-72 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
        <defs>
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#3b82f6', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#60a5fa', stopOpacity: 1}} />
            </linearGradient>
            <radialGradient id="highlightGradient">
                <stop offset="0%" stopColor="white" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
            </radialGradient>
        </defs>
        {/* Bottle Body */}
        <path d="M30,300 C20,250 20,150 30,120 Q30,100 50,100 Q70,100 70,120 C80,150 80,250 70,300 Z" fill="url(#bottleGradient)" />
        {/* Bottle Neck */}
        <path d="M40,100 L40,30 Q40,10 50,10 L50,10 Q60,10 60,30 L60,100 Z" fill="url(#bottleGradient)" />
        {/* Cap */}
        <rect x="35" y="0" width="30" height="15" rx="5" fill="#a855f7" />
        {/* Highlight */}
        <ellipse cx="45" cy="180" rx="10" ry="80" fill="url(#highlightGradient)" opacity="0.6"/>
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
        <BottleIcon />
      </div>

      <div className="relative z-10">
        <NeonButton onClick={onStartGame}>Start Game</NeonButton>
      </div>
    </div>
  );
};

export default SplashScreen;

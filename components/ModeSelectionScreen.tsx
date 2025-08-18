
import React from 'react';
import { GameMode } from '../types';
import Card from './Card';

interface ModeSelectionScreenProps {
  onModeSelect: (mode: GameMode) => void;
}

interface ModeCardProps {
    icon: string;
    title: GameMode;
    description: string;
    onClick: () => void;
    colorClass: string;
}

const ModeCard: React.FC<ModeCardProps> = ({ icon, title, description, onClick, colorClass }) => (
    <button
      onClick={onClick}
      className={`
        bg-black/40 p-6 rounded-2xl text-center border-2 ${colorClass}
        transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl
        focus:outline-none focus:ring-4 focus:ring-opacity-50 ${colorClass.replace('border', 'ring')}
      `}
    >
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="font-display text-3xl text-white mb-2">{title}</h3>
        <p className="font-body text-gray-300">{description}</p>
    </button>
);


const ModeSelectionScreen: React.FC<ModeSelectionScreenProps> = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 font-body">
        <div className="text-center mb-10 animate-flipIn">
            <h2 className="font-display text-6xl text-white animate-pulseGlow">Choose Your Vibe</h2>
            <p className="text-purple-300 text-lg mt-2">Select a game mode to get started.</p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl animate-flipIn" style={{animationDelay: '0.2s'}}>
            <ModeCard
                icon="🥳"
                title={GameMode.Classic}
                description="The original fun! Perfect for any group of friends."
                onClick={() => onModeSelect(GameMode.Classic)}
                colorClass="border-blue-400"
            />
            <ModeCard
                icon="❤️‍🔥"
                title={GameMode.Couples}
                description="Spice things up with questions for you and your partner."
                onClick={() => onModeSelect(GameMode.Couples)}
                colorClass="border-pink-500"
            />
            <ModeCard
                icon="😈"
                title={GameMode.Extreme}
                description="For the wild ones! Dares that push the limits."
                onClick={() => onModeSelect(GameMode.Extreme)}
                colorClass="border-red-600"
            />
        </div>
    </div>
  );
};

export default ModeSelectionScreen;


import React from 'react';

interface NeonButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({ onClick, children, className = '', disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-4 font-display text-2xl tracking-widest text-white uppercase
        bg-pink-500/80 border-2 border-pink-400 rounded-lg shadow-[0_0_15px_rgba(236,72,153,0.8)]
        hover:bg-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,1)]
        transition-all duration-300 ease-in-out
        transform hover:scale-105
        disabled:bg-gray-600 disabled:border-gray-500 disabled:shadow-none disabled:cursor-not-allowed disabled:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default NeonButton;

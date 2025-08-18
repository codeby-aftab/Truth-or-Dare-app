
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-black/40 backdrop-blur-md p-6 rounded-2xl
      border border-purple-500/50 
      shadow-lg shadow-purple-900/50
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;


import React from 'react';
import { Player } from '../types';
import NeonButton from './NeonButton';
import Card from './Card';

interface EndGameScreenProps {
  players: Player[];
  onPlayAgain: () => void;
}

const EndGameScreen: React.FC<EndGameScreenProps> = ({ players, onPlayAgain }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 font-body">
      <Card className="w-full max-w-md text-center animate-flipIn">
        <div className="mb-6">
            <div className="text-6xl mb-2">👑</div>
            <h2 className="font-display text-5xl text-yellow-300 animate-pulseGlow">Game Over!</h2>
            {winner ? (
                <p className="font-body text-2xl text-white mt-2">
                    <span className="font-bold text-pink-400">{winner.name}</span> is the winner!
                </p>
            ) : (
                <p className="font-body text-xl text-white mt-2">It's a tie!</p>
            )}
        </div>

        <div className="space-y-3">
            <h3 className="font-display text-3xl text-white mb-3">Final Scores</h3>
            {sortedPlayers.map((player, index) => (
                <div
                    key={player.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-black/30"
                >
                    <div className="flex items-center gap-4">
                        <span className="text-xl w-6">{index === 0 ? '🏆' : `${index + 1}.`}</span>
                        <span className="text-3xl">{player.avatar}</span>
                        <span className="text-lg text-white">{player.name}</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-400">{player.score} pts</span>
                </div>
            ))}
        </div>
        
        <div className="mt-8">
            <NeonButton onClick={onPlayAgain}>Play Again</NeonButton>
        </div>
      </Card>
    </div>
  );
};

export default EndGameScreen;
import React, { useState } from 'react';
import { Player } from '../types';
import { AVATAR_EMOJIS, MIN_PLAYERS, MAX_PLAYERS, DEFAULT_ROUNDS_PER_PLAYER, MIN_ROUNDS, MAX_ROUNDS } from '../constants';
import Card from './Card';
import NeonButton from './NeonButton';

interface PlayerSetupScreenProps {
  onGameStart: (players: Player[], rounds: number) => void;
}

const PlayerSetupScreen: React.FC<PlayerSetupScreenProps> = ({ onGameStart }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');
  const [rounds, setRounds] = useState(DEFAULT_ROUNDS_PER_PLAYER);

  const addPlayer = () => {
    if (playerName.trim() && players.length < MAX_PLAYERS) {
      const newPlayer: Player = {
        id: Date.now(),
        name: playerName.trim(),
        avatar: AVATAR_EMOJIS[Math.floor(Math.random() * AVATAR_EMOJIS.length)],
        score: 0,
      };
      setPlayers([...players, newPlayer]);
      setPlayerName('');
    }
  };

  const removePlayer = (id: number) => {
    setPlayers(players.filter(p => p.id !== id));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addPlayer();
    }
  }

  const handleRoundsChange = (delta: number) => {
    setRounds(prev => {
        const newRounds = prev + delta;
        if (newRounds >= MIN_ROUNDS && newRounds <= MAX_ROUNDS) {
            return newRounds;
        }
        return prev;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 font-body">
      <Card className="w-full max-w-md animate-flipIn">
        <h2 className="font-display text-5xl text-center text-white mb-6 animate-pulseGlow">Add Players</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter player name"
            className="flex-grow bg-gray-900/50 border-2 border-purple-500 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            maxLength={15}
          />
          <button
            onClick={addPlayer}
            disabled={!playerName.trim() || players.length >= MAX_PLAYERS}
            className="bg-purple-600 text-white font-bold text-2xl px-4 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>

        <div className="space-y-2 h-52 overflow-y-auto pr-2 mb-4">
          {players.map(player => (
            <div key={player.id} className="flex items-center justify-between bg-black/30 p-2 rounded-lg">
              <div className="flex items-center gap-4">
                <span className="text-3xl">{player.avatar}</span>
                <span className="text-white text-lg">{player.name}</span>
              </div>
              <button onClick={() => removePlayer(player.id)} className="text-red-500 hover:text-red-400 text-xl font-bold">
                ✕
              </button>
            </div>
          ))}
        </div>
        
        <div className="mt-4 text-center">
            <div className="mb-4">
                <label className="font-display text-2xl text-white mb-2 block">Rounds per Player</label>
                <div className="flex items-center justify-center gap-4">
                    <button 
                        onClick={() => handleRoundsChange(-1)} 
                        disabled={rounds <= MIN_ROUNDS}
                        className="w-10 h-10 bg-purple-600 text-white font-bold text-2xl rounded-full hover:bg-purple-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
                        aria-label="Decrease rounds"
                    >
                        -
                    </button>
                    <span className="font-display text-4xl text-pink-400 w-12 text-center">{rounds}</span>
                    <button 
                        onClick={() => handleRoundsChange(1)} 
                        disabled={rounds >= MAX_ROUNDS}
                        className="w-10 h-10 bg-purple-600 text-white font-bold text-2xl rounded-full hover:bg-purple-700 transition disabled:bg-gray-700 disabled:cursor-not-allowed"
                        aria-label="Increase rounds"
                    >
                        +
                    </button>
                </div>
            </div>
            <p className="text-sm text-purple-300 mb-4">{players.length} / {MAX_PLAYERS} players</p>
            <NeonButton onClick={() => onGameStart(players, rounds)} disabled={players.length < MIN_PLAYERS}>
                Let's Go!
            </NeonButton>
            {players.length < MIN_PLAYERS && (
                <p className="text-pink-400 mt-2 text-sm">You need at least {MIN_PLAYERS} players to start.</p>
            )}
        </div>
      </Card>
    </div>
  );
};

export default PlayerSetupScreen;
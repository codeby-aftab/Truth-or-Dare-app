import React, { useState, useEffect, useCallback } from 'react';
import { Player, GameMode } from '../types';
import { getTruthOrDare } from '../services/geminiService';
import Card from './Card';

interface GameScreenProps {
  players: Player[];
  mode: GameMode;
  onGameEnd: (finalPlayers: Player[]) => void;
  updatePlayers: (updatedPlayers: Player[]) => void;
  rounds: number;
}

const BottleSVG: React.FC = () => (
    <svg viewBox="0 0 100 300" className="w-24 h-72 drop-shadow-[0_0_20px_rgba(236,72,153,0.8)]">
        <defs>
            <linearGradient id="bottleFill" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#f9a8d4', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M30,300 C20,250 20,150 30,120 Q30,100 50,100 Q70,100 70,120 C80,150 80,250 70,300 Z" fill="url(#bottleFill)" />
        <path d="M40,100 L40,30 Q40,10 50,10 L50,10 Q60,10 60,30 L60,100 Z" fill="url(#bottleFill)" />
        <rect x="35" y="0" width="30" height="15" rx="5" fill="#a855f7" />
        <path d="M50,290 L85,250 L50,265 L15,250 Z" fill="#fef08a"/>
    </svg>
);

const PlayerCircle: React.FC<{ players: Player[], currentPlayerIndex: number | null }> = ({ players, currentPlayerIndex }) => {
    const radius = 160; // in pixels
    const angleStep = (2 * Math.PI) / players.length;

    return (
        <div className="absolute inset-0 flex items-center justify-center">
        {players.map((player, index) => {
            const angle = angleStep * index - Math.PI / 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            const isCurrent = index === currentPlayerIndex;

            return (
                <div 
                    key={player.id} 
                    className="absolute flex flex-col items-center transition-all duration-500"
                    style={{ transform: `translate(${x}px, ${y}px) ${isCurrent ? 'scale(1.2)' : 'scale(1)'}` }}
                >
                    <div className={`
                        w-16 h-16 rounded-full bg-black/50 flex items-center justify-center text-4xl
                        border-4 ${isCurrent ? 'border-pink-500 animate-pulse' : 'border-purple-500'}
                    `}>
                        {player.avatar}
                    </div>
                    <p className={`mt-2 font-body font-bold text-white text-sm truncate w-20 text-center ${isCurrent ? 'text-pink-400' : ''}`}>{player.name}</p>
                    <p className={`text-xs font-bold ${isCurrent ? 'text-yellow-300' : 'text-gray-300'}`}>{player.score} pts</p>
                </div>
            );
        })}
        </div>
    );
};

const GameScreen: React.FC<GameScreenProps> = ({ players, mode, onGameEnd, updatePlayers, rounds }) => {
    const [turn, setTurn] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number | null>(null);
    const [gameState, setGameState] = useState<'IDLE' | 'SPINNING' | 'CHOOSING' | 'REVEALING'>('IDLE');
    const [challenge, setChallenge] = useState({ type: '', text: '' });
    const [isLoadingChallenge, setIsLoadingChallenge] = useState(false);

    const maxTurns = players.length * rounds;

    useEffect(() => {
        if (turn >= maxTurns) {
            onGameEnd(players);
        }
    }, [turn, maxTurns, onGameEnd, players]);
    
    const handleSpin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setGameState('SPINNING');

        const spinCycles = Math.floor(Math.random() * 3) + 3; // 3 to 5 full spins
        const targetIndex = Math.floor(Math.random() * players.length);
        const anglePerPlayer = 360 / players.length;
        const targetRotation = spinCycles * 360 + (targetIndex * anglePerPlayer) + (anglePerPlayer / 2);

        setRotation(current => current + targetRotation);
        
        setTimeout(() => {
            setIsSpinning(false);
            setCurrentPlayerIndex(targetIndex);
            setGameState('CHOOSING');
        }, 4000); // Corresponds to transition duration
    };

    const fetchChallenge = useCallback(async (type: 'truth' | 'dare') => {
        if (currentPlayerIndex === null) return;
        setIsLoadingChallenge(true);
        setGameState('REVEALING');
        const currentPlayer = players[currentPlayerIndex];
        const text = await getTruthOrDare(mode, type, currentPlayer.name);
        setChallenge({ type, text });
        setIsLoadingChallenge(false);
    }, [currentPlayerIndex, players, mode]);

    const handleChallengeResult = (completed: boolean) => {
        if (completed && currentPlayerIndex !== null) {
            const updatedPlayers = [...players];
            updatedPlayers[currentPlayerIndex].score += 1;
            updatePlayers(updatedPlayers);
        }
        resetTurn();
    };

    const resetTurn = () => {
        setCurrentPlayerIndex(null);
        setChallenge({ type: '', text: '' });
        setTurn(current => current + 1);
        setGameState('IDLE');
    };

    const renderGameState = () => {
        if (gameState === 'REVEALING') {
            return (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-lg text-center animate-flipIn">
                        {isLoadingChallenge ? (
                             <>
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto"></div>
                                <p className="font-display text-3xl text-white mt-4">AI is thinking...</p>
                            </>
                        ) : (
                           <>
                                <h2 className={`font-display text-5xl mb-4 ${challenge.type === 'truth' ? 'text-blue-400' : 'text-red-500'}`}>{challenge.type}</h2>
                                <p className="font-body text-2xl text-white min-h-[100px]">{challenge.text}</p>
                                <div className="flex justify-center gap-4 mt-8">
                                    <button onClick={() => handleChallengeResult(true)} className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition">✅ Completed</button>
                                    <button onClick={() => handleChallengeResult(false)} className="px-6 py-3 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-red-700 transition">❌ Skip</button>
                                </div>
                            </>
                        )}
                    </Card>
                </div>
            )
        }
        
        const currentPlayer = currentPlayerIndex !== null ? players[currentPlayerIndex] : null;
        return (
            <div className="flex flex-col items-center justify-center text-center">
                <div className="mb-20 h-10">
                    {gameState === 'IDLE' && <h2 className="font-display text-4xl text-white">Click the bottle to spin!</h2>}
                    {gameState === 'SPINNING' && <h2 className="font-display text-4xl text-white animate-pulse">Spinning...</h2>}
                    {gameState === 'CHOOSING' && currentPlayer && <h2 className="font-display text-4xl text-pink-400">{currentPlayer.name}, your turn!</h2>}
                </div>
                <div className="relative w-96 h-96 flex items-center justify-center mb-8">
                    <PlayerCircle players={players} currentPlayerIndex={currentPlayerIndex} />
                    <div 
                        className="cursor-pointer transition-transform duration-[4000ms] ease-out" 
                        style={{ transform: `rotate(${rotation}deg)` }}
                        onClick={handleSpin}
                        role="button"
                        aria-label="Spin the bottle"
                    >
                        <BottleSVG />
                    </div>
                </div>

                {gameState === 'CHOOSING' && (
                     <div className="flex gap-6 animate-flipIn h-20">
                        <button onClick={() => fetchChallenge('truth')} className="px-10 py-4 font-display text-3xl bg-blue-500 text-white rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.8)] hover:scale-105 transition">Truth</button>
                        <button onClick={() => fetchChallenge('dare')} className="px-10 py-4 font-display text-3xl bg-red-600 text-white rounded-lg shadow-[0_0_20px_rgba(220,38,38,0.8)] hover:scale-105 transition">Dare</button>
                    </div>
                )}
            </div>
        )
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 font-body">
            <div className="absolute top-4 left-4 text-white font-bold text-lg bg-black/30 px-3 py-1 rounded-lg">
                Turn: {turn >= maxTurns ? maxTurns : turn + 1} / {maxTurns}
            </div>
            {renderGameState()}
        </div>
    );
};

export default GameScreen;
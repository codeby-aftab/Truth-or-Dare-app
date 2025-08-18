import React, { useState } from 'react';
import { Screen, GameMode, Player } from './types';
import { DEFAULT_ROUNDS_PER_PLAYER } from './constants';

import SplashScreen from './components/SplashScreen';
import PlayerSetupScreen from './components/PlayerSetupScreen';
import ModeSelectionScreen from './components/ModeSelectionScreen';
import GameScreen from './components/GameScreen';
import EndGameScreen from './components/EndGameScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Splash);
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Classic);
  const [rounds, setRounds] = useState<number>(DEFAULT_ROUNDS_PER_PLAYER);

  const handleStartGame = () => {
    setCurrentScreen(Screen.PlayerSetup);
  };

  const handlePlayersSet = (newPlayers: Player[], newRounds: number) => {
    setPlayers(newPlayers.map(p => ({ ...p, score: 0 })));
    setRounds(newRounds);
    setCurrentScreen(Screen.ModeSelection);
  };
  
  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setCurrentScreen(Screen.Game);
  };
  
  const handleGameEnd = (finalPlayers: Player[]) => {
      setPlayers(finalPlayers);
      setCurrentScreen(Screen.End);
  };

  const updatePlayers = (updatedPlayers: Player[]) => {
    setPlayers(updatedPlayers);
  };

  const handlePlayAgain = () => {
    setPlayers([]);
    setCurrentScreen(Screen.Splash);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.Splash:
        return <SplashScreen onStartGame={handleStartGame} />;
      case Screen.PlayerSetup:
        return <PlayerSetupScreen onGameStart={handlePlayersSet} />;
      case Screen.ModeSelection:
        return <ModeSelectionScreen onModeSelect={handleModeSelect} />;
      case Screen.Game:
        return <GameScreen players={players} mode={gameMode} onGameEnd={handleGameEnd} updatePlayers={updatePlayers} rounds={rounds} />;
      case Screen.End:
        return <EndGameScreen players={players} onPlayAgain={handlePlayAgain} />;
      default:
        return <SplashScreen onStartGame={handleStartGame} />;
    }
  };

  return <div className="w-screen h-screen overflow-hidden">{renderScreen()}</div>;
};

export default App;
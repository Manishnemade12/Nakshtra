import { useState, useEffect } from 'react';

interface GameData {
  highScore: number;
  bestTime?: string;
  level?: number;
  gamesPlayed: number;
}

interface GameSettings {
  soundEnabled: boolean;
}

export const useGameStorage = (gameId: string) => {
  const [gameData, setGameData] = useState<GameData>({
    highScore: 0,
    gamesPlayed: 0
  });
  
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true
  });

  // Load data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(`brainwave_${gameId}`);
    const savedSettings = localStorage.getItem('brainwave_settings');
    
    if (savedData) {
      setGameData(JSON.parse(savedData));
    }
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, [gameId]);

  // Save game data
  const saveScore = (score: number, time?: string, level?: number) => {
    const newData: GameData = {
      ...gameData,
      gamesPlayed: gameData.gamesPlayed + 1
    };

    if (score > gameData.highScore) {
      newData.highScore = score;
    }

    if (time && (!gameData.bestTime || time < gameData.bestTime)) {
      newData.bestTime = time;
    }

    if (level && (!gameData.level || level > gameData.level)) {
      newData.level = level;
    }

    setGameData(newData);
    localStorage.setItem(`brainwave_${gameId}`, JSON.stringify(newData));
  };

  // Save settings
  const toggleSound = () => {
    const newSettings = { ...settings, soundEnabled: !settings.soundEnabled };
    setSettings(newSettings);
    localStorage.setItem('brainwave_settings', JSON.stringify(newSettings));
  };

  return {
    gameData,
    settings,
    saveScore,
    toggleSound
  };
};
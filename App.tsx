import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import GameLevel from './components/GameLevel';
import LevelSelect from './components/LevelSelect';
import { LEVELS } from './constants';

const PROGRESS_KEY = 'liquid_puzzle_v2_progress';
const MAX_LEVEL_KEY = 'liquid_puzzle_v2_max_level';
const AUDIO_SETTINGS_KEY = 'liquid_puzzle_v2_audio';

const App: React.FC = () => {
  const [view, setView] = useState<'menu' | 'game' | 'levelSelect'>('menu');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [maxReachedLevelIndex, setMaxReachedLevelIndex] = useState(0);
  
  // Audio settings
  const [audioSettings, setAudioSettings] = useState({
    music: true,
    sfx: true
  });

  // Load progress and audio settings on mount
  useEffect(() => {
    const savedCurrent = localStorage.getItem(PROGRESS_KEY);
    const savedMax = localStorage.getItem(MAX_LEVEL_KEY);
    const savedAudio = localStorage.getItem(AUDIO_SETTINGS_KEY);
    
    if (savedMax) {
      const maxIdx = parseInt(savedMax, 10);
      setMaxReachedLevelIndex(isNaN(maxIdx) ? 0 : maxIdx);
    }

    if (savedCurrent) {
      const currentIdx = parseInt(savedCurrent, 10);
      if (!isNaN(currentIdx) && currentIdx < LEVELS.length) {
        setCurrentLevelIndex(currentIdx);
      }
    }

    if (savedAudio) {
      try {
        setAudioSettings(JSON.parse(savedAudio));
      } catch (e) {
        console.error("Failed to parse audio settings");
      }
    }
  }, []);

  const toggleMusic = () => {
    setAudioSettings(prev => {
      const newState = { ...prev, music: !prev.music };
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const toggleSfx = () => {
    setAudioSettings(prev => {
      const newState = { ...prev, sfx: !prev.sfx };
      localStorage.setItem(AUDIO_SETTINGS_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const saveProgress = (currentIdx: number, maxIdx: number) => {
    localStorage.setItem(PROGRESS_KEY, currentIdx.toString());
    const newMax = Math.max(maxReachedLevelIndex, maxIdx);
    setMaxReachedLevelIndex(newMax);
    localStorage.setItem(MAX_LEVEL_KEY, newMax.toString());
  };

  const handleStartNewGame = () => {
    const hasProgress = localStorage.getItem(PROGRESS_KEY) !== null;
    if (hasProgress && !window.confirm("Вы уверены, что хотите начать заново? Весь текущий прогресс будет сброшен.")) {
      return;
    }
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(MAX_LEVEL_KEY);
    setCurrentLevelIndex(0);
    setMaxReachedLevelIndex(0);
    setView('game');
    saveProgress(0, 0);
  };

  const handleContinue = () => setView('game');
  const handleOpenLevelSelect = () => setView('levelSelect');

  const handleSelectLevel = (index: number) => {
    setCurrentLevelIndex(index);
    saveProgress(index, index);
    setView('game');
  };

  const handleLevelComplete = () => {
    const nextIndex = currentLevelIndex + 1;
    if (nextIndex < LEVELS.length) {
      setCurrentLevelIndex(nextIndex);
      saveProgress(nextIndex, nextIndex);
    } else {
      alert("Поздравляем! Вы прошли все доступные уровни!");
      saveProgress(currentLevelIndex, currentLevelIndex);
      setView('menu');
    }
  };

  const handleExitToMenu = () => {
    saveProgress(currentLevelIndex, maxReachedLevelIndex);
    setView('menu');
  };

  return (
    <>
      {view === 'menu' && (
        <MainMenu 
          onStart={handleStartNewGame}
          canContinue={localStorage.getItem(PROGRESS_KEY) !== null}
          onContinue={handleContinue}
          onOpenLevelSelect={handleOpenLevelSelect}
          currentLevelId={LEVELS[currentLevelIndex].id}
          audioSettings={audioSettings}
          toggleMusic={toggleMusic}
          toggleSfx={toggleSfx}
        />
      )}

      {view === 'levelSelect' && (
        <LevelSelect 
          levels={LEVELS}
          maxReachedIndex={maxReachedLevelIndex}
          onSelect={handleSelectLevel}
          onBack={() => setView('menu')}
        />
      )}

      {view === 'game' && (
        <GameLevel 
          level={LEVELS[currentLevelIndex]}
          onLevelComplete={handleLevelComplete}
          onExit={handleExitToMenu}
          audioSettings={audioSettings}
          toggleMusic={toggleMusic}
          toggleSfx={toggleSfx}
        />
      )}
    </>
  );
};

export default App;
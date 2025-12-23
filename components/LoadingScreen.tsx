import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  duration?: number;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  duration = 1000,
  onComplete
}) => {
  const [phase, setPhase] = useState<'visible' | 'hiding' | 'hidden'>('visible');

  useEffect(() => {
    // Начинаем fade-out после duration
    const hideTimer = setTimeout(() => {
      setPhase('hiding');
    }, duration);

    // Вызываем onComplete и полностью скрываем после анимации
    const completeTimer = setTimeout(() => {
      onComplete();
      setPhase('hidden');
    }, duration + 400);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  // Полностью скрытый - используем display: none чтобы не влиять на layout
  if (phase === 'hidden') {
    return <div className="loading-screen loading-screen--hidden" />;
  }

  return (
    <div className={`loading-screen ${phase === 'hiding' ? 'loading-screen--hiding' : ''}`}>
      <div className="loading-content">
        {/* Animated liquid drops */}
        <div className="loading-drops">
          <div className="loading-drop loading-drop--1"></div>
          <div className="loading-drop loading-drop--2"></div>
          <div className="loading-drop loading-drop--3"></div>
        </div>

        {/* Title */}
        <h1 className="loading-title">
          <span className="loading-title-word">Занимательные</span>
          <span className="loading-title-word loading-title-word--accent">Жидкости</span>
        </h1>

        {/* Loading bar */}
        <div className="loading-bar">
          <div className="loading-bar-fill"></div>
        </div>
      </div>

      {/* Decorative bubbles */}
      <div className="loading-bubble loading-bubble--1"></div>
      <div className="loading-bubble loading-bubble--2"></div>
      <div className="loading-bubble loading-bubble--3"></div>
      <div className="loading-bubble loading-bubble--4"></div>
      <div className="loading-bubble loading-bubble--5"></div>
    </div>
  );
};

export default LoadingScreen;

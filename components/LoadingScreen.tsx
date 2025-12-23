import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  duration?: number;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  duration = 1000,
  onComplete
}) => {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsHiding(true);
    }, duration);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration + 400); // Wait for fade out animation

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className={`loading-screen ${isHiding ? 'loading-screen--hiding' : ''}`}>
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

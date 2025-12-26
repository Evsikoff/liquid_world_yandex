import React from 'react';
import { ContainerDef } from '../types';
import { Droplets, Trash2 } from 'lucide-react';

interface ContainerProps {
  def: ContainerDef;
  currentAmount: number;
  isSelected: boolean;
  isSource: boolean;
  activeTool: 'TAP' | 'SINK' | 'NONE';
  onClick: () => void;
  isMobile?: boolean;
  scale?: number;
}

const Container: React.FC<ContainerProps> = ({
  def,
  currentAmount,
  isSelected,
  isSource,
  activeTool,
  onClick,
  isMobile = false,
  scale = 1
}) => {
  const percentage = Math.min(100, Math.max(0, (currentAmount / def.capacity) * 100));

  // Calculate size based on capacity and external scale
  const capacityFactor = Math.min(0.7 + (def.capacity / 1500), 1.5);
  const baseWidth = isMobile ? 70 : 140;
  const baseHeight = isMobile ? 110 : 220;
  const width = Math.round(baseWidth * capacityFactor * scale);
  const height = Math.round(baseHeight * capacityFactor * scale);

  const canBeFilled = activeTool === 'TAP' && currentAmount < def.capacity;
  const canBeEmptied = activeTool === 'SINK' && currentAmount > 0;

  // Scale icon sizes
  const iconSize = Math.round((isMobile ? 20 : 32) * Math.min(scale, 1.2));
  const smallIconSize = Math.round((isMobile ? 18 : 24) * Math.min(scale, 1.2));

  return (
    <div
      className="game-container-wrapper"
      onClick={onClick}
      style={{
        '--container-width': `${width}px`,
        '--container-height': `${height}px`
      } as React.CSSProperties}
    >
      {/* Volume Label */}
      <div className={`game-container-label ${isMobile ? 'mobile' : ''}`}>
        <span className="current">{currentAmount}</span> / {def.capacity} мл
      </div>

      {/* Container with vessel */}
      <div className={`game-container-vessel-wrapper ${isSelected ? 'selected' : ''}`}>
        {/* Tool Interaction Indicators */}
        {canBeFilled && (
          <div className={`game-container-indicator fill ${isMobile ? 'mobile' : ''}`}>
            <Droplets size={iconSize} className="animate-bounce" />
            <span>{isMobile ? 'НАЛИТЬ' : 'НАПОЛНИТЬ'}</span>
          </div>
        )}
        {canBeEmptied && (
          <div className={`game-container-indicator empty ${isMobile ? 'mobile' : ''}`}>
            <Trash2 size={iconSize} className="animate-bounce" />
            <span>СЛИТЬ</span>
          </div>
        )}

        {/* Selection Indicator for Transfer */}
        {isSelected && !canBeFilled && !canBeEmptied && (
          <div className={`game-container-indicator transfer ${isMobile ? 'mobile' : ''}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={smallIconSize}
              height={smallIconSize}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-bounce"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        )}

        {/* The Vessel */}
        <div
          className={`game-container-vessel ${isSelected ? 'selected' : ''} ${canBeFilled ? 'can-fill' : ''} ${canBeEmptied ? 'can-empty' : ''}`}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {def.spriteUrl ? (
            <div className="vessel-sprite">
              <img src={def.spriteUrl} alt={def.name} />
              <div className="vessel-liquid sprite" style={{ height: `${percentage * 0.9}%` }}></div>
            </div>
          ) : (
            <div className={`vessel-default ${isSelected ? 'selected' : ''}`}>
              <div className="vessel-liquid default" style={{ height: `${percentage}%` }}>
                <div className="liquid-surface"></div>
              </div>
              <div className="vessel-highlight"></div>
            </div>
          )}
        </div>

        {/* Container Name */}
        <div className={`game-container-name ${isSelected ? 'selected' : ''} ${isMobile ? 'mobile' : ''}`}>
          {def.name}
        </div>
      </div>

      {/* Transfer mode hint */}
      <div className={`game-container-hint ${isMobile ? 'mobile' : ''}`}>
        {isSelected && activeTool === 'NONE' && (
          <span className="hint-text">
            {isSource ? "ВЫБРАНО" : "КУДА?"}
          </span>
        )}
      </div>
    </div>
  );
};

export default Container;

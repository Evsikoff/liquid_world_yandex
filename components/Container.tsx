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
}

const Container: React.FC<ContainerProps> = ({ def, currentAmount, isSelected, isSource, activeTool, onClick }) => {
  const percentage = Math.min(100, Math.max(0, (currentAmount / def.capacity) * 100));

  const scaleFactor = 0.7 + (def.capacity / 1500); 
  const width = Math.round(140 * scaleFactor);
  const height = Math.round(220 * scaleFactor);

  const canBeFilled = activeTool === 'TAP' && currentAmount < def.capacity;
  const canBeEmptied = activeTool === 'SINK' && currentAmount > 0;

  return (
    <div className="flex flex-col items-center mx-4 group cursor-pointer" onClick={onClick}>
      {/* Moving Content Wrapper: Includes everything that should jump up */}
      <div 
        className={`relative transition-all duration-300 flex flex-col items-center z-20
          ${isSelected ? '-translate-y-12 scale-105' : 'group-hover:-translate-y-2'}
        `}
      >
        {/* Volume Labels */}
        <div className="mb-4 text-sm font-bold text-slate-700 bg-white/95 border-2 border-slate-100 px-3 py-1 rounded-full shadow-lg z-30 whitespace-nowrap">
          <span className="text-blue-600">{currentAmount}</span> / {def.capacity} мл
        </div>

        {/* The Vessel */}
        <div 
          className={`relative transition-all duration-300 
            ${canBeFilled ? 'ring-4 ring-blue-400 ring-offset-4 rounded-xl animate-pulse' : ''}
            ${canBeEmptied ? 'ring-4 ring-red-400 ring-offset-4 rounded-xl animate-pulse' : ''}
          `}
          style={{ width: `${width}px`, height: `${height}px` }}
        >
          {/* Tool Interaction Indicators */}
          {canBeFilled && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-blue-500 z-40 flex flex-col items-center">
              <Droplets size={32} className="animate-bounce" />
              <span className="text-[10px] font-black whitespace-nowrap bg-blue-500 text-white px-2 py-0.5 rounded shadow-sm">НАПОЛНИТЬ</span>
            </div>
          )}
          {canBeEmptied && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-red-500 z-40 flex flex-col items-center">
              <Trash2 size={32} className="animate-bounce" />
              <span className="text-[10px] font-black whitespace-nowrap bg-red-500 text-white px-2 py-0.5 rounded shadow-sm">СЛИТЬ</span>
            </div>
          )}

          {/* Selection Indicator for Transfer */}
          {isSelected && !canBeFilled && !canBeEmptied && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-500 drop-shadow-md"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          )}

          {/* Sprite / Visual Representation */}
          {def.spriteUrl ? (
            <div className="relative w-full h-full">
              <img 
                src={def.spriteUrl} 
                alt={def.name} 
                className="w-full h-full object-contain z-10 relative pointer-events-none opacity-80 mix-blend-multiply" 
              />
              <div 
                className="absolute bottom-0 left-[10%] right-[10%] bg-blue-500/80 transition-all duration-700 ease-in-out z-0 rounded-b-xl"
                style={{ height: `${percentage * 0.9}%`, bottom: '5%' }}
              ></div>
            </div>
          ) : (
            <div className={`relative w-full h-full border-4 border-t-0 rounded-b-3xl overflow-hidden bg-slate-100/20 backdrop-blur-sm shadow-xl
                            ${isSelected ? 'border-yellow-400 shadow-yellow-200' : 'border-slate-400'}`}>
              <div 
                className="absolute bottom-0 left-0 w-full bg-blue-500/80 liquid-transition border-t border-blue-400"
                style={{ height: `${percentage}%` }}
              >
                <div className="w-full h-2 bg-blue-300/50 absolute top-0"></div>
              </div>
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/20 to-transparent pointer-events-none"></div>
            </div>
          )}
        </div>

        {/* Vessel Name - Moved inside the jumping wrapper */}
        <div className={`mt-4 font-black text-slate-800 text-center select-none px-3 py-1 rounded-lg transition-colors
          ${isSelected ? 'bg-yellow-100 text-yellow-900' : 'bg-white/50'}`}>
          {def.name}
        </div>
      </div>
      
      {/* Transfer mode hint - stays fixed at bottom */}
      <div className="h-6 mt-1 flex items-center">
        {isSelected && activeTool === 'NONE' && (
          <div className="text-[11px] text-yellow-600 font-black uppercase tracking-widest animate-pulse">
            {isSource ? "ВЫБРАНО" : "КУДА?"}
          </div>
        )}
      </div>
    </div>
  );
};

export default Container;
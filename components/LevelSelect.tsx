import React from 'react';
import { Level } from '../types';
import { Lock, Play, ChevronLeft } from 'lucide-react';

interface LevelSelectProps {
  levels: Level[];
  maxReachedIndex: number;
  onSelect: (index: number) => void;
  onBack: () => void;
  isMobile?: boolean;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ levels, maxReachedIndex, onSelect, onBack, isMobile = false }) => {
  return (
    <div className={`h-full w-full bg-slate-100 flex items-center justify-center relative ${isMobile ? 'p-4' : 'p-4'}`}>
      <div className={`bg-white shadow-2xl w-full transform transition-all duration-500 ${isMobile ? 'rounded-[32px] p-5 max-w-xs' : 'rounded-[40px] p-8 max-w-2xl'}`}>
        <div className={`flex items-center ${isMobile ? 'gap-3 mb-5' : 'gap-4 mb-8'}`}>
          <button
            onClick={onBack}
            className={`hover:bg-slate-100 rounded-full text-slate-600 transition-colors ${isMobile ? 'p-2.5' : 'p-3'}`}
          >
            <ChevronLeft size={isMobile ? 24 : 24} />
          </button>
          <h1 className={`font-black text-slate-800 ${isMobile ? 'text-2xl' : 'text-3xl'}`}>Выбор уровня</h1>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-4 gap-3 max-h-[65vh] overflow-y-auto pr-1' : 'grid-cols-2 sm:grid-cols-3 gap-4'}`}>
          {levels.map((level, index) => {
            const isLocked = index > maxReachedIndex;
            return (
              <button
                key={level.id}
                disabled={isLocked}
                onClick={() => onSelect(index)}
                className={`relative group rounded-2xl flex flex-col items-center justify-center transition-all border-4
                  ${isMobile ? 'h-14 aspect-square' : 'h-32 rounded-3xl'}
                  ${isLocked
                    ? 'bg-slate-50 border-slate-100 cursor-not-allowed'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:shadow-xl active:scale-95'
                  }`}
              >
                {isLocked ? (
                  <>
                    <Lock className="text-slate-300" size={isMobile ? 20 : 32} />
                    {!isMobile && <span className="text-slate-400 font-bold mt-2">Уровень {level.id}</span>}
                  </>
                ) : (
                  <>
                    <div className={`rounded-full bg-blue-500 text-white flex items-center justify-center font-black shadow-lg group-hover:scale-110 transition-transform ${isMobile ? 'w-9 h-9 text-base' : 'w-10 h-10 mb-2'}`}>
                      {level.id}
                    </div>
                    {!isMobile && (
                      <span className="text-slate-700 font-bold px-2 text-center text-sm line-clamp-1">
                        {level.title}
                      </span>
                    )}
                    <Play className={`absolute text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity ${isMobile ? 'bottom-1 right-1' : 'bottom-3 right-3'}`} size={isMobile ? 14 : 16} />
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
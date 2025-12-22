import React from 'react';
import { Level } from '../types';
import { Lock, Play, ChevronLeft } from 'lucide-react';

interface LevelSelectProps {
  levels: Level[];
  maxReachedIndex: number;
  onSelect: (index: number) => void;
  onBack: () => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ levels, maxReachedIndex, onSelect, onBack }) => {
  return (
    <div className="w-full h-full bg-slate-100 flex items-center justify-center p-4 overflow-auto">
      <div className="bg-white rounded-[40px] shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-500">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={onBack}
            className="p-3 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-3xl font-black text-slate-800">Выбор уровня</h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {levels.map((level, index) => {
            const isLocked = index > maxReachedIndex;
            return (
              <button
                key={level.id}
                disabled={isLocked}
                onClick={() => onSelect(index)}
                className={`relative group h-32 rounded-3xl flex flex-col items-center justify-center transition-all border-4 
                  ${isLocked 
                    ? 'bg-slate-50 border-slate-100 cursor-not-allowed' 
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:shadow-xl active:scale-95'
                  }`}
              >
                {isLocked ? (
                  <>
                    <Lock className="text-slate-300 mb-2" size={32} />
                    <span className="text-slate-400 font-bold">Уровень {level.id}</span>
                  </>
                ) : (
                  <>
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-black mb-2 shadow-lg group-hover:scale-110 transition-transform">
                      {level.id}
                    </div>
                    <span className="text-slate-700 font-bold px-2 text-center text-sm line-clamp-1">
                      {level.title}
                    </span>
                    <Play className="absolute bottom-3 right-3 text-blue-300 opacity-0 group-hover:opacity-100 transition-opacity" size={16} />
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
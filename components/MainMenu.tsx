import React from 'react';
import { PlayCircle, List, Sparkles, Music, Volume2, VolumeX } from 'lucide-react';

interface MainMenuProps {
  onStart: () => void;
  canContinue: boolean;
  onContinue: () => void;
  onOpenLevelSelect: () => void;
  currentLevelId: number;
  audioSettings: { music: boolean; sfx: boolean };
  toggleMusic: () => void;
  toggleSfx: () => void;
  isMobile?: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStart,
  canContinue,
  onContinue,
  onOpenLevelSelect,
  currentLevelId,
  audioSettings,
  toggleMusic,
  toggleSfx,
  isMobile = false
}) => {
  return (
    <div className={`h-full w-full bg-slate-100 flex items-center justify-center relative overflow-hidden ${isMobile ? 'p-4' : 'p-4'}`}>
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      {/* Аудио Контролы */}
      <div className={`absolute flex z-50 ${isMobile ? 'top-4 right-4 gap-2' : 'top-6 right-6 gap-3'}`}>
        <button
          onClick={toggleMusic}
          className={`rounded-2xl shadow-lg border-2 transition-all active:scale-90 ${isMobile ? 'p-2.5' : 'p-3'} ${audioSettings.music ? 'bg-white border-blue-200 text-blue-500' : 'bg-slate-200 border-slate-300 text-slate-400'}`}
        >
          {audioSettings.music ? <Music size={isMobile ? 22 : 24} /> : <Music size={isMobile ? 22 : 24} className="opacity-40" />}
        </button>
        <button
          onClick={toggleSfx}
          className={`rounded-2xl shadow-lg border-2 transition-all active:scale-90 ${isMobile ? 'p-2.5' : 'p-3'} ${audioSettings.sfx ? 'bg-white border-yellow-200 text-yellow-500' : 'bg-slate-200 border-slate-300 text-slate-400'}`}
        >
          {audioSettings.sfx ? <Volume2 size={isMobile ? 22 : 24} /> : <VolumeX size={isMobile ? 22 : 24} />}
        </button>
      </div>

      <div className={`bg-white shadow-2xl w-full text-center relative z-10 border-8 border-white ${isMobile ? 'rounded-[40px] p-6 max-w-xs' : 'rounded-[50px] p-10 max-w-md'}`}>
        {/* Иконка и заголовок - вертикальная компоновка для обоих режимов */}
        <div className={isMobile ? 'mb-6' : 'mb-10'}>
          <div className={`bg-blue-500 mx-auto flex items-center justify-center shadow-[0_15px_35px_rgba(59,130,246,0.4)] rotate-3 hover:rotate-0 transition-transform duration-500 ${isMobile ? 'w-20 h-20 rounded-[28px] mb-4' : 'w-28 h-28 rounded-[35px] mb-6'}`}>
            <span className={isMobile ? 'text-4xl' : 'text-6xl'}>🧪</span>
          </div>
          <h1 className={`font-black text-slate-800 tracking-tight ${isMobile ? 'text-2xl mb-2' : 'text-4xl mb-3'}`}>
            {isMobile ? 'Занимательные\nЖидкости' : 'Занимательные'}
            {!isMobile && <br/>}
            {!isMobile && 'Жидкости'}
          </h1>
          <div className={`bg-blue-500 mx-auto rounded-full ${isMobile ? 'h-1 w-16 mb-2' : 'h-1 w-20 mb-4'}`}></div>
          <p className={`text-slate-500 font-medium ${isMobile ? 'text-sm' : ''}`}>Мастерство переливания</p>
        </div>

        <div className={`${isMobile ? 'space-y-3' : 'space-y-4'}`}>
          {canContinue ? (
            <>
              <button
                onClick={(e) => { e.preventDefault(); onContinue(); }}
                className={`w-full group relative flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black shadow-[0_10px_25px_rgba(59,130,246,0.3)] transition-all active:scale-95 ${isMobile ? 'gap-3 py-4 text-lg' : 'gap-4 py-5 text-xl'}`}
              >
                <PlayCircle size={isMobile ? 24 : 28} />
                Продолжить
                <div className={`absolute top-0 -translate-y-1/2 bg-yellow-400 text-yellow-950 rounded-full border-2 border-white shadow-sm ${isMobile ? 'right-3 text-[10px] px-2 py-0.5' : 'right-4 text-[10px] px-2 py-1'}`}>
                  УР. {currentLevelId}
                </div>
              </button>

              <button
                onClick={(e) => { e.preventDefault(); onOpenLevelSelect(); }}
                className={`w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold transition-all active:scale-95 ${isMobile ? 'gap-3 py-3.5 text-base' : 'gap-4 py-5 text-lg'}`}
              >
                <List size={isMobile ? 22 : 24} />
                Выбрать уровень
              </button>

              <button
                onClick={(e) => { e.preventDefault(); onStart(); }}
                className={`w-full text-slate-400 hover:text-red-500 font-bold transition-all flex items-center justify-center gap-2 ${isMobile ? 'pt-2 text-sm' : 'pt-4 text-sm'}`}
              >
                Начать игру заново
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => { e.preventDefault(); onStart(); }}
                className={`w-full group relative flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-black shadow-[0_10px_30px_rgba(59,130,246,0.4)] transition-all active:scale-95 animate-bounce-subtle ${isMobile ? 'gap-3 py-5 text-xl' : 'gap-4 py-6 text-2xl'}`}
              >
                <Sparkles size={isMobile ? 24 : 28} className="text-yellow-300" />
                Новая игра
              </button>

              <button
                onClick={(e) => { e.preventDefault(); onOpenLevelSelect(); }}
                className={`w-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-2xl font-bold transition-all active:scale-95 ${isMobile ? 'gap-3 py-3.5 text-base' : 'gap-4 py-4 text-lg'}`}
              >
                <List size={isMobile ? 22 : 24} />
                Выбрать уровень
              </button>
            </>
          )}
        </div>

        <div className={`text-[10px] font-black text-slate-300 uppercase tracking-widest ${isMobile ? 'mt-6' : 'mt-12'}`}>
          FLL Games • 2025
        </div>
      </div>

      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default MainMenu;
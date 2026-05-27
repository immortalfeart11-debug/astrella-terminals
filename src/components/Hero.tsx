import React from 'react';
import { AlertOctagon, Terminal, Eye, EyeOff, FileText, ArrowRight } from 'lucide-react';

interface HeroProps {
  isBlackVeil: boolean;
  setIsBlackVeil: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  isBlackVeil,
  setIsBlackVeil,
  setActiveTab
}) => {
  return (
    <section className="relative overflow-hidden border-b border-gray-900/80 py-12 md:py-20">
      {/* Absolute ambient background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className={`absolute inset-0 ${
          isBlackVeil ? 'bg-grid-pattern' : 'bg-grid-pattern-red'
        }`}></div>
        
        {/* Gradients */}
        <div className={`absolute top-1/4 left-10 w-72 h-72 rounded-full blur-3xl ${
          isBlackVeil ? 'bg-cyan-600/20' : 'bg-red-700/20'
        }`}></div>
        <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-3xl ${
          isBlackVeil ? 'bg-blue-600/10' : 'bg-yellow-600/10'
        }`}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Hardware Toggle Banner */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 bg-[#0a0a0f]/90 p-4 rounded-lg border border-gray-800/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded ${isBlackVeil ? 'bg-cyan-950 text-cyan-400' : 'bg-red-950 text-red-500'}`}>
              <AlertOctagon className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="text-xs text-gray-400 font-mono">
                {isBlackVeil ? 'СИСТЕМА ПЕРЕХВАЧЕНА // BLACK VEIL' : 'ОФИЦИАЛЬНЫЙ КАНАЛ // HELIOS BIOTECH'}
              </div>
              <div className="text-sm font-bold font-['Chakra_Petch'] text-gray-200">
                {isBlackVeil ? 'Отображение скрытых файлов EDEN' : 'Режим гражданской безопасности'}
              </div>
            </div>
          </div>

          {/* Custom Switch */}
          <div className="flex items-center gap-3 bg-black/60 p-2 rounded-md border border-gray-800">
            <span className={`text-xs font-mono font-bold ${!isBlackVeil ? 'text-red-500' : 'text-gray-600'}`}>
              HELIOS
            </span>
            
            <button
              onClick={() => setIsBlackVeil(!isBlackVeil)}
              className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer p-1 ${
                isBlackVeil ? 'bg-cyan-950 border border-cyan-500' : 'bg-red-950 border border-red-700'
              }`}
              title="Переключить режим отображения правды"
            >
              <div className={`w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center ${
                isBlackVeil ? 'bg-cyan-400 translate-x-7' : 'bg-red-500 translate-x-0'
              }`}>
                {isBlackVeil ? <Eye className="w-3 h-3 text-black" /> : <EyeOff className="w-3 h-3 text-white" />}
              </div>
            </button>

            <span className={`text-xs font-mono font-bold ${isBlackVeil ? 'text-cyan-400 glow-neon' : 'text-gray-600'}`}>
              BLACK VEIL
            </span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Titles & Slogans */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900/80 border border-gray-800 text-xs font-mono">
              <Terminal className={`w-3.5 h-3.5 ${isBlackVeil ? 'text-cyan-400' : 'text-red-500'}`} />
              <span className="text-gray-300">АЛЬТЕРНАТИВНЫЙ SAN ANDREAS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider font-['Chakra_Petch'] leading-tight">
              {isBlackVeil ? (
                <>
                  <span className="text-gray-100">ПРОГРАММА</span>{' '}
                  <span className="text-cyan-400 glow-neon block">EDEN</span>
                </>
              ) : (
                <>
                  <span className="text-gray-100">THE FALL OF</span>{' '}
                  <span className="text-red-600 glow-red block">SAN ANDREAS</span>
                </>
              )}
            </h1>

            <div className="space-y-2 border-l-2 border-gray-800 pl-4 py-1">
              <p className="text-lg md:text-xl font-['Chakra_Petch'] font-semibold text-gray-300">
                {isBlackVeil 
                  ? '“ASTRA-9 никогда не был ошибкой. Эпидемия — часть эксперимента.”'
                  : '“В Astrella выживает не сильнейший. Выживает тот, у кого есть ₽.”'
                }
              </p>
              <p className="text-xs font-mono text-gray-500">
                {isBlackVeil 
                  ? 'Секретные архивы Black Veil // Уровень допуска: Омега'
                  : 'Официальная сводка Astrella Central Exchange // 2026'
                }
              </p>
            </div>

            <p className="text-sm md:text-base text-gray-400 max-w-xl leading-relaxed">
              {isBlackVeil ? (
                <span>
                  Корпорация <strong className="text-cyan-400">HELIOS BIOTECH</strong> создала препарат контроля поведения населения. Когда вирус мутировал, они изолировали штат, превратив миллионы людей в подопытных для создания нового мирового порядка.
                </span>
              ) : (
                <span>
                  Когда-то самый богатый штат США, центр технологий и развлечений, теперь — изолированная карантинная территория, окружённая армией и разделённая на зоны тотального контроля.
                </span>
              )}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setActiveTab('map')}
                className={`px-6 py-3 rounded font-['Chakra_Petch'] font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isBlackVeil 
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-black glow-neon' 
                    : 'bg-red-600 hover:bg-red-500 text-white glow-red'
                }`}
              >
                <span>Карта Зон</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveTab('economy')}
                className="px-6 py-3 rounded bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-200 font-['Chakra_Petch'] font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <span>Биржа ACE (₽)</span>
              </button>

              <button
                onClick={() => setActiveTab('rolecraft')}
                className="px-4 py-3 rounded bg-transparent hover:bg-gray-900/60 text-gray-400 hover:text-gray-200 font-['Chakra_Petch'] text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Получить ID</span>
              </button>
            </div>

            {/* Micro badges */}
            <div className="pt-4 flex flex-wrap gap-2 text-[10px] font-mono text-gray-500">
              <span className="px-2 py-0.5 bg-gray-950 rounded border border-gray-900">SURVIVAL THRILLER</span>
              <span className="px-2 py-0.5 bg-gray-950 rounded border border-gray-900">QUARANTINE ZONE</span>
              <span className="px-2 py-0.5 bg-gray-950 rounded border border-gray-900">RUBLE ECONOMY</span>
              <span className="px-2 py-0.5 bg-gray-950 rounded border border-gray-900">STAGE 3 MUTATIONS</span>
            </div>
          </div>

          {/* Right Column: Tactical / Dystopian Stats View */}
          <div className="lg:col-span-5">
            <div className={`p-6 rounded-lg border relative backdrop-blur-md ${
              isBlackVeil 
                ? 'bg-[#040d12]/80 border-cyan-500/30' 
                : 'bg-[#0e0a0a]/80 border-red-950'
            }`}>
              {/* Corner Accents */}
              <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isBlackVeil ? 'border-cyan-400' : 'border-red-500'}`}></div>
              <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isBlackVeil ? 'border-cyan-400' : 'border-red-500'}`}></div>
              <div className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 ${isBlackVeil ? 'border-cyan-400' : 'border-red-500'}`}></div>
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 ${isBlackVeil ? 'border-cyan-400' : 'border-red-500'}`}></div>

              <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-3">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Сводка Территории
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                  isBlackVeil ? 'bg-cyan-950 text-cyan-400' : 'bg-red-950 text-red-400'
                }`}>
                  ONLINE
                </span>
              </div>

              {/* Stats List */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
                    <span>СТАТУС ИЗОЛЯЦИИ</span>
                    <span className="text-gray-200">100% (ПОЛНАЯ)</span>
                  </div>
                  <div className="w-full bg-gray-950 h-1 rounded overflow-hidden">
                    <div className={`h-full w-full ${isBlackVeil ? 'bg-cyan-500' : 'bg-red-600'}`}></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-gray-950/60 p-3 rounded border border-gray-900">
                    <div className="text-[10px] text-gray-500 font-mono">ВАЛЮТА ШТАТА</div>
                    <div className="text-lg font-bold font-mono text-gray-100 mt-0.5">РУБЛЬ ₽</div>
                    <div className="text-[9px] text-gray-600 mt-1">Доллар США: 0.00 ₽</div>
                  </div>

                  <div className="bg-gray-950/60 p-3 rounded border border-gray-900">
                    <div className="text-[10px] text-gray-500 font-mono">УГРОЗА BROKEN</div>
                    <div className="text-lg font-bold font-mono text-red-500 mt-0.5">STAGE 3</div>
                    <div className="text-[9px] text-gray-600 mt-1">Крайняя агрессия</div>
                  </div>
                </div>

                <div className="bg-gray-950/60 p-3 rounded border border-gray-900">
                  <div className="text-[10px] text-gray-500 font-mono mb-1">КОНТРОЛЬ СЕКТОРОВ</div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-green-500">SAFE ZONES (Юг)</span>
                      <span className="text-gray-400">ANG / DCS</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-yellow-500">YELLOW ZONES</span>
                      <span className="text-gray-400">Картели / ЧВК</span>
                    </div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-red-500">BLACK ZONES (Север)</span>
                      <span className="text-gray-400">BROKEN / Хаос</span>
                    </div>
                  </div>
                </div>

                {/* Slogan Box */}
                <div className={`p-3 rounded text-center border ${
                  isBlackVeil 
                    ? 'bg-cyan-950/20 border-cyan-900/50 text-cyan-300' 
                    : 'bg-red-950/20 border-red-900/50 text-red-400'
                }`}>
                  <p className="text-xs font-mono tracking-wide">
                    {isBlackVeil 
                      ? '“ОНИ СТРОЯТ НОВЫЙ ПОРЯДОК НА НАШИХ КОСТЯХ”' 
                      : '“SURVIVE THE FALL.”'
                    }
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

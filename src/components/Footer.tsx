import React from 'react';
import { Shield, Radio, AlertTriangle } from 'lucide-react';

interface FooterProps {
  isBlackVeil: boolean;
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isBlackVeil, setActiveTab }) => {
  return (
    <footer className={`border-t transition-colors duration-500 ${
      isBlackVeil 
        ? 'bg-[#020608] border-cyan-900/40 text-cyan-500/80' 
        : 'bg-[#050507] border-red-950 text-gray-500'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded ${isBlackVeil ? 'bg-cyan-950 text-cyan-400' : 'bg-red-950 text-red-600'}`}>
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-['Chakra_Petch'] font-bold text-base tracking-wider text-gray-100">
                ASTRELLA // ACE
              </span>
            </div>

            <p className="text-xs leading-relaxed text-gray-400">
              {isBlackVeil 
                ? 'Секретный узел связи Black Veil. Мы перехватываем пропаганду, чтобы рассказать вам правду.'
                : 'Официальный терминал карантинной зоны штата San Andreas. Контролируется HELIOS BIOTECH.'}
            </p>

            <div className="text-[10px] font-mono">
              <span>ШТАТ // ИЗОЛИРОВАН С 2026</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider ${isBlackVeil ? 'text-cyan-400' : 'text-gray-300'}`}>
              СИСТЕМНЫЕ УЗЛЫ
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('concept')} className="hover:text-gray-200 transition-colors">
                  Хроника Катастрофы
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('map')} className="hover:text-gray-200 transition-colors">
                  Интерактивная Карта
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('factions')} className="hover:text-gray-200 transition-colors">
                  Фракции и Корпорации
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('broken')} className="hover:text-gray-200 transition-colors">
                  Классификация BROKEN
                </button>
              </li>
            </ul>
          </div>

          {/* Slogans */}
          <div className="space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider ${isBlackVeil ? 'text-cyan-400' : 'text-gray-300'}`}>
              ЗАКОНЫ КАРАНТИНА
            </h4>
            <div className="space-y-2 text-xs font-mono">
              <p className="text-gray-400">“SURVIVE THE FALL.”</p>
              <p className="text-gray-400">“QUARANTINE CHANGES PEOPLE.”</p>
              <p className="text-gray-400">“THE STATE THAT NEVER RECOVERED.”</p>
            </div>
          </div>

          {/* Security alert / Radio Status */}
          <div className="space-y-3">
            <h4 className={`text-xs font-mono uppercase tracking-wider ${isBlackVeil ? 'text-cyan-400' : 'text-gray-300'}`}>
              AEN РАДИОСТАТУС
            </h4>
            
            <div className={`p-3 rounded border text-xs font-mono space-y-1.5 ${
              isBlackVeil 
                ? 'bg-cyan-950/20 border-cyan-900 text-cyan-300' 
                : 'bg-red-950/20 border-red-950 text-red-400'
            }`}>
              <div className="flex items-center gap-1.5 font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>ЧАСТОТА: 107.5 FM</span>
              </div>
              <p className="text-[11px] text-gray-400">
                {isBlackVeil 
                  ? 'Эфир перехвачен. Трансляция реальных аудиозаписей программы EDEN.' 
                  : 'Вещание активно. Включите плеер в правом нижнем углу.'}
              </p>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-gray-600">
              <AlertTriangle className="w-3 h-3 text-yellow-600" />
              <span>ПЕРЕХОД НА РУБЛЬ ₽: ЗАВЕРШЁН</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono">
          <div>
            <span>© 2026 ASTRELLA CENTRAL EXCHANGE. СИСТЕМА ФУНКЦИОНИРУЕТ НА БАЗЕ ЯДРА EDEN_V4.</span>
          </div>

          <div className="flex gap-4">
            <span className="hover:text-gray-300 cursor-pointer">КОНФИДЕНЦИАЛЬНОСТЬ</span>
            <span className="hover:text-gray-300 cursor-pointer">ПРАВИЛА ЗОНЫ</span>
            <span className="hover:text-gray-300 cursor-pointer">API ДОСТУП</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

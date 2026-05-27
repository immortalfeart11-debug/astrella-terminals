import React from 'react';
import { Shield, Cpu, Map, Users, Skull, ShoppingCart, Clapperboard, UserCheck } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  rubles: number;
  isBlackVeil: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  rubles,
  isBlackVeil
}) => {
  const navItems = [
    { id: 'concept', label: 'Хроника', icon: Cpu },
    { id: 'map', label: 'Карта Зон', icon: Map },
    { id: 'factions', label: 'Фракции', icon: Users },
    { id: 'broken', label: 'BROKEN', icon: Skull },
    { id: 'economy', label: 'Биржа ACE', icon: ShoppingCart },
    { id: 'seasons', label: 'Сезоны', icon: Clapperboard },
    { id: 'rolecraft', label: 'ID Пропуск', icon: UserCheck },
  ];

  return (
    <header className={`sticky top-0 z-40 border-b transition-colors duration-500 backdrop-blur-md ${
      isBlackVeil 
        ? 'bg-[#04090c]/90 border-cyan-500/40' 
        : 'bg-[#08080a]/90 border-red-950/80'
    }`}>
      {/* Top micro ticker */}
      <div className={`px-4 py-1 text-[10px] tracking-widest flex justify-between items-center border-b ${
        isBlackVeil 
          ? 'bg-cyan-950/40 text-cyan-400 border-cyan-900/30' 
          : 'bg-red-950/30 text-red-500 border-red-950/50'
      }`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="font-bold shrink-0 animate-pulse">
            {isBlackVeil ? '⚠️ ВНИМАНИЕ: СЕТЬ ВЗЛОМАНА' : '🔴 СТАТУС КАРАНТИНА:'}
          </span>
          <span className="text-gray-300 truncate">
            {isBlackVeil 
              ? 'ПРОТОКОЛ EDEN — ЭТО НЕ СЛУЧАЙНОСТЬ. ВЫ — ЧАСТЬ ЭКСПЕРИМЕНТА HELIOS.' 
              : 'ВЫЕЗД ИЗ ШТАТА ЗАКРЫТ. ПЕРИМЕТР ОХРАНЯЕТСЯ ASTRELLA NATIONAL GUARD.'}
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-4 shrink-0 font-mono">
          <span>СЕКТОР: <strong className="text-gray-200">SAFE-ZONE 04</strong></span>
          <span>ПРОПУСК: <strong className={isBlackVeil ? 'text-cyan-300' : 'text-red-400'}>TIER-1</strong></span>
        </div>
      </div>

      {/* Main Nav content */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('concept')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className={`p-2 rounded-md transition-all duration-300 ${
            isBlackVeil 
              ? 'bg-cyan-950 text-cyan-400 group-hover:bg-cyan-900' 
              : 'bg-red-950 text-red-600 group-hover:bg-red-900'
          }`}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-['Chakra_Petch'] font-bold text-base md:text-lg tracking-wider text-gray-100 flex items-center gap-1">
              ASTRELLA
              <span className={`text-[10px] px-1 rounded font-mono ${
                isBlackVeil ? 'bg-cyan-500/20 text-cyan-300' : 'bg-red-500/20 text-red-500'
              }`}>
                OS
              </span>
            </div>
            <div className="text-[9px] text-gray-500 tracking-widest font-mono -mt-1 hidden sm:block">
              {isBlackVeil ? 'BLACK_VEIL_NODE' : 'CENTRAL EXCHANGE'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 md:gap-2 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-md text-xs font-['Chakra_Petch'] font-medium tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive 
                    ? isBlackVeil 
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 glow-neon' 
                      : 'bg-red-950/80 text-red-400 border border-red-800/40 glow-red'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-900/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? (isBlackVeil ? 'text-cyan-400' : 'text-red-500') : 'text-gray-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Balance Trigger */}
        <div 
          onClick={() => setActiveTab('economy')}
          className={`shrink-0 flex items-center gap-2 px-3 py-1.5 rounded border cursor-pointer transition-all ${
            isBlackVeil 
              ? 'bg-cyan-950/30 border-cyan-800/50 hover:border-cyan-500 text-cyan-300' 
              : 'bg-red-950/30 border-red-900/50 hover:border-red-600 text-red-400'
          }`}
          title="Ваш счёт в ACE. Нажмите, чтобы перейти на биржу"
        >
          <div className="text-right">
            <div className="text-[9px] text-gray-500 uppercase font-mono">Счёт ACE</div>
            <div className="font-mono font-bold text-xs md:text-sm text-gray-100 flex items-center gap-1">
              {rubles.toLocaleString('ru-RU')} <span className={isBlackVeil ? "text-cyan-400" : "text-red-500"}>₽</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

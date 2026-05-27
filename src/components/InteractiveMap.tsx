import React, { useState } from 'react';
import { Map as MapIcon, Lock, Unlock, Radio } from 'lucide-react';

interface InteractiveMapProps {
  isBlackVeil: boolean;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ isBlackVeil }) => {
  const [activePhase, setActivePhase] = useState<number>(1);
  const [selectedSector, setSelectedSector] = useState<string>('south');

  const phases = [
    {
      id: 1,
      name: "PHASE 1 — RED ZONE",
      pass: "Tier-1 Pass",
      status: "Доступен только юг карты",
      desc: "Разрешено жить в безопасных секторах, работать и проходить КПП. Полностью закрыты: север, лаборатории, военные базы и заражённые районы."
    },
    {
      id: 2,
      name: "PHASE 2 — YELLOW ZONE",
      pass: "Tier-2 Pass",
      status: "Частичная зачистка",
      desc: "После глобальных сюжетных событий часть территории очищается, появляются новые ресурсы, начинаются ожесточенные корпоративные войны за контроль."
    },
    {
      id: 3,
      name: "PHASE 3 — BLACKOUT",
      pass: "Full Access / Хаос",
      status: "Связь с центром потеряна",
      desc: "Начинаются гражданская война, хаос, массовые зачистки и полномасштабные войны фракций. Открывается почти весь штат."
    },
    {
      id: 4,
      name: "PHASE 4 — NEW ORDER",
      pass: "Суверенный Контроль",
      status: "Финальный передел",
      desc: "Игроки определяют, кто станет властью: восстановится ли государство, победят ли корпорации, или Astrella станет криминальным государством."
    }
  ];

  const sectors = [
    {
      id: 'south',
      name: 'Южный Сектор (Safe Zone 01)',
      type: 'SAFE',
      phaseReq: 1,
      faction: 'ANG / DCS',
      threat: 'Низкий',
      brokenStage: 'Отсутствует (Жесткий контроль)',
      desc: 'Остатки мегаполиса. Здесь функционирует биржа ACE, работают легальные магазины и патрулирует Нацгвардия. Вход без Tier-1 Pass запрещён.'
    },
    {
      id: 'west',
      name: 'Западное Побережье (Yellow Zone)',
      type: 'YELLOW',
      phaseReq: 2,
      faction: 'Los Muertos Cartel / ЧВК',
      threat: 'Средний',
      brokenStage: 'Stage 1-2 (Вспышки)',
      desc: 'Промышленная зона и порты. Место непрерывных столкновений между наёмниками Vanguard Solutions и боевиками картеля за поставки медикаментов.'
    },
    {
      id: 'desert',
      name: 'Пустыня Гранд-Сенора',
      type: 'YELLOW',
      phaseReq: 2,
      faction: 'Iron Jackals',
      threat: 'Высокий',
      brokenStage: 'Stage 2 (Стаи)',
      desc: 'Контролируется бандой бывших военных. Здесь расположены старые оружейные склады и секретные аэродромы. Крайне опасная территория для одиночек.'
    },
    {
      id: 'north',
      name: 'Северный Хребет (Black Zone)',
      type: 'BLACK',
      phaseReq: 3,
      faction: 'BROKEN / Хаос',
      threat: 'Критический',
      brokenStage: 'Stage 3 (Абсолютная деградация)',
      desc: 'Эпицентр катастрофы. Территория покрыта густым туманом и ядовитыми спорами. Здесь бродят самые агрессивные инфицированные, потерявшие всё человеческое.'
    },
    {
      id: 'labs',
      name: 'Комплекс HELIOS (Сектор Омега)',
      type: 'LABS',
      phaseReq: 3,
      faction: 'Helios Biotech / Black Veil',
      threat: 'Максимальный',
      brokenStage: 'Секретные мутации',
      desc: 'Главная лаборатория, где был создан ASTRA-9. Сталкеры ищут здесь архивы программы EDEN. Смертность среди исследователей превышает 90%.'
    }
  ];

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
            <MapIcon className="w-3.5 h-3.5 text-red-500" />
            <span className="text-gray-300">ТАКТИЧЕСКАЯ СИСТЕМА ACE</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
            ИНТЕРАКТИВНАЯ КАРТА ШТАТА
          </h2>
        </div>

        {/* Phase Selectors */}
        <div className="flex flex-wrap gap-1 bg-gray-950 p-1.5 rounded-lg border border-gray-800">
          {phases.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setActivePhase(p.id);
                // Switch selected sector appropriately
                if (p.id === 1) setSelectedSector('south');
                if (p.id === 2) setSelectedSector('west');
                if (p.id >= 3) setSelectedSector('north');
              }}
              className={`px-3 py-1.5 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider transition-all cursor-pointer ${
                activePhase === p.id 
                  ? isBlackVeil 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/50 glow-neon' 
                    : 'bg-red-950 text-red-400 border border-red-800/50 glow-red'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              PHASE {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Main UI layout: Custom Tactical Canvas + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left View: Tactical Rendered Map */}
        <div className="lg:col-span-7">
          <div className={`p-4 rounded-lg border relative overflow-hidden select-none ${
            isBlackVeil 
              ? 'bg-[#03090d] border-cyan-500/40' 
              : 'bg-[#0a0a0e] border-red-950'
          }`}>
            {/* Map Status Bar */}
            <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 mb-3 border-b border-gray-800/60 pb-2">
              <span className="flex items-center gap-1">
                <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                САТЕЛЛИТ: ANG-SAT-09
              </span>
              <span>
                АКТИВНАЯ ФАЗА: <strong className="text-gray-200">{phases[activePhase-1].name}</strong>
              </span>
            </div>

            {/* Simulated Canvas Map */}
            <div className="relative w-full h-[380px] sm:h-[450px] bg-[#050508] rounded border border-gray-900 overflow-hidden flex flex-col justify-between p-4">
              {/* Background grid representation */}
              <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>

              {/* Map Regions Rendered as highly interactive conceptual zones */}
              <div className="absolute inset-0 p-4 grid grid-cols-3 grid-rows-3 gap-3">
                
                {/* North Sector */}
                <div 
                  onClick={() => setSelectedSector('north')}
                  className={`col-span-3 row-span-1 rounded border transition-all flex flex-col justify-between p-3 cursor-pointer relative group ${
                    activePhase >= 3 
                      ? selectedSector === 'north'
                        ? 'bg-red-950/40 border-red-500 text-red-200'
                        : 'bg-red-950/10 border-red-950 hover:border-red-800 text-red-600'
                      : 'bg-gray-950/80 border-gray-900 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  <div className="absolute inset-0 bg-repeat opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #dc2626 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                  <div className="flex justify-between items-start z-10">
                    <span className="text-xs font-bold font-['Chakra_Petch'] tracking-wider">
                      СЕВЕРНЫЙ ХРЕБЕТ // BLACK ZONE
                    </span>
                    {activePhase >= 3 ? <Unlock className="w-3.5 h-3.5 text-red-500" /> : <Lock className="w-3.5 h-3.5 text-gray-700" />}
                  </div>
                  <div className="z-10 flex justify-between items-end">
                    <span className="text-[9px] font-mono">УГРОЗА: КРИТИЧЕСКАЯ</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-black/60 rounded">
                      {activePhase >= 3 ? 'ДОСТУП ОТКРЫТ' : 'ТРЕБУЕТСЯ PHASE 3'}
                    </span>
                  </div>
                </div>

                {/* West Sector */}
                <div 
                  onClick={() => setSelectedSector('west')}
                  className={`col-span-1 row-span-1 rounded border transition-all flex flex-col justify-between p-3 cursor-pointer relative ${
                    activePhase >= 2 
                      ? selectedSector === 'west'
                        ? 'bg-yellow-950/40 border-yellow-500 text-yellow-200'
                        : 'bg-yellow-950/10 border-yellow-950 hover:border-yellow-800 text-yellow-600'
                      : 'bg-gray-950/80 border-gray-900 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold font-['Chakra_Petch']">ЗАПАД</span>
                    {activePhase >= 2 ? <Unlock className="w-3.5 h-3.5 text-yellow-500" /> : <Lock className="w-3.5 h-3.5 text-gray-700" />}
                  </div>
                  <span className="text-[9px] font-mono block text-right">YELLOW ZONE</span>
                </div>

                {/* Labs Sector */}
                <div 
                  onClick={() => setSelectedSector('labs')}
                  className={`col-span-1 row-span-1 rounded border transition-all flex flex-col justify-between p-3 cursor-pointer relative ${
                    activePhase >= 3 
                      ? selectedSector === 'labs'
                        ? isBlackVeil ? 'bg-cyan-950/50 border-cyan-400 text-cyan-200' : 'bg-purple-950/40 border-purple-500 text-purple-200'
                        : 'bg-purple-950/10 border-purple-950 hover:border-purple-800 text-purple-600'
                      : 'bg-gray-950/80 border-gray-900 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold font-['Chakra_Petch']">LABS</span>
                    {activePhase >= 3 ? <Unlock className="w-3.5 h-3.5 text-purple-500" /> : <Lock className="w-3.5 h-3.5 text-gray-700" />}
                  </div>
                  <span className="text-[9px] font-mono block text-right">HELIOS</span>
                </div>

                {/* Desert Sector */}
                <div 
                  onClick={() => setSelectedSector('desert')}
                  className={`col-span-1 row-span-1 rounded border transition-all flex flex-col justify-between p-3 cursor-pointer relative ${
                    activePhase >= 2 
                      ? selectedSector === 'desert'
                        ? 'bg-yellow-950/40 border-yellow-500 text-yellow-200'
                        : 'bg-yellow-950/10 border-yellow-950 hover:border-yellow-800 text-yellow-600'
                      : 'bg-gray-950/80 border-gray-900 text-gray-700 cursor-not-allowed'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold font-['Chakra_Petch']">ПУСТЫНЯ</span>
                    {activePhase >= 2 ? <Unlock className="w-3.5 h-3.5 text-yellow-500" /> : <Lock className="w-3.5 h-3.5 text-gray-700" />}
                  </div>
                  <span className="text-[9px] font-mono block text-right">JACKALS</span>
                </div>

                {/* South Sector */}
                <div 
                  onClick={() => setSelectedSector('south')}
                  className={`col-span-3 row-span-1 rounded border transition-all flex flex-col justify-between p-3 cursor-pointer relative ${
                    selectedSector === 'south'
                      ? 'bg-green-950/40 border-green-500 text-green-200'
                      : 'bg-green-950/10 border-green-950 hover:border-green-800 text-green-600'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold font-['Chakra_Petch'] tracking-wider">
                      ЮЖНЫЙ СЕКТОР // SAFE ZONE
                    </span>
                    <Unlock className="w-3.5 h-3.5 text-green-500" />
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-mono">КОНТРОЛЬ: АРМИЯ США</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-black/60 rounded text-green-400">
                      TIER-1 PASS
                    </span>
                  </div>
                </div>

              </div>

              {/* Graphical radar sweep line */}
              <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-40 animate-pulse" style={{ left: '30%', animationDuration: '3s' }}></div>
            </div>

            {/* Phase info footer */}
            <div className="mt-3 p-2.5 bg-gray-950 rounded border border-gray-900 text-xs text-gray-400 flex flex-col sm:flex-row justify-between gap-2">
              <div>
                <span className="text-gray-200 font-bold font-['Chakra_Petch']">Условие фазы: </span>
                <span>{phases[activePhase-1].status}</span>
              </div>
              <div className="text-red-500 font-mono text-right">
                ПРОПУСК: {phases[activePhase-1].pass}
              </div>
            </div>
          </div>
        </div>

        {/* Right View: Sector Intelligence Dossier */}
        <div className="lg:col-span-5">
          {(() => {
            const current = sectors.find(s => s.id === selectedSector) || sectors[0];
            const isLocked = activePhase < current.phaseReq;

            return (
              <div className={`p-6 rounded-lg border h-full flex flex-col justify-between transition-all backdrop-blur-sm ${
                isBlackVeil 
                  ? 'bg-[#03090e]/90 border-cyan-500/40' 
                  : 'bg-[#0d0a0b]/90 border-red-950'
              }`}>
                <div>
                  {/* Top tags */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      current.type === 'SAFE' ? 'bg-green-950 text-green-400 border border-green-800' :
                      current.type === 'YELLOW' ? 'bg-yellow-950 text-yellow-400 border border-yellow-800' :
                      current.type === 'LABS' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                      'bg-red-950 text-red-400 border border-red-800'
                    }`}>
                      {current.type} ZONE
                    </span>

                    <span className="text-xs font-mono text-gray-500">
                      ТРЕБУЕТСЯ: PHASE {current.phaseReq}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-['Chakra_Petch'] text-gray-100">
                    {current.name}
                  </h3>

                  {/* Lock Warning overlay if user phase is too low */}
                  {isLocked ? (
                    <div className="mt-6 p-4 rounded bg-red-950/20 border border-red-900/50 text-center space-y-2">
                      <Lock className="w-8 h-8 text-red-500 mx-auto" />
                      <div className="text-xs font-bold font-mono text-red-400">
                        СЕКТОР НЕДОСТУПЕН В ТЕКУЩЕЙ ФАЗЕ
                      </div>
                      <p className="text-[11px] text-gray-400">
                        Для разблокировки данных переключите карту на <strong className="text-gray-200">PHASE {current.phaseReq}</strong> или выше.
                      </p>
                    </div>
                  ) : (
                    <div className="mt-6 space-y-4">
                      <p className="text-xs md:text-sm text-gray-300 leading-relaxed bg-gray-950/50 p-3 rounded border border-gray-900">
                        {current.desc}
                      </p>

                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between items-center text-xs font-mono border-b border-gray-800/60 pb-1.5">
                          <span className="text-gray-500">ДОМИНИРУЮЩАЯ СИЛА:</span>
                          <span className="text-gray-200 font-bold">{current.faction}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs font-mono border-b border-gray-800/60 pb-1.5">
                          <span className="text-gray-500">УРОВЕНЬ УГРОЗЫ:</span>
                          <span className={`font-bold ${
                            current.threat === 'Низкий' ? 'text-green-500' :
                            current.threat === 'Средний' ? 'text-yellow-500' :
                            'text-red-500'
                          }`}>{current.threat}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs font-mono border-b border-gray-800/60 pb-1.5">
                          <span className="text-gray-500">СТАТУС BROKEN:</span>
                          <span className="text-gray-300">{current.brokenStage}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom pass info */}
                <div className="mt-8 pt-3 border-t border-gray-800/80">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-500">НЕОБХОДИМЫЙ ДОСТУП:</span>
                    <span className={`font-bold ${isBlackVeil ? 'text-cyan-400' : 'text-red-500'}`}>
                      {current.phaseReq === 1 ? 'Tier-1 Pass' : current.phaseReq === 2 ? 'Tier-2 Pass' : 'Blackout Override'}
                    </span>
                  </div>
                </div>

              </div>
            );
          })()}
        </div>

      </div>
    </section>
  );
};

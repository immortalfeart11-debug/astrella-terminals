import React, { useState } from 'react';
import { Skull, AlertOctagon, Activity, FileText, HeartPulse } from 'lucide-react';

interface BiohazardTerminalProps {
  isBlackVeil: boolean;
}

export const BiohazardTerminal: React.FC<BiohazardTerminalProps> = ({ isBlackVeil }) => {
  const [activeStage, setActiveStage] = useState<number>(3);

  const stages = [
    {
      level: 1,
      title: "STAGE 1 // РАННЯЯ МУТАЦИЯ",
      status: "Контролируемая угроза",
      symptoms: [
        "Неконтролируемые вспышки агрессии",
        "Хроническая бессонница (до 14 суток)",
        "Острая паранойя и слуховые галлюцинации",
        "Повышенная тревожность и тремор конечностей"
      ],
      clinical: "Субъект сохраняет речь и базовые социальные навыки, но становится крайне подозрительным. Препарат ASTRA-9 вызывает сильную химическую зависимость. При отсутствии дозы начинается ломка.",
      containment: "Изоляция в одиночном боксе. Введение седативных средств. При попытке нападения на персонал — применение электрошокеров.",
      color: "border-yellow-600 text-yellow-500",
      bg: "bg-yellow-950/20"
    },
    {
      level: 2,
      title: "STAGE 2 // РАЗРУШЕНИЕ ПСИХИКИ",
      status: "Высокая опасность",
      symptoms: [
        "Спонтанные приступы крайнего насилия",
        "Абсолютная физиологическая зависимость от ASTRA-9",
        "Полное отсутствие эмпатии и болевого порога",
        "Частичный распад высшей нервной деятельности"
      ],
      clinical: "Субъект теряет способность к связной речи, переходя на примитивные звуки. Наблюдается гипертрофированная мышечная сила из-за постоянного выброса адреналина. Игнорируют лёгкие ранения.",
      containment: "Изоляция в армированных камерах. Персонал работает только в бронекостюмах. При нарушении периметра разрешено применение огнестрельного оружия на поражение.",
      color: "border-orange-600 text-orange-500",
      bg: "bg-orange-950/20"
    },
    {
      level: 3,
      title: "STAGE 3 // ПОЛНАЯ ДЕГРАДАЦИЯ",
      status: "Критическая биоугроза",
      symptoms: [
        "Абсолютный распад человеческой личности",
        "Звериное, стайное поведение",
        "Полное отсутствие инстинкта самосохранения и страха",
        "Неконтролируемая, слепая жестокость"
      ],
      clinical: "Субъект больше не является человеком. Мозг функционирует исключительно на уровне базовых хищных рефлексов. Нападают на любые движущиеся объекты. Способны выдерживать множественные пулевые ранения.",
      containment: "НЕМЕДЛЕННОЕ УНИЧТОЖЕНИЕ. Любой контакт запрещён. При обнаружении скоплений Stage 3 в Black Zones — вызов огнемётных расчётов Нацгвардии.",
      color: "border-red-600 text-red-500",
      bg: "bg-red-950/20"
    }
  ];

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
          <Skull className="w-3.5 h-3.5 text-red-500" />
          <span className="text-gray-300">КЛАССИФИКАЦИЯ БИОУГРОЗЫ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
          ИНФИЦИРОВАННЫЕ: BROKEN
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          Это не классические зомби. BROKEN — жертвы мутации препарата ASTRA-9, превратившей их в зависимых, агрессивных хищников.
        </p>
      </div>

      {/* Interface Wrapper */}
      <div className={`border rounded-lg p-6 md:p-8 backdrop-blur-sm ${
        isBlackVeil 
          ? 'bg-[#03070a]/90 border-cyan-500/40' 
          : 'bg-[#0a0606]/90 border-red-950'
      }`}>
        
        {/* Top telemetry simulator */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 mb-6 border-b border-gray-900">
          <div className="bg-gray-950 p-3 rounded border border-gray-900">
            <span className="text-[10px] font-mono text-gray-500 block">ПАТОГЕН</span>
            <span className="text-sm font-bold font-mono text-red-500">ASTRA-9 (MUTATED)</span>
          </div>

          <div className="bg-gray-950 p-3 rounded border border-gray-900">
            <span className="text-[10px] font-mono text-gray-500 block">ВЕКТОР ПЕРЕДАЧИ</span>
            <span className="text-sm font-bold font-mono text-gray-200">Вода / Био-жидкости</span>
          </div>

          <div className="bg-gray-950 p-3 rounded border border-gray-900">
            <span className="text-[10px] font-mono text-gray-500 block">ИНКУБАЦИЯ</span>
            <span className="text-sm font-bold font-mono text-gray-200">От 2 до 72 часов</span>
          </div>

          <div className="bg-gray-950 p-3 rounded border border-gray-900">
            <span className="text-[10px] font-mono text-gray-500 block">ВАКЦИНА</span>
            <span className="text-sm font-bold font-mono text-yellow-500">В РАЗРАБОТКЕ (AMA)</span>
          </div>
        </div>

        {/* Stages View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stage switch list */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-2">
              Стадии Заражения
            </div>

            {stages.map((st) => (
              <button
                key={st.level}
                onClick={() => setActiveStage(st.level)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                  activeStage === st.level
                    ? isBlackVeil 
                      ? 'bg-cyan-950 border-cyan-400 text-cyan-300 glow-neon' 
                      : 'bg-red-950 border-red-600 text-red-400 glow-red'
                    : 'bg-[#0e0e13] border-gray-900 text-gray-500 hover:text-gray-300'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono">УРОВЕНЬ МУТАЦИИ</div>
                  <div className="text-base font-bold font-['Chakra_Petch'] tracking-wide text-gray-100">
                    STAGE {st.level}
                  </div>
                </div>

                <AlertOctagon className={`w-5 h-5 ${
                  activeStage === st.level ? (isBlackVeil ? 'text-cyan-400' : 'text-red-500') : 'text-gray-700'
                }`} />
              </button>
            ))}

            {/* Warning block */}
            <div className="mt-6 p-3 rounded bg-gray-950 border border-gray-900 text-[11px] text-gray-400 space-y-1">
              <div className="text-red-500 font-bold font-mono flex items-center gap-1">
                <HeartPulse className="w-3.5 h-3.5 animate-pulse" />
                <span>ПРОТОКОЛ БЕЗОПАСНОСТИ</span>
              </div>
              <p>
                При встрече с BROKEN на территории Black Zones не пытайтесь вступать в переговоры. Огонь на поражение — единственный утверждённый метод.
              </p>
            </div>
          </div>

          {/* Active Stage Deep Details */}
          <div className="lg:col-span-8">
            {(() => {
              const current = stages.find(s => s.level === activeStage) || stages[2];
              return (
                <div className={`p-6 rounded-lg border ${current.bg} ${current.color} space-y-6`}>
                  
                  {/* Title banner */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-current/20 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block">
                        Медицинский Архив HELIOS
                      </span>
                      <h3 className="text-2xl font-bold font-['Chakra_Petch'] text-gray-100 tracking-wide">
                        {current.title}
                      </h3>
                    </div>

                    <span className="px-3 py-1 bg-black/60 rounded text-xs font-mono font-bold self-start">
                      {current.status}
                    </span>
                  </div>

                  {/* Symptoms List */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      <span>Ключевые Симптомы:</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {current.symptoms.map((sym, i) => (
                        <div key={i} className="bg-black/40 p-2.5 rounded border border-current/10 text-xs text-gray-200 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0"></span>
                          <span>{sym}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clinical Picture */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Клиническая Картина:</span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed bg-black/40 p-3 rounded border border-current/10">
                      {current.clinical}
                    </p>
                  </div>

                  {/* Containment Protocol */}
                  <div>
                    <div className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-1">
                      Протокол Сдерживания (DCS / ANG):
                    </div>
                    <p className="text-sm font-mono text-gray-200 bg-red-950/40 p-3 rounded border border-red-900/50">
                      {current.containment}
                    </p>
                  </div>

                  {/* Simulated Audio Log */}
                  <div className="pt-2 border-t border-current/20 flex items-center justify-between text-xs font-mono">
                    <span className="text-gray-400">ЗАПИСЬ ИССЛЕДОВАТЕЛЯ #40{current.level}</span>
                    <span className="text-current animate-pulse">● СЕКРЕТНЫЙ ДОСТУП</span>
                  </div>

                </div>
              );
            })()}
          </div>

        </div>

      </div>
    </section>
  );
};

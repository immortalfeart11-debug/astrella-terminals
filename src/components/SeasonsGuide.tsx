import React from 'react';
import { Clapperboard, Play, Lock, CheckCircle, Radio } from 'lucide-react';

interface SeasonsGuideProps {
  isBlackVeil: boolean;
}

export const SeasonsGuide: React.FC<SeasonsGuideProps> = ({ isBlackVeil }) => {
  const seasons = [
    {
      number: 1,
      title: "SEASON 1 — OUTBREAK",
      subtitle: "Начало Карантина",
      status: "ЗАВЕРШЁН",
      episodes: 10,
      desc: "Первые недели после аварии в лаборатории HELIOS. Паника на улицах Лос-Сантоса, первые столкновения с мутировавшими BROKEN, спешное возведение бетонных стен и перекрытие мостов армией США.",
      color: "border-gray-800"
    },
    {
      number: 2,
      title: "SEASON 2 — FALL OF ORDER",
      subtitle: "Распад Полиции и Рост Картелей",
      status: "ЗАВЕРШЁН",
      episodes: 12,
      desc: "Экономика рухнула, доллар потерял ценность. Полиция (APD) раскалывается на честных офицеров и коррупционеров. Картель Los Muertos захватывает каналы поставок еды и медикаментов. Введение рублевой системы.",
      color: "border-gray-800"
    },
    {
      number: 3,
      title: "SEASON 3 — BLACK ZONES",
      subtitle: "Эксперименты и Лаборатории",
      status: "ТЕКУЩИЙ СЕЗОН",
      episodes: 16,
      desc: "Открытие самых опасных северных территорий. Сталкеры начинают массовые рейды в заброшенные бункеры программы EDEN. Появление BROKEN Stage 3. HELIOS проводит тайные зачистки силами ЧВК Vanguard.",
      color: isBlackVeil ? "border-cyan-500 glow-neon" : "border-red-600 glow-red"
    },
    {
      number: 4,
      title: "SEASON 4 — CIVIL WAR",
      subtitle: "Полномасштабная Война",
      status: "СКОРО",
      episodes: 14,
      desc: "Связь с федеральным центром США окончательно теряется. Начинается война всех против всех: Нацгвардия против Картелей, Корпорации против Дезертиров, Выжившие против Тотального Контроля.",
      color: "border-gray-900"
    },
    {
      number: 5,
      title: "SEASON 5 — EDEN",
      subtitle: "Финальный Выбор",
      status: "ЗАСЕКРЕЧЕНО",
      episodes: 8,
      desc: "Игроки узнают абсолютную правду. ASTRA-9 никогда не был ошибкой. Финальный выбор сообщества: уничтожить систему, захватить власть, спасти Astrella или позволить корпорациям создать новый мировой порядок.",
      color: "border-gray-900"
    }
  ];

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
          <Clapperboard className="w-3.5 h-3.5 text-red-500" />
          <span className="text-gray-300">ХРОНОЛОГИЯ СОБЫТИЙ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
          СЕЗОНЫ СЮЖЕТА
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          Глобальный сюжет Astrella развивается по сезонам, где действия игроков напрямую определяют, какие фракции выживут.
        </p>
      </div>

      {/* Grid view */}
      <div className="space-y-6">
        {seasons.map((season) => {
          const isCurrent = season.status === 'ТЕКУЩИЙ СЕЗОН';
          const isFinished = season.status === 'ЗАВЕРШЁН';

          return (
            <div 
              key={season.number}
              className={`p-6 md:p-8 rounded-lg border transition-all relative overflow-hidden backdrop-blur-sm ${
                season.color
              } ${
                isCurrent 
                  ? isBlackVeil ? 'bg-[#03090e]/90' : 'bg-[#0e0707]/90'
                  : 'bg-[#08080c]/80 hover:bg-[#0a0a0f]'
              }`}
            >
              {/* Top Accent background tag */}
              {isCurrent && (
                <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-mono font-bold tracking-widest ${
                  isBlackVeil ? 'bg-cyan-950 text-cyan-300 border-b border-l border-cyan-800' : 'bg-red-950 text-red-400 border-b border-l border-red-900'
                }`}>
                  АКТИВНАЯ СЮЖЕТНАЯ АРКА
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Info block */}
                <div className="lg:col-span-3">
                  <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    СЕЗОН 0{season.number}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold font-['Chakra_Petch'] text-gray-100 tracking-wide mt-1">
                    {season.title.split('—')[1] || season.title}
                  </h3>
                  <div className="text-xs font-mono text-red-500 mt-0.5">
                    {season.subtitle}
                  </div>

                  {/* Micro stat */}
                  <div className="mt-4 flex items-center gap-2 text-xs font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${
                      isFinished ? 'bg-gray-900 text-gray-400' :
                      isCurrent ? (isBlackVeil ? 'bg-cyan-950 text-cyan-400' : 'bg-red-950 text-red-400') :
                      'bg-gray-950 text-gray-600'
                    }`}>
                      {season.status}
                    </span>
                    <span className="text-gray-500">
                      {season.episodes} Эпизодов
                    </span>
                  </div>
                </div>

                {/* Description block */}
                <div className="lg:col-span-7">
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {season.desc}
                  </p>
                </div>

                {/* Action button */}
                <div className="lg:col-span-2 text-right lg:text-center">
                  {isFinished ? (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>АРХИВ</span>
                    </div>
                  ) : isCurrent ? (
                    <button
                      className={`w-full py-2.5 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider cursor-pointer flex items-center justify-center gap-1.5 ${
                        isBlackVeil 
                          ? 'bg-cyan-500 text-black hover:bg-cyan-400 glow-neon' 
                          : 'bg-red-600 text-white hover:bg-red-500 glow-red'
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>СВОДКА</span>
                    </button>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-600">
                      <Lock className="w-4 h-4" />
                      <span>ЗАКРЫТО</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Footer radio note */}
      <div className="mt-10 p-4 rounded-lg bg-[#0a0a0f] border border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-mono">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-red-500" />
          <span>Слушайте Astrella Emergency Network для получения сюжетных кодов</span>
        </div>
        <div className="text-gray-600">
          СЛЕДУЮЩЕЕ ГЛОБАЛЬНОЕ СОБЫТИЕ: ЧЕРЕЗ 14 ДНЕЙ
        </div>
      </div>
    </section>
  );
};

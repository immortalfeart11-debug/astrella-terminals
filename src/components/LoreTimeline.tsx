import React, { useState } from 'react';
import { Calendar, ShieldAlert, FileText, CheckCircle2, Lock, Unlock, HelpCircle } from 'lucide-react';

interface LoreTimelineProps {
  isBlackVeil: boolean;
}

export const LoreTimeline: React.FC<LoreTimelineProps> = ({ isBlackVeil }) => {
  const [activeItem, setActiveItem] = useState(0);

  const timelineData = [
    {
      year: "ПРЕДЫСТОРИЯ",
      title: "Золотая Эра San Andreas",
      official: "Штат San Andreas был самым богатым регионом США, центром передовых технологий, мирового туризма, развлечений и венчурного капитала.",
      secret: "За фасадом богатства скрывалась колоссальная коррупция, сращивание политической элиты с теневыми синдикатами и подготовка к полной передаче инфраструктуры в руки частных корпораций.",
      icon: CheckCircle2
    },
    {
      year: "ПРОЕКТ EDEN",
      title: "Разработка ASTRA-9",
      official: "HELIOS BIOTECH совместно с федеральными структурами начали разработку препарата ASTRA-9 для лечения ПТСР, депрессии и подавления неконтролируемой агрессии у ветеранов.",
      secret: "Истинная цель программы EDEN: создание биологического агента для абсолютного контроля поведения масс. Препарат подавлял волю, делая население полностью управляемым.",
      icon: FileText
    },
    {
      year: "ДЕНЬ НОЛЬ",
      title: "Утечка и Мутация",
      official: "Во время финальных клинических испытаний произошла трагическая авария в центральной лаборатории. Препарат ASTRA-9 попал в систему водоснабжения и мутировал.",
      secret: "Авария была спланирована. HELIOS BIOTECH намеренно инициировали выброс модифицированного штамма, чтобы протестировать скорость заражения и эффективность боевых мутаций в реальных условиях.",
      icon: ShieldAlert
    },
    {
      year: "КОЛЛАПС",
      title: "Падение Системы",
      official: "За несколько месяцев рухнула экономика, исчезла связь, начались массовые беспорядки. Правительство потеряло контроль, появились первые заражённые районы.",
      secret: "Отключение связи и саботаж инфраструктуры проводились силами ЧВК Vanguard Solutions по прямому заказу совета директоров HELIOS для создания контролируемого вакуума власти.",
      icon: Lock
    },
    {
      year: "ИЗОЛЯЦИЯ",
      title: "Карантинные Стены",
      official: "Федеральные власти перекрыли мосты, закрыли аэропорты и окружили штат армией. Построены бетонные стены. San Andreas официально переименован в закрытую зону Astrella.",
      secret: "Никого не выпускают не ради спасения остального мира. Жители Astrella стали пожизненным ресурсом для экспериментов. Армии дан приказ расстреливать любых беженцев.",
      icon: Lock
    },
    {
      year: "НАСТОЯЩЕЕ",
      title: "Рублёвая Экономика",
      official: "После краха доллара и изоляции, штат перешёл на наличный и цифровой Рубль (₽) через систему Astrella Central Exchange (ACE) для обеспечения базового выживания.",
      secret: "Система ACE тайно принадлежит HELIOS. Через контроль каждой транзакции в рублях они решают, кто получит доступ к еде, а кто будет отправлен на зачистку в Black Zones.",
      icon: HelpCircle
    }
  ];

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
          <Calendar className="w-3.5 h-3.5 text-red-500" />
          <span className="text-gray-300">ХРОНИКА КАТАСТРОФЫ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
          ИСТОРИЯ ПАДЕНИЯ
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          Как самый процветающий штат превратился в испытательный полигон. Выберите этап для изучения архивных записей.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Navigation */}
        <div className="lg:col-span-5 space-y-3">
          {timelineData.map((item, index) => {
            const isActive = activeItem === index;
            return (
              <div
                key={index}
                onClick={() => setActiveItem(index)}
                className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                  isActive 
                    ? isBlackVeil
                      ? 'bg-cyan-950/40 border-cyan-500/80 text-cyan-300 glow-neon'
                      : 'bg-red-950/40 border-red-600/80 text-red-400 glow-red'
                    : 'bg-[#0b0b0f] border-gray-900 hover:border-gray-800 text-gray-400'
                }`}
              >
                {isActive && (
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${
                    isBlackVeil ? 'bg-cyan-400' : 'bg-red-600'
                  }`}></div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-wider text-gray-500">
                    {item.year}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isActive 
                      ? isBlackVeil ? 'bg-cyan-900/60 text-cyan-300' : 'bg-red-900/60 text-red-300'
                      : 'bg-gray-900 text-gray-600'
                  }`}>
                    {isActive ? 'АКТИВНЫЙ ФАЙЛ' : 'АРХИВ'}
                  </span>
                </div>

                <h3 className={`text-base font-bold font-['Chakra_Petch'] mt-1 ${
                  isActive ? 'text-gray-100' : 'text-gray-300'
                }`}>
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Timeline Display / Dossier View */}
        <div className="lg:col-span-7">
          <div className={`p-6 md:p-8 rounded-lg border transition-all duration-500 relative backdrop-blur-sm ${
            isBlackVeil 
              ? 'bg-[#03090e]/90 border-cyan-500/40' 
              : 'bg-[#0c0a0b]/90 border-red-950'
          }`}>
            {/* Top decorative folder tab */}
            <div className={`absolute -top-3 left-6 px-3 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase ${
              isBlackVeil ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' : 'bg-red-950 text-red-500 border border-red-900'
            }`}>
              ДОСЬЕ // {timelineData[activeItem].year}
            </div>

            <div className="flex items-center justify-between border-b border-gray-800/80 pb-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold font-['Chakra_Petch'] text-gray-100">
                  {timelineData[activeItem].title}
                </h3>
                <div className="text-xs text-gray-500 font-mono mt-0.5">
                  ФАЙЛ СИСТЕМЫ БЕЗОПАСНОСТИ #00{activeItem + 1}
                </div>
              </div>

              <div className={`p-3 rounded-full ${
                isBlackVeil ? 'bg-cyan-950 text-cyan-400' : 'bg-red-950 text-red-500'
              }`}>
                {isBlackVeil ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
              </div>
            </div>

            {/* Content view */}
            <div className="space-y-6">
              {/* Official info */}
              <div>
                <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                  Официальная сводка (HELIOS / Власти США)
                </div>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed bg-gray-950/40 p-4 rounded border border-gray-900">
                  {timelineData[activeItem].official}
                </p>
              </div>

              {/* Secret override info */}
              <div>
                <div className={`text-[10px] font-mono uppercase tracking-wider mb-1 flex items-center gap-1.5 ${
                  isBlackVeil ? 'text-cyan-400 font-bold' : 'text-red-600/80'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isBlackVeil ? 'bg-cyan-400 glow-neon' : 'bg-red-600'}`}></span>
                  {isBlackVeil ? 'РАССЕКРЕЧЕННЫЕ ДАННЫЕ (BLACK VEIL OVERRIDE)' : 'СКРЫТЫЙ БЛОК ДАННЫХ (ТРЕБУЕТСЯ ВЗЛОМ)'}
                </div>

                <div className={`p-4 rounded border transition-all duration-500 ${
                  isBlackVeil 
                    ? 'bg-cyan-950/20 border-cyan-800/60 text-cyan-100' 
                    : 'bg-red-950/10 border-red-950/40 text-gray-500 select-none'
                }`}>
                  {isBlackVeil ? (
                    <p className="text-sm md:text-base leading-relaxed font-mono">
                      {timelineData[activeItem].secret}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-red-700/60 tracking-widest">
                        [ ДАННЫЕ ЗАШИФРОВАНЫ ПРОТОКОЛОРМ EDEN ]
                      </p>
                      <p className="text-sm blur-[3px] text-gray-600 select-none">
                        За фасадом богатства скрывалась колоссальная коррупция, сращивание политической элиты с теневыми синдикатами и подготовка к полной передаче инфраструктуры.
                      </p>
                      <div className="pt-1 flex items-center gap-2 text-[10px] text-red-500 font-mono">
                        <span>Включите переключатель BLACK VEIL вверху для декодирования</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom metadata */}
            <div className="mt-8 pt-4 border-t border-gray-800/60 flex items-center justify-between text-[10px] text-gray-500 font-mono">
              <span>ИСТОЧНИК: СЕРВЕРЫ АРХИВА ACE</span>
              <span>СТАТУС: {isBlackVeil ? 'ДЕКОДИРОВАНО' : 'ОГРАНИЧЕННЫЙ ДОСТУП'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

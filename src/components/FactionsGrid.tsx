import React, { useState } from 'react';
import { Users, Shield, Briefcase, Skull, User } from 'lucide-react';

interface FactionsGridProps {
  isBlackVeil: boolean;
}

export const FactionsGrid: React.FC<FactionsGridProps> = ({ isBlackVeil }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Все Фракции', icon: Users },
    { id: 'state', label: 'Госструктуры', icon: Shield },
    { id: 'corps', label: 'Корпорации', icon: Briefcase },
    { id: 'crime', label: 'Криминал', icon: Skull },
    { id: 'civs', label: 'Выжившие', icon: User },
  ];

  const factions = [
    // STATE
    {
      id: 'ang',
      name: 'ASTRELLA NATIONAL GUARD (ANG)',
      category: 'state',
      type: 'Военные силы',
      goals: 'Удержание карантина, уничтожение заражённых, подавление беспорядков.',
      details: 'Остатки армии США и нацгвардии. Внутри процветает коррупция, раскол и нелегальная торговля оружием. Некоторые генералы считают, что единственный выход — полная ковровая бомбардировка штата.',
      color: 'border-green-600',
      bg: 'bg-green-950/20'
    },
    {
      id: 'dcs',
      name: 'DEPARTMENT OF CIVIL SECURITY (DCS)',
      category: 'state',
      type: 'Тайная полиция',
      goals: 'Тотальный контроль, слежка за населением, устранение неугодных свидетелей.',
      details: 'Главная силовая структура с безграничными полномочиями. Контролируют выдачу пропусков и цифровые ключи доступа. Их боятся даже высшие офицеры регулярной армии.',
      color: 'border-red-700',
      bg: 'bg-red-950/20'
    },
    {
      id: 'apd',
      name: 'ASTRELLA POLICE DEPARTMENT (APD)',
      category: 'state',
      type: 'Правоохранители',
      goals: 'Попытки сохранить остатки закона в Safe Zones.',
      details: 'Полиция находится на грани полного развала. Часть офицеров искренне пытается спасти город и мирных жителей, в то время как другая половина работает на картели. Внутри APD идёт скрытая гражданская война.',
      color: 'border-blue-600',
      bg: 'bg-blue-950/20'
    },
    {
      id: 'ama',
      name: 'ASTRELLA MEDICAL AUTHORITY (AMA)',
      category: 'state',
      type: 'Медицинский регулятор',
      goals: 'Официально: создание вакцины. Неофициально: тестирование био-оружия.',
      details: 'Главная медицинская организация. Тесно связана с HELIOS. Проводят жестокие эксперименты над инфицированными и задержанными сталкерами.',
      color: 'border-cyan-600',
      bg: 'bg-cyan-950/20'
    },

    // CORPS
    {
      id: 'helios',
      name: 'HELIOS BIOTECH',
      category: 'corps',
      type: 'Фармацевтический гигант',
      goals: 'Создание нового мирового порядка через управляемый хаос.',
      details: 'Главные виновники катастрофы. Контролируют сеть лабораторий, финансовую систему ACE, политиков и часть высшего командования армии. Для них Astrella — гигантская чашка Петри.',
      color: 'border-purple-600',
      bg: 'bg-purple-950/20'
    },
    {
      id: 'nova',
      name: 'NOVA INDUSTRIES',
      category: 'corps',
      type: 'Оружейный синдикат',
      goals: 'Извлечение максимальной прибыли из непрерывных боевых действий.',
      details: 'Производят боевые дроны, тяжелую бронетехнику, карантинное оборудование и высокотехнологичное вооружение. Им абсолютно не выгодно окончание эпидемии.',
      color: 'border-amber-600',
      bg: 'bg-amber-950/20'
    },
    {
      id: 'vanguard',
      name: 'VANGUARD SOLUTIONS',
      category: 'corps',
      type: 'Частная военная компания',
      goals: 'Выполнение контрактов любой степени жестокости за рубли и токены.',
      details: 'Состоит из бывших бойцов спецназа, профессиональных наёмников и ветеранов горячих точек. Прекрасно экипированы. Работают на того, кто больше платит.',
      color: 'border-gray-500',
      bg: 'bg-gray-950/40'
    },

    // CRIME
    {
      id: 'muertos',
      name: 'LOS MUERTOS CARTEL',
      category: 'crime',
      type: 'Наркосиндикат',
      goals: 'Контроль чёрного рынка, поставок еды, оружия и подпольных вакцин.',
      details: 'Самый могущественный картель Astrella. Научились использовать инфицированных BROKEN как живое биологическое оружие, натравливая их на блокпосты конкурентов.',
      color: 'border-yellow-600',
      bg: 'bg-yellow-950/20'
    },
    {
      id: 'veil',
      name: 'BLACK VEIL',
      category: 'crime',
      type: 'Теневая сеть',
      goals: 'Раскрытие правды об EDEN, саботаж HELIOS, торговля секретами.',
      details: 'Подпольная сеть хакеров, профессиональных убийц и информаторов. Они знают, что катастрофа была спланирована. Часто перехватывают радиоэфир AEN.',
      color: 'border-cyan-400',
      bg: 'bg-cyan-950/30'
    },
    {
      id: 'jackals',
      name: 'IRON JACKALS',
      category: 'crime',
      type: 'Военизированная банда',
      goals: 'Создание независимого государства на руинах пустошей.',
      details: 'Банда дезертиров и бывших военных. Контролируют пустыню, захваченные склады армии и старые базы. Не признают власть ни корпораций, ни федералов.',
      color: 'border-orange-600',
      bg: 'bg-orange-950/20'
    },
    {
      id: 'gangs',
      name: 'STREET GANGS',
      category: 'crime',
      type: 'Разрозненные группировки',
      goals: 'Выживание, мародёрство, контроль отдельных улиц.',
      details: 'После падения системы город разделили рейдеры, мародёры, культы и банды выживших. Каждый район живёт по своим жестоким законам.',
      color: 'border-red-900',
      bg: 'bg-red-950/10'
    },

    // CIVS
    {
      id: 'civilians',
      name: 'ГРАЖДАНСКИЕ',
      category: 'civs',
      type: 'Мирное население',
      goals: 'Попытки выжить в условиях дефицита, высоких цен и террора.',
      details: 'Беженцы, медики, механики, торговцы, журналисты. Большинство просто пытаются свести концы с концами, зарабатывая рубли на еду и чистую воду.',
      color: 'border-stone-600',
      bg: 'bg-stone-950/20'
    },
    {
      id: 'stalkers',
      name: 'СТАЛКЕРЫ',
      category: 'civs',
      type: 'Исследователи зон',
      goals: 'Поиск редких лекарств, технологий, оружия и архивов EDEN.',
      details: 'Отчаянные люди, совершающие вылазки в заражённые Black Zones. Смертность среди них колоссальная, но одна удачная находка может обеспечить безбедную жизнь в Safe Zone.',
      color: 'border-emerald-600',
      bg: 'bg-emerald-950/20'
    }
  ];

  const filteredFactions = activeCategory === 'all' 
    ? factions 
    : factions.filter(f => f.category === activeCategory);

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
          <Users className="w-3.5 h-3.5 text-red-500" />
          <span className="text-gray-300">РАССКЛАД СИЛ В ШТАТЕ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
          ФРАКЦИИ И КОРПОРАЦИИ
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          В условиях изоляции власть принадлежит тем, у кого есть оружие, доступ к вакцинам или неограниченные запасы рублей.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-xs font-['Chakra_Petch'] font-bold tracking-wider transition-all cursor-pointer ${
                isActive 
                  ? isBlackVeil 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 glow-neon' 
                    : 'bg-red-950 text-red-400 border border-red-700 glow-red'
                  : 'bg-[#0a0a0f] text-gray-400 border border-gray-900 hover:border-gray-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dossiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFactions.map((faction) => (
          <div 
            key={faction.id}
            className={`rounded-lg border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
              faction.bg
            } ${faction.color} ${
              isBlackVeil ? 'hover:border-cyan-400' : 'hover:border-red-500'
            } bg-[#08080c]/80 backdrop-blur-xs`}
          >
            <div>
              {/* Top metadata */}
              <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mb-3 border-b border-gray-900 pb-2">
                <span className="uppercase tracking-widest">{faction.type}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                  faction.category === 'state' ? 'bg-green-950/80 text-green-400' :
                  faction.category === 'corps' ? 'bg-purple-950/80 text-purple-400' :
                  faction.category === 'crime' ? 'bg-red-950/80 text-red-400' :
                  'bg-gray-900 text-gray-300'
                }`}>
                  {faction.category.toUpperCase()}
                </span>
              </div>

              <h3 className="text-lg font-bold font-['Chakra_Petch'] text-gray-100 tracking-wide mb-3">
                {faction.name}
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-gray-500 block mb-0.5">ЦЕЛИ И ЗАДАЧИ:</span>
                  <p className="text-gray-200 font-medium">
                    {faction.goals}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-gray-500 block mb-0.5">ВНУТРЕННЯЯ СВОДКА:</span>
                  <p className="text-gray-400 leading-relaxed">
                    {faction.details}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer status */}
            <div className="mt-6 pt-3 border-t border-gray-900/80 flex items-center justify-between text-[10px] font-mono text-gray-500">
              <span>УРОВЕНЬ ВЛИЯНИЯ</span>
              <span className={`font-bold ${
                faction.id === 'helios' || faction.id === 'dcs' || faction.id === 'muertos' 
                  ? 'text-red-500' 
                  : 'text-gray-400'
              }`}>
                {faction.id === 'helios' || faction.id === 'dcs' || faction.id === 'muertos' 
                  ? 'КРИТИЧЕСКИЙ' 
                  : 'ВЫСОКИЙ'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { DollarSign, Database, Check, Terminal } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  price: number;
  category: 'food' | 'weapons' | 'transport';
  desc: string;
}

interface AceExchangeProps {
  rubles: number;
  setRubles: React.Dispatch<React.SetStateAction<number>>;
  inventory: string[];
  setInventory: React.Dispatch<React.SetStateAction<string[]>>;
  isBlackVeil: boolean;
}

export const AceExchange: React.FC<AceExchangeProps> = ({
  rubles,
  setRubles,
  inventory,
  setInventory,
  isBlackVeil
}) => {
  const [activeCategory, setActiveCategory] = useState<'food' | 'weapons' | 'transport'>('food');
  
  // Hack game states
  const [hackActive, setHackActive] = useState(false);
  const [hackCode, setHackCode] = useState('');
  const [targetCode, setTargetCode] = useState('HELIOS');
  const [hackResult, setHackResult] = useState<string | null>(null);
  const [hackReward, setHackReward] = useState<number>(0);

  const items: Item[] = [
    // FOOD
    { id: 'water', name: 'Чистая Вода (0.5л)', price: 120, category: 'food', desc: 'Очищена от спор ASTRA-9. Базовый ресурс для выживания.' },
    { id: 'cans', name: 'Армейские Консервы', price: 350, category: 'food', desc: 'Сухой паёк Нацгвардии. Срок годности истёк 2 года назад, но съедобно.' },
    { id: 'gas', name: 'Бензин (1 Литр)', price: 450, category: 'food', desc: 'Топливо для генераторов и старых автомобилей. На вес золота.' },
    { id: 'medkit', name: 'Аптечка AMA', price: 2500, category: 'food', desc: 'Содержит антибиотики, бинты и стимуляторы для подавления первой стадии мутации.' },

    // WEAPONS
    { id: 'pistol', name: 'Пистолет 9мм', price: 45000, category: 'weapons', desc: 'Стандартное оружие самообороны. Эффективно только против людей и на ранних стадиях.' },
    { id: 'shotgun', name: 'Помповый Дробовик', price: 90000, category: 'weapons', desc: 'Идеально для остановки агрессивных BROKEN на близкой дистанции.' },
    { id: 'vest', name: 'Бронежилет DCS', price: 95000, category: 'weapons', desc: 'Кевларовая защита от пистолетных пуль и укусов.' },
    { id: 'rifle', name: 'Штурмовой Автомат', price: 180000, category: 'weapons', desc: 'Контрабандное армейское оружие. Позволяет вести бой на средних дистанциях.' },

    // TRANSPORT
    { id: 'sedan', name: 'Старый Седан', price: 350000, category: 'transport', desc: 'Ржавый гражданский автомобиль. Часто ломается, но позволяет быстро пересечь сектора.' },
    { id: 'suv', name: 'Усиленный SUV', price: 1200000, category: 'transport', desc: 'Внедорожник с решётками на окнах. Способен прорвать лёгкие заграждения рейдеров.' },
    { id: 'apc', name: 'Бронированный Транспорт', price: 8000000, category: 'transport', desc: 'Списанный БТР Нацгвардии. Обеспечивает абсолютную защиту от толп BROKEN.' },
    { id: 'heli', name: 'Вертолёт Нацгвардии', price: 45000000, category: 'transport', desc: 'Единственный способ покинуть штат по воздуху, минуя карантинные стены.' },
  ];

  const filteredItems = items.filter(item => item.category === activeCategory);

  const handleBuy = (item: Item) => {
    if (rubles >= item.price) {
      setRubles(prev => prev - item.price);
      setInventory(prev => [...prev, item.id]);
    }
  };

  // Cyber Hack Trigger
  const startHack = () => {
    const codes = ['HELIOS', 'EDEN42', 'ASTRA9', 'BROKEN', 'RUBLES', 'SECURE'];
    const randomCode = codes[Math.floor(Math.random() * codes.length)];
    setTargetCode(randomCode);
    setHackCode('');
    setHackResult(null);
    setHackActive(true);
  };

  const submitHack = (e: React.FormEvent) => {
    e.preventDefault();
    if (hackCode.trim().toUpperCase() === targetCode) {
      // Success! Earn between 15,000 and 85,000 Rubles
      const reward = Math.floor(Math.random() * 70000) + 15000;
      setRubles(prev => prev + reward);
      setHackReward(reward);
      setHackResult('SUCCESS');
    } else {
      setHackResult('FAILED');
    }
    setTimeout(() => {
      setHackActive(false);
    }, 2500);
  };

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
          <DollarSign className="w-3.5 h-3.5 text-red-500" />
          <span className="text-gray-300">ФИНАНСОВАЯ СИСТЕМА ACE</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
          РУБЛЁВАЯ ЭКОНОМИКА (₽)
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          После коллапса мировой финансовой системы доллар стал мусором. Официальная валюта Astrella — <strong className="text-gray-200">РУБЛЬ ₽</strong>.
        </p>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Marketplace Catalog */}
        <div className="lg:col-span-8">
          <div className={`p-6 rounded-lg border backdrop-blur-sm ${
            isBlackVeil 
              ? 'bg-[#03070a]/90 border-cyan-500/40' 
              : 'bg-[#0b0707]/90 border-red-950'
          }`}>
            
            {/* Category selection */}
            <div className="flex border-b border-gray-900 pb-4 mb-6 gap-2 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveCategory('food')}
                className={`px-4 py-2 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider cursor-pointer ${
                  activeCategory === 'food' 
                    ? isBlackVeil ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-red-950 text-red-400 border border-red-700'
                    : 'bg-gray-950 text-gray-500 hover:text-gray-300'
                }`}
              >
                ЕДА И РЕСУРСЫ
              </button>

              <button
                onClick={() => setActiveCategory('weapons')}
                className={`px-4 py-2 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider cursor-pointer ${
                  activeCategory === 'weapons' 
                    ? isBlackVeil ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-red-950 text-red-400 border border-red-700'
                    : 'bg-gray-950 text-gray-500 hover:text-gray-300'
                }`}
              >
                ОРУЖИЕ И БРОНЯ
              </button>

              <button
                onClick={() => setActiveCategory('transport')}
                className={`px-4 py-2 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider cursor-pointer ${
                  activeCategory === 'transport' 
                    ? isBlackVeil ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-red-950 text-red-400 border border-red-700'
                    : 'bg-gray-950 text-gray-500 hover:text-gray-300'
                }`}
              >
                ТРАНСПОРТ
              </button>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const isOwned = inventory.includes(item.id);
                const canAfford = rubles >= item.price;

                return (
                  <div 
                    key={item.id}
                    className={`p-4 rounded border flex flex-col justify-between transition-all ${
                      isOwned 
                        ? 'bg-green-950/10 border-green-900/50' 
                        : 'bg-[#0f0e13] border-gray-900 hover:border-gray-800'
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold font-['Chakra_Petch'] text-gray-100">
                          {item.name}
                        </h4>
                        {isOwned && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 bg-green-950 text-green-400 rounded flex items-center gap-0.5">
                            <Check className="w-2.5 h-2.5" /> КУПЛЕНО
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-gray-900/80 flex items-center justify-between">
                      <div className="font-mono text-xs font-bold text-gray-200">
                        {item.price.toLocaleString('ru-RU')} <span className="text-red-500">₽</span>
                      </div>

                      <button
                        onClick={() => handleBuy(item)}
                        disabled={isOwned || !canAfford}
                        className={`px-3 py-1.5 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider transition-all cursor-pointer ${
                          isOwned 
                            ? 'bg-gray-900 text-gray-600 cursor-default' 
                            : canAfford 
                              ? isBlackVeil 
                                ? 'bg-cyan-500 hover:bg-cyan-400 text-black glow-neon' 
                                : 'bg-red-600 hover:bg-red-500 text-white glow-red'
                              : 'bg-gray-950 text-gray-600 border border-gray-900 cursor-not-allowed'
                        }`}
                      >
                        {isOwned ? 'В ИНВЕНТАРЕ' : canAfford ? 'КУПИТЬ' : 'НЕДОСТАТОЧНО ₽'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Currency details notes */}
            <div className="mt-8 pt-4 border-t border-gray-900 flex flex-col sm:flex-row justify-between gap-4 text-xs text-gray-500 font-mono">
              <div>
                <span className="text-gray-300 block font-bold">BLACK RUBLES:</span>
                <span>Используются картелями и наёмниками на теневых аукционах.</span>
              </div>
              <div>
                <span className="text-gray-300 block font-bold">ACCESS TOKENS:</span>
                <span>Пропуска и цифровые ключи. Иногда стоят дороже денег.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right column: User Account & Hacking Mini-game */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Balance Card */}
          <div className={`p-6 rounded-lg border relative overflow-hidden ${
            isBlackVeil 
              ? 'bg-[#03090e] border-cyan-500/40 text-cyan-100' 
              : 'bg-[#0d0909] border-red-950 text-red-100'
          }`}>
            <div className="absolute top-0 right-0 bg-gray-900 text-gray-500 text-[9px] px-2 py-0.5 font-mono">
              SECURE ID: ACE-9941
            </div>

            <div className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-1">
              Ваш Цифровой Счёт ACE
            </div>

            <div className="text-3xl font-bold font-mono tracking-wider text-gray-100 my-2">
              {rubles.toLocaleString('ru-RU')} <span className={isBlackVeil ? "text-cyan-400" : "text-red-500"}>₽</span>
            </div>

            <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
              Слухи говорят, что система ACE тайно принадлежит <strong className="text-gray-200">HELIOS BIOTECH</strong>. Все переводы отслеживаются.
            </p>

            {/* User inventory icons list */}
            <div>
              <div className="text-[10px] font-mono text-gray-500 uppercase mb-2">
                Ваш Инвентарь ({inventory.length}):
              </div>

              {inventory.length === 0 ? (
                <div className="text-xs text-gray-600 font-mono italic">
                  Пусто. Купите ресурсы или оружие для выживания.
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {inventory.map((itemId, idx) => {
                    const itemObj = items.find(i => i.id === itemId);
                    return (
                      <span 
                        key={idx} 
                        className="px-2 py-1 bg-gray-950 rounded border border-gray-800 text-[10px] font-mono text-gray-300"
                        title={itemObj?.name}
                      >
                        {itemObj?.name || itemId}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Stalker Hacking Mini-game */}
          <div className="p-6 rounded-lg border bg-[#0a0a0f] border-gray-850 relative">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-300 mb-2">
              <Terminal className="w-4 h-4 text-green-500" />
              <span>ТЕРМИНАЛ СТАЛКЕРА // ВЗЛОМ ДАННЫХ</span>
            </div>

            <p className="text-xs text-gray-400 mb-4">
              Перехватывайте зашифрованные пакеты данных программы <span className="text-red-500 font-bold">EDEN</span> и продавайте их на чёрном рынке за рубли!
            </p>

            {!hackActive ? (
              <button
                onClick={startHack}
                className="w-full py-3 rounded bg-gray-900 hover:bg-gray-800 border border-gray-700 text-xs font-['Chakra_Petch'] font-bold tracking-widest text-gray-200 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Database className="w-3.5 h-3.5 text-red-500" />
                <span>НАЧАТЬ ПЕРЕХВАТ ДАННЫХ</span>
              </button>
            ) : (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-3 rounded bg-black border border-gray-800 text-center">
                  <div className="text-[10px] text-gray-500 font-mono">ЦЕЛЕВОЙ КЛЮЧ РАСШИФРОВКИ:</div>
                  <div className="text-lg font-mono font-bold text-green-400 tracking-widest select-none mt-0.5">
                    {targetCode}
                  </div>
                </div>

                <form onSubmit={submitHack} className="space-y-2">
                  <div>
                    <label className="text-[10px] font-mono text-gray-400 block mb-1">
                      ВВЕДИТЕ КЛЮЧ ДЛЯ ПОДТВЕРЖДЕНИЯ:
                    </label>
                    <input
                      type="text"
                      value={hackCode}
                      onChange={(e) => setHackCode(e.target.value)}
                      placeholder="Ввод кода..."
                      className="w-full bg-black border border-gray-700 rounded p-2 text-xs font-mono text-center text-gray-100 focus:outline-hidden focus:border-green-500 uppercase"
                      autoFocus
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-green-950 hover:bg-green-900 border border-green-700 text-green-400 rounded text-xs font-mono font-bold tracking-wider cursor-pointer"
                  >
                    ВЗЛОМАТЬ // ПОЛУЧИТЬ ₽
                  </button>
                </form>

                {hackResult && (
                  <div className={`p-2 rounded text-center text-xs font-mono font-bold ${
                    hackResult === 'SUCCESS' ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'
                  }`}>
                    {hackResult === 'SUCCESS' ? (
                      <span>УСПЕХ! Зачислено: +{hackReward.toLocaleString('ru-RU')} ₽</span>
                    ) : (
                      <span>ОШИБКА ДОСТУПА! СИГНАЛ УТЕРЯН</span>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-gray-900 text-[10px] text-gray-500 font-mono text-center">
              Шанс перехвата: 100% при верном вводе. Лимит не установлен.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

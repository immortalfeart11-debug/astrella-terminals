import React, { useState } from 'react';
import { UserCheck, Shield, Award, RefreshCw, QrCode } from 'lucide-react';

interface RoleSimulatorProps {
  isBlackVeil: boolean;
}

export const RoleSimulator: React.FC<RoleSimulatorProps> = ({ isBlackVeil }) => {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [playerName, setPlayerName] = useState<string>('');

  const questions = [
    {
      title: "ВОПРОС 1: ПЕРВЫЙ КОНТАКТ",
      desc: "Вы находите заброшенный военный грузовик с медикаментами на границе Yellow Zone. Рядом лежит раненый офицер Нацгвардии. Ваши действия?",
      options: [
        { text: "Помочь офицеру, надеясь получить легальный пропуск и рубли от властей.", val: 1 }, // State
        { text: "Забрать медикаменты и добить офицера, чтобы продать всё на чёрном рынке.", val: 2 }, // Crime/Cartel
        { text: "Взять только необходимое для себя и скрыться до прибытия патрулей.", val: 3 }, // Stalker
        { text: "Изучить маркировку груза. Если это HELIOS — передать координаты сети Black Veil.", val: 4 } // Veil/Rebel
      ]
    },
    {
      title: "ВОПРОС 2: ФИНАНСОВЫЙ КРИЗИС",
      desc: "Цены на чистую воду взлетели. У вас осталась последняя тысяча рублей. Как вы обеспечите себя?",
      options: [
        { text: "Пойду работать на официальные склады ACE или вступлю в ряды полиции.", val: 1 },
        { text: "Соберу банду и начну облагать данью мелких торговцев в своём районе.", val: 2 },
        { text: "Куплю фильтры и отправлюсь в опасные зоны искать природные источники.", val: 3 },
        { text: "Взломаю терминал распределения воды, чтобы обеспечить свой сектор бесплатно.", val: 4 }
      ]
    },
    {
      title: "ВОПРОС 3: ОТНОШЕНИЕ К BROKEN",
      desc: "Во время рейда вы сталкиваетесь с инфицированным на первой стадии (Stage 1). Это ваш бывший сосед. Он просит дозу ASTRA-9.",
      options: [
        { text: "Сдам его патрулю Департамента Гражданской Безопасности (DCS) для изоляции.", val: 1 },
        { text: "Использую его как приманку для зачистки территории от конкурентов.", val: 2 },
        { text: "Потрачу свою аптечку, чтобы попытаться замедлить его мутацию.", val: 3 },
        { text: "Расскажу ему правду об экспериментах HELIOS и дам оружие для мести.", val: 4 }
      ]
    }
  ];

  const handleAnswer = (val: number) => {
    setAnswers([...answers, val]);
    setStep(step + 1);
  };

  const resetSimulator = () => {
    setStep(0);
    setAnswers([]);
    setPlayerName('');
  };

  // Compute Archetype
  const getArchetype = () => {
    const counts = [0, 0, 0, 0, 0];
    answers.forEach(a => counts[a]++);
    
    // Find max
    let maxIdx = 1;
    let maxVal = counts[1];
    for (let i = 2; i <= 4; i++) {
      if (counts[i] > maxVal) {
        maxVal = counts[i];
        maxIdx = i;
      }
    }

    if (maxIdx === 1) {
      return {
        role: "ОФИЦЕР / АГЕНТ ВЛАСТЕЙ",
        faction: "DCS / ANG",
        tier: "Tier-1 Pass (Официальный)",
        desc: "Вы выбрали путь порядка и силы. В мире Astrella вы станете частью системы, контролирующей карантин. Ваши методы суровы, но они обеспечивают выживание Safe Zones.",
        perk: "Скидка 20% на легальное оружие и бесплатный проход через южные КПП.",
        color: "border-red-700 text-red-500",
        bg: "bg-red-950/20"
      };
    } else if (maxIdx === 2) {
      return {
        role: "ЛИДЕР КАРТЕЛЯ",
        faction: "Los Muertos / Рейдеры",
        tier: "Black Market Token",
        desc: "Карантин изменил вас. Вы поняли, что закон мёртв, и выживает тот, кто диктует свои правила. Вы контролируете теневые поставки и не боитесь использовать любые методы.",
        perk: "Доступ к Black Rubles и возможность нанимать отряды наёмников.",
        color: "border-yellow-600 text-yellow-500",
        bg: "bg-yellow-950/20"
      };
    } else if (maxIdx === 3) {
      return {
        role: "СТАЛКЕР-ОДИНОЧКА",
        faction: "Нейтрал / Выжившие",
        tier: "Tier-2 Pass (Свободный)",
        desc: "Вы не доверяете ни корпорациям, ни бандитам. Ваш дом — пустоши и заброшенные лаборатории. Вы знаете тайные тропы и умеете выживать там, где другие гибнут за часы.",
        perk: "Удвоенный шанс найти редкие архивы EDEN и иммунизирующие стимуляторы.",
        color: "border-emerald-600 text-emerald-500",
        bg: "bg-emerald-950/20"
      };
    } else {
      return {
        role: "АГЕНТ BLACK VEIL",
        faction: "Black Veil / Сопротивление",
        tier: "Омега-Доступ (Взлом)",
        desc: "Вы узнали правду. Эпидемия — это спланированный эксперимент. Ваша цель — разрушить планы HELIOS BIOTECH и открыть миру глаза, перехватывая радиоэфиры.",
        perk: "Абсолютный доступ к зашифрованным базам данных и поддержка хакеров.",
        color: "border-cyan-400 text-cyan-300",
        bg: "bg-cyan-950/30"
      };
    }
  };

  return (
    <section className="py-12 md:py-20 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gray-900 border border-gray-800 text-xs font-mono mb-3">
          <UserCheck className="w-3.5 h-3.5 text-red-500" />
          <span className="text-gray-300">РОЛЕВАЯ СИСТЕМА</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold font-['Chakra_Petch'] tracking-wider text-gray-100">
          КЕМ ТЫ СТАНЕШЬ В ASTRELLA?
        </h2>
        <p className="text-xs md:text-sm text-gray-400 mt-2">
          Пройдите тест на выживание, чтобы получить свой официальный цифровой <strong className="text-gray-200">ID Пропуск ACE</strong> и узнать свою фракцию.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        
        {/* Step 0: Enter Name */}
        {step === 0 && (
          <div className={`p-8 rounded-lg border text-center backdrop-blur-sm ${
            isBlackVeil 
              ? 'bg-[#03090e]/90 border-cyan-500/40' 
              : 'bg-[#0a0606]/90 border-red-950'
          }`}>
            <Shield className={`w-12 h-12 mx-auto mb-4 ${isBlackVeil ? 'text-cyan-400' : 'text-red-600'}`} />
            
            <h3 className="text-xl font-bold font-['Chakra_Petch'] text-gray-100 mb-2">
              РЕГИСТРАЦИЯ В БАЗЕ ACE
            </h3>
            
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
              Введите ваш позывной или имя для кодирования в защищённый реестр Департамента Гражданской Безопасности.
            </p>

            <div className="max-w-sm mx-auto space-y-4">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Позывной (например: STALKER-07)..."
                className="w-full bg-black border border-gray-800 rounded p-3 text-sm font-mono text-center text-gray-100 focus:outline-hidden focus:border-red-600"
                maxLength={20}
              />

              <button
                onClick={() => setStep(1)}
                disabled={!playerName.trim()}
                className={`w-full py-3 rounded font-['Chakra_Petch'] font-bold text-xs tracking-widest uppercase transition-all cursor-pointer ${
                  playerName.trim() 
                    ? isBlackVeil 
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black glow-neon' 
                      : 'bg-red-600 hover:bg-red-500 text-white glow-red'
                    : 'bg-gray-900 text-gray-600 cursor-not-allowed'
                }`}
              >
                НАЧАТЬ ТЕСТИРОВАНИЕ
              </button>
            </div>
          </div>
        )}

        {/* Steps 1-3: Questions */}
        {step > 0 && step <= questions.length && (
          <div className={`p-6 md:p-8 rounded-lg border backdrop-blur-sm ${
            isBlackVeil 
              ? 'bg-[#03090e]/90 border-cyan-500/40' 
              : 'bg-[#0a0606]/90 border-red-950'
          }`}>
            
            {/* Progress header */}
            <div className="flex justify-between items-center text-xs font-mono text-gray-500 border-b border-gray-900 pb-3 mb-6">
              <span>ПОЗЫВной: <strong className="text-gray-200">{playerName.toUpperCase()}</strong></span>
              <span>ВОПРОС {step} ИЗ {questions.length}</span>
            </div>

            <h3 className="text-lg font-bold font-['Chakra_Petch'] text-gray-100 mb-2">
              {questions[step-1].title}
            </h3>

            <p className="text-sm text-gray-300 mb-8 leading-relaxed bg-black/40 p-3 rounded border border-gray-900">
              {questions[step-1].desc}
            </p>

            {/* Options */}
            <div className="space-y-3">
              {questions[step-1].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(opt.val)}
                  className={`w-full text-left p-4 rounded border transition-all duration-200 cursor-pointer flex items-start gap-3 ${
                    isBlackVeil 
                      ? 'bg-[#050d14] border-cyan-950 hover:border-cyan-500 text-gray-300 hover:text-cyan-100' 
                      : 'bg-[#0e0a0b] border-red-950 hover:border-red-700 text-gray-300 hover:text-red-100'
                  }`}
                >
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                    isBlackVeil ? 'bg-cyan-950 text-cyan-400' : 'bg-red-950 text-red-500'
                  }`}>
                    0{idx+1}
                  </span>
                  <span className="text-xs md:text-sm leading-relaxed">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

          </div>
        )}

        {/* Step 4: Result ID Pass */}
        {step > questions.length && (() => {
          const result = getArchetype();
          return (
            <div className="space-y-6 animate-fadeIn">
              
              {/* The ID Card */}
              <div className={`p-6 md:p-8 rounded-xl border-2 shadow-2xl relative overflow-hidden ${
                result.bg
              } ${result.color} bg-[#06060a]`}>
                
                {/* Background watermark */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
                  <QrCode className="w-64 h-64 text-current" />
                </div>

                {/* Top header */}
                <div className="flex justify-between items-start border-b border-current/20 pb-4 mb-6">
                  <div>
                    <div className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                      ASTRELLA CENTRAL EXCHANGE // DIGITAL ID
                    </div>
                    <div className="text-xl font-bold font-['Chakra_Petch'] text-gray-100 tracking-wider">
                      ПРОПУСК СИСТЕМЫ БЕЗОПАСНОСТИ
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="px-2 py-0.5 bg-current text-black font-mono text-[10px] font-bold rounded">
                      АКТИВЕН
                    </span>
                    <div className="text-[9px] font-mono text-gray-500 mt-1">
                      ID: {Math.floor(Math.random() * 89000) + 10000}
                    </div>
                  </div>
                </div>

                {/* Main Pass Content */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
                  
                  {/* Left avatar block */}
                  <div className="sm:col-span-1 bg-black/60 p-4 rounded border border-current/20 text-center space-y-2">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gray-900 border border-current flex items-center justify-center">
                      <Award className="w-10 h-10 text-current" />
                    </div>
                    <div className="text-xs font-mono font-bold text-gray-200 truncate">
                      {playerName.toUpperCase() || 'СТалкер'}
                    </div>
                    <div className="text-[9px] text-gray-500 font-mono">
                      ГРАЖДАНИН АСТРЕЛЛЫ
                    </div>
                  </div>

                  {/* Right stats block */}
                  <div className="sm:col-span-2 space-y-3">
                    
                    <div>
                      <span className="text-[10px] font-mono text-gray-500 block">КЛАССИФИКАЦИЯ / РОЛЬ:</span>
                      <span className="text-lg font-bold font-['Chakra_Petch'] text-gray-100 tracking-wide">
                        {result.role}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 block">ФРАКЦИЯ:</span>
                        <span className="text-xs font-mono font-bold text-gray-200">{result.faction}</span>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-gray-500 block">УРОВЕНЬ ДОСТУПА:</span>
                        <span className="text-xs font-mono font-bold text-current">{result.tier}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-gray-500 block">ПРОФИЛЬ ВЫЖИВАНИЯ:</span>
                      <p className="text-xs text-gray-300 leading-relaxed">
                        {result.desc}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Footer perk & barcode */}
                <div className="mt-6 pt-4 border-t border-current/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono text-gray-400 block font-bold">УНИКАЛЬНЫЙ БОНУС:</span>
                    <span className="text-xs text-gray-200">{result.perk}</span>
                  </div>

                  {/* Simulated Barcode */}
                  <div className="shrink-0 text-center">
                    <div className="font-mono text-lg tracking-tighter text-gray-400 select-none">
                      ||| | |||| || | || |||
                    </div>
                    <span className="text-[8px] font-mono text-gray-600 block -mt-1">
                      AUTH_HASH_ACE_2026
                    </span>
                  </div>
                </div>

              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={resetSimulator}
                  className="px-6 py-2.5 rounded bg-gray-900 hover:bg-gray-800 text-xs font-mono text-gray-300 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>ПРОЙТИ ЗАНОВО</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className={`px-6 py-2.5 rounded text-xs font-['Chakra_Petch'] font-bold tracking-wider cursor-pointer ${
                    isBlackVeil 
                      ? 'bg-cyan-500 text-black hover:bg-cyan-400 glow-neon' 
                      : 'bg-red-600 text-white hover:bg-red-500 glow-red'
                  }`}
                >
                  СОХРАНИТЬ / ПЕЧАТЬ ID
                </button>
              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
};

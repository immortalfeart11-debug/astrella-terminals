import React, { useState, useEffect } from 'react';
import { ShieldAlert, Terminal, Lock, Key, Database } from 'lucide-react';

interface TerminalLoaderProps {
  onComplete: () => void;
}

export const TerminalLoader: React.FC<TerminalLoaderProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [accessGranted, setAccessGranted] = useState(false);

  const initialLogs = [
    "ИНИЦИАЛИЗАЦИЯ ЯДРА: ASTRELLA CENTRAL EXCHANGE (ACE)...",
    "ПОДКЛЮЧЕНИЕ К ЗАСЕКРЕЧЕННЫМ СЕРВЕРАМ HELIOS BIOTECH...",
    "ОБНАРУЖЕНО ПРИСУТСТВИЕ СЕТИ: EDEN_PROTOCOL_V4.2",
    "ПРОВЕРКА СТАТУСА ПЕРИМЕТРА: КАРАНТИННАЯ СТЕНА АКТИВНА",
    "СТАТУС ИНФИЦИРОВАНИЯ: КРИТИЧЕСКИЙ (BROKEN STAGE 3 ОБНАРУЖЕНЫ В BLACK ZONES)",
    "ВАЛЮТНЫЙ ШЛЮЗ: РУБЛЁВАЯ ЭКОНОМИКА ₽ ПОДКЛЮЧЕНА",
    "ДОСТУП К ДАННЫМ: ТРЕБУЕТСЯ АВТОРИЗАЦИЯ ACE TOKEN..."
  ];

  useEffect(() => {
    let currentLog = 0;
    const logInterval = setInterval(() => {
      if (currentLog < initialLogs.length) {
        setLogs((prev) => [...prev, initialLogs[currentLog]]);
        currentLog++;
        setProgress((prev) => Math.min(prev + 14, 98));
      } else {
        clearInterval(logInterval);
        setProgress(100);
      }
    }, 350);

    return () => clearInterval(logInterval);
  }, []);

  const handleGrantAccess = () => {
    setAccessGranted(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-[#050507] text-red-500 z-50 flex flex-col justify-between p-6 md:p-10 select-none scanlines font-mono">
      {/* Top Details */}
      <div className="flex justify-between items-start border-b border-red-900/40 pb-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold tracking-widest text-sm md:text-base">
            <Terminal className="w-5 h-5 animate-pulse" />
            <span>ACE // SECURE_ACCESS_NODE</span>
          </div>
          <div className="text-[10px] text-gray-500 mt-1">
            СИСТЕМА БЕЗОПАСНОСТИ ШТАТА ASTRELLA // УРОВЕНЬ ДОСТУПА: ГРАЖДАНСКИЙ / СТАЛКЕР
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-red-600/80 animate-flicker">DEFCON: 2 // QUARANTINE</div>
          <div className="text-[10px] text-gray-600">SYS_TIME: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Center Console */}
      <div className="max-w-3xl mx-auto w-full my-auto py-8">
        <div className="text-center mb-8">
          <div className="inline-block relative">
            <ShieldAlert className="w-16 h-16 md:w-24 md:h-24 text-red-600 mx-auto animate-pulse-slow" />
            <div className="absolute -inset-1 bg-red-600/10 blur-sm rounded-full -z-10"></div>
          </div>
          <h1 className="text-2xl md:text-5xl font-bold tracking-wider text-gray-100 mt-4 font-['Chakra_Petch']">
            ASTRELLA
          </h1>
          <p className="text-xs md:text-sm text-red-600/90 tracking-widest mt-1 font-['Chakra_Petch']">
            THE FALL OF SAN ANDREAS
          </p>
          <div className="w-24 h-[1px] bg-red-800 mx-auto my-3"></div>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Штат отрезан от остального мира после крупнейшей биологической катастрофы. Вход в систему предоставляется под контролем <span className="text-red-500">HELIOS BIOTECH</span>.
          </p>
        </div>

        {/* Console Box */}
        <div className="bg-[#0a0a0e] border border-red-950/80 p-4 rounded-md shadow-2xl relative">
          <div className="absolute top-0 right-0 bg-red-950 text-red-400 text-[9px] px-2 py-0.5 uppercase">
            Live Stream
          </div>
          <div className="space-y-1.5 min-h-[140px] text-xs md:text-sm text-gray-300">
            {logs.map((log, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-red-600 select-none">&gt;</span>
                <span className={index === logs.length - 1 ? 'text-gray-100' : 'text-gray-400'}>
                  {log}
                </span>
              </div>
            ))}
            {progress < 100 && (
              <div className="flex items-center gap-2 text-red-600 animate-pulse">
                <span>&gt;</span>
                <span className="w-2 h-4 bg-red-600 inline-block"></span>
              </div>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>СИНХРОНИЗАЦИЯ БАЗЫ ДАННЫХ</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden border border-red-950">
              <div 
                className="bg-red-600 h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Action Trigger */}
        <div className="mt-8 text-center">
          {progress === 100 ? (
            <button
              onClick={handleGrantAccess}
              disabled={accessGranted}
              className={`px-8 py-3 bg-red-950/60 hover:bg-red-900 border border-red-600 text-gray-100 font-['Chakra_Petch'] font-bold tracking-widest text-sm transition-all duration-300 uppercase cursor-pointer relative group overflow-hidden ${
                accessGranted ? 'bg-red-600 text-white scale-95' : 'glow-red'
              }`}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600/0 via-red-600/30 to-red-600/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <div className="flex items-center gap-2 justify-center">
                {accessGranted ? (
                  <>
                    <Key className="w-4 h-4 animate-spin" />
                    <span>ДОСТУП РАЗРЕШЁН...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-red-500 group-hover:text-white transition-colors" />
                    <span>ВОЙТИ В СИСТЕМУ ACE</span>
                  </>
                )}
              </div>
            </button>
          ) : (
            <div className="text-xs text-gray-600 flex items-center justify-center gap-2">
              <Database className="w-3.5 h-3.5 animate-spin text-red-900" />
              <span>ОЖИДАНИЕ СЕРТИФИКАТА БЕЗОПАСНОСТИ...</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-[10px] text-gray-600 border-t border-red-950/40 pt-4 flex flex-col md:flex-row justify-between gap-2">
        <span>HELIOS BIOTECH CORP. © 2026 // ВСЕ ПРАВА ЗАЩИЩЕНЫ</span>
        <span>НЕСАНКЦИОНИРОВАННЫЙ ДОСТУП КАРАЕТСЯ ПО ЗАКОНАМ ВОЕННОГО ВРЕМЕНИ</span>
        <span className="text-red-800">ПРОГРАММА EDEN // АКТИВНА</span>
      </div>
    </div>
  );
};

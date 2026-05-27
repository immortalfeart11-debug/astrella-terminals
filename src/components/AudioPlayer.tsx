import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Signal, AlertTriangle } from 'lucide-react';

interface AudioPlayerProps {
  isBlackVeil: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ isBlackVeil }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [currentChannel, setCurrentChannel] = useState<'AEN' | 'BLACK_VEIL'>('AEN');
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Synchronize channel with Override state
  useEffect(() => {
    if (isBlackVeil) {
      setCurrentChannel('BLACK_VEIL');
    } else {
      setCurrentChannel('AEN');
    }
  }, [isBlackVeil]);

  const startAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
      
      const gainNode = audioCtxRef.current.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gainNode;

      // Start the generative ambient engine
      const playAtmosphere = () => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        const ctx = audioCtxRef.current;
        const time = ctx.currentTime;

        if (currentChannel === 'AEN') {
          // Astrella Emergency Network: low droning, official intermittent tones
          const osc1 = ctx.createOscillator();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(55, time); // A1 deep drone
          osc1.frequency.exponentialRampToValueAtTime(52, time + 2);
          
          const env1 = ctx.createGain();
          env1.gain.setValueAtTime(0.05, time);
          env1.gain.linearRampToValueAtTime(0.12, time + 1.5);
          env1.gain.linearRampToValueAtTime(0.03, time + 3.8);

          osc1.connect(env1);
          env1.connect(gainNodeRef.current);
          osc1.start(time);
          osc1.stop(time + 4);

          // Occasional Warning Ping
          if (Math.random() > 0.6) {
            const ping = ctx.createOscillator();
            ping.type = 'triangle';
            ping.frequency.setValueAtTime(440, time + 0.5);
            ping.frequency.setValueAtTime(330, time + 0.8);
            
            const pingGain = ctx.createGain();
            pingGain.gain.setValueAtTime(0, time);
            pingGain.gain.setValueAtTime(0.04, time + 0.5);
            pingGain.gain.exponentialRampToValueAtTime(0.001, time + 1.5);

            ping.connect(pingGain);
            pingGain.connect(gainNodeRef.current);
            ping.start(time + 0.5);
            ping.stop(time + 1.6);
          }

        } else {
          // BLACK VEIL override: High voltage clicks, distorted radio, secrets
          const osc = ctx.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(110, time);
          osc.frequency.setValueAtTime(220, time + 0.2);
          osc.frequency.setValueAtTime(80, time + 0.4);

          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.setValueAtTime(1200, time);
          filter.Q.setValueAtTime(8, time);

          const env = ctx.createGain();
          env.gain.setValueAtTime(0.08, time);
          env.gain.exponentialRampToValueAtTime(0.01, time + 0.6);

          osc.connect(filter);
          filter.connect(env);
          env.connect(gainNodeRef.current);
          osc.start(time);
          osc.stop(time + 0.7);

          // Add synthetic data burst
          if (Math.random() > 0.3) {
            const burst = ctx.createOscillator();
            burst.type = 'square';
            burst.frequency.setValueAtTime(800 + Math.random() * 1400, time);
            
            const burstGain = ctx.createGain();
            burstGain.gain.setValueAtTime(0.02, time);
            burstGain.gain.setValueAtTime(0, time + 0.08);

            burst.connect(burstGain);
            burstGain.connect(gainNodeRef.current);
            burst.start(time);
            burst.stop(time + 0.1);
          }
        }
      };

      playAtmosphere();
      intervalRef.current = window.setInterval(playAtmosphere, 4000);
    } else if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <div className={`fixed bottom-5 right-5 z-50 p-3 rounded-lg border backdrop-blur-md shadow-2xl transition-all duration-300 ${
      currentChannel === 'BLACK_VEIL' 
        ? 'bg-black/90 border-cyan-500/50 text-cyan-400 glow-neon' 
        : 'bg-[#0d0d11]/90 border-red-900/50 text-red-500 glow-red'
    }`}>
      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`p-2 rounded-md transition-colors ${
            currentChannel === 'BLACK_VEIL'
              ? 'bg-cyan-950 hover:bg-cyan-900 text-cyan-300'
              : 'bg-red-950 hover:bg-red-900 text-red-300'
          }`}
          title={isPlaying ? "Отключить радиоэфир" : "Включить радиоэфир"}
        >
          {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 font-['Chakra_Petch'] text-xs font-bold tracking-wider">
            {currentChannel === 'AEN' ? (
              <>
                <Radio className="w-3 h-3 text-red-500 animate-pulse" />
                <span className="text-gray-200">AEN // 107.5 FM</span>
              </>
            ) : (
              <>
                <Signal className="w-3 h-3 text-cyan-400 animate-spin" />
                <span className="text-cyan-400 font-mono">BLACK VEIL // ПЕРЕХВАТ</span>
              </>
            )}
          </div>
          
          <span className="text-[10px] text-gray-400 max-w-[140px] truncate block">
            {currentChannel === 'AEN' 
              ? 'Экстренное вещание штата' 
              : 'Правда об EDEN в эфире'}
          </span>
        </div>

        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 w-6 ml-1">
            <span className={`w-1 bg-current animate-bounce rounded-xs`} style={{ animationDuration: '0.6s' }}></span>
            <span className={`w-1 bg-current animate-bounce rounded-xs`} style={{ animationDuration: '0.4s', animationDelay: '0.1s' }}></span>
            <span className={`w-1 bg-current animate-bounce rounded-xs`} style={{ animationDuration: '0.8s', animationDelay: '0.2s' }}></span>
          </div>
        )}
      </div>

      {/* Mini details on hover or standard */}
      <div className="mt-2 pt-2 border-t border-gray-800/60 flex items-center justify-between text-[9px] text-gray-400">
        <span className="flex items-center gap-1">
          <AlertTriangle className="w-2.5 h-2.5 text-yellow-500" />
          {currentChannel === 'AEN' ? 'Пропаганда HELIOS' : 'Шифрованный сигнал'}
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-12 accent-current cursor-pointer h-1 bg-gray-800 rounded-lg"
          title="Громкость"
        />
      </div>
    </div>
  );
};

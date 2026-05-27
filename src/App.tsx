import { useState, useEffect } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { TerminalLoader } from './components/TerminalLoader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { LoreTimeline } from './components/LoreTimeline';
import { InteractiveMap } from './components/InteractiveMap';
import { FactionsGrid } from './components/FactionsGrid';
import { BiohazardTerminal } from './components/BiohazardTerminal';
import { AceExchange } from './components/AceExchange';
import { SeasonsGuide } from './components/SeasonsGuide';
import { RoleSimulator } from './components/RoleSimulator';
import { Footer } from './components/Footer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rubles, setRubles] = useState<number>(12500); // Start with 12,500 ₽
  const [inventory, setInventory] = useState<string[]>([]);
  const [isBlackVeil, setIsBlackVeil] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('concept');

  // Handle smooth scroll directly
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sync active tab with user scroll position
  useEffect(() => {
    if (!isLoaded) return;

    const handleScroll = () => {
      const sections = ['concept', 'map', 'factions', 'broken', 'economy', 'seasons', 'rolecraft'];
      const scrollPosition = window.scrollY + 200; // Offset for navbar

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoaded]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isBlackVeil ? 'bg-[#030608]' : 'bg-[#08080a]'
    }`}>
      
      {/* Intro Gateway Loader */}
      {!isLoaded && (
        <TerminalLoader onComplete={() => setIsLoaded(true)} />
      )}

      {/* Main Experience */}
      {isLoaded && (
        <div className="animate-fadeIn">
          
          {/* Top Sticky Hub */}
          <Navbar 
            activeTab={activeTab} 
            setActiveTab={handleTabChange} 
            rubles={rubles} 
            isBlackVeil={isBlackVeil} 
          />

          {/* Core Hero Section */}
          <Hero 
            isBlackVeil={isBlackVeil} 
            setIsBlackVeil={setIsBlackVeil} 
            setActiveTab={handleTabChange} 
          />

          {/* Content Views flow */}
          <main className="space-y-4">
            
            <div id="concept" className="scroll-mt-20">
              <LoreTimeline isBlackVeil={isBlackVeil} />
            </div>

            <div id="map" className="scroll-mt-20">
              <InteractiveMap isBlackVeil={isBlackVeil} />
            </div>

            <div id="factions" className="scroll-mt-20">
              <FactionsGrid isBlackVeil={isBlackVeil} />
            </div>

            <div id="broken" className="scroll-mt-20">
              <BiohazardTerminal isBlackVeil={isBlackVeil} />
            </div>

            <div id="economy" className="scroll-mt-20">
              <AceExchange 
                rubles={rubles} 
                setRubles={setRubles} 
                inventory={inventory} 
                setInventory={setInventory} 
                isBlackVeil={isBlackVeil} 
              />
            </div>

            <div id="seasons" className="scroll-mt-20">
              <SeasonsGuide isBlackVeil={isBlackVeil} />
            </div>

            <div id="rolecraft" className="scroll-mt-20">
              <RoleSimulator isBlackVeil={isBlackVeil} />
            </div>

          </main>

          {/* Footer closing note */}
          <Footer 
            isBlackVeil={isBlackVeil} 
            setActiveTab={handleTabChange} 
          />

          {/* Persistent Web Audio Radio Terminal */}
          <AudioPlayer isBlackVeil={isBlackVeil} />

        </div>
      )}

    </div>
  );
}

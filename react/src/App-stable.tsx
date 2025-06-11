import { useEffect, useState } from "react";
import axios from "axios";

// Game State Types
interface GameState {
  score: number;
  collectedMOOCs: string[];
  level: number;
  gameMode: 'explore' | 'collect' | 'completed';
}

// Types
interface MOOCItem {
  courseTitle: string;
  type: "Course" | "Bundle";
  status: "In Progress" | "Completed";
  certificateLink: string;
  courses?: { title: string; certificateLink: string }[];
}

interface MOOCsData {
  total: number;
  items: MOOCItem[];
  moreLink?: string;
}

// Profile Types
interface ProfileData {
  name: string;
  image: string;
  title: string;
  socialLinks: SocialLink[];
}

interface SocialLink {
  href: string;
  iconClass: string;
  label: string;
  id: string;
}

const profileData: ProfileData = {
  name: "Aung Myo Kyaw",
  image: "https://avatars.githubusercontent.com/u/9404824?v=4",
  title: "Tech Lead | Curious Programmer | Lifelong Learner",
  socialLinks: [
    {
      href: "https://www.linkedin.com/in/aungmyokyaw/",
      iconClass: "fab fa-linkedin",
      label: "LinkedIn Profile",
      id: "linkedin"
    },
    {
      href: "https://github.com/AungMyoKyaw",
      iconClass: "fab fa-github",
      label: "GitHub Profile",
      id: "github"
    },
    {
      href: "https://www.coursera.org/learner/aungmyokyaw",
      iconClass: "fas fa-graduation-cap",
      label: "Coursera Profile",
      id: "coursera"
    }
  ]
};

// CSS Game Components
const MOOCCard = ({ 
  mooc, 
  index, 
  onCollect, 
  isCollected 
}: { 
  mooc: MOOCItem; 
  index: number;
  onCollect: (moocTitle: string) => void;
  isCollected: boolean;
}) => {
  const [clicked, setClicked] = useState(false);
  
  const handleClick = () => {
    if (!isCollected) {
      setClicked(true);
      onCollect(mooc.courseTitle);
      // Open certificate
      window.open(mooc.certificateLink, '_blank');
      
      // Reset animation after delay
      setTimeout(() => setClicked(false), 1000);
    }
  };

  const cardColor = mooc.status === 'Completed' ? 'from-green-500 to-emerald-600' : 'from-orange-500 to-yellow-600';
  const glowColor = mooc.status === 'Completed' ? 'shadow-green-500/50' : 'shadow-orange-500/50';

  return (
    <div 
      className={`
        relative group cursor-pointer transform transition-all duration-500 hover:scale-105
        ${isCollected ? 'opacity-50 scale-75' : 'hover:scale-110'}
        ${clicked ? 'animate-ping' : ''}
      `}
      style={{
        animationDelay: `${index * 0.1}s`,
        transform: `
          rotateX(${Math.sin(Date.now() * 0.001 + index) * 10}deg) 
          rotateY(${Math.cos(Date.now() * 0.001 + index) * 10}deg)
          translateZ(${Math.sin(Date.now() * 0.002 + index) * 20}px)
        `
      }}
      onClick={handleClick}
    >
      {/* Glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${cardColor} rounded-xl blur-lg ${glowColor} shadow-2xl opacity-75`} />
      
      {/* Card content */}
      <div className={`
        relative bg-gradient-to-br ${cardColor} p-6 rounded-xl border-2 border-white/20
        backdrop-blur-sm transition-all duration-300
        ${isCollected ? 'border-gray-500/20' : 'hover:border-white/40'}
      `}>
        {/* Status badge */}
        <div className="absolute top-2 right-2">
          {isCollected ? (
            <div className="bg-gray-600 text-white px-2 py-1 rounded-full text-xs font-bold">
              ✅ COLLECTED
            </div>
          ) : (
            <div className="bg-white/20 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              🎯 CLICK TO COLLECT
            </div>
          )}
        </div>
        
        {/* Course title */}
        <h3 className="text-white font-bold text-lg mb-2 pr-24">
          {mooc.courseTitle.length > 50 ? mooc.courseTitle.substring(0, 50) + '...' : mooc.courseTitle}
        </h3>
        
        {/* Course details */}
        <div className="flex items-center space-x-4 text-white/80 text-sm">
          <span className="bg-white/20 px-2 py-1 rounded">
            {mooc.status}
          </span>
          <span className="bg-white/20 px-2 py-1 rounded">
            {mooc.type}
          </span>
          {mooc.courses && (
            <span className="bg-white/20 px-2 py-1 rounded">
              {mooc.courses.length} courses
            </span>
          )}
        </div>
        
        {/* Collection particles */}
        {clicked && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const GameUI = ({ 
  gameState, 
  totalMOOCs 
}: { 
  gameState: GameState; 
  totalMOOCs: number;
}) => {
  const progress = totalMOOCs > 0 ? (gameState.collectedMOOCs.length / totalMOOCs) * 100 : 0;
  
  return (
    <div className="fixed top-4 left-4 z-20 space-y-4">
      {/* Game Stats */}
      <div className="rounded-lg bg-black/80 p-4 text-cyan-300 backdrop-blur border border-cyan-500/30">
        <h3 className="text-lg font-bold flex items-center">
          🎮 <span className="ml-2">MOOC Collector Game</span>
        </h3>
        <div className="mt-2 space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Score:</span>
            <span className="text-yellow-300 font-bold">{gameState.score}</span>
          </div>
          <div className="flex justify-between">
            <span>Collected:</span>
            <span className="text-green-300 font-bold">{gameState.collectedMOOCs.length}/{totalMOOCs}</span>
          </div>
          <div className="flex justify-between">
            <span>Level:</span>
            <span className="text-purple-300 font-bold">{gameState.level}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="text-xs mb-1">Progress: {progress.toFixed(0)}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Achievement */}
      {gameState.gameMode === 'completed' && (
        <div className="rounded-lg bg-gradient-to-r from-yellow-600 to-yellow-400 p-4 text-yellow-900 backdrop-blur animate-bounce">
          <h4 className="font-bold text-lg">🏆 MISSION COMPLETE!</h4>
          <p className="text-sm mt-1">
            You've collected all your MOOCs! 🎓✨
          </p>
        </div>
      )}
    </div>
  );
};

const ProfileHeader = ({ profile }: { profile: ProfileData }) => (
  <header className="relative animate-fade-in border-b border-cyan-500/30 bg-gradient-to-r from-black/80 to-purple-900/80 p-6 text-center backdrop-blur-md">
    <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-4 border-cyan-400 shadow-lg sm:h-32 sm:w-32 animate-pulse">
      <img
        src={profile.image}
        alt={profile.name}
        className="h-full w-full object-cover"
      />
    </div>
    <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-cyan-300 sm:text-5xl">
      {profile.name}
    </h1>
    <p className="mt-2 text-base text-cyan-200 sm:text-xl">{profile.title}</p>
    <div className="mt-4 flex justify-center space-x-4">
      {profile.socialLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="text-2xl text-cyan-300 transition hover:text-white hover:scale-110 transform"
        >
          <i className={link.iconClass} />
        </a>
      ))}
    </div>
  </header>
);

const App = () => {
  const [moocsData, setMoocsData] = useState<MOOCsData | null>(null);
  const [gameMode, setGameMode] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    collectedMOOCs: [],
    level: 1,
    gameMode: 'explore'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<MOOCsData>(
          "https://moocs.aungmyokyaw.com/moocsData.json"
        );
        setMoocsData(data);
      } catch (error) {
        console.error("Error fetching MOOCs data:", error);
      }
    };
    
    fetchData();
  }, []);

  const handleCollectMOOC = (moocTitle: string) => {
    if (gameState.collectedMOOCs.includes(moocTitle)) return;
    
    setGameState(prev => {
      const newCollected = [...prev.collectedMOOCs, moocTitle];
      const newScore = prev.score + 100;
      const newLevel = Math.floor(newScore / 500) + 1;
      const isCompleted = moocsData ? newCollected.length >= moocsData.items.length : false;
      
      return {
        ...prev,
        collectedMOOCs: newCollected,
        score: newScore,
        level: newLevel,
        gameMode: isCompleted ? 'completed' : 'collect'
      };
    });
  };

  if (!moocsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-cyan-400 rounded-full opacity-20 animate-ping"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 2 + 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="text-center text-cyan-300 relative z-10">
          <div className="text-6xl mb-4 animate-bounce">🚀</div>
          <h2 className="text-2xl font-bold mb-2">Launching MOOC Collector...</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <span>Loading your achievement gallery...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-900 to-blue-900 text-cyan-100 overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-400 rounded-full opacity-10 animate-pulse"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Game UI */}
      {gameMode && (
        <GameUI gameState={gameState} totalMOOCs={moocsData.items.length} />
      )}
      
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setGameMode(!gameMode)}
          className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white font-bold backdrop-blur-sm transition hover:from-purple-700 hover:to-pink-700 transform hover:scale-105"
        >
          {gameMode ? '🎮 Exit Game' : '🚀 Play Game'}
        </button>
      </div>
      
      {/* Profile Header */}
      <ProfileHeader profile={profileData} />
      
      {/* Game Content */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
            {gameMode ? '🎯 MOOC Collection Challenge' : '📚 My Learning Journey'}
          </h2>
          {gameMode && (
            <p className="text-cyan-200 max-w-2xl mx-auto">
              Welcome to the MOOC Collector! Each card represents one of my completed or ongoing courses. 
              Click on the glowing cards to collect them and unlock achievements. 
              Let's see if you can collect them all! 🏆
            </p>
          )}
        </div>
        
        {/* MOOC Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {moocsData.items.map((mooc, index) => (
            <MOOCCard
              key={mooc.courseTitle}
              mooc={mooc}
              index={index}
              onCollect={handleCollectMOOC}
              isCollected={gameState.collectedMOOCs.includes(mooc.courseTitle)}
            />
          ))}
        </div>
        
        {/* More link */}
        {moocsData.moreLink && (
          <div className="text-center mt-12">
            <a
              href={moocsData.moreLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-purple-600 transition transform hover:scale-105"
            >
              🌟 View All My MOOCs →
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

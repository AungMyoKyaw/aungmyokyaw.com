import { useEffect, useState, Suspense, useRef, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Text, Html } from "@react-three/drei";
import * as THREE from "three";
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

// Game Components
const FloatingMOOCOrb = ({ 
  mooc, 
  position, 
  index, 
  onCollect, 
  isCollected 
}: { 
  mooc: MOOCItem; 
  position: [number, number, number]; 
  index: number;
  onCollect: (moocTitle: string) => void;
  isCollected: boolean;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + index) * 0.5;
      
      // Rotation animation
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      // Hover effects
      const targetScale = hovered ? 1.3 : (isCollected ? 0.5 : 1);
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
      
      // Collected animation
      if (isCollected) {
        meshRef.current.rotation.z = state.clock.elapsedTime * 2;
      }
    }
  });

  const handleClick = useCallback(() => {
    if (!isCollected) {
      setClicked(true);
      onCollect(mooc.courseTitle);
      // Open certificate
      window.open(mooc.certificateLink, '_blank');
    }
  }, [mooc.courseTitle, mooc.certificateLink, onCollect, isCollected]);

  const orbColor = mooc.status === 'Completed' ? '#00ff80' : '#ffaa00';
  const emissiveColor = mooc.status === 'Completed' ? '#004020' : '#402000';

  return (
    <group position={position}>
      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.2, 1.4, 32]} />
        <meshBasicMaterial 
          color={orbColor} 
          transparent 
          opacity={hovered ? 0.5 : 0.2}
        />
      </mesh>
      
      {/* Main orb */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color={isCollected ? '#666666' : orbColor}
          transparent
          opacity={isCollected ? 0.3 : 0.9}
          emissive={isCollected ? '#000000' : emissiveColor}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Floating text */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.3}
        color={isCollected ? '#666666' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
        textAlign="center"
      >
        {mooc.courseTitle.substring(0, 30)}...
      </Text>
      
      {/* Collection effect */}
      {clicked && !isCollected && (
        <group>
          {[...Array(10)].map((_, i) => (
            <mesh key={`particle-${Math.random()}-${i}`} position={[
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3,
              (Math.random() - 0.5) * 3
            ]}>
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color={orbColor} />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Hover tooltip */}
      {hovered && (
        <Html position={[0, 2.5, 0]} center>
          <div className="pointer-events-none rounded-lg bg-black/90 p-3 text-center text-sm text-white backdrop-blur max-w-xs">
            <div className="font-bold text-cyan-300">{mooc.courseTitle}</div>
            <div className="mt-1 text-xs opacity-80">
              {mooc.status} • {mooc.type}
            </div>
            <div className="mt-2 text-xs text-yellow-300">
              {isCollected ? '✅ Collected!' : '🎯 Click to collect!'}
            </div>
            {mooc.courses && (
              <div className="mt-1 text-xs opacity-60">
                Bundle: {mooc.courses.length} courses
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

const GameUI = ({ 
  gameState, 
  totalMOOCs 
}: { 
  gameState: GameState; 
  totalMOOCs: number;
}) => {
  const progress = (gameState.collectedMOOCs.length / totalMOOCs) * 100;
  
  return (
    <div className="fixed top-4 left-4 z-20 space-y-4">
      {/* Game Stats */}
      <div className="rounded-lg bg-black/80 p-4 text-cyan-300 backdrop-blur">
        <h3 className="text-lg font-bold">🎮 MOOC Explorer</h3>
        <div className="mt-2 space-y-1 text-sm">
          <div>Score: <span className="text-yellow-300">{gameState.score}</span></div>
          <div>Collected: <span className="text-green-300">{gameState.collectedMOOCs.length}/{totalMOOCs}</span></div>
          <div>Level: <span className="text-purple-300">{gameState.level}</span></div>
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
      
      {/* Instructions */}
      <div className="rounded-lg bg-purple-900/80 p-3 text-purple-100 backdrop-blur max-w-xs">
        <h4 className="font-semibold">🎯 Mission</h4>
        <p className="text-xs mt-1">
          Explore the 3D space and click on glowing orbs to collect your certificates! 
          Each MOOC you collect increases your score.
        </p>
      </div>
      
      {/* Achievement */}
      {gameState.gameMode === 'completed' && (
        <div className="rounded-lg bg-green-900/90 p-4 text-green-100 backdrop-blur animate-pulse">
          <h4 className="font-bold text-lg">🏆 CONGRATULATIONS!</h4>
          <p className="text-sm mt-1">
            You've collected all your MOOCs! You're a true lifelong learner! 🎓
          </p>
        </div>
      )}
    </div>
  );
};

const SpaceShip = () => {
  const shipRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (shipRef.current) {
      // Gentle floating motion
      shipRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      shipRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={shipRef} position={[0, 0, 8]}>
      {/* Ship body */}
      <mesh>
        <coneGeometry args={[0.5, 2, 8]} />
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#004080"
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Ship wings */}
      <mesh position={[-0.8, -0.5, 0]} rotation={[0, 0, Math.PI/4]}>
        <boxGeometry args={[0.3, 1, 0.1]} />
        <meshStandardMaterial color="#0080ff" />
      </mesh>
      <mesh position={[0.8, -0.5, 0]} rotation={[0, 0, -Math.PI/4]}>
        <boxGeometry args={[0.3, 1, 0.1]} />
        <meshStandardMaterial color="#0080ff" />
      </mesh>
      
      {/* Engine glow */}
      <mesh position={[0, -1.2, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#ff4400" />
      </mesh>
    </group>
  );
};

const GameScene = ({ 
  moocsData, 
  gameState, 
  onCollectMOOC 
}: { 
  moocsData: MOOCsData; 
  gameState: GameState;
  onCollectMOOC: (moocTitle: string) => void;
}) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 5, 15], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} color="#00ffff" intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ff4400" intensity={0.8} />
        <pointLight position={[0, 20, 0]} color="#ff00ff" intensity={0.5} />
        
        {/* Epic starfield */}
        <Stars radius={200} depth={100} count={8000} factor={6} saturation={0} fade speed={2} />
        
        {/* Player spaceship */}
        <SpaceShip />
        
        {/* MOOC Orbs arranged in a 3D galaxy */}
        {moocsData.items.map((mooc, index) => {
          // Create a spiral galaxy layout
          const angle = (index / moocsData.items.length) * Math.PI * 6;
          const radius = 5 + index * 0.8;
          const height = Math.sin(angle * 0.5) * 4;
          
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius - 10;
          const y = height;

          return (
            <FloatingMOOCOrb
              key={mooc.courseTitle}
              mooc={mooc}
              position={[x, y, z]}
              index={index}
              onCollect={onCollectMOOC}
              isCollected={gameState.collectedMOOCs.includes(mooc.courseTitle)}
            />
          );
        })}
        
        {/* Nebula effects */}
        <mesh position={[0, 0, -30]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial 
            color="#4400ff" 
            transparent 
            opacity={0.1}
          />
        </mesh>
        
        <OrbitControls 
          enableZoom={true}
          minDistance={5}
          maxDistance={50}
          autoRotate={gameState.gameMode === 'completed'}
          autoRotateSpeed={0.5}
          enablePan={true}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
};

// Main App Component
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

  const handleCollectMOOC = useCallback((moocTitle: string) => {
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
  }, [moocsData]);

  if (!moocsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
        <div className="text-center text-cyan-300">
          <div className="text-6xl mb-4">🚀</div>
          <h2 className="text-2xl font-bold mb-2">Initializing MOOC Galaxy...</h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
            <span>Loading your certificates...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-900 to-black text-cyan-100 overflow-hidden">
      {/* Game Scene */}
      {gameMode && (
        <Suspense fallback={null}>
          <GameScene 
            moocsData={moocsData} 
            gameState={gameState}
            onCollectMOOC={handleCollectMOOC}
          />
        </Suspense>
      )}
      
      {/* Game UI */}
      <GameUI gameState={gameState} totalMOOCs={moocsData.items.length} />
      
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setGameMode(!gameMode)}
          className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white font-bold backdrop-blur-sm transition hover:from-purple-700 hover:to-pink-700"
        >
          {gameMode ? '🎮 Exit Game' : '🚀 Play Game'}
        </button>
      </div>
      
      {/* Traditional Portfolio View */}
      {!gameMode && (
        <div className="relative z-10 min-h-screen bg-gradient-to-br from-black to-gray-900">
          {/* Traditional portfolio content would go here */}
          <div className="container mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-5xl font-bold text-cyan-300 mb-4">Aung Myo Kyaw</h1>
              <p className="text-xl text-cyan-200 mb-8">Tech Lead | Curious Programmer | Lifelong Learner</p>
              <div className="bg-gray-900/50 rounded-xl p-8 backdrop-blur">
                <h2 className="text-2xl font-semibold text-cyan-300 mb-4">My MOOCs</h2>
                <div className="grid gap-4">
                  {moocsData.items.map((mooc) => (
                    <div key={mooc.courseTitle} className="text-left p-4 bg-gray-800/50 rounded-lg">
                      <a
                        href={mooc.certificateLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-lg font-bold text-white hover:text-cyan-300 transition"
                      >
                        {mooc.courseTitle}
                      </a>
                      <div className="text-sm text-gray-400 mt-1">
                        {mooc.status} • {mooc.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

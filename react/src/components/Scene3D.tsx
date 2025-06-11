import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Liquid Particles Component
const LiquidParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.02;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03;
    }
  });

  return (
    <Points
      ref={ref}
      positions={particlesPosition}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        color="#6366f1"
        size={1.2}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

// Morphing Glass Orbs
const GlassOrb = ({
  position,
  scale = 1,
  color = "#8b5cf6"
}: {
  position: [number, number, number];
  scale?: number;
  color?: string;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;

      // Morphing scale effect
      const morphScale =
        scale + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.3;
      meshRef.current.scale.setScalar(morphScale);

      // Floating motion
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        roughness={0.1}
        metalness={0.9}
        envMapIntensity={1}
      />
    </mesh>
  );
};

// Liquid Glass Rings
const LiquidRings = () => {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    ringRefs.current.forEach((ring, index) => {
      if (ring) {
        // Pulsating effect
        const scale =
          1 +
          Math.sin(state.clock.elapsedTime * 1.5 + (index * Math.PI) / 4) * 0.3;
        ring.scale.setScalar(scale);

        // Rotation
        ring.rotation.x = state.clock.elapsedTime * 0.1 * (index + 1);
        ring.rotation.z = state.clock.elapsedTime * 0.05 * (index + 1);

        // Color morphing
        const hue = (state.clock.elapsedTime * 0.1 + index * 0.2) % 1;
        (ring.material as THREE.MeshBasicMaterial).color.setHSL(hue, 0.8, 0.6);
      }
    });
  });

  const rings = useMemo(
    () => [...Array(8)].map((_, i) => ({ id: `liquid-ring-${i}`, index: i })),
    []
  );

  return (
    <>
      {rings.map(({ id, index }) => (
        <mesh
          key={id}
          ref={(el) => {
            ringRefs.current[index] = el;
          }}
          position={[0, 0, -index * 4 - 15]}
        >
          <ringGeometry args={[10 + index * 3, 12 + index * 3, 64]} />
          <meshBasicMaterial
            transparent
            opacity={0.08 - index * 0.008}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </>
  );
};

// Floating Glass Shards
const GlassShards = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const shards = useMemo(() => {
    return [...Array(20)].map((_, i) => {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 15 + Math.random() * 10;
      return {
        id: `shard-${i}`,
        position: [
          Math.cos(angle) * radius,
          (Math.random() - 0.5) * 20,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 1.5
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {shards.map(({ id, position, rotation, scale }) => (
        <mesh key={id} position={position} rotation={rotation} scale={scale}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#60a5fa"
            transparent
            opacity={0.2}
            roughness={0.0}
            metalness={1.0}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
};

// Main 3D Scene Component
const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 50], fov: 60 }}
        style={{
          background:
            "linear-gradient(135deg, #0c0c0c 0%, #1a0b2e 25%, #16213e 50%, #0f3460 75%, #0e1a40 100%)"
        }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} color="#6366f1" />
        <pointLight position={[20, 20, 20]} intensity={1.5} color="#8b5cf6" />
        <pointLight position={[-20, -20, -20]} intensity={1} color="#06b6d4" />
        <pointLight position={[0, 30, 0]} intensity={0.8} color="#ec4899" />

        {/* Liquid Glass Elements */}
        <LiquidParticles />
        <LiquidRings />
        <GlassShards />

        {/* Morphing Glass Orbs */}
        <GlassOrb position={[-25, 10, -20]} scale={1.5} color="#8b5cf6" />
        <GlassOrb position={[25, -15, -30]} scale={2} color="#06b6d4" />
        <GlassOrb position={[0, 20, -40]} scale={1.2} color="#ec4899" />
        <GlassOrb position={[-15, -25, -25]} scale={1.8} color="#10b981" />
        <GlassOrb position={[30, 5, -35]} scale={1.3} color="#f59e0b" />

        {/* Auto-rotating camera */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;

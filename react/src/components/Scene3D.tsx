import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Floating Particles Component
const FloatingParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.075;
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
        color="#00ffff"
        size={0.8}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
};

// Animated Geometric Shapes
const FloatingGeometry = ({
  position,
  geometry
}: {
  position: [number, number, number];
  geometry: "box" | "sphere" | "octahedron";
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 2;
    }
  });

  const GeometryComponent = () => {
    switch (geometry) {
      case "box":
        return <boxGeometry args={[2, 2, 2]} />;
      case "sphere":
        return <sphereGeometry args={[1.5, 32, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[1.5]} />;
      default:
        return <boxGeometry args={[2, 2, 2]} />;
    }
  };

  return (
    <mesh ref={meshRef} position={position}>
      <GeometryComponent />
      <meshStandardMaterial
        color="#0080ff"
        transparent
        opacity={0.3}
        wireframe
        emissive="#004080"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Pulsating Rings
const PulsatingRings = () => {
  const ringRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    ringRefs.current.forEach((ring, index) => {
      if (ring) {
        const scale =
          1 +
          Math.sin(state.clock.elapsedTime * 2 + (index * Math.PI) / 3) * 0.2;
        ring.scale.setScalar(scale);
        ring.rotation.x = state.clock.elapsedTime * 0.1;
        ring.rotation.z = state.clock.elapsedTime * 0.05;
      }
    });
  });

  const rings = useMemo(
    () => [...Array(6)].map((_, i) => ({ id: `ring-${i}`, index: i })),
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
          position={[0, 0, -index * 3 - 10]}
        >
          <ringGeometry args={[8 + index * 2, 9 + index * 2, 32]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.1 - index * 0.01}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </>
  );
};

// Main 3D Scene Component
const Scene3D = () => {
  return (
    <div className="fixed inset-0 -z-10" style={{ pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // Transparent background
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#0080ff"
        />

        <FloatingParticles />
        <PulsatingRings />

        {/* Floating Geometric Shapes */}
        <FloatingGeometry position={[-15, 5, -5]} geometry="box" />
        <FloatingGeometry position={[15, -5, -10]} geometry="sphere" />
        <FloatingGeometry position={[0, 10, -15]} geometry="octahedron" />
        <FloatingGeometry position={[-20, -10, -8]} geometry="box" />
        <FloatingGeometry position={[20, 8, -12]} geometry="sphere" />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
};

export default Scene3D;

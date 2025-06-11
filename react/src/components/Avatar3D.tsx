import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring } from '@react-three/drei';
import * as THREE from 'three';

interface Avatar3DProps {
  imageUrl: string;
  position?: [number, number, number];
}

const Avatar3D = ({ imageUrl, position = [0, 0, 0] }: Avatar3DProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Floating motion
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }

    if (sphereRef.current) {
      // Subtle pulsing
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      sphereRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Outer glow rings */}
      <Ring args={[2.2, 2.4, 32]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </Ring>
      <Ring args={[2.5, 2.6, 32]} rotation={[0, 0, 0]}>
        <meshBasicMaterial color="#0080ff" transparent opacity={0.2} />
      </Ring>

      {/* Avatar sphere */}
      <Sphere ref={sphereRef} args={[2, 64, 64]}>
        <meshStandardMaterial
          map={new THREE.TextureLoader().load(imageUrl)}
          emissive="#003366"
          emissiveIntensity={0.1}
        />
      </Sphere>

      {/* Holographic grid overlay */}
      <Sphere args={[2.05, 32, 32]}>
        <meshBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.1}
          wireframe
        />
      </Sphere>

      {/* Floating particles around avatar */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 3;
        const particleId = `particle-${Math.random()}-${i}`;
        return (
          <mesh
            key={particleId}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle * 2) * 0.5,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#00ffff" />
          </mesh>
        );
      })}
    </group>
  );
};

export default Avatar3D;

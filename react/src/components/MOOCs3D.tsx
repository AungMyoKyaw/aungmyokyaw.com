import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";
import * as THREE from "three";

interface MOOCItem {
  courseTitle: string;
  type: "Course" | "Bundle";
  status: "In Progress" | "Completed";
  certificateLink: string;
  courses?: { title: string; certificateLink: string }[];
}

interface MOOCCard3DProps {
  mooc: MOOCItem;
  position: [number, number, number];
  index: number;
}

const MOOCCard3D = ({ mooc, position, index }: MOOCCard3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Floating animation
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.3;

      // Rotation animation
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;

      // Scale animation on hover
      const targetScale = hovered ? 1.1 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[4, 2.5, 0.2]} />
        <meshStandardMaterial
          color={mooc.status === "Completed" ? "#00ff80" : "#ffaa00"}
          transparent
          opacity={0.9}
          emissive={mooc.status === "Completed" ? "#004020" : "#402000"}
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </mesh>

      {/* Course title */}
      <Text
        position={[0, 0.5, 0.11]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.5}
        textAlign="center"
        font="/fonts/Inter-SemiBold.woff2"
        letterSpacing={-0.01}
      >
        {mooc.courseTitle}
      </Text>

      {/* Status badge */}
      <Text
        position={[0, -0.5, 0.11]}
        fontSize={0.2}
        color={mooc.status === "Completed" ? "#00ff80" : "#ffaa00"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Medium.woff2"
        letterSpacing={0.01}
      >
        {mooc.status}
      </Text>

      {/* Type badge */}
      <Text
        position={[0, -0.8, 0.11]}
        fontSize={0.15}
        color="#00ffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/JetBrainsMono-Regular.woff2"
        letterSpacing={0.02}
      >
        {mooc.type}
      </Text>

      {/* Hover tooltip */}
      {hovered && (
        <Html position={[0, 1.5, 0]} center>
          <div className="pointer-events-none rounded-lg bg-black/90 p-2 text-center backdrop-blur">
            <div className="text-heading text-sm font-semibold text-white">
              {mooc.courseTitle}
            </div>
            <div className="text-caption mt-1 text-xs text-white opacity-80">
              {mooc.status} • {mooc.type}
            </div>
            {mooc.courses && (
              <div className="text-caption mt-1 text-xs text-white opacity-80">
                {mooc.courses.length} courses included
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
};

interface MOOCs3DProps {
  moocsData: {
    items: MOOCItem[];
  } | null;
}

export const MOOCs3D = ({ moocsData }: MOOCs3DProps) => {
  if (!moocsData || !moocsData.items || moocsData.items.length === 0) {
    return null;
  }

  return (
    <group>
      {moocsData.items.slice(0, 12).map((mooc, index) => {
        // Skip if mooc doesn't have required data
        if (!mooc || !mooc.courseTitle) {
          return null;
        }

        // Arrange in a spiral pattern
        const angle =
          (index / Math.max(moocsData.items.length, 1)) * Math.PI * 4;
        const radius = 8 + index * 0.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius - 20;
        const y = index * 1.5 - 6;

        return (
          <MOOCCard3D
            key={`mooc-${index}-${mooc.courseTitle}`}
            mooc={mooc}
            position={[x, y, z]}
            index={index}
          />
        );
      })}
    </group>
  );
};

export default MOOCs3D;

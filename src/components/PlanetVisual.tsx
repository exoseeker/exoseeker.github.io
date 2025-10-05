import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedPlanet = ({ radius = 1 }: { radius?: number }) => {
  const planetRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (planetRef.current) {
      planetRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Planet */}
      <Sphere ref={planetRef} args={[radius, 64, 64]}>
        <meshStandardMaterial
          color="#4facfe"
          roughness={0.7}
          metalness={0.3}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere ref={atmosphereRef} args={[radius * 1.1, 64, 64]}>
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[radius * 1.3, 64, 64]}>
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
};

export const PlanetVisual = ({ radius = 1 }: { radius?: number }) => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={75} />
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />
        <AnimatedPlanet radius={radius} />
      </Canvas>
    </div>
  );
};
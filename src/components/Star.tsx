import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';

interface StarProps {
  position: [number, number, number];
  planetId: string;
  name: string;
  onHover?: (name: string | null) => void;
}

export const Star = ({ position, planetId, name, onHover }: StarProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.3 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      
      if (!hovered) {
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      }
    }
  });

  const handleClick = () => {
    navigate(`/planet/${planetId}`);
  };

  const handlePointerEnter = () => {
    setHovered(true);
    onHover?.(name);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerLeave = () => {
    setHovered(false);
    onHover?.(null);
    document.body.style.cursor = 'default';
  };

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.3, 32, 32]}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <meshStandardMaterial
          color={hovered ? "#00d9ff" : "#4facfe"}
          emissive={hovered ? "#00d9ff" : "#00a3cc"}
          emissiveIntensity={hovered ? 2 : 1}
          toneMapped={false}
        />
      </Sphere>
      
      {/* Glow effect */}
      <Sphere args={[0.4, 32, 32]}>
        <meshBasicMaterial
          color="#00d9ff"
          transparent
          opacity={hovered ? 0.4 : 0.2}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer glow ring */}
      <Sphere args={[0.6, 32, 32]}>
        <meshBasicMaterial
          color="#8b5cf6"
          transparent
          opacity={hovered ? 0.2 : 0.1}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};
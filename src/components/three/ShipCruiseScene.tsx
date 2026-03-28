import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

function Spacecraft() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1;
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 2, 32]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.1} metalness={0.8} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <coneGeometry args={[0.3, 0.5, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 1.5, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={1} emissive="#001220" />
      </mesh>
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 1.5, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={1} emissive="#001220" />
      </mesh>
      <mesh position={[0, -1.05, 0]} rotation={[Math.PI, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.25, 0.1, 32]} />
        <meshStandardMaterial color="#333" roughness={0.5} />
      </mesh>
      <pointLight position={[0, -1.2, 0]} color="#70e1ff" intensity={2} distance={2} />
    </group>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#70e1ff" />
    </>
  );
}

export default function ShipCruiseScene() {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
    }, { threshold: 0.01 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400px] w-full" aria-hidden>
      <AnimatePresence>
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Canvas 
              dpr={[1, 1.5]}
              gl={{ 
                  powerPreference: 'high-performance', 
                  antialias: false, 
                  stencil: false, 
                  depth: true 
              }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={35} />
              <SceneLighting />
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  <group rotation={[Math.PI / 2, 0, Math.PI / 4]}>
                      <Spacecraft />
                  </group>
              </Float>
              <ContactShadows opacity={0.4} scale={10} blur={24} far={10} resolution={128} color="#000000" />
              <Environment preset="city" />
              <EffectComposer multisampling={0}>
                  <Bloom intensity={1.5} luminanceThreshold={0.5} mipmapBlur={false} />
              </EffectComposer>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

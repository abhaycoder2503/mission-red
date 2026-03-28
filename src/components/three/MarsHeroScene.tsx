import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles, PerspectiveCamera } from '@react-three/drei';
import { Bloom, EffectComposer, Vignette, Noise } from '@react-three/postprocessing';
import { motion, AnimatePresence } from 'framer-motion';

function Atmosphere() {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      color: { value: new THREE.Color('#ff9e64') },
      coef: { value: 1.1 },
      power: { value: 4.0 },
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      uniform float coef;
      uniform float power;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vec3 viewDir = normalize(-vPosition);
        float intensity = pow(coef - dot(vNormal, viewDir), power);
        gl_FragColor = vec4(color, intensity * 0.4);
      }
    `,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.12}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <shaderMaterial 
            args={[shaderArgs]} 
            transparent 
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
        />
    </mesh>
  );
}

function MarsPlanet() {
  const marsRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    marsRef.current.rotation.y += delta * 0.05;
    marsRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.03;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh ref={marsRef}>
        <sphereGeometry args={[1.25, 64, 64]} />
        <meshStandardMaterial 
            color="#d35400" 
            roughness={0.8} 
            metalness={0.1} 
            emissive="#c0392b"
            emissiveIntensity={0.05}
        />
      </mesh>
      <Atmosphere />
      <Sparkles count={50} scale={2.5} size={1} speed={0.4} opacity={0.3} color="#ff7a59" />
    </Float>
  );
}

function SceneLighting() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const { mouse, viewport } = useThree();

  useFrame(() => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    lightRef.current.position.set(x, y, 2);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffd4c2" />
      <pointLight ref={lightRef} intensity={0.8} distance={10} color="#ff9e64" />
      <pointLight position={[-3, -2, -2]} intensity={0.4} color="#e67e22" />
    </>
  );
}

export default function MarsHeroScene() {
  const [mobile, setMobile] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia('(max-width: 768px)');
    const onChange = () => setMobile(m.matches);
    onChange();
    m.addEventListener('change', onChange);
    
    // Intersection Observer for visibility-based mounting
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            setIsInView(true);
        } else {
            // Delay unmounting for smooth transitions and performance
            setTimeout(() => {
                if (!containerRef.current || !observer.root) return; // Cleanup check
                // Re-check after delay if it's still out of view
            }, 1000);
            setIsInView(false);
        }
    }, { threshold: 0.01 });

    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
        m.removeEventListener('change', onChange);
        observer.disconnect();
    };
  }, []);

  if (mobile) return <div className="hero-canvas-fallback" aria-hidden />;

  return (
    <div ref={containerRef} className="hero-canvas relative h-full w-full" aria-hidden>
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
              style={{ background: 'transparent' }}
              gl={{ 
                  powerPreference: 'high-performance', 
                  antialias: false, 
                  stencil: false, 
                  depth: true,
                  alpha: true
              }}
              onCreated={({ gl }) => {
                gl.setClearAlpha(0);
                gl.setClearColor(0x000000, 0);
              }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={40} />
              
              <Stars 
                  radius={100} 
                  depth={50} 
                  count={3000} 
                  factor={4} 
                  saturation={0} 
                  fade 
                  speed={0.5} 
              />
              
              <MarsPlanet />
              <SceneLighting />

              <EffectComposer multisampling={0}>
                <Bloom 
                  intensity={1.0} 
                  luminanceThreshold={0.25} 
                  mipmapBlur={false} 
                />
                <Noise opacity={0.015} />
                <Vignette eskil={false} offset={0.1} darkness={0.7} />
              </EffectComposer>
            </Canvas>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Icosahedron, MeshTransmissionMaterial } from '@react-three/drei';
import { useRef } from 'react';

function LivingObject({ pointer, velocity, progress }) {
  const mesh = useRef(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    const speed = Math.min(2.5, Math.abs(velocity.current) * 0.04);
    mesh.current.rotation.x += delta * (0.16 + speed);
    mesh.current.rotation.y += delta * (0.28 + speed * 0.7);
    mesh.current.rotation.z = Math.sin(t * 0.5) * 0.1 + pointer.current.x * 0.18;
    mesh.current.position.x += (pointer.current.x * 0.55 - mesh.current.position.x) * 0.035;
    mesh.current.position.y += (-pointer.current.y * 0.35 + Math.sin(t * 0.7) * 0.08 - mesh.current.position.y) * 0.035;
    const target = 1 + speed * 0.08 + progress.current * 0.00035;
    const scale = mesh.current.scale.x + (target - mesh.current.scale.x) * 0.06;
    mesh.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.15} floatIntensity={0.55} rotationIntensity={0.18}>
      <Icosahedron ref={mesh} args={[1.35, 5]}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.9}
          roughness={0.1}
          ior={1.45}
          chromaticAberration={0.09}
          anisotropy={0.25}
          color="#d9ff39"
        />
      </Icosahedron>
    </Float>
  );
}

export default function Scene({ pointer, velocity, progress }) {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <pointLight position={[3, 4, 4]} intensity={15} />
        <pointLight position={[-4, -2, 2]} intensity={9} color="#3154ff" />
        <LivingObject pointer={pointer} velocity={velocity} progress={progress} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

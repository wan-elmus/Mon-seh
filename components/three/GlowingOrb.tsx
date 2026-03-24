'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ intensity }: { intensity: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.3
      meshRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.15) * 0.5
    }
  })

  return (
    <Sphere ref={meshRef} args={[1.2, 64, 64]} scale={1.2}>
      <MeshDistortMaterial
        color="#E8B4B8"
        attach="material"
        distort={0.4}
        speed={1.2}
        roughness={0.2}
        metalness={0.8}
        emissive="#D4919A"
        emissiveIntensity={intensity}
      />
    </Sphere>
  )
}

interface GlowingOrbProps {
  className?: string
  intensity?: number
}

export default function GlowingOrb({
  className = '',
  intensity = 0.4,
}: GlowingOrbProps) {
  return (
    <div className={`fixed ${className} pointer-events-none z-0`}>
      <Canvas camera={{ position: [0, 0, 3.5], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <AnimatedSphere intensity={intensity} />
      </Canvas>
    </div>
  )
}
'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function createSeededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function HeartParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 800

  const positions = useMemo(() => {
    const rand = createSeededRandom(99)
    const pos = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const r = Math.pow(rand(), 1.5) * 4

      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r + 1.5
      pos[i * 3 + 2] = Math.cos(phi) * r
    }

    return pos
  }, [])

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#E8B4B8"
        size={0.08}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <HeartParticles />
      </Canvas>
    </div>
  )
}
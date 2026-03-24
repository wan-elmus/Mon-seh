'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

// Deterministic random generator
function createSeededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const particleCount = 1500

  const { positions, colors } = useMemo(() => {
    const rand = createSeededRandom(42)

    const pos = new Float32Array(particleCount * 3)
    const col = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // Positions
      pos[i * 3] = (rand() - 0.5) * 30
      pos[i * 3 + 1] = (rand() - 0.5) * 20
      pos[i * 3 + 2] = (rand() - 0.5) * 20 - 10

      // Colors
      const choice = rand()
      if (choice < 0.33) {
        col[i * 3] = 0.91
        col[i * 3 + 1] = 0.71
        col[i * 3 + 2] = 0.72
      } else if (choice < 0.66) {
        col[i * 3] = 0.90
        col[i * 3 + 1] = 0.78
        col[i * 3 + 2] = 0.63
      } else {
        col[i * 3] = 0.79
        col[i * 3 + 1] = 0.71
        col[i * 3 + 2] = 0.88
      }
    }

    return { positions: pos, colors: col }
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005
      pointsRef.current.rotation.x += 0.0003
    }
  })

  return (
    <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        opacity={0.4}
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

export default function BackgroundParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ParticleField />
      </Canvas>
    </div>
  )
}
"use client"

import type React from "react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { IntelligencePulse } from "@/components/intelligence-pulse"

interface Node {
  id: number
  x: number
  y: number
  z: number
  targetX: number
  targetY: number
  targetZ: number
  baseX: number
  baseY: number
  baseZ: number
  color: string
  size: number
  letter: "R" | "A" | "V"
  vx: number
  vy: number
  vz: number
}

const letterPaths = {
  R: [
    { x: 0.15, y: 0.15, z: 0.5 },
    { x: 0.15, y: 0.35, z: 0.55 },
    { x: 0.15, y: 0.55, z: 0.6 },
    { x: 0.15, y: 0.75, z: 0.55 },
    { x: 0.15, y: 0.95, z: 0.5 },
    { x: 0.25, y: 0.15, z: 0.48 },
    { x: 0.38, y: 0.18, z: 0.52 },
    { x: 0.45, y: 0.28, z: 0.58 },
    { x: 0.42, y: 0.42, z: 0.62 },
    { x: 0.28, y: 0.48, z: 0.6 },
    { x: 0.28, y: 0.58, z: 0.58 },
    { x: 0.35, y: 0.72, z: 0.52 },
    { x: 0.45, y: 0.88, z: 0.48 },
  ],
  A: [
    { x: 0.5, y: 0.95, z: 0.5 },
    { x: 0.52, y: 0.75, z: 0.55 },
    { x: 0.55, y: 0.55, z: 0.6 },
    { x: 0.58, y: 0.35, z: 0.58 },
    { x: 0.62, y: 0.15, z: 0.52 },
    { x: 0.66, y: 0.35, z: 0.56 },
    { x: 0.69, y: 0.55, z: 0.6 },
    { x: 0.72, y: 0.75, z: 0.54 },
    { x: 0.75, y: 0.95, z: 0.5 },
    { x: 0.56, y: 0.62, z: 0.65 },
    { x: 0.62, y: 0.62, z: 0.65 },
    { x: 0.68, y: 0.62, z: 0.65 },
  ],
  V: [
    { x: 0.78, y: 0.15, z: 0.52 },
    { x: 0.8, y: 0.35, z: 0.56 },
    { x: 0.83, y: 0.55, z: 0.61 },
    { x: 0.86, y: 0.75, z: 0.58 },
    { x: 0.88, y: 0.95, z: 0.5 },
    { x: 0.9, y: 0.75, z: 0.56 },
    { x: 0.93, y: 0.55, z: 0.6 },
    { x: 0.96, y: 0.35, z: 0.55 },
    { x: 0.98, y: 0.15, z: 0.48 },
  ],
}

const colors = {
  R: "#3B82F6",
  A: "#14B8A6",
  V: "#22D3EE",
}

export function HeroSection() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const timeRef = useRef(0)
  const lastMouseUpdateRef = useRef(0)

  useEffect(() => {
    const allNodes: Node[] = []
    let id = 0

    Object.entries(letterPaths).forEach(([letter, positions]) => {
      positions.forEach((pos) => {
        allNodes.push({
          id: id++,
          x: Math.random(),
          y: Math.random(),
          z: Math.random(),
          targetX: pos.x,
          targetY: pos.y,
          targetZ: pos.z,
          baseX: pos.x,
          baseY: pos.y,
          baseZ: pos.z,
          color: colors[letter as keyof typeof colors],
          size: 3 + Math.random() * 2.5,
          letter: letter as "R" | "A" | "V",
          vx: 0,
          vy: 0,
          vz: 0,
        })
      })
    })

    setNodes(allNodes)
  }, [])

  useEffect(() => {
    const animate = () => {
      timeRef.current += 0.016

      setNodes((prev) =>
        prev.map((node) => {
          const dx = node.targetX - node.x
          const dy = node.targetY - node.y
          const dz = node.targetZ - node.z

          const friction = 0.92
          let nvx = node.vx + dx * 0.012
          let nvy = node.vy + dy * 0.012
          let nvz = node.vz + dz * 0.009

          nvx *= friction
          nvy *= friction
          nvz *= friction

          const floatX = Math.sin(timeRef.current * 0.7 + node.id * 0.3) * 0.004
          const floatY = Math.cos(timeRef.current * 0.5 + node.id * 0.4) * 0.004
          const floatZ = Math.sin(timeRef.current * 0.6 + node.id * 0.2) * 0.002

          let repelX = 0
          let repelY = 0
          let repelZ = 0

          if (isHovered && canvasRef.current) {
            const distX = node.x - mousePos.x
            const distY = node.y - mousePos.y
            const dist = Math.sqrt(distX * distX + distY * distY)
            if (dist < 0.2) {
              const force = (0.2 - dist) * 0.22
              repelX = (distX / dist) * force
              repelY = (distY / dist) * force
              repelZ = (Math.random() - 0.5) * force * 0.4
            }
          }

          return {
            ...node,
            x: node.x + nvx + floatX + repelX,
            y: node.y + nvy + floatY + repelY,
            z: Math.max(0.1, Math.min(0.99, node.z + nvz + floatZ + repelZ)),
            vx: nvx,
            vy: nvy,
            vz: nvz,
            targetX: node.baseX + (isHovered ? repelX * 0.3 : 0),
            targetY: node.baseY + (isHovered ? repelY * 0.3 : 0),
            targetZ: node.baseZ + (isHovered ? repelZ * 0.2 : 0),
          }
        }),
      )

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [mousePos, isHovered])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return
    const now = performance.now()
    if (now - lastMouseUpdateRef.current >= 16) {
      const rect = canvasRef.current.getBoundingClientRect()
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      })
      lastMouseUpdateRef.current = now
    }
  }, [])

  const sortedNodes = [...nodes].sort((a, b) => a.z - b.z)

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-[#94A3B8]">
            <Sparkles className="w-4 h-4 text-[#22D3EE]" />
            <span>Agentic AI Innovation Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight">
            <span className="gradient-text">The Intelligence Layer</span>
            <br />
            <span className="text-[#E2E8F0]">of Your Enterprise</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#94A3B8] max-w-xl leading-relaxed">
            Agentic AI systems that think, adapt, and execute—built for creators, businesses, and research teams.
          </p>

          <p className="text-base text-[#64748B]">
            Ravion Lab is an Agentic AI innovation studio building fluid, autonomous intelligence for real-world impact.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#22D3EE] text-white font-semibold px-8 hover:shadow-lg hover:shadow-[#3B82F6]/40 transition-all duration-300 hover:scale-105 active:scale-95"
              asChild
            >
              <a href="#contact">
                Build With Us
                <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#3B82F6]/40 text-[#E2E8F0] hover:bg-[#3B82F6]/10 hover:border-[#3B82F6] hover:shadow-lg hover:shadow-[#3B82F6]/20 transition-all duration-300 bg-transparent active:scale-95"
              asChild
            >
              <a href="#capabilities">Explore Our Work</a>
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-[550px] aspect-square mx-auto flex items-center justify-center overflow-hidden rounded-lg border border-[#3B82F6]/20 bg-gradient-to-b from-[#0d1a30]/40 to-[#030a1a]/40">
          <IntelligencePulse />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-radial from-[#0d1a30]/40 via-transparent to-transparent opacity-80" />
            <div
              className="absolute left-[5%] top-1/2 -translate-y-1/2 w-40 h-80 rounded-full opacity-12 blur-3xl"
              style={{ background: colors.R }}
            />
            <div
              className="absolute left-1/3 top-1/2 -translate-y-1/2 w-40 h-80 rounded-full opacity-12 blur-3xl"
              style={{ background: colors.A }}
            />
            <div
              className="absolute right-[8%] top-1/2 -translate-y-1/2 w-40 h-80 rounded-full opacity-12 blur-3xl"
              style={{ background: colors.V }}
            />
          </div>

          <div
            ref={canvasRef}
            className="relative z-20 h-full w-full flex items-center justify-center cursor-crosshair"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {sortedNodes.map((node) => {
              const scale = 0.3 + node.z * 0.7
              const opacity = 0.5 + node.z * 0.5
              const glow = isHovered ? 14 : 9

              return (
                <div
                  key={node.id}
                  className="absolute rounded-full transition-all"
                  style={{
                    left: `${node.x * 100}%`,
                    top: `${node.y * 100}%`,
                    width: node.size * scale,
                    height: node.size * scale,
                    backgroundColor: node.color,
                    opacity: opacity,
                    boxShadow: `0 0 ${glow}px ${node.color}${isHovered ? "a0" : "70"}, inset 0 0 ${glow / 2}px ${node.color}40`,
                    transform: `translate(-50%, -50%) scale(${isHovered ? scale * 1.12 : scale})`,
                    filter: `drop-shadow(0 ${(node.z - 0.5) * 18}px ${(1 - node.z) * 12}px rgba(0,0,0,0.4))`,
                  }}
                />
              )
            })}
          </div>

          <div
            className={`absolute bottom-12 left-0 right-0 flex justify-center gap-20 transition-all duration-500 ${isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="text-center">
              <span className="text-3xl font-bold tracking-wider" style={{ color: colors.R }}>
                R
              </span>
              <p className="text-xs text-[#64748B] mt-2 tracking-wide">RESEARCH</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold tracking-wider" style={{ color: colors.A }}>
                A
              </span>
              <p className="text-xs text-[#64748B] mt-2 tracking-wide">AGENTIC</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold tracking-wider" style={{ color: colors.V }}>
                V
              </span>
              <p className="text-xs text-[#64748B] mt-2 tracking-wide">VISION</p>
            </div>
          </div>

          <div
            className={`absolute -bottom-4 left-1/2 -translate-x-1/2 text-xs text-[#475569] transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-0" : "opacity-100"}`}
          >
            Hover to interact
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#64748B]">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#3B82F6] to-transparent" />
      </div>
    </section>
  )
}

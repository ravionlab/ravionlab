"use client"

import { useEffect, useRef, useState } from "react"

export function IntelligencePulse() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const glareRef = useRef({ x: 0, y: 0, vx: 0, vy: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePos({ x, y })

      glareRef.current.vx += (x - glareRef.current.x) * 0.08
      glareRef.current.vy += (y - glareRef.current.y) * 0.08
      glareRef.current.vx *= 0.92
      glareRef.current.vy *= 0.92
      glareRef.current.x += glareRef.current.vx
      glareRef.current.y += glareRef.current.vy
    }

    document.addEventListener("mousemove", handleMouseMove)
    return () => document.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    let animationId: number

    const animate = () => {
      timeRef.current += 0.016

      ctx.fillStyle = "rgba(3, 10, 26, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      const pulseScale = 0.7 + Math.sin(timeRef.current * 1.2) * 0.15
      const pulseSize = 60 * pulseScale

      // Gradient for main pulse
      const pulseGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize)
      pulseGradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
      pulseGradient.addColorStop(0.4, "rgba(20, 184, 166, 0.4)")
      pulseGradient.addColorStop(1, "rgba(34, 211, 238, 0)")

      ctx.fillStyle = pulseGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < 3; i++) {
        const ringScale = 0.8 + Math.sin(timeRef.current * 0.8 - i * 1.2) * 0.2
        const ringSize = 80 * (1 + i * 0.4) * ringScale
        const ringOpacity = 0.15 * Math.cos(timeRef.current * 1.5 - i * 0.8)

        ctx.strokeStyle = `rgba(34, 211, 238, ${Math.max(0, ringOpacity)})`
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(centerX, centerY, ringSize, 0, Math.PI * 2)
        ctx.stroke()
      }

      const glareSize = 120
      const glareGradient = ctx.createRadialGradient(
        glareRef.current.x,
        glareRef.current.y,
        0,
        glareRef.current.x,
        glareRef.current.y,
        glareSize,
      )
      glareGradient.addColorStop(0, "rgba(59, 130, 246, 0.3)")
      glareGradient.addColorStop(0.3, "rgba(59, 130, 246, 0.1)")
      glareGradient.addColorStop(1, "rgba(59, 130, 246, 0)")

      ctx.fillStyle = glareGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particleCount = 12
      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2 + timeRef.current * 0.3
        const distance = 100 + Math.sin(timeRef.current * 0.5 + i) * 20
        const px = centerX + Math.cos(angle) * distance
        const py = centerY + Math.sin(angle) * distance

        const size = 2 + Math.sin(timeRef.current * 2 + i) * 1
        const colors = ["rgba(59, 130, 246, 0.6)", "rgba(20, 184, 166, 0.6)", "rgba(34, 211, 238, 0.6)"]
        ctx.fillStyle = colors[i % colors.length]

        ctx.beginPath()
        ctx.arc(px, py, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationId)
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 rounded-lg overflow-hidden cursor-crosshair">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          background: "radial-gradient(circle at center, rgba(13, 26, 48, 0.3) 0%, rgba(3, 10, 26, 0.6) 100%)",
        }}
      />
    </div>
  )
}

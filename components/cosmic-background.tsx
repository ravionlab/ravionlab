"use client"

import { useEffect, useRef } from "react"

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const glareRef = useRef({ x: 0, y: 0 })
  const lastMouseUpdateRef = useRef(0)
  const throttleDelayRef = useRef(16) // ~60fps

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    const gridSize = 50
    const offset = { x: 0, y: 0 }
    const targetOffset = { x: 0, y: 0 }

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      ctx.clearRect(0, 0, width, height)

      targetOffset.x = (mouseRef.current.x - width / 2) * 0.008
      targetOffset.y = (mouseRef.current.y - height / 2) * 0.008
      offset.x += (targetOffset.x - offset.x) * 0.04
      offset.y += (targetOffset.y - offset.y) * 0.04

      glareRef.current.x += (mouseRef.current.x - glareRef.current.x) * 0.08
      glareRef.current.y += (mouseRef.current.y - glareRef.current.y) * 0.08

      const cursorGlare = ctx.createRadialGradient(
        glareRef.current.x,
        glareRef.current.y,
        0,
        glareRef.current.x,
        glareRef.current.y,
        250,
      )
      cursorGlare.addColorStop(0, "rgba(59, 130, 246, 0.08)")
      cursorGlare.addColorStop(0.3, "rgba(20, 184, 166, 0.05)")
      cursorGlare.addColorStop(0.6, "rgba(34, 211, 238, 0.025)")
      cursorGlare.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(glareRef.current.x, glareRef.current.y, 250, 0, Math.PI * 2)
      ctx.fillStyle = cursorGlare
      ctx.fill()

      ctx.strokeStyle = "rgba(59, 130, 246, 0.02)"
      ctx.lineWidth = 0.5

      for (let x = offset.x % gridSize; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }

      for (let y = offset.y % gridSize; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      const mx = glareRef.current.x
      const my = glareRef.current.y
      const glowRadius = 180

      for (let x = Math.max(0, (offset.x % gridSize) - gridSize); x < width + gridSize; x += gridSize) {
        for (let y = Math.max(0, (offset.y % gridSize) - gridSize); y < height + gridSize; y += gridSize) {
          const dx = mx - x
          const dy = my - y
          const distSquared = dx * dx + dy * dy
          const glowRadiusSq = glowRadius * glowRadius

          if (distSquared < glowRadiusSq) {
            const distance = Math.sqrt(distSquared)
            const intensity = Math.pow(1 - distance / glowRadius, 2.5) * 0.25

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 5)
            gradient.addColorStop(0, `rgba(34, 211, 238, ${intensity * 0.4})`)
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${intensity * 0.2})`)
            gradient.addColorStop(1, "transparent")

            ctx.beginPath()
            ctx.arc(x, y, 5, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            ctx.beginPath()
            ctx.arc(x, y, 1, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.4})`
            ctx.fill()
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastMouseUpdateRef.current >= throttleDelayRef.current) {
        mouseRef.current = { x: e.clientX, y: e.clientY }
        lastMouseUpdateRef.current = now
      }
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0" style={{ background: "#030A1A" }} />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(59, 130, 246, 0.025) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 0% 30%, rgba(59, 130, 246, 0.03) 0%, rgba(20, 184, 166, 0.015) 30%, transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 60% at 100% 70%, rgba(34, 211, 238, 0.02) 0%, rgba(139, 92, 246, 0.01) 30%, transparent 70%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(3, 10, 26, 0.5) 100%)",
        }}
      />
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"

const researchThemes = [
  "Multi-agent coordination",
  "Trust & safety",
  "World models",
  "Adaptive reasoning",
  "Self-optimization",
]

export function ResearchPhilosophy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let angle = 0

    const nodes = researchThemes.map((_, i) => ({
      angle: (i / researchThemes.length) * Math.PI * 2,
      radius: 120,
    }))

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2
      canvas.height = canvas.offsetHeight * 2
      ctx.scale(2, 2)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      const centerX = canvas.offsetWidth / 2
      const centerY = canvas.offsetHeight / 2

      angle += 0.005

      ctx.strokeStyle = "rgba(217, 176, 140, 0.3)"
      ctx.lineWidth = 1

      nodes.forEach((node, i) => {
        const x1 = centerX + Math.cos(node.angle + angle) * node.radius
        const y1 = centerY + Math.sin(node.angle + angle) * node.radius

        nodes.forEach((other, j) => {
          if (i < j) {
            const x2 = centerX + Math.cos(other.angle + angle) * other.radius
            const y2 = centerY + Math.sin(other.angle + angle) * other.radius

            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        })
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const x = centerX + Math.cos(node.angle + angle) * node.radius
        const y = centerY + Math.sin(node.angle + angle) * node.radius

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
        const colors = ["rgba(10, 33, 192, 0.8)", "rgba(17, 100, 102, 0.8)", "rgba(217, 176, 140, 0.8)"]
        gradient.addColorStop(0, colors[i % 3])
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(x, y, 20, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fillStyle = ["#0A21C0", "#116466", "#D9B08C"][i % 3]
        ctx.fill()
      })

      // Center glow
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 40)
      centerGradient.addColorStop(0, "rgba(10, 33, 192, 0.5)")
      centerGradient.addColorStop(0.5, "rgba(17, 100, 102, 0.3)")
      centerGradient.addColorStop(1, "transparent")

      ctx.beginPath()
      ctx.arc(centerX, centerY, 40, 0, Math.PI * 2)
      ctx.fillStyle = centerGradient
      ctx.fill()

      animationId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section id="research" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-6 leading-tight">
              We Don&apos;t Start With Models.
              <br />
              <span className="gradient-text">We Start With Questions.</span>
            </h2>

            <p className="text-lg text-[#B3B4BD]/70 mb-8 leading-relaxed">
              At Ravion Lab, research isn&apos;t about chasing benchmarks—it&apos;s about discovering what makes
              intelligence actually useful.
            </p>

            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-[#D9B08C] font-medium">Research Themes</p>
              <ul className="space-y-3">
                {researchThemes.map((theme, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#B3B4BD]/80">
                    <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#0A21C0] to-[#116466]" />
                    {theme}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Constellation Visual */}
          <div className="relative h-[400px]">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

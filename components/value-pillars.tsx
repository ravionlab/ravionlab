"use client"

import type React from "react"

import { useRef } from "react"
import { Zap, Users, Lightbulb, Target } from "lucide-react"

const pillars = [
  {
    icon: Zap,
    title: "We Build Practical AI, Not Hype",
    description: "Real systems that solve real problems—not vaporware or research theater.",
  },
  {
    icon: Users,
    title: "We Make Intelligence Accessible",
    description: "Complex AI, simple interfaces. Powerful capabilities for everyone.",
  },
  {
    icon: Lightbulb,
    title: "We Research From First Principles",
    description: "We don't follow trends. We discover what works by asking why.",
  },
  {
    icon: Target,
    title: "We Create Talent Gravity",
    description: "The best builders, thinkers, and creators want to work here.",
  },
]

export function ValuePillars() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            Why <span className="gradient-text">Ravion</span> Exists
          </h2>
          <p className="text-[#B3B4BD]/60 max-w-2xl mx-auto">
            We believe in building AI that matters—systems that amplify human potential.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {pillars.map((pillar, index) => (
            <PillarCard key={index} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PillarCard({ pillar, index }: { pillar: (typeof pillars)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)"
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative glass-card rounded-2xl p-8 transition-all duration-300 hover:border-[#116466]/60"
      style={{
        animationDelay: `${index * 100}ms`,
        transition: "transform 0.2s ease-out, border-color 0.3s",
      }}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 gradient-border" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A21C0]/30 to-[#116466]/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <pillar.icon className="w-6 h-6 text-[#D9B08C]" />
        </div>

        <h3 className="text-xl font-semibold text-[#F5F7FA] mb-3 group-hover:gradient-text transition-all">
          {pillar.title}
        </h3>

        <p className="text-[#B3B4BD]/60 leading-relaxed">{pillar.description}</p>
      </div>
    </div>
  )
}

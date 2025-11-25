"use client"

import { useState } from "react"
import { Brain, Building2, FlaskConical } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

const capabilities = [
  {
    icon: Brain,
    title: "Agentic Systems",
    description:
      "Autonomous AI workflows that execute tasks, make decisions, and collaborate with humans in real-time.",
    color: "#3B82F6",
  },
  {
    icon: Building2,
    title: "Applied AI for Business",
    description: "Custom intelligence systems built around your internal workflows, tools, and data.",
    color: "#14B8A6",
  },
  {
    icon: FlaskConical,
    title: "Deep Research Prototypes",
    description: "Reasoning agents, self-optimizing systems, and new intelligence paradigms.",
    color: "#22D3EE",
  },
]

export function CapabilitiesGrid() {
  return (
    <section id="capabilities" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E2E8F0] mb-4">
              Our <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-[#64748B] max-w-2xl mx-auto">Building the next generation of intelligent systems.</p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-3 gap-6">
          {capabilities.map((capability, index) => (
            <ScrollAnimation
              key={capability.title}
              animation="fade-up"
              delay={index * 100}
              className={index === 0 ? "lg:row-span-2" : index === 1 ? "lg:col-span-2" : "lg:col-span-2"}
            >
              <CapabilityCard capability={capability} />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}

function CapabilityCard({ capability }: { capability: (typeof capabilities)[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative glass-card rounded-2xl p-8 overflow-hidden transition-all duration-500 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${capability.color}08 0%, transparent 60%)`,
          opacity: isHovered ? 1 : 0.3,
        }}
      />

      <div className="relative z-10">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
          style={{
            background: `linear-gradient(135deg, ${capability.color}15 0%, ${capability.color}08 100%)`,
            border: `1px solid ${capability.color}25`,
          }}
        >
          <capability.icon className="w-7 h-7 transition-all duration-300" style={{ color: capability.color }} />
        </div>

        <h3 className="text-2xl font-bold text-[#E2E8F0] mb-4">{capability.title}</h3>

        <p className="text-[#94A3B8] leading-relaxed text-lg">{capability.description}</p>

        <div
          className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-out"
          style={{
            width: isHovered ? "100%" : "0%",
            background: `linear-gradient(90deg, ${capability.color}, transparent)`,
          }}
        />
      </div>
    </div>
  )
}

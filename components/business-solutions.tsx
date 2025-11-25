"use client"

import { useState } from "react"
import { Cog, Brain, Factory, Users } from "lucide-react"

const tabs = [
  {
    id: "automation",
    label: "Internal Automation",
    icon: Cog,
    title: "Automate repetitive workflows with intelligent agents.",
    features: ["Document processing", "Data extraction & analysis", "Customer support routing", "Report generation"],
  },
  {
    id: "decision",
    label: "Decision Intelligence",
    icon: Brain,
    title: "AI that recommends, predicts, and optimizes.",
    features: ["Predictive analytics", "Scenario modeling", "Risk assessment", "Resource allocation"],
  },
  {
    id: "industry",
    label: "Industry Workflows",
    icon: Factory,
    title: "Specialized solutions for your sector.",
    features: ["Retail & E-commerce", "Logistics & Supply Chain", "Finance & Banking", "Healthcare & Life Sciences"],
  },
  {
    id: "consultation",
    label: "Full AI Consultation",
    icon: Users,
    title: "End-to-end partnership from concept to deployment.",
    features: ["Ideation & Strategy", "Research & Development", "MVP & Prototyping", "Deployment & Scaling"],
  },
]

export function BusinessSolutions() {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const activeContent = tabs.find((t) => t.id === activeTab)!

  return (
    <section id="business" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            Business <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-[#B3B4BD]/60 max-w-2xl mx-auto">Enterprise-grade AI systems tailored to your needs.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300
                ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#0A21C0] to-[#116466] text-white"
                    : "glass-card text-[#B3B4BD]/70 hover:text-[#F5F7FA] hover:border-[#116466]/60"
                }
              `}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content Panel */}
        <div className="glass-card rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-[#F5F7FA] mb-6">{activeContent.title}</h3>

              <ul className="space-y-4">
                {activeContent.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-4 text-[#B3B4BD]/80">
                    <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0A21C0]/30 to-[#116466]/30 flex items-center justify-center text-[#D9B08C] font-bold text-sm">
                      {i + 1}
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual */}
            <div className="relative h-[300px] flex items-center justify-center">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border border-[#0A21C0]/30 animate-[spin_20s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#0A21C0]" />
                </div>
                <div className="absolute inset-4 rounded-full border border-[#116466]/30 animate-[spin_15s_linear_infinite_reverse]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#116466]" />
                </div>
                <div className="absolute inset-8 rounded-full border border-[#D9B08C]/20 animate-[spin_10s_linear_infinite]">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#D9B08C]" />
                </div>
                {/* Center icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#0A21C0] to-[#116466] flex items-center justify-center">
                    <activeContent.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

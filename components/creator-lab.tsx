"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Brain, Zap, Target, BarChart3, Send, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollAnimation } from "@/components/scroll-animation"

const agents = [
  {
    id: 1,
    name: "Strategy Agent",
    description: "Plans content calendars, identifies trends, and orchestrates narrative arcs across all platforms.",
    icon: Target,
    color: "from-[#3B82F6] to-[#14B8A6]",
  },
  {
    id: 2,
    name: "Creator Agent",
    description: "Generates long-form writing, visual concepts, and narrative frameworks tailored to brand voice.",
    icon: Brain,
    color: "from-[#14B8A6] to-[#22D3EE]",
  },
  {
    id: 3,
    name: "Production Agent",
    description: "Transforms concepts into polished assets—copy, designs, videos, and optimized content blocks.",
    icon: Zap,
    color: "from-[#22D3EE] to-[#3B82F6]",
  },
  {
    id: 4,
    name: "Distribution Agent",
    description: "Manages platform-specific publishing, scheduling, and multi-channel deployment with precision.",
    icon: Send,
    color: "from-[#3B82F6] to-[#14B8A6]",
  },
  {
    id: 5,
    name: "Analytics Agent",
    description: "Tracks performance, identifies what resonates, and feeds insights back to the strategy layer.",
    icon: BarChart3,
    color: "from-[#14B8A6] to-[#22D3EE]",
  },
]

const workflow = [
  {
    step: 1,
    title: "Intelligence Planning",
    description:
      "The Strategy Agent analyzes market signals, brand positioning, and competitive landscapes to craft intelligent content roadmaps.",
  },
  {
    step: 2,
    title: "Creative Execution",
    description:
      "The Creator Agent transforms strategy into compelling narratives, generating diverse content formats aligned with brand voice.",
  },
  {
    step: 3,
    title: "Asset Production",
    description:
      "The Production Agent polishes raw content into publication-ready assets optimized for every platform and format.",
  },
  {
    step: 4,
    title: "Smart Distribution",
    description:
      "The Distribution Agent deploys content with platform-specific intelligence, timing, and audience segmentation.",
  },
  {
    step: 5,
    title: "Continuous Learning",
    description:
      "The Analytics Agent measures performance and feeds learnings back to refine strategy, creating a self-improving system.",
  },
]

export function CreatorLab() {
  const [formData, setFormData] = useState({
    email: "",
    role: "creator",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const SHEETDB_API = process.env.NEXT_PUBLIC_SHEETDB_API || "https://sheetdb.io/api/v1/YOUR_SHEETDB_ID"

      const response = await fetch(SHEETDB_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            email: formData.email,
            role: formData.role,
            interest: "creator_lab",
            timestamp: new Date().toISOString(),
          },
        ]),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ email: "", role: "creator" })
        setTimeout(() => setStatus("idle"), 5000)
      } else {
        throw new Error("Failed to submit")
      }
    } catch {
      setStatus("error")
      setTimeout(() => setStatus("idle"), 3000)
    }
  }

  return (
    <section id="creators" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-transparent to-[#14B8A6]/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30">
              <p className="text-sm font-semibold text-[#3B82F6]">CREATOR LAB</p>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E2E8F0] mb-6">
              The Intelligence <span className="gradient-text">Layer</span> of Your Brand
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-3xl mx-auto leading-relaxed">
              An end-to-end, self-orchestrating AI system that plans, creates, produces, distributes, and optimizes your
              brand narrative—autonomously. Not a tool. An intelligence.
            </p>
          </div>
        </ScrollAnimation>

        {/* Concept Section */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="glass-card rounded-2xl p-8 lg:p-12 mb-24 border border-[#3B82F6]/20">
            <h3 className="text-2xl font-bold text-[#E2E8F0] mb-6">How It Works</h3>
            <p className="text-[#94A3B8] leading-relaxed mb-8">
              Rather than managing multiple tools and humans, imagine a unified intelligence orchestrating your entire
              brand presence. Our multi-agent system works as a coordinated whole—each agent thinking, planning, and
              executing while staying perfectly synchronized. Strategy flows to creation. Creation flows to production.
              Production flows to distribution. Distribution feeds back to analytics. Analytics refines strategy.
              It&apos;s a system that learns, adapts, and improves itself.
            </p>
            <div className="flex items-center gap-2 text-[#22D3EE]">
              <Zap className="w-5 h-5" />
              <p className="font-semibold">The result: A brand that moves with intelligence. Always one step ahead.</p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Agents Grid */}
        <div className="mb-24">
          <ScrollAnimation animation="fade-up" delay={100}>
            <h3 className="text-3xl font-bold text-[#E2E8F0] mb-12 text-center">The Five Agents</h3>
          </ScrollAnimation>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {agents.map((agent, index) => (
              <ScrollAnimation key={agent.id} animation="fade-up" delay={index * 50}>
                <div className="group glass-card rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300 hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${agent.color} p-[2px] mb-6`}>
                    <div className="w-full h-full rounded-[9px] bg-[#030A1A] flex items-center justify-center">
                      <agent.icon className="w-6 h-6 text-[#22D3EE]" />
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#E2E8F0] mb-3">{agent.name}</h4>
                  <p className="text-[#94A3B8] leading-relaxed text-sm">{agent.description}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Workflow Timeline */}
        <div className="mb-24">
          <ScrollAnimation animation="fade-up" delay={100}>
            <h3 className="text-3xl font-bold text-[#E2E8F0] mb-4 text-center">The Orchestration Flow</h3>
            <p className="text-[#94A3B8] text-center mb-12 max-w-2xl mx-auto">
              Watch how intelligence moves through each layer, creating a self-improving brand ecosystem.
            </p>
          </ScrollAnimation>

          <div className="space-y-6">
            {workflow.map((item, index) => (
              <ScrollAnimation key={item.step} animation="slide-left" delay={index * 80}>
                <div className="flex gap-6 items-start">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#14B8A6] flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    {index < workflow.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-[#3B82F6]/50 to-transparent mt-2" />
                    )}
                  </div>
                  <div className="glass-card rounded-xl p-6 flex-1 border border-[#3B82F6]/20">
                    <h4 className="text-lg font-bold text-[#E2E8F0] mb-2">{item.title}</h4>
                    <p className="text-[#94A3B8] text-sm">{item.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        {/* Benefits for Creators */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="glass-card rounded-2xl p-8 lg:p-12 mb-24 border border-[#3B82F6]/20">
            <h3 className="text-2xl font-bold text-[#E2E8F0] mb-8">For Creators & Collaborators</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-[#22D3EE] mb-3">Amplified Capabilities</h4>
                <p className="text-[#94A3B8]">
                  Rather than replacing your creativity, this system amplifies it. Transform raw ideas into polished
                  narratives, prototype faster, and test concepts at scale.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#22D3EE] mb-3">Adaptive Intelligence</h4>
                <p className="text-[#94A3B8]">
                  The system learns what resonates with audiences and adapts in real-time. Your insights feed directly
                  into the intelligence, creating a feedback loop of continuous improvement.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#22D3EE] mb-3">Distributed Excellence</h4>
                <p className="text-[#94A3B8]">
                  Collaborate with researchers, storytellers, and builders. The system synchronizes efforts across
                  teams, reducing friction and accelerating collective output.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-[#22D3EE] mb-3">Focus on Impact</h4>
                <p className="text-[#94A3B8]">
                  Stop worrying about logistics. The intelligence handles scheduling, optimization, and routine
                  execution while you focus on strategic decisions and creative direction.
                </p>
              </div>
            </div>
          </div>
        </ScrollAnimation>

        {/* Signup Section */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="glass-card rounded-2xl p-8 lg:p-12 border border-[#3B82F6]/20">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Content */}
              <div>
                <h3 className="text-2xl font-bold text-[#E2E8F0] mb-6">Join the Intelligence Network</h3>
                <p className="text-[#94A3B8] mb-6 leading-relaxed">
                  We&apos;re building a community of creators, researchers, and storytellers who believe in the power of
                  agentic intelligence. If you want to explore how autonomous systems can amplify your creative work and
                  push the boundaries of what&apos;s possible, let&apos;s talk.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-[#E2E8F0]">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <span>Early access to new agents and capabilities</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#E2E8F0]">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <span>Collaborate on breakthrough projects with our team</span>
                  </li>
                  <li className="flex items-center gap-3 text-[#E2E8F0]">
                    <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                    <span>Participate in shaping the future of AI-driven creation</span>
                  </li>
                </ul>
              </div>

              {/* Form */}
              <div>
                {status === "success" ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="w-16 h-16 rounded-full bg-[#14B8A6]/20 flex items-center justify-center mb-4">
                      <CheckCircle className="w-8 h-8 text-[#14B8A6]" />
                    </div>
                    <h4 className="text-xl font-semibold text-[#E2E8F0] mb-2 text-center">Joined!</h4>
                    <p className="text-[#94A3B8] text-center">
                      Check your email for next steps. Welcome to the network.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-[#E2E8F0] mb-2">Email Address</label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-[#0F172A]/50 border-[#3B82F6]/20 text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#E2E8F0] mb-2">I am a...</label>
                      <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg bg-[#0F172A]/50 border border-[#3B82F6]/20 text-[#E2E8F0] focus:border-[#3B82F6] focus:ring-[#3B82F6]/20 transition-colors"
                      >
                        <option value="creator">Creator / Storyteller</option>
                        <option value="researcher">Researcher</option>
                        <option value="entrepreneur">Entrepreneur</option>
                        <option value="developer">Developer</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#22D3EE] text-white font-semibold hover:shadow-lg hover:shadow-[#3B82F6]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed h-11 active:scale-95"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          Join Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    {status === "error" && (
                      <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

"use client"

import { Button } from "@/components/ui/button"

const teamMembers = [
  { role: "Founder & CEO", specialty: "AI Strategy" },
  { role: "Head of Research", specialty: "Multi-Agent Systems" },
  { role: "Lead Engineer", specialty: "System Architecture" },
  { role: "AI Scientist", specialty: "Reasoning Models" },
  { role: "Product Lead", specialty: "UX & Design" },
  { role: "ML Engineer", specialty: "Model Optimization" },
]

export function TeamSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            Built By <span className="gradient-text">Exceptional People</span>
          </h2>
          <p className="text-[#B3B4BD]/60 max-w-2xl mx-auto">A team of researchers, engineers, and visionaries.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group glass-card rounded-2xl p-6 hover:border-[#116466]/60 transition-all duration-300 text-center"
            >
              {/* Abstract Avatar */}
              <div className="w-20 h-20 mx-auto mb-4 relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0A21C0] to-[#116466] opacity-30" />
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0A21C0" />
                      <stop offset="50%" stopColor="#116466" />
                      <stop offset="100%" stopColor="#D9B08C" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points="50,15 85,35 85,75 50,95 15,75 15,35"
                    fill="none"
                    stroke={`url(#grad-${index})`}
                    strokeWidth="2"
                  />
                  <circle cx="35" cy="45" r="5" fill="#0A21C0" />
                  <circle cx="65" cy="45" r="5" fill="#116466" />
                  <line x1="35" y1="70" x2="65" y2="70" stroke={`url(#grad-${index})`} strokeWidth="2" />
                </svg>
              </div>

              <h3 className="text-lg font-semibold text-[#F5F7FA] mb-1">{member.role}</h3>

              <p className="text-sm text-[#D9B08C]">{member.specialty}</p>
            </div>
          ))}
        </div>

        {/* CTA Panel */}
        <div className="mt-16 glass-card rounded-2xl p-8 lg:p-12 text-center gradient-border">
          <h3 className="text-2xl lg:text-3xl font-bold text-[#F5F7FA] mb-4">
            We Are Always Looking for Exceptional Talent
          </h3>
          <p className="text-[#B3B4BD]/60 mb-8 max-w-2xl mx-auto">Join us in building the future of intelligence.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-[#0A21C0] to-[#116466] text-white font-semibold px-8">
              Join the Lab
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#0A21C0]/50 text-[#B3B4BD] hover:bg-[#0A21C0]/20 bg-transparent"
            >
              Collaborate With Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

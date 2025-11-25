"use client"

const timeline = [
  { year: "2023", label: "The Idea", description: "A vision for practical AI" },
  { year: "2023", label: "First Prototypes", description: "Early experiments" },
  { year: "2024", label: "Production Systems", description: "Real-world deployments" },
  { year: "2025", label: "Innovation Studio", description: "Full-service AI lab" },
  { year: "∞", label: "The Future", description: "Unlimited potential" },
]

export function OriginStory() {
  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-transparent via-[#0A21C0]/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-6">
              The <span className="gradient-text">Ravion Vision</span>
            </h2>

            <p className="text-lg text-[#B3B4BD]/70 leading-relaxed mb-6">
              Ravion Lab started with a belief: The future will be built by people who understand intelligence
              deeply—and apply it boldly.
            </p>

            <p className="text-lg text-[#B3B4BD]/70 leading-relaxed">
              We&apos;re not just building AI tools. We&apos;re creating a new category of adaptive, autonomous systems
              that amplify human capability.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#0A21C0] via-[#116466] to-transparent" />

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start gap-6 pl-16">
                  {/* Node */}
                  <div className="absolute left-6 w-4 h-4 rounded-full bg-gradient-to-r from-[#0A21C0] to-[#116466] -translate-x-1/2 mt-1.5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0A21C0] to-[#116466] animate-ping opacity-30" />
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-sm text-[#D9B08C] font-medium">{item.year}</span>
                    <h3 className="text-xl font-semibold text-[#F5F7FA]">{item.label}</h3>
                    <p className="text-[#B3B4BD]/60 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

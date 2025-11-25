import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ValuePillars } from "@/components/value-pillars"
import { CapabilitiesGrid } from "@/components/capabilities-grid"
import { InteractiveSandbox } from "@/components/interactive-sandbox"
import { ResearchPhilosophy } from "@/components/research-philosophy"
import { CreatorLab } from "@/components/creator-lab"
import { BusinessSolutions } from "@/components/business-solutions"
import { OriginStory } from "@/components/origin-story"
import { TeamSection } from "@/components/team-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <CosmicBackground />
      <Navbar />
      <HeroSection />
      <ValuePillars />
      <CapabilitiesGrid />
      <InteractiveSandbox />
      <ResearchPhilosophy />
      <CreatorLab />
      <BusinessSolutions />
      <OriginStory />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

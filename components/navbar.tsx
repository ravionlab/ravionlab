"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Research", href: "#research" },
  { label: "Creators", href: "#creators" },
  { label: "Business", href: "#business" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#141619]/80 backdrop-blur-xl border-b border-[#0A21C0]/20" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="gradient-text">RAVION</span>
          <span className="text-[#B3B4BD]"> LAB</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[#B3B4BD]/70 hover:text-[#D9B08C] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA Button - Updated gradient */}
        <div className="hidden md:block">
          <Button
            className="bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#22D3EE] text-white font-semibold px-6 py-2 h-10 hover:shadow-lg hover:shadow-[#3B82F6]/30 transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="#contact">Build With Us</a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-[#B3B4BD] p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#141619]/95 backdrop-blur-xl border-t border-[#0A21C0]/20 px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-[#B3B4BD]/70 hover:text-[#D9B08C] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            className="w-full mt-4 bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#22D3EE] text-white font-semibold hover:shadow-lg hover:shadow-[#3B82F6]/30 transition-all duration-300 h-10"
            asChild
          >
            <a href="#contact">Build With Us</a>
          </Button>
        </div>
      )}
    </header>
  )
}

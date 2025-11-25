"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Building2, Users, CheckCircle, Loader2 } from "lucide-react"
import { ScrollAnimation } from "@/components/scroll-animation"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      // SheetDB API endpoint - user should replace with their own
      const SHEETDB_API = process.env.NEXT_PUBLIC_SHEETDB_API || "https://sheetdb.io/api/v1/YOUR_SHEETDB_ID"

      const response = await fetch(SHEETDB_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString(),
          },
        ]),
      })

      if (response.ok) {
        setStatus("success")
        setFormData({ name: "", email: "", message: "" })
        // Reset status after 5 seconds
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
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Content */}
          <ScrollAnimation animation="slide-right">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#E2E8F0] mb-6">
                Let&apos;s Build Something <span className="gradient-text">Intelligent</span> Together
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#14B8A6]/20 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">For Businesses</h3>
                    <p className="text-[#94A3B8]">AI integration, custom workflows, agentic systems.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#14B8A6]/20 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">For Creators</h3>
                    <p className="text-[#94A3B8]">Collaborate, learn, and build the future with us.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#14B8A6]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#22D3EE]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">Email</h3>
                    <a
                      href="mailto:ravionlab.tech@gmail.com"
                      className="text-[#22D3EE] hover:text-[#3B82F6] transition-colors"
                    >
                      ravionlab.tech@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Contact Form */}
          <ScrollAnimation animation="slide-left" delay={150}>
            <div className="glass-card rounded-2xl p-8">
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#14B8A6]/20 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-[#14B8A6]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#E2E8F0] mb-2">Message Sent!</h3>
                  <p className="text-[#94A3B8]">We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">Full Name</label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-[#0F172A]/50 border-[#3B82F6]/20 text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#3B82F6] transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">Email</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-[#0F172A]/50 border-[#3B82F6]/20 text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#3B82F6] transition-colors"
                      placeholder="john@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#94A3B8] mb-2">Message</label>
                    <Textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-[#0F172A]/50 border-[#3B82F6]/20 text-[#E2E8F0] placeholder:text-[#64748B] focus:border-[#3B82F6] transition-colors min-h-[120px]"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={status === "loading"}
                    className="w-full bg-gradient-to-r from-[#3B82F6] via-[#14B8A6] to-[#22D3EE] text-white font-semibold hover:shadow-lg hover:shadow-[#3B82F6]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Start Your Project"
                    )}
                  </Button>

                  {status === "error" && (
                    <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
                  )}
                </form>
              )}
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}

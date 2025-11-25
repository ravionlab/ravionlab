"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Zap } from "lucide-react"

const workflowSteps = [
  { id: 1, label: "Input", status: "pending" },
  { id: 2, label: "Web Search", status: "pending" },
  { id: 3, label: "Extract Data", status: "pending" },
  { id: 4, label: "Analyze", status: "pending" },
  { id: 5, label: "Generate Report", status: "pending" },
  { id: 6, label: "Output", status: "pending" },
]

export function InteractiveSandbox() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [steps, setSteps] = useState(workflowSteps)
  const [logs, setLogs] = useState<string[]>([])
  const [rotationSpeed, setRotationSpeed] = useState(0.8)

  useEffect(() => {
    if (!isRunning || currentStep >= steps.length) return

    const timer = setTimeout(() => {
      setSteps((prev) =>
        prev.map((step, i) => ({
          ...step,
          status: i < currentStep ? "complete" : i === currentStep ? "active" : "pending",
        })),
      )

      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Executing: ${steps[currentStep].label}...`])
      setRotationSpeed((prev) => Math.min(prev + 0.3, 3.5))
      setCurrentStep((prev) => prev + 1)
    }, 1200)

    return () => clearTimeout(timer)
  }, [isRunning, currentStep, steps.length])

  useEffect(() => {
    if (currentStep >= steps.length && isRunning) {
      setSteps((prev) => prev.map((step) => ({ ...step, status: "complete" })))
      setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] Workflow completed successfully!`])
      setIsRunning(false)
    }
  }, [currentStep, steps.length, isRunning])

  const handleRun = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setSteps(workflowSteps)
    setLogs([])
    setRotationSpeed(0.8)
  }

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
        <div
          className="w-[600px] h-[600px] rounded-full border-2 border-[#D9B08C]/25"
          style={{
            animation: `spin ${24 / rotationSpeed}s linear infinite`,
            willChange: "transform",
          }}
        >
          <div
            className="absolute inset-4 rounded-full border border-[#0A21C0]/30"
            style={{ animation: `spin ${18 / rotationSpeed}s linear infinite reverse`, willChange: "transform" }}
          />
          <div
            className="absolute inset-8 rounded-full border border-[#116466]/20"
            style={{ animation: `spin ${12 / rotationSpeed}s linear infinite`, willChange: "transform" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0A21C0] to-[#116466] blur-xl opacity-60" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F5F7FA] mb-4">
            See <span className="gradient-text">Intelligence</span> in Action
          </h2>
          <p className="text-[#B3B4BD]/60 max-w-2xl mx-auto">Watch an agentic AI workflow execute in real-time.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 glass-card rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <Zap className="w-5 h-5 text-[#D9B08C]" />
              <h3 className="text-lg font-semibold text-[#F5F7FA]">Agent Workflow</h3>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 min-h-[200px]">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`
                      w-24 h-24 rounded-xl flex flex-col items-center justify-center transition-all duration-300
                      ${
                        step.status === "complete"
                          ? "bg-gradient-to-br from-[#0A21C0] to-[#116466] text-white"
                          : step.status === "active"
                            ? "bg-[#0A21C0]/30 border-2 border-[#0A21C0] text-white animate-pulse"
                            : "bg-[#2C2E3A]/50 border border-[#B3B4BD]/20 text-[#B3B4BD]/50"
                      }
                    `}
                  >
                    <span className="text-2xl font-bold">{step.id}</span>
                    <span className="text-xs mt-1">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                        step.status === "complete" ? "bg-[#D9B08C]" : "bg-[#B3B4BD]/20"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-[#141619]/50 rounded-xl">
              <p className="text-sm text-[#B3B4BD]/60 mb-2">Sample Task:</p>
              <p className="text-[#F5F7FA] font-mono text-sm">"Research competitors and create comparison report"</p>
            </div>
          </div>

          <div className="lg:col-span-2 glass-card rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-[#F5F7FA] mb-6">Control Panel</h3>

            <div className="flex gap-4 mb-6">
              <Button
                onClick={handleRun}
                className={`flex-1 transition-all ${
                  isRunning
                    ? "bg-[#D9B08C] hover:bg-[#D9B08C]/80 text-[#141619]"
                    : "bg-gradient-to-r from-[#0A21C0] to-[#116466] text-white"
                }`}
              >
                {isRunning ? <Pause className="mr-2 w-4 h-4" /> : <Play className="mr-2 w-4 h-4" />}
                {isRunning ? "Pause" : "Run Agent"}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                className="border-[#0A21C0]/50 text-[#B3B4BD] hover:bg-[#0A21C0]/20 bg-transparent"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            <div className="bg-[#141619]/50 rounded-xl p-4 h-[200px] overflow-y-auto font-mono text-xs">
              <p className="text-[#B3B4BD]/40 mb-2">Execution Log:</p>
              {logs.length === 0 ? (
                <p className="text-[#B3B4BD]/30">Click "Run Agent" to start...</p>
              ) : (
                logs.map((log, i) => (
                  <p key={i} className="text-[#116466] mb-1">
                    {log}
                  </p>
                ))
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-[#2C2E3A]/50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-[#D9B08C]">
                  {currentStep}/{steps.length}
                </p>
                <p className="text-xs text-[#B3B4BD]/50">Steps Complete</p>
              </div>
              <div className="bg-[#2C2E3A]/50 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold text-[#0A21C0]">{rotationSpeed.toFixed(1)}x</p>
                <p className="text-xs text-[#B3B4BD]/50">Speed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

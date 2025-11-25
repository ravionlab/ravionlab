"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

interface ScrollAnimationProps {
  children: ReactNode
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale"
  delay?: number
  duration?: number
  className?: string
}

export function ScrollAnimation({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `opacity ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}ms`,
    }

    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return { ...baseStyles, opacity: 0, transform: "translateY(30px)" }
        case "fade-in":
          return { ...baseStyles, opacity: 0 }
        case "slide-left":
          return { ...baseStyles, opacity: 0, transform: "translateX(40px)" }
        case "slide-right":
          return { ...baseStyles, opacity: 0, transform: "translateX(-40px)" }
        case "scale":
          return { ...baseStyles, opacity: 0, transform: "scale(0.98)" }
        default:
          return { ...baseStyles, opacity: 0 }
      }
    }

    return { ...baseStyles, opacity: 1, transform: "translateY(0) translateX(0) scale(1)" }
  }

  return (
    <div ref={ref} className={className} style={getAnimationStyles()}>
      {children}
    </div>
  )
}

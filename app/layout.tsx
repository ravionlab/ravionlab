import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter, Arimo as V0_Font_Arimo, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _arimo = V0_Font_Arimo({ subsets: ['latin'], weight: ["400","500","600","700"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Ravion Lab | Agentic AI Innovation Studio",
  description:
    "Building autonomous, adaptive AI systems for creators, businesses, and research teams. The Intelligence Layer of Your Enterprise.",
  keywords: ["AI", "Agentic AI", "Machine Learning", "Autonomous Systems", "Innovation"],
    generator: 'v0.app'
}

export const viewport = {
  themeColor: "#030305",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

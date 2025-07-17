import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { MobileBottomNav } from "@/components/mobile-bottom-nav" // Importar el nuevo componente

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Riego Inteligente",
  description: "Monitorea y controla tu sistema de riego de forma inteligente.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            {/* Barra de navegación superior para desktop */}
            <div className="hidden md:block">
              <MainNav />
            </div>
            <main className="flex-1 pb-14 md:pb-0">{children}</main>{" "}
            {/* Añadir padding-bottom para la barra inferior */}
            {/* Barra de navegación inferior para mobile */}
            <div className="md:hidden">
              <MobileBottomNav />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

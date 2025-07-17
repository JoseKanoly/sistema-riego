"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { HomeIcon, GaugeIcon, HistoryIcon, BookOpenIcon, LightbulbIcon, CalculatorIcon } from "lucide-react"

export function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Inicio", href: "/", icon: HomeIcon },
    { name: "Sistema", href: "/sistema", icon: GaugeIcon },
    { name: "Historial", href: "/historial", icon: HistoryIcon },
    { name: "Wiki", href: "/wiki", icon: BookOpenIcon },
    { name: "Tutorial", href: "/tutorial", icon: LightbulbIcon },
    { name: "Calculadora", href: "/calculadora-fertilizante", icon: CalculatorIcon }, // Nuevo item de navegación
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t shadow-lg md:hidden">
      <div className="flex h-14 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full text-xs font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className={cn("h-5 w-5 mb-1", isActive ? "text-primary" : "text-muted-foreground")} />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

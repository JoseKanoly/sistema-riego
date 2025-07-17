"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  SproutIcon,
  HomeIcon,
  GaugeIcon,
  HistoryIcon,
  BookOpenIcon,
  LightbulbIcon,
  CalculatorIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react" // Importar SunIcon y MoonIcon
import { Button } from "@/components/ui/button" // Importar Button
import { useTheme } from "next-themes" // Importar useTheme

export function MainNav() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme() // Obtener el tema actual y la función para cambiarlo

  const navItems = [
    { name: "Inicio", href: "/", icon: HomeIcon },
    { name: "Sistema", href: "/sistema", icon: GaugeIcon },
    { name: "Historial", href: "/historial", icon: HistoryIcon },
    { name: "Wiki", href: "/wiki", icon: BookOpenIcon },
    { name: "Tutorial", href: "/tutorial", icon: LightbulbIcon },
    { name: "Calculadora", href: "/calculadora-fertilizante", icon: CalculatorIcon },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark") // Alternar entre tema oscuro y claro
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo y navegación en desktop */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <SproutIcon className="h-6 w-6" />
          <span className="hidden font-bold sm:inline-block">Riego&nbsp;Inteligente</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full transition-colors hover:bg-accent hover:text-accent-foreground",
                  pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
                )}
                title={item.name}
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        {/* Botón para cambiar el tema */}
        <div className="ml-auto flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" /> // Muestra el sol si el tema es oscuro
            ) : (
              <MoonIcon className="h-5 w-5" /> // Muestra la luna si el tema es claro
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

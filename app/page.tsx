import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SproutIcon } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] px-4 py-12 text-center bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-black">
      <div className="space-y-6 w-full max-w-4xl">
        {" "}
        {/* Añadido w-full max-w-4xl para controlar el ancho del contenido */}
        <SproutIcon className="h-24 w-24 text-green-600 mx-auto animate-bounce" />
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
          Bienvenido a tu Sistema de Riego Inteligente
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Monitorea la salud de tus plantas y automatiza el riego para un crecimiento óptimo. Accede a datos en tiempo
          real, historial de riego y una wiki de plantas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
            <Link href="/sistema">Ir al Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tutorial">Ver Tutorial</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

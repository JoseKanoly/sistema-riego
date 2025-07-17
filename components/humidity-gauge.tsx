"use client"

interface HumidityGaugeProps {
  humidity: number // Valor de humedad de 0 a 100
  color: string // Color de la barra de progreso
  size?: number // Diámetro del medidor en píxeles
  strokeWidth?: number // Grosor de la barra de progreso
}

/**
 * Componente HumidityGauge: Muestra un medidor circular que se llena según el nivel de humedad.
 * El color del medidor y el texto cambian dinámicamente.
 */
export function HumidityGauge({ humidity, color, size = 160, strokeWidth = 16 }: HumidityGaugeProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius

  // Asegura que la humedad sea un número válido y esté entre 0 y 100
  const displayHumidity = isNaN(humidity) ? 0 : Math.max(0, Math.min(100, humidity))

  // Calcula el offset para la barra de progreso (cuánto queda por llenar)
  const offset = circumference - (displayHumidity / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Círculo de fondo (la parte no llena del medidor) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          className="stroke-gray-200 dark:stroke-gray-700"
        />
        {/* Círculo de progreso (la parte llena del medidor) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round" // Extremos redondeados para la barra
          strokeDasharray={circumference} // Longitud total del círculo
          strokeDashoffset={offset} // Cuánto de la longitud total está "oculto" (no lleno)
          stroke={color} // Color dinámico
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out, stroke 0.5s ease-in-out" }} // Transición suave
        />
      </svg>
      {/* Texto del porcentaje de humedad en el centro */}
      <div className="absolute text-4xl font-bold" style={{ color: color }}>
        {displayHumidity.toFixed(0)}%
      </div>
    </div>
  )
}

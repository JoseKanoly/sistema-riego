"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { SproutIcon, ThermometerIcon, DropletIcon, ZapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HumidityGauge } from "@/components/humidity-gauge" // Importar el nuevo componente

// ¡ADVERTENCIA! Hardcodear tokens directamente en el código no es seguro para producción.
// Para una aplicación real, usa variables de entorno como process.env.NEXT_PUBLIC_BLYNK_TOKEN
const TOKEN = "null" // <-- Aquí está el token

interface HistoryEntry {
  timestamp: string
  soilHumidity: number
  soilTemperature: number
}

export default function SistemaPage() {
  const [soilHumidity, setSoilHumidity] = useState("--")
  const [ambientHumidity, setAmbientHumidity] = useState("--")
  const [temperature, setTemperature] = useState("--")
  const [pumpStatus, setPumpStatus] = useState("--")
  const [chartData, setChartData] = useState<{ time: string; "Humedad del Suelo": number }[]>([])
  const [isPumpToggling, setIsPumpToggling] = useState(false)
  const prevPumpStatusRef = useRef<string | null>(null)

  const getSoilChartLineColor = (humidity: number): string => {
    if (humidity < 30) {
      return "hsl(0 84.2% 60.2%)" // Rojo
    } else if (humidity >= 30 && humidity < 60) {
      return "hsl(30 98.2% 50.6%)" // Naranja
    } else {
      return "hsl(142.1 76.2% 36.3%)" // Verde
    }
  }

  const getTemperatureColorClass = (temp: number): string => {
    if (temp === null || isNaN(temp)) return "text-muted-foreground"
    if (temp < 15) {
      return "text-blue-500" // Frío
    } else if (temp >= 15 && temp <= 25) {
      return "text-green-500" // Normal
    } else {
      return "text-red-500" // Caliente
    }
  }

  const getAmbientHumidityColorClass = (hum: number): string => {
    if (hum === null || isNaN(hum)) return "text-muted-foreground"
    if (hum < 40) {
      return "text-orange-500" // Seco
    } else if (hum >= 40 && hum <= 70) {
      return "text-green-500" // Normal
    } else {
      return "text-blue-500" // Húmedo
    }
  }

  const updateData = async () => {
    if (!TOKEN) {
      console.error(
        "Blynk Token no configurado. Por favor, establece NEXT_PUBLIC_BLYNK_TOKEN en tus variables de entorno.",
      )
      return
    }

    try {
      // Asumiendo que V3 es Humedad Ambiente y V4 es Temperatura, según la corrección del usuario
      const [soilRes, pumpRes, ambientHumRes, tempRes] = await Promise.all([
        fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&V0`), // Humedad del Suelo
        fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&V1`), // Estado de la Bomba
        fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&V3`), // Humedad Ambiente (V3)
        fetch(`https://blynk.cloud/external/api/get?token=${TOKEN}&V4`), // Temperatura (V4)
      ])

      const soil = await soilRes.text()
      const pump = await pumpRes.text()
      const ambientHum = await ambientHumRes.text() // V3
      const temp = await tempRes.text() // V4

      setSoilHumidity(soil)
      setAmbientHumidity(ambientHum)
      setTemperature(temp)
      const currentPumpStatus = pump === "1" ? "ENCENDIDA" : "APAGADA"
      setPumpStatus(currentPumpStatus)

      // Save history when pump turns off
      if (prevPumpStatusRef.current === "ENCENDIDA" && currentPumpStatus === "APAGADA") {
        const historyEntry: HistoryEntry = {
          timestamp: new Date().toLocaleString(),
          soilHumidity: Number.parseFloat(soil),
          soilTemperature: Number.parseFloat(temp), // Usar el valor de temperatura (V4)
        }
        const existingHistory = JSON.parse(localStorage.getItem("irrigationHistory") || "[]")
        localStorage.setItem("irrigationHistory", JSON.stringify([...existingHistory, historyEntry]))
        console.log("Irrigation event saved:", historyEntry)
      }
      prevPumpStatusRef.current = currentPumpStatus

      const now = new Date().toLocaleTimeString()
      setChartData((prevData) => {
        const newData = [...prevData, { time: now, "Humedad del Suelo": Number.parseFloat(soil) }]
        if (newData.length > 20) {
          newData.shift()
        }
        return newData
      })
    } catch (error) {
      console.error("Error fetching data from Blynk:", error)
      setSoilHumidity("Error")
      setAmbientHumidity("Error")
      setTemperature("Error")
      setPumpStatus("Error")
    }
  }

  const togglePump = async () => {
    if (!TOKEN) {
      console.error("Blynk Token no configurado.")
      return
    }
    setIsPumpToggling(true)
    const newPumpState = pumpStatus === "ENCENDIDA" ? "0" : "1" // 0 for OFF, 1 for ON
    try {
      const response = await fetch(`https://blynk.cloud/external/api/update?token=${TOKEN}&V1=${newPumpState}`)
      if (response.ok) {
        // Give Blynk a moment to update, then fetch latest data
        setTimeout(updateData, 1000)
      } else {
        console.error("Failed to toggle pump:", response.statusText)
      }
    } catch (error) {
      console.error("Error toggling pump:", error)
    } finally {
      setIsPumpToggling(false)
    }
  }

  useEffect(() => {
    updateData() // Initial fetch
    const interval = setInterval(updateData, 5000) // Fetch every 5 seconds (5000 ms)
    return () => clearInterval(interval) // Cleanup on unmount
  }, [])

  const parsedSoilHumidity = Number.parseFloat(soilHumidity) // Parse humidity for the gauge
  const latestSoilHumidity = chartData.length > 0 ? chartData[chartData.length - 1]["Humedad del Suelo"] : 0
  const soilChartLineColor = getSoilChartLineColor(latestSoilHumidity) // This color will be used for both chart and gauge

  const chartConfig = {
    "Humedad del Suelo": {
      label: "Humedad del Suelo (%)",
      color: soilChartLineColor, // Dynamic color
    },
  }

  const parsedTemperature = Number.parseFloat(temperature)
  const parsedAmbientHumidity = Number.parseFloat(ambientHumidity)

  return (
    <div className="px-4 py-5">
      {" "}
      {/* Cambiado de 'container' a 'px-4' */}
      <h1 className="mb-6 text-3xl font-bold text-center flex items-center justify-center gap-2">
        <SproutIcon className="h-8 w-8 text-green-600" />
        Sistema de Riego Inteligente
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humedad del Suelo</CardTitle>
            <DropletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-4">
            <HumidityGauge humidity={parsedSoilHumidity} color={soilChartLineColor} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Historial de Humedad del Suelo</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.split(":")[0] + ":" + value.split(":")[1]}
                />
                <YAxis
                  domain={[0, 100]}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Line
                  dataKey="Humedad del Suelo"
                  type="monotone"
                  stroke={soilChartLineColor} // Dynamic color based on latest humidity
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
            <ThermometerIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-center">
            <div className={cn("text-4xl font-bold", getTemperatureColorClass(parsedTemperature))}>
              {temperature} °C
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Humedad Ambiente</CardTitle>
            <DropletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-center">
            <div className={cn("text-4xl font-bold", getAmbientHumidityColorClass(parsedAmbientHumidity))}>
              {ambientHumidity} %
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado de la Bomba</CardTitle>
            <ZapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-4xl font-bold">{pumpStatus}</div>
            <Button
              onClick={togglePump}
              disabled={isPumpToggling || pumpStatus === "--"}
              className={pumpStatus === "ENCENDIDA" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"}
            >
              {isPumpToggling ? "Cargando..." : pumpStatus === "ENCENDIDA" ? "APAGAR BOMBA" : "ENCENDER BOMBA"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

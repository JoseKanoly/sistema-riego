"use client"

import { useState } from "react"
import { CalculatorIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function FertilizerCalculatorPage() {
  const [waterVolume, setWaterVolume] = useState<string>("")
  const [recommendedDose, setRecommendedDose] = useState<string>("")
  const [doseUnit, setDoseUnit] = useState<"ml" | "g">("ml") // Default to ml
  const [calculatedFertilizer, setCalculatedFertilizer] = useState<number | null>(null)
  const [plantType, setPlantType] = useState<string>("")
  const [npkRecommendation, setNpkRecommendation] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [commonFertilizer, setCommonFertilizer] = useState<string>("") // New state for common fertilizer selection

  const commonFertilizersData = {
    universal: {
      dose: "2", // Example: 2 ml/L
      unit: "ml",
      plantType: "general",
      npk: "Un fertilizante balanceado (ej. 10-10-10 o 20-20-20) es bueno para el mantenimiento general de la mayoría de las plantas de interior durante su crecimiento activo.",
    },
    flowering: {
      dose: "3", // Example: 3 ml/L
      unit: "ml",
      plantType: "flor_fruto",
      npk: "Para plantas con flor o fruto (ej. Tomates, Rosas), necesitan más Fósforo (P) y Potasio (K) durante la etapa de floración/fructificación. Busca proporciones como 10-20-20 o 5-10-10.",
    },
    succulent: {
      dose: "1", // Example: 1 ml/L
      unit: "ml",
      plantType: "suculenta",
      npk: "Cactus y suculentas requieren muy poco fertilizante y con proporciones bajas en Nitrógeno. Un 5-10-10 o incluso menos es adecuado, y fertiliza con mucha menos frecuencia.",
    },
  } as const // Use 'as const' for type safety

  const handleCalculate = () => {
    setError(null)
    setCalculatedFertilizer(null) // Clear previous result on new calculation attempt

    const volume = Number.parseFloat(waterVolume)
    const dose = Number.parseFloat(recommendedDose)

    if (isNaN(volume) || isNaN(dose) || volume <= 0 || dose < 0) {
      setError("Por favor, introduce valores numéricos válidos y positivos para el volumen de agua y la dosis.")
      return
    }

    const result = volume * dose
    setCalculatedFertilizer(result)
  }

  const handleReset = () => {
    setWaterVolume("")
    setRecommendedDose("")
    setDoseUnit("ml")
    setCalculatedFertilizer(null)
    setPlantType("")
    setNpkRecommendation("")
    setError(null)
    setCommonFertilizer("") // Reset common fertilizer selection
  }

  const handleCommonFertilizerChange = (value: keyof typeof commonFertilizersData | "manual") => {
    setCommonFertilizer(value)
    if (value === "manual") {
      setRecommendedDose("")
      setDoseUnit("ml") // Reset to default unit for manual
      setPlantType("")
      setNpkRecommendation("")
    } else {
      const data = commonFertilizersData[value]
      setRecommendedDose(data.dose)
      setDoseUnit(data.unit as "ml" | "g") // Cast to correct type
      setPlantType(data.plantType)
      setNpkRecommendation(data.npk)
    }
    setCalculatedFertilizer(null) // Clear calculation when fertilizer type changes
    setError(null) // Clear error
  }

  const handlePlantTypeChange = (value: string) => {
    setPlantType(value)
    // Only update NPK recommendation if a common fertilizer isn't selected
    // or if the user explicitly changes the plant type after selecting "manual"
    if (commonFertilizer === "manual" || !commonFertilizer) {
      switch (value) {
        case "hoja":
          setNpkRecommendation(
            "Para plantas de hoja (ej. Monstera, Pothos), busca fertilizantes con una proporción de Nitrógeno (N) más alta, como 20-10-10 o similar. Esto promueve el crecimiento verde y frondoso.",
          )
          break
        case "flor_fruto":
          setNpkRecommendation(
            "Para plantas con flor o fruto (ej. Tomates, Rosas), necesitan más Fósforo (P) y Potasio (K) durante la etapa de floración/fructificación. Busca proporciones como 10-20-20 o 5-10-10.",
          )
          break
        case "suculenta":
          setNpkRecommendation(
            "Cactus y suculentas requieren muy poco fertilizante y con proporciones bajas en Nitrógeno. Un 5-10-10 o incluso menos es adecuado, y fertiliza con mucha menos frecuencia.",
          )
          break
        case "general":
          setNpkRecommendation(
            "Un fertilizante balanceado (ej. 10-10-10 o 20-20-20) es bueno para el mantenimiento general de la mayoría de las plantas de interior durante su crecimiento activo.",
          )
          break
        default:
          setNpkRecommendation("")
      }
    }
  }

  return (
    <div className="px-4 py-5">
      {" "}
      {/* Cambiado de 'container' a 'px-4' */}
      <h1 className="mb-6 text-3xl font-bold text-center flex items-center justify-center gap-2">
        <CalculatorIcon className="h-8 w-8 text-green-600" />
        Calculadora de Fertilizante para Agua
      </h1>
      <p className="text-center text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
        Calcula la cantidad de fertilizante que necesitas basándote en el volumen de agua y la dosis recomendada por el
        fabricante.
      </p>
      <Card className="w-full">
        {" "}
        {/* Eliminado 'max-w-2xl mx-auto' */}
        <CardHeader>
          <CardTitle className="text-center">Calcular Dosis de Fertilizante</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 flex flex-col items-center">
          <div className="grid gap-4 w-full max-w-sm">
            <div className="space-y-2">
              <Label htmlFor="common-fertilizer">Selecciona un Fertilizante Común</Label>
              <Select onValueChange={handleCommonFertilizerChange} value={commonFertilizer}>
                <SelectTrigger id="common-fertilizer">
                  <SelectValue placeholder="Selecciona un fertilizante" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="universal">Fertilizante Universal</SelectItem>
                  <SelectItem value="flowering">Fertilizante para Floración</SelectItem>
                  <SelectItem value="succulent">Fertilizante para Suculentas</SelectItem>
                  <SelectItem value="manual">Otro (Manual)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="water-volume">Volumen de Agua (Litros)</Label>
              <Input
                id="water-volume"
                type="number"
                placeholder="Ej: 1.5"
                value={waterVolume}
                onChange={(e) => setWaterVolume(e.target.value)}
                min="0.1"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recommended-dose">Dosis Recomendada del Fabricante</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="recommended-dose"
                  type="number"
                  placeholder="Ej: 2"
                  value={recommendedDose}
                  onChange={(e) => setRecommendedDose(e.target.value)}
                  min="0"
                  step="0.1"
                />
                <Select onValueChange={(value: "ml" | "g") => setDoseUnit(value)} value={doseUnit}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Unidad" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ml">ml/L</SelectItem>
                    <SelectItem value="g">g/L</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCalculate} className="flex-1">
                Calcular Cantidad de Fertilizante
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1 bg-transparent">
                Reiniciar
              </Button>
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center mt-4" role="alert">
              {error}
            </div>
          )}
          {calculatedFertilizer !== null && !error && (
            <div className="text-center mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-md w-full max-w-sm">
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                Cantidad de Fertilizante Necesaria:
              </h3>
              <p className="text-4xl font-bold text-green-600 dark:text-green-400 mt-2">
                {calculatedFertilizer.toFixed(2)} {doseUnit}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                (Asegúrate de mezclar bien con el volumen de agua especificado)
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="w-full mt-8">
        {" "}
        {/* Eliminado 'max-w-2xl mx-auto' */}
        <CardHeader>
          <CardTitle className="text-center">Recomendaciones NPK por Tipo de Planta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col items-center">
          <div className="space-y-2 w-full max-w-sm">
            <Label htmlFor="plant-type">Selecciona el Tipo de Planta</Label>
            <Select onValueChange={handlePlantTypeChange} value={plantType}>
              <SelectTrigger id="plant-type">
                <SelectValue placeholder="Selecciona un tipo de planta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General / Mantenimiento</SelectItem>
                <SelectItem value="hoja">Plantas de Hoja (ej. Monstera)</SelectItem>
                <SelectItem value="flor_fruto">Plantas con Flor o Fruto (ej. Rosas, Tomates)</SelectItem>
                <SelectItem value="suculenta">Cactus y Suculentas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {npkRecommendation && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md text-blue-800 dark:text-blue-200 w-full max-w-sm">
              <p className="font-medium">Recomendación NPK:</p>
              <p className="text-sm mt-1">{npkRecommendation}</p>
            </div>
          )}
          <p className="text-sm text-muted-foreground text-center w-full max-w-sm">
            {
              "Esta sección ofrece una guía general. Siempre consulta las etiquetas de tus fertilizantes y las necesidades específicas de tus plantas."
            }
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { HistoryIcon } from "@/components/icons/history-icon"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import type { HistoryEntry } from "@/types/history-entry"

export default function HistorialPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([])

  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("irrigationHistory") || "[]")
    setHistory(storedHistory)
  }, [])

  return (
    <div className="px-4 py-5">
      {" "}
      {/* Cambiado de 'container' a 'px-4' */}
      <h1 className="mb-6 text-3xl font-bold text-center flex items-center justify-center gap-2">
        <HistoryIcon className="h-8 w-8 text-blue-600" />
        Historial de Riego
      </h1>
      {history.length === 0 ? (
        <p className="text-center text-muted-foreground">No hay eventos de riego registrados aún.</p>
      ) : (
        <Card className="w-full">
          {" "}
          {/* Eliminado 'max-w-4xl mx-auto' */}
          <CardHeader>
            <CardTitle className="text-center">Eventos de Riego</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Fecha y Hora</TableHead>
                  <TableHead className="text-center">Humedad del Suelo (%)</TableHead>
                  <TableHead className="text-center">Temperatura del Suelo (°C)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{entry.timestamp}</TableCell>
                    <TableCell className="text-center">{entry.soilHumidity}</TableCell>
                    <TableCell className="text-center">{entry.soilTemperature}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
      <p className="mt-4 text-sm text-muted-foreground text-center max-w-2xl mx-auto">
        Nota: Este historial se guarda localmente en tu navegador. Para una persistencia en el servidor, se requeriría
        una base de datos.
      </p>
    </div>
  )
}

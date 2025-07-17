"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { plants } from "@/lib/plants"
import { BookOpenIcon } from "lucide-react"

interface Plant {
  id: number
  name: string
  image: string
  description: string
  care: string
}

export default function WikiPage() {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePlantClick = (plant: Plant) => {
    setSelectedPlant(plant)
    setIsDialogOpen(true)
  }

  return (
    <div className="px-4 py-5">
      {" "}
      {/* Cambiado de 'container' a 'px-4' */}
      <h1 className="mb-6 text-3xl font-bold text-center flex items-center justify-center gap-2">
        <BookOpenIcon className="h-8 w-8 text-purple-600" />
        Wiki de Plantas
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {" "}
        {/* Eliminado 'max-w-6xl mx-auto' */}
        {plants.map((plant) => (
          <Card
            key={plant.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handlePlantClick(plant)}
          >
            <CardHeader className="p-0">
              <Image
                src={plant.image || "/placeholder.svg"}
                alt={plant.name}
                width={400}
                height={300}
                className="rounded-t-lg object-cover w-full h-48"
              />
            </CardHeader>
            <CardContent className="p-4 text-center">
              <CardTitle className="text-lg font-semibold">{plant.name}</CardTitle>
              <CardDescription className="mt-2 line-clamp-2">{plant.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      {selectedPlant && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-center">{selectedPlant.name}</DialogTitle>
              <DialogDescription className="text-center">
                Información detallada sobre {selectedPlant.name}.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 text-center">
              {" "}
              {/* Centrado el contenido del diálogo */}
              <div className="flex justify-center">
                <Image
                  src={selectedPlant.image || "/placeholder.svg"}
                  alt={selectedPlant.name}
                  width={300}
                  height={300}
                  className="rounded-lg object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Descripción:</h3>
                <p className="text-muted-foreground">{selectedPlant.description}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Cuidados:</h3>
                <p className="text-muted-foreground">{selectedPlant.care}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

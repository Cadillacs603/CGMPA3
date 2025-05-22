"use client"

import { useState, useEffect } from "react"
import { CalendarIcon } from "lucide-react"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Evento {
  id: string
  titulo: string
  fecha: string
  hora: string
  lugar: string
  descripcion?: string
}

export function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [eventos, setEventos] = useState<Evento[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Cargar eventos al montar el componente
  useEffect(() => {
    const cargarEventos = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/eventos")

        if (!response.ok) {
          throw new Error("Error al cargar eventos")
        }

        const data = await response.json()
        setEventos(data)
        setError(null)
      } catch (error) {
        console.error("Error al cargar eventos:", error)
        setError("No se pudieron cargar los eventos. Por favor, intenta más tarde.")
      } finally {
        setIsLoading(false)
      }
    }

    cargarEventos()
  }, [])

  // Función para verificar si hay eventos en una fecha específica
  const hasEvent = (day: Date) => {
    return eventos.some((event) => {
      if (!event.fecha) return false
      const eventDate = parseISO(event.fecha)
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      )
    })
  }

  // Función para obtener eventos de una fecha específica
  const getEvents = (day: Date) => {
    if (!day) return []

    return eventos.filter((event) => {
      if (!event.fecha) return false
      const eventDate = parseISO(event.fecha)
      return (
        eventDate.getDate() === day.getDate() &&
        eventDate.getMonth() === day.getMonth() &&
        eventDate.getFullYear() === day.getFullYear()
      )
    })
  }

  return (
    <div className="space-y-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            locale={es}
            modifiers={{ hasEvent: (date) => hasEvent(date) }}
            modifiersClassNames={{
              hasEvent: "bg-purple-100 font-bold text-purple-900",
            }}
          />
        </PopoverContent>
      </Popover>

      {isLoading ? (
        <div className="text-center py-4">Cargando eventos...</div>
      ) : error ? (
        <div className="text-center py-4 text-red-500">{error}</div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold">Próximos Eventos</h3>
            {eventos.length === 0 ? (
              <div className="text-center py-4">No hay eventos programados.</div>
            ) : (
              <div className="space-y-4">
                {eventos.slice(0, 3).map((evento) => (
                  <div key={evento.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-900">
                      <CalendarIcon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">{evento.titulo}</p>
                      <p className="text-sm text-muted-foreground">
                        {evento.fecha && format(parseISO(evento.fecha), "PPP", { locale: es })} - {evento.hora} hrs -{" "}
                        {evento.lugar}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {date && hasEvent(date) && (
            <div className="rounded-lg border p-4">
              <h4 className="font-medium mb-2">Eventos para {format(date, "PPP", { locale: es })}</h4>
              <ul className="space-y-2">
                {getEvents(date).map((event) => (
                  <li key={event.id} className="flex items-start gap-2">
                    <CalendarIcon className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <span className="font-medium">{event.titulo}</span>
                      <p className="text-sm text-muted-foreground">
                        {event.hora} hrs - {event.lugar}
                      </p>
                      {event.descripcion && <p className="text-sm mt-1">{event.descripcion}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  )
}

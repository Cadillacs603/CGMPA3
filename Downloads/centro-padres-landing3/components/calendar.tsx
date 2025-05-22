"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Eventos de ejemplo
  const events = [
    { date: new Date(2025, 4, 25), title: "Reunión General de Apoderados" },
    { date: new Date(2025, 5, 15), title: "Día de la Familia" },
    { date: new Date(2025, 5, 30), title: "Taller para Padres: Educación Emocional" },
  ]

  // Función para verificar si hay eventos en una fecha específica
  const hasEvent = (day: Date) => {
    return events.some(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
  }

  // Función para obtener eventos de una fecha específica
  const getEvents = (day: Date) => {
    return events.filter(
      (event) =>
        event.date.getDate() === day.getDate() &&
        event.date.getMonth() === day.getMonth() &&
        event.date.getFullYear() === day.getFullYear(),
    )
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

      {date && hasEvent(date) && (
        <div className="rounded-lg border p-4">
          <h4 className="font-medium mb-2">Eventos para {format(date, "PPP", { locale: es })}</h4>
          <ul className="space-y-2">
            {getEvents(date).map((event, index) => (
              <li key={index} className="flex items-start gap-2">
                <CalendarIcon className="h-5 w-5 text-purple-600 mt-0.5" />
                <span>{event.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

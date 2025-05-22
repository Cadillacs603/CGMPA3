import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Ruta al archivo JSON
const DATA_FILE = path.join(process.cwd(), "data", "eventos.json")

// Leer eventos del archivo
const getEventos = () => {
  const data = fs.readFileSync(DATA_FILE, "utf8")
  return JSON.parse(data)
}

// Guardar eventos en el archivo
const saveEventos = (eventos: any[]) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(eventos, null, 2))
}

// GET: Obtener un evento específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const eventos = getEventos()
    const evento = eventos.find((e: any) => e.id === params.id)

    if (!evento) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 })
    }

    return NextResponse.json(evento)
  } catch (error) {
    console.error("Error al obtener evento:", error)
    return NextResponse.json({ error: "Error al obtener evento" }, { status: 500 })
  }
}

// PUT: Actualizar un evento
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const datosActualizados = await request.json()
    const eventos = getEventos()
    const index = eventos.findIndex((e: any) => e.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 })
    }

    // Actualizar el evento
    eventos[index] = {
      ...eventos[index],
      ...datosActualizados,
      updatedAt: new Date().toISOString(),
    }

    saveEventos(eventos)

    return NextResponse.json(eventos[index])
  } catch (error) {
    console.error("Error al actualizar evento:", error)
    return NextResponse.json({ error: "Error al actualizar evento" }, { status: 500 })
  }
}

// DELETE: Eliminar un evento
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const eventos = getEventos()
    const index = eventos.findIndex((e: any) => e.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 })
    }

    // Eliminar el evento
    eventos.splice(index, 1)
    saveEventos(eventos)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar evento:", error)
    return NextResponse.json({ error: "Error al eliminar evento" }, { status: 500 })
  }
}

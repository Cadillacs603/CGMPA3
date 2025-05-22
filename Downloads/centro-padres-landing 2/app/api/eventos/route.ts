import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Ruta al archivo JSON que almacenará los eventos
// En una implementación real, usarías una base de datos
const DATA_FILE = path.join(process.cwd(), "data", "eventos.json")

// Asegurarse de que el directorio data existe
const ensureDirectoryExists = () => {
  const dir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]))
  }
}

// Leer eventos del archivo
const getEventos = () => {
  ensureDirectoryExists()
  const data = fs.readFileSync(DATA_FILE, "utf8")
  return JSON.parse(data)
}

// Guardar eventos en el archivo
const saveEventos = (eventos: any[]) => {
  ensureDirectoryExists()
  fs.writeFileSync(DATA_FILE, JSON.stringify(eventos, null, 2))
}

// GET: Obtener todos los eventos
export async function GET() {
  try {
    const eventos = getEventos()
    return NextResponse.json(eventos)
  } catch (error) {
    console.error("Error al obtener eventos:", error)
    return NextResponse.json({ error: "Error al obtener eventos" }, { status: 500 })
  }
}

// POST: Crear un nuevo evento
export async function POST(request: Request) {
  try {
    const nuevoEvento = await request.json()
    const eventos = getEventos()

    // Agregar ID y fecha de creación
    const eventoConId = {
      ...nuevoEvento,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }

    eventos.push(eventoConId)
    saveEventos(eventos)

    return NextResponse.json(eventoConId, { status: 201 })
  } catch (error) {
    console.error("Error al crear evento:", error)
    return NextResponse.json({ error: "Error al crear evento" }, { status: 500 })
  }
}

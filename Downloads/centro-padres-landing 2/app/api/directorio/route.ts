import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Ruta al archivo JSON que almacenará los miembros del directorio
const DATA_FILE = path.join(process.cwd(), "data", "directorio.json")

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

// Leer miembros del directorio del archivo
const getMiembros = () => {
  ensureDirectoryExists()
  const data = fs.readFileSync(DATA_FILE, "utf8")
  return JSON.parse(data)
}

// Guardar miembros del directorio en el archivo
const saveMiembros = (miembros: any[]) => {
  ensureDirectoryExists()
  fs.writeFileSync(DATA_FILE, JSON.stringify(miembros, null, 2))
}

// GET: Obtener todos los miembros del directorio
export async function GET() {
  try {
    const miembros = getMiembros()
    return NextResponse.json(miembros)
  } catch (error) {
    console.error("Error al obtener miembros del directorio:", error)
    return NextResponse.json({ error: "Error al obtener miembros del directorio" }, { status: 500 })
  }
}

// POST: Crear un nuevo miembro del directorio
export async function POST(request: Request) {
  try {
    const nuevoMiembro = await request.json()
    const miembros = getMiembros()

    // Agregar ID y fecha de creación
    const miembroConId = {
      ...nuevoMiembro,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }

    miembros.push(miembroConId)
    saveMiembros(miembros)

    return NextResponse.json(miembroConId, { status: 201 })
  } catch (error) {
    console.error("Error al crear miembro del directorio:", error)
    return NextResponse.json({ error: "Error al crear miembro del directorio" }, { status: 500 })
  }
}

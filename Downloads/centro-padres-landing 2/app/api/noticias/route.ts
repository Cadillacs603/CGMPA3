import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { v4 as uuidv4 } from "uuid"

// Ruta al archivo JSON que almacenará las noticias
const DATA_FILE = path.join(process.cwd(), "data", "noticias.json")

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

// Leer noticias del archivo
const getNoticias = () => {
  ensureDirectoryExists()
  const data = fs.readFileSync(DATA_FILE, "utf8")
  return JSON.parse(data)
}

// Guardar noticias en el archivo
const saveNoticias = (noticias: any[]) => {
  ensureDirectoryExists()
  fs.writeFileSync(DATA_FILE, JSON.stringify(noticias, null, 2))
}

// GET: Obtener todas las noticias
export async function GET() {
  try {
    const noticias = getNoticias()
    return NextResponse.json(noticias)
  } catch (error) {
    console.error("Error al obtener noticias:", error)
    return NextResponse.json({ error: "Error al obtener noticias" }, { status: 500 })
  }
}

// POST: Crear una nueva noticia
export async function POST(request: Request) {
  try {
    const nuevaNoticia = await request.json()
    const noticias = getNoticias()

    // Agregar ID y fecha de creación
    const noticiaConId = {
      ...nuevaNoticia,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    }

    noticias.push(noticiaConId)
    saveNoticias(noticias)

    return NextResponse.json(noticiaConId, { status: 201 })
  } catch (error) {
    console.error("Error al crear noticia:", error)
    return NextResponse.json({ error: "Error al crear noticia" }, { status: 500 })
  }
}

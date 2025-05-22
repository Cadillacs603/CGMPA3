import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Ruta al archivo JSON
const DATA_FILE = path.join(process.cwd(), "data", "noticias.json")

// Leer noticias del archivo
const getNoticias = () => {
  const data = fs.readFileSync(DATA_FILE, "utf8")
  return JSON.parse(data)
}

// Guardar noticias en el archivo
const saveNoticias = (noticias: any[]) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(noticias, null, 2))
}

// GET: Obtener una noticia específica
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const noticias = getNoticias()
    const noticia = noticias.find((n: any) => n.id === params.id)

    if (!noticia) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 })
    }

    return NextResponse.json(noticia)
  } catch (error) {
    console.error("Error al obtener noticia:", error)
    return NextResponse.json({ error: "Error al obtener noticia" }, { status: 500 })
  }
}

// PUT: Actualizar una noticia
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const datosActualizados = await request.json()
    const noticias = getNoticias()
    const index = noticias.findIndex((n: any) => n.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 })
    }

    // Actualizar la noticia
    noticias[index] = {
      ...noticias[index],
      ...datosActualizados,
      updatedAt: new Date().toISOString(),
    }

    saveNoticias(noticias)

    return NextResponse.json(noticias[index])
  } catch (error) {
    console.error("Error al actualizar noticia:", error)
    return NextResponse.json({ error: "Error al actualizar noticia" }, { status: 500 })
  }
}

// DELETE: Eliminar una noticia
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const noticias = getNoticias()
    const index = noticias.findIndex((n: any) => n.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Noticia no encontrada" }, { status: 404 })
    }

    // Eliminar la noticia
    noticias.splice(index, 1)
    saveNoticias(noticias)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar noticia:", error)
    return NextResponse.json({ error: "Error al eliminar noticia" }, { status: 500 })
  }
}

import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"

// Ruta al archivo JSON
const DATA_FILE = path.join(process.cwd(), "data", "directorio.json")

// Leer miembros del directorio del archivo
const getMiembros = () => {
  const data = fs.readFileSync(DATA_FILE, "utf8")
  return JSON.parse(data)
}

// Guardar miembros del directorio en el archivo
const saveMiembros = (miembros: any[]) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(miembros, null, 2))
}

// GET: Obtener un miembro específico del directorio
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const miembros = getMiembros()
    const miembro = miembros.find((m: any) => m.id === params.id)

    if (!miembro) {
      return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 })
    }

    return NextResponse.json(miembro)
  } catch (error) {
    console.error("Error al obtener miembro del directorio:", error)
    return NextResponse.json({ error: "Error al obtener miembro del directorio" }, { status: 500 })
  }
}

// PUT: Actualizar un miembro del directorio
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const datosActualizados = await request.json()
    const miembros = getMiembros()
    const index = miembros.findIndex((m: any) => m.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 })
    }

    // Actualizar el miembro
    miembros[index] = {
      ...miembros[index],
      ...datosActualizados,
      updatedAt: new Date().toISOString(),
    }

    saveMiembros(miembros)

    return NextResponse.json(miembros[index])
  } catch (error) {
    console.error("Error al actualizar miembro del directorio:", error)
    return NextResponse.json({ error: "Error al actualizar miembro del directorio" }, { status: 500 })
  }
}

// DELETE: Eliminar un miembro del directorio
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const miembros = getMiembros()
    const index = miembros.findIndex((m: any) => m.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 })
    }

    // Eliminar el miembro
    miembros.splice(index, 1)
    saveMiembros(miembros)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error al eliminar miembro del directorio:", error)
    return NextResponse.json({ error: "Error al eliminar miembro del directorio" }, { status: 500 })
  }
}

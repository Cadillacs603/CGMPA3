import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// En una implementación real, estas credenciales estarían en una base de datos
// y la contraseña estaría hasheada
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "centropadres2025"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Crear una cookie de sesión simple
    // En una implementación real, usarías JWT u otro método más seguro
    const expiresIn = 60 * 60 * 24 * 7 // 1 semana en segundos
    const sessionId = Math.random().toString(36).substring(2, 15)

    cookies().set({
      name: "admin_session",
      value: sessionId,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn,
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json({ success: false, message: "Credenciales inválidas" }, { status: 401 })
}

export async function DELETE() {
  cookies().delete("admin_session")
  return NextResponse.json({ success: true })
}

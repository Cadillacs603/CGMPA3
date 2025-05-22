import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  const adminSession = cookies().get("admin_session")

  if (adminSession) {
    // En una implementación real, verificarías si la sesión es válida
    // consultando una base de datos o validando un JWT
    return NextResponse.json({ authenticated: true })
  }

  return NextResponse.json({ authenticated: false }, { status: 401 })
}

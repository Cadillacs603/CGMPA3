import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Proteger rutas de la API que requieren autenticación
  if (
    request.nextUrl.pathname.startsWith("/api/eventos") &&
    (request.method === "POST" || request.method === "PUT" || request.method === "DELETE")
  ) {
    const adminSession = request.cookies.get("admin_session")

    if (!adminSession) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/api/eventos/:path*"],
}

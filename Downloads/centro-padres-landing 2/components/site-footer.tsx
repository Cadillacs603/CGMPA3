import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © 2025 Centro de Padres Colegio San Mateo de Osorno. Todos los derechos reservados.
        </p>
        <nav className="flex gap-4">
          <Link href="/terminos" className="text-sm font-medium hover:text-primary-purple transition-colors">
            Términos
          </Link>
          <Link href="/privacidad" className="text-sm font-medium hover:text-primary-purple transition-colors">
            Privacidad
          </Link>
          <Link href="/contacto" className="text-sm font-medium hover:text-primary-purple transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </footer>
  )
}

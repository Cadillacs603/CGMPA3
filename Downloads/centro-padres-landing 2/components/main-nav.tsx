import Link from "next/link"
import { cn } from "@/lib/utils"

export function MainNav({ className }: { className?: string }) {
  return (
    <nav className={cn("flex gap-6 items-center", className)}>
      <Link href="/" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Inicio
      </Link>
      <Link href="/quienes-somos" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Quiénes Somos
      </Link>
      <Link href="/noticias" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Noticias
      </Link>
      <Link href="/calendario" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Calendario
      </Link>
      <Link href="/documentos" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Documentos
      </Link>
      <Link href="/proyectos" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Proyectos
      </Link>
      <Link href="/contacto" className="text-sm font-medium hover:text-primary-purple transition-colors">
        Contacto
      </Link>
      <Link href="/faq" className="text-sm font-medium hover:text-primary-purple transition-colors">
        FAQ
      </Link>
    </nav>
  )
}

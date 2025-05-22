import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-centro-de-padres.png"
              alt="Logo del Centro de Padres Colegio San Mateo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-lg font-bold hidden sm:inline">Centro de Padres San Mateo</span>
          </Link>
        </div>
        <MainNav className="hidden md:flex" />
        <Button variant="outline" size="icon" className="md:hidden">
          <span className="sr-only">Menú</span>
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}

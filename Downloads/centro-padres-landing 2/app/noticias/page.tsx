import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default async function NoticiasPage() {
  // En una implementación real, cargarías estos datos desde la API
  const noticias = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/noticias`)
    .then((res) => {
      if (res.ok) return res.json()
      return []
    })
    .catch(() => [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Noticias</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mantente informado sobre las últimas actividades y novedades de nuestra comunidad escolar
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {noticias && noticias.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {noticias.map((noticia: any) => (
                  <Card key={noticia.id} className="flex flex-col border-primary-purple/20">
                    <CardHeader>
                      <div className="aspect-video relative mb-4">
                        <Image
                          src={noticia.imagen || "/placeholder.svg?height=200&width=400"}
                          alt={noticia.titulo}
                          fill
                          className="rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=200&width=400"
                          }}
                        />
                      </div>
                      <CardTitle className="text-primary-purple">{noticia.titulo}</CardTitle>
                      <CardDescription>
                        {noticia.fecha && format(parseISO(noticia.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="line-clamp-4">{noticia.contenido}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="bg-primary-purple text-white hover:bg-primary-purple/90 font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1"
                        asChild
                      >
                        <Link href={`/noticias/${noticia.id}`}>Leer más</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">No hay noticias disponibles.</div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

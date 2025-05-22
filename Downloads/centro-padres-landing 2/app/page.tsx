"use client"

import { useEffect, useState } from "react"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

interface Noticia {
  id: string
  titulo: string
  fecha: string
  contenido: string
  imagen: string
}

interface Evento {
  id: string
  titulo: string
  fecha: string
  hora: string
  lugar: string
  descripcion: string
}

export default function LandingPage() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [eventos, setEventos] = useState<Evento[]>([])
  const [isLoadingNoticias, setIsLoadingNoticias] = useState(true)
  const [isLoadingEventos, setIsLoadingEventos] = useState(true)
  const [errorNoticias, setErrorNoticias] = useState<string | null>(null)
  const [errorEventos, setErrorEventos] = useState<string | null>(null)

  useEffect(() => {
    // Cargar noticias
    const cargarNoticias = async () => {
      try {
        setIsLoadingNoticias(true)
        const response = await fetch("/api/noticias")

        if (!response.ok) {
          throw new Error("Error al cargar noticias")
        }

        const data = await response.json()
        setNoticias(data)
        setErrorNoticias(null)
      } catch (error) {
        console.error("Error al cargar noticias:", error)
        setErrorNoticias("No se pudieron cargar las noticias")
      } finally {
        setIsLoadingNoticias(false)
      }
    }

    // Cargar eventos
    const cargarEventos = async () => {
      try {
        setIsLoadingEventos(true)
        const response = await fetch("/api/eventos")

        if (!response.ok) {
          throw new Error("Error al cargar eventos")
        }

        const data = await response.json()
        setEventos(data)
        setErrorEventos(null)
      } catch (error) {
        console.error("Error al cargar eventos:", error)
        setErrorEventos("No se pudieron cargar los eventos")
      } finally {
        setIsLoadingEventos(false)
      }
    }

    cargarNoticias()
    cargarEventos()
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* SECCIÓN DE INICIO */}
        <section id="inicio" className="w-full py-12 md:py-24 lg:py-32 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                  Centro de Padres y Apoderados Colegio San Mateo de Osorno
                </h1>
                <p className="text-white/90 md:text-xl">
                  Trabajando juntos por la educación y bienestar de nuestros hijos. Somos el vínculo entre las familias
                  y el colegio.
                </p>
                <div className="flex flex-col gap-3 min-[400px]:flex-row mt-6">
                  <Button
                    className="bg-white text-primary-purple hover:bg-white/90 font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1"
                    asChild
                  >
                    <Link href="/quienes-somos">Conoce nuestro trabajo</Link>
                  </Button>
                  <Button
                    className="bg-dark-purple text-white hover:bg-dark-purple/90 border-2 border-white font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1"
                    asChild
                  >
                    <Link href="/contacto">Únete a nosotros</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <Image
                    src="/images/logo-centro-de-padres.png"
                    alt="Logo Centro de Padres Colegio San Mateo de Osorno"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NOTICIAS DESTACADAS Y EVENTOS PRÓXIMOS */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-purple">Destacados</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mantente informado sobre las últimas actividades y novedades de nuestra comunidad escolar.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* NOTICIAS DESTACADAS */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-purple">Noticias Recientes</h3>
                {isLoadingNoticias ? (
                  <div className="text-center py-12">Cargando noticias...</div>
                ) : errorNoticias ? (
                  <div className="text-center py-12 text-red-500">{errorNoticias}</div>
                ) : noticias.length === 0 ? (
                  <div className="text-center py-12">No hay noticias disponibles.</div>
                ) : (
                  <div className="space-y-4">
                    {noticias.slice(0, 2).map((noticia) => (
                      <Card key={noticia.id} className="border-primary-purple/20">
                        <CardHeader>
                          <div className="flex gap-4">
                            {noticia.imagen && (
                              <Image
                                src={noticia.imagen || "/placeholder.svg?height=80&width=120"}
                                alt={noticia.titulo}
                                width={120}
                                height={80}
                                className="rounded-lg object-cover h-20 w-28"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = "/placeholder.svg?height=80&width=120"
                                }}
                              />
                            )}
                            <div>
                              <CardTitle className="text-lg text-primary-purple">{noticia.titulo}</CardTitle>
                              <CardDescription>
                                {noticia.fecha && format(parseISO(noticia.fecha), "d 'de' MMMM, yyyy", { locale: es })}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="line-clamp-2">{noticia.contenido}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="link" className="px-0 text-primary-purple" asChild>
                            <Link href={`/noticias/${noticia.id}`}>Leer más</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        className="border-primary-purple text-primary-purple hover:bg-primary-purple/10"
                        asChild
                      >
                        <Link href="/noticias">Ver todas las noticias</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* EVENTOS PRÓXIMOS */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-primary-purple">Próximos Eventos</h3>
                {isLoadingEventos ? (
                  <div className="text-center py-12">Cargando eventos...</div>
                ) : errorEventos ? (
                  <div className="text-center py-12 text-red-500">{errorEventos}</div>
                ) : eventos.length === 0 ? (
                  <div className="text-center py-12">No hay eventos programados.</div>
                ) : (
                  <div className="space-y-4">
                    {eventos.slice(0, 3).map((evento) => (
                      <div
                        key={evento.id}
                        className="flex items-start gap-4 rounded-lg border border-primary-purple/20 p-4"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple/10 text-primary-purple">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-primary-purple">{evento.titulo}</p>
                          <p className="text-sm text-muted-foreground">
                            {evento.fecha && format(parseISO(evento.fecha), "PPP", { locale: es })} - {evento.hora} hrs
                            - {evento.lugar}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-center mt-4">
                      <Button
                        variant="outline"
                        className="border-primary-purple text-primary-purple hover:bg-primary-purple/10"
                        asChild
                      >
                        <Link href="/calendario">Ver calendario completo</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* MENSAJE DEL PRESIDENTE */}
        <section className="w-full py-12 md:py-24 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-48 h-48">
                  <Image
                    src="/placeholder.svg?height=192&width=192"
                    alt="Presidente del Centro de Padres"
                    fill
                    className="rounded-full object-cover border-4 border-white shadow-lg"
                  />
                </div>
              </div>
              <div className="md:w-2/3 space-y-4">
                <h2 className="text-3xl font-bold text-white">Mensaje del Presidente</h2>
                <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
                  <p className="italic text-lg mb-4 text-primary-purple">
                    "Estimada comunidad educativa del Colegio San Mateo de Osorno, es un honor dirigirme a ustedes como
                    presidente del Centro de Padres y Apoderados. Nuestro compromiso es trabajar incansablemente por el
                    bienestar de nuestros hijos y el fortalecimiento de nuestra comunidad escolar."
                  </p>
                  <p className="italic text-lg mb-4 text-primary-purple">
                    "Los invito a participar activamente en las diversas actividades que organizamos y a acercarse con
                    sus ideas y propuestas. Juntos podemos construir una mejor educación para nuestros hijos."
                  </p>
                  <p className="font-bold text-right text-primary-purple">César Pardo, Presidente Centro de Padres</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

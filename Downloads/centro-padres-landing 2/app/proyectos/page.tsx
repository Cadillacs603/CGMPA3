import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ProyectosPage() {
  // Datos de ejemplo para proyectos
  const proyectos = [
    {
      id: "1",
      titulo: "Mejoramiento de Áreas Verdes",
      descripcion:
        "Proyecto para renovar y ampliar las áreas verdes del colegio, creando espacios de recreación y aprendizaje al aire libre para los estudiantes.",
      estado: "En curso",
      imagen: "/placeholder.svg?height=300&width=500",
      avance: 60,
    },
    {
      id: "2",
      titulo: "Implementación de Biblioteca Digital",
      descripcion:
        "Iniciativa para crear una biblioteca digital con acceso a libros, revistas y recursos educativos para todos los estudiantes del colegio.",
      estado: "Planificación",
      imagen: "/placeholder.svg?height=300&width=500",
      avance: 20,
    },
    {
      id: "3",
      titulo: "Talleres Extraprogramáticos",
      descripcion:
        "Organización de talleres artísticos, deportivos y culturales para complementar la formación académica de los estudiantes.",
      estado: "Completado",
      imagen: "/placeholder.svg?height=300&width=500",
      avance: 100,
    },
    {
      id: "4",
      titulo: "Campaña Solidaria Anual",
      descripcion:
        "Recolección de útiles escolares, ropa y alimentos para familias necesitadas de la comunidad escolar y del entorno.",
      estado: "En curso",
      imagen: "/placeholder.svg?height=300&width=500",
      avance: 75,
    },
    {
      id: "5",
      titulo: "Modernización de Laboratorio de Ciencias",
      descripcion:
        "Proyecto para actualizar el equipamiento del laboratorio de ciencias, adquiriendo nuevos instrumentos y materiales para experimentos.",
      estado: "Planificación",
      imagen: "/placeholder.svg?height=300&width=500",
      avance: 10,
    },
    {
      id: "6",
      titulo: "Jornadas de Convivencia Escolar",
      descripcion:
        "Organización de actividades para fortalecer la convivencia escolar, promoviendo valores como el respeto, la tolerancia y la solidaridad.",
      estado: "Completado",
      imagen: "/placeholder.svg?height=300&width=500",
      avance: 100,
    },
  ]

  // Función para determinar el color del badge según el estado
  const getBadgeVariant = (estado: string) => {
    switch (estado) {
      case "En curso":
        return "default"
      case "Planificación":
        return "secondary"
      case "Completado":
        return "success"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Proyectos y Actividades</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conoce las iniciativas que estamos desarrollando para mejorar la experiencia educativa
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {proyectos.map((proyecto) => (
                <Card key={proyecto.id} className="flex flex-col border-primary-purple/20">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={proyecto.imagen || "/placeholder.svg"}
                        alt={proyecto.titulo}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl text-primary-purple">{proyecto.titulo}</CardTitle>
                      <Badge variant={getBadgeVariant(proyecto.estado) as any}>{proyecto.estado}</Badge>
                    </div>
                    <CardDescription className="mt-2">{proyecto.descripcion}</CardDescription>

                    {/* Barra de progreso */}
                    <div className="mt-4">
                      <div className="text-sm flex justify-between mb-1">
                        <span>Avance</span>
                        <span>{proyecto.avance}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-primary-purple h-2.5 rounded-full"
                          style={{ width: `${proyecto.avance}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="bg-primary-purple text-white hover:bg-primary-purple/90 font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1 w-full"
                      asChild
                    >
                      <Link href={`/proyectos/${proyecto.id}`}>Ver detalles</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

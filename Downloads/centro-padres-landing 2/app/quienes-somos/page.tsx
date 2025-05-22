import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default async function QuienesSomosPage() {
  // En una implementación real, cargarías estos datos desde la API
  const miembros = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/directorio`)
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Quiénes Somos</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conoce más sobre el Centro de Padres y Apoderados del Colegio San Mateo de Osorno
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MISIÓN, VISIÓN Y OBJETIVOS */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-primary-purple/20">
                <CardHeader>
                  <CardTitle className="text-primary-purple">Misión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Representar y canalizar las inquietudes, necesidades y aspiraciones de las familias del Colegio San
                    Mateo, promoviendo la participación activa de los padres y apoderados en el proceso educativo de sus
                    hijos, colaborando con la dirección del establecimiento en la formación integral de los estudiantes.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary-purple/20">
                <CardHeader>
                  <CardTitle className="text-primary-purple">Visión</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Ser una organización reconocida por su compromiso con la calidad educativa, que promueve valores
                    como el respeto, la solidaridad y la responsabilidad, contribuyendo a la formación de personas
                    íntegras y comprometidas con la sociedad.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary-purple/20">
                <CardHeader>
                  <CardTitle className="text-primary-purple">Objetivos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Fomentar la participación de los padres en el proceso educativo</li>
                    <li>Apoyar la labor educativa del establecimiento</li>
                    <li>Promover actividades que fortalezcan la comunidad escolar</li>
                    <li>Representar las inquietudes de los apoderados ante la dirección</li>
                    <li>Gestionar recursos para mejorar la infraestructura y equipamiento</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* INTEGRANTES DEL DIRECTORIO */}
        <section className="w-full py-12 md:py-24 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-white">
                  Integrantes del Directorio
                </h2>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conoce a quienes conforman el Centro de Padres y Apoderados del Colegio San Mateo de Osorno.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
              {miembros && miembros.length > 0 ? (
                miembros.map((miembro: any) => (
                  <div
                    key={miembro.id}
                    className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center bg-white shadow-md"
                  >
                    <Image
                      src={miembro.foto || "/placeholder.svg?height=120&width=120"}
                      alt={miembro.nombre}
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-4 border-primary-purple/20"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=120&width=120"
                      }}
                    />
                    <h3 className="text-xl font-bold text-primary-purple">{miembro.nombre}</h3>
                    <p className="text-sm text-muted-foreground">{miembro.cargo}</p>
                    <p className="text-sm">{miembro.email}</p>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12 text-white">
                  No hay miembros registrados en el directorio.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HISTORIA O ANTECEDENTES */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-purple">Historia</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conoce la trayectoria del Centro de Padres a lo largo de los años
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Image
                  src="/images/logo-centro-de-padres.png"
                  alt="Historia del Centro de Padres"
                  width={600}
                  height={400}
                  className="rounded-lg object-contain w-full"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary-purple">Nuestros Inicios</h3>
                <p>
                  El Centro de Padres y Apoderados del Colegio San Mateo de Osorno fue fundado en 1985, con el objetivo
                  de crear un espacio de participación para las familias en la educación de sus hijos. Desde sus
                  inicios, ha sido una organización comprometida con el mejoramiento de la calidad educativa y el
                  bienestar de los estudiantes.
                </p>
                <p>
                  A lo largo de los años, el Centro de Padres ha impulsado numerosas iniciativas que han contribuido
                  significativamente al desarrollo del establecimiento, como la implementación de laboratorios, la
                  renovación de espacios deportivos y la organización de actividades culturales y recreativas.
                </p>
                <p>
                  Hoy, con más de 35 años de historia, el Centro de Padres continúa trabajando con el mismo entusiasmo y
                  compromiso, adaptándose a los nuevos desafíos educativos y sociales, pero manteniendo siempre su
                  esencia: ser un puente entre las familias y el colegio para el beneficio de nuestros hijos.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

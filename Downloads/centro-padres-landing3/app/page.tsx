import { Calendar, Mail, MapPin, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarComponent } from "@/components/calendar"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Logo del Colegio San Mateo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-lg font-bold">Centro de Padres Colegio San Mateo</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#inicio" className="text-sm font-medium hover:underline underline-offset-4">
              Inicio
            </Link>
            <Link href="#noticias" className="text-sm font-medium hover:underline underline-offset-4">
              Noticias
            </Link>
            <Link href="#eventos" className="text-sm font-medium hover:underline underline-offset-4">
              Eventos
            </Link>
            <Link href="#directorio" className="text-sm font-medium hover:underline underline-offset-4">
              Directorio
            </Link>
            <Link href="#contacto" className="text-sm font-medium hover:underline underline-offset-4">
              Contacto
            </Link>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Menú</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="inicio"
          className="w-full py-12 md:py-24 lg:py-32"
          style={{ backgroundColor: "rgb(211, 160, 224)" }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Centro de Padres y Apoderados Colegio San Mateo de Osorno
                </h1>
                <p className="text-muted-foreground md:text-xl">
                  Trabajando juntos por la educación y bienestar de nuestros hijos. Somos el vínculo entre las familias
                  y el colegio.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>Conoce nuestro trabajo</Button>
                  <Button variant="outline">Únete a nosotros</Button>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Colegio San Mateo de Osorno"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
              />
            </div>
          </div>
        </section>

        <section id="noticias" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Noticias Destacadas</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mantente informado sobre las últimas actividades y novedades de nuestra comunidad escolar.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Imagen de noticia"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <CardTitle className="mt-4">Exitosa Kermesse Escolar</CardTitle>
                  <CardDescription>15 de Mayo, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    La kermesse anual del colegio fue todo un éxito. Agradecemos a todas las familias que participaron y
                    colaboraron en esta hermosa actividad comunitaria.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0">
                    Leer más
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Imagen de noticia"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <CardTitle className="mt-4">Campaña Solidaria</CardTitle>
                  <CardDescription>10 de Mayo, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Iniciamos la campaña de recolección de útiles escolares para familias necesitadas. Puedes dejar tu
                    aporte en la oficina del Centro de Padres.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0">
                    Leer más
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Imagen de noticia"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-48"
                  />
                  <CardTitle className="mt-4">Reunión General de Apoderados</CardTitle>
                  <CardDescription>5 de Mayo, 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Se convoca a todos los apoderados a la reunión general que se realizará el próximo viernes 25 de
                    mayo a las 19:00 horas en el auditorio del colegio.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="px-0">
                    Leer más
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center">
              <Button variant="outline">Ver todas las noticias</Button>
            </div>
          </div>
        </section>

        <section
          id="eventos"
          className="w-full py-12 md:py-24 lg:py-32"
          style={{ backgroundColor: "rgb(211, 160, 224)" }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Calendario de Eventos</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mantente al día con todas las actividades programadas por el Centro de Padres y el Colegio.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-4xl py-12">
              <CalendarComponent />
              <div className="mt-8 space-y-4">
                <h3 className="text-xl font-bold">Próximos Eventos</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-900">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Reunión General de Apoderados</p>
                      <p className="text-sm text-muted-foreground">
                        25 de Mayo, 2025 - 19:00 hrs - Auditorio del Colegio
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-900">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Día de la Familia</p>
                      <p className="text-sm text-muted-foreground">15 de Junio, 2025 - 10:00 hrs - Patio Central</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-900">
                      <Calendar className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Taller para Padres: Educación Emocional</p>
                      <p className="text-sm text-muted-foreground">30 de Junio, 2025 - 18:30 hrs - Sala Multiuso</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="directorio" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Directorio</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Conoce a quienes conforman el Centro de Padres y Apoderados del Colegio San Mateo de Osorno.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Presidente"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Cesar Pardo</h3>
                <p className="text-sm text-muted-foreground">Presidente</p>
                <p className="text-sm">maria.gonzalez@email.com</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Vicepresidente"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Germán </h3>
                <p className="text-sm text-muted-foreground">Vicepresidente</p>
                <p className="text-sm">carlos.rodriguez@email.com</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Secretaria"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Patricia Moll</h3>
                <p className="text-sm text-muted-foreground">Secretaria</p>
                <p className="text-sm">ana.martinez@email.com</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Tesorero"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Henoch Figueroa</h3>
                <p className="text-sm text-muted-foreground">Tesorero</p>
                <p className="text-sm">hfigueroa@fabricapp.cl</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Directora"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Laura Pérez</h3>
                <p className="text-sm text-muted-foreground">Directora</p>
                <p className="text-sm">laura.perez@email.com</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <Image
                  src="/placeholder.svg?height=120&width=120"
                  alt="Director"
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
                <h3 className="text-xl font-bold">Juan Fernández</h3>
                <p className="text-sm text-muted-foreground">Director</p>
                <p className="text-sm">juan.fernandez@email.com</p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contacto"
          className="w-full py-12 md:py-24 lg:py-32"
          style={{ backgroundColor: "rgb(211, 160, 224)" }}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contáctanos</h2>
                <p className="text-muted-foreground md:text-xl">
                  Estamos aquí para escucharte. No dudes en contactarnos para cualquier consulta, sugerencia o
                  inquietud.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    <p>Av. Principal 1234, Osorno, Región de Los Lagos</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <p>+56 9 1234 5678</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-purple-600" />
                    <p>centropadres@sanmateo.cl</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link href="#" className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span className="sr-only">Facebook</span>
                  </Link>
                  <Link href="#" className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                  </Link>
                  <Link href="#" className="rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                    <span className="sr-only">Twitter</span>
                  </Link>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6">
                <h3 className="text-xl font-bold mb-4">Envíanos un mensaje</h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="nombre"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="apellido"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Apellido
                      </label>
                      <input
                        id="apellido"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tu apellido"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="asunto"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Asunto
                    </label>
                    <input
                      id="asunto"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Asunto del mensaje"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="mensaje"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="mensaje"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Escribe tu mensaje aquí..."
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Enviar mensaje
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Centro de Padres Colegio San Mateo de Osorno. Todos los derechos reservados.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Términos
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Privacidad
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Contacto
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

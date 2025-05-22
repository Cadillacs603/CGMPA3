import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function ContactoPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Contacto</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Estamos aquí para escucharte. No dudes en contactarnos para cualquier consulta, sugerencia o
                  inquietud.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter mb-4 text-primary-purple">
                    Información de Contacto
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Puedes contactarnos a través de los siguientes medios o completando el formulario.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple/10 text-primary-purple">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Dirección</h3>
                      <p className="text-muted-foreground">Av. Principal 1234, Osorno, Región de Los Lagos</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple/10 text-primary-purple">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Teléfono</h3>
                      <p className="text-muted-foreground">+56 9 1234 5678</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-purple/10 text-primary-purple">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-muted-foreground">centropadres@sanmateo.cl</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Horario de Atención</h3>
                  <p className="text-muted-foreground">Lunes a Viernes: 8:00 - 13:00 hrs</p>
                  <p className="text-muted-foreground">Martes y Jueves: 15:00 - 17:00 hrs</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium">Síguenos en redes sociales</h3>
                  <div className="flex gap-4">
                    <Link
                      href="#"
                      className="rounded-full bg-primary-purple p-2 text-white hover:bg-primary-purple/90 transition-transform hover:-translate-y-1"
                    >
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
                    <Link
                      href="#"
                      className="rounded-full bg-primary-purple p-2 text-white hover:bg-primary-purple/90 transition-transform hover:-translate-y-1"
                    >
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
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <Card className="border-primary-purple/20">
                  <CardHeader>
                    <CardTitle className="text-primary-purple">Envíanos un mensaje</CardTitle>
                    <CardDescription>
                      Completa el formulario y nos pondremos en contacto contigo a la brevedad.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre completo</Label>
                        <Input id="nombre" placeholder="Ingresa tu nombre" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="tu@email.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="asunto">Asunto</Label>
                        <Input id="asunto" placeholder="Asunto de tu mensaje" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mensaje">Mensaje</Label>
                        <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." rows={5} />
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter>
                    <Button className="bg-primary-purple text-white hover:bg-primary-purple/90 font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1 w-full">
                      <Send className="mr-2 h-4 w-4" /> Enviar mensaje
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

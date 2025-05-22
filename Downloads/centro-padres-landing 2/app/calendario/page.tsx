import { Button } from "@/components/ui/button"
import { CalendarComponent } from "@/components/calendar"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function CalendarioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                  Calendario de Actividades
                </h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mantente al día con todas las actividades programadas por el Centro de Padres y el Colegio
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <CalendarComponent />

              <div className="flex justify-center mt-8">
                <Button
                  className="bg-white text-primary-purple hover:bg-white/90 border-2 border-primary-purple font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1 mr-4"
                  asChild
                >
                  <Link href="/admin">Administrar eventos</Link>
                </Button>
                <Button
                  className="bg-dark-purple text-white hover:bg-dark-purple/90 border-2 border-white font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/">Volver al inicio</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

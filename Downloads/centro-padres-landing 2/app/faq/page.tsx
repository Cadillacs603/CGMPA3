import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function FAQPage() {
  // Datos de ejemplo para preguntas frecuentes
  const faqs = [
    {
      id: "1",
      pregunta: "¿Cómo puedo ser parte del Centro de Padres?",
      respuesta:
        "Todos los padres y apoderados del Colegio San Mateo son automáticamente miembros del Centro de Padres. Si deseas participar activamente en la directiva o en alguna comisión, puedes acercarte a nuestras oficinas o escribirnos un correo electrónico manifestando tu interés.",
    },
    {
      id: "2",
      pregunta: "¿Cuándo se realizan las reuniones del Centro de Padres?",
      respuesta:
        "Las reuniones ordinarias del directorio se realizan el primer martes de cada mes a las 19:00 horas. Las asambleas generales se convocan trimestralmente y se informan con anticipación a través de los canales oficiales del colegio.",
    },
    {
      id: "3",
      pregunta: "¿Cómo se utilizan los fondos recaudados por el Centro de Padres?",
      respuesta:
        "Los fondos recaudados se destinan a proyectos de mejoramiento de infraestructura, implementación de talleres, actividades recreativas y culturales, y apoyo a estudiantes con necesidades específicas. Cada año se presenta un informe financiero detallado a la asamblea general.",
    },
    {
      id: "4",
      pregunta: "¿Puedo proponer proyectos o actividades al Centro de Padres?",
      respuesta:
        "¡Por supuesto! Valoramos y fomentamos la participación activa de todos los apoderados. Puedes presentar tus propuestas por escrito en nuestras oficinas o enviarlas por correo electrónico. Todas las propuestas son evaluadas por el directorio en las reuniones mensuales.",
    },
    {
      id: "5",
      pregunta: "¿Cómo puedo obtener información sobre las actividades programadas?",
      respuesta:
        "Toda la información sobre actividades, eventos y proyectos se publica en nuestro sitio web, redes sociales, y se envía a través de comunicados oficiales del colegio. También puedes suscribirte a nuestro boletín mensual para recibir actualizaciones directamente en tu correo electrónico.",
    },
    {
      id: "6",
      pregunta: "¿El Centro de Padres ofrece algún tipo de apoyo a familias con dificultades económicas?",
      respuesta:
        "Sí, contamos con un fondo de solidaridad destinado a apoyar a familias que atraviesan situaciones económicas difíciles. Este apoyo puede incluir útiles escolares, uniformes o ayuda para actividades específicas. Las solicitudes se manejan con total confidencialidad y deben presentarse directamente al presidente o tesorero del Centro de Padres.",
    },
    {
      id: "7",
      pregunta: "¿Cómo se elige la directiva del Centro de Padres?",
      respuesta:
        "La directiva se elige cada dos años mediante votación directa en una asamblea general extraordinaria convocada para este fin. Cualquier apoderado puede postularse para integrar la directiva, presentando su candidatura con al menos dos semanas de anticipación a la fecha de elección.",
    },
    {
      id: "8",
      pregunta: "¿Qué comisiones o áreas de trabajo existen dentro del Centro de Padres?",
      respuesta:
        "Actualmente contamos con comisiones de Cultura y Recreación, Infraestructura y Mejoramiento, Bienestar Estudiantil, Comunicaciones, y Finanzas. Cada comisión está liderada por un miembro del directorio y cuenta con la participación de apoderados voluntarios.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary-gradient">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Preguntas Frecuentes</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Encuentra respuestas a las dudas más comunes sobre el Centro de Padres y Apoderados
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border-primary-purple/20">
                    <AccordionTrigger className="text-left text-primary-purple font-medium">
                      {faq.pregunta}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.respuesta}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-12 text-center">
                <p className="mb-6 text-muted-foreground">
                  ¿No encontraste la respuesta que buscabas? No dudes en contactarnos directamente.
                </p>
                <Button
                  className="bg-primary-purple text-white hover:bg-primary-purple/90 font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/contacto">Contáctanos</Link>
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

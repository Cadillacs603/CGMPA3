import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function DocumentosPage() {
  // Datos de ejemplo para documentos
  const documentos = [
    {
      id: "1",
      titulo: "Estatutos del Centro de Padres",
      descripcion: "Documento oficial que establece las normas y funcionamiento del Centro de Padres",
      fecha: "15/03/2023",
      tipo: "PDF",
      url: "#",
    },
    {
      id: "2",
      titulo: "Acta Reunión General - Mayo 2025",
      descripcion: "Acta de la reunión general de apoderados realizada el 25 de mayo de 2025",
      fecha: "26/05/2025",
      tipo: "PDF",
      url: "#",
    },
    {
      id: "3",
      titulo: "Reglamento Interno",
      descripcion: "Reglamento interno del Centro de Padres y Apoderados",
      fecha: "10/01/2025",
      tipo: "PDF",
      url: "#",
    },
    {
      id: "4",
      titulo: "Acta Reunión Directorio - Abril 2025",
      descripcion: "Acta de la reunión del directorio realizada el 15 de abril de 2025",
      fecha: "16/04/2025",
      tipo: "PDF",
      url: "#",
    },
    {
      id: "5",
      titulo: "Plan Anual de Trabajo 2025",
      descripcion: "Planificación anual de actividades y proyectos del Centro de Padres",
      fecha: "05/01/2025",
      tipo: "PDF",
      url: "#",
    },
    {
      id: "6",
      titulo: "Informe Financiero 2024",
      descripcion: "Informe de ingresos y gastos del Centro de Padres durante el año 2024",
      fecha: "20/12/2024",
      tipo: "PDF",
      url: "#",
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Documentos</h1>
                <p className="max-w-[900px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Accede a los documentos oficiales del Centro de Padres y Apoderados
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {documentos.map((documento) => (
                <Card key={documento.id} className="flex flex-col border-primary-purple/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <FileText className="h-6 w-6 text-primary-purple" />
                      <CardTitle className="text-lg text-primary-purple">{documento.titulo}</CardTitle>
                    </div>
                    <CardDescription>{documento.fecha}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p>{documento.descripcion}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="bg-primary-purple text-white hover:bg-primary-purple/90 font-medium text-base px-6 py-2.5 rounded-full shadow-md transition-transform hover:-translate-y-1 w-full"
                      asChild
                    >
                      <Link href={documento.url}>
                        <Download className="mr-2 h-4 w-4" /> Descargar {documento.tipo}
                      </Link>
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

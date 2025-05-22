"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Save, Trash, Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/date-picker"
import { AdminAuth } from "@/components/admin-auth"
import { useToast } from "@/hooks/use-toast"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"

interface Evento {
  id: string
  titulo: string
  fecha: string
  hora: string
  lugar: string
  descripcion: string
}

interface Noticia {
  id: string
  titulo: string
  fecha: string
  contenido: string
  imagen: string
}

interface Miembro {
  id: string
  nombre: string
  cargo: string
  email: string
  foto: string
}

export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("eventos")

  // Estado para eventos
  const [eventos, setEventos] = useState<Evento[]>([])
  const [editandoEvento, setEditandoEvento] = useState<Evento | null>(null)
  const [tituloEvento, setTituloEvento] = useState("")
  const [fechaEvento, setFechaEvento] = useState<Date | undefined>()
  const [horaEvento, setHoraEvento] = useState("")
  const [lugarEvento, setLugarEvento] = useState("")
  const [descripcionEvento, setDescripcionEvento] = useState("")

  // Estado para noticias
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [editandoNoticia, setEditandoNoticia] = useState<Noticia | null>(null)
  const [tituloNoticia, setTituloNoticia] = useState("")
  const [fechaNoticia, setFechaNoticia] = useState<Date | undefined>()
  const [contenidoNoticia, setContenidoNoticia] = useState("")
  const [imagenNoticia, setImagenNoticia] = useState("")

  // Estado para directorio
  const [miembros, setMiembros] = useState<Miembro[]>([])
  const [editandoMiembro, setEditandoMiembro] = useState<Miembro | null>(null)
  const [nombreMiembro, setNombreMiembro] = useState("")
  const [cargoMiembro, setCargoMiembro] = useState("")
  const [emailMiembro, setEmailMiembro] = useState("")
  const [fotoMiembro, setFotoMiembro] = useState("")

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check")
        if (response.ok) {
          setIsAuthenticated(true)
          cargarDatos()
        }
      } catch (error) {
        console.error("Error al verificar autenticación:", error)
      }
    }

    checkAuth()
  }, [])

  // Cargar datos según la pestaña activa
  const cargarDatos = async () => {
    if (activeTab === "eventos") {
      cargarEventos()
    } else if (activeTab === "noticias") {
      cargarNoticias()
    } else if (activeTab === "directorio") {
      cargarMiembros()
    }
  }

  // Cambiar pestaña
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    if (value === "eventos" && eventos.length === 0) {
      cargarEventos()
    } else if (value === "noticias" && noticias.length === 0) {
      cargarNoticias()
    } else if (value === "directorio" && miembros.length === 0) {
      cargarMiembros()
    }
  }

  // ===== EVENTOS =====

  // Cargar eventos
  const cargarEventos = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/eventos")
      if (response.ok) {
        const data = await response.json()
        setEventos(data)
      }
    } catch (error) {
      console.error("Error al cargar eventos:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los eventos",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Limpiar formulario de evento
  const limpiarFormularioEvento = () => {
    setTituloEvento("")
    setFechaEvento(undefined)
    setHoraEvento("")
    setLugarEvento("")
    setDescripcionEvento("")
    setEditandoEvento(null)
  }

  // Editar evento
  const editarEvento = (evento: Evento) => {
    setEditandoEvento(evento)
    setTituloEvento(evento.titulo)
    setFechaEvento(evento.fecha ? parseISO(evento.fecha) : undefined)
    setHoraEvento(evento.hora || "")
    setLugarEvento(evento.lugar || "")
    setDescripcionEvento(evento.descripcion || "")
  }

  // Guardar evento
  const guardarEvento = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tituloEvento || !fechaEvento || !horaEvento || !lugarEvento) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const eventoData = {
        titulo: tituloEvento,
        fecha: fechaEvento?.toISOString(),
        hora: horaEvento,
        lugar: lugarEvento,
        descripcion: descripcionEvento,
      }

      let response

      if (editandoEvento) {
        // Actualizar evento existente
        response = await fetch(`/api/eventos/${editandoEvento.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventoData),
        })
      } else {
        // Crear nuevo evento
        response = await fetch("/api/eventos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventoData),
        })
      }

      if (response.ok) {
        toast({
          title: "Éxito",
          description: editandoEvento ? "Evento actualizado correctamente" : "Evento creado correctamente",
        })
        limpiarFormularioEvento()
        cargarEventos()
      } else {
        throw new Error("Error al guardar el evento")
      }
    } catch (error) {
      console.error("Error al guardar evento:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el evento",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Eliminar evento
  const eliminarEvento = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este evento?")) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/eventos/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Evento eliminado correctamente",
        })
        cargarEventos()
      } else {
        throw new Error("Error al eliminar el evento")
      }
    } catch (error) {
      console.error("Error al eliminar evento:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el evento",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // ===== NOTICIAS =====

  // Cargar noticias
  const cargarNoticias = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/noticias")
      if (response.ok) {
        const data = await response.json()
        setNoticias(data)
      }
    } catch (error) {
      console.error("Error al cargar noticias:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las noticias",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Limpiar formulario de noticia
  const limpiarFormularioNoticia = () => {
    setTituloNoticia("")
    setFechaNoticia(undefined)
    setContenidoNoticia("")
    setImagenNoticia("")
    setEditandoNoticia(null)
  }

  // Editar noticia
  const editarNoticia = (noticia: Noticia) => {
    setEditandoNoticia(noticia)
    setTituloNoticia(noticia.titulo)
    setFechaNoticia(noticia.fecha ? parseISO(noticia.fecha) : undefined)
    setContenidoNoticia(noticia.contenido || "")
    setImagenNoticia(noticia.imagen || "")
  }

  // Guardar noticia
  const guardarNoticia = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!tituloNoticia || !fechaNoticia || !contenidoNoticia) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const noticiaData = {
        titulo: tituloNoticia,
        fecha: fechaNoticia?.toISOString(),
        contenido: contenidoNoticia,
        imagen: imagenNoticia,
      }

      let response

      if (editandoNoticia) {
        // Actualizar noticia existente
        response = await fetch(`/api/noticias/${editandoNoticia.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noticiaData),
        })
      } else {
        // Crear nueva noticia
        response = await fetch("/api/noticias", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noticiaData),
        })
      }

      if (response.ok) {
        toast({
          title: "Éxito",
          description: editandoNoticia ? "Noticia actualizada correctamente" : "Noticia creada correctamente",
        })
        limpiarFormularioNoticia()
        cargarNoticias()
      } else {
        throw new Error("Error al guardar la noticia")
      }
    } catch (error) {
      console.error("Error al guardar noticia:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar la noticia",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Eliminar noticia
  const eliminarNoticia = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/noticias/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Noticia eliminada correctamente",
        })
        cargarNoticias()
      } else {
        throw new Error("Error al eliminar la noticia")
      }
    } catch (error) {
      console.error("Error al eliminar noticia:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar la noticia",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // ===== DIRECTORIO =====

  // Cargar miembros del directorio
  const cargarMiembros = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/directorio")
      if (response.ok) {
        const data = await response.json()
        setMiembros(data)
      }
    } catch (error) {
      console.error("Error al cargar miembros del directorio:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar los miembros del directorio",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Limpiar formulario de miembro
  const limpiarFormularioMiembro = () => {
    setNombreMiembro("")
    setCargoMiembro("")
    setEmailMiembro("")
    setFotoMiembro("")
    setEditandoMiembro(null)
  }

  // Editar miembro
  const editarMiembro = (miembro: Miembro) => {
    setEditandoMiembro(miembro)
    setNombreMiembro(miembro.nombre)
    setCargoMiembro(miembro.cargo || "")
    setEmailMiembro(miembro.email || "")
    setFotoMiembro(miembro.foto || "")
  }

  // Guardar miembro
  const guardarMiembro = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombreMiembro || !cargoMiembro || !emailMiembro) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    try {
      setIsLoading(true)

      const miembroData = {
        nombre: nombreMiembro,
        cargo: cargoMiembro,
        email: emailMiembro,
        foto: fotoMiembro,
      }

      let response

      if (editandoMiembro) {
        // Actualizar miembro existente
        response = await fetch(`/api/directorio/${editandoMiembro.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(miembroData),
        })
      } else {
        // Crear nuevo miembro
        response = await fetch("/api/directorio", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(miembroData),
        })
      }

      if (response.ok) {
        toast({
          title: "Éxito",
          description: editandoMiembro ? "Miembro actualizado correctamente" : "Miembro agregado correctamente",
        })
        limpiarFormularioMiembro()
        cargarMiembros()
      } else {
        throw new Error("Error al guardar el miembro")
      }
    } catch (error) {
      console.error("Error al guardar miembro:", error)
      toast({
        title: "Error",
        description: "No se pudo guardar el miembro",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Eliminar miembro
  const eliminarMiembro = async (id: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este miembro del directorio?")) {
      return
    }

    try {
      setIsLoading(true)
      const response = await fetch(`/api/directorio/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Éxito",
          description: "Miembro eliminado correctamente",
        })
        cargarMiembros()
      } else {
        throw new Error("Error al eliminar el miembro")
      }
    } catch (error) {
      console.error("Error al eliminar miembro:", error)
      toast({
        title: "Error",
        description: "No se pudo eliminar el miembro",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" })
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  // Si no está autenticado, mostrar el formulario de inicio de sesión
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Panel de Administración</h1>
        </div>
        <Button onClick={cerrarSesion}>Cerrar sesión</Button>
      </div>

      <Tabs defaultValue="eventos" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="eventos">Eventos</TabsTrigger>
          <TabsTrigger value="noticias">Noticias</TabsTrigger>
          <TabsTrigger value="directorio">Directorio</TabsTrigger>
        </TabsList>

        {/* PESTAÑA DE EVENTOS */}
        <TabsContent value="eventos">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Administrar Eventos</h2>
            <Button onClick={limpiarFormularioEvento} disabled={!editandoEvento}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Evento
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <form onSubmit={guardarEvento}>
                <CardHeader>
                  <CardTitle>{editandoEvento ? "Editar Evento" : "Agregar Nuevo Evento"}</CardTitle>
                  <CardDescription>
                    {editandoEvento
                      ? "Modifica los datos del evento seleccionado."
                      : "Completa el formulario para agregar un nuevo evento al calendario."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo-evento">Título del Evento *</Label>
                    <Input
                      id="titulo-evento"
                      placeholder="Ej: Reunión General de Apoderados"
                      value={tituloEvento}
                      onChange={(e) => setTituloEvento(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha-evento">Fecha *</Label>
                    <DatePicker date={fechaEvento} setDate={setFechaEvento} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora-evento">Hora *</Label>
                    <Input
                      id="hora-evento"
                      placeholder="Ej: 19:00"
                      value={horaEvento}
                      onChange={(e) => setHoraEvento(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lugar-evento">Lugar *</Label>
                    <Input
                      id="lugar-evento"
                      placeholder="Ej: Auditorio del Colegio"
                      value={lugarEvento}
                      onChange={(e) => setLugarEvento(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="descripcion-evento">Descripción</Label>
                    <Textarea
                      id="descripcion-evento"
                      placeholder="Describe el evento..."
                      value={descripcionEvento}
                      onChange={(e) => setDescripcionEvento(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {editandoEvento && (
                    <Button type="button" variant="outline" onClick={limpiarFormularioEvento}>
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" className={editandoEvento ? "" : "w-full"} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {editandoEvento ? "Actualizar Evento" : "Guardar Evento"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <h3 className="text-lg font-bold mt-6 mb-4">Eventos Existentes</h3>

            {isLoading ? (
              <div className="text-center py-4">Cargando eventos...</div>
            ) : eventos.length === 0 ? (
              <div className="text-center py-4">No hay eventos registrados.</div>
            ) : (
              <div className="space-y-4">
                {eventos.map((evento) => (
                  <Card key={evento.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{evento.titulo}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => editarEvento(evento)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => eliminarEvento(evento.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {evento.fecha && format(parseISO(evento.fecha), "PPP", { locale: es })} - {evento.hora} hrs
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="font-medium">Lugar: {evento.lugar}</p>
                      {evento.descripcion && <p className="mt-2">{evento.descripcion}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* PESTAÑA DE NOTICIAS */}
        <TabsContent value="noticias">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Administrar Noticias</h2>
            <Button onClick={limpiarFormularioNoticia} disabled={!editandoNoticia}>
              <Plus className="mr-2 h-4 w-4" /> Nueva Noticia
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <form onSubmit={guardarNoticia}>
                <CardHeader>
                  <CardTitle>{editandoNoticia ? "Editar Noticia" : "Agregar Nueva Noticia"}</CardTitle>
                  <CardDescription>
                    {editandoNoticia
                      ? "Modifica los datos de la noticia seleccionada."
                      : "Completa el formulario para agregar una nueva noticia."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="titulo-noticia">Título de la Noticia *</Label>
                    <Input
                      id="titulo-noticia"
                      placeholder="Ej: Exitosa Kermesse Escolar"
                      value={tituloNoticia}
                      onChange={(e) => setTituloNoticia(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fecha-noticia">Fecha *</Label>
                    <DatePicker date={fechaNoticia} setDate={setFechaNoticia} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contenido-noticia">Contenido *</Label>
                    <Textarea
                      id="contenido-noticia"
                      placeholder="Escribe el contenido de la noticia..."
                      value={contenidoNoticia}
                      onChange={(e) => setContenidoNoticia(e.target.value)}
                      className="min-h-[200px]"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="imagen-noticia">URL de la Imagen</Label>
                    <Input
                      id="imagen-noticia"
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={imagenNoticia}
                      onChange={(e) => setImagenNoticia(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ingresa la URL de una imagen. En una versión futura, podrás subir imágenes directamente.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {editandoNoticia && (
                    <Button type="button" variant="outline" onClick={limpiarFormularioNoticia}>
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" className={editandoNoticia ? "" : "w-full"} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {editandoNoticia ? "Actualizar Noticia" : "Guardar Noticia"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <h3 className="text-lg font-bold mt-6 mb-4">Noticias Existentes</h3>

            {isLoading ? (
              <div className="text-center py-4">Cargando noticias...</div>
            ) : noticias.length === 0 ? (
              <div className="text-center py-4">No hay noticias registradas.</div>
            ) : (
              <div className="space-y-4">
                {noticias.map((noticia) => (
                  <Card key={noticia.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle>{noticia.titulo}</CardTitle>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => editarNoticia(noticia)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => eliminarNoticia(noticia.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <CardDescription>
                        {noticia.fecha && format(parseISO(noticia.fecha), "PPP", { locale: es })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col md:flex-row gap-4">
                        {noticia.imagen && (
                          <div className="md:w-1/3">
                            <img
                              src={noticia.imagen || "/placeholder.svg"}
                              alt={noticia.titulo}
                              className="rounded-md object-cover w-full h-40"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.src = "/placeholder.svg?height=160&width=240"
                              }}
                            />
                          </div>
                        )}
                        <div className={noticia.imagen ? "md:w-2/3" : "w-full"}>
                          <p className="line-clamp-3">{noticia.contenido}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* PESTAÑA DE DIRECTORIO */}
        <TabsContent value="directorio">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">Administrar Directorio</h2>
            <Button onClick={limpiarFormularioMiembro} disabled={!editandoMiembro}>
              <Plus className="mr-2 h-4 w-4" /> Nuevo Miembro
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <form onSubmit={guardarMiembro}>
                <CardHeader>
                  <CardTitle>{editandoMiembro ? "Editar Miembro" : "Agregar Nuevo Miembro"}</CardTitle>
                  <CardDescription>
                    {editandoMiembro
                      ? "Modifica los datos del miembro seleccionado."
                      : "Completa el formulario para agregar un nuevo miembro al directorio."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre-miembro">Nombre *</Label>
                    <Input
                      id="nombre-miembro"
                      placeholder="Ej: María González"
                      value={nombreMiembro}
                      onChange={(e) => setNombreMiembro(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cargo-miembro">Cargo *</Label>
                    <Input
                      id="cargo-miembro"
                      placeholder="Ej: Presidenta"
                      value={cargoMiembro}
                      onChange={(e) => setCargoMiembro(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-miembro">Email *</Label>
                    <Input
                      id="email-miembro"
                      type="email"
                      placeholder="Ej: maria.gonzalez@email.com"
                      value={emailMiembro}
                      onChange={(e) => setEmailMiembro(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foto-miembro">URL de la Foto</Label>
                    <Input
                      id="foto-miembro"
                      placeholder="https://ejemplo.com/foto.jpg"
                      value={fotoMiembro}
                      onChange={(e) => setFotoMiembro(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ingresa la URL de una foto. En una versión futura, podrás subir fotos directamente.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {editandoMiembro && (
                    <Button type="button" variant="outline" onClick={limpiarFormularioMiembro}>
                      Cancelar
                    </Button>
                  )}
                  <Button type="submit" className={editandoMiembro ? "" : "w-full"} disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {editandoMiembro ? "Actualizar Miembro" : "Guardar Miembro"}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <h3 className="text-lg font-bold mt-6 mb-4">Miembros del Directorio</h3>

            {isLoading ? (
              <div className="text-center py-4">Cargando miembros...</div>
            ) : miembros.length === 0 ? (
              <div className="text-center py-4">No hay miembros registrados.</div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {miembros.map((miembro) => (
                  <Card key={miembro.id}>
                    <CardHeader className="text-center pb-2">
                      <div className="flex justify-end mb-2">
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon" onClick={() => editarMiembro(miembro)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => eliminarMiembro(miembro.id)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 mb-2">
                          <img
                            src={miembro.foto || "/placeholder.svg?height=96&width=96"}
                            alt={miembro.nombre}
                            className="rounded-full object-cover w-full h-full"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.src = "/placeholder.svg?height=96&width=96"
                            }}
                          />
                        </div>
                        <CardTitle className="text-xl">{miembro.nombre}</CardTitle>
                        <CardDescription className="text-sm font-medium mt-1">{miembro.cargo}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm">{miembro.email}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

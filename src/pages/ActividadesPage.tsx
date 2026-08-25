import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import Spinner from '../components/Spinner'
import {
  actividadAvesImage,
  actividadBoteImage,
  actividadCenaImage,
  actividadTourImage,
  actividadesPortadaImage,
} from '../utils/images'

const actividades = [
  {
    id: 1,
    titulo: 'Paseo en bote por el Río Mamoré',
    descripcion:
      'Recorrido de 2 horas observando la flora y fauna amazónica, avistamiento de delfines y atardeceres únicos sobre el río. Salida desde el muelle principal a las 8:00 AM y 4:00 PM.',
    precio: 150,
    categoria: 'paseo',
    cupo_maximo: 8,
    fecha: 'Diario',
    imagen: actividadBoteImage,
  },
  {
    id: 2,
    titulo: 'Cena típica con pescado fresco',
    descripcion:
      'Gastronomía local: pescado a la parrilla con patacón, ensalada y refresco. Ambiente comunitario con música tradicional.',
    precio: 150,
    categoria: 'comida',
    cupo_maximo: 30,
    fecha: 'Viernes y Sábado por la noche',
    imagen: actividadCenaImage,
  },
  {
    id: 3,
    titulo: 'Tour cultural por Puerto Varador',
    descripcion:
      'Visita a sitios históricos (foto antigua de 1970), tienda de artesanías con chuchío y madera tallada, y museo comunitario con historia de la fundación de la comunidad.',
    precio: 80,
    categoria: 'paseo',
    cupo_maximo: 15,
    fecha: 'Martes, Jueves y Domingo',
    imagen: actividadTourImage,
  },
  {
    id: 4,
    titulo: 'Observación de aves amazónicas',
    descripcion:
      'Recorrido matutino para avistar especies endémicas del Beni. Guía experto en fauna local. Incluye binoculares y refresco.',
    precio: 100,
    categoria: 'paseo',
    cupo_maximo: 10,
    fecha: 'Sábados por la mañana',
    imagen: actividadAvesImage,
  },
]

export default function ActividadesPage() {
  const [mensajeReserva, setMensajeReserva] = useState<string | null>(null)
  const [reservandoId, setReservandoId] = useState<number | null>(null)

  const handleReservar = async (id: number, titulo: string) => {
    setReservandoId(id)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setMensajeReserva(
      `Reserva de "${titulo}" registrada como solicitud. La funcionalidad completa estará disponible al iniciar sesión.`
    )
    setReservandoId(null)
  }

  return (
    <main className="bg-light">
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-center gap-8 mb-10">
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-bold mb-3 text-dark">Nuestras Actividades</h1>
                <p className="text-lg text-gray-600">
                  Reservas disponibles para la comunidad y visitantes. Fortalecemos la economía
                  local.
                </p>
                <span className="inline-block mt-4 bg-accent/20 text-dark text-sm font-medium px-4 py-2 rounded-full border border-accent transition-transform duration-300 hover:scale-105 cursor-default">
                  Reserva con 15% de comisión
                </span>
              </div>
              <div className="w-full lg:w-96 h-56 rounded-2xl overflow-hidden shadow-lg shrink-0 group">
                <img
                  src={actividadesPortadaImage}
                  alt="Actividades Puerto Varador"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </Reveal>

          {mensajeReserva && (
            <div className="mb-6 bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-xl flex items-center justify-between gap-4">
              <span className="text-sm">{mensajeReserva}</span>
              <button
                onClick={() => setMensajeReserva(null)}
                className="text-primary hover:text-primary/70 font-bold transition-colors cursor-pointer"
                aria-label="Cerrar mensaje"
              >
                ✕
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {actividades.map((act, index) => (
              <Reveal key={act.id} delay={index * 0.08} className="h-full">
                <article className="bg-white rounded-2xl overflow-hidden shadow-md flex flex-col h-full transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.02] group">
                  <div className="overflow-hidden">
                    <img
                      src={act.imagen}
                      alt={act.titulo}
                      className="h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full capitalize">
                        {act.categoria}
                      </span>
                      <span className="text-xs text-gray-500">Cupo: {act.cupo_maximo}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1 text-dark">{act.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-3">{act.descripcion}</p>
                    <p className="text-xs text-gray-500 mb-4">🕒 {act.fecha}</p>
                    <div className="mt-auto">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-primary font-bold text-xl">Bs {act.precio}</span>
                        <span className="text-xs text-gray-500">por persona</span>
                      </div>
                      <button
                        onClick={() => handleReservar(act.id, act.titulo)}
                        disabled={reservandoId !== null}
                        className="w-full bg-primary text-white py-2.5 rounded-lg font-medium transition-all duration-300 enabled:hover:bg-secondary enabled:hover:shadow-lg enabled:hover:shadow-secondary/30 enabled:hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait cursor-pointer flex items-center justify-center gap-2"
                      >
                        {reservandoId === act.id ? (
                          <>
                            <Spinner />
                            Reservando...
                          </>
                        ) : (
                          'Reservar Ahora'
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 bg-white rounded-2xl shadow-md p-6 text-center">
              <p className="text-gray-600 mb-3">
                Para gestionar tus reservas necesitas una cuenta comunitaria.
              </p>
              <Link
                to="/login"
                className="inline-block bg-secondary text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-secondary/90 hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5"
              >
                Crear mi cuenta
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}

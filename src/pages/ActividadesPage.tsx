import Reveal from '../components/Reveal'
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
    whatsapp: '59172821225',
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
    whatsapp: '59172821225',
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
    whatsapp: '59172821225',
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
    whatsapp: '59172821225',
  },
]

function handleReservar(whatsapp: string, titulo: string, precio: number) {
  const mensaje = encodeURIComponent(`Hola, me interesa reservar: ${titulo} - Bs ${precio}`)
  window.open(`https://wa.me/${whatsapp}?text=${mensaje}`, '_blank')
}

export default function ActividadesPage() {
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
                        onClick={() => handleReservar(act.whatsapp, act.titulo, act.precio)}
                        className="w-full bg-primary text-white py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-secondary hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                          aria-hidden="true"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Reservar Ahora
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

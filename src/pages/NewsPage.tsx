import Reveal from '../components/Reveal'
import {
  noticiaAvesImage,
  noticiaCapacitacionImage,
  noticiaFiestaImage,
  noticiaHorarioImage,
} from '../utils/images'

const noticias = [
  {
    id: 1,
    titulo: 'Fiesta Patronal - Exaltación de la Santa Cruz',
    fecha: '14 de septiembre',
    resumen:
      'Todas las comunidades se reúnen para celebrar con danzas típicas, gastronomía local y actividades religiosas en honor a la patrona de Puerto Varador.',
    categoria: 'evento',
    imagen: noticiaFiestaImage,
  },
  {
    id: 2,
    titulo: 'Nuevo horario de operatividad',
    fecha: '01 de septiembre',
    resumen:
      'A partir de este mes, las actividades turísticas inician a las 8:00 AM para aprovechar mejor el día y ofrecer más opciones a los visitantes.',
    categoria: 'administracion',
    imagen: noticiaHorarioImage,
  },
  {
    id: 3,
    titulo: 'Capacitación al personal administrativo',
    fecha: '15 de agosto',
    resumen:
      'Se completó la primera fase de capacitación en manejo del portal tecnológico y sistema de reservas. Segunda fase programada para setiembre.',
    categoria: 'capacitacion',
    imagen: noticiaCapacitacionImage,
  },
  {
    id: 4,
    titulo: 'Nueva actividad: Observación de aves',
    fecha: '01 de julio',
    resumen:
      'Lanzamiento de la nueva actividad de observación de aves amazónicas. Guías expertos y equipos disponibles para reservas anticipadas.',
    categoria: 'turismo',
    imagen: noticiaAvesImage,
  },
]

export default function NewsPage() {
  return (
    <main className="bg-light">
      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-dark">
              Noticias Comunitarias
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-6">
            {noticias.map((nota, index) => (
              <Reveal key={nota.id} delay={index * 0.08}>
                <article className="group/article bg-white rounded-2xl overflow-hidden shadow-md flex flex-col sm:flex-row transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:scale-[1.01]">
                  <div className="overflow-hidden sm:w-64 shrink-0">
                    <img
                      src={nota.imagen}
                      alt={nota.titulo}
                      className="h-48 sm:h-full w-full object-cover transition-transform duration-500 ease-out group-hover/article:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs bg-primary/10 text-primary font-medium px-2.5 py-1 rounded-full capitalize">
                        {nota.categoria}
                      </span>
                      <span className="text-xs text-gray-500">{nota.fecha}</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-dark">{nota.titulo}</h3>
                    <p className="text-sm text-gray-600 mb-4">{nota.resumen}</p>
                    <button
                      className="mt-auto self-end inline-flex items-center gap-1.5 text-primary text-sm font-medium hover:text-secondary cursor-pointer transition-colors duration-300"
                      onClick={() => alert('Detalle de noticia en desarrollo.')}
                    >
                      Leer más
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover/article:translate-x-1"
                      >
                        →
                      </span>
                    </button>
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

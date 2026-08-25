import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Reveal from './Reveal'

const TRINIDAD: [number, number] = [-14.838, -64.9036]
const PUERTO_VARADOR: [number, number] = [-14.788, -64.799]
const MAP_CENTER: [number, number] = [-14.813, -64.851]

const GOOGLE_MAPS_DIRECTIONS =
  'https://www.google.com/maps/dir/?api=1&origin=Trinidad,+Beni,+Bolivia&destination=Puerto+Varador,+Beni,+Bolivia'

const pinSvg = (fill: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 24 24" fill="${fill}" stroke="#1e3a3a" stroke-width="1.4"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5z"/></svg>`

const puertoVaradorIcon = L.divIcon({
  html: pinSvg('#ffd700'),
  iconSize: [34, 34],
  iconAnchor: [17, 32],
  popupAnchor: [0, -30],
  className: '',
})

const trinidadIcon = L.divIcon({
  html: pinSvg('#ffffff'),
  iconSize: [30, 30],
  iconAnchor: [15, 28],
  popupAnchor: [0, -26],
  className: '',
})

export default function ComoLlegarSection() {
  return (
    <section className="bg-gradient-to-br from-[#1e3a3a] to-[#2d4f4a] py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/20">
            <span className="inline-block text-xs font-bold tracking-[0.3em] text-accent mb-4">
              CÓMO LLEGAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Tu ruta hacia Puerto Varador
            </h2>
            <p className="text-white/70 leading-relaxed max-w-3xl mb-8">
              Puerto Varador se encuentra a 14 km de la ciudad de Trinidad, sobre la carretera
              a San Ignacio de Moxos, a orillas del río Mamoré. Para visitarnos con
              tranquilidad, te recomendamos confirmar el estado del camino, el clima y la
              disponibilidad de bote el mismo día del viaje.
            </p>

            <a
              href={GOOGLE_MAPS_DIRECTIONS}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-accent text-dark font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5z" />
              </svg>
              Abrir mapa
            </a>

            <div className="mt-10 rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-xl isolate">
              <MapContainer
                center={MAP_CENTER}
                zoom={11}
                scrollWheelZoom={false}
                className="h-72 sm:h-96 w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={PUERTO_VARADOR} icon={puertoVaradorIcon}>
                  <Popup>
                    <strong>Puerto Varador</strong>
                    <br />
                    Zona del río Mamoré (ubicación aproximada)
                  </Popup>
                </Marker>
                <Marker position={TRINIDAD} icon={trinidadIcon}>
                  <Popup>
                    <strong>Trinidad</strong>
                    <br />
                    Punto de partida, capital del Beni
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { lazy, Suspense } from 'react'
import Reveal from '../components/Reveal'
import HeroSection from '../components/HeroSection'
import ResenaHistoricaSection from '../components/ResenaHistoricaSection'

const ComoLlegarSection = lazy(() => import('../components/ComoLlegarSection'))
const GaleriaSection = lazy(() => import('../components/GaleriaSection'))

const ofrecemos = [
  'Reservas de paseos en bote por el río Mamoré',
  'Servicios gastronómicos típicos comunitarios',
  'Información cultural e histórica',
  'Noticias y eventos comunitarios',
]

const porqueUnirse = [
  'Contribuir al desarrollo socio-productivo',
  'Contactar directamente por WhatsApp',
  'Formar parte de una comunidad tecnológica',
  'Apoyar al turismo local',
]

export default function HomePage() {
  return (
    <main className="bg-gradient-to-br from-primary/10 via-light to-secondary/5">
      <HeroSection />

      <section id="intro" className="scroll-mt-16 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal delay={0.15} className="h-full">
              <div className="bg-white rounded-2xl shadow-md p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-xl mb-4 text-primary">¿Qué ofrecemos?</h3>
                <ul className="space-y-3 text-gray-600">
                  {ofrecemos.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.3} className="h-full">
              <div className="bg-white rounded-2xl shadow-md p-8 h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <h3 className="font-bold text-xl mb-4 text-primary">¿Por qué unirse?</h3>
                <ul className="space-y-3 text-gray-600">
                  {porqueUnirse.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="min-h-[24rem] bg-dark/5 animate-pulse" />}>
        <GaleriaSection />
      </Suspense>

      <Suspense fallback={<div className="min-h-[24rem] bg-dark/5 animate-pulse" />}>
        <ComoLlegarSection />
      </Suspense>

      <ResenaHistoricaSection />
    </main>
  )
}

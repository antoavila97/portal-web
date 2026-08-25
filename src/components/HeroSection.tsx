import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { heroBannerImage } from '../utils/images'

const datos = ['396 familias', '2.626 habitantes', 'Beni, Bolivia']

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 34 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
      <img
        src={heroBannerImage}
        alt="Paisaje del río Mamoré en Puerto Varador"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-dark/70"
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-24 text-center">
        <FadeIn delay={0.05}>
          <span className="mb-6 inline-block text-xs font-bold uppercase tracking-[0.35em] text-accent drop-shadow">
            Beni · Bolivia · Río Mamoré
          </span>
        </FadeIn>

        <FadeIn delay={0.15}>
          <h1 className="mb-6 text-6xl font-semibold leading-[1.02] text-white drop-shadow-xl sm:text-7xl lg:text-8xl">
            Puerto Varador
          </h1>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/85 sm:text-xl">
            Río, cultura y comunidad a orillas del Mamoré. Un rincón escondido de la
            Amazonía boliviana que te espera.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link
            to="/actividades"
            className="inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-3.5 font-semibold text-dark shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/40 active:translate-y-0"
          >
            Ver Actividades
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="M13 6l6 6-6 6" />
            </svg>
          </Link>
        </FadeIn>

        <FadeIn delay={0.52}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
            {datos.map((dato) => (
              <span
                key={dato}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md sm:text-sm"
              >
                {dato}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>

      <a
        href="#intro"
        aria-label="Bajar al contenido"
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors duration-300 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 animate-bounce motion-reduce:animate-none"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  )
}

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useReducedMotion } from 'motion/react'
import Reveal from './Reveal'
import { galeriaImages } from '../utils/images'

const clamp = (valor: number, min: number, max: number) =>
  Math.min(Math.max(valor, min), max)

const flechaClass =
  'hidden sm:flex absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/90 backdrop-blur border border-gray-200 text-primary shadow-md transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 cursor-pointer'

export default function GaleriaSection() {
  const reduceMotion = useReducedMotion()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  })
  const [seleccionada, setSeleccionada] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const manejarSeleccion = () => setSeleccionada(emblaApi.selectedScrollSnap())
    emblaApi.on('select', manejarSeleccion)
    emblaApi.on('reInit', manejarSeleccion)
    return () => {
      emblaApi.off('select', manejarSeleccion)
      emblaApi.off('reInit', manejarSeleccion)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return

    const aplicarEfectos = () => {
      const progreso = emblaApi.scrollProgress()
      const snaps = emblaApi.scrollSnapList()
      const spacing =
        snaps.length > 1 ? Math.abs(snaps[1] - snaps[0]) || 1 : 1

      emblaApi.slideNodes().forEach((slide, i) => {
        const inner = slide.querySelector<HTMLElement>('[data-galeria-inner]')
        if (!inner) return

        const diff = ((((snaps[i] - progreso) % 1) + 1.5) % 1) - 0.5
        const k = clamp(Math.abs(diff) / spacing, 0, 3)

        const escala = 1 - k * 0.15
        const opacidad = 1 - Math.min(k * 0.22, 0.65)
        const rotacion = reduceMotion ? 0 : clamp((diff / spacing) * -16, -40, 40)
        const desenfoque = reduceMotion ? 0 : Math.min(k * 2.2, 5)

        inner.style.transform = `perspective(1100px) rotateY(${rotacion}deg) scale(${escala})`
        inner.style.opacity = `${opacidad}`
        inner.style.filter = desenfoque >= 0.5 ? `blur(${desenfoque}px)` : 'none'
        slide.style.zIndex = `${100 - Math.round(k * 20)}`
      })
    }

    aplicarEfectos()
    emblaApi.on('scroll', aplicarEfectos)
    emblaApi.on('reInit', aplicarEfectos)
    return () => {
      emblaApi.off('scroll', aplicarEfectos)
      emblaApi.off('reInit', aplicarEfectos)
    }
  }, [emblaApi, reduceMotion])

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-primary/60 mb-4">
              Galería
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              Un vistazo a Puerto Varador
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
            <p className="text-gray-600 mt-5 max-w-xl mx-auto">
              Desliza para recorrer el río, la comunidad y la vida ribereña de
              nuestra tierra.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative py-4">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="-ml-4 flex touch-pan-y">
                {galeriaImages.map((item) => (
                  <div
                    key={item.label}
                    className="min-w-0 flex-[0_0_78%] pl-4 sm:flex-[0_0_54%] lg:flex-[0_0_42%]"
                  >
                    <figure data-galeria-inner className="will-change-transform">
                      <img
                        src={item.src}
                        alt={item.label}
                        loading="lazy"
                        draggable={false}
                        className="pointer-events-none aspect-[4/5] w-full select-none rounded-2xl object-cover shadow-2xl"
                      />
                      <figcaption className="mt-3 text-center text-sm font-medium text-gray-700">
                        {item.label}
                      </figcaption>
                    </figure>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              aria-label="Foto anterior"
              className={`${flechaClass} left-2 lg:left-6`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              aria-label="Foto siguiente"
              className={`${flechaClass} right-2 lg:right-6`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </Reveal>

        <div className="mt-6 flex justify-center gap-2">
          {galeriaImages.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ir a la foto ${i + 1}: ${item.label}`}
              aria-current={seleccionada === i}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                seleccionada === i
                  ? 'w-7 bg-primary'
                  : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import Reveal from '../components/Reveal'
import Spinner from '../components/Spinner'

const MAX_IMAGEN_BYTES = 5 * 1024 * 1024

const tipos = ['Opinión', 'Mejora', 'Reporte de problema']

const inputClass =
  'w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg bg-white text-dark placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

type Estado = 'inactivo' | 'enviando' | 'exito' | 'error'

export default function SugerenciasPage() {
  const [estado, setEstado] = useState<Estado>('inactivo')
  const [archivo, setArchivo] = useState<File | null>(null)
  const [nombreArchivo, setNombreArchivo] = useState<string | null>(null)
  const [vistaPrevia, setVistaPrevia] = useState<string | null>(null)
  const [errorArchivo, setErrorArchivo] = useState<string | null>(null)
  const formularioRef = useRef<HTMLFormElement>(null)
  const archivoInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    return () => {
      if (vistaPrevia) URL.revokeObjectURL(vistaPrevia)
    }
  }, [vistaPrevia])

  const quitarImagen = () => {
    setArchivo(null)
    setNombreArchivo(null)
    setVistaPrevia(null)
    if (archivoInputRef.current) archivoInputRef.current.value = ''
  }

  const manejarArchivo = (evento: ChangeEvent<HTMLInputElement>) => {
    const seleccion = evento.target.files?.[0]
    setErrorArchivo(null)

    if (!seleccion) {
      quitarImagen()
      return
    }

    if (!seleccion.type.startsWith('image/')) {
      setErrorArchivo('El archivo debe ser una imagen (JPG, PNG o WebP).')
      evento.target.value = ''
      return
    }

    if (seleccion.size > MAX_IMAGEN_BYTES) {
      setErrorArchivo('La imagen supera el límite de 5 MB. Elige una más liviana.')
      evento.target.value = ''
      return
    }

    setArchivo(seleccion)
    setNombreArchivo(seleccion.name)
    setVistaPrevia(URL.createObjectURL(seleccion))
  }

  const reiniciarFormulario = () => {
    formularioRef.current?.reset()
    quitarImagen()
  }

  const handleSubmit = async (evento: FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    if (estado === 'enviando') return

    const datos = new FormData(evento.currentTarget)

    const campoTrampa = datos.get('bot-field')
    if (typeof campoTrampa === 'string' && campoTrampa.trim()) {
      setEstado('exito')
      return
    }

    if (!archivo) datos.delete('captura')

    setEstado('enviando')

    try {
      const respuesta = await fetch('/', { method: 'POST', body: datos })
      if (!respuesta.ok) throw new Error(`Error ${respuesta.status}`)
      reiniciarFormulario()
      setEstado('exito')
    } catch {
      setEstado('error')
    }
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16 bg-gradient-to-br from-primary/10 via-light to-secondary/5">
      <Reveal className="w-full max-w-xl">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-md p-8 sm:p-10">
          {estado === 'exito' ? (
            <div className="text-center py-6" aria-live="polite">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-primary"
                  aria-hidden="true"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-3">¡Gracias por tu sugerencia!</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Tu mensaje fue enviado correctamente. La comunidad de Puerto Varador lo revisará
                pronto para seguir mejorando el portal.
              </p>
              <button
                type="button"
                onClick={() => setEstado('inactivo')}
                className="inline-block bg-primary text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-300 hover:bg-secondary hover:shadow-lg hover:shadow-secondary/30 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Enviar otra sugerencia
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-8">
                <span className="inline-block text-xs font-bold tracking-[0.3em] text-accent mb-3">
                  TU OPINIÓN CUENTA
                </span>
                <h2 className="text-3xl font-bold text-primary mb-2">Sugerencias</h2>
                <p className="text-gray-600 leading-relaxed">
                  Cuéntanos qué te gustó, qué mejorarías o reporta algún problema del portal. Con
                  tu ayuda hacemos crecer Puerto Varador.
                </p>
              </div>

              <div aria-live="polite">
                {estado === 'error' && (
                  <div
                    role="alert"
                    className="mb-6 bg-secondary/10 border border-secondary/30 text-secondary px-4 py-3 rounded-xl text-sm text-center"
                  >
                    No pudimos enviar tu sugerencia. Verifica tu conexión e inténtalo nuevamente.
                  </div>
                )}
              </div>

              <form ref={formularioRef} onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="form-name" value="sugerencias" />
                <p className="hidden" aria-hidden="true">
                  <label>
                    No completar este campo:{' '}
                    <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div>
                  <label htmlFor="nombre" className={labelClass}>
                    Nombre (opcional)
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    maxLength={60}
                    placeholder="Ej: Juan Pérez"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="tipo" className={labelClass}>
                    Tipo de sugerencia
                  </label>
                  <select id="tipo" name="tipo" required defaultValue="" className={inputClass}>
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    {tipos.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="mensaje" className={labelClass}>
                    Tu mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    required
                    minLength={10}
                    maxLength={1500}
                    rows={5}
                    placeholder="Describe tu opinión, la mejora que propones o el problema encontrado..."
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <div>
                  <label htmlFor="captura" className={labelClass}>
                    Captura de pantalla (opcional)
                  </label>
                  <input
                    ref={archivoInputRef}
                    id="captura"
                    name="captura"
                    type="file"
                    accept="image/*"
                    onChange={manejarArchivo}
                    className={`${inputClass} file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-primary/10 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-primary hover:file:bg-primary/20`}
                  />
                  <p className="mt-1.5 text-xs text-gray-400">
                    Imágenes JPG, PNG o WebP de hasta 5 MB.
                  </p>

                  {errorArchivo && (
                    <p role="alert" className="mt-2 text-sm text-secondary">
                      {errorArchivo}
                    </p>
                  )}

                  {vistaPrevia && nombreArchivo && (
                    <div className="mt-3 flex items-start gap-3 bg-light rounded-xl p-3">
                      <img
                        src={vistaPrevia}
                        alt={`Vista previa de ${nombreArchivo}`}
                        className="h-20 w-28 shrink-0 rounded-lg object-cover ring-1 ring-gray-200"
                      />
                      <div className="min-w-0 flex-1 pt-1">
                        <p className="truncate text-sm text-gray-600">{nombreArchivo}</p>
                        <button
                          type="button"
                          onClick={quitarImagen}
                          className="mt-1 text-sm font-medium text-secondary hover:underline cursor-pointer transition-colors duration-300"
                        >
                          Quitar imagen
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={estado === 'enviando'}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium transition-all duration-300 enabled:hover:bg-secondary enabled:hover:shadow-lg enabled:hover:shadow-secondary/30 enabled:hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait cursor-pointer flex items-center justify-center gap-2"
                >
                  {estado === 'enviando' ? (
                    <>
                      <Spinner />
                      Enviando...
                    </>
                  ) : (
                    'Enviar sugerencia'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </Reveal>
    </main>
  )
}

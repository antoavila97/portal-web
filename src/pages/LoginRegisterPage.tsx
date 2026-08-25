import { useState } from 'react'
import type { FormEvent } from 'react'
import Reveal from '../components/Reveal'
import Spinner from '../components/Spinner'
import { loginFondoImage } from '../utils/images'

type Modo = 'login' | 'registro'

const inputClass =
  'w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg bg-white text-dark placeholder-gray-400 transition-all duration-300 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5'

export default function LoginRegisterPage() {
  const [modo, setModo] = useState<Modo>('login')
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [enviando, setEnviando] = useState(false)

  const esLogin = modo === 'login'

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEnviando(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setMensaje(
      esLogin
        ? 'Inicio de sesión en desarrollo. Próximamente conectado a la base de datos.'
        : 'Registro en desarrollo. Tu cuenta comunitaria podrá crearse próximamente.'
    )
    setEnviando(false)
  }

  const alternarModo = () => {
    if (enviando) return
    setModo(esLogin ? 'registro' : 'login')
    setMensaje(null)
  }

  return (
    <main className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      <img
        src={loginFondoImage}
        alt=""
        aria-hidden="true"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-dark/60 via-black/50 to-dark/70"
      />

      <Reveal className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-primary">
              {esLogin ? 'Bienvenido/a' : 'Crear Cuenta'}
            </h2>
            <p className="text-gray-600">
              {esLogin
                ? 'Accede al portal de reservas comunitarias'
                : 'Únete a la comunidad de Puerto Varador'}
            </p>
          </div>

          {mensaje && (
            <div className="mb-6 bg-primary/10 border border-primary/30 text-primary px-4 py-3 rounded-xl text-sm text-center">
              {mensaje}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="identidad" className={labelClass}>
                {esLogin ? 'Documento de identidad' : 'Nombres y apellidos'}
              </label>
              <input
                id="identidad"
                type="text"
                required
                placeholder={esLogin ? 'Ej: 12345678' : 'Ej: Juan Pérez'}
                className={inputClass}
              />
            </div>

            {!esLogin && (
              <div>
                <label htmlFor="telefono" className={labelClass}>
                  Teléfono (opcional)
                </label>
                <input
                  id="telefono"
                  type="tel"
                  placeholder="79XXX-XXXX"
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label htmlFor="password" className={labelClass}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                placeholder="Mínimo 6 caracteres"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium transition-all duration-300 enabled:hover:bg-secondary enabled:hover:shadow-lg enabled:hover:shadow-secondary/30 enabled:hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-wait cursor-pointer flex items-center justify-center gap-2"
            >
              {enviando ? (
                <>
                  <Spinner />
                  {esLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                </>
              ) : esLogin ? (
                'Iniciar Sesión'
              ) : (
                'Registrarse'
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            {esLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button
              onClick={alternarModo}
              disabled={enviando}
              className="text-primary font-medium hover:text-secondary hover:underline cursor-pointer transition-colors duration-300 disabled:opacity-50"
            >
              {esLogin ? 'Regístrate aquí' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </Reveal>
    </main>
  )
}

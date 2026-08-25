import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

const links = [
  { to: '/actividades', label: 'Actividades' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/sugerencias', label: 'Sugerencias' },
  { to: '/login', label: 'Mi Cuenta' },
]

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative text-sm font-medium transition-colors duration-300 ${
    isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
  } after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-300 ${
    isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
  }`

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const [menuAbierto, setMenuAbierto] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link
            to="/"
            onClick={() => setMenuAbierto(false)}
            className="inline-block font-bold text-primary text-base sm:text-lg tracking-wide transition-transform duration-300 hover:scale-105"
          >
            PUERTO VARADOR
          </Link>

          <ul className="hidden sm:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={desktopLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-expanded={menuAbierto}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
            className="sm:hidden p-2 -mr-2 rounded-lg text-gray-600 hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="w-6 h-6"
              aria-hidden="true"
            >
              {menuAbierto ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuAbierto && (
            <motion.div
              key="menu-movil"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="sm:hidden overflow-hidden border-t border-gray-100 bg-white"
            >
              <ul className="px-3 py-3 space-y-1">
                {links.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className={mobileLinkClass}
                      onClick={() => setMenuAbierto(false)}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="flex-1">{children}</div>

      <footer className="bg-dark py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-sm text-gray-300">
            © {new Date().getFullYear()} Puerto Varador - Portal Comunitario. Diseñado para
            fortalecer la economía local y promover nuestro turismo.
          </p>
        </div>
      </footer>
    </div>
  )
}

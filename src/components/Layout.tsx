import { useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

const links = [
  { to: '/actividades', label: 'Actividades', highlight: false },
  { to: '/noticias', label: 'Noticias', highlight: false },
  { to: '/sugerencias', label: 'Sugerencias', highlight: true },
]

const mobileLinkClass = (highlight: boolean) => ({ isActive }: { isActive: boolean }) => {
  if (highlight) {
    return `block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
      isActive
        ? 'bg-primary text-white shadow-md shadow-primary/30'
        : 'bg-primary/15 text-primary border border-primary/30 hover:bg-primary hover:text-white'
    }`
  }
  return `block px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
    isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 hover:bg-primary/5 hover:text-primary'
  }`
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <Link
            to="/"
            className="inline-block font-bold text-primary text-base sm:text-lg tracking-wide transition-transform duration-300 hover:scale-105"
          >
            PUERTO VARADOR
          </Link>

          <ul className="flex items-center gap-2 sm:gap-8">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={mobileLinkClass(link.highlight)}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
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

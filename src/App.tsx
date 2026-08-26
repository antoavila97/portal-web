import { AnimatePresence } from 'motion/react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Layout from './components/Layout'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import ActividadesPage from './pages/ActividadesPage'
import NewsPage from './pages/NewsPage'
import SugerenciasPage from './pages/SugerenciasPage'

function NotFoundPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-gray-600 mb-6">La página que buscas no existe.</p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-6 py-2 rounded-lg transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  )
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/actividades"
          element={
            <PageTransition>
              <ActividadesPage />
            </PageTransition>
          }
        />
        <Route
          path="/noticias"
          element={
            <PageTransition>
              <NewsPage />
            </PageTransition>
          }
        />
        <Route
          path="/sugerencias"
          element={
            <PageTransition>
              <SugerenciasPage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  )
}

const unsplash = (id: string, width = 800) =>
  `https://images.unsplash.com/${id}?w=${width}&q=80`

export const heroBannerImage = '/images/hero.webp'

export const loginFondoImage = '/images/login.webp'

export type GaleriaItem = { src: string; label: string }

export const galeriaImages: GaleriaItem[] = [
  { src: '/images/galeria-5.webp', label: 'Río Mamoré' },
  { src: '/images/galeria-6.webp', label: 'Paseo en bote' },
  { src: '/images/galeria-1.webp', label: 'Desfile fluvial' },
  { src: '/images/galeria-2.webp', label: 'Feria local' },
  { src: '/images/galeria-4.webp', label: 'Cosecha de yuca' },
  { src: '/images/galeria-3.webp', label: 'Reforestación' },
]

export const actividadBoteImage = unsplash('photo-1476514525535-07fb3b4ae5f1')
export const actividadCenaImage = unsplash('photo-1555939594-58d7cb561ad1')
export const actividadTourImage = unsplash('photo-1554907984-15263bfd63bd')
export const actividadAvesImage = unsplash('photo-1444464666168-49d633b86797')

export const actividadesPortadaImage = unsplash(
  'photo-1441974231531-c6227db76b6e'
)

export const noticiaFiestaImage = unsplash('photo-1492684223066-81342ee5ff30')
export const noticiaHorarioImage = unsplash('photo-1506784983877-45594efa4cbe')
export const noticiaCapacitacionImage = unsplash(
  'photo-1522071820081-009f0129c71c'
)
export const noticiaAvesImage = unsplash('photo-1552728089-57bdde30beb3')

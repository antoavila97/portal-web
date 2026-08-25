import { readdir, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ORIGINALES = path.join('imagenes-originales')
const SALIDA = path.join('public', 'images')
const EXTENSIONES = /\.(jpe?g|png|webp|avif)$/i
const ANCHO_MAXIMO = 1920
const CALIDAD_INICIAL = 80
const CALIDAD_MINIMA = 55

const formatoLegible = (bytes) => `${(bytes / 1024).toFixed(0)} KB`

await mkdir(SALIDA, { recursive: true })

const archivos = (await readdir(ORIGINALES)).filter((f) => EXTENSIONES.test(f))

if (archivos.length === 0) {
  console.log(
    `No hay imágenes en imagenes-originales. Copia ahí tus fotos (.jpg, .png o .webp) y vuelve a ejecutar npm run imagenes.`
  )
  process.exit(0)
}

for (const archivo of archivos) {
  const nombre = archivo.replace(EXTENSIONES, '')
  const rutaOriginal = path.join(ORIGINALES, archivo)
  const salida = path.join(SALIDA, `${nombre}.webp`)

  const dimensiones = await sharp(rutaOriginal).metadata()
  const pesoOriginal = (await stat(rutaOriginal)).size

  const procesar = (calidad) =>
    sharp(rutaOriginal)
      .rotate()
      .resize({ width: ANCHO_MAXIMO, withoutEnlargement: true })
      .webp({ quality: calidad })
      .toFile(salida)

  let calidad = CALIDAD_INICIAL
  let info = await procesar(calidad)

  while (info.size > pesoOriginal && calidad > CALIDAD_MINIMA) {
    calidad -= 5
    info = await procesar(calidad)
  }

  console.log(
    `✓ ${archivo} (${dimensiones.width}×${dimensiones.height}) → ${nombre}.webp [calidad ${calidad}] ${formatoLegible(pesoOriginal)} → ${formatoLegible(info.size)}`
  )
}

console.log(`\n${archivos.length} imagen(es) optimizada(s) en public/images/`)

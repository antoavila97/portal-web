# Portal Web - Puerto Varador

Portal comunitario de comercialización y gestión turística para la comunidad de Puerto Varador (Beni, Bolivia): 396 familias, 2.626 habitantes.

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev) con [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [Tailwind CSS v4](https://tailwindcss.com) vía `@tailwindcss/postcss` (config por CSS con `@theme` en `src/index.css`)
- [React Router v7](https://reactrouter.com)
- Tipografía: [Fraunces](https://fonts.google.com/specimen/Fraunces) (títulos h1-h3) + [Inter](https://fonts.google.com/specimen/Inter) (cuerpo), vía Google Fonts

## Estructura

```
src/
├── components/   # Layout, Reveal, PageTransition, Spinner, secciones (Cómo llegar, Reseña Histórica)
├── pages/        # HomePage, ActividadesPage, NewsPage, LoginRegisterPage, SugerenciasPage
├── contexts/     # (reservado para contexto de autenticación)
├── utils/
│   └── images.ts # URLs centralizadas de todas las imágenes del portal
├── index.css     # Tailwind v4: colores de marca, fuentes y animaciones (@theme)
└── App.tsx       # Rutas + transiciones de página + 404
```

## Reemplazar imágenes por fotos reales

Las imágenes actuales son placeholders de stock. Cuando existan fotos reales de la comunidad, editar **solo** `src/utils/images.ts`: cada variable (`heroBannerImage`, `actividadBoteImage`, `noticiaFiestaImage`, etc.) apunta a la imagen que se usa en el portal. Los componentes no contienen rutas hardcodeadas.

## Despliegue

El sitio se despliega automáticamente en Netlify: cada `git push` a `main` dispara el build
(`npm run build`) y publica la carpeta `dist`. No es necesario subir archivos manualmente.

- Producción: https://puerto-varador.netlify.app
- Formulario de sugerencias gestionado con [Netlify Forms](https://docs.netlify.com/forms/setup/):
  registrado vía formulario oculto en `index.html` y enviado desde `SugerenciasPage.tsx`.

## Comandos

```bash
npm install    # instalar dependencias
npm run dev    # servidor de desarrollo
npm run build  # build de producción (tsc -b && vite build)
npm run lint   # oxlint
npm run preview
```

## Estado del proyecto

En desarrollo. Actualmente con datos de ejemplo; pendiente la integración con base de datos para usuarios, actividades y reservas.

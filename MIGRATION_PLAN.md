# Plan: Migrar `git-cards` de CRA a Vite + React 19

## Contexto

El proyecto es una SPA pequeña (chuleta de comandos Git/Bash) creada con
**Create React App** (`react-scripts` 5.0.1) sobre **React 18.2**. CRA está
**oficialmente descontinuado** por el equipo de React: arrastra webpack/Babel
desactualizados, builds lentos y numerosas vulnerabilidades transitivas. El
objetivo es modernizar la base antes de otras mejoras: pasar a **Vite** (dev
server instantáneo, builds rápidos, config mínima) y actualizar a **React 19**
(última versión). La app no usa configuración especial de webpack, ni routing,
ni backend, por lo que la migración es de bajo riesgo.

## Alcance / decisiones

- **React 19** (`react` y `react-dom` a `^19`).
- **Vite** con `@vitejs/plugin-react` como builder/dev server.
- **Vitest** como test runner (CRA usaba Jest vía `react-scripts test`; Vite no
  trae runner). Se conserva y adapta el único test existente para no perder
  cobertura.
- Renombrar los archivos con JSX de `.js` a **`.jsx`** (Vite espera esa
  extensión para JSX). Los `import` sin extensión siguen funcionando.
- Eliminar boilerplate de CRA no esencial: `reportWebVitals.js` + dependencia
  `web-vitals`, y la clave `eslintConfig`/`browserslist` de CRA en package.json.

## Cambios concretos

### 1. Dependencias — `package.json`
- **Quitar**: `react-scripts`, `web-vitals`.
- **Actualizar**: `react` y `react-dom` → `^19`; `@testing-library/react` →
  `^16` (compatible con React 19); mantener `@testing-library/jest-dom` y
  `uuid`.
- **Añadir (devDependencies)**: `vite`, `@vitejs/plugin-react`, `vitest`,
  `jsdom`.
- **Scripts** nuevos:
  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
  ```
- Eliminar los bloques `eslintConfig` y `browserslist` (específicos de CRA;
  Vite/esbuild usan su propio targeting). Regenerar `package-lock.json` con
  `npm install`.

### 2. Nuevo `vite.config.js` (raíz)
- Plugin `@vitejs/plugin-react`.
- Bloque `test` de Vitest: `environment: "jsdom"`, `globals: true`,
  `setupFiles: "./src/setupTests.js"`.

### 3. `index.html` → mover a la raíz del proyecto
- Mover `public/index.html` a `/index.html`.
- Sustituir los `%PUBLIC_URL%/...` por rutas absolutas (`/favicon.ico`,
  `/logo192.png`, `/manifest.json`) — los assets de `public/` se sirven desde
  la raíz en Vite.
- Añadir antes de `</body>`: `<script type="module" src="/src/main.jsx"></script>`.
- Actualizar `<title>` y el `<meta name="description">` (hoy "React App" /
  "created using create-react-app").

### 4. Entrada de la app
- Renombrar `src/index.js` → **`src/main.jsx`**.
- Quitar el `import`/llamada de `reportWebVitals`; mantener `createRoot` +
  `StrictMode` (ya usa la API de React 18/19).
- **Borrar** `src/reportWebVitals.js`.

### 5. Renombrar archivos con JSX a `.jsx`
Sin cambios de código, solo extensión (los imports sin extensión no cambian):
- `src/App.js` → `src/App.jsx`
- `src/components/card/Card.js` → `Card.jsx`
- `src/components/command/Command.js` → `Command.jsx`
- `src/components/sentence/Sentence.js` → `Sentence.jsx`
- `src/components/popup/Popup.js` → `Popup.jsx`
- `src/data/data.js` → **se mantiene `.js`** (no contiene JSX).

Los CSS Modules (`*.module.css`) y los `import` de SVG funcionan de forma nativa
en Vite: **no requieren cambios**.

### 6. Tests
- `src/App.test.js` → `src/App.test.jsx`. El test actual (`/learn react/i`)
  sigue siendo válido con el enlace "Learn React" existente; se ejecuta ahora
  bajo Vitest. `src/setupTests.js` se reutiliza como `setupFiles`.

### 7. `.gitignore`
- Cambiar `/build` por `/dist` (salida por defecto de Vite). Mantener el resto.

## Archivos clave
- Nuevos: `vite.config.js`, `index.html` (raíz), `src/main.jsx`.
- Modificados: `package.json`, `.gitignore`.
- Renombrados: `src/App.jsx`, `src/App.test.jsx`, los 4 componentes a `.jsx`.
- Eliminados: `src/index.js`, `src/reportWebVitals.js`, `public/index.html`.

## Verificación (end-to-end)
1. `npm install` — resuelve el nuevo árbol de dependencias sin errores.
2. `npm run dev` — el dev server de Vite arranca y la app carga en el navegador:
   se ven las tarjetas Git/Bash, los botones de filtro (All / git / bash) y el
   selector de tamaño de fuente.
3. Comprobar interacción: clic en un comando → se copia al portapapeles y
   aparece el `Popup` de notificación (auto-oculta a los 4 s).
4. `npm run build` seguido de `npm run preview` — build de producción sin
   errores y la app funciona igual servida desde `dist/`.
5. `npm test` (Vitest) — el test de render pasa en verde.
6. `npm audit` — confirmar la reducción drástica de vulnerabilidades frente a
   CRA.

## Notas
- Tras esta migración quedan pendientes (fuera de alcance aquí) las mejoras ya
  detectadas: keys estables en vez de `uuidv4()`, limpieza de `useEffect`,
  README real y tests significativos.

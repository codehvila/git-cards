# Roadmap: hacer el código más idiomático

## Contexto

Revisión progresiva de los ficheros `.jsx` del repo en busca de patrones que
funcionan correctamente pero no siguen las convenciones idiomáticas de
React/JS moderno. Se documentan aquí como hoja de ruta para abordarlos más
adelante, sin fijar todavía la solución concreta de cada uno. Ampliar con una
nueva sección por fichero a medida que se revisen (componentes, tests, etc.).

## `src/App.jsx`

- [ ] **Cálculo de `cardsFiltered` con `let` + `if/else`** (declaración y
  reasignación condicional). El valor es 100% derivado de `cardFilter` y
  `cardList`; la forma de calcularlo no es la más idiomática.

- [ ] **Uso de `.map()` con efecto secundario en `cardObjectToCardList`**.
  Se usa `.map()` dos veces para iterar y hacer `push` sobre un array
  externo, devolviendo `null` en cada callback, en vez de usarlo para
  transformar y devolver un array nuevo.

- [ ] **Mezcla de idiomas en el naming**. La variable `tipos` (dentro del
  `reduce` que construye `uniqueCardTypeList`) está en español mientras el
  resto del fichero nombra todo en inglés.

- [ ] **Acceso directo al DOM en `setFontSize`**. Usa
  `document.querySelector("html")` dentro del componente en vez del enfoque
  declarativo habitual de React para tocar el DOM.

- [x] **`key={uuidv4()}` generado en cada render** — resuelto. Las keys ahora
  se derivan de los propios datos: `` `${card.type}+${card.title}` `` para las
  tarjetas (único por construcción, ya que `title` es clave de objeto dentro
  de cada `type`) y `` `${index}-${sentence}` `` para las sentencias de cada
  card. El import de `uuidv4`/`uuid` se ha eliminado del fichero y de
  `package.json`.

- [ ] **Guardas `&&` redundantes antes de `.map()`**. Tanto
  `uniqueCardTypeList &&` como `cardsFiltered &&` comprueban valores que
  nunca pueden ser `null`/`undefined`, siempre son arrays.

- [ ] **`<Fragment>` explícito donde no hace falta `key`**. En el bloque de
  botones de filtro se importa y usa `Fragment` en un punto donde podría
  usarse la sintaxis abreviada `<>...</>`.

- [ ] **Paréntesis superfluos**. Alrededor de las expresiones asignadas a
  `cardsFiltered` en el `if/else`.

## `src/components/card/Card.jsx`

- [x] **`props` destructurado en el cuerpo en vez de en la firma** — resuelto.
  Ahora `Card({ children, title, type })` desestructura directamente en los
  parámetros de la función.

- [x] **Guarda redundante en el ternario del icono** — resuelto. Ahora es
  simplemente `type === "git"`, sin la comprobación `type &&` previa.

- [x] **Fallback implícito a `bashIcon`** — resuelto. Ahora `iconByType` es
  una tabla de lookup (`{ git: {src, alt}, bash: {src, alt} }`) y un `type`
  que no está en la tabla cae en un fallback explícito (`{ src: undefined,
  alt: "Unknown icon" }`) en vez de mostrarse como si fuera bash. Un tipo
  desconocido ahora se ve (icono roto + `alt="Unknown icon"`) en vez de
  esconderse.

## `src/components/command/Command.jsx`

- [x] **`<>...</>` envolviendo un único elemento** — resuelto. El componente
  devuelve directamente `<div className="commands">{children}</div>` sin
  Fragment envolvente.

## `src/components/popup/Popup.jsx`

- [ ] **Valor por defecto de `notification` que nunca se usa en la práctica**.
  `App.jsx` solo renderiza `<Popup>` cuando `notification` ya es truthy
  (`{notification && <Popup ... />}`), por lo que el objeto por defecto
  (`"Hello!"` / `"info"`) es efectivamente código muerto.

- [ ] **`notification.setNotification(null)`**: el propio objeto de dominio
  `notification` lleva embebido un setter de estado de React
  (`setNotification`) como si fuera un campo más de datos. Mezclar la función
  de actualización de estado dentro del objeto que representa el dato es un
  acoplamiento poco idiomático (ver también la sección de `Sentence.jsx`,
  donde se origina).

- [ ] **`TIMEOUT` declarado dentro del componente**. Es un valor fijo que no
  depende de props/estado, pero se redeclara en cada render en vez de vivir
  como constante a nivel de módulo.

## `src/components/sentence/Sentence.jsx`

- [x] **`children.toString()`** — resuelto. `textSentenceNotification` ahora
  es directamente `children`, sin la conversión implícita, trabajando con el
  valor ya disponible en vez de asumir que admite `.toString()`.

- [x] **`event.target.textContent` en `copyContent`** — resuelto.
  `copyContent` ya no recibe el `event` ni lee del DOM; usa `children`
  directamente en `navigator.clipboard.writeText(children)`. De paso se
  eliminaron los alias intermedios `textSentenceNotification`/`textContent`
  (ambos eran simplemente `children` sin ninguna transformación), dejando
  `children` usado directamente donde no hace falta derivar nada, y
  `TEXT_NOTIFICATION` como la única constante que sí aplica una
  transformación real (el ternario + template string).

- [x] **`TEXT_NOTIFICACION`** — resuelto. Renombrada a `TEXT_NOTIFICATION`,
  consistente con el resto del fichero en inglés.

- [ ] **`setNotification` incluido dentro del objeto que se pasa a
  `setNotification({...})`**. El payload de la notificación
  (`{ text, category, setNotification }`) lleva la propia función setter como
  campo de datos; es el origen del mismo acoplamiento señalado en
  `Popup.jsx`.

- [x] **`<>...</>` envolviendo un único elemento** — resuelto. Igual que en
  `Command.jsx`, el `<div className={styles.sentence}>` era el único hijo, así
  que se elimina el Fragment envolvente.

## `src/main.jsx`

- [x] **`import React from "react"` solo para `React.StrictMode`** — resuelto.
  Ahora se importa `StrictMode` como named export (`import { StrictMode } from
  "react"`), sin necesidad del import por defecto de `React`.

## `src/App.test.jsx`

- [x] **Selección por orden en el DOM** — resuelto. Cada `<span>` de tamaño
  de fuente lleva ahora su propio `data-testid`
  (`rootfontsizesmall`/`rootfontsizenormal`/`rootfontsizebig`) y el test los
  consulta con `screen.getByTestId(...)` en vez de depender del orden
  devuelto por `getAllByText('A')`. Reordenar los `<span>` en `App.jsx` ya no
  rompería este test.

- [x] **Acoplamiento a los literales de `data.js`** — resuelto. El fichero
  ahora importa `cardGitList`/`cardBashList` de `./data/data` y deriva
  `firstGitText`/`firstBashText` con `Object.keys(...)[0]` en vez de retipar
  los títulos como strings sueltos. Los tests afectados (render inicial,
  filtrado por git/bash, reset con "All cards") usan esas constantes, así que
  editar el contenido de `data.js` ya no rompe estos tests mientras sigan
  existiendo tarjetas de cada tipo.

## Notas

- Este documento nace de una revisión de idiomaticidad, no de bugs (los
  `useEffect` innecesarios de `App.jsx` ya se eliminaron, ver `92fd520`).
- La nota pendiente de `MIGRATION_PLAN.md` sobre keys estables en vez de
  `uuidv4()` queda resuelta con este cambio (ver sección `src/App.jsx`).
- El cambio de keys en `App.jsx` (`${card.type}+${card.title}` y
  `${index}-${sentence}`) no afecta a la fragilidad de `App.test.jsx`: los 8
  tests del fichero siguen en verde, ya que ninguno consulta por `key` (no es
  un atributo observable en el DOM), solo por texto/rol.

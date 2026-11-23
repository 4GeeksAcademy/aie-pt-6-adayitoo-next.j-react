# Contexto del proyecto — Clon de Airbnb (Frontend)

## 1. ¿Qué estamos construyendo?

Un clon funcional de la interfaz de Airbnb como ejercicio de validación de arquitectura
de componentes. No es un producto real: es un banco de pruebas para que el estudio de
diseño aprenda qué componentes necesita una plataforma de alquiler vacacional, qué datos
consume cada uno y cómo se conectan entre vistas.

**Objetivo real:** antes de crear un sistema de diseño propio, queremos entender la
anatomía de una interfaz de producción conocida (Airbnb) y traducirla a componentes
React pequeños, reutilizables y con una sola responsabilidad cada uno.

## 2. ¿Quién es el usuario?

Un viajero que busca alojamiento para unas vacaciones. Llega con una idea vaga
("quiero ir a tal sitio en tal fecha"), explora opciones y termina interesándose por
una propiedad concreta. Su recorrido emocional es:

1. **Descubrir** → ¿qué ofrece la plataforma?
2. **Comparar** → ¿cuál de estas opciones me encaja?
3. **Decidir** → ¿es esta LA propiedad? ¿cuánto cuesta? ¿qué incluye?

Cada una de las tres vistas corresponde a una fase de ese recorrido.

## 3. Las tres vistas

### 3.1 Home (`/`)
Página de aterrizaje. Su trabajo es **captar la intención** del usuario y empujarlo al catálogo.

Contiene:
- Header con logo y navegación básica.
- Buscador destacado (destino, fechas, huéspedes) — en móvil ocupa el protagonismo.
- Sección de categorías o alojamientos destacados (tarjetas) para dar sensación de contenido.

### 3.2 Catálogo (`/catalog`)
Resultados de búsqueda. Su trabajo es **permitir comparar** muchas opciones rápido.

Contiene:
- Header consistente con el resto de la app.
- Barra de búsqueda/filtros compacta (puede reutilizar `SearchBar`).
- Cuadrícula de tarjetas de propiedad:
  - **Móvil (375px):** 1 columna.
  - **Escritorio (≥768px):** 2–3 columnas.
- Cada tarjeta muestra: imagen, título, ubicación, precio por noche, valoración.

### 3.3 Detalle de habitación (`/rooms/[id]`)
Vista de decisión. Su trabajo es **dar toda la información** para que el usuario reserve.

Contiene:
- Galería de imágenes (carrusel en móvil, grid en escritorio).
- Título, ubicación, valoración, capacidad.
- Información del anfitrión.
- Lista de servicios/amenities.
- Descripción.
- Tarjeta de reserva (precio, fechas, botón de reservar) — **sticky** en escritorio.

## 4. Componentes principales

Lista inicial (puede crecer durante la implementación). Regla de oro:
**un componente = una responsabilidad**.

| Componente        | Responsabilidad                                              | Dónde se usa            |
|-------------------|--------------------------------------------------------------|-------------------------|
| `AppHeader`       | Navegación global (logo, enlaces, avatar)                    | Las 3 vistas            |
| `SearchBar`       | Capturar destino/fechas/huéspedes                            | Home y Catálogo         |
| `FilterChip`      | Filtro individual seleccionable                              | Catálogo                |
| `PropertyCard`    | Resumen visual de una propiedad + enlace al detalle          | Home y Catálogo         |
| `PropertyGrid`    | Layout en grid de `PropertyCard`                             | Catálogo                |
| `ImageGallery`    | Mostrar fotos de una propiedad (carrusel/grid)               | Detalle                 |
| `HostInfo`        | Datos del anfitrión                                          | Detalle                 |
| `AmenitiesList`   | Lista de servicios de la propiedad                           | Detalle                 |
| `ReservationCard` | Precio + selector de fechas + CTA de reserva                 | Detalle                 |
| `RatingBadge`     | Valoración con estrellas                                     | PropertyCard y Detalle  |

## 5. Datos que necesita cada componente

(Datos de prueba, hardcodeados o en `data/properties.ts`. No hay backend.)

- **Propiedad (`Property`)**: `id`, `title`, `location`, `pricePerNight`, `rating`,
  `images[]`, `capacity`, `hostName`, `amenities[]`, `description`.
- **Búsqueda (`SearchQuery`)**: `destination`, `checkIn`, `checkOut`, `guests`.

## 6. Principios de diseño

- **Mobile-first**: se diseña primero para **375px** y se adapta a escritorio desde **768px**.
  Tailwind con prefijos `md:` / `lg:` para los breakpoints.
- **Componentes pequeños y enfocados**: si un componente hace dos cosas, se parte.
- **Consistencia**: el header y la barra de búsqueda deben verse iguales entre vistas.
- **Sin dependencias innecesarias**: usar lo que ya trae Next.js + Tailwind.

## 7. Stack técnico

- **Next.js** (App Router) con **TypeScript**.
- **Tailwind CSS** para estilos.
- **`next/link`** para navegación entre vistas (sin recargas).
- **`useRouter`** (de `next/navigation`) solo para navegación programática
  (por ejemplo, tras enviar el buscador).

## 8. Navegación

Toda la navegación es **client-side** (SPA), sin recargar el navegador:

- `Home` → `Catálogo`: al enviar el buscador o al pulsar una categoría.
- `Home` → `Detalle`: al pulsar una `PropertyCard` destacada.
- `Catálogo` → `Detalle`: al pulsar una `PropertyCard`.
- `Detalle` → `Catálogo` / `Home`: mediante el header.

Rutas:
- `/` → Home
- `/catalog` → Catálogo
- `/rooms/[id]` → Detalle (ruta dinámica)

## 9. Fuera de alcance

- No hay autenticación real.
- No hay reservas reales ni pasarela de pago.
- No hay backend ni base de datos: los datos son estáticos.
- No se busca pixel-perfect respecto a Airbnb, sino **fidelidad estructural**
  (mismos componentes, misma jerarquía, mismo flujo).

## 10. Criterios de "hecho"

- [ ] Las tres vistas existen y se navega entre ellas sin recargar.
- [ ] Cada componente tiene una única responsabilidad.
- [ ] El diseño funciona a 375px y a ≥768px.
- [ ] Existen datos de prueba suficientes para poblar catálogo y detalle.
- [ ] El código es legible y los componentes son reutilizables entre vistas.

---

## 11. Especificación de Componentes - Análisis UI Airbnb

Especificación detallada de componentes basada en el análisis de la interfaz de Airbnb.

### 📋 Estructura General (Layout)

La página utiliza un layout **vertical responsivo** con secciones apiladas. Cada sección tiene un contenedor ancho completo.

---

### 1. **HeaderBar**

- **Props:**
  - `searchQuery?: string` - Texto de búsqueda
  - `filters?: {Toda, Alojamientos, Viajeros}` - Tabs de filtrado
- **Contenido:** Barra superior con buscador y filtros
- **Layout:** Fila horizontal, posición sticky/fija
- **Relación:** Contenedor padre de toda la página

---

### 2. **SectionContainer**

- **Props:**
  - `title: string` - Título de sección (ej: "Disponibles el mes...")
  - `subtitle?: string` - Subtítulo opcional
  - `showMoreLink?: boolean` - Mostrar botón "Ver más"
  - `children: ReactNode` - Contenedor de cards
- **Layout:** Contenedor vertical
- **Repeats:** 8 veces en la página
- **Relación:** Componente padre que agrupa cada sección temática

---

### 3. **PropertyCard**

- **Props:**
  - `image: string` - Imagen de portada
  - `isFavorite?: boolean` - Indicador de favorito (corazón)
  - `title: string` - Nombre del alojamiento
  - `subtitle?: string` - Ubicación
  - `rating: number` - Puntuación (1-5)
  - `reviewCount: number` - Número de reviews
  - `price: number` - Precio por noche
  - `previousPrice?: number` - Precio anterior tachado
  - `badge?: string` - Etiqueta especial
- **Layout:** Card individual con imagen arriba, contenido abajo
- **Repeats:** 2 cards por sección (en grid)
- **Relación:** Componente hijo dentro de `SectionContainer`

---

### 4. **PropertyImage**

- **Props:**
  - `src: string` - URL de imagen
  - `alt: string` - Texto alternativo
  - `isFavorite: boolean` - Mostrar botón favorito
  - `onToggleFavorite: () => void` - Callback
- **Layout:** Elemento fill (ocupa ancho completo del card)
- **Relación:** Componente hijo del `PropertyCard`

---

### 5. **FavoriteButton**

- **Props:**
  - `isFavorite: boolean` - Estado
  - `onClick: () => void` - Callback
- **Layout:** Posicionado absolutamente en esquina superior derecha de PropertyImage
- **Relación:** Overlay sobre `PropertyImage`

---

### 6. **PropertyInfo**

- **Props:**
  - `title: string`
  - `location: string`
  - `rating: number`
  - `reviewCount: number`
  - `price: number`
  - `previousPrice?: number`
  - `badge?: string`
- **Layout:** Contenedor vertical, padding interno
- **Relación:** Componente hijo del `PropertyCard`

---

### 7. **RatingBadge**

- **Props:**
  - `rating: number` - Calificación
  - `reviewCount: number` - Número de opiniones
- **Layout:** Elemento inline, horizontal
- **Relación:** Componente hijo dentro de `PropertyInfo`

---

### 8. **FilterTabs** (en header)

- **Props:**
  - `options: string[]` - ["Toda", "Alojamientos", "Viajeros"]
  - `activeTab: string`
  - `onChange: (tab: string) => void`
- **Layout:** Tabs horizontales
- **Relación:** Componente hijo del `HeaderBar`

---

### 9. **FooterSection**

- **Props:**
  - `title: string` - Título de categoría
  - `links: string[]` - Lista de enlaces
  - `expanded?: boolean` - Estado expandido/colapsado
- **Layout:** Columnas verticales al pie
- **Repeats:** Múltiples columnas de categorías
- **Relación:** Componente dentro de `Footer`

---

### 10. **Footer**

- **Props:**
  - `sections: FooterSection[]` - Categorías y enlaces
  - `copyrightText: string`
- **Layout:** Grid de múltiples columnas responsivo
- **Relación:** Componente root al pie de página

---

### 🎨 Estructura de Layout General

```
Page (vertical flex)
├── HeaderBar (sticky)
│   └── FilterTabs
├── SectionContainer (repite 8x)
│   └── CardGrid (2 columnas)
│       ├── PropertyCard
│       │   ├── PropertyImage
│       │   │   └── FavoriteButton (absolute)
│       │   └── PropertyInfo
│       │       ├── Title
│       │       ├── Location
│       │       └── RatingBadge + Price
│       └── PropertyCard (...)
└── Footer
    └── FooterSection (múltiples columnas)
```

---

### 📱 Responsive Behavior

- **Desktop:** 2 cards por fila en cada sección
- **Tablet:** Posible cambio a 1 card por fila
- **Mobile:** 1 card por fila, full width
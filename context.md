# Contexto del Proyecto — Airbnb Clone (Agustín)

## Stack tecnológico

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Turbopack** (bundler por defecto)

---

## Organización de carpetas

La estructura del proyecto sigue una separación clara de responsabilidades:

| Carpeta | Propósito |
|---|---|
| **`/app`** | Únicamente rutas y layouts de Next.js (App Router). Cada subcarpeta representa una ruta. |
| **`/components`** | Componentes reutilizables de UI y lógica de presentación. Sin páginas ni layouts. |
| **`/types`** | Interfaces, tipos y definiciones compartidas de TypeScript (ej. `Listing`, `Host`, `SortOrder`). |

## Estructura de carpetas

```
app/
├── globals.css
├── layout.tsx              # Root layout (Header + main + Footer)
├── page.tsx                # Homepage (/)
├── catalog/
│   └── page.tsx            # Página de catálogo (/catalog)
└── rooms/
    └── [id]/
        └── page.tsx        # Página de detalle (/rooms/[id])

components/
├── index.ts                # Barrel exports
├── ui/
│   ├── index.ts
│   ├── Button.tsx
│   └── Input.tsx
├── layout/
│   ├── index.ts
│   ├── Header.tsx
│   └── Footer.tsx
└── (aquí irán los nuevos componentes listados abajo)
```

---

## Página de inicio (`/`)

### Navbar superior (Header — ya existe)

Componente existente en `components/layout/Header.tsx`.

Debe incluir:
- Logo ("airbnb" en rosa)
- Campo de búsqueda (`useState` para el texto ingresado)
- Iconos de menú de usuario (placeholder)

### Filtro de búsqueda en tiempo real

- El campo de búsqueda dentro del Header debe usar `useState` para almacenar el texto escrito por el usuario.
- El listado de tarjetas visibles se filtra en cada pulsación de tecla (real-time filtering).
- El listado de tarjetas debe estar en estado local.

### Filtro horizontal de categorías

- Debajo de la barra de navegación: fila horizontal con scroll de categorías (icono + label).
- Categorías: **Beach**, **Mansions**, **Trending**, **Cabins**, **City**, **Countryside**, **Lake**, **Castles**, **Amazing pools**, **Skiing**.
- Usar `useState` para almacenar la categoría activa.
- La categoría activa debe resaltarse visualmente.

### Cuadrícula de tarjetas de alojamiento

Cada tarjeta debe mostrar:
- Placeholder de foto (fondo de color con icono)
- Título
- Precio por noche
- Valoración con estrellas

### Carga simulada con `useEffect`

- Al montar la página, empezar con lista vacía.
- Estado `loading = true`.
- Usar `setTimeout` de ~1 segundo para simular la carga.
- Una vez completado, asignar los datos y poner `loading = false`.
- Mostrar un indicador de carga mientras `loading` sea `true`.

### Diseño responsive

- **Mobile (≥375px):** Una sola columna.
- **Desktop (≥768px):** Múltiples columnas (grid).

---

## Página de catálogo (`/catalog`)

### Cabecera de resultados

- Número de resultados encontrados.
- Control de ordenación (Ascendente / Descendente por precio).
- Usar `useState` para guardar el orden seleccionado.
- Reordenar las tarjetas visibles según el orden seleccionado.

### Reutilización de componente

- Reutilizar el mismo componente de tarjeta de alojamiento de la página de inicio.

### Área de mapa

- **Desktop (≥768px):** Mapa a la derecha de la lista de tarjetas.
- **Mobile:** Mapa debajo de las tarjetas.
- Placeholder visual: recuadro gris con el texto "Mapa".

---

## Página de detalle de habitación (`/rooms/[id]`)

### Carga de datos

- Usar `useEffect` para cargar los datos de la habitación al montar el componente.
- Obtener el `id` desde `params` (Next.js App Router — `{ params }: { params: { id: string } }`).
- Simular la carga con `setTimeout`.
- Mostrar estado de carga mientras los datos no están disponibles.

### Galería de fotos

- En la parte superior de la página.
- Usar `useState` para guardar el índice de la foto actualmente visible.
- Botones **Anterior** / **Siguiente** para navegar por un array de placeholders de fotos.

### Cabecera del alojamiento

- Título
- Valoración con estrellas
- Número de reseñas
- Ubicación

### Información del anfitrión

- Fila horizontal con:
  - Placeholder de avatar (círculo de color)
  - Nombre del anfitrión
  - Años como anfitrión

### Servicios (amenities)

- Cuadrícula de pares icono + etiqueta.
- Ejemplos: WiFi, Cocina, Lavadora, Aire acondicionado, Estacionamiento gratuito, TV, Secadora de pelo, Detector de humo.

### Tarjeta de reserva

- Precio por noche.
- Contador de huéspedes:
  - Usar `useState` para aumentar / reducir el número de huéspedes.
  - Rango: mínimo 1, máximo 16.

### Reto opcional (date picker)

- Solo si todos los demás requisitos están completos.
- Añadir campos funcionales de fecha de entrada / salida.
- Usar una librería de date picker.
- Calcular el precio total en función del número de noches.

---

## Navegación

- **Home → Detalle:** Al hacer clic en una tarjeta (Home o Catalog) navegar a `/rooms/[id]`.
- **Catalog → Detalle:** Mismo comportamiento.
- Usar `<Link>` de Next.js para toda la navegación entre páginas.
- Incluir un botón "Volver" o breadcrumb en la página de detalle que regrese a `/catalog`.

---

## Requisitos generales de componentes

| Regla | Descripción |
|---|---|
| Mobile-first | Punto de quiebre a 375px, desktop desde 768px. |
| Un archivo por componente | Cada componente vive en su propio archivo dentro de `/components`. |
| Límite de líneas | Ningún componente supera las 80 líneas de JSX + lógica. Si lo hace, dividirlo. |
| Sin clases | Todos los componentes son funciones `const` (fat-arrow functions). |

---

## Datos mock (ejemplo para la simulación)

### Listado de alojamientos (Home, Catalog)

```ts
interface Listing {
  id: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  location: string;
  reviews: number;
  host: {
    name: string;
    avatar: string;
    yearsHosting: number;
  };
  amenities: string[];
  photos: string[];
  maxGuests: number;
}
```

Ejemplo de datos:

```ts
const listings: Listing[] = [
  {
    id: "1",
    title: "Casa frente al mar con vistas espectaculares",
    price: 150,
    rating: 4.8,
    category: "Beach",
    image: "/placeholder.jpg",
    location: "Tulum, Quintana Roo",
    reviews: 124,
    host: { name: "María", avatar: "/avatar.jpg", yearsHosting: 3 },
    amenities: ["WiFi", "Cocina", "Lavadora", "Aire acondicionado"],
    photos: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
    maxGuests: 6,
  },
  {
    id: "2",
    title: "Mansión de lujo con piscina infinita",
    price: 450,
    rating: 4.9,
    category: "Mansions",
    image: "/placeholder.jpg",
    location: "Marbella, España",
    reviews: 89,
    host: { name: "Carlos", avatar: "/avatar.jpg", yearsHosting: 7 },
    amenities: ["WiFi", "Cocina", "TV", "Estacionamiento gratuito", "Aire acondicionado", "Piscina"],
    photos: ["/room1.jpg", "/room2.jpg", "/room3.jpg"],
    maxGuests: 12,
  },
  // ... más entradas cubriendo todas las categorías
];
```

---

## Tipos compartidos

Crear un archivo `types/index.ts` en la raíz con los tipos compartidos:

```ts
export interface Listing {
  id: string;
  title: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  location: string;
  reviews: number;
  host: Host;
  amenities: string[];
  photos: string[];
  maxGuests: number;
}

export interface Host {
  name: string;
  avatar: string;
  yearsHosting: number;
}

export type SortOrder = "asc" | "desc";
```

---

## Resumen de componentes a crear

| Componente | Carpeta | Propósito |
|---|---|---|
| `CategoryFilter` | `components/` | Fila horizontal de categorías + estado activo |
| `ListingCard` | `components/` | Tarjeta individual de alojamiento |
| `ListingGrid` | `components/` | Cuadrícula responsive de `ListingCard` |
| `SearchBar` | `components/` | Campo de búsqueda con filtrado en tiempo real |
| `CatalogHeader` | `components/` | N° resultados + ordenación (Catalog page) |
| `MapPlaceholder` | `components/` | Placeholder del mapa |
| `PhotoGallery` | `components/` | Galería con botones Anterior/Siguiente |
| `HostInfo` | `components/` | Info del anfitrión (avatar, nombre, años) |
| `AmenitiesGrid` | `components/` | Cuadrícula de servicios |
| `BookingCard` | `components/` | Tarjeta de reserva (precio + contador huéspedes) |
| `StarRating` | `components/` | Visualización de estrellas (reutilizable) |
| `LoadingSpinner` | `components/` | Indicador de carga |

<!--
## Análisis de componentes de las capturas de referencia

Los nombres y props siguientes se infieren visualmente de las capturas; no representan una implementación existente.

### Captura 1: Inicio y descubrimiento

Relación de layout: una columna móvil con secciones apiladas; carruseles horizontales de categorías, alojamientos y experiencias; navegación inferior fija.

HomePage
- AppDownloadBanner: appName, description, actionLabel, onDismiss
- HomeHeader: contiene SearchBar (placeholder, value, onChange)
- CategoryScroller: categories, activeCategory, onCategoryChange
- HomeFeed: contiene varias DiscoverySection (title, items, href, variant)
  - ExperienceCard: image, title, category
  - ListingCard: image, title, subtitle, priceLabel, rating, badge, isFavorite
- ServicesSection
- TravelInspiration: tabs, activeTab, destinations
- Footer
- BottomNavigation: items, activeItem

### Captura 2: Catálogo de alojamientos

Relación de layout: resumen de resultados seguido de una lista vertical de tarjetas; secciones de resultados relacionados debajo; acceso flotante al mapa y controles de búsqueda fijos en la parte inferior en móvil.

CatalogPage
- ResultsSummary: count, label
- ListingResultsList: contiene ListingCard[]
- ListingCard: image, title, rating, reviewCount, description, hostLabel, priceTotal, originalPrice, badge, cancellationLabel, photoCount, isFavorite
- SimilarDatesSection: title, listings (carrusel horizontal de ListingCard)
- ShowMoreButton
- HotelListingsSection: contiene ListingCard[]
- MapButton: label, onClick (flotante)
- SearchFilterBar: destination, dates, guestCount, onBack, onOpenFilters (fija abajo)

### Captura 3: Detalle del alojamiento

Relación de layout: barra superior de controles, galería a ancho completo y secciones de detalle en columna; barra de reserva fija al pie en móvil.

RoomDetailPage
- DetailTopBar: onBack, onShare, isFavorite, onToggleFavorite
- PhotoGallery: photos, activeIndex, onPrevious, onNext
- RoomSummary: title, location, rating, reviewCount, highlights
- HostSummary: name, avatar, hostYears, hostBadge
- DescriptionSection
- BedroomSection
- AmenitiesSection: amenities, visibleCount, onShowAll
- MapSection: location, description
- BookingCalendar: checkIn, checkOut, onDateChange
- ReviewsSection: rating, reviewCount, reviews
- HostProfile: name, avatar, responseRate, rating, hostYears
- HouseRules
- NearbyListings: listings (reutiliza ListingCard)
- Breadcrumbs
- BookingBar: price, total, dates, onReserve (fija abajo)

Componentes potencialmente compartidos entre pantallas: ListingCard, StarRating y FavoriteButton.
-->
# GoodFresh — Spec de diseño para migración a Flutter

Este documento describe el prototipo web actual de GoodFresh (Next.js/React/Tailwind) para que un equipo de desarrollo pueda reconstruirlo como app nativa en Flutter. **No es una traducción literal de código** — Flutter tiene su propio paradigma de widgets y manejo de estado — sino una referencia completa de diseño, contenido, flujos y reglas de negocio ya validadas contra Figma.

## 0. Contexto y alcance

- **Qué es esto:** un prototipo interactivo de alta fidelidad, sin backend real. Todo el estado (carro, dirección seleccionada, último pedido) vive en memoria (React Context) y se pierde al recargar la página.
- **Qué NO incluye:** autenticación, pagos reales, base de datos, notificaciones push, persistencia entre sesiones. Los montos de stock, "ahorro acumulado", horarios de entrega, etc. están simulados con datos fijos (ver sección 6).
- **Fuente de verdad de diseño:** archivo de Figma "Nuevos negocios" (file key `No0ugJttymp2LrbsboaGvW`). Cada pantalla del código tiene un comentario con el `node-id` exacto de Figma que se usó como referencia — vale la pena que el equipo de Flutter tenga acceso a ese archivo para confirmar valores exactos de spacing/color cuando algo no esté 100% claro acá.
- **Repositorio de referencia (Next.js):** `https://github.com/GabUXPD/goodFresh-discovery`
  - Rama `main` = **Versión 1**, desplegada en `https://goodfresh-discovery.vercel.app`
  - Rama `v2` = **Versión 2** (la más reciente, con más funcionalidad — recomendada como base para la migración a Flutter), desplegada en `https://goodfresh-discovery-v2.vercel.app`

## 1. Stack actual (solo como referencia — no aplica a Flutter)

| Aspecto | Detalle |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Estilos | Tailwind CSS v4, tokens definidos en `src/app/globals.css` |
| Estado global | React Context (`CartContext`), sin persistencia |
| Layout | Mobile-only, contenedor fijo `max-width: 430px` centrado, sin breakpoints de escritorio/tablet |
| Tipografía real de marca | **Axiforma** (definida en el design system de Figma), pero no está licenciada para web todavía. El prototipo usa **Outfit** (Google Font) como reemplazo visual temporal, mismo espíritu geométrico y rango de pesos. **Para Flutter, usar Axiforma si el equipo ya tiene la licencia/archivos de la fuente; si no, Outfit es el fallback más parecido.** |

## 2. Design tokens

### 2.1 Colores

Todos los valores están tomados de `src/app/globals.css` (que a su vez viene de la colección "Colors" de Figma).

**Marca (rosa) — color primario, botones/CTAs/links**
| Token | Hex |
|---|---|
| brand-1 (más claro) | `#fde7f4` |
| brand-2 | `#ffceea` |
| brand-3 | `#fdbce2` |
| brand-4 | `#fc6ec1` |
| brand / brand-5 (**primario**) | `#fa27a3` |
| brand-6 | `#e5078a` |
| brand-7 | `#ca0378` |
| brand-8 | `#9a005b` |
| brand-9 (más oscuro) | `#700042` |

> Nota: en algunas pantallas (`carro`) hay un rosa alternativo `#ff18a6` usado para precios/controles de cantidad — es una variación histórica del prototipo, no un token del design system. Evaluar con diseño si conviene unificar a `brand-5` en la versión Flutter.

**Neutros — superficies y texto secundario**
| Token | Hex |
|---|---|
| neutro-1 | `#fbfcff` |
| neutro-2 | `#fafafc` |
| neutro-3 | `#f8f9fb` |
| neutro-4 | `#eeeef5` |
| neutro-5 | `#e6e8f1` |
| neutro-6 | `#d3d5e2` |
| neutro-7 | `#babed2` |
| neutro-8 | `#7b7f98` |
| neutro-9 | `#495067` |

**Ink (Blue A/grey) — texto primario, escala oscura**
| Token | Hex |
|---|---|
| ink-1 | `#e4e7ec` |
| ink-2 | `#d0d5dd` |
| ink-3 | `#8590a0` |
| ink-4 | `#606a79` |
| ink-5 | `#3c444f` |
| ink-6 | `#38404a` |
| ink-7 | `#2d333b` |
| ink-8 | `#22262d` |
| ink-9 (texto principal) | `#1a1e23` |

**Rojo — errores / "sin stock"**
| Token | Hex |
|---|---|
| red-1 … red-9 | `#ffeded` → `#940000` (escala completa en `globals.css`) |
| Uso típico: fondo `red-1`/`#fff9e8`, texto `red-7` `#e51313` (pill "Sin stock") |

**Aqua / Verde — éxito, envío gratis, ahorro**
| Token | Hex |
|---|---|
| aqua-1 … aqua-9 | `#eefbf8` → `#268871` |
| green-1 … green-5 | `#ebfaf3` → `#36cf82` |
| Uso típico: pill "¡Ya tienes el envío gratis!" fondo `aqua-3` `#b6f2e4`; card "Ahorraste en esta compra" fondo `green-1` `#ebfaf3` |

**Ámbar — categorías/tags, estados de espera**
| Token | Hex |
|---|---|
| amber-1 … amber-9 | `#fff9e8` → `#e9b200` |
| Uso típico: banner "Comparando precios en supermercados" fondo `amber-1`, texto `#d57911` |

**Colores puntuales fuera de la paleta de tokens** (usados directo como hex en el código, no tienen variable):
- `#f4f0ed` — "Blanco Cálido" / beige, fondo de la pantalla "Compra exitosa" y de la card "Ahorro acumulado"
- `#232321` — texto oscuro en cards de ahorro y modal "Vaciar carro"

### 2.2 Tipografía

No hay una escala tipográfica formal documentada en Figma más allá de tamaños puntuales por componente. Tamaños de fuente observados en el código (todos en `px`, sin usar `rem`):

`8, 9, 10, 12, 14, 16, 18, 20, 28` px.

Pesos de Axiforma usados (mapear a los pesos equivalentes de la fuente que se use en Flutter):
- Regular (400)
- Medium (500)
- SemiBold (600)
- Bold (700)
- ExtraBold (800)
- Black (900)

No hay un componente `<Text>` reutilizable en el prototipo — cada pantalla define tamaño/peso/color inline. Para Flutter se recomienda crear un sistema de `TextStyle` nombrados (ej. `heading1`, `bodySmall`, `priceLarge`) a partir de los usos reales por pantalla (sección 5).

### 2.3 Radios, sombras y spacing

- Radio de tarjeta estándar: `16px` (token `--radius-card`)
- Pills/botones: `rounded-full` (radio total, cápsula)
- Bottom sheets (modales): esquinas superiores `24–75px` según pantalla (ver sección 5, varía por pantalla — no hay un valor único)
- Sombras (del design system, `GoodMeal-design-system.md`):

| Token | Definición CSS equivalente |
|---|---|
| `shadow-xs` | `drop-shadow(0px 1px 2px rgba(0,0,0,0.04))` |
| `shadow-s` | `drop-shadow(0px 1px 3px rgba(0,0,0,0.10))` + `drop-shadow(0px 1px 2px rgba(0,0,0,0.08))` |
| `shadow-m` | `drop-shadow(0px 4px 6px -1px rgba(0,0,0,0.10))` + `drop-shadow(0px 1px 3px -1px rgba(0,0,0,0.15))` |
| `shadow-x` | `drop-shadow(0px 10px 8px -3px rgba(0,0,0,0.04))` + `drop-shadow(0px 2px 3px -1px rgba(0,0,0,0.02))` |
| `shadow-xl` | `drop-shadow(0px 20px 25px -5px rgba(0,0,0,0.08))` + `drop-shadow(0px 0px 12px rgba(0,0,0,0.08))` |

- Spacing: se usa la escala por defecto de Tailwind (base 4px: 4, 8, 12, 16, 24, 32...), sin token custom.
- El layout completo vive dentro de un contenedor centrado de **ancho fijo 430px** (no responsive) — para Flutter esto equivale a diseñar para un solo tamaño de referencia (~mobile medium/large) sin layouts adaptativos de tablet/desktop.

## 3. Patrones globales reutilizables

Estos aparecen en múltiples pantallas y conviene modelarlos como widgets compartidos en Flutter:

1. **Header con flecha atrás:** botón circular (40×40) con ícono chevron-izquierda, título centrado, fondo blanco. A veces fijo/sticky arriba (`carro`, `caja-*`), a veces no (`confirmacion-compra`).
2. **Header flotante sobre foto (home/tienda):** botones circulares translúcidos (`bg-white/90`) que se vuelven fondo blanco sólido al hacer scroll más allá de la foto de portada (160px de alto).
3. **Barra inferior fija de acción:** contenedor blanco pegado al fondo con un botón principal (pill, `bg-brand`), usado para "Ver el carrito", "Continuar", "Pagar", "Agregar al carrito". Cuando el carrito está vacío, se reemplaza por un estado inactivo gris ("Aún no haces tu pedido").
4. **Bottom sheet / modal:** aparece desde abajo con una manija (barra oscura centrada, ~5px alto × 134px ancho), overlay oscuro semi-transparente (`black 40%`) detrás, animación de entrada/salida deslizante (~300ms). Usado en: selector de direcciones (`confirmacion-compra`), confirmación "Vaciar carro" (`carro`).
5. **Selector de cantidad (stepper):** círculo "–" / número / círculo "+", en dos variantes visuales según pantalla (bordes rosa con relleno blanco, o fondo blanco con borde gris).
6. **Selector de "Madurez"** (solo para paltas y plátanos): dos pills de opción ("Para hoy" / "2 - 3 días" o "Más verdes" / "Más amarillos"), aparece solo si el producto tiene esa configuración.
7. **Badge/contador del carrito:** círculo rosa pequeño superpuesto al ícono de carrito con la cantidad de productos distintos (no la suma de unidades).
8. **Pills de estado:** "Sin stock" (fondo amarillo pálido, texto rojo), "Envío gratis desde $40.000" (fondo `brand-1`, texto `brand`), "¡Ya tienes el envío gratis!" (fondo `aqua-3`, con emoji 🥳), "Temporada" (fondo `green-1`, texto `aqua-7`).
9. **Formato de precio:** siempre `$` + separador de miles chileno, sin decimales — equivalente a `NumberFormat.currency(locale: 'es_CL', symbol: '\$', decimalDigits: 0)` en Flutter (Dart `intl` package).

## 4. Datos (mock)

- **Catálogo de productos** (`src/data/catalog.ts`): ~75 productos con `id`, `name`, `unit` (ej. "1 kilo", "500 gr.", "1 unidad"), `price` (CLP, entero) e `image` (ruta local). Generado desde una planilla Excel real de precios ("Lista de precios GoodFresh.xlsx") — los precios son reales, no inventados.
- **Direcciones guardadas** (`src/data/addresses.ts`): 4 direcciones mock con emoji, etiqueta, dirección completa y flag `favorite`.
- **Productos "sin stock" simulados:** solo el id `naranjas`, y únicamente cuando se repite un pedido anterior (`isRepeatOrder`) — nunca en un carro recién armado.

## 5. Pantallas

Cada pantalla lista: ruta actual, propósito, elementos clave y estados especiales.

### 5.1 `/` — Tienda (home)
- Foto de portada (160px alto) con header flotante (flecha, notificaciones, carrito) encima.
- Nombre "GoodFresh" + pill "🌿 100% frescos" + logo circular.
- Frase "Directo de la vega a tu casa, **a precios convenientes** y de calidad" (barra rosa vertical a la izquierda).
- Card informativa: horario ("Lunes a sábado – envío: $2.400"), pill "Envío gratis desde $40.000", tiempo de entrega ("1 día hábil").
- Tabs de categoría: "Ver todos" / "Verduras" / "Frutas" / "Frutos secos" (sticky).
- Banner "Repite tu compra" (solo si hay un pedido anterior guardado).
- Sección "Arma tu pedido como quieras": carrusel horizontal de 3 cards de caja (Caja verduras, Caja frutas, Caja completa), cada una con foto, precio "Desde", cantidad de tipos de producto, cashback, botón "Armar".
- Sección "O elige producto a producto": buscador + grilla de productos (2 columnas), con botón "+" que agrega 1 unidad directo al carro (sin pasar por una pantalla de detalle).
- Barra inferior fija: "Ver el carrito (N) — $monto" o estado vacío.

### 5.2 `/caja-ensaladas`, `/caja-frutas`, `/caja-completa` — Armado de caja
Mismo patrón estructural para las 3 (contenido/productos incluidos difieren):
- Hero: dos fotos lado a lado (64%/36% del ancho).
- Título de la caja + descripción corta.
- **Productos incluidos:** lista editable en memoria local (no toca el carro global hasta confirmar) — cada uno con cantidad, precio, selector de madurez si aplica. Se puede dejar en cantidad 0 (no se elimina de la lista, solo se "apaga" visualmente).
- Buscador para agregar productos del catálogo completo a la caja.
- Sección "sugeridos": productos recomendados con scroll infinito (carga de a 4 más al acercarse al final).
- Barra inferior: precio total + cantidad de productos + botones "Seguir comprando" (vuelve a la tienda) y "Agregar al carrito" (confirma y navega a `/carro`).
- Al agregar al carrito: si el carro ya tenía productos de otro origen, se preservan; si eran de esta misma caja, se reemplazan.

### 5.3 `/carro` — Carro de compras
- Header fijo: flecha volver (vuelve a la caja activa o a "producto a producto" si no hay caja), título, banner de tienda.
- Link "Vaciar carro" (ícono carrito) arriba a la derecha del listado — abre modal de confirmación (bottom sheet: título, texto de confirmación, botón sólido "Vaciar Carro" + botón outline "Cancelar").
- Listado de productos: imagen, nombre, cantidad/unidad, precio, stepper. Productos deshabilitados (cantidad 0 o sin stock) se muestran atenuados.
- Selector de "Madurez" cuando aplica.
- **Estado vacío:** reemplaza todo el contenido bajo el header por: ícono de carrito grande (rosa), "No hay productos en el carro", texto de ayuda, centrado verticalmente. El botón volver en este estado siempre apunta a "producto a producto" (no a la última caja).
- Aviso de monto mínimo ($12.000) si el total no lo alcanza — bloquea "Continuar" y lo reemplaza por "Agregar productos".
- Aviso de envío gratis próximo (cuando el total está entre $35.000 y $40.000): barra de progreso + "Costo envío: $2.400" + "Dirección registrada" + ícono camión.
- Banner de comparación de precios: simula un spinner de "Comparando precios en supermercados" (2s), luego muestra precios estimados de Jumbo (+30%) y Líder (+24%) sobre el total, y el ahorro (contra el mayor de los dos).
- Total a pagar + pill "🥳 ¡Ya tienes el envío gratis!" (debajo del monto) o "Envío gratis desde $40.000" (junto al monto) según corresponda.
- Botón "Continuar" → `/confirmacion-compra`.

### 5.4 `/confirmacion-compra` — Método de pago
- Header simple (no fijo).
- Sección "Resumen" expandible/colapsable: cantidad de items + total, y al expandir el detalle línea por línea.
- "Método de entrega": card con dirección seleccionada, botón "Cambiar" (abre modal de direcciones), toggle de selección, tiempo estimado, pill de envío gratis/costo de envío.
- "Método de pago": fila fija mostrando una tarjeta mock ("***1299 - Débito") — sin flujo de selección real.
- "Usar mis GoodMeal Créditos": checkbox con monto disponible mock ($30.000), aplica como descuento si se activa.
- Campo de cupón/giftcard (input de texto, sin validación real).
- Resumen de precios: monto total, cupón de descuento, créditos aplicados, envío, total final.
- Botón fijo inferior "Pagar" → `/resumen-compra`.
- **Modal de direcciones** (bottom sheet): buscador, "usar mi ubicación actual", lista de direcciones guardadas con badge de favorito, selección con radio button.

### 5.5 `/resumen-compra` — Procesando compra
- Pantalla de tránsito automático: muestra resumen (tienda, delivery, productos comprados) con checks verdes, spinner "Estamos procesando tu compra".
- **Redirige automáticamente a `/compra-exitosa` después de 3 segundos** (sin acción del usuario). Incluye link "Cancelar compra" (sin funcionalidad real más allá de estar presente).

### 5.6 `/compra-exitosa` — Compra exitosa
- Fondo superior beige (`#f4f0ed`) con título "¡Gracias por tu compra!" e ilustración de repartidor en scooter.
- Sección inferior blanca (esquinas superiores redondeadas ~75px), separada de la ilustración por 16px, que contiene:
  - "¡Tu pedido se está armando! Te llegará mañana entre las 10:30 a 15:30".
  - Dos cards lado a lado: **"Ahorraste en esta compra"** (monto calculado igual que en `/carro`, comparando contra supermercados) y **"Ahorro acumulado"** (base fija simulada $118.450 + el ahorro de esta compra — no hay historial real de compras).
  - Botón "Recomienda GoodFresh a tus amigos", link "Ir a mi orden", botón "Seguir comprando" (vacía el carro y vuelve a la tienda).

### 5.7 `/mi-orden` — Detalle de la orden activa
- Header con flecha volver (vacía el carro y vuelve a la tienda).
- Card "Detalle de la orden": badge "Por Despachar", fecha de compra/entrega, ventana de delivery, número de orden (aleatorio), listado de productos del último pedido, desglose de delivery + monto total, link "Cancelar mi pedido".
- Card "Devuelve la caja": ilustración + texto "Devuelve la caja en tu próximo pedido: al repartidor o déjala en conserjería."
- Link "Ayuda con mi pedido activo".

## 6. Reglas de negocio (constantes a preservar)

| Constante | Valor | Dónde se usa |
|---|---|---|
| Costo de envío | $2.400 | Carro, confirmación, resumen, mi orden |
| Umbral de envío gratis | $40.000 | Todas las pantallas de carro/checkout |
| Umbral "por acercarse a envío gratis" | $35.000 | Aviso de progreso en el carro |
| Monto mínimo de compra | $12.000 | Carro (bloquea checkout si no se alcanza) |
| Cargo de servicio | $140 | Confirmación de compra, resumen |
| Créditos GoodMeal disponibles (mock) | $30.000 | Confirmación de compra |
| Markup comparativo Jumbo | +30% sobre el total | Carro, compra exitosa |
| Markup comparativo Líder | +24% sobre el total | Carro, compra exitosa |
| Base de "ahorro acumulado" (mock) | $118.450 | Compra exitosa |
| Delay de "procesando compra" | 3000ms | Resumen de compra (redirección automática) |
| Delay de "comparando precios" | 2000ms | Carro (spinner) |

## 7. Assets

- `public/images/` contiene 88 archivos: fotos de producto (catálogo), fotos de portada/hero, íconos ilustrados exportados como PNG flatten desde Figma (ej. ilustración de repartidor, íconos de las cards de ahorro, ilustración "devuelve la caja").
- Los íconos de línea (chevrons, carrito, más/menos, etc.) están como componentes SVG inline en `src/components/icons.tsx` — no son archivos de imagen. Para Flutter, lo más directo es recrearlos como `CustomPainter`/`Icon` a partir del path SVG, o exportarlos como assets `.svg` con `flutter_svg`.
- Recomendación: para los PNG flatten (ilustraciones complejas), volver a exportarlos directo desde Figma en las resoluciones que Flutter necesite (1x/2x/3x) en vez de reusar los PNG de este repo, que fueron exportados a un tamaño fijo para web.

## 8. Notas para la arquitectura en Flutter (sugerencias, no prescriptivo)

- El equivalente de `CartContext` (estado de carro, dirección seleccionada, caja activa, último pedido) puede resolverse con el gestor de estado que el equipo prefiera (Provider, Riverpod, Bloc) — la forma de los datos (`CartItem`, lista de items, total derivado) ya está definida en la sección 4 y en `src/context/CartContext.tsx`.
- No hay lógica de red/API que portar — todo el "backend" son arrays en memoria (`catalog.ts`, `addresses.ts`). El equipo de Flutter deberá decidir si esto se conecta a un backend real o se mantiene mock por ahora.
- Los 3 flujos de "armado de caja" (`caja-ensaladas`, `caja-frutas`, `caja-completa`) comparten ~95% de su estructura — buen candidato a una sola pantalla parametrizable en vez de 3 pantallas separadas.
- Las animaciones son simples y estándar (slide-up/down de bottom sheets ~300ms, transición de página lateral entre pantallas) — no requieren librerías de animación complejas, `AnimatedContainer`/`showModalBottomSheet` cubren los casos.

---
*Generado a partir del código y diseño de la rama `v2` del repositorio Next.js. Ante cualquier ambigüedad de valores exactos (spacing, color, tipografía), la fuente de verdad final es el archivo de Figma "Nuevos negocios" (`No0ugJttymp2LrbsboaGvW`).*

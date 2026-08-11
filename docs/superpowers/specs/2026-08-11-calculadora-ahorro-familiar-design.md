# Calculadora de ahorro familiar — Home de GoodMeal + Modal

**Fecha:** 2026-08-11
**Estado:** Aprobado, pendiente de plan de implementación

## 1. Contexto y objetivo

Para promover la nueva tienda GoodFresh dentro de GoodMeal, se agrega un modal con una calculadora de ahorro familiar. El usuario ingresa (1) cuántas personas viven en su hogar y (2) cuánto gasta al mes en frutas y verduras, y la calculadora muestra cuánto ahorraría comprando en GoodFresh en vez de en el supermercado, mensual y anualmente. Un botón final lleva al usuario a la tienda GoodFresh.

**Fuente de diseño:** Figma "Nuevos negocios" (file key `No0ugJttymp2LrbsboaGvW`):
- Nodo `1026:5338` — estado inicial del modal (formulario vacío).
- Nodo `1026:6559` — formulario con datos ingresados (4 personas, $100.000/mes).
- Nodo `1028:8654` — estado de resultado, confirmado en Figma: se agrega como una **segunda card debajo de la card del formulario** (el formulario no se oculta ni se reemplaza; el usuario puede seguir ajustando sus datos y volver a calcular).

**Restricción de alcance descubierta:** este repo no tiene implementado el home de GoodMeal (buscador, categorías, marcas populares, restaurantes) que aparece en el Figma como punto de entrada al modal — solo tiene la tienda GoodFresh. Se construye un home mínimo como parte de este trabajo.

## 2. Arquitectura de rutas

- **`/`** (nueva) — Home de GoodMeal, versión mínima.
- **`/tienda-goodfresh`** (nueva) — contenido íntegro de la actual `src/app/page.tsx` (tienda GoodFresh), sin cambios de contenido, solo de ruta.
- Se actualizan las siguientes referencias internas que hoy apuntan a `"/"` para que apunten a `"/tienda-goodfresh"` (deben volver a la tienda, no al home de GoodMeal):
  - `src/app/caja-completa/page.tsx` (flecha volver, líneas ~160 y ~383)
  - `src/app/caja-ensaladas/page.tsx` (flecha volver, líneas ~142 y ~365)
  - `src/app/caja-frutas/page.tsx` (flecha volver, líneas ~147 y ~370)
  - `src/app/compra-exitosa/page.tsx` (`handleSeguirComprando`, línea ~42)
  - `src/app/mi-orden/page.tsx` (línea ~45)

## 3. Home de GoodMeal (mínimo)

Nueva página `src/app/page.tsx` (home). Contenido:

- Pill de dirección: "🏠 Casa · Av. Los Leones 50" (estático, no funcional).
- Buscador "¿Qué quieres comer?" (decorativo, no funcional).
- Fila de categorías (scroll horizontal si no caben):
  - **GoodFresh** — ícono + badge "Nuevo" (rosa). Al tocar, abre el modal de la calculadora. Es el único ítem funcional.
  - Antojos y Snacks, Almuerzos, Panadería, Pizzas — íconos estáticos, no clicables (solo para completar la fila visualmente, igual que en el Figma).
- Tab bar inferior: Home (activo), Tiendas, Órdenes, Perfil — todos decorativos salvo Home.

No se incluyen "Marcas populares" ni "Lo más rescatado en tu zona" (fuera de alcance, no aportan a esta tarea y no hay assets para las cards de restaurantes).

## 4. Modal — estado de entrada de datos

Componente nuevo, ej. `src/components/SavingsCalculatorModal.tsx`, montado desde el home con estado local (`open`/`closed`). Reutiliza el patrón de modal bottom-sheet ya existente en `carro/page.tsx` y `confirmacion-compra/page.tsx`: contenedor `fixed inset-0`, backdrop `bg-black/40` que cierra al tocar, animación `sheet-slide-up` / `sheet-slide-down` (keyframes ya definidos en `globals.css`). A diferencia de esos modales, este no lleva el handle bar superior — usa un botón X circular flotante sobre la imagen, igual al Figma.

Estructura (de arriba hacia abajo):

1. **Imagen** de frutas/verduras — reutiliza `/images/portadaTienda.png`. Botón X circular blanco flotante (esquina superior derecha, sobre la imagen) usando `CloseIcon` existente, cierra el modal.
2. **Franja verde clara** con:
   - Título: "Ahorra en tu compra de frutas y verduras" (bold, texto oscuro).
   - Línea: 🍃 (`LeafIcon`, verde) + "100% frescos" (verde, bold) + "a precios convenientes" (oscuro).
3. **Card blanca** con:
   - Título: "Calcula tu ahorro en 2 pasos".
   - **Paso 1:** "¿Cuántos son en tu hogar?" — 6 pills seleccionables: 1, 2, 3, 4, 5, 6+. Selección única. Sin valor premarcado. Estado seleccionado: borde y texto `brand` (rosa), fondo `brand-1` (consistente con "controles seleccionables usan pink/brand-05" del design system).
   - **Paso 2:** "¿Cuánto gastas al mes en frutas y verduras?" — input numérico con prefijo `$`, placeholder "15.000", formateado con separador de miles (`Intl.NumberFormat("es-CL")`, mismo helper que usa `compra-exitosa`). Helper text debajo: "Ingresa el monto aproximado".
   - Botón "Calcular mi ahorro" (rosa, full width, `rounded-full`). **Deshabilitado** hasta que haya una selección de personas Y un monto > 0.

## 5. Modal — estado de resultado

Confirmado contra el nodo de Figma `1028:8654`: al tocar "Calcular mi ahorro" con ambos campos completos, **se agrega una segunda card verde debajo de la card blanca del formulario** (el formulario sigue visible y editable — no hay transición ni se oculta nada). Si el usuario cambia los datos y vuelve a tocar "Calcular mi ahorro", la card de resultado se actualiza con los nuevos valores.

Contenido de la card de resultado (fondo verde, `rounded-xl`, sigue el lenguaje visual de las cards de ahorro de `compra-exitosa`):

- Header: logo/ícono circular de GoodFresh + texto "Con GoodFresh, te podrías ahorrar".
- Cifra destacada: **ahorro anual** en grande y bold (ej. "$216.000 al año").
- Fila con dos columnas:
  - "Ahorro mensual" + monto (ahorro mensual, ver sección 6).
  - "Integrantes" + cantidad de personas seleccionada en el paso 1 (si "6+", se muestra "6+").
- Botón final **"Empieza ahorrar hoy"** (fondo blanco, texto verde, full width, como en el Figma) → cierra el modal y navega a `/tienda-goodfresh`.

No se necesita botón de "volver" separado: como el formulario permanece visible arriba, el usuario simplemente edita y vuelve a calcular.

## 6. Lógica de cálculo

Reutiliza exactamente la comparación ya implementada en `src/app/compra-exitosa/page.tsx`:

```
JUMBO_MARKUP = 0.30
LIDER_MARKUP = 0.24

jumboPrice  = montoIngresado * (1 + JUMBO_MARKUP)
liderPrice  = montoIngresado * (1 + LIDER_MARKUP)
ahorroMensual = max(jumboPrice, liderPrice) - montoIngresado
ahorroAnual   = ahorroMensual * 12
```

Esto mantiene el mismo mensaje de "ahorro vs. supermercado" usado en el resto de la app. La cantidad de personas del hogar **no participa en el cálculo numérico** — el monto mensual ya declarado por el usuario es la base completa del cálculo. La cantidad de personas solo personaliza el dato "Integrantes" en la card de resultado.

**Nota:** el único ejemplo numérico visible en Figma (nodo `1028:8654`: $100.000/mes → ahorro mensual $18.000) implica un 18% flat, no el 30%/24% de esta fórmula. Decisión explícita del usuario: priorizar consistencia con `compra-exitosa` sobre calzar exacto con el número de ejemplo del mockup.

## 7. Fuera de alcance

- Persistencia del resultado o del estado del modal entre sesiones (no hay backend; todo vive en memoria, igual que el resto del prototipo).
- Cualquier funcionalidad real en el buscador, "Marcas populares", tab bar (salvo Home) o categorías que no sean GoodFresh.
- Migración a Flutter — este documento puede servir de referencia para `docs/flutter-migration-spec.md` más adelante, pero eso no es parte de este trabajo.

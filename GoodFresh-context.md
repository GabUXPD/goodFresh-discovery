# GoodFresh — Contexto de proyecto para prototipo

---

## 1. El desafío

GoodFresh es una nueva tienda dentro de la app GoodMeal que vende frutas, verduras y frutos secos de temporada, de alta calidad, con despacho a domicilio a precios similares al supermercado Jumbo. A diferencia del modelo principal de GoodMeal —excedentes en formato pack sorpresa con 50% de descuento— GoodFresh es una compra planificada, a precio de mercado y con selección libre. El usuario objetivo (ICP) es una mujer profesional de 30–55 años con familia, que prioriza el ahorro de tiempo y la confiabilidad por encima del precio. El problema central es doble: los usuarios asocian GoodMeal con descuentos y excedentes, lo que genera una ruptura de expectativa al llegar a GoodFresh; y la tienda arranca sin historial de pedidos, sin reviews y sin reconocimiento propio, por lo que debe generar confianza y orientación desde cero.

---

## 2. Dirección conceptual

**Concepto:** GoodFresh es la frutería de confianza que no tienes que visitar.

La propuesta no compite con el supermercado en precio: compite en tiempo, calidad y simplicidad. El usuario no llega a explorar un catálogo — llega a completar su abastecimiento semanal en el menor número de decisiones posible. Todo el diseño sirve a ese objetivo: reducir fricción, no agregar opciones.

**Diferenciadores de diseño:**
- Origen visible (Vega Central) como señal de frescura, no como marketing
- Cajas por ocasión de consumo como puerta de entrada al catálogo
- Personalización total dentro de cada caja, con precio mínimo fijo como única restricción
- Cashback en créditos GoodMeal como puente entre el modelo conocido y el nuevo

---

## 3. Flujo de usuario principal

```
Entrada a GoodFresh (desde home de GoodMeal)
    │
    ▼
Pantalla tienda — tab "Ver todos" [pantalla principal]
    │
    ├── Sección superior: "Arma tu pedido por ocasión"
    │       Scroll horizontal de cards de cajas (Caja Semana, Colación niños,
    │       Para picar y compartir, Ensaladas express, Jugos de verano…)
    │
    ├── Divisor: "O elige producto a producto"
    │
    └── Grid de productos individuales (3 columnas)
            │
            ▼
[Usuario elige una caja]
    │
    ▼
Editor de caja
    ├── Header: nombre de caja + badge "Mínimo $X.XXX"
    ├── Lista de productos incluidos (cantidad ajustable con +/−, cualquier producto
    │   puede llegar a 0 — no hay productos bloqueados)
    ├── Sección "¿Quieres agregar algo más?" con productos opcionales del catálogo
    ├── Aviso de mínimo (visible cuando el total cae bajo el umbral)
    └── Footer sticky:
            · Total en tiempo real (rojo si bajo el mínimo)
            · Barra de progreso hacia el mínimo
            · "Faltan $X para el mínimo" (visible solo cuando aplica)
            · Botón "Agregar al carro" (bloqueado si bajo el mínimo)
                │
                ▼
            Carrito → Checkout → Confirmación de pedido
```

**Tabs de categoría** (Verduras / Frutas / Frutos secos): muestran solo grid de productos individuales, sin cajas. Las cajas son exclusivas de "Ver todos".

---

## 4. Decisiones de diseño clave

| Decisión | Razón |
|---|---|
| Cajas solo en "Ver todos", no en pestañas de categoría | Las pestañas son para búsqueda específica; las cajas son para orientación. Mezclarlas genera ruido en ambos contextos. |
| Cards de caja en scroll horizontal sobre el grid | Ocupa una sola fila, deja visible el catálogo debajo, no interrumpe el flujo del usuario con intención específica. |
| Divisor "O elige producto a producto" | Separa explícitamente las dos intenciones de compra sin agregar tabs ni secciones extra. |
| Precio mínimo fijo por caja, no por composición | Simplifica la lógica para el usuario: el compromiso es de gasto, no de productos. Cualquier combinación que sume el mínimo es válida. |
| Aviso de mínimo en contexto (no al confirmar) | El descubrimiento tardío de restricciones es la principal causa de abandono de carrito en grocery UX. El aviso aparece en el momento en que el total cae, no al intentar cerrar la compra. |
| Sin reviews en el arranque | Cero reviews se lee como "nadie ha comprado esto". Se reemplaza con señales de origen, temporada y comportamiento agregado ("Lo más pedido esta semana"). |
| Sin búsqueda/filtros persistentes en el catálogo | Con menos de ~15 productos visibles por tab, la barra de búsqueda empuja productos sin agregar valor. La búsqueda se activa bajo demanda desde el header. |
| Cashback en créditos GoodMeal visible en cada producto | Conecta GoodFresh con el beneficio conocido de GoodMeal y reduce el riesgo percibido de la primera compra. |
| Precio por kg junto al precio total en cada card | El usuario no tiene referencia clara para "$1.990 el brócoli", pero sí para "$3.980/kg". El precio unitario hace el trabajo de comparación con el supermercado. |

---

## 5. Estrategia de arranque en frío

GoodFresh empieza sin historial de pedidos, sin reviews y sin reconocimiento propio. Las tres estrategias activas:

**a) Las cajas como herramienta de orientación inmediata**
Un usuario nuevo puede completar su primer pedido en 3 toques sin conocer el catálogo: entra a una caja, ajusta lo que necesita, agrega al carro. La caja sustituye el historial personal que todavía no existe.

**b) Señales de comunidad implícita en lugar de reviews**
Badges como "Lo más pedido esta semana" o "+10 personas mirando" se generan desde el comportamiento agregado de compras reales. No requieren volumen de reviews. Regla crítica: solo mostrar estos números si son verídicos — un contador inflado destruye confianza de forma irreversible.

**c) Transferencia de confianza desde GoodMeal, con separación clara del modelo**
GoodFresh hereda la credibilidad de GoodMeal (3M descargas, top 3 apps Chile 2023) pero debe dejar claro desde el primer momento que el modelo es distinto. Copy de referencia: *"No es un pack sorpresa. Tú eliges. 100% frescos, a precio justo."* Sin esta distinción explícita, el usuario llega con expectativa de descuento y abandona al ver precios de mercado.

---

## 6. Restricciones y antipatrones a evitar

**Terminología:** Los conjuntos curados por ocasión se llaman **cajas**, no packs. Es la nomenclatura oficial del proyecto.

**No hacer:**
- Mostrar secciones de reviews vacías — peor que no tener reviews
- Implementar features sociales que requieran red de amigos — GoodFresh no tiene red propia
- Añadir mecánicas de streaks o rachas semanales — generan ansiedad en compras que son recurrentes por necesidad
- Colocar cajas dentro de las pestañas de categoría — generan ruido y duplicidad
- Revelar el precio mínimo de la caja solo al momento de confirmar la compra
- Usar búsqueda/filtros persistentes en el catálogo con el volumen actual de productos
- Mostrar el precio de un producto sin su referencia por kg o por unidad base
- Bloquear productos dentro del editor de caja — cualquier producto puede reducirse a 0

**Visual y componentes:**
- Tipografía: Axiforma (fuente nativa de GoodMeal/GoodFresh)
- Colores principales: rosa GoodMeal `#fa27a3`, verde GoodFresh `#22b573`, oscuro `#1a1e23`
- Cards de producto: imagen cuadrada, badge de unidades (rosa, esquina superior izquierda), botón `+` (negro, esquina superior derecha), precio, badge cashback (amarillo `#ffd755`), nombre
- Convenciones iOS: tab bar inferior, back arrow superior izquierda, modales desde abajo con handle, área mínima de toque 44pt

**Archivos de referencia en el proyecto:**
- `GoodFresh_UX_Reference.md` — patrones UX completos, señales de confianza, antipatrones
- `Inventario_GoodFresh.xlsx` — 111 productos en 3 categorías (Verduras 48, Frutas 23, Frutos secos 36)
- Figma: `No0ugJttymp2LrbsboaGvW` nodo `294-3123` — diseño de referencia de la tienda

** URL del prototipo:**
https://goodfresh-discovery.vercel.app/

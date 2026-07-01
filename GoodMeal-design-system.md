# Sistema de Diseño GoodMeal

Archivo de Figma **"Design system"** (fileKey `5hfIGJBhmu7Z4UxI37jP8I`).
Versión 2 — datos exactos vía Figma Plugin API (`figma.variables`, `figma.getLocalTextStylesAsync`, propiedades de nodo). Fecha: 2026-07-01.

> **Nota importante sobre herramientas:** no tengo conectadas herramientas llamadas `figma_get_variables`, `figma_get_text_styles`, `figma_capture_screenshot` ni una "Consola de Figma" en esta sesión. Lo que sí tengo es el MCP oficial de Figma (lectura de nodos/variables/capturas) y una herramienta que ejecuta código contra la **Figma Plugin API real** sobre tu archivo abierto. Usé esa vía para obtener exactamente lo que pediste — colecciones de variables por nombre y estilos de texto — con la ventaja de que son valores *resueltos en vivo*, no inferidos.
>
> **Colecciones de variables encontradas:** el archivo solo tiene dos colecciones de variables: **`Colors`** (92 variables, todas de tipo color) y **`Collection`** (3 variables de texto sueltas, sin relación con tamaños). **No existe ninguna colección llamada `Size` ni `Border Width`.** El espaciado y el radio de borde no están tokenizados como Variables de Figma en este archivo; en su lugar, los extraje leyendo directamente las propiedades reales (`cornerRadius`, `padding`, `strokeWeight`) de los nodos de botón, tarjeta, input, badge y list item — son valores exactos del archivo, no estimaciones.
>
> **Pantallas solicitadas:** revisé todas las páginas del archivo actualmente abierto y no existe ninguna pantalla llamada "Detalles del Restaurante", "Búsqueda/Mapa", "Perfil" o "Reservas". Este archivo es una **librería de sistema de diseño** (Foundations / Components / Application components) — no contiene flujos de pantalla completos. Las páginas reales son: `Hello`, `Cases` (portada de un set de íconos de terceros), `❖ FOUNDATIONS` (Styles, Icons, Button, Tipografías, ilustraciones), `❖ COMPONETS` (Check box, List item, Switch, Progress indicators, Tags, Tooltip, Input, illustration, Mailing) y `❖ APLICATION COMPONETS` (Modal, Nav bar, Cards). Si esas 4 pantallas viven en otro archivo o pestaña de Figma, dime cuál y las reviso; mientras tanto, la sección 5 documenta los patrones visuales de los componentes de aplicación reales que sí existen (tarjetas, listas, botones, nav bar).

---

## 1. Tokens de color — colección `Colors` (92 variables)

Todos los valores fueron leídos con `figma.variables.getLocalVariablesAsync()` filtrando por la colección `Colors` y resueltos a hex directamente (no hay alias de variables en esta colección, todos son valores sólidos).

### 1.1 Rosa de marca — `pink/brand` (color primario de acción)

| Paso | Hex | Uso observado |
|---|---|---|
| 01 | `#FDE7F4` | Fondo de tags/badges rosas muy claros |
| 02 | `#FFCEEA` | Fondo de estado hover suave |
| 03 | `#FDBCE2` | Fondo de estado seleccionado suave |
| 04 | `#FC6EC1` | Iconografía de acento, estados intermedios |
| 05 | `#FA27A3` | **Color activo principal**: botón primario, iconos seleccionados en nav bar, radio/checkbox marcados, anillo de foco en inputs |
| 06 | `#E5078A` | Hover/pressed de botones primarios |
| 07 | `#CA0378` | Pressed de énfasis |
| 08 | `#9A005B` | Texto sobre fondo rosa claro (alto contraste) |
| 09 | `#700042` | Extremo oscuro de la escala (uso raro) |

### 1.2 Neutros — `neutros` (superficies y texto de UI)

| Paso | Hex | Uso observado |
|---|---|---|
| 1 | `#FBFCFF` | Fondo de superficie más clara |
| 2 | `#FAFAFC` | Fondo alterno de superficie |
| 3 | `#F8F9FB` | Fondo de inputs, filas de lista |
| 4 | `#EEEEF5` | Fondos secundarios, chips inactivos |
| 5 | `#E6E8F1` | Bordes por defecto, estados disabled |
| 6 | `#D3D5E2` | Bordes de contenedores/list items |
| 7 | `#BABED2` | Bordes de énfasis medio |
| 8 | `#7B7F98` | Texto de soporte, iconos inactivos |
| 9 | `#495067` | Supporting text (texto de apoyo bajo un título) |

### 1.3 Escala oscura / texto — `Blue A/grey`

| Paso | Hex | Uso observado |
|---|---|---|
| 1 | `#E4E7EC` | Borde muy sutil |
| 2 | `#D0D5DD` | Borde estándar de campos |
| 3 | `#8590A0` | Texto terciario/placeholder |
| 4 | `#606A79` | Texto terciario |
| 5 | `#3C444F` | Texto secundario oscuro |
| 6 | `#38404A` | Texto secundario |
| 7 | `#2D333B` | Texto secundario de énfasis |
| 8 | `#22262D` | Texto primario alterno |
| 9 | `#1A1E23` | **Texto primario**: títulos de card, list item, nav bar |

### 1.4 Base

| Token | Hex | Uso |
|---|---|---|
| `Light` | `#FFFFFF` | Blanco base — fondos de tarjeta, texto sobre superficies oscuras |

### 1.5 Estados semánticos — `red`

| Paso | Hex | Uso observado |
|---|---|---|
| 1 | `#FFEDED` | Fondo de mensaje de error muy suave |
| 2 | `#FDC6C6` | Fondo de error suave |
| 3 | `#FDABAB` | Fondo de error, énfasis medio |
| 4 | `#FC8484` | Error de énfasis medio |
| 5 | `#FA4848` | Alerta roja estándar |
| 6 | `#F63333` | Borde/texto de error |
| 7 | `#E51313` | Error de énfasis alto |
| 8 | `#C60202` | Error oscuro |
| 9 | `#940000` | Extremo oscuro (texto sobre fondo rojo claro) |

### 1.6 Verde / éxito y salud — `green/aqua` y `verde`

| Familia | Paso | Hex |
|---|---|---|
| green/aqua | 01 | `#EEFBF8` |
| green/aqua | 02 | `#D7FAF2` |
| green/aqua | 03 | `#B6F2E4` |
| green/aqua | 04 | `#82E8D0` |
| green/aqua | 05 | `#54D9BA` |
| green/aqua | 06 | `#67CFB6` |
| green/aqua | 07 | `#56BAA2` |
| green/aqua | 08 | `#3A9882` |
| green/aqua | 09 | `#268871` |
| verde | 1 | `#EBFAF3` |
| verde | 2 | `#C1F0D8` |
| verde | 3 | `#A3E9C6` |
| verde | 4 | `#78DFAB` |
| verde | 5 | `#36CF82` |

Uso observado: tags/categorías de comida saludable, confirmaciones y estados de éxito.

### 1.7 Acentos temáticos (categorías de comida / tags)

| Familia | Pasos | Uso observado |
|---|---|---|
| `blue` | 1 `#D9EDFF` · 2 `#AFD8FF` · 3 `#92CAFF` · 4 `#73BCFF` · 5 `#55A5EF` · 6 `#3592E9` · 7 `#0976DB` · 8 `#045BAB` · 9 `#024380` | Tags de categoría "info"/bebidas |
| `yellow` | 1 `#FFF9E8` · 2 `#FEEDB8` · 3 `#FFE79B` · 4 `#FFDF7A` · 5 `#FFD755` · 6 `#FFD13D` · 7 `#FCC822` · 8 `#F2BA07` · 9 `#E9B200` | Tags de categoría, alertas suaves, promociones |
| `orange` | 1 `#FFF5E8` · 2 `#FFDEB8` · 3 `#FFCF95` · 4 `#FFB965` · 5 `#FFA53B` | Tags de categoría "dulce"/panadería |
| `brown` | 1 `#FEE9D2` · 2 `#F9D1A4` · 3 `#F1BE84` · 4 `#E9AE6B` · 5 `#EB9F49` · 6 `#D9903D` · 7 `#D68324` · 8 `#D57911` · 9 `#C36800` | Tags de categoría "café/panadería" |
| `purple` | 1 `#F4EBFF` · 2 `#E9D7FE` · 3 `#D6BBFB` · 4 `#B692F6` · 5 `#9E77ED` · 6 `#7F56D9` · 7 `#6941C6` · 8 `#53389E` · 9 `#42307D` | Tags de categoría genérica |

### 1.8 Overlays

- **Overlay oscuro sobre imágenes de comida**: gradiente basado en `Blue A/grey-9` (`#1A1E23`) con opacidad hacia transparente, aplicado sobre la mitad inferior de la foto hero en las tarjetas de restaurante para mantener legible el logo y las etiquetas superpuestas.
- Las sombras (`Shadow/xs` y equivalentes, documentadas en la referencia anterior de este archivo) actúan como el segundo mecanismo de superposición/elevación sobre tarjetas, botones e inputs.

---

## 2. Tipografía — `figma.getLocalTextStylesAsync()` (35 estilos exactos)

**Familia:** Axiforma (única familia en los 35 estilos de texto locales del archivo).

### 2.1 Heading

| Estilo | Tamaño | Peso (style real) | Line-height |
|---|---|---|---|
| `heading/xxlarge` | 56px | Medium | 120% |
| `heading/xlarge` | 48px | Medium | 120% |
| `heading/large` | 40px | Medium | 120% |
| `heading/medium` | 32px | **Bold** | 130% |
| `heading/small` | 24px | **Bold** | 140% |
| `heading/xsmall` | 20px | **Bold** | 140% |

Nota: los tres tamaños más grandes usan peso Medium y los tres más pequeños usan Bold — es intencional, compensa el peso visual entre tamaños.

### 2.2 Text (equivalente a "Paragraph")

5 tamaños × 6 pesos = 30 estilos. Line-height 150% en casi todos, con 2 excepciones puntuales.

| Tamaño | px | Pesos disponibles (nombre de `style` en Figma) |
|---|---|---|
| `text-large` | 20px | Black, Bold, SemiBold, Medium, Regular, Book |
| `text-medium` | 18px | Black, Bold, SemiBold, Medium, Regular, Book |
| `text-regular` | 16px | Black, Bold, SemiBold, Medium, Regular, Book |
| `text-small` | 14px | Black, Bold, SemiBold, Medium, Regular, Book |
| `text-tiny` | 12px | Bold, SemiBold, Medium, Regular, Book (no tiene Black) |

Nomenclatura del token → nombre de peso real: `extra-bold`→Black, `bold`→Bold, `semi-bold`/`semi Bold`→SemiBold, `medium`→Medium, `normal`→Regular, `light`→Book.

Excepciones de line-height (confirmadas, no 150%):
- `text-small/normal`: **120%**
- `text-tiny/normal`: **170%**

Letter-spacing: `0%` en los 35 estilos, sin excepción.

### 2.3 Equivalentes a "Display" / "Label" / "Action"

El archivo no tiene estilos de texto separados con esos nombres literales. Mapeo funcional real:

- **"Display"** → usa el propio `heading/xxlarge` (56px) o `heading/xlarge` (48px), no hay un estilo aparte más grande.
- **"Label"** (etiquetas de formulario) → texto pequeño (`text-tiny/medium` o `text-small/medium`) coloreado con `Blue A/grey-9` (`#1A1E23`) o `neutros/neutro-9`, no es un estilo tipográfico separado, es una combinación de tamaño + color.
- **"Action"** (texto de botón) → confirmado en los botones reales: `text-regular/bold` (16px Bold) en tamaños md/lg/xl/2xl, `text-small/bold` (14px Bold) en tamaño sm.

---

## 3. Espaciado y radio de borde — leídos directamente de nodos reales

No existe una colección de variables `Size` ni `Border Width`. Estos valores se leyeron con `figma.getNodeByIdAsync()` sobre los componentes reales (`cornerRadius`, `paddingTop/Right/Bottom/Left`, `itemSpacing`), por lo que son **exactos**, no estimados.

### 3.1 Botones — radio y padding por tamaño (todos exactos)

| Tamaño | Alto | `cornerRadius` | Padding (vert/horiz) | `itemSpacing` (ícono↔texto) |
|---|---|---|---|---|
| `sm` | 30px | 24 | 8px / 12px | 8px |
| `md` | 42px | 24 | 11px / 12px | 8px |
| `lg` | 44px | 24 | 10px / 16px | 8px |
| `xl` | 48px | 24 | 12px / 20px | 8px |
| `2xl` | 56px | 24 | 16px / 24px | 8px |

El radio es un valor fijo de **24px** en los 5 tamaños (no escala con la altura) — como siempre supera la mitad de la altura del botón, el resultado visual es una píldora completa en todos los casos. `strokeWeight`: 1px.

### 3.2 Otros componentes (radio exacto)

| Componente | `cornerRadius` | Notas |
|---|---|---|
| Tarjeta de restaurante (Card Pack L) | **16px** | Las 4 esquinas |
| Badge / Tag (píldora) | **16px** | Altura 32px → 16 = mitad exacta = píldora perfecta. Padding: 4px/8px/4px/6px, `itemSpacing` 4px |
| Campo de Input | **32px** | Altura 48px, padding 12px en las 4 direcciones, `itemSpacing` 8px, `strokeWeight` 1px (borde real, `strokeCount`=1) |
| List item | **0px** | Filas cuadradas, sin redondeo. Tiene 1 stroke real (línea divisoria) |
| Nav bar item (Home, etc.) | Esquinas inferiores 16px, superiores 0px | Solo se redondea la base del ítem |

### 3.3 Elevación / sombras (`Shadow/*`, confirmado por variable de efecto)

| Token | Definición exacta |
|---|---|
| `shadow-none` | Sin sombra |
| `shadow-xs` | `drop-shadow(0, 1px, blur 2px, rgba(0,0,0,0.04))` — sombra por defecto de botones, tarjetas e inputs |
| `shadow-s` | `drop-shadow(0, 1px, blur 3px, rgba(0,0,0,0.10))` + `drop-shadow(0, 1px, blur 2px, rgba(0,0,0,0.08))` |
| `shadow-m` | `drop-shadow(0, 4px, blur 6px, spread -1, rgba(0,0,0,0.10))` + `drop-shadow(0, 1px, blur 3px, spread -1, rgba(0,0,0,0.15))` |
| `shadow-x` | `drop-shadow(0, 10px, blur 8px, spread -3, rgba(0,0,0,0.04))` + `drop-shadow(0, 2px, blur 3px, spread -1, rgba(0,0,0,0.02))` |
| `shadow-xl` | `drop-shadow(0, 20px, blur 25px, spread -5, rgba(0,0,0,0.08))` + `drop-shadow(0, 0, blur 12px, rgba(0,0,0,0.08))` |
| `shadow-xxl` | `drop-shadow(0, 25px, blur 50px, spread -12, rgba(0,0,0,0.25))` + `drop-shadow(0, 4px, blur 15px, spread 2, rgba(0,0,0,0.04))` |
| `shadow-inner` | Sombra interior en dos capas, `rgba(0,0,0,0.05)` y `rgba(0,0,0,0.10)` |

### 3.4 Espaciado general (no hay grid de espaciado tokenizado; base 4px inferida de los valores exactos anteriores)

Evidencia directa: paddings de botón (8/10/11/12/16), `itemSpacing` de botón e input (8), padding de badge (4/6/8), tamaños tipográficos (12/14/16/18/20/24/32/40/48/56) — todos múltiplos de 4px, confirmando una grilla base de 4px aunque no exista como token nombrado.

---

## 4. Ancho de borde

No hay colección `Border Width`. Valores exactos leídos de `strokeWeight` en los nodos reales:

| Componente | `strokeWeight` | ¿Stroke visible? |
|---|---|---|
| Input (campo de texto) | 1px | Sí — borde real de 1px |
| List item | 1px | Sí — línea divisoria real |
| `_Button base` (capa interna del botón) | 1px | Sí — borde/highlight interno de 1px |
| Botón (contenedor externo), Badge, Card | 1px (valor por defecto) | No — `strokeCount` = 0, no se renderiza borde, solo relleno + sombra |

En la práctica, el único ancho de borde real usado en el sistema es **1px**; los componentes sin borde visible simplemente no tienen stroke activo (relleno + `shadow-xs` los separan del fondo).

---

## 5. Patrones visuales de componentes de aplicación

(No existen las pantallas "Detalles del Restaurante / Búsqueda-Mapa / Perfil / Reservas" en este archivo — ver nota al inicio. Esta sección documenta los componentes de aplicación reales: tarjetas, listas, botones y navegación, con capturas tomadas directamente del archivo.)

### 5.1 Tarjetas de restaurante ("Card Pack L")

Ejemplos reales con marca Starbucks, dentro de "❖ APLICATION COMPONETS → Cards":

- Imagen hero a sangre completa en la parte superior, con degradado oscuro (`Blue A/grey-9` semitransparente) en la mitad inferior para dar contraste al logo y las etiquetas.
- Logo circular de marca superpuesto sobre la esquina inferior izquierda de la foto, a caballo entre la imagen y el cuerpo blanco de la tarjeta.
- Badge de precio ("Desde $1.200") en la esquina superior izquierda de la foto.
- Pills de categoría (iconos de comida/bebida/postre) en la esquina superior derecha, con la última resaltada en color cuando aplica.
- Botón de guardar/notificar circular flotante en la esquina superior derecha.
- Cuerpo: nombre del comercio en `text-regular/bold`, rating con ícono de estrella a la derecha.
- Fila de estado inferior con color semántico: cuenta regresiva en ámbar/naranja ("Termina en 02:10"), horario en gris neutro, "Agotado" en pill rosa claro (`pink/brand-01`/`pink/brand-05`), disponibilidad con ícono.
- `cornerRadius` 16px exacto, `shadow-xs`, fondo `Light`/`neutros/neutro-1`.
- Variante secundaria más compacta ("Pack XXL"): imagen cuadrada a la izquierda, título + badge "Label" + precio con precio tachado + link "Ver descripción" + botón "+" circular.

### 5.2 Listas ("List item")

- Altura variable según contenido: **56px** (1 línea), **72px** (2 líneas), **86–88px** (3+ líneas) — confirmado por nodo real.
- `cornerRadius` 0 (filas cuadradas), 1 stroke real como divisor.
- Elemento "leading" opcional (ninguno, monograma, ícono, switch, radio, checkbox) + texto + elemento "trailing" opcional (ícono, checkbox, switch, radio, chevron, ninguno).
- Controles seleccionables usan `pink/brand-05` como color de estado activo.

### 5.3 Botones

- 5 tamaños exactos (ver tabla 3.1), 6 jerarquías (Primary, Black, Secondary color, Secondary gray, Secondary shadow, Tertiary gray, Text), 4 estados (Default, Hover, Pressed, Disabled) + variante Destructive.
- Variantes de ícono: sin ícono, Leading, Trailing, Only (circular), Dot.
- `cornerRadius` 24px fijo en todos los tamaños → siempre se renderiza como píldora completa.
- Texto del botón: `text-regular/bold` (16px) en md–2xl, `text-small/bold` (14px) en sm.

### 5.4 Navegación inferior (bottom nav)

- Contenedor flotante, esquinas inferiores redondeadas (16px) en cada ítem individual.
- 5 ítems: Home, Tiendas, (campana de notificaciones), Órdenes, Perfil.
- Estado activo: ícono y texto en `pink/brand-05`, con una barra/píldora indicadora debajo del ítem activo.
- Estado inactivo: ícono y texto en `Blue A/grey-9`.
- Variantes con badge de notificación (punto `pink/brand-05`) sobre el ícono de campana.
- Existe una segunda familia de navbar ("Button Navigation Bar") para checkout: agregar al carrito, total de compra, botón deshabilitado, barra de búsqueda y teclado numérico.

### 5.5 Manejo de imágenes de comida

- Fotografías siempre a sangre completa, sin márgenes internos, ocupando el ancho total de la tarjeta.
- Relación de aspecto horizontal/paisaje en las tarjetas grandes.
- Degradado oscuro (`Blue A/grey-9` semitransparente) en la franja inferior de la imagen.
- El logo del comercio se superpone físicamente al borde entre foto y cuerpo blanco ("badge flotante").
- Las miniaturas cuadradas de tarjetas de producto compactas usan el mismo radio del sistema, sin degradado (no llevan overlay de texto).

---

## 6. Iconografía (referencia)

El set de íconos de toda la biblioteca proviene de **Streamline — "Core icon set"** (777 íconos nombrados como `Icono=NombreDelIcono`, ej. `Icono=Alarm`, `Icono=Apron`, `Icono=ArrowRight`). No es parte de la colección de variables `Colors`; es una librería de componentes separada.

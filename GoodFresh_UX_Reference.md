# GoodFresh · Documento de Referencia UX
**Patrones de diseño para venta de frutas y verduras frescas online**

> Documento de uso interno. Base de referencia para todas las decisiones de diseño de GoodFresh dentro de la plataforma GoodMeal. Actualizado: junio 2026.

---

## Contexto de uso

Este documento está pensado para ser consultado antes de tomar decisiones de diseño en GoodFresh: pantallas nuevas, flujos, señales de confianza, mecánicas sociales o estructura del catálogo. Cada sección conecta los patrones externos con las restricciones y oportunidades específicas de GoodFresh.

**Restricciones que definen el diseño de GoodFresh:**
- Es una extensión de GoodMeal, no un producto separado. Los usuarios llegan desde una app que asocian con excedentes y descuentos.
- El modelo no es de rescate. GoodFresh vende calidad premium a precio de mercado. Esa ruptura de expectativa es el mayor riesgo de conversión.
- El ICP son mujeres profesionales de 30–55 años con familia, que valoran el tiempo y la confiabilidad por encima del precio.
- El catálogo es acotado (Verduras, Frutas, Frutos secos) y de calidad curada. No es un supermercado. Esa especificidad es una ventaja, no una limitación.
- El arranque en frío es real: GoodFresh empieza sin historial de pedidos por usuario, sin reviews propios, y con usuarios que no saben que existe.

**Modelo de cajas (nomenclatura oficial):**
- Los conjuntos de productos curados por ocasión se llaman **cajas**, no packs.
- Cada caja tiene un **precio mínimo fijo** (ej. $10.990 para la Caja Semana) que no varía según la composición elegida por el usuario.
- El usuario puede sacar y agregar **cualquier producto libremente**, sin restricciones de productos "esenciales".
- Si el total cae bajo el mínimo, la app muestra un aviso y bloquea el botón de compra. El usuario debe subir cantidades o agregar productos opcionales para desbloquear.
- El precio mínimo es **fijo por tipo de caja**, independientemente de si el usuario agrega productos más caros o más baratos que los originales.

---

## Parte 1 · Patrones de descubrimiento y flujo de compra que funcionan

### 1.1 El patrón "Volver a pedir" como ancla de retención

**Qué es:** Una sección visible en la pantalla de inicio que muestra los últimos productos o packs comprados por el usuario, con un CTA directo para reordenar en uno o dos toques.

**Cómo lo usan los referentes:**
- Jumbo App lo llama "Mis listas" y permite guardar compras frecuentes para reproducirlas. Es la única feature de su categoría con feedback positivo consistente en reseñas.
- Instacart lo llama "Buy it again" y lo ubica en el primer viewport de la home, antes que las categorías. En estudios de Baymard (2022), usuarios de compra recurrente navegaban directamente a esta sección ignorando el resto de la home.
- Amazon Fresh hace lo mismo bajo "Past Purchases". Los usuarios de frutas y verduras en particular lo usan como lista de compra semanal implícita.

**Por qué funciona:** Las frutas y verduras son la categoría de mayor recurrencia en supermercados online. El usuario no necesita descubrir nada nuevo cada semana: necesita reconfirmar lo que ya sabe que funciona. El "Volver a pedir" convierte una decisión activa en una acción pasiva. Reduce la carga cognitiva de la compra semanal de 20 decisiones a 2 o 3.

**Aplicación a GoodFresh:** Desde el segundo pedido, la pantalla principal de GoodFresh debería abrir con una fila "Tu pedido habitual" antes de los packs y el catálogo. Para el primer pedido (arranque en frío), esta sección no existe. La solución es reemplazarla con los packs por ocasión: ocupan el mismo espacio editorial y cumplen la misma función de reducir fricción decisional, aunque desde contenido editorial en lugar de historial personal.

---

### 1.2 El patrón de navegación por ocasión sobre navegación por categoría

**Qué es:** Organizar el punto de entrada al catálogo por intención de uso ("para cocinar esta semana", "para los niños") en lugar de por taxonomía de producto (Verduras / Frutas / Frutos secos).

**Cómo lo usan los referentes:**
- Juan Esparraguito tiene una sección "Recomendados Verduras" y una "Canasta Semanal Base" que no organiza por tipo de vegetal sino por utilidad: "selección equilibrada para el consumo diario". El usuario no tiene que decidir qué combinar. La tienda lo hizo.
- Calii (México) estructura su home alrededor de "tu súper semanal" como concepto, no como catálogo. La intención de compra completa (abastecer la semana) es el marco, y los productos individuales son el contenido secundario.
- Lider, en contraste, reproduce la lógica del pasillo del supermercado (categorías, subcategorías, filtros). Funciona para usuarios que van a buscar algo específico, pero es hostil para quien llega sin saber exactamente qué necesita.

**Por qué funciona:** El ICP de GoodFresh no tiene tiempo para explorar un catálogo. Tiene 5 minutos para completar la compra de la semana. La navegación por ocasión reduce la decisión de "¿qué compro?" a "¿para qué lo necesito?" — una pregunta que el usuario ya tiene respondida antes de abrir la app.

**Aplicación a GoodFresh:** Los packs por ocasión (Pack Semana, Colación niños, Para picar y compartir, etc.) son la implementación de este patrón. La clave es que aparezcan antes que el catálogo individual en "Ver todos", no como un accesorio del catálogo. El catálogo individual es el fallback para usuarios con intención específica, no el modo primario de compra.

---

### 1.3 El patrón de precio por unidad visible junto al precio total

**Qué es:** Mostrar el precio unitario (por kg, por unidad) simultáneamente con el precio de la presentación, en la misma card de producto.

**Cómo lo usan los referentes:**
- Jumbo muestra ambos: "$795 · $1.590 x kg". El usuario puede comparar mentalmente con lo que paga en la feria sin hacer cálculos.
- Juan Esparraguito hace lo mismo en sus productos de fruta: "$7.990 · $79.900 x Kg". Funciona como ancla de valor: parece caro hasta que el usuario calcula que es lo mismo o menos que el supermercado.
- Lider va un paso más allá y permite filtrar por precio por kilo, lo que es útil en catálogos grandes pero innecesario en catálogos acotados como GoodFresh.

**Por qué funciona:** La desconfianza de precio es el mayor obstáculo de conversión en apps de frutas y verduras premium. El usuario no tiene un precio de referencia claro para un "Brócoli a $1.990". Pero sí tiene referencia para "$3.980 x kg" — lo compara mentalmente con el supermercado y decide si vale la pena. El precio unitario hace el trabajo de comparación por el usuario.

**Aplicación a GoodFresh:** Las cards de producto ya muestran el precio total. Agregar el precio por kg o por unidad base debajo del precio es el cambio más directo para reducir fricción de precio en el primer pedido. Para frutos secos es especialmente relevante dado que los precios son más altos y menos familiares.

---

### 1.4 El patrón de ventana de entrega como decisión anticipada

**Qué es:** Mostrar las opciones de horario de entrega antes de que el usuario construya su carrito, no al final del checkout.

**Cómo lo usan los referentes:**
- Juan Esparraguito lo comunica en cada producto: "Pide antes de las 12:30 hrs. y recibe el mismo día en horario PM. Pide antes de las 22:00 hrs. y recibe al día siguiente en horario AM." El usuario sabe antes de agregar algo al carrito cuándo va a llegar.
- Jumbo muestra la ventana disponible desde la home, antes de entrar al catálogo.
- En estudios de UX de grocery delivery, la incertidumbre sobre el horario de entrega es la segunda causa de abandono de carrito después de los errores de stock. El usuario construye su carro mentalmente alrededor de un horario ("lo necesito para el almuerzo del lunes"). Si descubre al final del checkout que no hay delivery disponible para ese horario, abandona.

**Por qué funciona:** Anclar la decisión de compra a un horario concreto reduce la ansiedad del usuario y aumenta el compromiso con el carrito. "Voy a pedir para el martes en la mañana" es más fácil de completar que "voy a pedir y ya veré cuándo llega".

**Aplicación a GoodFresh:** La pantalla actual de GoodFresh ya muestra "Entrega hasta 24 hrs." en el header. El siguiente paso sería hacerlo más específico: "Si pides antes de las 14:00 hrs. hoy, recibes mañana en la mañana." Ese nivel de especificidad convierte una promesa vaga en una promesa que el usuario puede integrar a su planificación.

---

### 1.5 El patrón de origen del productor como diferenciador de calidad

**Qué es:** Incluir información sobre quién produce el producto (agricultor, región, práctica de cultivo) en la ficha de producto o en el catálogo como señal de calidad.

**Cómo lo usan los referentes:**
- Juan Esparraguito es el referente más claro en Chile: cada producto tiene el nombre del productor y una descripción de sus prácticas. "Hernán es quien se preocupa de trabajar sus tierras para entregarte el mejor limón sutil." "Francisco encarga de llevar fruta fresca a tu mesa, cosechadas el mismo día que las recibes." Esto convierte un limón en un producto con historia.
- Calii en México usa el mismo patrón con "directo del origen": "Al conectarnos directo con productores, recibes tus frutas y verduras más frescas." El origen elimina intermediarios como señal de frescura.
- FreshDirect (US) incluye información de sourcing en cada producto. Es el principal diferenciador frente a Walmart Fresh para su segmento premium.

**Por qué funciona:** La compra de frutas y verduras online tiene un problema de confianza específico: el usuario no puede ver, tocar ni oler el producto. El origen del productor es la señal de confianza más efectiva en este contexto porque hace tangible la calidad que de otro modo es abstracta. No dice "alta calidad". Dice quién, dónde y cómo.

**Aplicación a GoodFresh:** El catálogo actual no muestra información de origen. Agregar una línea de procedencia en cada producto ("De la Vega Central · Temporada de invierno") es el cambio más impactable para señales de calidad en la ficha de producto, especialmente para el ICP que ya tiene confianza en la Vega como fuente de frescura.

---

## Parte 2 · Principios de señales de confianza

### 2.1 La jerarquía de confianza en frutas y verduras online

La confianza en la compra de frutas y verduras online funciona en cuatro niveles, de mayor a menor peso:

**Nivel 1 — Confianza en el origen físico**
El usuario necesita saber de dónde viene el producto. No "productos frescos", sino "de la Vega Central" o "del productor Hernán en Curicó". La ubicación física ancla la promesa de frescura en algo verificable. GoodFresh ya tiene esto con "Vega Central local 747, Recoleta" en el header — es el activo de confianza más valioso y debe ser más visible, no más pequeño.

**Nivel 2 — Confianza en la selección**
El usuario delega en la app la decisión de qué es bueno. Esto requiere señales de criterio: quién elige los productos, bajo qué estándar, con qué frecuencia. "100% frescos" es una promesa. "Seleccionados cada mañana en la Vega" es un criterio. El criterio genera más confianza porque es verificable.

**Nivel 3 — Confianza en la entrega**
Que lo que llegue sea lo que se pidió, en el estado prometido. Las señales más efectivas no son garantías genéricas ("satisfacción garantizada") sino promesas específicas: "Si un producto no te satisface, te lo reponemos en tu próximo pedido." La garantía concreta genera más confianza que la garantía amplia.

**Nivel 4 — Confianza social**
Que otros usuarios hayan tenido buenas experiencias. Es el nivel más débil en el arranque en frío y el más fuerte una vez que hay historial. Se trata en la Parte 4.

---

### 2.2 Cuándo las cajas prearmadas ayudan y cuándo no

**Ayudan cuando:**
- El usuario llega sin saber qué comprar. La caja resuelve la decisión de "¿qué necesito esta semana?" antes de que tenga que pensar.
- La caja está enmarcada por ocasión o intención ("Para cocinar la semana"), no por composición ("Caja de 7 verduras"). La ocasión conecta con la vida del usuario; la composición es arbitraria.
- El usuario puede modificar la caja libremente. La personalización elimina el riesgo percibido de "¿y si no quiero todo esto?". La caja es un punto de partida, no una imposición.
- El precio mínimo de la caja está comunicado desde el primer momento. El usuario sabe antes de entrar al editor qué compromiso de gasto implica.

**No ayudan cuando:**
- El usuario ya sabe exactamente qué quiere. Ponerle cajas por delante de los productos individuales genera fricción, no orientación. Por eso las cajas van en "Ver todos" y los productos individuales siguen disponibles directamente en las pestañas de categoría.
- La caja incluye productos que el usuario típicamente no usa. Una caja de "verduras de temporada" con productos desconocidos para el ICP (romanesco, radicchio, colinabo) genera incertidumbre, no valor. Las cajas deben construirse sobre productos familiares con ocasiones conocidas.
- El precio mínimo es confuso o está oculto. Si el usuario descubre el mínimo recién al intentar confirmar la compra, la experiencia se siente como trampa. El mínimo debe comunicarse en la card de la caja ("Desde $10.990") y reforzarse en el header del editor.
- La caja no tiene nombre de ocasión claro. "Caja A" o "Caja Premium" no dicen para qué sirve. "Colación niños" dice exactamente a quién y para qué.

---

### 2.3 La diferencia entre una opción útil y una que genera ruido

Una opción es útil cuando **reduce la decisión** que el usuario tiene que tomar. Una opción genera ruido cuando **aumenta las decisiones** sin agregar valor.

**Señales de que una opción es útil:**
- El usuario puede ignorarla sin perder nada
- Resuelve una duda que el usuario ya tenía
- Ocupa el espacio correcto en el flujo (no interrumpe, aparece cuando corresponde)
- Se puede descartar en un toque

**Señales de que una opción genera ruido:**
- Requiere leer texto para entender para qué sirve
- Duplica información que ya está en otro lugar
- Aparece antes de que el usuario haya tomado la decisión previa
- Genera una nueva pregunta en lugar de resolver una existente

**Aplicación directa a GoodFresh:**
- La sección "¿Quieres agregar algo más?" en el editor de caja es útil: aparece después de que el usuario ya configuró los productos incluidos, y resuelve la duda "¿hay algo más que debería llevar?"
- Un filtro de categoría dentro del editor de caja sería ruido: el catálogo de adicionales es pequeño, y un filtro obligaría al usuario a tomar una decisión extra antes de ver los productos.
- La barra de progreso hacia el mínimo es útil: comunica de forma visual cuánto falta sin necesidad de texto explicativo extenso. El usuario entiende inmediatamente qué tiene que hacer.
- Una descripción larga de cada caja en la card del scroll horizontal sería ruido: el nombre de ocasión y el precio mínimo son suficientes para la decisión de entrar o no.

---

## Parte 3 · Estrategias de arranque en frío

El arranque en frío en GoodFresh tiene dos capas: (1) el usuario llega a GoodFresh sin haber pedido nunca, y (2) GoodFresh no tiene reviews ni historial de pedidos propios que mostrar. Ambas capas tienen soluciones distintas.

---

### 3.1 Estrategia: "Herramienta primero, red después"

**Qué es:** Ofrecer valor individual inmediato sin requerir red social ni historial. El usuario puede completar su primera compra sin necesitar que otros usuarios existan.

**Referente:** Instagram comenzó como una herramienta de filtros de fotos antes de ser una red social. Dropbox fue una herramienta de sincronización antes de ser una plataforma colaborativa. El valor individual es el puente al arranque en frío.

**Aplicación a GoodFresh:** Las cajas por ocasión son la herramienta. Un usuario sin historial entra a GoodFresh y en 3 toques puede tener un pedido armado: elige una caja, ajusta los productos según lo que ya tiene en casa, agrega al carrito. No necesita conocer el catálogo, no necesita reviews de otros usuarios, no necesita haber pedido antes. La caja hace el trabajo de orientación que normalmente haría el historial personal o la recomendación social.

---

### 3.2 Estrategia: Señales de comunidad como sustituto de señales de amigos

**Qué es:** Cuando no hay datos de amigos del usuario, las señales de comportamiento de la comunidad (cuántas personas compraron algo, qué es popular esta semana) actúan como sustituto de menor peso pero mayor disponibilidad.

**Referente:** Beli (app de restaurantes) usa "personas con gustos similares" cuando no hay amigos conectados. No es tan poderoso como "tu amiga María lo probó", pero es más creíble que nada. Google Maps hace lo mismo con "X personas han estado aquí" para locales sin reviews propios.

**Aplicación a GoodFresh:** En el arranque en frío, el indicador "+10 personas mirando" ya incluido en el mockup cumple esta función. Se puede ampliar con:
- "El más pedido esta semana" como badge en 1–2 productos del catálogo
- "Pack más armado" como destacado en la sección de packs
- "Temporada: semana del [fecha]" para comunicar que el catálogo está curado activamente

Ninguna de estas señales requiere que el usuario tenga amigos en la plataforma ni que GoodFresh tenga reviews. Se generan a partir del comportamiento agregado de cualquier volumen de pedidos.

---

### 3.3 Estrategia: Transferencia de confianza desde GoodMeal

**Qué es:** Usar la confianza ya establecida en GoodMeal (3 millones de descargas, top 3 apps Chile 2023, 70% vienen por boca a boca) como garantía de confianza para GoodFresh.

**Referente:** Amazon usó la confianza de su plataforma de libros para lanzar electrónica, luego moda, luego comida. El usuario no confía en Amazon Fresh desde cero: transfiere la confianza que ya tiene en Amazon. Cornershop fue adoptado más rápido en Santiago que en otros mercados latinoamericanos, en parte porque ya operaba en Chile con base de usuarios existente.

**Aplicación a GoodFresh:** El riesgo aquí es inverso: GoodMeal es conocida por excedentes y descuentos. GoodFresh es calidad premium a precio de mercado. La transferencia de confianza solo funciona si el usuario entiende que GoodFresh es diferente a lo que espera de GoodMeal, no una extensión del mismo modelo. El copy de onboarding y el header de la tienda deben hacer ese trabajo: "No es un pack sorpresa. Tú eliges. 100% frescos, a precio justo."

---

### 3.4 Estrategia: La primera compra como experiencia diseñada, no como transacción

**Qué es:** Tratar el primer pedido como un evento diferenciado que establece el estándar emocional de la relación. Packaging, timing, comunicación post-pedido.

**Referente:** Juan Esparraguito tiene reviews que dicen "recibí mi primera compra y estoy feliz. SE PASARON!!!". Eso no pasa por accidente: es resultado de una selección cuidadosa de productos, un packaging que comunica cuidado (no simplemente funcional), y una entrega que cumple exactamente lo prometido. La primera compra es el momento de mayor impacto porque el usuario llega con incertidumbre máxima y capacidad de sorpresa máxima.

**Aplicación a GoodFresh:** Esto trasciende la app y entra en operaciones, pero el diseño puede facilitarlo:
- Una pantalla de confirmación de pedido que diga algo específico sobre lo que van a recibir ("Tu zanahoria viene de la Vega Central. La seleccionamos esta mañana.") en lugar de una confirmación genérica
- Una notificación de entrega que refuerce la promesa de calidad ("Tu pedido está en camino. Todo seleccionado hoy.")
- Un estado post-entrega en la app que invite a repetir el pedido con un CTA directo, no a dejar una review

---

### 3.5 Estrategia: El crédito GoodMeal como reducción del riesgo percibido de la primera compra

**Qué es:** El cashback en créditos GoodMeal reduce el costo psicológico del primer pedido. Si el usuario no queda satisfecho, "al menos gané créditos para mis próximos rescates".

**Referente:** Amazon Prime usa el mismo mecanismo: el usuario justifica la compra de prueba en Amazon Fresh porque "ya tengo Prime de todas formas". El beneficio existente reduce el umbral de decisión para probar algo nuevo.

**Aplicación a GoodFresh:** El cashback ya existe en el diseño actual. La oportunidad es hacerlo más visible en el momento de decisión, no solo en la card del producto. En el footer de la tienda o en un banner de onboarding podría decir: "Por tu primera compra en GoodFresh acumulas créditos para tus próximos rescates favoritos." Eso convierte una feature de fidelización en una herramienta de arranque en frío.

---

## Parte 4 · Mecánicas sociales ligeras

El principio guía para GoodFresh es el de **peso social mínimo viable**: la señal social más liviana que entregue información útil sin requerir que el usuario haga algo explícito.

---

### 4.1 Señales implícitas de comportamiento (passive social data)

**Qué son:** Datos generados por el comportamiento de compra sin que el usuario haga nada adicional. No son reviews. No son ratings. Son consecuencias naturales de que las personas pidan.

**Ejemplos implementables en GoodFresh:**
- **Contador de pedidos recientes:** "Este pack fue armado 47 veces esta semana." No requiere que nadie haga nada. Se genera automáticamente de los pedidos.
- **Badge de popularidad en producto:** "Lo más pedido" en 1–2 productos del catálogo. No evalúa calidad, solo frecuencia. Es más creíble que "recomendado" porque es observable.
- **Indicador de stock implícito:** "Quedan pocas unidades" genera urgencia pero también comunica que algo es demandado. La escasez es una señal social indirecta: si se acaba, es porque la gente lo pide.
- **"En temporada":** No es social directamente, pero comunica que otros también están comprando esto ahora. La temporalidad es una forma de señal de comunidad sin requerir datos de usuarios.

**Regla de implementación:** Cada señal pasiva debe ser veraz. Si el contador dice "47 veces esta semana" y son solo 3, el usuario que descubra la discrepancia pierde toda la confianza inmediatamente. En el arranque en frío, es preferible no mostrar números pequeños que mostrar números inflados.

---

### 4.2 Recomendación con un toque (one-tap recommendation)

**Qué es:** Un mecanismo que permite al usuario señalar que algo le gustó sin escribir nada. No es una review. Es un gesto.

**Referentes:**
- Netflix: "Thumb up" sin escala, sin texto. El usuario señala satisfacción en un toque.
- Spotify: "Corazón" en una canción. Genera datos de preferencia sin pedir esfuerzo.
- Beli: "Marcar como visitado" en un restaurante. La visita en sí es señal.

**Aplicación a GoodFresh:** Después de la entrega, mostrar los productos del pedido con un botón "👍 Volvería a pedir" junto a cada uno. Un toque. Sin texto. Sin stars. Los productos con más thumbs up se convierten en candidatos para el badge "Lo más pedido". El usuario que hizo la review no necesita saber que su gesto se convirtió en dato visible. Solo necesita que sea fácil de hacer.

**Lo que no hacer:** No pedir una review al día siguiente del pedido. El usuario ya olvidó el estado emocional de la recepción. La solicitud debe llegar mientras el pedido aún es relevante: dentro de las 2 horas de la entrega, en una notificación push o en pantalla al abrir la app.

---

### 4.3 Datos de comportamiento como señal de popularidad

**Qué es:** Usar patrones de comportamiento dentro de la app (qué se agrega al carrito, qué se saca de los packs, qué se busca) para generar señales editoriales que ayuden a otros usuarios.

**Ejemplos:**
- Si el 80% de los usuarios que arman el "Pack Semana" sacan el zapallo y agregan papa, el pack debería actualizar su contenido base. El comportamiento colectivo mejora la recomendación sin que nadie haga nada explícito.
- Si un producto acumula muchas adiciones al carrito desde la sección "¿Quieres agregar algo más?", ese producto debería subir en la lista de adicionales recomendados.

**Aplicación a GoodFresh:** Esto requiere infraestructura de datos pero puede empezar de forma manual en la etapa de piloto: el equipo revisa qué productos se editan más en los packs y ajusta el contenido base cada 2 semanas. La mecánica de mejora continua no tiene que ser automatizada desde el día 1 para ser efectiva.

---

### 4.4 Señales de temporada como comunidad implícita

**Qué es:** Comunicar que "esto es lo que está disponible ahora" crea una sensación de pertenecer a un grupo de personas que compran de forma consciente y estacional.

**Referente:** Los CSA boxes (Community Supported Agriculture) construyen su propuesta de valor en torno a la estacionalidad como identidad compartida. "Esta semana hay alcachofas porque es su temporada" no es solo una descripción del producto: es un invitación a pertenecer a una práctica.

**Aplicación a GoodFresh:** El badge "Verano" en packs de temporada ya existe en el diseño. Extenderlo a productos individuales ("🌿 Temporada") y acompañarlo con una línea de microcopy en la ficha de producto ("Las alcachofas españolas están en su mejor momento. Disponibles hasta mediados de agosto.") convierte la temporalidad en señal de comunidad sin requerir features sociales complejas.

---

## Parte 5 · Qué falla: patrones a evitar activamente

### 5.1 Reviews sin masa crítica: el efecto sala vacía

**El patrón:** Mostrar una sección de reviews o ratings cuando hay pocos o ningún review disponible.

**Por qué falla:** Cero reviews no es neutral. Es ruido negativo. El usuario interpreta "sin reviews" como "nadie ha comprado esto" o "nadie quedó satisfecho para dejar una review". Ambas lecturas dañan la conversión.

**Referente de fracaso:** Múltiples apps de grocery delivery en Latinoamérica lanzaron con secciones de "Calificaciones" vacías en el arranque. En lugar de construir confianza, comunicaban que el producto era nuevo y no probado.

**Regla para GoodFresh:** No mostrar sección de reviews hasta tener un volumen mínimo representativo por producto (sugerido: 10+ reviews). En el arranque en frío, reemplazar con señales de origen y temporada (que no dependen del volumen de usuarios).

---

### 5.2 Cajas con precio mínimo opaco: la trampa del descubrimiento tardío

**El patrón:** El usuario construye su caja, elimina productos que no necesita, y descubre al intentar confirmar la compra que hay un mínimo de precio que no alcanza.

**Por qué falla:** El descubrimiento tardío de una restricción es una de las causas más frecuentes de abandono de carrito en grocery UX (Baymard, 2022). El usuario siente que le ocultaron información. La restricción en sí no es el problema — el momento en que aparece lo es.

**La solución de GoodFresh:** El mínimo de la caja debe comunicarse en tres momentos distintos, antes de que el usuario pueda verse sorprendido:
1. En la **card de la caja** en "Ver todos": "Desde $10.990"
2. En el **header del editor de caja**: badge verde "Mínimo $10.990" visible desde el primer scroll
3. En el **footer del editor**: barra de progreso que muestra el avance hacia el mínimo en tiempo real

Si el usuario baja del mínimo, el aviso aparece en contexto inmediato (no al intentar confirmar) y el botón se bloquea con un mensaje claro sobre qué hacer para desbloquearlo.

---

### 5.3 Precio premium sin anclaje de valor: la trampa del "caro"

**El patrón:** Mostrar precios de frutas y verduras sin contexto de valor (origen, calidad, precio por kg como referencia comparativa).

**Por qué falla:** El usuario tiene un precio de referencia mental del supermercado. Si el precio de GoodFresh es igual o ligeramente superior y no hay contexto de por qué, el usuario concluye "es más caro que ir al Jumbo". Si el precio es igual pero hay contexto ("precio similar al supermercado, calidad de vega"), la percepción cambia.

**Referente de fracaso:** Lider online tiene el mismo problema: sus frutas y verduras a veces son más caras que en tienda física, y sin contexto de valor el usuario abandona. La app de Lider tiene reviews negativos específicamente sobre precios en frutas y verduras.

**Regla para GoodFresh:** El precio de los productos debe ir acompañado de al menos una señal de valor adicional: precio por kg, origen, o indicador de temporada. El precio solo nunca es suficiente para justificar la compra en una propuesta premium.

---

### 5.4 Funciones sociales que requieren red para funcionar

**El patrón:** Implementar features que solo tienen valor cuando hay suficientes usuarios conectados socialmente en la plataforma (feeds de amigos, comparación de pedidos, recomendaciones de personas específicas).

**Por qué falla:** GoodFresh no tiene red social propia. Sus usuarios comparten una app (GoodMeal) pero no necesariamente se conocen entre sí. Implementar "tus amigos también pidieron" requiere que (1) el usuario tenga amigos en GoodMeal, (2) esos amigos usen GoodFresh, y (3) hayan pedido productos relevantes recientemente. La probabilidad de que esas tres condiciones se cumplan en el arranque es cercana a cero.

**Referente de fracaso:** Apple Music Connect (2015–2018) fue removido porque nadie lo usaba. Era un feed social de artistas dentro de una app de música. La red no existía porque nadie la necesitaba para escuchar música, y sin red no había contenido, y sin contenido nadie lo usaba.

**Regla para GoodFresh:** No implementar features que dependan de red social hasta tener evidencia de que los usuarios buscan esa conexión. Empezar con señales de comunidad implícita (comportamiento agregado anónimo) que no requieren red pero comunican comunidad.

---

### 5.5 Gamificación de la compra recurrente: la trampa de los streaks

**El patrón:** Crear mecánicas de "racha semanal" o "pedido X semanas consecutivas" para incentivar la recurrencia.

**Por qué falla:** La compra de frutas y verduras es recurrente por necesidad, no por motivación extrínseca. El usuario no necesita un streak para recordar que necesita verduras. Lo que sí puede pasar es que el streak genere ansiedad en semanas donde el usuario no necesita pedir (viaje, comida fuera de casa, nevera llena) y lo haga pedir de todas formas para no perder la racha. Eso genera pedidos innecesarios, potencial desperdicio, y eventual abandono de la plataforma.

**Referente de fracaso:** Beli (app de restaurantes) tiene usuarios que reportan "fear of losing my 40-week streak" como motivador de visitas que no habrían hecho por propia voluntad. En restaurantes, eso puede ser neutro o positivo. En compra de alimentos frescos, puede generar compras innecesarias y resentimiento.

**Regla para GoodFresh:** El cashback en créditos GoodMeal es suficiente mecanismo de fidelización. Es un beneficio positivo que no genera ansiedad por pérdida. No agregar mecánicas de streak o racha que conviertan la recurrencia natural en obligación psicológica.

---

### 5.6 Onboarding que pide demasiado antes de mostrar el producto

**El patrón:** Solicitar registro completo, dirección, preferencias y método de pago antes de que el usuario pueda ver el catálogo de GoodFresh.

**Por qué falla:** El usuario llega a GoodFresh sin saber si quiere lo que ofrece. Pedirle que se registre antes de ver el catálogo es como pedirle que se siente en un restaurante, dé su nombre y teléfono, y elija mesa antes de ver la carta. El usuario abandona.

**Referente de falla:** La app de Lider tiene reviews negativos específicos sobre el loop de validación de email que impide explorar la app. El onboarding defensivo genera abandono antes de la primera sesión.

**Regla para GoodFresh:** GoodFresh opera dentro de GoodMeal, donde el usuario ya está registrado. Eso elimina este problema para usuarios existentes. Para usuarios nuevos que lleguen directamente a GoodFresh, la app debe permitir explorar el catálogo completo antes de solicitar login. El login se solicita al agregar al carrito, no antes.

---

## Resumen ejecutivo: los 10 principios que guían el diseño de GoodFresh

1. **El ICP no tiene tiempo.** Cada pantalla debe reducir decisiones, no aumentarlas. Si una feature no ahorra tiempo o elimina incertidumbre, no pertenece al flujo principal.

2. **Los packs son orientación, no producto.** Son el punto de entrada para usuarios sin intención definida. El catálogo individual es el fallback para usuarios con intención específica.

3. **El origen es la señal de confianza más poderosa.** "Vega Central local 747" vale más que cualquier badge de calidad. Hacerlo visible, no relegarlo al footer.

4. **El precio necesita contexto.** Precio solo = decisión difícil. Precio + precio por kg + origen = decisión fácil.

5. **El mínimo de la caja debe comunicarse siempre antes de que el usuario lo descubra.** En la card, en el header del editor, en la barra de progreso del footer. Nunca al intentar confirmar la compra.

6. **El cashback es la herramienta de arranque en frío.** Conecta GoodFresh con el beneficio conocido de GoodMeal y reduce el riesgo percibido de la primera compra.

7. **Las señales sociales deben ser verídicas o no existir.** Un contador inflado o una sección de reviews vacía destruye más confianza que su ausencia.

8. **El primer pedido es el más importante.** La pantalla de confirmación, la comunicación de entrega y el estado post-pedido son oportunidades de diseño que generan o destruyen recurrencia.

9. **La temporalidad es una forma de comunidad.** Comunicar lo que está en temporada convierte la limitación del catálogo estacional en una ventaja de identidad.

10. **El peso social mínimo viable es suficiente.** GoodFresh no necesita red social. Necesita señales de comportamiento colectivo que comuniquen que otros usuarios confían en el producto. Eso es suficiente para el arranque.

---

*Documento generado como referencia de diseño para el proyecto GoodFresh · GoodMeal · 2026*
*Basado en análisis de: Jumbo App, Lider App, Juan Esparraguito, Calii, Instacart, FreshDirect, Baymard Institute Online Grocery UX Research, y literatura de diseño de productos con componentes sociales.*

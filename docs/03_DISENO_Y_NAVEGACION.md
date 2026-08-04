# Diseño y navegación

## Principio de diseño

La experiencia usa un único espacio de 6200 × 4300 píxeles. Los conceptos existen simultáneamente en ese lienzo y una cámara virtual cambia de posición y escala. Así, el público percibe relaciones espaciales en lugar de una sucesión de diapositivas independientes.

## Jerarquía espacial

- HOSRIA ocupa el centro físico y conceptual.
- Los cuatro principios rodean el núcleo.
- Los módulos orbitan alrededor y se conectan por trayectorias.
- Los casos detallados se encuentran cerca de su nodo conceptual.
- La escena de resultados queda fuera del ecosistema operativo para marcar un cambio de nivel: de procesos a impacto.

## Sistema visual

- Fondo carbón casi negro.
- Verde lima como color de gobierno, actividad y conexión.
- Tipografía de alto contraste y gran escala.
- Tarjetas translúcidas con bordes sutiles.
- Retícula ambiental para sugerir sistema e infraestructura.
- Líneas punteadas con pulsos para representar datos en circulación.
- Acentos secundarios rojos, azules, ámbar y violetas disponibles para futuros módulos.

La estética evita ilustraciones genéricas de tecnología. La relación entre elementos es la imagen principal.

## Movimiento

- Transición de cámara: 1300 ms.
- Curva de aceleración personalizada para una sensación cinematográfica.
- Las escenas cambian la visibilidad del contenido relevante sin desmontar el mundo completo.
- Los pulsos recorren rutas SVG y refuerzan la noción de flujo.
- Los anillos del núcleo respiran sutilmente.

## Controles implementados

- teclado;
- scroll/trackpad;
- swipe vertical;
- puntos de progreso;
- botones anterior/siguiente;
- nodos clicables;
- pantalla completa;
- enlaces directos mediante hash.

## Responsive

En pantallas angostas la escala de cámara se ajusta automáticamente. El diseño conserva la relación espacial, aunque la experiencia principal está pensada para una pantalla de presentación horizontal.

## Accesibilidad

- regiones con etiquetas descriptivas;
- botones con `aria-label`;
- estado de escena anunciado mediante `aria-live`;
- navegación completa por teclado;
- soporte para `prefers-reduced-motion` en CSS;
- colores y textos con contraste alto.

## Cómo agregar una escena

1. Añadir un objeto a `scenes` en `app/page.tsx`.
2. Definir `id`, `kicker`, `title`, `x`, `y` y `scale`.
3. Renderizar el contenido en el lienzo con una condición basada en `active` o en la clase `scene-ID`.
4. Posicionar el nuevo nodo de forma absoluta en `app/globals.css`.
5. Revisar el recorrido con teclado, scroll y pantalla completa.

## Cómo incorporar pantallas reales

Las capturas seleccionadas pueden agregarse en `public/screens/` y referenciarse desde el detalle de cada módulo. Se recomienda:

- usar sólo una o dos vistas por concepto;
- recortar elementos irrelevantes;
- mantener la interfaz subordinada a la idea narrativa;
- no transformar la presentación en una demo completa;
- añadir un marco visual común para capturas de diferentes módulos.


# HOSRIA — Presentación web interactiva

Lienzo narrativo con navegación espacial y transiciones de cámara inspirado en Prezi. Presenta a HOSRIA como el núcleo de un ecosistema de información única, conectada, reutilizable y gobernada.

Demo publicada: https://hosira-presentacion.lbmstudios.chatgpt.site

> El nombre definitivo del producto es **HOSRIA**. El slug histórico de la demo conserva `hosira-presentacion`, pero el contenido, la identidad y los metadatos visibles usan el nombre correcto.

## Objetivo

Esta experiencia comienza después del video introductorio sobre caos y sobrecarga de información. No busca enseñar cada pantalla ni realizar una demostración funcional exhaustiva. Su función es explicar el cambio de paradigma:

- la información deja de estar dispersa;
- HOSRIA aparece como núcleo;
- los procesos se conectan al mismo dato;
- la organización construye una única fuente de verdad;
- el dato gobernado se transforma en conocimiento para decidir.

El contexto completo está en [docs/01_CONTEXTO_ESTRATEGICO.md](docs/01_CONTEXTO_ESTRATEGICO.md).

## Tecnología

- React 19
- TypeScript
- Next.js 16
- Vite + Vinext
- CSS propio, sin librería de animación
- Artefacto compatible con Cloudflare Workers

No utiliza base de datos, API, claves privadas ni variables de entorno.

## Requisitos

- Node.js 22.13 o superior
- npm

## Ejecutar localmente

```bash
npm ci
npm run dev
```

Abrir la URL local indicada por Vite en la terminal.

## Verificar y compilar

```bash
npm run lint
npm test
```

También se puede generar el artefacto de producción con:

```bash
npm run build
```

## Navegación

- Flechas del teclado, Page Up/Page Down o barra espaciadora.
- Rueda del mouse o trackpad.
- Gesto vertical en dispositivos táctiles.
- Puntos de progreso inferiores para acceso directo.
- Botones sobre los módulos para hacer zoom.
- Home y End para ir al inicio o al final.
- Botón de pantalla completa en el encabezado.
- Cada escena tiene una URL con hash, por ejemplo `#ecosystem` o `#communications`.

## Dónde editar

- `app/page.tsx`: escenas, contenidos, módulos, coordenadas y navegación.
- `app/globals.css`: sistema visual, disposición espacial, transiciones y responsive.
- `app/layout.tsx`: metadatos, idioma y tipografías.
- `public/`: recursos estáticos.

La propiedad `x`, `y` y `scale` de cada elemento de `scenes` controla la cámara. La presentación no intercambia diapositivas: mueve y escala un único mundo de 6200 × 4300 píxeles.

## Estructura documental

- `docs/01_CONTEXTO_ESTRATEGICO.md`: problema, concepto, módulos, beneficios y decisiones de la reunión.
- `docs/02_GUION_Y_RECORRIDO.md`: orden de las diez escenas y notas para exponer.
- `docs/03_DISENO_Y_NAVEGACION.md`: lógica del lienzo, estética, movimiento y accesibilidad.
- `docs/04_ROADMAP_Y_PENDIENTES.md`: materiales faltantes y próximas iteraciones.
- `docs/05_REFERENCIAS.md`: enlaces entregados y referencias conceptuales.
- `CHANGELOG.md`: alcance de esta primera versión.

## Publicar en un repositorio Git

El ZIP no contiene el historial interno ni la carpeta `.git`; está limpio y listo para un repositorio nuevo.

```bash
git init
git add .
git commit -m "Presentación interactiva HOSRIA"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

## Estado actual

La versión incluida es el primer prototipo conceptual validable. Los bloques visuales están listos para sustituirse o complementarse con las pantallas seleccionadas por Deloitte sin cambiar la lógica de navegación.


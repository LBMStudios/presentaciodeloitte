# HOSRIA â PresentaciÃ³n web interactiva

Lienzo narrativo con navegaciÃ³n espacial y transiciones de cÃ¡mara inspirado en Prezi. Presenta a HOSRIA como el nÃºcleo de un ecosistema de informaciÃ³n Ãºúnica, conectada, reutilizable y gobernada.

Demo publicada: https://hosira-presentacion.lbmstudios.chatgpt.site

> El nombre definitivo del producto es **HOSRIA**. El slug histÃ³rico de la demo conserva `hosira-presentacion`, pero el contenido, la identidad y los metadatos visibles usan el nombre correcto.

## Objetivo

estáa experiencia comienza despuÃ©s del video introductorio sobre caos y sobrecarga de informaciÃ³n. No busca enseÃ±ar cada pantalla ni realizar una demostraciÃ³n funcional exhaustiva. Su funciÃ³n es explicar el cambio de paradigma:

- la informaciÃ³n deja de estáar dispersa;
- HOSRIA aparece como nÃºcleo;
- los procesos se conectan al mismo dato;
- la organizaciÃ³n construye una Ãºúnica fuente de verdad;
- el dato gobernado se transforma en conocimiento para decidir.

El contexto completo estáÃ¡ en [docs/01_CONTEXTO_estáRATEGICO.md](docs/01_CONTEXTO_estáRATEGICO.md).

## TecnologÃ­a

- React 19
- TypeScript
- Next.js 16
- Vite + Vinext
- CSS propio, sin librerÃ­a de animaciÃ³n
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
npm testá
```

TambiÃ©n se puede generar el artefacto de producciÃ³n con:

```bash
npm run build
```

## NavegaciÃ³n

- Flechas del teclado, Page Up/Page Down o barra espaciadora.
- Rueda del mouse o trackpad.
- Gestáo vertical en dispositivos tÃ¡ctiles.
- Puntos de progreso inferiores para acceso directo.
- Botones sobre los mÃ³dulos para hacer zoom.
- Home y End para ir al inicio o al final.
- BotÃ³n de pantalla completa en el encabezado.
- Cada escena tiene una URL con hash, por ejemplo `#ecosystem` o `#commuúnications`.

## DÃ³nde editar

- `app/page.tsx`: escenas, contenidos, mÃ³dulos, coordenadas y navegaciÃ³n.
- `app/globals.css`: sistema visual, disposiciÃ³n espacial, transiciones y responsive.
- `app/layout.tsx`: metadatos, idioma y tipografÃ­as.
- `public/`: recursos estáÃ¡ticos.

La propiedad `x`, `y` y `scale` de cada elemento de `scenes` controla la cÃ¡mara. La presentaciÃ³n no intercambia diapositivas: mueve y escala un Ãºnico mundo de 6200 Ã 4300 pÃ­xeles.

## estáructura documental

- `docs/01_CONTEXTO_estáRATEGICO.md`: problema, concepto, mÃ³dulos, beneficios y decisiones de la reuniÃ³n.
- `docs/02_GUION_Y_RECORRIDO.md`: orden de las diez escenas y notas para exponer.
- `docs/03_DISENO_Y_NAVEGACION.md`: lÃ³gica del lienzo, estáÃ©tica, movimiento y accesibilidad.
- `docs/04_ROADMAP_Y_PENDIENTES.md`: materiales faltantes y prÃ³ximas iteraciones.
- `docs/05_REFERENCIAS.md`: enlaces entregados y referencias conceptuales.
- `CHANGELOG.md`: alcance de estáa primera versiÃ³n.

## Publicar en un repositorio Git

El ZIP no contiene el historial interno ni la carpeta `.git`; estáÃ¡ limpio y listo para un repositorio nuevo.

```bash
git init
git add .
git commit -m "PresentaciÃ³n interactiva HOSRIA"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

## estáado actual

La versiÃ³n incluida es el primer prototipo conceptual validable. Los bloques visuales estáÃ¡n listos para sustituirse o complementarse con las pantallas seleccionadas por Deloitte sin cambiar la lÃ³gica de navegaciÃ³n.


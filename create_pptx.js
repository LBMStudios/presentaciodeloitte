const pptxgen = require('pptxgenjs');
const fs = require('fs');

const pptx = new pptxgen();

// Set presentation layout to Widescreen 16:9
pptx.layout = 'LAYOUT_16x9';

// Define Color Palette
const COLORS = {
  bg: '0F172A',         // Slate 900
  cardBg: '1E293B',     // Slate 800
  cardBgLight: '334155',// Slate 700
  green: '86BC25',      // Deloitte Green
  greenDark: '14532D',  // Green 900
  greenText: '4ADE80',  // Green 400
  red: 'EF4444',        // Red 500
  redDark: '7F1D1D',    // Red 900
  redText: 'FCA5A5',    // Red 300
  cyan: '38BDF8',       // Cyan 400
  textPrimary: 'FFFFFF',// White
  textSecondary: '94A3B8', // Slate 400
  textMuted: '64748B',  // Slate 500
  border: '334155',     // Slate 700
  borderGreen: '86BC25',
};

// Common slide background helper
function addSlideHeader(slide, kickerText, titleText, subtitleText) {
  // Topbar Background
  slide.addShape(pptx.shapes.RECTANGLE, {
    x: 0, y: 0, w: 13.33, h: 0.1,
    fill: { color: COLORS.green }
  });

  // Kicker
  slide.addText(kickerText.toUpperCase(), {
    x: 0.8, y: 0.4, w: 11.7, h: 0.3,
    fontSize: 11, bold: true, color: COLORS.green,
    fontFace: 'Arial', tracking: 2
  });

  // Title
  slide.addText(titleText, {
    x: 0.8, y: 0.7, w: 11.7, h: 0.6,
    fontSize: 26, bold: true, color: COLORS.textPrimary,
    fontFace: 'Arial'
  });

  // Subtitle (if provided)
  if (subtitleText) {
    slide.addText(subtitleText, {
      x: 0.8, y: 1.3, w: 11.7, h: 0.4,
      fontSize: 13, color: COLORS.textSecondary,
      fontFace: 'Arial'
    });
  }
}

// -------------------------------------------------------------
// SLIDE 1: EL CAMBIO (Del caos al orden)
// -------------------------------------------------------------
const slide1 = pptx.addSlide();
slide1.background = { color: COLORS.bg };
addSlideHeader(slide1, "El Cambio", "Del caos al orden", "La transformación digital del Hub Operativo de Servicios y Reportes");

// Left Card: ANTES
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 1.9, w: 5.5, h: 5.0, rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.redDark, width: 1.5 }
});

// Badge ANTES
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.1, y: 2.2, w: 1.2, h: 0.35, rectRadius: 0.1,
  fill: { color: COLORS.redDark }
});
slide1.addText("ANTES", {
  x: 1.1, y: 2.2, w: 1.2, h: 0.35,
  fontSize: 11, bold: true, color: COLORS.redText, align: 'center', fontFace: 'Arial'
});

slide1.addText("Cada propuesta seguía su propio camino", {
  x: 1.1, y: 2.7, w: 4.9, h: 0.8,
  fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

slide1.addText([
  { text: "• Archivos dispersos en carpetas locales o correos\n\n", options: { color: COLORS.textSecondary } },
  { text: "• Criterios y formatos heterogéneos sin estándar\n\n", options: { color: COLORS.textSecondary } },
  { text: "• Aprobaciones informales u omitidas", options: { color: COLORS.textSecondary } }
], { x: 1.1, y: 3.6, w: 4.9, h: 2.0, fontSize: 13, fontFace: 'Arial' });

// Metric Danger Box
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.1, y: 5.8, w: 4.9, h: 0.8, rectRadius: 0.1,
  fill: { color: '2A1215' },
  line: { color: COLORS.red, width: 1 }
});
slide1.addText("ALTO RIESGO\nSin trazabilidad central", {
  x: 1.1, y: 5.85, w: 4.9, h: 0.7,
  fontSize: 12, bold: true, color: COLORS.red, align: 'center', fontFace: 'Arial'
});

// Middle Node Arrow
slide1.addShape(pptx.shapes.OVAL, {
  x: 6.36, y: 4.0, w: 0.6, h: 0.6,
  fill: { color: COLORS.green },
});
slide1.addText("➔", {
  x: 6.36, y: 4.0, w: 0.6, h: 0.6,
  fontSize: 18, color: '000000', align: 'center', valig: 'middle'
});

// Right Card: CON HOSRIA
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.0, y: 1.9, w: 5.5, h: 5.0, rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.borderGreen, width: 1.5 }
});

// Badge CON HOSRIA
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.3, y: 2.2, w: 1.6, h: 0.35, rectRadius: 0.1,
  fill: { color: COLORS.greenDark }
});
slide1.addText("CON HOSRIA", {
  x: 7.3, y: 2.2, w: 1.6, h: 0.35,
  fontSize: 11, bold: true, color: COLORS.greenText, align: 'center', fontFace: 'Arial'
});

slide1.addText("Un único lugar. Un flujo automático.", {
  x: 7.3, y: 2.7, w: 4.9, h: 0.8,
  fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

slide1.addText([
  { text: "• Información centralizada identificada en el origen\n\n", options: { color: COLORS.textSecondary } },
  { text: "• Aprobador identificado y notificado al instante\n\n", options: { color: COLORS.textSecondary } },
  { text: "• Trazabilidad y auditoría completa en tiempo real", options: { color: COLORS.textSecondary } }
], { x: 7.3, y: 3.6, w: 4.9, h: 2.0, fontSize: 13, fontFace: 'Arial' });

// Metric Success Box
slide1.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 7.3, y: 5.8, w: 4.9, h: 0.8, rectRadius: 0.1,
  fill: { color: '0D2818' },
  line: { color: COLORS.green, width: 1 }
});
slide1.addText("100% CONTROL\nVisibilidad total en tiempo real", {
  x: 7.3, y: 5.85, w: 4.9, h: 0.7,
  fontSize: 12, bold: true, color: COLORS.green, align: 'center', fontFace: 'Arial'
});

// -------------------------------------------------------------
// SLIDE 2: EL NÚCLEO (Aparece HOSRIA)
// -------------------------------------------------------------
const slide2 = pptx.addSlide();
slide2.background = { color: COLORS.bg };
addSlideHeader(slide2, "El Núcleo", "Aparece HOSRIA", "Una arquitectura de datos diseñada para conectar personas, procesos y conocimiento.");

// Main Central Hero Card
slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 1.9, w: 11.7, h: 2.3, rectRadius: 0.15,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.green, width: 2 }
});

slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 1.1, y: 2.15, w: 1.8, h: 0.35, rectRadius: 0.1,
  fill: { color: COLORS.greenDark }
});
slide2.addText("SISTEMA CENTRAL", {
  x: 1.1, y: 2.15, w: 1.8, h: 0.35,
  fontSize: 10, bold: true, color: COLORS.greenText, align: 'center', fontFace: 'Arial'
});

slide2.addText("HOSRIA", {
  x: 1.1, y: 2.55, w: 11.1, h: 0.7,
  fontSize: 36, bold: true, color: COLORS.green, fontFace: 'Arial'
});

slide2.addText("Hub Operativo de Servicios, Reportes e Inteligencia Analítica", {
  x: 1.1, y: 3.3, w: 11.1, h: 0.6,
  fontSize: 16, color: COLORS.textPrimary, fontFace: 'Arial'
});

// 3 Lower Pillar Cards
const pillars = [
  { title: "Gobernanza y Control", desc: "Reglas de negocio unificadas y asignación clara de responsabilidades en cada etapa del proceso." },
  { title: "Trazabilidad E2E", desc: "Seguimiento histórico completo de cada registro desde su creación hasta la presentación final." },
  { title: "Automatización", desc: "Notificaciones, aprobaciones y alertas automáticas que eliminan la carga manual repetitiva." }
];

pillars.forEach((p, i) => {
  const posX = 0.8 + i * 4.0;
  slide2.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: posX, y: 4.5, w: 3.7, h: 2.4, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 }
  });
  
  slide2.addText(`0${i+1}`, {
    x: posX + 0.3, y: 4.7, w: 1.0, h: 0.4,
    fontSize: 20, bold: true, color: COLORS.green, fontFace: 'Arial'
  });

  slide2.addText(p.title, {
    x: posX + 0.3, y: 5.2, w: 3.1, h: 0.5,
    fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide2.addText(p.desc, {
    x: posX + 0.3, y: 5.7, w: 3.1, h: 1.0,
    fontSize: 12, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 3: LA IDEA CENTRAL (Gobernanza de datos)
// -------------------------------------------------------------
const slide3 = pptx.addSlide();
slide3.background = { color: COLORS.bg };
addSlideHeader(slide3, "La Idea Central", "Gobernanza de datos", "Un dato ingresa una vez y se propaga con reglas claras a todos los procesos que lo necesitan.");

const govPrinciples = [
  { title: "Gobernado", desc: "Reglas de negocio y responsables definidos para cada tipo de dato." },
  { title: "Automatizado", desc: "Flujos de trabajo sin intervención manual repetitiva ni errores de traspaso." },
  { title: "Única verdad", desc: "Una sola fuente centralizada de información, eliminando planillas duplicadas." },
  { title: "Escalable", desc: "Arquitectura moderna lista para incorporar nuevos módulos y requerimientos futuros." }
];

govPrinciples.forEach((g, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const posX = 0.8 + col * 5.95;
  const posY = 1.9 + row * 2.5;

  slide3.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: posX, y: posY, w: 5.75, h: 2.25, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 }
  });

  slide3.addShape(pptx.shapes.OVAL, {
    x: posX + 0.4, y: posY + 0.4, w: 0.6, h: 0.6,
    fill: { color: COLORS.greenDark }
  });
  slide3.addText(`0${i+1}`, {
    x: posX + 0.4, y: posY + 0.4, w: 0.6, h: 0.6,
    fontSize: 12, bold: true, color: COLORS.greenText, align: 'center', valig: 'middle', fontFace: 'Arial'
  });

  slide3.addText(g.title, {
    x: posX + 1.2, y: posY + 0.35, w: 4.2, h: 0.5,
    fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide3.addText(g.desc, {
    x: posX + 1.2, y: posY + 0.9, w: 4.2, h: 1.1,
    fontSize: 13, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 4: LA PLATAFORMA (Un ecosistema conectado)
// -------------------------------------------------------------
const slide4 = pptx.addSlide();
slide4.background = { color: COLORS.bg };
addSlideHeader(slide4, "La Plataforma", "Un ecosistema conectado", "HOSRIA en el centro integrando todos los módulos operativos y de gestión.");

// Central Core Box
slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 4.91, y: 3.5, w: 3.5, h: 1.8, rectRadius: 0.2,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.green, width: 2.5 }
});

slide4.addText("HOSRIA\nNÚCLEO CENTRAL", {
  x: 4.91, y: 3.5, w: 3.5, h: 1.8,
  fontSize: 18, bold: true, color: COLORS.green, align: 'center', valig: 'middle', fontFace: 'Arial'
});

// 5 Satellites around core
const satellites = [
  { title: "Gestión de propuestas", copy: "Centralización y aprobaciones automáticas", x: 0.8, y: 2.0, w: 3.6 },
  { title: "Reportes requeridos", copy: "Solicitud, recordatorios y seguimiento", x: 8.9, y: 2.0, w: 3.6 },
  { title: "Comunicaciones", copy: "Información segmentada por rol", x: 0.8, y: 5.0, w: 3.6 },
  { title: "Gestión SEGUN", copy: "Cartera, clientes y profesionales", x: 8.9, y: 5.0, w: 3.6 },
  { title: "Gestión MVPD", copy: "Procesos específicos, misma información", x: 4.91, y: 5.8, w: 3.5 },
];

satellites.forEach(s => {
  slide4.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: s.x, y: s.y, w: s.w, h: 1.3, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 }
  });

  slide4.addText(s.title, {
    x: s.x + 0.2, y: s.y + 0.2, w: s.w - 0.4, h: 0.4,
    fontSize: 14, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide4.addText(s.copy, {
    x: s.x + 0.2, y: s.y + 0.6, w: s.w - 0.4, h: 0.5,
    fontSize: 11, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 5: PRIMER MÓDULO (Gestión de propuestas)
// -------------------------------------------------------------
const slide5 = pptx.addSlide();
slide5.background = { color: COLORS.bg };
addSlideHeader(slide5, "Primer Módulo", "Gestión de propuestas", "Control total del ciclo de vida comercial con validaciones y alertas automáticas.");

const proposalFeatures = [
  { title: "Estandarización", desc: "Plantillas y estructuras predefinidas para asegurar consistencia en todas las propuestas." },
  { title: "Aprobaciones Multinivel", desc: "Ruteo inteligente de aprobación según monto, línea de servicio o tipo de cliente." },
  { title: "Alertas de Vencimiento", desc: "Notificaciones preventivas automáticas antes de fechas límite críticas." },
  { title: "Historial Completo", desc: "Registro inalterable de versiones, cambios y aprobaciones realizadas." }
];

proposalFeatures.forEach((f, i) => {
  const posX = 0.8 + i * 3.0;
  slide5.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: posX, y: 2.1, w: 2.7, h: 4.8, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 }
  });

  slide5.addText(`0${i+1}`, {
    x: posX + 0.3, y: 2.4, w: 2.1, h: 0.4,
    fontSize: 22, bold: true, color: COLORS.green, fontFace: 'Arial'
  });

  slide5.addText(f.title, {
    x: posX + 0.3, y: 3.0, w: 2.1, h: 0.8,
    fontSize: 16, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide5.addText(f.desc, {
    x: posX + 0.3, y: 3.9, w: 2.1, h: 2.7,
    fontSize: 12, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 6: SEGUNDO MÓDULO (Reportes requeridos)
// -------------------------------------------------------------
const slide6 = pptx.addSlide();
slide6.background = { color: COLORS.bg };
addSlideHeader(slide6, "Segundo Módulo", "Reportes requeridos", "Automatización del pedido, recepción y consolidación de información corporativa.");

const reportSteps = [
  { step: "PASO 01", title: "Solicitud Automática", desc: "Notificación programada a los responsables con requerimientos específicos." },
  { step: "PASO 02", title: "Monitoreo en Tiempo Real", desc: "Tablero de estado de entregas: Pendiente, En Revisión y Aprobado." },
  { step: "PASO 03", title: "Recordatorios Inteligentes", desc: "Alertas automáticas según cronograma para prevenir retrasos." },
  { step: "PASO 04", title: "Consolidación Instantánea", desc: "Generación de reportes globales sin trabajo manual de tipeo." }
];

reportSteps.forEach((s, i) => {
  const posY = 1.9 + i * 1.3;

  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 0.8, y: posY, w: 11.7, h: 1.1, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 }
  });

  // Step Badge
  slide6.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: 1.1, y: posY + 0.3, w: 1.5, h: 0.5, rectRadius: 0.08,
    fill: { color: COLORS.greenDark }
  });
  slide6.addText(s.step, {
    x: 1.1, y: posY + 0.3, w: 1.5, h: 0.5,
    fontSize: 11, bold: true, color: COLORS.greenText, align: 'center', valig: 'middle', fontFace: 'Arial'
  });

  slide6.addText(s.title, {
    x: 2.9, y: posY + 0.2, w: 3.5, h: 0.7,
    fontSize: 16, bold: true, color: COLORS.textPrimary, valig: 'middle', fontFace: 'Arial'
  });

  slide6.addText(s.desc, {
    x: 6.5, y: posY + 0.2, w: 5.7, h: 0.7,
    fontSize: 12, color: COLORS.textSecondary, valig: 'middle', fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 7: NUEVA CAPACIDAD (Comunicaciones dirigidas)
// -------------------------------------------------------------
const slide7 = pptx.addSlide();
slide7.background = { color: COLORS.bg };
addSlideHeader(slide7, "Nueva Capacidad", "Comunicaciones dirigidas", "Información precisa para la persona indicada en el momento correcto.");

const commPillars = [
  { title: "Segmentación Inteligente", desc: "Envío de avisos y novedades filtradas automáticamente según rol, área y responsabilidad." },
  { title: "Canal Centralizado", desc: "Historial de comunicaciones oficial accesible directamente dentro de la plataforma HOSRIA." },
  { title: "Confirmación de Lectura", desc: "Trazabilidad completa de recepción y lectura para anuncios e instructivos críticos." }
];

commPillars.forEach((c, i) => {
  const posX = 0.8 + i * 4.0;
  slide7.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: posX, y: 2.1, w: 3.7, h: 4.8, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.border, width: 1 }
  });

  slide7.addText(`0${i+1}`, {
    x: posX + 0.4, y: 2.5, w: 2.9, h: 0.5,
    fontSize: 24, bold: true, color: COLORS.green, fontFace: 'Arial'
  });

  slide7.addText(c.title, {
    x: posX + 0.4, y: 3.2, w: 2.9, h: 0.8,
    fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide7.addText(c.desc, {
    x: posX + 0.4, y: 4.1, w: 2.9, h: 2.4,
    fontSize: 13, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 8: LA DIFERENCIA (La información se reutiliza)
// -------------------------------------------------------------
const slide8 = pptx.addSlide();
slide8.background = { color: COLORS.bg };
addSlideHeader(slide8, "La Diferencia", "La información se reutiliza", "Elimina la carga repetitiva de volver a ingresar los mismos datos en distintos sistemas.");

// Left Box: SIN HOSRIA
slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 0.8, y: 1.9, w: 5.6, h: 5.0, rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.redDark, width: 1.5 }
});

slide8.addText("SIN HOSRIA", {
  x: 1.1, y: 2.2, w: 5.0, h: 0.5,
  fontSize: 18, bold: true, color: COLORS.redText, fontFace: 'Arial'
});

slide8.addText([
  { text: "✖  Reingreso manual de datos en cada etapa\n\n", options: { color: COLORS.textSecondary } },
  { text: "✖  Inconsistencias y diferencias entre planillas\n\n", options: { color: COLORS.textSecondary } },
  { text: "✖  Pérdida de horas operativas en tipeo repetitivo", options: { color: COLORS.textSecondary } }
], { x: 1.1, y: 3.0, w: 5.0, h: 3.5, fontSize: 14, fontFace: 'Arial' });

// Right Box: CON HOSRIA
slide8.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
  x: 6.9, y: 1.9, w: 5.6, h: 5.0, rectRadius: 0.1,
  fill: { color: COLORS.cardBg },
  line: { color: COLORS.borderGreen, width: 1.5 }
});

slide8.addText("CON HOSRIA", {
  x: 7.2, y: 2.2, w: 5.0, h: 0.5,
  fontSize: 18, bold: true, color: COLORS.greenText, fontFace: 'Arial'
});

slide8.addText([
  { text: "✔  Ingreso único en el origen (Propuesta)\n\n", options: { color: COLORS.textPrimary } },
  { text: "✔  Propagación automática a reportes y gestión\n\n", options: { color: COLORS.textPrimary } },
  { text: "✔  100% coherencia sin trabajo duplicado", options: { color: COLORS.textPrimary } }
], { x: 7.2, y: 3.0, w: 5.0, h: 3.5, fontSize: 14, fontFace: 'Arial' });

// -------------------------------------------------------------
// SLIDE 9: EL RESULTADO (Información que se vuelve conocimiento)
// -------------------------------------------------------------
const slide9 = pptx.addSlide();
slide9.background = { color: COLORS.bg };
addSlideHeader(slide9, "El Resultado", "Información que se vuelve conocimiento", "4 pilares de transformación operativa y estratégica.");

const outcomes = [
  { num: "01", title: "Cero duplicación", desc: "Cargar una sola vez. Reutilizar la información en toda la organización.", highlight: false },
  { num: "02", title: "Base corporativa", desc: "La organización construye una memoria común. El saber no se pierde.", highlight: false },
  { num: "03", title: "Datos confiables", desc: "Indicadores y dashboards sobre una misma realidad. Sin versiones paralelas.", highlight: false },
  { num: "04", title: "Mejores decisiones", desc: "El conocimiento llega donde genera valor. En el momento exacto.", highlight: true }
];

outcomes.forEach((o, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const posX = 0.8 + col * 5.95;
  const posY = 1.9 + row * 2.5;

  slide9.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: posX, y: posY, w: 5.75, h: 2.25, rectRadius: 0.1,
    fill: { color: o.highlight ? '1E3A2B' : COLORS.cardBg },
    line: { color: o.highlight ? COLORS.green : COLORS.border, width: o.highlight ? 2 : 1 }
  });

  slide9.addText(o.num, {
    x: posX + 0.4, y: posY + 0.3, w: 1.0, h: 0.5,
    fontSize: 22, bold: true, color: o.highlight ? COLORS.greenText : COLORS.green, fontFace: 'Arial'
  });

  slide9.addText(o.title, {
    x: posX + 1.4, y: posY + 0.3, w: 4.0, h: 0.5,
    fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide9.addText(o.desc, {
    x: posX + 0.4, y: posY + 0.9, w: 5.0, h: 1.1,
    fontSize: 13, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// -------------------------------------------------------------
// SLIDE 10: HOSRIA (Una única verdad para todos los procesos)
// -------------------------------------------------------------
const slide10 = pptx.addSlide();
slide10.background = { color: COLORS.bg };

// Topbar Green accent line
slide10.addShape(pptx.shapes.RECTANGLE, {
  x: 0, y: 0, w: 13.33, h: 0.1,
  fill: { color: COLORS.green }
});

// Main Closing Title
slide10.addText("HOSRIA", {
  x: 0.8, y: 1.2, w: 11.7, h: 0.5,
  fontSize: 14, bold: true, color: COLORS.green, tracking: 3, fontFace: 'Arial'
});

slide10.addText("Una única verdad para todos los procesos", {
  x: 0.8, y: 1.7, w: 11.7, h: 1.0,
  fontSize: 34, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
});

// 3 Final Highlights
const finalCards = [
  { title: "Centralización Total", desc: "Propuestas, reportes, comunicaciones y gestión integrados en un único hub operativo." },
  { title: "Gobernanza Garantizada", desc: "Reglas claras de negocio, trazabilidad inalterable y auditoría en tiempo real." },
  { title: "Valor Estratégico", desc: "Datos transformados en conocimiento para la toma de decisiones oportuna y precisa." }
];

finalCards.forEach((fc, i) => {
  const posX = 0.8 + i * 4.0;
  slide10.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x: posX, y: 3.1, w: 3.7, h: 3.3, rectRadius: 0.1,
    fill: { color: COLORS.cardBg },
    line: { color: COLORS.green, width: 1.5 }
  });

  slide10.addText(fc.title, {
    x: posX + 0.3, y: 3.4, w: 3.1, h: 0.6,
    fontSize: 18, bold: true, color: COLORS.textPrimary, fontFace: 'Arial'
  });

  slide10.addText(fc.desc, {
    x: posX + 0.3, y: 4.1, w: 3.1, h: 2.0,
    fontSize: 13, color: COLORS.textSecondary, fontFace: 'Arial'
  });
});

// Footer Deloitte Branding
slide10.addText("Deloitte.  |  HOSRIA Presentation", {
  x: 0.8, y: 6.7, w: 11.7, h: 0.4,
  fontSize: 11, color: COLORS.textMuted, fontFace: 'Arial'
});

// Output path
const outputPath = 'HOSRIA-Presentacion-Deloitte.pptx';
pptx.writeFile({ fileName: outputPath }).then(fileName => {
  console.log(`SUCCESS: PowerPoint presentation created at ${fileName}`);
}).catch(err => {
  console.error("ERROR generating PPTX:", err);
});


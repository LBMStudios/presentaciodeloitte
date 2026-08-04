"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Scene = {
  id: string;
  kicker: string;
  title: string;
  x: number;
  y: number;
  scale: number;
};

const scenes: Scene[] = [
  { id: "switch", kicker: "El cambio", title: "Del caos al orden", x: 760, y: 720, scale: 0.86 },
  { id: "reveal", kicker: "El núcleo", title: "Aparece HOSRIA", x: 3100, y: 2020, scale: 0.62 },
  { id: "governance", kicker: "La idea central", title: "Gobernanza de datos", x: 3100, y: 2020, scale: 1.34 },
  { id: "ecosystem", kicker: "La plataforma", title: "Un ecosistema conectado", x: 3100, y: 2100, scale: 0.44 },
  { id: "proposals", kicker: "Primer módulo", title: "Gestión de propuestas", x: 4760, y: 720, scale: 0.86 },
  { id: "reports", kicker: "Segundo módulo", title: "Reportes requeridos", x: 5050, y: 1980, scale: 0.86 },
  { id: "communications", kicker: "Nueva capacidad", title: "Comunicaciones", x: 4580, y: 3200, scale: 0.86 },
  { id: "network", kicker: "La diferencia", title: "La información se reutiliza", x: 3100, y: 2100, scale: 0.44 },
  { id: "outcomes", kicker: "El resultado", title: "Información que se vuelve conocimiento", x: 1660, y: 3280, scale: 0.82 },
  { id: "final", kicker: "HOSRIA", title: "Una única verdad para todos los procesos", x: 3100, y: 2250, scale: 0.80 },
];

const modules = [
  { id: "proposals", className: "module-proposals", title: "Propuestas", copy: "Centralización y aprobaciones automáticas", scene: 4 },
  { id: "reports", className: "module-reports", title: "Reportes requeridos", copy: "Solicitud, recordatorios y seguimiento", scene: 5 },
  { id: "communications", className: "module-communications", title: "Comunicaciones", copy: "Información segmentada para cada persona", scene: 6 },
  { id: "segun", className: "module-segun", title: "Gestión SEGUN", copy: "Cartera, clientes y profesionales", scene: 3 },
  { id: "mvpd", className: "module-mvpd", title: "Gestión MVPD", copy: "Procesos específicos, misma información", scene: 3 },
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [fullscreen, setFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const wheelLock = useRef(false);
  const touchStart = useRef<number | null>(null);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(scenes.length - 1, index));
    setActive(next);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${scenes[next].id}`);
    }
  }, []);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const previous = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    const syncHash = () => {
      if (typeof window !== "undefined" && window.location.hash) {
        const sceneId = window.location.hash.replace("#", "");
        const initial = scenes.findIndex((scene) => scene.id === sceneId);
        if (initial >= 0) {
          setActive(initial);
        }
      }
    };
    const timer = setTimeout(syncHash, 0);
    window.addEventListener("hashchange", syncHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener("resize", updateViewport);

    const onFullscreen = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreen);

    return () => {
      window.removeEventListener("resize", updateViewport);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(scenes.length - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo, next, previous]);

  const onWheel = (event: React.WheelEvent) => {
    if (Math.abs(event.deltaY) < 18 || wheelLock.current) return;
    wheelLock.current = true;
    if (event.deltaY > 0) next();
    else previous();
    window.setTimeout(() => (wheelLock.current = false), 900);
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStart.current = event.touches[0]?.clientY ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const end = event.changedTouches[0]?.clientY ?? touchStart.current;
    const distance = touchStart.current - end;
    if (Math.abs(distance) > 45) {
      if (distance > 0) next();
      else previous();
    }
    touchStart.current = null;
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  };

  const camera = useMemo(() => {
    const scene = scenes[active];
    const responsiveScale = viewport.width < 760 ? Math.min(1, viewport.width / 920) : 1;
    const scale = scene.scale * responsiveScale;
    
    return {
      transform: `translate3d(${viewport.width / 2 - scene.x * scale}px, ${viewport.height / 2 - scene.y * scale}px, 0) scale(${scale})`,
    };
  }, [active, viewport]);

  return (
    <main
      className={`presentation-shell scene-${scenes[active].id} ${fullscreen ? "is-fullscreen" : ""}`}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      <header className="topbar">
        <button className="brand" onClick={() => goTo(1)} aria-label="Volver al núcleo HOSRIA">
          <span>HOSRIA</span><i />
        </button>
        <div className="scene-meta" aria-live="polite">
          <span>{scenes[active].kicker}</span>
          <strong>{scenes[active].title}</strong>
        </div>
        <div className="topbar-actions">
          <button className="shortcuts-button" onClick={() => setShowShortcuts(true)} aria-label="Ver atajos de teclado">
            <span className="shortcuts-icon">⌨</span>
            <span>Atajos</span>
          </button>
          <button className="fullscreen-button" onClick={toggleFullscreen} aria-label={fullscreen ? "Salir de pantalla completa" : "Ver en pantalla completa"}>
            <span className="fullscreen-icon" aria-hidden="true">{fullscreen ? "×" : "⛶"}</span>
            <span>{fullscreen ? "Salir" : "Pantalla completa"}</span>
          </button>
        </div>
      </header>

      <section className="stage" aria-label="Presentación interactiva de HOSRIA">
        <div className="camera" style={camera}>
          <div className="world">
            {[1, 2, 3, 7, 9].includes(active) && <svg className="connections" viewBox="0 0 6200 4300" aria-hidden="true">
              <defs>
                <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
              <g className="connection-lines">
                <path id="pathProposals" d="M3100 2020 C3300 1800 3600 1700 3860 1600" />
                <path id="pathReports" d="M3100 2020 C3500 2020 3800 2080 4160 2120" />
                <path id="pathComms" d="M3100 2020 C3300 2280 3600 2560 3860 2680" />
                <path id="pathSegun" d="M3100 2020 C2800 2280 2600 2560 2560 2680" />
                <path id="pathMvpd" d="M3100 2020 C2600 2020 2200 2080 1960 2120" />
              </g>
              {["pathProposals", "pathReports", "pathComms", "pathSegun", "pathMvpd"].map((path, index) => (
                <circle key={path} className={`data-pulse pulse-${index}`} r="18">
                  <animateMotion dur={`${4.6 + index * 0.35}s`} repeatCount="indefinite" begin={`${index * -0.7}s`}>
                    <mpath href={`#${path}`} />
                  </animateMotion>
                </circle>
              ))}
            </svg>}

            {active === 0 && <section className="world-node switch-node" aria-label="Del caos al orden">
              <div className="switch-bg-number" aria-hidden="true">01</div>
              <div className="switch-top-row">
                <span className="micro-label">EL CAMBIO</span>
                <span className="switch-scene-pill">Escena 1 / 10</span>
              </div>
              <h1>Del caos<br />al orden.</h1>
              <div className="switch-divider" aria-hidden="true">
                <span className="switch-divider-line" />
                <span className="switch-divider-dot" />
                <span className="switch-divider-line" />
              </div>
              <p>La información deja de perseguir a las personas<br />y empieza a trabajar para ellas.</p>
              <div className="switch-pills" aria-label="Transformación">
                <div className="switch-pill pill-before">
                  <span className="pill-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  </span>
                  <div>
                    <strong>Antes</strong>
                    <span>Datos dispersos, duplicados, sin dueño</span>
                  </div>
                </div>
                <svg className="pill-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                <div className="switch-pill pill-after">
                  <span className="pill-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <div>
                    <strong>Con HOSRIA</strong>
                    <span>Una única verdad, gobernada y reutilizable</span>
                  </div>
                </div>
              </div>
              <button onClick={() => goTo(1)}>Descubrir HOSRIA <span>→</span></button>
            </section>}

            <section className="core-node" aria-label="Núcleo HOSRIA" onClick={() => goTo(active === 2 ? 3 : 2)}>
              <div className="core-rings" aria-hidden="true"><i /><i /><i /></div>
              <div className="core-content">
                <span className="core-eyebrow">GOBERNANZA DE DATOS</span>
                <h2>HOSRIA</h2>
                <p>Una única verdad<br />para todos los procesos.</p>
              </div>
              <div className="core-concepts" aria-label="Principios del núcleo de datos">
                <span className="concept concept-unique">Única</span>
                {![1, 2].includes(active) && <span className="concept concept-connected">Conectada</span>}
                <span className="concept concept-reusable">Reutilizable</span>
                {![1, 2].includes(active) && <span className="concept concept-governed">Gobernada</span>}
              </div>
              {[2, 3].includes(active) && <div className="core-orbit-chips" aria-hidden="true">
                <span className="orbit-chip chip-1"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Gobernado</span>
                <span className="orbit-chip chip-2"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Automatizado</span>
                <span className="orbit-chip chip-3"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> Única Verdad</span>
                <span className="orbit-chip chip-4"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> Reutilizable</span>
              </div>}
            </section>

            {[3, 7].includes(active) && <div className="ecosystem-caption">
              <span>UN NÚCLEO</span>
              <strong>Múltiples procesos.<br />La misma información.</strong>
            </div>}

            {[3, 7].includes(active) && modules.map((module) => (
              <button
                key={module.id}
                className={`module-node ${module.className}`}
                onClick={() => goTo(module.scene)}
                aria-label={`Explorar ${module.title}`}
              >
                <div className="module-header-row">
                  <span className="module-index">MÓDULO</span>
                  <span className="module-badge">● CONECTADO</span>
                </div>
                <strong>{module.title}</strong>
                <p>{module.copy}</p>
                <i aria-hidden="true">↗</i>
              </button>
            ))}

            {active === 4 && <section className="detail-node detail-proposals" aria-label="Gestión de propuestas">
              <button className="back-to-map" onClick={() => goTo(3)} aria-label="Volver al ecosistema">
                ← Volver al mapa de la plataforma
              </button>
              <div className="detail-heading">
                <span>01 / EL ORIGEN</span>
                <h2>Gestión de propuestas</h2>
                <p>El primer paso hacia la centralización de la información corporativa.</p>
              </div>
              <div className="before-after-grid">
                <article className="before-card">
                  <div className="card-badge badge-danger">✕ MODELO TRADICIONAL</div>
                  <h3>Cada propuesta seguía su propio camino</h3>
                  <ul className="impact-list">
                    <li><i /><span>Archivos dispersos en carpetas locales o correos</span></li>
                    <li><i /><span>Criterios y formatos heterogéneos sin estándar</span></li>
                    <li><i /><span>Aprobaciones informales u omitidas</span></li>
                  </ul>
                  <div className="card-footer-metric metric-danger">
                    <strong>ALTO RIESGO</strong>
                    <span>Sin trazabilidad central</span>
                  </div>
                </article>

                <div className="transformation-node">
                  <div className="transformation-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <span>HOSRIA</span>
                </div>

                <article className="after-card">
                  <div className="card-badge badge-success">✓ CON HOSRIA</div>
                  <h3>Un único lugar. Un flujo automático.</h3>
                  <ul className="impact-list">
                    <li><i /><span>Información centralizada identificada en el origen</span></li>
                    <li><i /><span>Aprobador identificado y notificado al instante</span></li>
                    <li><i /><span>Trazabilidad y auditoría completa en tiempo real</span></li>
                  </ul>
                  <div className="card-footer-metric metric-success">
                    <strong>100% CONTROL</strong>
                    <span>Centralización inmediata</span>
                  </div>
                </article>
              </div>
            </section>}

            {active === 5 && <section className="detail-node detail-reports" aria-label="Reportes requeridos">
              <button className="back-to-map" onClick={() => goTo(3)} aria-label="Volver al ecosistema">
                ← Volver al mapa de la plataforma
              </button>
              <div className="detail-heading">
                <span>02 / EL SIGUIENTE PASO</span>
                <h2>Reportes requeridos</h2>
                <p>Solicitar, responder y controlar desde un único flujo centralizado.</p>
              </div>
              <div className="report-workflow-visual">
                <div className="workflow-step">
                  <div className="step-header">
                    <span className="step-num">01</span>
                    <span className="step-badge">SOLICITUD</span>
                  </div>
                  <strong>Solicitud uniforme</strong>
                  <p>Sin cadenas de correos ni planillas sueltas.</p>
                  <span className="step-status">● Estandarizado</span>
                </div>

                <div className="workflow-connector">→</div>

                <div className="workflow-step">
                  <div className="step-header">
                    <span className="step-num">02</span>
                    <span className="step-badge">ALERTAS</span>
                  </div>
                  <strong>Recordatorios</strong>
                  <p>Seguimiento y avisos automáticos de vencimientos.</p>
                  <span className="step-status status-active"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>Programado</span>
                </div>

                <div className="workflow-connector">→</div>

                <div className="workflow-step">
                  <div className="step-header">
                    <span className="step-num">03</span>
                    <span className="step-badge">VALIDACIÓN</span>
                  </div>
                  <strong>Aprobación</strong>
                  <p>Control centralizado con firma de responsabilidad.</p>
                  <span className="step-status">✓ Auditado</span>
                </div>

                <div className="workflow-connector">→</div>

                <div className="workflow-step highlight-step">
                  <div className="step-header">
                    <span className="step-num">04</span>
                    <span className="step-badge badge-green">BI & DASHBOARD</span>
                  </div>
                  <strong>Visión 360°</strong>
                  <p>Indicadores unificados sobre una misma realidad.</p>
                  <span className="step-status status-green"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "inline-block", verticalAlign: "middle", marginRight: "4px" }}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>Tiempo real</span>
                </div>
              </div>
            </section>}

            {active === 6 && <section className="detail-node detail-communications" aria-label="Comunicaciones personalizadas">
              <button className="back-to-map" onClick={() => goTo(3)} aria-label="Volver al ecosistema">
                ← Volver al mapa de la plataforma
              </button>
              <div className="detail-heading">
                <span>03 / INFORMACIÓN DIRIGIDA</span>
                <h2>Comunicaciones</h2>
                <p>La información correcta llega únicamente a quien corresponde.</p>
              </div>
              <div className="communications-visual">
                <div className="upload-once">
                  <span>1×</span>
                  <div>
                    <strong>Subir una vez</strong>
                    <small>Información consolidada</small>
                  </div>
                </div>
                
                <svg className="distribution-svg" viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M 0 120 C 200 120, 300 32, 500 32" stroke="var(--deloitte-green)" strokeWidth="3" strokeDasharray="6 6" opacity="0.85" />
                  <path d="M 0 120 L 500 120" stroke="var(--deloitte-green)" strokeWidth="3" strokeDasharray="6 6" opacity="0.85" />
                  <path d="M 0 120 C 200 120, 300 208, 500 208" stroke="var(--deloitte-green)" strokeWidth="3" strokeDasharray="6 6" opacity="0.85" />
                  
                  <circle cx="500" cy="32" r="6" fill="var(--deloitte-green)" />
                  <circle cx="500" cy="120" r="6" fill="var(--deloitte-green)" />
                  <circle cx="500" cy="208" r="6" fill="var(--deloitte-green)" />
                </svg>

                <div className="audience-group">
                  <div className="audience"><span>Licencias</span></div>
                  <div className="audience"><span>Cursos</span></div>
                  <div className="audience"><span>Notificaciones</span></div>
                </div>
              </div>
              <blockquote>“Si ya lo sabemos,<br />no lo volvemos a pedir.”</blockquote>
            </section>}

            {active === 8 && <section className="outcomes-node" aria-label="Resultados de HOSRIA">
              <div className="outcomes-top-row">
                <span className="micro-label">EL RESULTADO</span>
                <span className="switch-scene-pill">Escena 9 / 10</span>
              </div>
              <h2>La información<br />se vuelve conocimiento.</h2>
              <div className="switch-divider" aria-hidden="true">
                <span className="switch-divider-line" />
                <span className="switch-divider-dot" style={{background: 'var(--deloitte-teal)', boxShadow: '0 0 14px var(--deloitte-teal)'}} />
                <span className="switch-divider-line" style={{background: 'linear-gradient(to left, rgba(0,163,224,0.1), rgba(0,163,224,0.5))'}} />
              </div>
              <div className="outcome-list">
                <div className="outcome-card">
                  <div className="outcome-card-header">
                    <span className="outcome-num">01</span>
                    <span className="outcome-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </span>
                  </div>
                  <strong>Menos burocracia</strong>
                  <span>Menos tareas repetidas y controles manuales. Los procesos fluyen solos.</span>
                  <div className="outcome-bar" />
                </div>
                <div className="outcome-card">
                  <div className="outcome-card-header">
                    <span className="outcome-num">02</span>
                    <span className="outcome-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                    </span>
                  </div>
                  <strong>Base corporativa</strong>
                  <span>La organización construye una memoria común. El saber no se pierde.</span>
                  <div className="outcome-bar" />
                </div>
                <div className="outcome-card">
                  <div className="outcome-card-header">
                    <span className="outcome-num">03</span>
                    <span className="outcome-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                    </span>
                  </div>
                  <strong>Datos confiables</strong>
                  <span>Indicadores y dashboards sobre una misma realidad. Sin versiones paralelas.</span>
                  <div className="outcome-bar" />
                </div>
                <div className="outcome-card outcome-card-highlight">
                  <div className="outcome-card-header">
                    <span className="outcome-num">04</span>
                    <span className="outcome-icon outcome-icon-highlight">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </span>
                  </div>
                  <strong>Mejores decisiones</strong>
                  <span>El conocimiento llega donde genera valor. En el momento exacto.</span>
                  <div className="outcome-bar outcome-bar-green" />
                </div>
              </div>
            </section>}

            {active === 9 && <div className="final-pillars-node" aria-label="Cierre estratégico HOSRIA">
              <div className="final-top">
                <span className="micro-label">UNA ÚNICA VERDAD</span>
                <span className="final-scene-pill">Escena 10 / 10</span>
              </div>
              <div className="final-brand-block">
                <span className="final-brand-logo">HOSRIA<i /></span>
                <p className="final-brand-sub">Una única verdad para todos los procesos de la organización.</p>
              </div>
              <div className="final-metrics">
                <div className="final-metric">
                  <strong>3</strong>
                  <span>Módulos integrados</span>
                </div>
                <div className="final-metric-divider" />
                <div className="final-metric">
                  <strong>1×</strong>
                  <span>Dato único, siempre</span>
                </div>
                <div className="final-metric-divider" />
                <div className="final-metric">
                  <strong>360°</strong>
                  <span>Visión ejecutiva en tiempo real</span>
                </div>
                <div className="final-metric-divider" />
                <div className="final-metric">
                  <strong>0</strong>
                  <span>Duplicados o inconsistencias</span>
                </div>
              </div>
              <div className="final-pillars-grid">
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    </span>
                    <strong>Información Única</strong>
                  </div>
                  <span>Cero datos duplicados o dispersos entre áreas</span>
                </div>
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
                    </span>
                    <strong>Procesos Conectados</strong>
                  </div>
                  <span>Trazabilidad y flujo automático en tiempo real</span>
                </div>
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                    <strong>Dato Gobernado</strong>
                  </div>
                  <span>Reglas de negocio y accesos estandarizados</span>
                </div>
                <div className="pillar-card">
                  <div className="pillar-header">
                    <span className="pillar-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
                    </span>
                    <strong>Conocimiento Directivo</strong>
                  </div>
                  <span>Toma de decisiones respaldada por una sola realidad</span>
                </div>
              </div>
              <div className="final-cta-row">
                <button className="final-cta-btn" onClick={() => goTo(0)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.5"/></svg>
                  Volver al inicio
                </button>
                <div className="final-deloitte-brand">
                  <span>Presentado por</span>
                  <strong>Deloitte<span>.</span></strong>
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>

      {/* Fixed overlay: Reveal info panel (Scene 2) */}
      {active === 1 && (
        <aside className="reveal-overlay" aria-label="Introducción a HOSRIA">
          <span className="micro-label">EL NÚCLEO</span>
          <h3>Nace HOSRIA</h3>
          <p>Un repositorio único de información con reglas de negocio y acceso estandarizado para toda la organización.</p>
          <div className="reveal-stats">
            <div className="reveal-stat">
              <strong>3</strong>
              <span>Módulos</span>
            </div>
            <div className="reveal-stat-div" />
            <div className="reveal-stat">
              <strong>1×</strong>
              <span>Fuente de verdad</span>
            </div>
            <div className="reveal-stat-div" />
            <div className="reveal-stat">
              <strong>0</strong>
              <span>Duplicados</span>
            </div>
          </div>
          <button className="reveal-next-btn" onClick={() => goTo(2)}>
            Ver gobernanza <span>→</span>
          </button>
        </aside>
      )}

      {/* Fixed overlay: Governance panel (Scene 3) */}
      {active === 2 && (
        <aside className="governance-overlay" aria-label="Gobernanza de datos HOSRIA">
          <div className="gov-top">
            <span className="micro-label">LA IDEA CENTRAL</span>
            <span className="switch-scene-pill">Escena 3 / 10</span>
          </div>
          <h3>Gobernanza<br />de datos.</h3>
          <p>Un dato ingresa una vez y se propaga con reglas claras a todos los procesos que lo necesitan.</p>
          <div className="gov-principles">
            <div className="gov-principle">
              <span className="gov-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </span>
              <div>
                <strong>Gobernado</strong>
                <span>Reglas de negocio y responsables definidos</span>
              </div>
            </div>
            <div className="gov-principle">
              <span className="gov-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </span>
              <div>
                <strong>Automatizado</strong>
                <span>Flujos sin intervención manual repetitiva</span>
              </div>
            </div>
            <div className="gov-principle">
              <span className="gov-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              </span>
              <div>
                <strong>Única verdad</strong>
                <span>Una sola fuente de datos, sin duplicados</span>
              </div>
            </div>
            <div className="gov-principle">
              <span className="gov-icon gov-icon-green">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </span>
              <div>
                <strong>Reutilizable</strong>
                <span>Cada proceso consume la misma fuente</span>
              </div>
            </div>
          </div>
          <button className="reveal-next-btn" onClick={() => goTo(3)}>
            Ver el ecosistema <span>→</span>
          </button>
        </aside>
      )}

      <nav className="presentation-nav" aria-label="Controles de la presentación">
        <button onClick={previous} disabled={active === 0} aria-label="Concepto anterior">←</button>
        <div className="progress-track" aria-label={`Paso ${active + 1} de ${scenes.length}`}>
          {scenes.map((scene, index) => (
            <button
              key={scene.id}
              className={index === active ? "active" : index < active ? "visited" : ""}
              onClick={() => goTo(index)}
              aria-label={`Ir a ${scene.title}`}
            >
              <i />
              <span className="nav-tooltip">{scene.title}</span>
            </button>
          ))}
        </div>
        <span className="step-count"><b>{String(active + 1).padStart(2, "0")}</b> / {String(scenes.length).padStart(2, "0")}</span>
        <button onClick={next} disabled={active === scenes.length - 1} aria-label="Siguiente concepto">→</button>
      </nav>

      <div className="navigation-hint">Usá las flechas, el scroll o los puntos para navegar</div>

      {showShortcuts && (
        <div className="modal-backdrop" onClick={() => setShowShortcuts(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>⌨ Atajos de Teclado del Orador</h3>
              <button className="modal-close" onClick={() => setShowShortcuts(false)} aria-label="Cerrar guía">×</button>
            </div>
            <div className="modal-body">
              <div className="shortcut-row">
                <div className="shortcut-keys"><kbd>→</kbd> <kbd>Espacio</kbd> <kbd>PageDown</kbd></div>
                <span>Avanzar a la siguiente escena</span>
              </div>
              <div className="shortcut-row">
                <div className="shortcut-keys"><kbd>←</kbd> <kbd>PageUp</kbd></div>
                <span>Retroceder a la escena anterior</span>
              </div>
              <div className="shortcut-row">
                <div className="shortcut-keys"><kbd>Home</kbd> / <kbd>End</kbd></div>
                <span>Ir al inicio o al cierre de la presentación</span>
              </div>
              <div className="shortcut-row">
                <div className="shortcut-keys"><kbd>F</kbd> / <kbd>F11</kbd></div>
                <span>Activar/Desactivar pantalla completa inmersiva</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

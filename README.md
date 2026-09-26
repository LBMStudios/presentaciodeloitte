# HOSRIA — CORE ECOSYSTEM SPATIAL STORY
### INTERACTIVE SPATIAL CANVAS & SINGLE SOURCE OF TRUTH PLATFORM
`DELOITTE / HEALTHCARE DATA ECOSYSTEM` · `LBM STUDIOS ARCHIVE 01/06`

```text
┌─────────────────────────────────────────────────────────────────────────┐
│ CASE STUDY: 01/06                                                       │
│ PROJECT:    HOSRIA — SPATIAL PRESENTATION & ARCHITECTURE PLATFORM       │
│ CLIENT:     DELOITTE                                                    │
│ ROLE:       CREATIVE TECHNOLOGIST & FORWARD DEPLOYED SYSTEMS ARCHITECT  │
│ STACK:      REACT 19 · TYPESCRIPT · NEXT.JS 16 · VITEST · CLOUDFLARE    │
│ STATUS:     PRODUCTION VERIFIED / LIVE DEMO                             │
└─────────────────────────────────────────────────────────────────────────┘
```

> **Live Production Demo:**  
> 🔗 [https://hosira-presentacion.lbmstudios.chatgpt.site](https://hosira-presentacion.lbmstudios.chatgpt.site)

---

## 01 // OVERVIEW & NARRATIVE ARCHITECTURE

**HOSRIA** is an enterprise-scale spatial narrative interface designed to dismantle informational silos. Rather than presenting fragmented slide decks, the platform models an entire organizational ecosystem on a continuous **6,200 × 4,300 px spatial coordinate plane**.

The visual narrative guides enterprise stakeholders from chaotic, isolated data repositories toward a **Single Source of Truth** governed by HOSRIA:

```
[ UNSTRUCTURED DATA ] ──┐
[ CLINICAL SILOS    ] ──┼──▶ [ HOSRIA CORE ENGINE ] ──▶ [ GOVERNED KNOWLEDGE ]
[ BILLING FRAGMENTS ] ──┘         (Single Source)             (Executive BI)
```

### Core Strategic Axioms
- **No Slide Swapping:** The viewport moves through 10 spatial scenes using hardware-accelerated CSS `matrix3d()` and custom camera transitions.
- **Zero Heavy Animation Bloat:** 100% native CSS orchestration and reactive React 19 state — zero GSAP or Framer Motion bloat.
- **Deep Linking & Hash Routing:** Every scene is individually addressable (e.g. `#ecosystem`, `#communications`, `#governance`).
- **Autonomous & Self-Contained:** Zero third-party telemetry, zero external database locks, zero credential leakage. Ready for Cloudflare Workers edge deployment.

---

## 02 // TECHNICAL MATRIX

| Dimension | Specification |
|:---|:---|
| **Framework** | React 19 + Next.js 16 (App Router) |
| **Language** | TypeScript (Strict Mode) |
| **Bundler / Runtime** | Vite + Vinext / Node.js 22+ |
| **Canvas Dimensions** | 6,200px width × 4,300px height coordinate space |
| **Navigation Controls** | Keyboard (Arrows/PageUp/PageDown/Space), Trackpad / Wheel, Touch Gestures, Direct Matrix Dots, Fullscreen API |
| **Deployment Target** | Cloudflare Workers / Edge SSR / Static SPA |
| **Verification Gate** | Lint (`npm run lint`), Unit Tests (`npm test`), Production Build (`npm run build`) |

---

## 03 // SPATIAL CANVAS ENGINE & COORDINATES

The presentation does not load separate pages. It positions camera coordinates `(x, y, scale)` dynamically across the spatial plane:

```typescript
// app/page.tsx — Spatial Scene Registry
interface SceneCoordinate {
  id: string;
  title: string;
  x: number;
  y: number;
  scale: number;
  hash: string;
}
```

```
 (0,0) ┌─────────────────────────────────────────────────────────┐
       │ Scene 01: Context & Chaos                               │
       │                               Scene 03: Modules         │
       │         Scene 02: HOSRIA Core                           │
       │                                                         │
       │ Scene 04: Flow & Governance                             │
       │                               Scene 10: Executive Close │
       └─────────────────────────────────────────────── (6200,4300)
```

---

## 04 // REPOSITORY STRUCTURE

```text
├── app/
│   ├── globals.css          # Spatial coordinate grid, fluid typography, theme variables
│   ├── layout.tsx           # Semantic HTML5 root, metadata, viewport configuration
│   ├── page.tsx             # 10-scene state machine, camera matrix, dynamic SVG flows
│   └── test/                # Unit test suites and navigation verification
├── docs/
│   ├── 01_CONTEXTO_ESTRATEGICO.md   # Enterprise problem definition & stakeholder brief
│   ├── 02_GUION_Y_RECORRIDO.md       # Speaker narration script & scene transitions
│   ├── 03_DISENO_Y_NAVEGACION.md     # Spatial layout math & a11y keyboard controls
│   ├── 04_ROADMAP_Y_PENDIENTES.md    # Future evolutions & interactive module roadmap
│   └── 05_REFERENCIAS.md            # Conceptual benchmarks & Deloitte brand references
├── public/                  # High-density SVG assets & vector schemas
├── package.json             # React 19 + TypeScript + Vite toolchain
└── tsconfig.json            # Strict TypeScript configuration
```

---

## 05 // LOCAL DEVELOPMENT & VERIFICATION

### Prerequisites
- Node.js `22.13.0` or higher
- npm `10.0.0` or higher

```bash
# 1. Clone repository
git clone https://github.com/LBMStudios/presentaciodeloitte.git
cd presentaciodeloitte

# 2. Install dependencies
npm ci

# 3. Start local development server
npm run dev
```

### Verification Gate
```bash
# Static analysis & linting
npm run lint

# Automated test suite
npm test

# Production build compilation
npm run build
```

---

## 06 // KEYBOARD & ACCESSIBILITY CONTROLS

- `Space` / `ArrowRight` / `PageDown`: Advance to next spatial coordinate.
- `ArrowLeft` / `PageUp`: Return to previous scene.
- `Home` / `End`: Jump to Genesis Scene / Strategic Synthesis Scene.
- `F`: Toggle native browser Fullscreen mode.
- `Numeric / Direct Dots`: Direct jump to any of the 10 architecture chapters.

---

```text
© 2026 LBM STUDIOS // LUCAS BEATHYATE MASCHERINI. ALL RIGHTS RESERVED.
DESIGNED FOR DELOITTE HEALTHCARE SYSTEMS ARCHITECTURE.
```

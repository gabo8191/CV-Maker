<div align="center">
  <h1>📄 CV-Maker</h1>
  <p><strong>Build an elegant résumé with live preview and one-click PDF export.</strong></p>
  <p>Dynamic inputs · add experience & sections on the fly · no sign-up · 100% in your browser.</p>

  <p>
    <a href="https://github.com/gabo8191/CV-Maker/actions/workflows/ci.yml">
      <img src="https://github.com/gabo8191/CV-Maker/actions/workflows/ci.yml/badge.svg" alt="CI" />
    </a>
    <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT" /></a>
    <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React 18" />
    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  </p>

  <p><a href="https://gabo8191.github.io/CV-Maker/"><strong>▶ Live demo</strong></a></p>
</div>

---

**CV-Maker** is a free, open source résumé builder. It started as a way to turn a
carefully crafted LaTeX CV into something anyone can reuse **without touching LaTeX**:
you fill in friendly form fields, watch an elegant A4 preview update in real time, and
export a crisp, vector PDF with a single click.

Everything runs **client-side** — your data never leaves your browser (it's saved to
`localStorage`), and you can export/import it as JSON to back it up or move between
devices.

## ✨ Features

- 🧩 **Fully dynamic** — add, remove and reorder sections and entries on the fly.
- 🪄 **Three section types**: timeline **entries** (experience / education), **skills**
  groups, and free **text blocks** — combine them however you like.
- 👀 **Live A4 preview** with a clean, classic résumé aesthetic.
- 🖨️ **One-click PDF** — exports through the browser's print engine, so the text stays
  selectable and vector-sharp (and matches the preview exactly).
- 💾 **Auto-save** to `localStorage` + **Export / Import JSON** to back up your data.
- 📱 **Responsive** — edit and preview side by side on desktop, tabbed on mobile.
- 🔒 **Private by design** — no backend, no accounts, no tracking.

## 🚀 Getting started

```bash
git clone git@github.com:gabo8191/CV-Maker.git
cd CV-Maker

npm install
npm run dev        # http://localhost:5173
```

The app opens pre-filled with an example CV so you can see every section in action.
Edit the fields, reorder things, and hit **Download PDF** when you're happy.

## 📦 Build

```bash
npm run build      # outputs static site to dist/
npm run preview    # preview the production build locally
```

The build is a fully static site — host it anywhere (GitHub Pages, Netlify, Vercel,
or any static file server).

## 🖨️ How PDF export works

The **Download PDF** button calls the browser's print dialog with a print-specific
stylesheet (`@media print`) that hides the editor UI and renders only the A4 preview
at full size. Choose **“Save as PDF”** as the destination and you get a vector PDF with
selectable text — identical to what you see on screen. No server, no rasterization, no
external services.

> Tip: in the print dialog, set margins to *Default* (or *None*) and enable
> *Background graphics* if your browser strips section rules.

## 🧱 Tech stack

| Layer    | Tech                                  |
| -------- | ------------------------------------- |
| UI       | **React 18** + **TypeScript**         |
| Build    | **Vite 6**                            |
| Styling  | **Tailwind CSS 4**                    |
| Storage  | Browser **localStorage** + JSON files |
| PDF      | Native browser print (`@media print`) |

## 🗂️ Project structure

```
src/
├── App.tsx                # Estado, persistencia y layout editor/preview
├── components/
│   ├── Editor.tsx         # Formulario dinámico (secciones + entries + skills)
│   ├── Preview.tsx        # Hoja A4 renderizada desde los datos
│   └── ui.tsx             # Inputs y botones reutilizables
├── lib/
│   ├── types.ts           # Modelo de datos del CV
│   └── defaultData.ts     # CV de ejemplo (plantilla)
└── index.css              # Tailwind + estilos de impresión
```

## 🤝 Contributing

Contributions are welcome! Some ideas: more preview themes, drag-and-drop reordering,
multiple page support, or extra section types.

1. Fork and create a branch: `git checkout -b feat/my-idea`.
2. Make sure checks pass: `npm run format:check && npm run lint && npm run build`.
3. Open a Pull Request describing your change.

## 📄 License

MIT — © Gabriel Castillo ([@gabo8191](https://github.com/gabo8191))

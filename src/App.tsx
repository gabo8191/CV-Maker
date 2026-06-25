import { useEffect, useRef, useState } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Button } from './components/ui';
import { defaultData } from './lib/defaultData';
import type { CVData } from './lib/types';

const STORAGE_KEY = 'cv-maker:data';

function loadInitial(): CVData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as CVData;
  } catch {
    // datos corruptos: se ignora y se usa el ejemplo
  }
  return defaultData;
}

export default function App() {
  const [data, setDataState] = useState<CVData>(loadInitial);
  const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  // Autoguardado en localStorage (con marca de "guardado" para tranquilidad).
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSavedAt(Date.now());
  }, [data]);

  const setData = (updater: (prev: CVData) => CVData) =>
    setDataState((prev) => updater(prev));

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cv-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CVData;
        if (!parsed.name || !Array.isArray(parsed.sections)) {
          throw new Error('Invalid file');
        }
        setDataState(parsed);
      } catch {
        alert('That file is not a valid CV-Maker JSON export.');
      }
    };
    reader.readAsText(file);
  };

  const reset = () => {
    if (
      confirm('Reset to the example CV? Your current changes will be lost.')
    ) {
      setDataState(defaultData);
    }
  };

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-zinc-100">
      {/* ── Barra superior ── */}
      <header className="no-print sticky top-0 z-10 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800 bg-zinc-950/90 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-lg">📄</span>
          <h1 className="text-base font-semibold">
            CV-Maker
            <span className="ml-2 hidden text-xs font-normal text-zinc-500 sm:inline">
              elegant résumé builder
            </span>
          </h1>
          {savedAt && (
            <span
              title="Tus cambios se guardan automáticamente en este navegador"
              className="hidden items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400 sm:inline-flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Guardado
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInput}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) importJson(f);
              e.target.value = '';
            }}
          />
          <Button onClick={() => fileInput.current?.click()}>
            Import JSON
          </Button>
          <Button onClick={exportJson}>Export JSON</Button>
          <Button variant="danger" onClick={reset}>
            Reset
          </Button>
          <Button variant="primary" onClick={() => window.print()}>
            ⬇ Download PDF
          </Button>
        </div>
      </header>

      {/* ── Selector móvil ── */}
      <div className="no-print flex border-b border-zinc-800 lg:hidden">
        {(['edit', 'preview'] as const).map((v) => (
          <button
            key={v}
            onClick={() => setMobileView(v)}
            className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${
              mobileView === v
                ? 'border-b-2 border-violet-500 text-white'
                : 'text-zinc-500'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* ── Contenido ── */}
      <main className="flex flex-1 overflow-hidden">
        {/* Editor */}
        <div
          className={`no-print w-full overflow-y-auto border-r border-zinc-800 px-4 py-6 lg:block lg:w-[46%] ${
            mobileView === 'edit' ? 'block' : 'hidden'
          }`}
        >
          <div className="mx-auto max-w-xl">
            <Editor data={data} setData={setData} />
          </div>
        </div>

        {/* Preview */}
        <div
          className={`print-area w-full overflow-y-auto bg-zinc-800/40 px-4 py-6 lg:block lg:w-[54%] ${
            mobileView === 'preview' ? 'block' : 'hidden'
          }`}
        >
          <Preview data={data} />
        </div>
      </main>
    </div>
  );
}

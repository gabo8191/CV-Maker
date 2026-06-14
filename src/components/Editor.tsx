import type { CVData, EntryItem, Section, SkillGroup } from '../lib/types';
import { uid } from '../lib/defaultData';
import { Button, Field, TextArea } from './ui';

type Props = {
  data: CVData;
  setData: (updater: (prev: CVData) => CVData) => void;
};

// ── Iconos mínimos ────────────────────────────────────────────────────
const Up = () => <span aria-hidden>↑</span>;
const Down = () => <span aria-hidden>↓</span>;
const Trash = () => <span aria-hidden>✕</span>;
const Plus = () => <span aria-hidden>＋</span>;

function move<T>(arr: T[], index: number, dir: -1 | 1): T[] {
  const next = [...arr];
  const target = index + dir;
  if (target < 0 || target >= next.length) return next;
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export default function Editor({ data, setData }: Props) {
  // Helpers de actualización inmutable
  const setField = (key: keyof CVData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const updateSection = (id: string, patch: Partial<Section>) =>
    setData((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === id ? ({ ...s, ...patch } as Section) : s,
      ),
    }));

  const removeSection = (id: string) =>
    setData((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== id),
    }));

  const moveSection = (index: number, dir: -1 | 1) =>
    setData((prev) => ({ ...prev, sections: move(prev.sections, index, dir) }));

  const addSection = (kind: Section['kind']) =>
    setData((prev) => {
      const base = { id: uid() };
      const section: Section =
        kind === 'entries'
          ? { ...base, kind, title: 'New Section', items: [] }
          : kind === 'skills'
            ? { ...base, kind, title: 'Skills', groups: [] }
            : { ...base, kind, title: 'New Section', body: '' };
      return { ...prev, sections: [...prev.sections, section] };
    });

  return (
    <div className="space-y-8">
      {/* ── Datos personales ── */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
          Personal details
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Full name"
            value={data.name}
            onChange={(v) => setField('name', v)}
          />
          <Field
            label="Role / title"
            value={data.role}
            onChange={(v) => setField('role', v)}
          />
          <Field
            label="Location"
            value={data.location}
            onChange={(v) => setField('location', v)}
          />
          <Field
            label="Email"
            value={data.email}
            onChange={(v) => setField('email', v)}
          />
          <Field
            label="Phone"
            value={data.phone}
            onChange={(v) => setField('phone', v)}
          />
          <Field
            label="Website"
            value={data.website}
            onChange={(v) => setField('website', v)}
          />
          <Field
            label="LinkedIn"
            value={data.linkedin}
            onChange={(v) => setField('linkedin', v)}
          />
          <Field
            label="GitHub"
            value={data.github}
            onChange={(v) => setField('github', v)}
          />
        </div>
        <TextArea
          label="Professional summary"
          value={data.summary}
          rows={4}
          onChange={(v) => setField('summary', v)}
        />
      </section>

      {/* ── Secciones dinámicas ── */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
          Sections
        </h2>

        {data.sections.map((section, index) => (
          <div
            key={section.id}
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
          >
            <div className="mb-3 flex items-center gap-2">
              <input
                value={section.title}
                onChange={(e) =>
                  updateSection(section.id, { title: e.target.value })
                }
                className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-sm font-semibold text-zinc-100 outline-none focus:border-violet-500"
              />
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-zinc-500">
                {section.kind}
              </span>
              <Button title="Move up" onClick={() => moveSection(index, -1)}>
                <Up />
              </Button>
              <Button title="Move down" onClick={() => moveSection(index, 1)}>
                <Down />
              </Button>
              <Button
                variant="danger"
                title="Remove section"
                onClick={() => removeSection(section.id)}
              >
                <Trash />
              </Button>
            </div>

            {section.kind === 'entries' && (
              <EntriesEditor
                section={section}
                onChange={(items) =>
                  updateSection(section.id, { items } as Partial<Section>)
                }
              />
            )}
            {section.kind === 'skills' && (
              <SkillsEditor
                section={section}
                onChange={(groups) =>
                  updateSection(section.id, { groups } as Partial<Section>)
                }
              />
            )}
            {section.kind === 'text' && (
              <TextArea
                label="Content"
                rows={4}
                value={section.body}
                onChange={(v) =>
                  updateSection(section.id, { body: v } as Partial<Section>)
                }
              />
            )}
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => addSection('entries')}>
            <Plus /> Experience / Education
          </Button>
          <Button onClick={() => addSection('skills')}>
            <Plus /> Skills
          </Button>
          <Button onClick={() => addSection('text')}>
            <Plus /> Text block
          </Button>
        </div>
      </section>
    </div>
  );
}

// ── Editor de entradas (experiencia / educación) ──────────────────────
function EntriesEditor({
  section,
  onChange,
}: {
  section: Extract<Section, { kind: 'entries' }>;
  onChange: (items: EntryItem[]) => void;
}) {
  const update = (id: string, patch: Partial<EntryItem>) =>
    onChange(
      section.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    );

  const add = () =>
    onChange([
      ...section.items,
      {
        id: uid(),
        heading: '',
        subheading: '',
        date: '',
        location: '',
        bullets: [''],
      },
    ]);

  return (
    <div className="space-y-3">
      {section.items.map((item, index) => (
        <div
          key={item.id}
          className="rounded-lg border border-zinc-800 bg-zinc-900/60 p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Entry {index + 1}</span>
            <div className="flex gap-1.5">
              <Button
                title="Move up"
                onClick={() => onChange(move(section.items, index, -1))}
              >
                <Up />
              </Button>
              <Button
                title="Move down"
                onClick={() => onChange(move(section.items, index, 1))}
              >
                <Down />
              </Button>
              <Button
                variant="danger"
                title="Remove entry"
                onClick={() =>
                  onChange(section.items.filter((it) => it.id !== item.id))
                }
              >
                <Trash />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Field
              label="Heading (role / degree)"
              value={item.heading}
              onChange={(v) => update(item.id, { heading: v })}
            />
            <Field
              label="Subheading (company / school)"
              value={item.subheading}
              onChange={(v) => update(item.id, { subheading: v })}
            />
            <Field
              label="Date"
              value={item.date}
              onChange={(v) => update(item.id, { date: v })}
            />
            <Field
              label="Location"
              value={item.location}
              onChange={(v) => update(item.id, { location: v })}
            />
          </div>
          <div className="mt-2 space-y-1.5">
            <span className="text-xs font-medium text-zinc-400">Bullets</span>
            {item.bullets.map((b, bi) => (
              <div key={bi} className="flex gap-1.5">
                <input
                  value={b}
                  onChange={(e) =>
                    update(item.id, {
                      bullets: item.bullets.map((x, i) =>
                        i === bi ? e.target.value : x,
                      ),
                    })
                  }
                  placeholder="Achievement or responsibility…"
                  className="flex-1 rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-1.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-600 focus:border-violet-500"
                />
                <Button
                  variant="danger"
                  title="Remove bullet"
                  onClick={() =>
                    update(item.id, {
                      bullets: item.bullets.filter((_, i) => i !== bi),
                    })
                  }
                >
                  <Trash />
                </Button>
              </div>
            ))}
            <Button
              onClick={() =>
                update(item.id, { bullets: [...item.bullets, ''] })
              }
            >
              <Plus /> Bullet
            </Button>
          </div>
        </div>
      ))}
      <Button onClick={add}>
        <Plus /> Add entry
      </Button>
    </div>
  );
}

// ── Editor de skills ──────────────────────────────────────────────────
function SkillsEditor({
  section,
  onChange,
}: {
  section: Extract<Section, { kind: 'skills' }>;
  onChange: (groups: SkillGroup[]) => void;
}) {
  return (
    <div className="space-y-2">
      {section.groups.map((g, index) => (
        <div
          key={g.id}
          className="flex flex-col gap-2 sm:flex-row sm:items-end"
        >
          <div className="sm:w-40">
            <Field
              label="Label"
              value={g.label}
              onChange={(v) =>
                onChange(
                  section.groups.map((x) =>
                    x.id === g.id ? { ...x, label: v } : x,
                  ),
                )
              }
            />
          </div>
          <div className="flex-1">
            <Field
              label="Value (comma separated)"
              value={g.value}
              onChange={(v) =>
                onChange(
                  section.groups.map((x) =>
                    x.id === g.id ? { ...x, value: v } : x,
                  ),
                )
              }
            />
          </div>
          <Button
            variant="danger"
            title="Remove group"
            onClick={() =>
              onChange(section.groups.filter((_, i) => i !== index))
            }
          >
            <Trash />
          </Button>
        </div>
      ))}
      <Button
        onClick={() =>
          onChange([...section.groups, { id: uid(), label: '', value: '' }])
        }
      >
        <Plus /> Skill group
      </Button>
    </div>
  );
}

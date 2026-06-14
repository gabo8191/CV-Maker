import type { CVData, Section } from '../lib/types';

function ContactBar({ data }: { data: CVData }) {
  const parts = [
    data.location,
    data.email,
    data.phone,
    data.website,
    data.linkedin,
    data.github,
  ].filter(Boolean);

  return (
    <div className="mt-1 text-center text-[10.5px] leading-relaxed text-zinc-700">
      {parts.map((p, i) => (
        <span key={p}>
          {i > 0 && <span className="mx-1.5 text-zinc-400">|</span>}
          {p}
        </span>
      ))}
    </div>
  );
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="mt-4 mb-1.5 border-b border-zinc-400 pb-0.5 text-[12px] font-bold uppercase tracking-wide text-zinc-900">
      {children}
    </h2>
  );
}

function SectionView({ section }: { section: Section }) {
  if (section.kind === 'text') {
    if (!section.title && !section.body) return null;
    return (
      <section>
        <SectionTitle>{section.title}</SectionTitle>
        <p className="text-[11px] leading-snug text-zinc-800">{section.body}</p>
      </section>
    );
  }

  if (section.kind === 'skills') {
    return (
      <section>
        <SectionTitle>{section.title}</SectionTitle>
        <div className="space-y-0.5">
          {section.groups.map((g) => (
            <p key={g.id} className="text-[11px] leading-snug text-zinc-800">
              {g.label && (
                <span className="font-bold text-zinc-900">{g.label}: </span>
              )}
              {g.value}
            </p>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section>
      <SectionTitle>{section.title}</SectionTitle>
      <div className="space-y-2">
        {section.items.map((item) => (
          <div key={item.id}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-[11.5px] font-bold text-zinc-900">
                {item.heading}
              </span>
              <span className="shrink-0 text-[10.5px] text-zinc-700">
                {item.date}
              </span>
            </div>
            {(item.subheading || item.location) && (
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[11px] italic text-zinc-700">
                  {item.subheading}
                </span>
                <span className="shrink-0 text-[10.5px] text-zinc-600">
                  {item.location}
                </span>
              </div>
            )}
            {item.bullets.filter(Boolean).length > 0 && (
              <ul className="mt-0.5 list-disc space-y-0.5 pl-4 marker:text-zinc-500">
                {item.bullets.filter(Boolean).map((b, i) => (
                  <li
                    key={i}
                    className="text-[10.5px] leading-snug text-zinc-800"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Preview({ data }: { data: CVData }) {
  return (
    <div
      className="cv-paper mx-auto bg-white px-10 py-9 text-zinc-900 shadow-2xl"
      style={{ width: '210mm', minHeight: '297mm' }}
    >
      <header className="text-center">
        <h1 className="text-[22px] font-bold uppercase tracking-wide text-zinc-900">
          {data.name}
        </h1>
        {data.role && (
          <p className="text-[12px] font-medium text-zinc-600">{data.role}</p>
        )}
        <ContactBar data={data} />
      </header>

      {data.summary && (
        <section>
          <SectionTitle>Professional Summary</SectionTitle>
          <p className="text-[11px] leading-snug text-zinc-800">
            {data.summary}
          </p>
        </section>
      )}

      {data.sections.map((section) => (
        <SectionView key={section.id} section={section} />
      ))}
    </div>
  );
}

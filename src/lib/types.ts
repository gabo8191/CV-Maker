// Modelo de datos del CV. Las secciones son dinámicas y ordenables.

export type EntryItem = {
  id: string;
  /** Cargo, título académico o encabezado de la entrada. */
  heading: string;
  /** Empresa, institución o subtítulo. */
  subheading: string;
  /** Rango de fechas (texto libre, ej. "Jul. 2025 – Present"). */
  date: string;
  /** Ubicación o nota a la derecha (ej. "Remote"). */
  location: string;
  /** Viñetas / logros. */
  bullets: string[];
};

export type SkillGroup = {
  id: string;
  label: string;
  value: string;
};

export type Section =
  | {
      id: string;
      kind: 'entries';
      title: string;
      items: EntryItem[];
    }
  | {
      id: string;
      kind: 'skills';
      title: string;
      groups: SkillGroup[];
    }
  | {
      id: string;
      kind: 'text';
      title: string;
      body: string;
    };

export type SectionKind = Section['kind'];

export type CVData = {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  sections: Section[];
};

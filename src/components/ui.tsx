import type {
  ReactNode,
  TextareaHTMLAttributes,
  InputHTMLAttributes,
} from 'react';

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export function Field({ label, value, onChange, ...rest }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-400">
        {label}
      </span>
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-sm text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-500 focus:bg-zinc-800"
      />
    </label>
  );
}

type AreaProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'value' | 'onChange'>;

export function TextArea({ label, value, onChange, ...rest }: AreaProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-zinc-400">
        {label}
      </span>
      <textarea
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-lg border border-zinc-700 bg-zinc-800/60 px-3 py-2 text-sm leading-relaxed text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-500 focus:bg-zinc-800"
      />
    </label>
  );
}

type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'ghost' | 'danger';
  title?: string;
  type?: 'button' | 'submit';
  className?: string;
};

export function Button({
  children,
  onClick,
  variant = 'ghost',
  title,
  type = 'button',
  className = '',
}: BtnProps) {
  const styles: Record<string, string> = {
    primary:
      'bg-zinc-100 text-zinc-900 hover:bg-white border border-transparent',
    ghost:
      'text-zinc-300 border border-zinc-700 hover:border-zinc-500 hover:text-white',
    danger:
      'text-red-300/80 border border-transparent hover:border-red-500/40 hover:text-red-300',
  };
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

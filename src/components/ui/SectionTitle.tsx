type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({ eyebrow, title, subtitle }: Props) {
  return (
    <div className="reveal mb-10 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.2em] text-orange-400/90">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold leading-tight md:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-slate-300/90 md:text-lg">{subtitle}</p>}
    </div>
  );
}
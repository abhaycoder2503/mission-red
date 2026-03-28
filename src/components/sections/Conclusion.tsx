import SectionTitle from '../ui/SectionTitle';

const stats = [
  { k: '225M km', v: 'Average Earth-Mars distance' },
  { k: '4.5–7 months', v: 'Typical mission transfer window' },
  { k: '20+ min', v: 'Potential communication delay' },
];

export default function Conclusion() {
  return (
    <section id="conclusion" className="section-shell">
      <SectionTitle
        eyebrow="Final Log"
        title="Mission Complete — The Red Frontier Awaits"
        subtitle="From launch dynamics to autonomous exploration, every phase proves how design, engineering, and curiosity move humanity forward."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((s) => (
          <article key={s.k} className="reveal rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-2xl font-semibold text-orange-400">{s.k}</p>
            <p className="mt-2 text-slate-300">{s.v}</p>
          </article>
        ))}
      </div>

      <div className="reveal mt-10 flex flex-wrap gap-3">
        <button
          onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
          className="rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-black hover:opacity-90 transition-opacity"
        >
          Replay Journey
        </button>
        <a
          href="#"
          className="rounded-full border border-white/20 px-5 py-2 text-sm text-white/90 hover:bg-white/10"
        >
          View Source
        </a>
      </div>
    </section>
  );
}
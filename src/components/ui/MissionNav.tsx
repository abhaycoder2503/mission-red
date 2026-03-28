type Section = { id: string; label: string };

type Props = {
  sections: Section[];
  activeId: string;
};

export default function MissionNav({ sections, activeId }: Props) {
  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop */}
      <nav
        aria-label="Mission Sections"
        className="hidden lg:fixed lg:right-10 lg:top-1/2 lg:z-40 lg:block lg:-translate-y-1/2"
      >
        <ul className="space-y-6">
          {sections.map((s) => {
            const active = activeId === s.id;
            return (
              <li key={s.id} className="group relative flex items-center justify-end gap-4">
                <span className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                    active ? 'translate-x-0 opacity-100 text-orange-400' : 'translate-x-4 opacity-0 text-white/40'
                }`}>
                  {s.label}
                </span>
                <button
                  onClick={() => jump(s.id)}
                  aria-label={s.label}
                  className={`relative h-1 w-8 transition-all duration-500 ${
                    active ? 'bg-orange-500 w-12 shadow-[0_0_12px_rgba(255,158,100,0.5)]' : 'bg-white/10 hover:bg-white/30'
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile bottom pills */}
      <nav
        aria-label="Mission Sections Mobile"
        className="fixed bottom-6 left-1/2 z-40 w-[90%] max-w-lg -translate-x-1/2 rounded-sm border border-white/10 bg-black/60 p-1.5 backdrop-blur-md lg:hidden"
      >
        <ul className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {sections.map((s) => {
            const active = activeId === s.id;
            return (
              <li key={s.id} className="shrink-0">
                <button
                  onClick={() => jump(s.id)}
                  className={`rounded-sm px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all ${
                    active ? 'bg-orange-500 text-black' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {s.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
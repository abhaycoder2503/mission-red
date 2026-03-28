import MarsHeroScene from '../three/MarsHeroScene';

export default function Hero() {
  return (
    <section id="hero" className="section-shell relative flex items-center overflow-hidden">
      <MarsHeroScene />
      <div className="scanlines" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="reveal text-xs uppercase tracking-[0.3em] text-orange-400">NASA Mars 2020 / Perseverance Initiative</p>
        <h1 className="reveal hero-title-gradient mt-4 text-5xl font-semibold leading-[1.05] md:text-8xl">
          MISSION RED
        </h1>
        <p className="reveal mx-auto mt-6 max-w-3xl text-slate-200 md:text-lg">
          A cinematic mission log from launch and deep-space transit to atmospheric entry and surface discovery.
        </p>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-3">
          <span className="hud-chip">Uplink: Active</span>
          <span className="hud-chip">Trajectory: Optimal</span>
          <span className="hud-chip">Payload: Secure</span>
        </div>

        <div className="reveal mt-12 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => document.getElementById('launch')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden rounded-sm border border-orange-500 bg-orange-500/10 px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase text-orange-500 transition-all hover:bg-orange-500 hover:text-black"
          >
            <span className="relative z-10 font-bold">Initiate Launch</span>
          </button>
          <button
            onClick={() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' })}
            className="rounded-sm border border-white/10 bg-white/5 px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase text-white/80 transition-all hover:bg-white/10 hover:text-white"
          >
            Flight Profile
          </button>
        </div>
      </div>
    </section>
  );
}
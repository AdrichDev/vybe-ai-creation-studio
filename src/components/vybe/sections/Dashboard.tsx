import { Sparkles, Film, Upload, MoreHorizontal, Activity } from "lucide-react";
import { recentProjects, agentLogs } from "../data";

export function Dashboard({ onExport }: { onExport: () => void }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 p-8">
      <div className="space-y-8 min-w-0">
        {/* Hero */}
        <section>
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-500 mb-3">Studio</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
            Welcome back, Adrian.
            <br />
            <span className="text-zinc-500">Continue creating with </span>
            <span className="vybe-gradient-text">AI</span>.
          </h1>
          <div className="mt-7 flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg vybe-gradient text-black font-semibold text-sm transition-all duration-300 active:scale-95 hover:shadow-[0_0_30px_-5px_rgba(0,210,255,0.5)]">
              <Sparkles className="w-4 h-4" />
              New AI Image
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/[0.04] vybe-border text-sm font-semibold hover:bg-white/[0.08] transition-all duration-300 active:scale-95">
              <Film className="w-4 h-4" />
              Create Cinematic Reel
            </button>
            <button
              onClick={onExport}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 active:scale-95"
            >
              <Upload className="w-4 h-4" />
              Export / Publish
            </button>
          </div>
        </section>

        {/* Recent */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-tight">Recent projects</h2>
            <button className="text-xs text-zinc-500 hover:text-white transition-colors">View all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProjects.map((p) => (
              <article
                key={p.id}
                className="group rounded-xl overflow-hidden bg-[#121212] vybe-border hover:border-zinc-700 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 text-[10px] uppercase tracking-wider px-2 py-1 rounded-md bg-black/60 backdrop-blur-md vybe-border">
                    {p.type}
                  </span>
                </div>
                <div className="p-3 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium truncate">{p.title}</h3>
                    <p className="text-[11px] text-zinc-500">{p.date}</p>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* Agent activity */}
      <aside className="rounded-xl bg-[#121212] vybe-border p-5 h-fit xl:sticky xl:top-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00D2FF]" />
            <h3 className="text-sm font-semibold tracking-tight">Agentic Activity</h3>
          </div>
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider">Live</span>
        </div>
        <div className="space-y-3">
          {agentLogs.map((l) => (
            <div key={l.id} className="flex gap-3 text-sm group">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full vybe-gradient shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-200">{l.agent}</span>
                  <span className="text-[10px] text-zinc-600">{l.time}</span>
                </div>
                <p className="text-xs text-zinc-500 leading-snug">{l.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
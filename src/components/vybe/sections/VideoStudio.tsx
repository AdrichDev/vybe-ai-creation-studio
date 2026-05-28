import { Play, SkipBack, SkipForward, Mic, Captions, ImagePlus, Volume2 } from "lucide-react";

function QuickSelect({ icon: Icon, label, sub, active = false }: { icon: React.ComponentType<{ className?: string }>; label: string; sub: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 rounded-xl vybe-border text-left transition-all duration-300 active:scale-[0.98] ${
        active ? "bg-gradient-to-br from-[#00D2FF]/10 to-[#9B51E0]/10 border-[#00D2FF]/30" : "bg-[#121212] hover:bg-white/[0.04]"
      }`}
    >
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? "vybe-gradient text-black" : "bg-white/[0.05] text-zinc-400"}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[11px] text-zinc-500">{sub}</div>
      </div>
    </button>
  );
}

export function VideoStudio({ onExport }: { onExport: () => void }) {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 p-6">
      {/* Player */}
      <div className="flex flex-col gap-4 min-h-0">
        <div className="flex-1 grid place-items-center bg-[#121212] vybe-border rounded-xl p-4 min-h-[420px]">
          <div className="relative aspect-[9/16] h-full max-h-[560px] rounded-xl overflow-hidden vybe-border bg-black">
            <img
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80&auto=format&fit=crop"
              alt="Reel preview"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest vybe-border">
              Reel · 9:16
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>00:00:14 / 00:00:32</span>
                <span>frame 412 / 960</span>
              </div>
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[44%] vybe-gradient rounded-full" />
              </div>
              <div className="flex items-center justify-center gap-2">
                <button className="p-2 rounded-full text-white/80 hover:bg-white/10 transition-all active:scale-95"><SkipBack className="w-4 h-4" /></button>
                <button className="p-3 rounded-full vybe-gradient text-black transition-all active:scale-95">
                  <Play className="w-4 h-4 fill-black" />
                </button>
                <button className="p-2 rounded-full text-white/80 hover:bg-white/10 transition-all active:scale-95"><SkipForward className="w-4 h-4" /></button>
                <button className="ml-2 p-2 rounded-full text-white/80 hover:bg-white/10 transition-all active:scale-95"><Volume2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500">
            Rendering with <span className="text-white">Veo 3.1</span> · estimated 42s remaining
          </div>
          <button
            onClick={onExport}
            className="px-4 py-2 rounded-lg vybe-gradient text-black text-sm font-semibold transition-all duration-300 active:scale-95"
          >
            Export / Publish
          </button>
        </div>
      </div>

      {/* Tools */}
      <aside className="space-y-3">
        <h2 className="text-sm font-semibold tracking-tight px-1">Quick pipelines</h2>
        <QuickSelect icon={ImagePlus} label="Image to Video" sub="Animate stills · Veo 3.1" active />
        <QuickSelect icon={Captions} label="Auto Captions" sub="Multi-language · GPT-5.5" />
        <QuickSelect icon={Mic} label="Voiceover" sub="ElevenLabs · 30+ voices" />
        <div className="rounded-xl bg-[#121212] vybe-border p-4">
          <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Timeline</div>
          <div className="flex gap-1 h-10">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  background: `linear-gradient(180deg, rgba(0,210,255,${0.15 + (i % 5) * 0.12}) 0%, rgba(155,81,224,${0.1 + (i % 4) * 0.1}) 100%)`,
                  height: `${30 + ((i * 13) % 70)}%`,
                  alignSelf: "end",
                }}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
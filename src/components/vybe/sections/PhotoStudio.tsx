import { Sparkles, Wand2, ChevronDown, Upload } from "lucide-react";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</label>
      <button className="mt-1.5 w-full flex items-center justify-between px-3 py-2.5 rounded-lg bg-black/40 vybe-border text-sm hover:bg-white/[0.04] transition-all duration-300 active:scale-[0.98]">
        <span>{value}</span>
        <ChevronDown className="w-3.5 h-3.5 text-zinc-500" />
      </button>
    </div>
  );
}

export function PhotoStudio({ onExport }: { onExport: () => void }) {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 p-6">
      {/* Tools */}
      <aside className="rounded-xl bg-[#121212] vybe-border p-5 space-y-5 h-fit">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Composition</h2>
          <p className="text-xs text-zinc-500">Tune your visual masterpiece.</p>
        </div>
        <Field label="Style Preset" value="Cinematic" />
        <Field label="Lighting" value="Golden Hour · Soft" />
        <Field label="Aspect Ratio" value="9:16 · Reel" />
        <Field label="Model" value="Gemini 3 · Ultra" />
        <div className="pt-3 border-t border-zinc-800/50 space-y-2">
          <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-white/[0.04] vybe-border text-sm hover:bg-white/[0.08] transition-all duration-300 active:scale-[0.98]">
            <Upload className="w-4 h-4" /> Upload reference
          </button>
        </div>
      </aside>

      {/* Canvas */}
      <div className="flex flex-col min-h-0 gap-4">
        <div className="relative flex-1 rounded-xl overflow-hidden vybe-border bg-[#121212] min-h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=1600&q=80&auto=format&fit=crop"
            alt="AI preview"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
          <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md vybe-border">
            <span className="w-1.5 h-1.5 rounded-full vybe-gradient animate-pulse" />
            <span className="text-[11px] font-medium">AI Realtime Preview</span>
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">Render · v3</p>
              <h3 className="text-xl font-semibold tracking-tight">Cinematic Barber · Neon Editorial</h3>
            </div>
            <button
              onClick={onExport}
              className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md vybe-border text-xs font-medium hover:bg-white/20 transition-all duration-300 active:scale-95"
            >
              Export / Publish
            </button>
          </div>
        </div>

        {/* Prompt console */}
        <div className="rounded-xl bg-[#121212] vybe-border p-4">
          <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-widest text-zinc-500">
            <Wand2 className="w-3 h-3" /> Prompt console
          </div>
          <div className="flex items-end gap-3">
            <textarea
              rows={2}
              defaultValue="A luxury cinematic barbering experience, 8k, anamorphic lens, neon reflections, shallow depth of field"
              placeholder="Describe your visual masterpiece..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none resize-none font-mono"
            />
            <button className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg vybe-gradient text-black font-semibold text-sm transition-all duration-300 active:scale-95 hover:shadow-[0_0_30px_-5px_rgba(0,210,255,0.5)]">
              <Sparkles className="w-4 h-4" /> Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Instagram, Youtube, ChevronDown } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative w-10 h-5 rounded-full transition-all duration-300 active:scale-95 ${
        on ? "vybe-gradient" : "bg-white/[0.08]"
      }`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300 ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SocialRow({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white/[0.04] vybe-border flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
        <div>
          <div className="text-sm font-medium">{label}</div>
          <div className="text-[11px] text-zinc-500">@adrian.vybe</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {on && (
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Connected
          </span>
        )}
        <Toggle on={on} onChange={() => setOn((v) => !v)} />
      </div>
    </div>
  );
}

function Select({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div className="text-sm">{label}</div>
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/40 vybe-border text-xs hover:bg-white/[0.04] transition-all duration-300 active:scale-[0.97]">
        {value} <ChevronDown className="w-3 h-3 text-zinc-500" />
      </button>
    </div>
  );
}

function Panel({ title, sub, children }: { title: string; sub: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl bg-[#121212] vybe-border p-6">
      <div className="mb-2">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>
        <p className="text-xs text-zinc-500">{sub}</p>
      </div>
      <div className="divide-y divide-zinc-800/50">{children}</div>
    </section>
  );
}

// TikTok glyph (lucide doesn't ship one)
function TikTok({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M16.5 3a5.5 5.5 0 0 0 4.5 4.5v3.1a8.5 8.5 0 0 1-4.5-1.3v6.4a6.2 6.2 0 1 1-6.2-6.2c.3 0 .6 0 .9.1v3.2a3 3 0 1 0 2.1 2.9V3h3.2Z" />
    </svg>
  );
}

export function Settings() {
  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-zinc-500 mt-1">Tune your studio, your way.</p>
      </div>

      <Panel title="Social Orchestration" sub="Connect your channels for direct publishing.">
        <SocialRow icon={Instagram} label="Instagram" />
        <SocialRow icon={TikTok} label="TikTok" />
        <SocialRow icon={Youtube} label="YouTube Shorts" />
      </Panel>

      <Panel title="AI Model Preferences" sub="Choose your engine and render quality.">
        <Select label="Primary text model" value="OpenAI GPT-5.5" />
        <Select label="Primary visual model" value="Gemini 3 · Ultra" />
        <Select label="Render quality" value="Cinematic · 8k" />
      </Panel>

      <Panel title="Export Parameters" sub="Defaults for every render.">
        <Select label="Default format" value="ProRes 422 HQ" />
        <Select label="Mobile delivery" value="MP4 · 1080×1920" />
        <Select label="Color profile" value="Rec. 709" />
      </Panel>
    </div>
  );
}
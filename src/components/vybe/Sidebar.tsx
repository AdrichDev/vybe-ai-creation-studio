import { LayoutDashboard, Image as ImageIcon, Film, FolderOpen, Settings, Sparkles } from "lucide-react";

export type SectionKey = "Dashboard" | "Photo Studio" | "Video Studio" | "Assets" | "Settings";

const NAV: { key: SectionKey; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "Dashboard", icon: LayoutDashboard },
  { key: "Photo Studio", icon: ImageIcon },
  { key: "Video Studio", icon: Film },
  { key: "Assets", icon: FolderOpen },
  { key: "Settings", icon: Settings },
];

export function Sidebar({
  active,
  onChange,
}: {
  active: SectionKey;
  onChange: (s: SectionKey) => void;
}) {
  return (
    <aside className="w-[220px] shrink-0 h-full bg-[#0A0A0A] border-r border-zinc-800/50 flex flex-col">
      <nav className="flex-1 p-3 space-y-1">
        <div className="px-3 pt-2 pb-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          Workspace
        </div>
        {NAV.map(({ key, icon: Icon }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 active:scale-95 group relative ${
                isActive
                  ? "bg-white/[0.06] text-white"
                  : "text-zinc-500 hover:text-white hover:bg-white/[0.03]"
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[2px] vybe-gradient rounded-r" />
              )}
              <Icon className="w-4 h-4" />
              <span className="font-medium tracking-tight">{key}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-3">
        <div className="rounded-xl p-3 vybe-border bg-gradient-to-br from-[#00D2FF]/5 to-[#9B51E0]/5">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
            <span className="text-xs font-semibold">Pro Studio</span>
          </div>
          <p className="text-[11px] text-zinc-500 leading-snug">
            Unlock Veo 3.1 & GPT-5.5 unlimited renders.
          </p>
          <button className="mt-2.5 w-full text-[11px] font-medium py-1.5 rounded-md vybe-gradient text-black transition-all duration-300 active:scale-95">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
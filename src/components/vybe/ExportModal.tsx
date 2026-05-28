import { useEffect, useState } from "react";
import { X, Download, FileVideo, Instagram, Calendar, Sparkles, Music2, Youtube } from "lucide-react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram Reels", icon: Instagram },
  { id: "tiktok", label: "TikTok", icon: Music2 },
  { id: "youtube", label: "YouTube Shorts", icon: Youtube },
] as const;

export function ExportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [active, setActive] = useState<string[]>(["instagram"]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  const toggle = (id: string) =>
    setActive((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl bg-[#121212] vybe-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">Export & Publish</h2>
            <p className="text-xs text-zinc-500">Review before going live</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-zinc-500 hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-800/50">
          {/* Local */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
              <Download className="w-3 h-3" /> Local export
            </div>
            <button className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] vybe-border transition-all duration-300 ease-in-out active:scale-[0.98] group">
              <div className="text-left">
                <div className="text-sm font-medium">Download Original</div>
                <div className="text-xs text-zinc-500">Master quality · full resolution</div>
              </div>
              <FileVideo className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] vybe-border transition-all duration-300 ease-in-out active:scale-[0.98] group">
              <div className="text-left">
                <div className="text-sm font-medium">Download Compressed</div>
                <div className="text-xs text-zinc-500">Mobile-ready · 1080×1920</div>
              </div>
              <Download className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </button>
          </div>

          {/* Social */}
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-500">
              <Instagram className="w-3 h-3" /> Social distribution
            </div>
            <div className="grid grid-cols-3 gap-2">
              {PLATFORMS.map((p) => {
                const isActive = active.includes(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => toggle(p.id)}
                    className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-xl border transition-all duration-300 ease-in-out active:scale-95 ${
                      isActive
                        ? "border-[#00D2FF]/40 bg-gradient-to-br from-[#00D2FF]/10 to-[#9B51E0]/10"
                        : "border-zinc-800 bg-black/30 hover:border-zinc-700"
                    }`}
                  >
                    <p.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-zinc-500"}`} />
                    <span className={`text-[10px] font-medium leading-tight text-center ${isActive ? "text-white" : "text-zinc-500"}`}>
                      {p.label}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400">Caption</label>
              <textarea
                defaultValue="Cinematic luxury vibes only. ✨ #VYBEAI"
                rows={3}
                className="w-full rounded-xl bg-black/40 vybe-border px-3 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#00D2FF]/40 resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3 h-3" /> Schedule
              </label>
              <input
                type="datetime-local"
                defaultValue="2026-05-29T18:00"
                className="w-full rounded-xl bg-black/40 vybe-border px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#00D2FF]/40"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 vybe-gradient text-black font-semibold text-sm px-4 py-3 rounded-xl transition-all duration-300 ease-in-out active:scale-[0.98] hover:shadow-[0_0_30px_-5px_rgba(0,210,255,0.5)]">
              <Sparkles className="w-4 h-4" />
              Publish Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { Download, Heart, Trash2, ImagePlus, Film, Upload, Plus } from "lucide-react";
import { assetsLibrary } from "../data";

type Tab = keyof typeof assetsLibrary;
const TABS: Tab[] = ["Images", "Videos", "Audio", "Templates", "Exports"];

const UPLOAD_SAMPLES: Record<Tab, string> = {
  Images: "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=800&q=80",
  Videos: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80",
  Audio: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
  Templates: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  Exports: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
};

export function Assets() {
  const [tab, setTab] = useState<Tab>("Images");
  const [library, setLibrary] = useState<Record<Tab, string[]>>(() => ({
    Images: [...assetsLibrary.Images],
    Videos: [...assetsLibrary.Videos],
    Audio: [...assetsLibrary.Audio],
    Templates: [...assetsLibrary.Templates],
    Exports: [...assetsLibrary.Exports],
  }));

  const items = library[tab];

  const simulateUpload = () => {
    setLibrary((prev) => ({ ...prev, [tab]: [UPLOAD_SAMPLES[tab], ...prev[tab]] }));
  };

  const remove = (idx: number) => {
    setLibrary((prev) => ({ ...prev, [tab]: prev[tab].filter((_, i) => i !== idx) }));
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Assets Library</h1>
          <p className="text-sm text-zinc-500 mt-1">Every render, ready to ship.</p>
        </div>
        <button
          onClick={simulateUpload}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg vybe-gradient text-black font-semibold text-sm transition-all duration-300 ease-in-out active:scale-95 hover:shadow-[0_0_30px_-5px_rgba(0,210,255,0.5)]"
        >
          <Upload className="w-4 h-4" />
          Upload to {tab}
        </button>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#121212] vybe-border w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 ease-in-out active:scale-95 ${
              tab === t ? "vybe-gradient text-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <button
          onClick={simulateUpload}
          className="aspect-square rounded-xl border-2 border-dashed border-zinc-800 bg-[#121212] hover:border-zinc-600 hover:bg-white/[0.02] transition-all duration-300 ease-in-out active:scale-[0.98] flex flex-col items-center justify-center gap-2 text-zinc-500 hover:text-zinc-300"
        >
          <Plus className="w-6 h-6" />
          <span className="text-xs font-medium">Add {tab.slice(0, -1).toLowerCase()}</span>
        </button>
        {items.map((src, i) => (
          <article
            key={src + i}
            className="group relative aspect-square rounded-xl overflow-hidden vybe-border bg-[#121212] cursor-pointer"
          >
            <img
              src={src}
              alt=""
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-black/60 backdrop-blur-md vybe-border">
                  {tab.slice(0, -1)} · {String(i + 1).padStart(2, "0")}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(i);
                  }}
                  className="p-1.5 rounded-md bg-white/10 backdrop-blur-md hover:bg-red-500/40 transition-all active:scale-90"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-1.5">
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 active:scale-[0.98] text-[11px] font-medium">
                  <ImagePlus className="w-3.5 h-3.5" /> Use in Photo Studio
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 active:scale-[0.98] text-[11px] font-medium">
                  <Film className="w-3.5 h-3.5" /> Use in Video Studio
                </button>
                <div className="flex items-center gap-1.5">
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90 text-[11px]">
                    <Download className="w-3 h-3" /> Save
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-md bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90 text-[11px]">
                    <Heart className="w-3 h-3" /> Favorite
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
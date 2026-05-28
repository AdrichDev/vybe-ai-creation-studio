import { useState } from "react";
import { Download, Heart, Trash2 } from "lucide-react";
import { assetsLibrary } from "../data";

type Tab = keyof typeof assetsLibrary;
const TABS: Tab[] = ["Images", "Videos", "Audio", "Templates"];

export function Assets() {
  const [tab, setTab] = useState<Tab>("Images");
  const items = assetsLibrary[tab];

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Assets Library</h1>
        <p className="text-sm text-zinc-500 mt-1">Every render, ready to ship.</p>
      </div>

      <div className="flex items-center gap-1 p-1 rounded-lg bg-[#121212] vybe-border w-fit">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-300 active:scale-95 ${
              tab === t ? "vybe-gradient text-black" : "text-zinc-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/0 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-x-0 bottom-0 p-3 flex items-center justify-between translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-[11px] font-medium">{tab.slice(0, -1)} · {String(i + 1).padStart(2, "0")}</div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-md bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90"><Download className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-md bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all active:scale-90"><Heart className="w-3.5 h-3.5" /></button>
                <button className="p-1.5 rounded-md bg-white/10 backdrop-blur-md hover:bg-red-500/40 transition-all active:scale-90"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
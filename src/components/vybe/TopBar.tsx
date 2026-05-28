import { Bell, Search } from "lucide-react";

export function TopBar() {
  return (
    <header className="h-14 shrink-0 flex items-center justify-between px-5 border-b border-zinc-800/50 bg-[#0A0A0A]">
      {/* Logo */}
      <div className="flex items-center gap-3 w-[220px] -ml-2 pl-2">
        <div className="w-7 h-7 rounded-md vybe-gradient flex items-center justify-center font-black text-[13px] text-black">
          V
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight">VYBE AI</div>
          <div className="text-[10px] text-zinc-500 tracking-wider uppercase">AI Creative Studio</div>
        </div>
      </div>

      {/* Command bar */}
      <div className="flex-1 max-w-xl mx-6">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] vybe-border text-sm text-zinc-500 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer">
          <Search className="w-3.5 h-3.5" />
          <span className="flex-1 truncate">Search assets, agents or prompts...</span>
          <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 border border-zinc-800 text-zinc-400">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] vybe-border">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full vybe-gradient opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 vybe-gradient" />
          </span>
          <span className="text-[11px] font-medium text-zinc-300">AI Agents Active</span>
        </div>
        <button className="p-2 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-95 relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#00D2FF]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00D2FF] to-[#9B51E0] p-[1.5px] cursor-pointer transition-all duration-300 active:scale-95">
          <div className="w-full h-full rounded-full bg-[#121212] flex items-center justify-center text-xs font-semibold">
            A
          </div>
        </div>
      </div>
    </header>
  );
}
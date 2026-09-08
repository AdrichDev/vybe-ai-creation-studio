export function StatusBar() {
  return (
    <footer className="h-8 shrink-0 flex items-center justify-between px-5 border-t border-zinc-800/50 bg-[#0A0A0A] text-[11px] text-zinc-500">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>AI Cluster: Connected</span>
        <span className="text-zinc-700">•</span>
        <span className="text-zinc-400">Veo 3.1 & GPT-5.5 Ready</span>
      </div>
    </footer>
  );
}
import { useState } from "react";
import { Play, Pause, Mic, Film, AudioLines, Upload, Sparkles } from "lucide-react";

function Dropzone({
  label,
  hint,
  filled,
  onPick,
  icon: Icon,
  preview,
}: {
  label: string;
  hint: string;
  filled: boolean;
  onPick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  preview?: string;
}) {
  return (
    <button
      onClick={onPick}
      className={`group relative w-full aspect-[4/3] rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out active:scale-[0.98] overflow-hidden ${
        filled ? "border-transparent bg-black" : "border-zinc-800 bg-[#121212] hover:border-zinc-600 hover:bg-white/[0.02]"
      }`}
    >
      {filled && preview ? (
        <>
          <img src={preview} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300">{label}</span>
            <span className="text-[10px] text-emerald-400">Ready</span>
          </div>
        </>
      ) : filled ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full vybe-gradient grid place-items-center">
              <AudioLines className="w-4 h-4 text-black" />
            </div>
            <span className="text-[10px] uppercase tracking-widest text-zinc-300">{label}</span>
            <span className="text-[10px] text-emerald-400">Ready · 00:32</span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-zinc-500 group-hover:text-zinc-300 transition-colors">
          <Icon className="w-6 h-6" />
          <span className="text-xs font-medium">{label}</span>
          <span className="text-[10px] text-zinc-600">{hint}</span>
        </div>
      )}
    </button>
  );
}

function VoiceWave() {
  return (
    <div className="flex items-center gap-1 h-5">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-full vybe-gradient animate-vybe-scan"
          style={{
            height: `${30 + ((i * 37) % 70)}%`,
            animationDelay: `${i * 60}ms`,
            animationDuration: "900ms",
          }}
        />
      ))}
    </div>
  );
}

export function VideoStudio({ onExport }: { onExport: () => void }) {
  const [media, setMedia] = useState<string | null>(
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80"
  );
  const [voice, setVoice] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [listening, setListening] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [rendering, setRendering] = useState(false);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 p-6">
      {/* Dropzones */}
      <aside className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Inputs</h2>
          <p className="text-xs text-zinc-500">Drop your media & voice.</p>
        </div>
        <Dropzone
          label="Image / Video Base"
          hint="MP4 · MOV · PNG · JPG"
          filled={!!media}
          preview={media ?? undefined}
          icon={Film}
          onPick={() => setMedia("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80")}
        />
        <Dropzone
          label="Voice / Audio Reference"
          hint="MP3 · WAV · for cloning"
          filled={voice}
          icon={AudioLines}
          onPick={() => setVoice(true)}
        />
        <button
          onClick={() => {
            setMedia(null);
            setVoice(false);
          }}
          className="w-full px-3 py-2 rounded-lg text-[11px] text-zinc-500 hover:text-white transition-colors"
        >
          Clear all inputs
        </button>
      </aside>

      {/* Player + Prompt */}
      <div className="flex flex-col min-h-0 gap-4">
        <div className="flex-1 grid place-items-center bg-[#0F0F0F] vybe-border rounded-xl p-4 min-h-[380px] relative">
          <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md vybe-border z-10">
            <span className={`w-1.5 h-1.5 rounded-full ${rendering ? "vybe-gradient animate-pulse" : "bg-emerald-400"}`} />
            <span className="text-[11px] font-medium">{rendering ? "Preparing your video..." : "Ready to render"}</span>
          </div>
          <div className="relative aspect-[9/16] h-full max-h-[520px] rounded-xl overflow-hidden vybe-border bg-black">
            {media ? (
              <img src={media} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-zinc-600 text-xs">No media</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest vybe-border">
              9:16
            </div>
            <div className="absolute inset-x-0 bottom-0 p-4 space-y-3">
              <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[44%] vybe-gradient rounded-full" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-300">
                <span>00:14 / 00:32</span>
                <button
                  onClick={() => setPlaying((v) => !v)}
                  className="p-2 rounded-full vybe-gradient text-black transition-all active:scale-90"
                >
                  {playing ? <Pause className="w-3.5 h-3.5 fill-black" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                </button>
                <span>HD · 30fps</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unified prompt */}
        <div className="rounded-2xl bg-[#121212] vybe-border p-2 pl-4 flex items-center gap-3">
          <button
            onClick={() => setListening((v) => !v)}
            className={`shrink-0 relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out active:scale-90 ${
              listening ? "vybe-gradient text-black" : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.1]"
            }`}
          >
            {listening && (
              <>
                <span className="absolute inset-0 rounded-full vybe-gradient opacity-60 animate-ping" />
                <span className="absolute -inset-2 rounded-full vybe-gradient opacity-20 blur-md animate-pulse" />
              </>
            )}
            <Mic className="w-4 h-4 relative" />
          </button>
          {listening ? (
            <div className="flex-1 flex items-center gap-3">
              <VoiceWave />
              <span className="text-sm vybe-gradient-text font-medium">Listening...</span>
            </div>
          ) : (
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the video you want to create..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none py-2"
            />
          )}
          <button className="p-2.5 rounded-lg text-zinc-500 hover:text-white transition-all duration-300 active:scale-90">
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setRendering(true);
              setTimeout(() => {
                setRendering(false);
                onExport();
              }, 1800);
            }}
            className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl vybe-gradient text-black font-semibold text-sm transition-all duration-300 ease-in-out active:scale-95 hover:shadow-[0_0_30px_-5px_rgba(0,210,255,0.5)]"
          >
            <Sparkles className="w-4 h-4" /> Render Video
          </button>
        </div>
      </div>
    </div>
  );
}
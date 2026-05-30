import { useState } from "react";
import { Sparkles, Upload, Mic, ImagePlus, Layers, GitCompareArrows, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { useAppState, ProviderSelector, PROVIDER_LABEL } from "@/components/vybe/AppState";

function Dropzone({
  label,
  hint,
  image,
  onPick,
  icon: Icon,
}: {
  label: string;
  hint: string;
  image: string | null;
  onPick: () => void;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <button
      onClick={onPick}
      className={`group relative w-full aspect-[4/3] rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out active:scale-[0.98] overflow-hidden ${
        image
          ? "border-transparent bg-black"
          : "border-zinc-800 bg-[#121212] hover:border-zinc-600 hover:bg-white/[0.02]"
      }`}
    >
      {image ? (
        <>
          <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300">{label}</span>
            <span className="text-[10px] text-emerald-400">Ready</span>
          </div>
        </>
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

function VoiceButton({ listening, onToggle }: { listening: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
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

export function PhotoStudio({ onExport }: { onExport: () => void }) {
  const { apiKeys, photoProvider, setPhotoProvider, goToSettings } = useAppState();
  const hasKey = Boolean(apiKeys[photoProvider]);
  const [base, setBase] = useState<string | null>(
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=900&q=80"
  );
  const [refImg, setRefImg] = useState<string | null>(null);
  const [compare, setCompare] = useState(false);
  const [listening, setListening] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [processing, setProcessing] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!hasKey) {
      toast.error(`Configure ${PROVIDER_LABEL[photoProvider]} API Key in Settings`, {
        action: { label: "Open Settings", onClick: goToSettings },
      });
      return;
    }
    setProcessing(true);
    setStatusText("Generating...");
    setTimeout(() => {
      setProcessing(false);
      setStatusText("Preview Ready");
      setTimeout(() => setStatusText(null), 1800);
    }, 1800);
  };

  const samples = [
    "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=900&q=80",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=900&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=80",
  ];

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 p-6">
      {/* Dropzones */}
      <aside className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold tracking-tight">Inputs</h2>
          <p className="text-xs text-zinc-500">Drop your base & references.</p>
        </div>
        <ProviderSelector value={photoProvider} onChange={setPhotoProvider} />
        <Dropzone
          label="Base Image"
          hint="PNG · JPG · up to 50MB"
          image={base}
          icon={ImagePlus}
          onPick={() => setBase(samples[0])}
        />
        <Dropzone
          label="Reference Images"
          hint="Guide the visual style"
          image={refImg}
          icon={Layers}
          onPick={() => setRefImg(samples[1])}
        />
        <button
          onClick={() => {
            setBase(null);
            setRefImg(null);
          }}
          className="w-full px-3 py-2 rounded-lg text-[11px] text-zinc-500 hover:text-white transition-colors"
        >
          Clear all inputs
        </button>
      </aside>

      {/* Canvas */}
      <div className="flex flex-col min-h-0 gap-4">
        <div className="relative flex-1 rounded-xl overflow-hidden vybe-border bg-[#0F0F0F] min-h-[380px] group">
          {base ? (
            <>
              <img src={base} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
              {compare && (
                <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden border-l border-white/30">
                  <img
                    src={samples[2]}
                    alt="After"
                    className="absolute inset-0 w-[200%] h-full object-cover right-0"
                  />
                  <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest px-2 py-1 rounded-md bg-black/60 backdrop-blur-md vybe-border">
                    After
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />
            </>
          ) : (
            <div className="absolute inset-0 grid place-items-center text-zinc-600">
              <div className="text-center">
                <div className="text-sm font-medium text-zinc-400">Ready to edit</div>
                <div className="text-xs">Upload a base image to begin</div>
              </div>
            </div>
          )}

          <div className="absolute top-4 left-4 flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md vybe-border">
            <span className={`w-1.5 h-1.5 rounded-full ${processing ? "vybe-gradient animate-pulse" : "bg-emerald-400"}`} />
            <span className="text-[11px] font-medium">{statusText ?? (processing ? "Processing your request..." : "Preview")}</span>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-1.5">
            <button
              onClick={() => setCompare((v) => !v)}
              className={`p-2 rounded-md backdrop-blur-md vybe-border transition-all duration-300 active:scale-90 ${
                compare ? "vybe-gradient text-black" : "bg-black/60 text-zinc-300 hover:text-white"
              }`}
            >
              <GitCompareArrows className="w-3.5 h-3.5" />
            </button>
            <button className="p-2 rounded-md bg-black/60 backdrop-blur-md vybe-border text-zinc-300 hover:text-white transition-all duration-300 active:scale-90">
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onExport}
              className="px-3 py-2 rounded-md bg-white/10 backdrop-blur-md vybe-border text-[11px] font-medium hover:bg-white/20 transition-all duration-300 active:scale-95"
            >
              Export
            </button>
          </div>
        </div>

        {/* Unified prompt */}
        <div className="rounded-2xl bg-[#121212] vybe-border p-2 pl-4 flex items-center gap-3">
          <VoiceButton listening={listening} onToggle={() => setListening((v) => !v)} />
          {listening ? (
            <div className="flex-1 flex items-center gap-3">
              <VoiceWave />
              <span className="text-sm vybe-gradient-text font-medium">Listening...</span>
            </div>
          ) : (
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={`Describe what you want ${PROVIDER_LABEL[photoProvider]} to create or edit...`}
              className="flex-1 bg-transparent text-sm text-white placeholder:text-zinc-600 focus:outline-none py-2"
            />
          )}
          <button className="p-2.5 rounded-lg text-zinc-500 hover:text-white transition-all duration-300 active:scale-90">
            <Upload className="w-4 h-4" />
          </button>
          <button
            onClick={handleGenerate}
            disabled={!hasKey}
            className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ease-in-out ${
              hasKey
                ? "vybe-gradient text-black active:scale-95 hover:shadow-[0_0_30px_-5px_rgba(0,210,255,0.5)] cursor-pointer"
                : "bg-zinc-800/60 text-zinc-500 opacity-60 cursor-not-allowed"
            }`}
          >
            <Sparkles className="w-4 h-4" /> {hasKey ? "Generate" : "Configure API Key in Settings"}
          </button>
        </div>
      </div>
    </div>
  );
}
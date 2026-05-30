import { createContext, useContext, useState, type ReactNode } from "react";

export type Provider = "google" | "openai";
export type ApiKeys = { google: string; openai: string };

type Ctx = {
  apiKeys: ApiKeys;
  setApiKey: (p: Provider, v: string) => void;
  photoProvider: Provider;
  setPhotoProvider: (p: Provider) => void;
  videoProvider: Provider;
  setVideoProvider: (p: Provider) => void;
  goToSettings: () => void;
};

const AppStateContext = createContext<Ctx | null>(null);

export function AppStateProvider({
  children,
  goToSettings,
}: {
  children: ReactNode;
  goToSettings: () => void;
}) {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({ google: "", openai: "" });
  const [photoProvider, setPhotoProvider] = useState<Provider>("google");
  const [videoProvider, setVideoProvider] = useState<Provider>("google");

  const setApiKey = (p: Provider, v: string) =>
    setApiKeys((prev) => ({ ...prev, [p]: v }));

  return (
    <AppStateContext.Provider
      value={{
        apiKeys,
        setApiKey,
        photoProvider,
        setPhotoProvider,
        videoProvider,
        setVideoProvider,
        goToSettings,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}

export const PROVIDER_LABEL: Record<Provider, string> = {
  google: "Google AI",
  openai: "OpenAI",
};

export function ProviderSelector({
  value,
  onChange,
}: {
  value: Provider;
  onChange: (p: Provider) => void;
}) {
  const opts: Provider[] = ["google", "openai"];
  return (
    <div className="flex bg-zinc-900/80 p-1 rounded-xl border border-zinc-800/60 w-full transition-all duration-300 ease-in-out">
      {opts.map((p) => {
        const active = value === p;
        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ease-in-out ${
              active
                ? "bg-gradient-to-r from-[#00D2FF] to-[#9B51E0] text-white shadow-lg"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/60"
            }`}
          >
            {PROVIDER_LABEL[p]}
          </button>
        );
      })}
    </div>
  );
}
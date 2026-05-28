import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sidebar, type SectionKey } from "@/components/vybe/Sidebar";
import { TopBar } from "@/components/vybe/TopBar";
import { StatusBar } from "@/components/vybe/StatusBar";
import { ExportModal } from "@/components/vybe/ExportModal";
import { Dashboard } from "@/components/vybe/sections/Dashboard";
import { PhotoStudio } from "@/components/vybe/sections/PhotoStudio";
import { VideoStudio } from "@/components/vybe/sections/VideoStudio";
import { Assets } from "@/components/vybe/sections/Assets";
import { Settings } from "@/components/vybe/sections/Settings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VYBE AI — AI Creative Studio" },
      { name: "description", content: "Cinematic AI creative studio for influencers and agencies. Generate, preview, approve, publish." },
      { property: "og:title", content: "VYBE AI — AI Creative Studio" },
      { property: "og:description", content: "Cinematic AI creative studio for influencers and agencies." },
    ],
  }),
  component: Index,
});

function Index() {
  const [active, setActive] = useState<SectionKey>("Dashboard");
  const [exportOpen, setExportOpen] = useState(false);
  const openExport = () => setExportOpen(true);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0A0A0A] text-white overflow-hidden">
      <TopBar />
      <div className="flex-1 flex min-h-0">
        <Sidebar active={active} onChange={setActive} />
        <main className="flex-1 min-w-0 overflow-y-auto">
          {active === "Dashboard" && <Dashboard onExport={openExport} />}
          {active === "Photo Studio" && <PhotoStudio onExport={openExport} />}
          {active === "Video Studio" && <VideoStudio onExport={openExport} />}
          {active === "Assets" && <Assets />}
          {active === "Settings" && <Settings />}
        </main>
      </div>
      <StatusBar />
      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </div>
  );
}

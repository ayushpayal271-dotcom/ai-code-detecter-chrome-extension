import React, { useState } from "react";
import { Header } from "./components/Header";
import { CodeInspectorLab } from "./components/CodeInspectorLab";
import { BrowserSimulator } from "./components/BrowserSimulator";
import { ExtensionPopupSimulator } from "./components/ExtensionPopupSimulator";
import { ExtensionSourceViewer } from "./components/ExtensionSourceViewer";
import { InstallGuide } from "./components/InstallGuide";
import { Shield, Sparkles, Download, Layers } from "lucide-react";
import { downloadExtensionZip } from "./utils/zipGenerator";

export default function App() {
  const [activeTab, setActiveTab] = useState<"lab" | "simulator" | "popup" | "source" | "guide">("lab");

  return (
    <div className="min-h-screen bg-[#050505] text-[#d4d4d4] font-sans selection:bg-white/20 selection:text-white flex flex-col antialiased">
      {/* Top Application Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "lab" && <CodeInspectorLab />}
        {activeTab === "simulator" && <BrowserSimulator />}
        {activeTab === "popup" && <ExtensionPopupSimulator />}
        {activeTab === "source" && <ExtensionSourceViewer />}
        {activeTab === "guide" && <InstallGuide />}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#080808] py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/40">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="text-white/70 font-mono tracking-tight">AI CODE DETECTOR &bull; MANIFEST V3 CORE V2.1</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => downloadExtensionZip()}
              className="text-white/80 hover:text-white font-medium transition-colors"
            >
              Download .ZIP Package
            </button>
            <span className="text-white/20">&bull;</span>
            <button
              onClick={() => setActiveTab("guide")}
              className="text-white/60 hover:text-white transition-colors"
            >
              Chrome Load Guide
            </button>
            <span className="text-white/20">&bull;</span>
            <span className="text-white/30 uppercase tracking-widest text-[10px]">Real-time Engine Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

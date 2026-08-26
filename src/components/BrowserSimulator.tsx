import React, { useState } from "react";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Lock,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Code2,
  Check,
  AlertCircle,
  FileCode,
  Github,
  Award,
  MessageSquareCode,
  Bot
} from "lucide-react";
import { SIMULATED_PAGES } from "../data/presets";
import { SimulatedPage } from "../types";

export const BrowserSimulator: React.FC = () => {
  const [currentPageId, setCurrentPageId] = useState<string>(SIMULATED_PAGES[0].id);
  const [activePopoverBlockId, setActivePopoverBlockId] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [customToast, setCustomToast] = useState<string | null>(null);

  const currentPage = SIMULATED_PAGES.find((p) => p.id === currentPageId) || SIMULATED_PAGES[0];

  const handleScanPage = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setCustomToast("Page scanned! Found 2 code blocks with AI forensic badges injected.");
      setTimeout(() => setCustomToast(null), 3500);
    }, 600);
  };

  const getSiteIcon = (site: string) => {
    switch (site) {
      case "GitHub":
        return <Github className="w-4 h-4 text-white" />;
      case "LeetCode":
        return <Award className="w-4 h-4 text-amber-400" />;
      case "StackOverflow":
        return <MessageSquareCode className="w-4 h-4 text-orange-400" />;
      case "ChatGPT":
        return <Bot className="w-4 h-4 text-emerald-400" />;
      default:
        return <Globe className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
              In-Browser Sandbox
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <h2 className="text-base font-semibold text-white tracking-tight mt-0.5 flex items-center gap-2">
            <Globe className="w-4 h-4 text-white/70" />
            Live Chrome Extension Webpage Scanner
          </h2>
          <p className="text-xs text-white/50 mt-0.5 max-w-2xl leading-relaxed">
            See how the AI Code Detector automatically scans DOM containers, injects floating badges, and provides forensic tooltips on GitHub, LeetCode, and StackOverflow.
          </p>
        </div>

        {/* Site Switcher */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {SIMULATED_PAGES.map((page) => (
            <button
              key={page.id}
              onClick={() => {
                setCurrentPageId(page.id);
                setActivePopoverBlockId(null);
              }}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                currentPageId === page.id
                  ? "bg-white text-black font-semibold shadow-xs"
                  : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {getSiteIcon(page.siteName)}
              <span>{page.siteName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chrome Browser Frame Container */}
      <div className="bg-[#0a0a0a] rounded-2xl border border-white/5 shadow-2xl overflow-hidden">
        {/* Browser Top Window Bar */}
        <div className="bg-[#080808] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
          </div>

          {/* Simulated Browser URL Address Bar */}
          <div className="flex-1 max-w-2xl mx-4 bg-[#050505] border border-white/10 rounded-lg px-3 py-1.5 flex items-center justify-between text-xs text-white/80 font-mono">
            <div className="flex items-center space-x-2 overflow-hidden truncate">
              <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate text-white/70">{currentPage.url}</span>
            </div>
            <button
              onClick={handleScanPage}
              className="text-white/40 hover:text-white transition-colors p-0.5"
              title="Refresh scan"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin text-white" : ""}`} />
            </button>
          </div>

          {/* Chrome Toolbar with Extension Icon */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleScanPage}
              className="relative p-1.5 bg-white/5 hover:bg-white/10 rounded-md border border-white/10 text-white transition-all flex items-center gap-1 text-xs"
              title="AI Code Detector Active Extension"
            >
              <Shield className="w-3.5 h-3.5 text-white/80" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>
        </div>

        {/* Browser Web Page Content Area */}
        <div className="p-5 sm:p-7 bg-[#080808] min-h-[500px] text-[#d4d4d4]">
          {/* Toast alert if triggered */}
          {customToast && (
            <div className="mb-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 px-4 py-2 rounded-lg text-xs flex items-center space-x-2 animate-fadeIn font-mono">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{customToast}</span>
            </div>
          )}

          {/* Simulated Site Header */}
          <div className="border-b border-white/5 pb-4 mb-6">
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-2.5 py-0.5 rounded bg-white/5 text-xs font-semibold text-white/80 border border-white/10 flex items-center gap-1.5 font-mono">
                {getSiteIcon(currentPage.siteName)}
                {currentPage.siteName}
              </span>
              <span className="text-xs text-white/50">{currentPage.author}</span>
              <span className="text-xs text-white/30">• {currentPage.timestamp}</span>
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{currentPage.title}</h1>
            <p className="text-xs sm:text-sm text-white/50 mt-1">{currentPage.description}</p>
          </div>

          {/* Injected Code Blocks List */}
          <div className="space-y-6">
            {currentPage.codeBlocks.map((block) => {
              const isHighAI = block.preCalculatedScore >= 70;
              const isMixed = block.preCalculatedScore >= 40 && block.preCalculatedScore < 70;

              return (
                <div
                  key={block.id}
                  className="rounded-2xl border border-white/5 bg-[#0c0c0c] overflow-hidden shadow-xl relative group"
                >
                  {/* File / Block Header */}
                  <div className="bg-[#0a0a0a] px-4 py-2.5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-mono text-white/70">
                      <FileCode className="w-3.5 h-3.5 text-white/40" />
                      <span className="font-medium">{block.label}</span>
                    </div>

                    {/* INJECTED CHROME EXTENSION FLOATING BADGE */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActivePopoverBlockId(activePopoverBlockId === block.id ? null : block.id)
                        }
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium transition-all ${
                          isHighAI
                            ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40"
                            : isMixed
                            ? "bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 border border-amber-500/20"
                            : "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                        }`}
                      >
                        <span>{isHighAI ? "🤖" : isMixed ? "⚡" : "👤"}</span>
                        <span>
                          {block.preCalculatedScore}% {block.verdict}
                        </span>
                      </button>

                      {/* INJECTED HOVER POPOVER CARD */}
                      {activePopoverBlockId === block.id && (
                        <div className="absolute right-0 top-full mt-2 w-80 bg-[#111] border border-white/10 rounded-xl p-4 shadow-2xl z-30 text-xs text-[#d4d4d4] animate-fadeIn">
                          <div className="flex items-center justify-between pb-2.5 border-b border-white/5">
                            <span className="font-semibold text-white">Forensic Code Inspection</span>
                            <span className="text-[10px] font-mono text-white/50">{block.generator}</span>
                          </div>

                          <div className="py-2.5 space-y-2 text-[11px]">
                            <div className="flex justify-between">
                              <span className="text-white/50">Confidence:</span>
                              <span className="font-mono text-white">92%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Didactic Markers:</span>
                              <span className="font-mono text-amber-300">
                                {isHighAI ? "Detected ('Step 1: ...')" : "None"}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/50">Entropy / Variance:</span>
                              <span className="font-mono text-white">
                                {isHighAI ? "Low (Predictable)" : "High (Organic)"}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2.5 border-t border-white/5 flex justify-between items-center text-[10px] text-white/40">
                            <span className="font-mono">VERITAS-CORE-V2.1</span>
                            <button
                              onClick={() => setActivePopoverBlockId(null)}
                              className="text-white/70 hover:text-white font-medium"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Code Snippet Viewer */}
                  <div className="p-4 overflow-x-auto font-mono text-[13px] text-[#d4d4d4] leading-relaxed bg-[#0c0c0c]">
                    <pre>
                      <code>{block.code}</code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import { Shield, Sparkles, RefreshCw, CheckCircle2, AlertTriangle, Settings, Sliders, Laptop, Code2, Zap } from "lucide-react";

export const ExtensionPopupSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"scan" | "test" | "settings">("scan");
  const [quickCode, setQuickCode] = useState<string>(
    "// Step 1: Helper function to calculate total sum\nfunction calculateSum(numbers) {\n  let total = 0;\n  for (const n of numbers) {\n    total += n;\n  }\n  return total;\n}"
  );
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [quickResult, setQuickResult] = useState<{ score: number; verdict: string; generator: string } | null>(null);

  const handleTestSnippet = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      const isDidactic = /\/\/\s*(Step|Helper|Initialize|Return)/i.test(quickCode);
      const score = isDidactic ? 88 : 22;
      setQuickResult({
        score,
        verdict: score > 70 ? "AI-Generated" : "Human-Authored",
        generator: score > 70 ? "ChatGPT (GPT-4o)" : "Human Developer",
      });
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Description header */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
              Toolbar Extension
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <h2 className="text-base font-semibold text-white tracking-tight mt-0.5 flex items-center gap-2">
            <Laptop className="w-4 h-4 text-white/70" />
            Chrome Extension Popup Interface
          </h2>
          <p className="text-xs text-white/50 mt-0.5 max-w-2xl leading-relaxed">
            Test the exact compact UI users interact with when clicking the AI Code Detector extension icon in their Chrome toolbar.
          </p>
        </div>
      </div>

      {/* Centered Chrome Extension Popup Mockup */}
      <div className="flex justify-center py-6">
        <div className="w-full max-w-[360px] bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-[#d4d4d4] font-sans">
          {/* Header */}
          <div className="bg-[#080808] px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-xs font-bold text-white leading-none tracking-tight">AI CODE DETECTOR</h1>
                <span className="text-[10px] font-mono text-white/40">VERITAS CORE v2.1</span>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] text-emerald-400 font-mono">ONLINE</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="px-3 pt-3">
            <div className="bg-[#050505] p-1 rounded-xl flex space-x-1 border border-white/5 font-mono text-xs">
              <button
                onClick={() => setActiveTab("scan")}
                className={`flex-1 py-1.5 text-[11px] rounded-lg transition-all ${
                  activeTab === "scan" ? "bg-white text-black font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                Page Scan
              </button>
              <button
                onClick={() => setActiveTab("test")}
                className={`flex-1 py-1.5 text-[11px] rounded-lg transition-all ${
                  activeTab === "test" ? "bg-white text-black font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                Quick Test
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 py-1.5 text-[11px] rounded-lg transition-all ${
                  activeTab === "settings" ? "bg-white text-black font-semibold" : "text-white/50 hover:text-white"
                }`}
              >
                Settings
              </button>
            </div>
          </div>

          {/* TAB 1: Page Scan */}
          {activeTab === "scan" && (
            <div className="p-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-[#111] border border-white/5 p-3 rounded-xl text-center">
                  <span className="text-2xl font-light text-white italic serif block">4</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Blocks on Tab</span>
                </div>
                <div className="bg-[#111] border border-white/5 p-3 rounded-xl text-center">
                  <span className="text-2xl font-light text-amber-400 italic serif block">3</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Likely AI Code</span>
                </div>
              </div>

              <div className="bg-[#111] p-3 rounded-xl border border-white/5 text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/40 font-mono">Current Site:</span>
                  <span className="font-semibold text-white font-mono">github.com</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white/40 font-mono">Highest Risk:</span>
                  <span className="font-bold text-amber-400 font-mono">89% (verifySignature.ts)</span>
                </div>
              </div>

              <button className="w-full py-2 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RE-SCAN ACTIVE TAB</span>
              </button>
            </div>
          )}

          {/* TAB 2: Quick Test Snippet */}
          {activeTab === "test" && (
            <div className="p-4 space-y-3">
              <textarea
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value)}
                placeholder="Paste code snippet to test..."
                rows={4}
                className="w-full bg-[#111] border border-white/10 rounded-xl p-2.5 text-xs font-mono text-[#d4d4d4] focus:outline-none focus:border-white/30 resize-none"
              />

              <button
                onClick={handleTestSnippet}
                disabled={isTesting}
                className="w-full py-2 bg-white hover:bg-neutral-200 text-black rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5"
              >
                <Zap className={`w-3.5 h-3.5 ${isTesting ? "animate-spin" : ""}`} />
                <span>{isTesting ? "SCANNING..." : "RUN AST CHECK"}</span>
              </button>

              {quickResult && (
                <div className="bg-[#111] border border-white/10 rounded-xl p-3 text-xs space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-semibold ${
                        quickResult.score > 70 ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {quickResult.score}% {quickResult.verdict}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">{quickResult.generator}</span>
                  </div>
                  <p className="text-[11px] text-white/50">
                    {quickResult.score > 70
                      ? "Didactic comment patterns and standard boilerplate detected."
                      : "Natural human variance and compact syntax."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Settings */}
          {activeTab === "settings" && (
            <div className="p-4 space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/80">Auto-Scan Webpages</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-[#111] border-white/20 text-white focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/80">Floating Badges</span>
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded bg-[#111] border-white/20 text-white focus:ring-0"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <span className="text-white/80">Forensic Sensitivity</span>
                <select className="bg-[#111] border border-white/10 text-white/80 text-xs rounded-md px-2 py-1 font-mono">
                  <option>Balanced</option>
                  <option>Strict</option>
                  <option>Lenient</option>
                </select>
              </div>

              <div className="pt-2">
                <span className="text-[10px] font-mono text-white/30 block text-center">
                  Manifest V3 • Privacy Sandbox Verified
                </span>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="bg-[#080808] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[10px] text-white/40 font-mono">
            <span>AST Rule Engine + Gemini AI</span>
            <span className="text-white/70 hover:text-white cursor-pointer">Preferences</span>
          </div>
        </div>
      </div>
    </div>
  );
};

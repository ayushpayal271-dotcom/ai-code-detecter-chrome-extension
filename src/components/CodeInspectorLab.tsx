import React, { useState, useEffect } from "react";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Fingerprint,
  Info,
  Layers,
  FileCode2,
  RefreshCw,
  Search,
  Zap,
  BarChart3,
  HelpCircle,
  Check,
  Copy
} from "lucide-react";
import { CODE_PRESETS } from "../data/presets";
import { DetectionResult, CodePreset } from "../types";

export const CodeInspectorLab: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>("chatgpt-python-data");
  const [code, setCode] = useState<string>(CODE_PRESETS[0].code);
  const [language, setLanguage] = useState<string>(CODE_PRESETS[0].language);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [activeLineTooltip, setActiveLineTooltip] = useState<{ line: number; reason: string; score: number } | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSelectPreset = (preset: CodePreset) => {
    setSelectedPresetId(preset.id);
    setCode(preset.code);
    setLanguage(preset.language);
    setActiveLineTooltip(null);
    runAnalysis(preset.code, preset.language);
  };

  const runAnalysis = async (codeToAnalyze: string, lang: string) => {
    setIsAnalyzing(true);
    setActiveLineTooltip(null);
    try {
      const response = await fetch("/api/detect-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: codeToAnalyze, language: lang }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to analyze code:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    // Initial analysis on mount
    runAnalysis(code, language);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Color mapping based on AI score in Sophisticated Dark style
  const getScoreColor = (score: number) => {
    if (score >= 70)
      return {
        text: "text-amber-400",
        bg: "bg-gradient-to-r from-amber-600 to-red-500",
        border: "border-amber-500/30",
        badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      };
    if (score >= 40)
      return {
        text: "text-amber-300",
        bg: "bg-gradient-to-r from-amber-500 to-amber-600",
        border: "border-amber-500/20",
        badge: "bg-amber-500/10 text-amber-200 border-amber-500/20",
      };
    return {
      text: "text-emerald-400",
      bg: "bg-emerald-500",
      border: "border-emerald-500/30",
      badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    };
  };

  const scoreTheme = result ? getScoreColor(result.aiScore) : getScoreColor(50);

  const codeLines = code.split("\n");

  return (
    <div className="space-y-6">
      {/* Top Banner: Explanation */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3.5">
          <div className="p-2.5 rounded-lg bg-white/5 text-white/80 border border-white/10 shrink-0">
            <Fingerprint className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                Active Scanner
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </div>
            <h2 className="text-base font-semibold text-white tracking-tight mt-0.5">
              AI Code Forensics & Token Pattern Analyzer
            </h2>
            <p className="text-xs text-white/50 mt-0.5 max-w-2xl leading-relaxed">
              Inspects didactic step-by-step comments, boilerplate exception loops, syntax burstiness, and LLM signature markers.
            </p>
          </div>
        </div>

        {/* Preset Selector Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mr-1">Sample:</span>
          {CODE_PRESETS.map((p) => {
            const isSelected = selectedPresetId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                  isSelected
                    ? "bg-white text-black font-semibold shadow-xs"
                    : "bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {p.category === "ai" ? "🤖 " : "👤 "}
                {p.title.split(" ")[0]} ({p.language})
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Code Editor on Left, Forensic Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Code Input & Line Highlighter (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Editor Toolbar */}
            <div className="bg-[#080808] px-5 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-white/20"></div>
                </div>
                <span className="text-xs font-mono text-white/60 flex items-center gap-2">
                  <span className="text-white/40 uppercase text-[10px] tracking-widest">File:</span>
                  <span className="text-white/90">
                    inspector_workspace.{language === "python" ? "py" : language === "javascript" ? "js" : "ts"}
                  </span>
                </span>
              </div>

              <div className="flex items-center space-x-2.5">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-[#111] border border-white/10 text-white/80 rounded-md px-2.5 py-1 text-xs focus:outline-none focus:border-white/30 font-mono"
                >
                  <option value="python">Python</option>
                  <option value="typescript">TypeScript</option>
                  <option value="javascript">JavaScript</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                </select>

                <button
                  onClick={handleCopyCode}
                  className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  title="Copy code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>

                <button
                  id="btn-trigger-analysis"
                  onClick={() => runAnalysis(code, language)}
                  disabled={isAnalyzing}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-white text-black hover:bg-neutral-200 rounded-full text-xs font-bold transition-all disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isAnalyzing ? "animate-spin" : ""}`} />
                  <span>{isAnalyzing ? "SCANNING..." : "RE-SCAN FILE"}</span>
                </button>
              </div>
            </div>

            {/* Code Workspace with Line Numbers & Heatmap */}
            <div className="relative font-mono text-[13px] leading-relaxed flex min-h-[480px] max-h-[600px] overflow-auto bg-[#0c0c0c]">
              {/* Line numbers + Suspicion Heat Indicators */}
              <div className="bg-[#0a0a0a] border-r border-white/5 py-4 select-none text-white/30 text-right px-3 space-y-0.5 shrink-0">
                {codeLines.map((_, idx) => {
                  const lineNum = idx + 1;
                  const lineObj = result?.lineAnalysis?.find((l) => l.line === lineNum);
                  const isSuspicious = lineObj?.isSuspicious;

                  return (
                    <div
                      key={idx}
                      className={`h-5 leading-5 flex items-center justify-end space-x-1.5 cursor-pointer ${
                        isSuspicious ? "text-amber-400 font-bold" : ""
                      }`}
                      onClick={() => {
                        if (lineObj) {
                          setActiveLineTooltip(lineObj);
                        }
                      }}
                    >
                      {isSuspicious && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" title="AI signature pattern" />
                      )}
                      <span>{lineNum}</span>
                    </div>
                  );
                })}
              </div>

              {/* Code TextArea / Editable Surface */}
              <div className="flex-1 relative py-4 px-4">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full bg-transparent text-[#d4d4d4] resize-none outline-none font-mono text-[13px] leading-5 border-none p-0 focus:ring-0 whitespace-pre"
                  style={{ minHeight: `${Math.max(codeLines.length * 20 + 40, 460)}px` }}
                />
              </div>
            </div>

            {/* Line Tooltip / Info Banner if clicked */}
            {activeLineTooltip && (
              <div className="bg-amber-500/10 border-t border-amber-500/30 p-4 flex items-start justify-between text-xs animate-fadeIn">
                <div className="flex items-start space-x-2.5">
                  <span className="text-amber-400 font-bold">[!]</span>
                  <div>
                    <span className="font-semibold text-amber-300">
                      Line {activeLineTooltip.line} Pattern Detected ({activeLineTooltip.score}%):
                    </span>
                    <p className="text-amber-100/70 mt-0.5 leading-relaxed">{activeLineTooltip.reason}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveLineTooltip(null)}
                  className="text-white/60 hover:text-white px-2 py-0.5 text-xs bg-white/5 border border-white/10 rounded"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Detection Score & Forensics Breakdown (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          {/* Main Verdict Card */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            {isAnalyzing && (
              <div className="absolute inset-0 bg-[#0a0a0a]/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 space-y-3">
                <RefreshCw className="w-7 h-7 text-white animate-spin" />
                <p className="text-xs font-mono uppercase tracking-widest text-white/70">Forensic Pattern Matching...</p>
              </div>
            )}

            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                Detection Report
              </span>
              <span className={`px-2.5 py-0.5 rounded text-[11px] font-mono ${scoreTheme.badge}`}>
                {result?.verdict || "ANALYZING..."}
              </span>
            </div>

            {/* Probability Gauge in Sophisticated Dark style */}
            <div className="py-6">
              <div className="flex justify-between items-end mb-3">
                <span className="text-4xl font-light text-white italic serif">
                  {result?.aiScore ?? "--"}%
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1">
                  AI Confidence
                </span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                <div
                  className={`h-full ${scoreTheme.bg} transition-all duration-700 ease-out`}
                  style={{ width: `${result?.aiScore || 0}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5 text-white/50">
                <span>Model Signature:</span>
                <span className="font-mono text-white/80 font-semibold">{result?.likelyGenerator || "Veritas AST Engine"}</span>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-[#111] rounded-xl p-3.5 border border-white/5 text-xs text-white/70 leading-relaxed">
              <p>{result?.explanation || "Analyzing syntax and structural characteristics..."}</p>
            </div>
          </div>

          {/* Sub-Metrics Radar / Gauges */}
          {result?.metrics && (
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 shadow-lg">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono block mb-3.5">
                Forensic Structural Metrics
              </span>
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-white/60">Syntax Uniformity</span>
                    <span className="text-white font-mono">{result.metrics.structuralUniformity}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 rounded-full"
                      style={{ width: `${result.metrics.structuralUniformity}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-white/60">Comment Density</span>
                    <span className="text-white font-mono">{result.metrics.commentDensity}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 rounded-full"
                      style={{ width: `${result.metrics.commentDensity}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-white/60">Boilerplate Index</span>
                    <span className="text-white font-mono">{result.metrics.boilerplateIndex}%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/30 rounded-full"
                      style={{ width: `${result.metrics.boilerplateIndex}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1.5">
                    <span className="text-white/60">Didactic Patterns</span>
                    <span className="text-white font-mono">{result.metrics.didacticPatternCount} detected</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${Math.min(result.metrics.didacticPatternCount * 25, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Forensic Heuristic Flags List */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 shadow-lg flex-1">
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
                Pattern Flags ({result?.heuristicFlags?.length || 0})
              </span>
              <span className="text-[10px] text-white/40 font-mono">VERITAS-CORE-V2.1</span>
            </div>

            <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
              {result?.heuristicFlags && result.heuristicFlags.length > 0 ? (
                result.heuristicFlags.map((flag, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start space-x-2.5"
                  >
                    <span className="text-amber-400 font-bold mt-0.5 text-xs">[!]</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-amber-200">{flag.title}</span>
                        {flag.lineNumbers && flag.lineNumbers.length > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono border border-amber-500/20">
                            Line {flag.lineNumbers.join(", ")}
                          </span>
                        )}
                      </div>
                      <p className="text-amber-100/70 text-[11px] mt-1 leading-normal">{flag.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-white/40 text-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                  <p>No synthetic AI anomalies or didactic markers detected.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

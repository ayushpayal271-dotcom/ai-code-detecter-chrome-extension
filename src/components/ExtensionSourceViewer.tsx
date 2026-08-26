import React, { useState } from "react";
import { FileCode, Copy, Check, Download, Folder, Code, Terminal, ExternalLink } from "lucide-react";
import { EXTENSION_FILES } from "../data/extensionFiles";
import { downloadExtensionZip } from "../utils/zipGenerator";

export const ExtensionSourceViewer: React.FC = () => {
  const [selectedFileName, setSelectedFileName] = useState<string>("manifest.json");
  const [copied, setCopied] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<boolean>(false);

  const selectedFile = EXTENSION_FILES.find((f) => f.name === selectedFileName) || EXTENSION_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setDownloading(true);
    try {
      await downloadExtensionZip();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
              Manifest V3 Standard
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </div>
          <h2 className="text-base font-semibold text-white tracking-tight mt-0.5 flex items-center gap-2">
            <FileCode className="w-4 h-4 text-white/70" />
            Chrome Extension Source Bundle
          </h2>
          <p className="text-xs text-white/50 mt-0.5 max-w-2xl leading-relaxed">
            Browse and inspect all ready-to-load files included in the standalone downloadable extension package.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={downloading}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-neutral-200 text-black rounded-full text-xs font-bold transition-all self-start md:self-auto shadow-sm"
        >
          <Download className={`w-3.5 h-3.5 ${downloading ? "animate-bounce" : ""}`} />
          <span>{downloading ? "PACKAGING ZIP..." : "DOWNLOAD EXTENSION .ZIP"}</span>
        </button>
      </div>

      {/* Code Viewer Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: File Tree (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center justify-between px-2 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white/40 border-b border-white/5 mb-3">
              <div className="flex items-center space-x-2">
                <Folder className="w-3.5 h-3.5 text-white/60" />
                <span>Package Files</span>
              </div>
              <span>{EXTENSION_FILES.length} Files</span>
            </div>

            <div className="space-y-1">
              {EXTENSION_FILES.map((file) => {
                const isSelected = file.name === selectedFileName;
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFileName(file.name)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all text-left ${
                      isSelected
                        ? "bg-white text-black font-semibold shadow-xs"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Code className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase ${isSelected ? "text-black/60" : "text-white/30"}`}>
                      {file.language}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Syntax Highlighted File Viewer (8 cols) */}
        <div className="lg:col-span-8">
          <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="bg-[#080808] px-5 py-3 border-b border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-white block">{selectedFile.name}</span>
                <span className="text-[11px] text-white/50">{selectedFile.description}</span>
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 rounded-md text-xs font-mono transition-colors border border-white/10"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "COPIED" : "COPY FILE"}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="p-5 font-mono text-[13px] text-[#d4d4d4] overflow-x-auto max-h-[560px] bg-[#0c0c0c] leading-relaxed">
              <pre>
                <code>{selectedFile.content}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

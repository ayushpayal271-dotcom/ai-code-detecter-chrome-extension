import React, { useState } from "react";
import { Download, HelpCircle, CheckCircle, ArrowRight, Shield, Layers, Laptop, ExternalLink } from "lucide-react";
import { downloadExtensionZip } from "../utils/zipGenerator";

export const InstallGuide: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadExtensionZip();
    } finally {
      setDownloading(false);
    }
  };

  const steps = [
    {
      num: "01",
      title: "Download & Extract the Extension ZIP",
      desc: "Click 'Download Extension .ZIP' and unzip the contents to a directory on your machine (e.g. ai-code-detector-extension).",
      action: (
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-3 inline-flex items-center space-x-2 px-3.5 py-1.5 bg-white hover:bg-neutral-200 text-black rounded-full text-xs font-bold transition-all shadow-xs"
        >
          <Download className={`w-3.5 h-3.5 ${downloading ? "animate-bounce" : ""}`} />
          <span>{downloading ? "PACKAGING..." : "DOWNLOAD EXTENSION .ZIP"}</span>
        </button>
      ),
    },
    {
      num: "02",
      title: "Open Chrome Extensions Page",
      desc: "Open Google Chrome or any Chromium browser (Brave, Edge, Arc) and enter chrome://extensions in the URL bar.",
      code: "chrome://extensions",
    },
    {
      num: "03",
      title: "Enable 'Developer mode'",
      desc: "In the top right corner of the Extensions dashboard, toggle the switch for 'Developer mode' to ON.",
      badge: "Developer mode: ON",
    },
    {
      num: "04",
      title: "Click 'Load unpacked' and Select Folder",
      desc: "Click the 'Load unpacked' button on the top left toolbar, then select the unzipped directory containing manifest.json.",
      highlight: "Select the folder with manifest.json",
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero card */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-7 shadow-2xl text-center">
        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center mb-4">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div className="flex items-center justify-center space-x-2 mb-1">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">
            Setup Guide
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">
          How to Load the Extension into Google Chrome
        </h2>
        <p className="text-xs text-white/50 mt-1 max-w-xl mx-auto leading-relaxed">
          The generated extension is 100% Manifest V3 compliant. Follow these quick steps to load it into Chrome in under 30 seconds.
        </p>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden"
          >
            <div className="flex items-start space-x-3.5">
              <span className="w-8 h-8 rounded-lg bg-white/5 text-white/80 border border-white/10 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                {step.num}
              </span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white tracking-tight">{step.title}</h3>
                <p className="text-xs text-white/50 mt-1.5 leading-relaxed">{step.desc}</p>
                {step.code && (
                  <div className="mt-3 bg-[#050505] px-3 py-1.5 rounded-lg border border-white/10 font-mono text-xs text-white/90 select-all">
                    {step.code}
                  </div>
                )}
                {step.action && step.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Supported Sites Showcase */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-5">
        <h3 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-3.5">
          Automatic DOM Detection Targets Supported
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-[#0c0c0c] border border-white/5 rounded-xl flex items-center space-x-2">
            <span className="text-base">🐙</span>
            <span className="font-semibold text-white/80 font-mono text-xs">GitHub PRs</span>
          </div>
          <div className="p-3 bg-[#0c0c0c] border border-white/5 rounded-xl flex items-center space-x-2">
            <span className="text-base">🏆</span>
            <span className="font-semibold text-white/80 font-mono text-xs">LeetCode Code</span>
          </div>
          <div className="p-3 bg-[#0c0c0c] border border-white/5 rounded-xl flex items-center space-x-2">
            <span className="text-base">💬</span>
            <span className="font-semibold text-white/80 font-mono text-xs">StackOverflow</span>
          </div>
          <div className="p-3 bg-[#0c0c0c] border border-white/5 rounded-xl flex items-center space-x-2">
            <span className="text-base">🤖</span>
            <span className="font-semibold text-white/80 font-mono text-xs">ChatGPT & LLMs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

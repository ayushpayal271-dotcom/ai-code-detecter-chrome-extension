import React, { useState } from "react";
import { Shield, Download, Sparkles, Code2, Globe, Laptop, FileCode, HelpCircle, Check } from "lucide-react";
import { downloadExtensionZip } from "../utils/zipGenerator";

interface HeaderProps {
  activeTab: "lab" | "simulator" | "popup" | "source" | "guide";
  setActiveTab: (tab: "lab" | "simulator" | "popup" | "source" | "guide") => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = async () => {
    try {
      setDownloading(true);
      await downloadExtensionZip();
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (err) {
      console.error("Failed to package extension ZIP:", err);
    } finally {
      setDownloading(false);
    }
  };

  const navItems = [
    { id: "lab", label: "Code Inspector Lab", icon: Code2 },
    { id: "simulator", label: "Browser Simulator (GitHub/LeetCode)", icon: Globe },
    { id: "popup", label: "Extension Popup UI", icon: Laptop },
    { id: "source", label: "Manifest V3 Source", icon: FileCode },
    { id: "guide", label: "Install in Chrome", icon: HelpCircle },
  ] as const;

  return (
    <header className="border-b border-white/5 bg-[#080808]/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Branding */}
          <div className="flex items-center space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center shadow-md text-white font-bold text-sm">
              V
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-semibold text-white text-base tracking-tight">
                  Veritas Code
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-white/5 text-white/70 border border-white/10">
                  Manifest V3
                </span>
                <div className="hidden sm:flex items-center space-x-1.5 pl-2 border-l border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-mono text-emerald-400">Protection Active</span>
                </div>
              </div>
              <p className="text-[11px] text-white/40 font-mono tracking-tight hidden sm:block">
                Forensic AST token analysis & neural pattern detector
              </p>
            </div>
          </div>

          {/* Action Button: Download Extension ZIP */}
          <div className="flex items-center space-x-3">
            <button
              id="btn-download-extension-zip"
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-bold text-black bg-white hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>EXTENSION READY</span>
                </>
              ) : (
                <>
                  <Download className={`w-3.5 h-3.5 ${downloading ? "animate-bounce" : ""}`} />
                  <span>{downloading ? "PACKAGING..." : "DOWNLOAD EXTENSION .ZIP"}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-1.5 overflow-x-auto py-2 scrollbar-none border-t border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-white/10 text-white shadow-xs"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    isActive ? "bg-emerald-500" : "bg-transparent border border-white/20"
                  }`}
                />
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-white/50"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

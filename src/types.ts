export interface HeuristicFlag {
  title: string;
  description: string;
  severity: "high" | "medium" | "low";
  lineNumbers?: number[];
}

export interface LineAnalysis {
  line: number;
  isSuspicious: boolean;
  score: number;
  reason: string;
}

export interface DetectionMetrics {
  commentDensity: number;
  structuralUniformity: number;
  didacticPatternCount: number;
  boilerplateIndex: number;
}

export interface DetectionResult {
  aiScore: number; // 0 - 100
  verdict: "AI-Generated" | "Likely AI-Assisted" | "Mixed Human/AI" | "Likely Human-Authored" | string;
  confidence: number; // 0 - 100
  likelyGenerator: string;
  explanation: string;
  heuristicFlags: HeuristicFlag[];
  lineAnalysis: LineAnalysis[];
  metrics: DetectionMetrics;
  recommendations?: string[];
  modelUsed?: string;
  note?: string;
}

export interface CodePreset {
  id: string;
  title: string;
  language: string;
  category: "ai" | "human" | "mixed";
  sourceName: string;
  code: string;
  description: string;
}

export interface SimulatedPage {
  id: string;
  title: string;
  siteName: "GitHub" | "LeetCode" | "StackOverflow" | "ChatGPT";
  url: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  description: string;
  codeBlocks: Array<{
    id: string;
    language: string;
    code: string;
    label: string;
    preCalculatedScore: number;
    verdict: string;
    generator: string;
  }>;
}

export interface ExtensionFile {
  name: string;
  path: string;
  language: string;
  content: string;
  description: string;
}

import React, { useState } from 'react';
import { BookOpen, Code2, Copy, Check, Download, ExternalLink, Sparkles, HelpCircle } from 'lucide-react';
import { CONCEPT_GUIDES, PURE_JAVASCRIPT_SOLUTION } from '../utils/solutionCode';

export const ConceptBreakdown: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number | 'full'>(1);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDownloadSolution = () => {
    const blob = new Blob([PURE_JAVASCRIPT_SOLUTION], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_solution.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const currentGuide = CONCEPT_GUIDES.find((g) => g.step === activeTab);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span>Solution &amp; Concept Mastery Guide</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-violet-950 text-violet-300 border border-violet-800 font-mono">
                5 Core Pillars
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Complete standalone code solution &amp; architectural explanation for each requirement
            </p>
          </div>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleCopy(PURE_JAVASCRIPT_SOLUTION, 'full')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
          >
            {copiedCode === 'full' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Solution Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Full .JS Solution</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadSolution}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-500 rounded-lg shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .js</span>
          </button>
        </div>
      </div>

      {/* Concept Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-800/80 text-xs">
        <button
          onClick={() => setActiveTab('full')}
          className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'full'
              ? 'bg-violet-600/20 text-violet-300 border border-violet-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>Full Solution Script</span>
        </button>

        {CONCEPT_GUIDES.map((g) => (
          <button
            key={g.step}
            onClick={() => setActiveTab(g.step)}
            className={`px-3 py-2 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === g.step
                ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center font-mono">
              {g.step}
            </span>
            <span>{g.title.split('. ')[1]}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'full' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Standalone script executable directly in Node.js or browser console:
            </span>
            <span className="font-mono text-emerald-400 text-[11px]">
              Matches exact expected project output
            </span>
          </div>

          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>inventory_solution.js</span>
              <button
                onClick={() => handleCopy(PURE_JAVASCRIPT_SOLUTION, 'full')}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copiedCode === 'full' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedCode === 'full' ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-[460px] leading-relaxed selection:bg-indigo-500/30">
              <code>{PURE_JAVASCRIPT_SOLUTION}</code>
            </pre>
          </div>
        </div>
      ) : currentGuide ? (
        <div className="space-y-4">
          {/* Guide Header */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentGuide.title}</span>
            </div>
            <h3 className="text-sm font-semibold text-slate-100">
              {currentGuide.subtitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentGuide.description}
            </p>
          </div>

          {/* Code Snippet */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span>Implementation Snippet</span>
              <button
                onClick={() =>
                  handleCopy(currentGuide.codeSnippet, `guide-${currentGuide.step}`)
                }
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
              >
                {copiedCode === `guide-${currentGuide.step}` ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>
                  {copiedCode === `guide-${currentGuide.step}`
                    ? 'Copied'
                    : 'Copy Snippet'}
                </span>
              </button>
            </div>
            <pre className="p-4 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed bg-slate-950">
              <code>{currentGuide.codeSnippet}</code>
            </pre>
          </div>

          {/* Key Insights & Takeaways */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>Key Concept Insights for Students:</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentGuide.keyPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed"
                >
                  <span className="w-4 h-4 rounded-full bg-slate-800 text-slate-400 text-[10px] inline-flex items-center justify-center font-mono mr-1.5">
                    {idx + 1}
                  </span>
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

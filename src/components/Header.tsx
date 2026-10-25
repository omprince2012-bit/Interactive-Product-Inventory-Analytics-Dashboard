import React from 'react';
import { Sparkles, Terminal, Play, RotateCcw, Copy, Check, Download, Layers } from 'lucide-react';
import { PURE_JAVASCRIPT_SOLUTION } from '../utils/solutionCode';

interface HeaderProps {
  onRunSimulation: () => void;
  onResetDefault: () => void;
  onOpenPrompt: () => void;
  isSimulating?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onRunSimulation,
  onResetDefault,
  onOpenPrompt,
  isSimulating = false,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopySolution = () => {
    navigator.clipboard.writeText(PURE_JAVASCRIPT_SOLUTION);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Title & Badge */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                Product Inventory &amp; Analytics Dashboard
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Capstone Solution
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interactive Console Simulator &amp; Core JavaScript Concept Reference
            </p>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Simulate Prompt */}
          <button
            onClick={onOpenPrompt}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-300 hover:text-white bg-indigo-950/70 hover:bg-indigo-900/80 border border-indigo-700/60 rounded-lg transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Simulate prompt()</span>
          </button>

          {/* Run / Re-run */}
          <button
            onClick={onRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Run Simulation</span>
          </button>

          {/* Reset to Spec Default */}
          <button
            onClick={onResetDefault}
            title="Reset to default spec ('Monitor' at $150)"
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset Spec</span>
          </button>

          {/* Copy Solution */}
          <button
            onClick={handleCopySolution}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied JS!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          {/* Download Solution */}
          <button
            onClick={handleDownloadSolution}
            title="Download inventory_solution.js"
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

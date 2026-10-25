import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, RotateCcw, Sparkles } from 'lucide-react';
import { ConsoleLogMessage } from '../types/inventory';

interface ConsoleTerminalProps {
  logs: ConsoleLogMessage[];
  onClear: () => void;
  onRerun: () => void;
  isRunning?: boolean;
  onOpenPrompt: () => void;
}

export const ConsoleTerminal: React.FC<ConsoleTerminalProps> = ({
  logs,
  onClear,
  onRerun,
  isRunning = false,
  onOpenPrompt,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const rawText = logs
      .map((log) => log.text)
      .join('\n');
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2">
          {/* Mac-style traffic lights */}
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="ml-2 text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>node inventory_solution.js</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">
              STDOUT
            </span>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPrompt}
            title="Simulate prompt() input"
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-indigo-300 hover:text-indigo-200 bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-700/50 rounded-md transition-colors"
          >
            <Sparkles className="w-3 h-3 text-indigo-400" />
            <span>Simulate prompt()</span>
          </button>
          <button
            onClick={onRerun}
            disabled={isRunning}
            title="Re-run program"
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors disabled:opacity-50"
          >
            <RotateCcw className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Re-run</span>
          </button>
          <button
            onClick={handleCopy}
            title="Copy Console Output"
            className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Output Area */}
      <div className="p-4 flex-1 overflow-y-auto space-y-2 selection:bg-indigo-500/30 selection:text-indigo-200 min-h-[340px]">
        {/* Shell prompt line */}
        <div className="flex items-center gap-2 text-slate-500 text-xs pb-1 border-b border-slate-900">
          <span className="text-emerald-400">student@js-sandbox</span>
          <span>:</span>
          <span className="text-indigo-400">~/inventory-project</span>
          <span>$</span>
          <span className="text-slate-200 font-semibold">node solution.js</span>
        </div>

        {/* Logs */}
        {logs.length === 0 ? (
          <div className="py-12 text-center text-slate-600 italic">
            Console cleared. Click &quot;Re-run&quot; or &quot;Simulate prompt()&quot; to execute.
          </div>
        ) : (
          <div className="space-y-1.5 pt-1">
            {logs.map((log) => {
              // Format category highlights
              if (log.type === 'header') {
                return (
                  <div
                    key={log.id}
                    className="text-amber-400 font-bold tracking-wide pt-2 pb-0.5 text-xs flex items-center justify-between"
                  >
                    <span>{log.text}</span>
                    {log.stepNumber && (
                      <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-amber-400/10 text-amber-300/80 border border-amber-400/20">
                        Step {log.stepNumber}
                      </span>
                    )}
                  </div>
                );
              }

              if (log.type === 'prompt') {
                return (
                  <div
                    key={log.id}
                    className="text-sky-300 bg-sky-950/40 px-3 py-1.5 rounded border border-sky-800/40 text-xs flex items-center justify-between"
                  >
                    <span>{log.text}</span>
                    <span className="text-[10px] text-sky-400 font-sans">
                      Explicit Number() parsed
                    </span>
                  </div>
                );
              }

              if (log.type === 'item') {
                const isPremium = log.category === 'Premium';
                const isBudget = log.category === 'Budget';
                const isStandard = log.category === 'Standard';

                return (
                  <div
                    key={log.id}
                    className="text-slate-300 text-xs flex items-center justify-between hover:bg-slate-900/60 px-2 py-1 rounded transition-colors"
                  >
                    <div>{log.text}</div>
                    <span
                      className={`text-[10px] font-sans px-2 py-0.5 rounded-full font-medium ${
                        isPremium
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : isBudget
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {log.category}
                    </span>
                  </div>
                );
              }

              if (log.type === 'stat') {
                return (
                  <div
                    key={log.id}
                    className="text-emerald-300 text-xs bg-slate-900/40 px-2.5 py-1 rounded border-l-2 border-emerald-500"
                  >
                    {log.text}
                  </div>
                );
              }

              return (
                <div key={log.id} className="text-slate-300 text-xs">
                  {log.text}
                </div>
              );
            })}
          </div>
        )}

        {/* Blinking cursor */}
        <div className="flex items-center gap-1.5 pt-2 text-slate-500 text-xs">
          <span className="text-emerald-400">❯</span>
          <span className="w-2 h-4 bg-emerald-400/80 animate-pulse inline-block"></span>
        </div>
      </div>

      {/* Terminal Footer Info */}
      <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Simulation Active · ES6+ Syntax Engine</span>
        </span>
        <button
          onClick={onClear}
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          Clear Terminal
        </button>
      </div>
    </div>
  );
};

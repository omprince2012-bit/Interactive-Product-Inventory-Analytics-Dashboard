import React from 'react';
import { 
  CheckCircle2, 
  Code, 
  Layers, 
  Terminal, 
  Zap, 
  HelpCircle,
  FileCode,
  ArrowRight
} from 'lucide-react';

interface ProjectOverviewProps {
  onScrollToDemo: () => void;
  onScrollToCode: () => void;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  onScrollToDemo,
  onScrollToCode,
}) => {
  const requirements = [
    {
      num: '1',
      title: 'Data & Input Initialization',
      badge: 'Data Structures',
      desc: 'Prompts user for product name and price using prompt(). Explicitly converts string inputs to numbers using Number() or parseFloat(), then stores items in an array of objects.',
      concepts: ['prompt()', 'Number()', 'Array of Objects', 'push()'],
      color: 'indigo',
    },
    {
      num: '2',
      title: 'Control Flow & Conditionals',
      badge: 'Logic & Classification',
      desc: 'Validates input data with if...else. Uses a switch block to assign dynamic category badges (Budget ≤ $50, Standard $50–$500, Premium ≥ $500).',
      concepts: ['if...else', 'switch (true)', 'Validation', 'isNaN()'],
      color: 'purple',
    },
    {
      num: '3',
      title: 'Loops & Flow Control',
      badge: 'Control Flow',
      desc: 'Uses loops with break to stop searching once a target item is located, and continue to skip bad, missing, or negative prices cleanly without crashing.',
      concepts: ['for loop', 'break statement', 'continue statement'],
      color: 'amber',
    },
    {
      num: '4',
      title: 'Functions & Scope',
      badge: 'Encapsulation',
      desc: 'Implements regular functions for total statistics with private local scoping, and arrow functions with default parameters for tax and discount modifiers.',
      concepts: ['Regular Function', 'Arrow Function', 'Local Scope', 'Default Params'],
      color: 'emerald',
    },
    {
      num: '5',
      title: 'Array Methods & Iteration',
      badge: 'Functional ES6',
      desc: 'Leverages forEach() to log inventory rosters, filter() to isolate affordable items under $200, and map() to transform items into uppercase report lines.',
      concepts: ['forEach()', 'filter()', 'map()', 'Method Chaining'],
      color: 'sky',
    },
  ];

  return (
    <section className="space-y-6">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-900/40 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider font-mono">
            <Zap className="w-3.5 h-3.5 text-indigo-400" />
            <span>Capstone Mini Project Specification</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Product Inventory &amp; Analytics Dashboard
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Build an integrated console-based JavaScript application that brings together all core programming fundamentals into one cohesive program. This interactive website presents the project description, visual simulation, and complete verified solution.
          </p>

          {/* Quick CTA buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={onScrollToDemo}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <span>Test Live Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onScrollToCode}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2"
            >
              <FileCode className="w-4 h-4 text-slate-400" />
              <span>View Solution Code</span>
            </button>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-slate-800/80">
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-white">5</div>
            <div className="text-xs text-slate-400">Core JavaScript Requirements</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">$975</div>
            <div className="text-xs text-slate-400">Expected Total Value</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-sky-400">3 Methods</div>
            <div className="text-xs text-slate-400">forEach, filter, map</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-indigo-400">100%</div>
            <div className="text-xs text-slate-400">Vanilla ES6+ Compatible</div>
          </div>
        </div>
      </div>

      {/* Core Requirements Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-400" />
              <span>Core Requirements &amp; Implementation Flow</span>
            </h2>
            <p className="text-xs text-slate-400">
              The 5 essential building blocks required by the project brief
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requirements.map((req) => (
            <div
              key={req.num}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 font-mono font-bold text-xs flex items-center justify-center">
                    {req.num}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                    {req.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-100 text-sm">
                    {req.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {req.desc}
                  </p>
                </div>
              </div>

              {/* Tag concepts */}
              <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                {req.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="text-[10px] font-mono bg-slate-950 text-indigo-300 px-2 py-0.5 rounded border border-slate-800"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Expected Console Card */}
          <div className="bg-slate-950 border border-indigo-900/50 rounded-2xl p-5 shadow-lg flex flex-col justify-between font-mono text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5 text-indigo-300 font-semibold font-sans text-xs">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Target Console Simulation</span>
                </span>
                <span className="text-[10px] text-emerald-400">Expected Output</span>
              </div>
              <div className="text-slate-300 space-y-1 text-[11px] leading-tight">
                <div className="text-amber-400 font-bold">--- Initializing Inventory System ---</div>
                <div className="text-sky-300">[Prompt executed: User adds &quot;Monitor&quot; at &quot;$150&quot;]</div>
                <div className="text-amber-400 font-bold pt-1">--- Processing Inventory Roster (forEach) ---</div>
                <div className="text-slate-300">* Item: Laptop ($800) -&gt; Category: Premium</div>
                <div className="text-slate-300">* Item: Mouse ($25) -&gt; Category: Budget</div>
                <div className="text-slate-300">* Item: Monitor ($150) -&gt; Category: Standard</div>
                <div className="text-amber-400 font-bold pt-1">--- Financial Analytics ---</div>
                <div className="text-emerald-300">Total Inventory Value: $975</div>
                <div className="text-emerald-300">Filtered Affordable Items: [&quot;Mouse&quot;, &quot;Monitor&quot;]</div>
                <div className="text-emerald-300">Formatted Report List: [&quot;LAPTOP: $800&quot;, &quot;MOUSE: $25&quot;, &quot;MONITOR: $150&quot;]</div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-900 flex items-center justify-between text-[11px] font-sans text-slate-500">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Verified Match
              </span>
              <button
                onClick={onScrollToDemo}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Run Live &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

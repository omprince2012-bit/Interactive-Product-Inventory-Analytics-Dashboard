import React, { useState } from 'react';
import { Search, SkipForward, Ban, CheckCircle2, AlertTriangle, ArrowRight, Play, RotateCcw } from 'lucide-react';
import { InventoryItem } from '../types/inventory';

interface LoopSearchSandboxProps {
  items: InventoryItem[];
}

export const LoopSearchSandbox: React.FC<LoopSearchSandboxProps> = ({ items }) => {
  const [searchTarget, setSearchTarget] = useState('Mouse');
  const [includeCorruptedItem, setIncludeCorruptedItem] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);
  const [stepLogs, setStepLogs] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Prepare inventory with optional corrupted item in between to demonstrate 'continue'
  const testInventory = React.useMemo(() => {
    const list = [...items];
    if (includeCorruptedItem) {
      list.splice(1, 0, {
        id: 'corrupt-1',
        name: 'Broken Cable (Bad Data)',
        price: -15, // Invalid price!
        category: 'Budget',
        isValid: false,
      });
    }
    return list;
  }, [items, includeCorruptedItem]);

  const runFullSearch = () => {
    const logs: string[] = [];
    logs.push(`🔍 Initiating for-loop search for target: "${searchTarget}"`);

    let found = false;
    for (let i = 0; i < testInventory.length; i++) {
      const item = testInventory[i];
      logs.push(`Iteration [${i}]: Checking "${item.name}" ($${item.price})`);

      // 'continue' test
      if (!item.price || item.price <= 0 || isNaN(item.price)) {
        logs.push(`  ⚠️ Bad data detected! Executing 'continue' to skip index [${i}].`);
        continue;
      }

      // 'break' test
      if (item.name.toLowerCase().includes(searchTarget.toLowerCase())) {
        logs.push(`  ✅ Target found! Executing 'break' to terminate loop immediately at index [${i}].`);
        found = true;
        break;
      } else {
        logs.push(`  ➡️ No match, proceeding to next iteration.`);
      }
    }

    if (!found) {
      logs.push(`❌ Loop completed. Target "${searchTarget}" not found in valid inventory.`);
    }

    setStepLogs(logs);
    setCurrentStepIndex(testInventory.length - 1);
    setIsCompleted(true);
  };

  const resetSearch = () => {
    setCurrentStepIndex(null);
    setStepLogs([]);
    setIsCompleted(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span>Loop Flow Control Sandbox</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                break &amp; continue
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Requirement 3: Search array, skip invalid records, and exit early
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={resetSearch}
            className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button
            onClick={runFullSearch}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Simulate Search Loop</span>
          </button>
        </div>
      </div>

      {/* Target input & Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div>
          <label className="text-slate-300 font-medium block mb-1">
            Search Target Product:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchTarget}
              onChange={(e) => {
                setSearchTarget(e.target.value);
                resetSearch();
              }}
              placeholder="e.g. Mouse, Laptop"
              className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-5">
          <label className="flex items-center gap-2 cursor-pointer text-slate-300 text-xs">
            <input
              type="checkbox"
              checked={includeCorruptedItem}
              onChange={(e) => {
                setIncludeCorruptedItem(e.target.checked);
                resetSearch();
              }}
              className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
            />
            <span>Inject corrupted item ($&minus;15) to trigger <code>continue</code></span>
          </label>
        </div>
      </div>

      {/* Visual Array Flow Pipeline */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono text-slate-400 block">
          Array Traversal Sequence:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {testInventory.map((item, idx) => {
            const isCorrupt = !item.price || item.price <= 0;
            const isMatch = item.name.toLowerCase().includes(searchTarget.toLowerCase());

            return (
              <div
                key={item.id || idx}
                className={`p-3 rounded-xl border transition-all text-xs space-y-1.5 ${
                  isCorrupt
                    ? 'bg-rose-950/30 border-rose-800/50 text-rose-300'
                    : isMatch
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-500">Index [{idx}]</span>
                  {isCorrupt && (
                    <span className="text-rose-400 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Triggers continue
                    </span>
                  )}
                  {!isCorrupt && isMatch && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Triggers break
                    </span>
                  )}
                </div>

                <div className="font-medium text-slate-100 truncate">
                  {item.name}
                </div>
                <div className="font-mono text-xs text-slate-400">
                  Price: ${item.price}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step logs if executed */}
      {stepLogs.length > 0 && (
        <div className="bg-slate-950 rounded-xl p-3.5 border border-slate-800/80 font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
          {stepLogs.map((log, i) => (
            <div
              key={i}
              className={`${
                log.includes('✅')
                  ? 'text-emerald-400 font-semibold'
                  : log.includes('⚠️')
                  ? 'text-amber-400'
                  : log.includes('❌')
                  ? 'text-rose-400'
                  : 'text-slate-400'
              }`}
            >
              {log}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

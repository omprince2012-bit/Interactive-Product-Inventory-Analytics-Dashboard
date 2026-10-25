import React from 'react';
import { Layers, Plus, Tag, ShieldCheck, Sparkles, Laptop, Mouse, Monitor, Package } from 'lucide-react';
import { InventoryItem } from '../types/inventory';

interface InventoryRosterProps {
  items: InventoryItem[];
  onOpenPrompt: () => void;
  onDeleteItem?: (id: string) => void;
}

export const InventoryRoster: React.FC<InventoryRosterProps> = ({
  items,
  onOpenPrompt,
}) => {
  const getItemIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('laptop')) return <Laptop className="w-5 h-5 text-indigo-400" />;
    if (lower.includes('mouse')) return <Mouse className="w-5 h-5 text-emerald-400" />;
    if (lower.includes('monitor')) return <Monitor className="w-5 h-5 text-sky-400" />;
    return <Package className="w-5 h-5 text-amber-400" />;
  };

  const getBadgeStyle = (category: string) => {
    switch (category) {
      case 'Premium':
        return {
          bg: 'bg-purple-950/50 border-purple-500/40 text-purple-300',
          dot: 'bg-purple-400',
          threshold: 'Price ≥ $500',
        };
      case 'Budget':
        return {
          bg: 'bg-emerald-950/50 border-emerald-500/40 text-emerald-300',
          dot: 'bg-emerald-400',
          threshold: 'Price ≤ $50',
        };
      default:
        return {
          bg: 'bg-sky-950/50 border-sky-500/40 text-sky-300',
          dot: 'bg-sky-400',
          threshold: '$50 < Price < $500',
        };
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span>Inventory Roster</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-normal">
                {items.length} items
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Evaluated via forEach() &amp; dynamic switch(true) categorization
            </p>
          </div>
        </div>

        <button
          onClick={onOpenPrompt}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add via prompt()</span>
        </button>
      </div>

      {/* Grid of Item Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {items.map((item, index) => {
          const badgeStyle = getBadgeStyle(item.category);

          return (
            <div
              key={item.id || index}
              className="group relative bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                    {getItemIcon(item.name)}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-100 text-sm">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Index [{index}]
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-bold text-slate-100 font-mono">
                    ${item.price}
                  </span>
                </div>
              </div>

              {/* Bottom row: Category Badge & Logic info */}
              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between text-xs">
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium ${badgeStyle.bg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${badgeStyle.dot}`}></span>
                  <span>{item.category}</span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono">
                  {badgeStyle.threshold}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Rule Insight */}
      <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800/60 text-xs text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>
            <strong className="text-slate-300">Switch (true) logic:</strong> Laptop ($800) ➔ Premium, Monitor ($150) ➔ Standard, Mouse ($25) ➔ Budget.
          </span>
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Requirement 2</span>
      </div>
    </div>
  );
};

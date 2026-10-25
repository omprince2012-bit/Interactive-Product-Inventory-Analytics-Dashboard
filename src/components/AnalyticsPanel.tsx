import React, { useState } from 'react';
import { DollarSign, Filter, FileText, Percent, Calculator, ArrowRight, Code } from 'lucide-react';
import { FinancialAnalytics, InventoryItem } from '../types/inventory';
import { calculateDiscount, calculateTax } from '../utils/inventoryEngine';

interface AnalyticsPanelProps {
  analytics: FinancialAnalytics;
  items: InventoryItem[];
  onThresholdChange?: (threshold: number) => void;
}

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  analytics,
  items,
  onThresholdChange,
}) => {
  const [sliderThreshold, setSliderThreshold] = useState<number>(analytics.affordableThreshold || 200);
  const [discountRate, setDiscountRate] = useState<number>(10);
  const [taxRate, setTaxRate] = useState<number>(8);

  const handleSlider = (val: number) => {
    setSliderThreshold(val);
    if (onThresholdChange) {
      onThresholdChange(val);
    }
  };

  // Re-calculate live affordable items based on current slider
  const liveAffordable = items
    .filter((item) => item.price < sliderThreshold)
    .map((item) => item.name);

  const customDiscountedTotal = Math.round(
    calculateDiscount(analytics.totalValue, discountRate / 100)
  );
  const customTaxedTotal = Math.round(
    calculateTax(analytics.totalValue, taxRate / 100)
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <span>Financial Analytics</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-medium">
                Live Calculated
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Computed via local-scope functions, filter(), and map()
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
          Req 4 &amp; 5: Higher-Order Iteration
        </span>
      </div>

      {/* Primary 3 Analytics Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5">
        {/* Metric 1: Total Inventory Value */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none"></div>
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Total Value
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80 bg-emerald-950/40 px-1.5 py-0.5 rounded">
                Regular Function
              </span>
            </div>
            <div className="text-3xl font-bold font-mono text-slate-100 tracking-tight">
              ${analytics.totalValue}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Sum of Laptop ($800) + Mouse ($25) + Monitor ($150)
            </p>
          </div>
          <div className="mt-3 pt-2.5 border-t border-slate-900 text-[10px] font-mono text-slate-500">
            <code>function calculateTotalValue(items) &#123; let total = 0; ... &#125;</code>
          </div>
        </div>

        {/* Metric 2: Filtered Affordable Items */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-sky-400" /> Affordable Items
              </span>
              <span className="text-[10px] font-mono text-sky-400/80 bg-sky-950/40 px-1.5 py-0.5 rounded">
                filter() &lt; ${sliderThreshold}
              </span>
            </div>

            <div className="bg-slate-900/90 rounded-lg p-2.5 font-mono text-xs text-sky-300 border border-slate-800">
              {JSON.stringify(liveAffordable)}
            </div>

            {/* Interactive Threshold Slider */}
            <div className="mt-2.5 space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Threshold:</span>
                <span className="font-mono text-slate-200">${sliderThreshold}</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="25"
                value={sliderThreshold}
                onChange={(e) => handleSlider(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-900 text-[10px] font-mono text-slate-500">
            <code>items.filter(i =&gt; i.price &lt; {sliderThreshold}).map(i =&gt; i.name)</code>
          </div>
        </div>

        {/* Metric 3: Formatted Report List */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-medium flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-400" /> Formatted Report
              </span>
              <span className="text-[10px] font-mono text-amber-400/80 bg-amber-950/40 px-1.5 py-0.5 rounded">
                map() Uppercase
              </span>
            </div>

            <div className="bg-slate-900/90 rounded-lg p-2 font-mono text-[11px] text-amber-300/90 border border-slate-800 space-y-0.5 max-h-24 overflow-y-auto">
              {analytics.formattedReport.map((entry, idx) => (
                <div key={idx} className="truncate">
                  &quot;{entry}&quot;
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-slate-900 text-[10px] font-mono text-slate-500">
            <code>items.map(i =&gt; `&#36;&#123;i.name.toUpperCase()&#125;: &#36;&#36;&#123;i.price&#125;`)</code>
          </div>
        </div>
      </div>

      {/* Functional Scope & Arrow Functions Feature Box */}
      <div className="bg-slate-950/40 border border-slate-800/80 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
          <div>
            <h4 className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              <span>Arrow Functions &amp; Financial Scope Modifiers</span>
            </h4>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Testing custom tax and discount parameters with secure local scoping
            </p>
          </div>
          <span className="text-[10px] font-mono bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 px-2 py-0.5 rounded">
            const applyDiscount = (amount, rate) =&gt; ...
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs">
          {/* Discount Calculator */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-emerald-400" /> Discount ({discountRate}%)
              </span>
              <span className="font-mono text-emerald-400 font-bold">
                ${customDiscountedTotal}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="50"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-emerald-500"
              />
              <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                {discountRate}%
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Savings: ${analytics.totalValue - customDiscountedTotal}
            </p>
          </div>

          {/* Tax Calculator */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-medium flex items-center gap-1.5">
                <Percent className="w-3.5 h-3.5 text-amber-400" /> Tax ({taxRate}%)
              </span>
              <span className="font-mono text-amber-400 font-bold">
                ${customTaxedTotal}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="0"
                max="25"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[11px] font-mono text-slate-400 w-10 text-right">
                {taxRate}%
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">
              Tax Added: +${customTaxedTotal - analytics.totalValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

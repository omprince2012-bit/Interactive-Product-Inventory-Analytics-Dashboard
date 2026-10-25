import React, { useState } from 'react';
import { Terminal, Check, X, AlertCircle } from 'lucide-react';

interface PromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, price: number) => void;
  defaultName?: string;
  defaultPrice?: number;
}

export const PromptModal: React.FC<PromptModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultName = 'Monitor',
  defaultPrice = 150,
}) => {
  const [productName, setProductName] = useState(defaultName);
  const [rawPrice, setRawPrice] = useState(defaultPrice.toString());
  const [activePromptIndex, setActivePromptIndex] = useState<0 | 1>(0);

  if (!isOpen) return null;

  // Real-time explicit conversion preview
  const parsedPrice = Number(rawPrice);
  const isPriceValid = !isNaN(parsedPrice) && parsedPrice > 0;
  const isNameValid = productName.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isNameValid) {
      setActivePromptIndex(0);
      return;
    }
    if (!isPriceValid) {
      setActivePromptIndex(1);
      return;
    }
    onSubmit(productName.trim(), parsedPrice);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Modal Header */}
        <div className="bg-slate-800/90 px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-100">
                prompt() Input Simulation
              </h3>
              <p className="text-xs text-slate-400">
                Requirement 1: Data & Explicit Type Conversion
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 p-1 rounded-md hover:bg-slate-700/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800 text-xs font-mono text-emerald-400 space-y-1">
            <p className="text-slate-400">// In pure JavaScript:</p>
            <p>let name = prompt(&quot;Enter product name:&quot;);</p>
            <p>let price = Number(prompt(&quot;Enter product price:&quot;));</p>
          </div>

          {/* Product Name Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Prompt 1: Product Name</span>
              <span className="text-slate-500 text-[11px]">String type</span>
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Monitor, Keyboard, Headphones"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
              autoFocus
            />
            {!isNameValid && (
              <p className="text-xs text-rose-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" /> Product name cannot be empty.
              </p>
            )}
          </div>

          {/* Product Price Input & Explicit Conversion */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300 flex items-center justify-between">
              <span>Prompt 2: Raw Price Input</span>
              <span className="text-slate-500 text-[11px]">Explicit Number() Conversion</span>
            </label>
            <input
              type="text"
              value={rawPrice}
              onChange={(e) => setRawPrice(e.target.value)}
              placeholder="e.g. 150"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 text-sm font-mono focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
            />
            
            {/* Conversion Visualizer */}
            <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 text-xs flex items-center justify-between">
              <span className="text-slate-400 font-mono">
                Number(&quot;{rawPrice}&quot;)
              </span>
              <span className="font-mono flex items-center gap-1.5">
                <span className="text-slate-500">→</span>
                {isPriceValid ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> ${parsedPrice} (numeric)
                  </span>
                ) : (
                  <span className="text-rose-400 font-semibold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> NaN (Invalid)
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="pt-1">
            <span className="text-[11px] text-slate-400 block mb-1.5">
              Quick Test Presets:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { name: 'Monitor', price: 150, badge: 'Standard (Assignment Spec)' },
                { name: 'Webcam', price: 45, badge: 'Budget' },
                { name: 'GPU Card', price: 950, badge: 'Premium' },
              ].map((p) => (
                <button
                  type="button"
                  key={p.name}
                  onClick={() => {
                    setProductName(p.name);
                    setRawPrice(p.price.toString());
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md border border-slate-700 transition-colors"
                >
                  {p.name} (${p.price})
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isNameValid || !isPriceValid}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" /> Execute &amp; Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

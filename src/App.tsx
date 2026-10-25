import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  RotateCcw, 
  Play, 
  Search, 
  Code, 
  Download, 
  Plus, 
  AlertCircle, 
  X, 
  Trash2, 
  CheckCircle,
  Bell
} from 'lucide-react';

export type CategoryBadge = 'Budget' | 'Standard' | 'Premium';

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  category: CategoryBadge;
  isValid?: boolean;
}

export interface ToastNotification {
  id: string;
  type: 'add' | 'delete' | 'info' | 'error';
  title: string;
  message?: string;
  time: string;
}

// Category logic using switch(true)
export function getCategoryBadge(price: number): CategoryBadge {
  switch (true) {
    case price >= 500:
      return 'Premium';
    case price <= 50:
      return 'Budget';
    default:
      return 'Standard';
  }
}

// Regular function with local scope
export function calculateTotalValue(items: InventoryItem[]): number {
  let total = 0; // Local scope variable
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Arrow function with default param
export const applyModifier = (amount: number, rate = 0.1, isDiscount = true): number => {
  const adjustment = amount * rate;
  return isDiscount ? amount - adjustment : amount + adjustment;
};

// Pure JS Solution Code string
export const STANDALONE_JS = `// Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard

// 1. Data & Input Initialization
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

console.log("--- Initializing Inventory System ---");
let inputName = prompt("Enter product name:") || "Monitor";
let inputPriceRaw = prompt("Enter product price:") || "150";

// Explicit type conversion
let inputPrice = Number(inputPriceRaw);

// 2. Control Flow & Validation
if (!inputName || inputName.trim() === "" || isNaN(inputPrice) || inputPrice <= 0) {
  inputName = "Monitor";
  inputPrice = 150;
}

inventory.push({ name: inputName.trim(), price: inputPrice });
console.log(\`[Prompt executed: User adds "\${inputName.trim()}" at "$\${inputPrice}"]\`);

function getCategoryBadge(price) {
  switch (true) {
    case price >= 500: return "Premium";
    case price <= 50: return "Budget";
    default: return "Standard";
  }
}

// 3. Loops & Flow Control (break & continue)
const searchTarget = "Mouse";
let foundProduct = null;
for (let i = 0; i < inventory.length; i++) {
  const item = inventory[i];
  if (!item.price || item.price <= 0) continue; // skip bad data
  if (item.name.toLowerCase() === searchTarget.toLowerCase()) {
    foundProduct = item;
    break; // exit early
  }
}

// 4. Functions & Scope
function calculateTotalValue(items) {
  let total = 0; // local scope
  for (let i = 0; i < items.length; i++) total += items[i].price;
  return total;
}

const applyDiscount = (amount, rate = 0.10) => amount - (amount * rate);

// 5. Array Methods & Iteration
console.log("\\n--- Processing Inventory Roster (forEach) ---");
inventory.forEach(item => {
  const category = getCategoryBadge(item.price);
  console.log(\`* Item: \${item.name} ($\${item.price}) -> Category: \${category}\`);
});

const totalInventoryValue = calculateTotalValue(inventory);
const affordableItems = inventory
  .filter(item => item.price < 200)
  .map(item => item.name);

const formattedReportList = inventory.map(
  item => \`\${item.name.toUpperCase()}: $\${item.price}\`
);

console.log("\\n--- Financial Analytics ---");
console.log(\`Total Inventory Value: $\${totalInventoryValue}\`);
console.log(\`Filtered Affordable Items (Under $200): \${JSON.stringify(affordableItems)}\`);
console.log(\`Formatted Report List: \${JSON.stringify(formattedReportList)}\`);
`;

export default function App() {
  // Input State
  const [productName, setProductName] = useState('Monitor');
  const [productPriceInput, setProductPriceInput] = useState('150');
  
  // Inventory State
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: '1', name: 'Laptop', price: 800, category: 'Premium' },
    { id: '2', name: 'Mouse', price: 25, category: 'Budget' },
    { id: '3', name: 'Monitor', price: 150, category: 'Standard' },
  ]);

  // Toast Notifications State
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Terminal Console Logs
  const [consoleOutput, setConsoleOutput] = useState<string[]>([
    '--- Initializing Inventory System ---',
    '[Prompt executed: User adds "Monitor" at "$150"]',
    '',
    '--- Processing Inventory Roster (forEach) ---',
    '* Item: Laptop ($800) -> Category: Premium',
    '* Item: Mouse ($25) -> Category: Budget',
    '* Item: Monitor ($150) -> Category: Standard',
    '',
    '--- Financial Analytics ---',
    'Total Inventory Value: $975',
    'Filtered Affordable Items (Under $200): ["Mouse", "Monitor"]',
    'Formatted Report List: ["LAPTOP: $800", "MOUSE: $25", "MONITOR: $150"]'
  ]);

  // Search Loop Sandbox state
  const [searchQuery, setSearchQuery] = useState('Mouse');
  const [searchResultLog, setSearchResultLog] = useState<string | null>(null);

  // Modal / Drawer state for Code
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedTerminal, setCopiedTerminal] = useState(false);

  // Helper to trigger Toast Notification
  const addToast = (type: ToastNotification['type'], title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newToast: ToastNotification = { id, type, title, message, time };

    setToasts((prev) => [newToast, ...prev.slice(0, 4)]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Synchronize inventory changes across all analytics and console simulation
  const syncSystem = (newInventory: InventoryItem[], promptLine?: string) => {
    setInventory(newInventory);

    // 4. Functions & Scope: calculate total
    const total = calculateTotalValue(newInventory);

    // 5. Array Methods: forEach, filter, map
    const rosterLines: string[] = [];
    newInventory.forEach((item) => {
      rosterLines.push(`* Item: ${item.name} ($${item.price}) -> Category: ${item.category}`);
    });

    const affordable = newInventory
      .filter((item) => item.price < 200)
      .map((item) => item.name);

    const report = newInventory.map(
      (item) => `${item.name.toUpperCase()}: $${item.price}`
    );

    // Console output lines
    const logs = [
      '--- Initializing Inventory System ---',
      promptLine || `[Inventory update: ${newInventory.length} item(s) active]`,
      '',
      '--- Processing Inventory Roster (forEach) ---',
      ...(rosterLines.length > 0 ? rosterLines : ['(Empty inventory)']),
      '',
      '--- Financial Analytics ---',
      `Total Inventory Value: $${total}`,
      `Filtered Affordable Items (Under $200): ${JSON.stringify(affordable)}`,
      `Formatted Report List: ${JSON.stringify(report)}`
    ];

    setConsoleOutput(logs);
  };

  // Add Item to Inventory
  const handleAddItem = (nameToUse = productName, priceToUse = productPriceInput) => {
    let cleanName = nameToUse.trim();
    let numericPrice = Number(priceToUse);
    let hadFallback = false;

    // 2. Control Flow & Validation
    if (!cleanName || isNaN(numericPrice) || numericPrice <= 0) {
      cleanName = cleanName || 'Monitor';
      numericPrice = (!isNaN(numericPrice) && numericPrice > 0) ? numericPrice : 150;
      hadFallback = true;
    }

    const category = getCategoryBadge(numericPrice);
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      name: cleanName,
      price: numericPrice,
      category,
    };

    const newInventory = [...inventory, newItem];
    const promptMsg = `[Prompt executed: User adds "${cleanName}" at "$${numericPrice}"]`;
    syncSystem(newInventory, promptMsg);

    // Trigger Toast Notification
    if (hadFallback) {
      addToast(
        'error',
        `Added with Fallback: "${cleanName}"`,
        `Invalid input converted to $${numericPrice} (${category})`
      );
    } else {
      addToast(
        'add',
        `Item Added: "${cleanName}"`,
        `$${numericPrice} · Assigned Badge: ${category}`
      );
    }
  };

  // Delete Item from Inventory
  const handleDeleteItem = (id: string) => {
    const itemToDelete = inventory.find((i) => i.id === id);
    if (!itemToDelete) return;

    const newInventory = inventory.filter((i) => i.id !== id);
    const promptMsg = `[Item Removed: "${itemToDelete.name}" ($${itemToDelete.price}) deleted]`;
    syncSystem(newInventory, promptMsg);

    // Trigger Toast Notification
    addToast(
      'delete',
      `Item Deleted: "${itemToDelete.name}"`,
      `Removed $${itemToDelete.price} from inventory calculations`
    );
  };

  // Reset to default spec
  const handleResetSpec = () => {
    setProductName('Monitor');
    setProductPriceInput('150');
    const defaultList: InventoryItem[] = [
      { id: '1', name: 'Laptop', price: 800, category: 'Premium' },
      { id: '2', name: 'Mouse', price: 25, category: 'Budget' },
      { id: '3', name: 'Monitor', price: 150, category: 'Standard' },
    ];
    syncSystem(defaultList, '[Prompt executed: User adds "Monitor" at "$150"]');
    addToast('info', 'Specification Reset', 'Loaded standard items: Laptop, Mouse, Monitor ($975)');
  };

  // Flow Control (Loop with break & continue)
  const handleRunSearch = () => {
    const target = searchQuery.trim().toLowerCase();
    const testList = [
      ...inventory,
      { id: 'corrupt', name: 'Faulty Cable', price: -10, category: 'Budget' as CategoryBadge }
    ];

    let found: InventoryItem | null = null;
    let logMsg = `Loop started for "${searchQuery}" (${testList.length} items):\n`;

    for (let i = 0; i < testList.length; i++) {
      const item = testList[i];
      if (!item.price || item.price <= 0) {
        logMsg += `[Index ${i}] "${item.name}" ($${item.price}): Invalid price -> 'continue' executed (skipped)\n`;
        continue;
      }
      if (item.name.toLowerCase().includes(target)) {
        found = item;
        logMsg += `[Index ${i}] "${item.name}" ($${item.price}): Match found -> 'break' executed (loop stopped early)`;
        break;
      } else {
        logMsg += `[Index ${i}] "${item.name}" ($${item.price}): No match -> next iteration\n`;
      }
    }

    if (!found) {
      logMsg += `\nResult: Target not found in valid records.`;
    }

    setSearchResultLog(logMsg);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(STANDALONE_JS);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyTerminal = () => {
    navigator.clipboard.writeText(consoleOutput.join('\n'));
    setCopiedTerminal(true);
    setTimeout(() => setCopiedTerminal(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([STANDALONE_JS], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inventory_solution.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Live analytics values
  const totalValue = calculateTotalValue(inventory);
  const affordableList = inventory.filter((i) => i.price < 200).map((i) => i.name);
  const formattedReport = inventory.map((i) => `${i.name.toUpperCase()}: $${i.price}`);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black relative">
      {/* Toast Notification Container */}
      <div className="fixed top-16 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-zinc-950 border border-zinc-700 text-white rounded-lg p-3.5 shadow-2xl flex items-start gap-3 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
          >
            <div className="mt-0.5 p-1 rounded bg-zinc-900 border border-zinc-800 shrink-0">
              {toast.type === 'add' && <Plus className="w-3.5 h-3.5 text-white" />}
              {toast.type === 'delete' && <Trash2 className="w-3.5 h-3.5 text-zinc-400" />}
              {toast.type === 'info' && <RotateCcw className="w-3.5 h-3.5 text-zinc-300" />}
              {toast.type === 'error' && <AlertCircle className="w-3.5 h-3.5 text-zinc-300" />}
            </div>
            <div className="flex-1 min-w-0 font-mono text-xs">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-white truncate">{toast.title}</span>
                <span className="text-[10px] text-zinc-500 shrink-0">{toast.time}</span>
              </div>
              {toast.message && (
                <p className="text-[11px] text-zinc-400 mt-0.5 leading-tight">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-white p-0.5 rounded transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Top Minimalist Header */}
      <header className="border-b border-zinc-800 bg-black sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
          <div>
            <h1 className="text-sm sm:text-base font-bold tracking-tight text-white uppercase">
              Product Inventory &amp; Analytics Dashboard
            </h1>
            <p className="text-xs text-zinc-400 font-mono">
              Working Prototype · Capstone JavaScript System
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCodeModal(true)}
              className="px-3 py-1.5 text-xs font-mono font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded transition-colors flex items-center gap-1.5"
            >
              <Code className="w-3.5 h-3.5" />
              <span>View Code</span>
            </button>
            <button
              onClick={handleResetSpec}
              className="px-3 py-1.5 text-xs font-mono font-medium text-black bg-white hover:bg-zinc-200 rounded transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Spec</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        
        {/* Step 1 & 2: Input Initialization & Run Action Bar */}
        <section className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                1. Data &amp; Input Initialization (prompt &amp; Number conversion)
              </h2>
              <p className="text-xs text-zinc-300">
                Enter product name and price, then click <span className="font-mono text-white">&quot;Add to Inventory&quot;</span>:
              </p>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded self-start sm:self-auto">
              Explicit Number()
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
            <div className="sm:col-span-5 space-y-1">
              <label className="text-[11px] font-mono text-zinc-400 block">
                Product Name: prompt(&quot;Enter product name:&quot;)
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="e.g. Monitor, Headphones, Webcam"
                className="w-full bg-black border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white rounded outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-4 space-y-1">
              <label className="text-[11px] font-mono text-zinc-400 block">
                Price: Number(prompt(&quot;Enter price:&quot;))
              </label>
              <input
                type="text"
                value={productPriceInput}
                onChange={(e) => setProductPriceInput(e.target.value)}
                placeholder="e.g. 150"
                className="w-full bg-black border border-zinc-700 focus:border-white px-3 py-2 text-xs font-mono text-white rounded outline-none transition-colors"
              />
            </div>

            <div className="sm:col-span-3 flex gap-2">
              <button
                onClick={() => handleAddItem(productName, productPriceInput)}
                className="w-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs py-2 px-3 rounded transition-colors flex items-center justify-center gap-1.5 font-mono"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Add to Inventory</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2-Column Core Working Prototype: Roster & Analytics on Left, Console Output on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Inventory Roster & Financial Analytics */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Inventory Roster Table with Delete Buttons */}
            <section className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Inventory Roster (forEach &amp; switch badge)
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">
                  {inventory.length} Item(s) in Array
                </span>
              </div>

              {inventory.length === 0 ? (
                <div className="py-6 text-center font-mono text-xs text-zinc-600">
                  Inventory is empty. Add a product above or click &quot;Reset Spec&quot;.
                </div>
              ) : (
                <div className="divide-y divide-zinc-800 font-mono text-xs">
                  {inventory.map((item, index) => {
                    const isPremium = item.category === 'Premium';
                    const isBudget = item.category === 'Budget';

                    return (
                      <div key={item.id} className="py-2.5 flex items-center justify-between group">
                        <div className="flex items-center gap-2">
                          <span className="text-zinc-500 w-5">[{index}]</span>
                          <span className="text-white font-medium">{item.name}</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <span className="text-zinc-300 font-bold">${item.price}</span>
                          <span
                            className={`px-2 py-0.5 text-[10px] rounded border uppercase font-mono ${
                              isPremium
                                ? 'bg-white text-black border-white font-bold'
                                : isBudget
                                ? 'bg-zinc-900 text-zinc-300 border-zinc-700'
                                : 'bg-zinc-800 text-zinc-200 border-zinc-600'
                            }`}
                          >
                            {item.category}
                          </span>
                          
                          {/* Item Deletion Button */}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            title={`Delete ${item.name}`}
                            className="p-1 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors ml-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="pt-2 text-[11px] font-mono text-zinc-500 border-t border-zinc-900 flex justify-between">
                <span>Switch rule: &ge; $500 Premium | &le; $50 Budget | Else Standard</span>
                <span>Req 2</span>
              </div>
            </section>

            {/* Financial Analytics */}
            <section className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Financial Analytics (Functions &amp; Array Methods)
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">
                  Req 4 &amp; 5
                </span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                {/* Total Value */}
                <div className="p-3 bg-black border border-zinc-800 rounded flex items-center justify-between">
                  <span className="text-zinc-400">Total Inventory Value (Function Sum):</span>
                  <span className="text-base text-white font-bold">${totalValue}</span>
                </div>

                {/* Filtered Affordable Items */}
                <div className="p-3 bg-black border border-zinc-800 rounded space-y-1">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span>Filtered Affordable Items (filter &lt; $200):</span>
                    <span className="text-zinc-500 text-[10px]">{affordableList.length} items</span>
                  </div>
                  <div className="text-white bg-zinc-900/60 p-2 rounded border border-zinc-800">
                    {JSON.stringify(affordableList)}
                  </div>
                </div>

                {/* Formatted Report List */}
                <div className="p-3 bg-black border border-zinc-800 rounded space-y-1">
                  <span className="text-zinc-400 block">
                    Formatted Report List (map uppercase):
                  </span>
                  <div className="text-white bg-zinc-900/60 p-2 rounded border border-zinc-800 text-[11px] space-y-0.5">
                    {formattedReport.length === 0 ? (
                      <span className="text-zinc-600">[]</span>
                    ) : (
                      formattedReport.map((line, i) => (
                        <div key={i}>&quot;{line}&quot;</div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Loops & Flow Control: break and continue tester */}
            <section className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  3. Loops &amp; Flow Control (break &amp; continue)
                </h3>
                <span className="text-[11px] font-mono text-zinc-500">Search Sandbox</span>
              </div>

              <p className="text-xs text-zinc-400">
                Searches inventory for target, skips invalid item via <code className="text-white font-mono">continue</code>, and halts loop early via <code className="text-white font-mono">break</code>:
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Target (e.g. Mouse, Laptop)"
                  className="flex-1 bg-black border border-zinc-700 px-3 py-1.5 text-xs font-mono text-white rounded outline-none"
                />
                <button
                  onClick={handleRunSearch}
                  className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono rounded border border-zinc-700 transition-colors"
                >
                  Test Loop
                </button>
              </div>

              {searchResultLog && (
                <pre className="p-3 bg-black border border-zinc-800 rounded text-[11px] font-mono text-zinc-300 whitespace-pre-wrap leading-relaxed">
                  {searchResultLog}
                </pre>
              )}
            </section>
          </div>

          {/* Right Column: Console Output Simulation (Matches Project Expected Output) */}
          <div className="lg:col-span-6 sticky top-20">
            <section className="bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden shadow-2xl flex flex-col font-mono text-xs">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 inline-block"></span>
                  <span className="ml-2 text-zinc-300 font-bold">
                    Console Output Simulation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyTerminal}
                    className="text-zinc-400 hover:text-white flex items-center gap-1 text-[11px]"
                  >
                    {copiedTerminal ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTerminal ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 bg-black min-h-[460px] text-zinc-200 space-y-1 overflow-y-auto selection:bg-zinc-700">
                <div className="text-zinc-500 pb-2 mb-2 border-b border-zinc-900">
                  $ node inventory_solution.js
                </div>

                {consoleOutput.map((line, idx) => {
                  const isHeader = line.startsWith('---');
                  const isPrompt = line.startsWith('[Prompt') || line.startsWith('[Item Removed');
                  const isItem = line.startsWith('* Item:');

                  return (
                    <div
                      key={idx}
                      className={`${
                        isHeader
                          ? 'text-white font-bold pt-2 pb-0.5'
                          : isPrompt
                          ? 'text-zinc-300 bg-zinc-900/60 px-2 py-1 rounded border border-zinc-800 my-1'
                          : isItem
                          ? 'text-zinc-200 pl-1'
                          : line === ''
                          ? 'h-2'
                          : 'text-zinc-300 font-medium'
                      }`}
                    >
                      {line}
                    </div>
                  );
                })}

                <div className="pt-3 flex items-center gap-1 text-zinc-600">
                  <span>❯</span>
                  <span className="w-2 h-3.5 bg-zinc-400 animate-pulse inline-block"></span>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="px-4 py-2 bg-zinc-900 border-t border-zinc-800 text-[11px] text-zinc-500 flex justify-between">
                <span>Exact console specification output</span>
                <span className="text-white">Active</span>
              </div>
            </section>
          </div>
        </div>

      </main>

      {/* Standalone Solution Code Modal */}
      {showCodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="px-4 py-3 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-mono font-bold text-white uppercase">
                  Standalone Solution (solution.js)
                </h3>
                <p className="text-[11px] text-zinc-400 font-mono">
                  100% native JavaScript · ready for console or submission
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-white rounded border border-zinc-700 transition-colors flex items-center gap-1"
                >
                  {copiedCode ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="px-2.5 py-1 text-xs font-mono bg-white hover:bg-zinc-200 text-black font-semibold rounded transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Download</span>
                </button>
                <button
                  onClick={() => setShowCodeModal(false)}
                  className="p-1 text-zinc-400 hover:text-white rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <pre className="p-4 bg-black text-zinc-200 text-xs font-mono overflow-auto flex-1 leading-relaxed">
              <code>{STANDALONE_JS}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Minimal Footer */}
      <footer className="mt-12 border-t border-zinc-800 py-6 text-center text-xs font-mono text-zinc-500">
        Interactive Product Inventory &amp; Analytics Dashboard · Working Prototype
      </footer>
    </div>
  );
}

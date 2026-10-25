import { InventoryItem, FinancialAnalytics, ConsoleLogMessage, CategoryBadge } from '../types/inventory';

export const INITIAL_PRESET_ITEMS: Array<Omit<InventoryItem, 'id' | 'category'>> = [
  { name: 'Laptop', price: 800 },
  { name: 'Mouse', price: 25 },
];

/**
 * Assigns category badge using switch (true) pattern
 */
export function determineCategory(price: number): CategoryBadge {
  switch (true) {
    case price >= 500:
      return 'Premium';
    case price <= 50:
      return 'Budget';
    default:
      return 'Standard';
  }
}

/**
 * Regular function demonstrating local scope
 */
export function calculateTotalInventoryValue(items: InventoryItem[]): number {
  let total = 0; // Local scope variable
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

/**
 * Arrow function demonstrating tax and discount calculation with default params
 */
export const calculateTax = (amount: number, rate: number = 0.08): number => {
  return amount + amount * rate;
};

export const calculateDiscount = (amount: number, rate: number = 0.1): number => {
  return amount - amount * rate;
};

/**
 * Runs the simulation and returns items, analytics, and simulated console messages
 */
export function runInventorySimulation(
  addedName: string = 'Monitor',
  addedPrice: number = 150,
  affordableThreshold: number = 200
): {
  items: InventoryItem[];
  analytics: FinancialAnalytics;
  logs: ConsoleLogMessage[];
} {
  const logs: ConsoleLogMessage[] = [];
  const addLog = (
    text: string,
    type: ConsoleLogMessage['type'] = 'info',
    category?: CategoryBadge,
    stepNumber?: number
  ) => {
    logs.push({
      id: Math.random().toString(36).substring(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString(),
      category,
      stepNumber,
    });
  };

  // Step 1: Input Initialization
  addLog('--- Initializing Inventory System ---', 'header', undefined, 1);
  addLog(
    `[Prompt executed: User adds "${addedName}" at "$${addedPrice}"]`,
    'prompt',
    undefined,
    1
  );

  // Construct inventory list
  const baseItems: InventoryItem[] = [
    {
      id: 'item-1',
      name: 'Laptop',
      price: 800,
      category: determineCategory(800),
      isValid: true,
    },
    {
      id: 'item-2',
      name: 'Mouse',
      price: 25,
      category: determineCategory(25),
      isValid: true,
    },
    {
      id: 'item-3',
      name: addedName,
      price: addedPrice,
      category: determineCategory(addedPrice),
      isValid: true,
    },
  ];

  // Step 2 & 5: Processing Inventory Roster (forEach)
  addLog('\n--- Processing Inventory Roster (forEach) ---', 'header', undefined, 2);
  baseItems.forEach((item) => {
    addLog(
      `* Item: ${item.name} ($${item.price}) -> Category: ${item.category}`,
      'item',
      item.category,
      5
    );
  });

  // Step 4: Functions & Scope (Calculate Total)
  const totalValue = calculateTotalInventoryValue(baseItems);

  // Step 5: filter() to isolate affordable items (under threshold, e.g. $200)
  const affordableItems = baseItems
    .filter((item) => item.price < affordableThreshold)
    .map((item) => item.name);

  // Step 5: map() to format report list
  const formattedReport = baseItems.map(
    (item) => `${item.name.toUpperCase()}: $${item.price}`
  );

  // Financial Analytics logs matching expected output
  addLog('\n--- Financial Analytics ---', 'header', undefined, 5);
  addLog(`Total Inventory Value: $${totalValue}`, 'stat', undefined, 4);
  addLog(
    `Filtered Affordable Items (Under $${affordableThreshold}): ${JSON.stringify(affordableItems)}`,
    'stat',
    undefined,
    5
  );
  addLog(
    `Formatted Report List: ${JSON.stringify(formattedReport)}`,
    'stat',
    undefined,
    5
  );

  const analytics: FinancialAnalytics = {
    totalValue,
    affordableItems,
    affordableThreshold,
    formattedReport,
    discountedTotal: Math.round(calculateDiscount(totalValue, 0.1)),
    taxedTotal: Math.round(calculateTax(totalValue, 0.08)),
  };

  return { items: baseItems, analytics, logs };
}

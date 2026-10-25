/**
 * Pure JavaScript Solution for Capstone Mini Project:
 * Interactive Product Inventory & Analytics Dashboard
 */

export const PURE_JAVASCRIPT_SOLUTION = `/**
 * ============================================================================
 * Capstone Mini Project: Interactive Product Inventory & Analytics Dashboard
 * Core Concepts: Data, Control Flow, Loops, Functions, Scope, Array Methods
 * ============================================================================
 */

// ============================================================================
// 1. DATA & INPUT INITIALIZATION
// ============================================================================
// Initialize inventory array with pre-existing products
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

console.log("--- Initializing Inventory System ---");

// Collect user input via prompt()
// In browser console: prompt() opens an input dialog.
// (Defaulting to "Monitor" and "150" if prompted or testing)
let inputName = prompt("Enter new product name:") || "Monitor";
let inputPriceRaw = prompt("Enter product price:") || "150";

// Explicit type conversion using Number() (or parseFloat())
let inputPrice = Number(inputPriceRaw);

// ============================================================================
// 2. CONTROL FLOW & CONDITIONAL EVALUATION
// ============================================================================
// Validate input data using if...else
if (!inputName || inputName.trim() === "" || isNaN(inputPrice) || inputPrice <= 0) {
  console.error("Invalid product data! Reverting to default valid item.");
  inputName = "Monitor";
  inputPrice = 150;
}

// Add the validated product to our inventory array
inventory.push({
  name: inputName.trim(),
  price: inputPrice
});

console.log(\`[Prompt executed: User adds "\${inputName.trim()}" at "$\${inputPrice}"]\`);

/**
 * Assign category badge using switch (true) pattern based on price thresholds:
 * - Premium: $500 or higher
 * - Budget: $50 or lower
 * - Standard: between $50 and $500
 */
function getCategoryBadge(price) {
  switch (true) {
    case price >= 500:
      return "Premium";
    case price <= 50:
      return "Budget";
    default:
      return "Standard";
  }
}

// ============================================================================
// 3. LOOPS & FLOW CONTROL (break & continue)
// ============================================================================
// Example demonstration: Searching for a target item ("Mouse") while skipping
// corrupted or negative items using 'continue', and exiting early with 'break'.
const searchTarget = "Mouse";
let foundProduct = null;

for (let i = 0; i < inventory.length; i++) {
  const currentItem = inventory[i];

  // If item price is invalid/corrupted, skip further processing with 'continue'
  if (!currentItem.price || currentItem.price <= 0) {
    continue;
  }

  // If target item is matched, record it and stop searching with 'break'
  if (currentItem.name.toLowerCase() === searchTarget.toLowerCase()) {
    foundProduct = currentItem;
    break; // Exit loop early once located
  }
}

// ============================================================================
// 4. FUNCTIONS & SCOPE
// ============================================================================
/**
 * Regular Function: Calculates total inventory value.
 * Demonstrates local variable scoping (totalValue is private to this function).
 */
function calculateTotalInventoryValue(items) {
  let totalValue = 0; // Local scope variable
  for (let i = 0; i < items.length; i++) {
    totalValue += items[i].price;
  }
  return totalValue;
}

/**
 * Arrow Function: Applies custom tax or discount parameters with default values.
 * Demonstrates concise arrow syntax and default parameters.
 */
const applyFinancialModifier = (amount, rate = 0.10, isDiscount = true) => {
  const adjustment = amount * rate;
  return isDiscount ? amount - adjustment : amount + adjustment;
};

// ============================================================================
// 5. ARRAY METHODS & ITERATION (forEach, filter, map)
// ============================================================================

// A. forEach() to process and log the formatted roster with category badges
console.log("\\n--- Processing Inventory Roster (forEach) ---");
inventory.forEach((item) => {
  const badge = getCategoryBadge(item.price);
  console.log(\`* Item: \${item.name} ($\${item.price}) -> Category: \${badge}\`);
});

// B. Calculate financial statistics
const totalInventoryValue = calculateTotalInventoryValue(inventory);

// C. filter() to isolate items matching criteria (Under $200)
// Then map() to extract just the item names
const affordableItems = inventory
  .filter((item) => item.price < 200)
  .map((item) => item.name);

// D. map() to produce an uppercase transformed report list
const formattedReportList = inventory.map(
  (item) => \`\${item.name.toUpperCase()}: $\${item.price}\`
);

// E. Output Financial Analytics
console.log("\\n--- Financial Analytics ---");
console.log(\`Total Inventory Value: $\${totalInventoryValue}\`);
console.log(\`Filtered Affordable Items (Under $200): \${JSON.stringify(affordableItems)}\`);
console.log(\`Formatted Report List: \${JSON.stringify(formattedReportList)}\`);
`;

export const CONCEPT_GUIDES = [
  {
    step: 1,
    title: "1. Data & Input Initialization",
    subtitle: "Array of Objects & Explicit Type Conversion",
    description:
      "Captures product name and price from prompt(). Crucially converts string input to numeric data using explicit casting (Number() or parseFloat()) to prevent string concatenation bugs ($800 + '150' = $800150).",
    codeSnippet: `// 1. Initial items array
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

// 2. prompt() always returns string or null
const rawPrice = prompt("Enter product price:") || "150";

// 3. Explicit Type Conversion
const productPrice = Number(rawPrice); // Explicit Number conversion`,
    keyPoints: [
      "prompt() returns strings; without Number() conversion, 800 + '150' results in '800150'.",
      "Object structure { name: string, price: number } keeps data organized in cohesive records.",
      "inventory.push() appends the new record dynamically to the in-memory array."
    ]
  },
  {
    step: 2,
    title: "2. Control Flow & Conditional Evaluation",
    subtitle: "Validation with if...else & switch (true) Badging",
    description:
      "Validates user input against empty strings and NaN using if...else. Uses the clean switch (true) pattern to evaluate dynamic threshold ranges for 'Premium' (≥$500), 'Standard' ($50-$500), and 'Budget' (≤$50).",
    codeSnippet: `// Input validation
if (!name || name.trim() === "" || isNaN(price) || price <= 0) {
  console.error("Invalid entry!");
}

// Dynamic range badge evaluation with switch(true)
function getCategoryBadge(price) {
  switch (true) {
    case price >= 500:
      return "Premium";
    case price <= 50:
      return "Budget";
    default:
      return "Standard";
  }
}`,
    keyPoints: [
      "switch(true) evaluates range expressions cleanly without deeply nested if/else statements.",
      "isNaN() and price <= 0 checks guard against malicious or corrupt values.",
      "The default branch ensures any item falling between $50 and $500 is classified as 'Standard'."
    ]
  },
  {
    step: 3,
    title: "3. Loops & Flow Control",
    subtitle: "Searching with break and handling bad data with continue",
    description:
      "Shows programmatic loop control: 'continue' skips corrupted items without crashing, while 'break' halts execution immediately when the target item is located to optimize performance.",
    codeSnippet: `for (let i = 0; i < inventory.length; i++) {
  const item = inventory[i];

  // continue: skips invalid records
  if (!item.price || item.price <= 0) {
    continue;
  }

  // break: exits the loop as soon as target is located
  if (item.name.toLowerCase() === target.toLowerCase()) {
    foundItem = item;
    break; // Halts remaining iterations!
  }
}`,
    keyPoints: [
      "break terminates the entire loop, avoiding wasteful iterations once the item is found.",
      "continue jumps straight to the next iteration loop step, skipping corrupt or bad records.",
      "Essential for scalable search algorithms on large inventory collections."
    ]
  },
  {
    step: 4,
    title: "4. Functions & Scope",
    subtitle: "Function Declarations, Arrow Functions & Local Lexical Scope",
    description:
      "Demonstrates regular function declarations with local variable encapsulation (let total = 0), paired with arrow functions with default parameters for tax and discount calculations.",
    codeSnippet: `// Regular function declaration with local scoping
function calculateTotalInventoryValue(items) {
  let total = 0; // Local variable: strictly inaccessible outside!
  for (let i = 0; i < items.length; i++) {
    total += items[i].price;
  }
  return total;
}

// Modern Arrow function with default parameter
const applyDiscount = (amount, rate = 0.10) => {
  return amount - (amount * rate);
};`,
    keyPoints: [
      "Local variables defined with let/const inside functions cannot leak into global scope.",
      "Arrow functions offer concise syntax for mathematical transformations and callbacks.",
      "Default parameters (e.g. rate = 0.10) ensure robustness when arguments are omitted."
    ]
  },
  {
    step: 5,
    title: "5. Array Methods & Iteration",
    subtitle: "forEach(), filter(), map(), and Functional Pipelines",
    description:
      "Leverages modern ES6+ higher-order array methods to process collections immutably without manual index bookkeeping: forEach() for side-effects, filter() for predicates, and map() for transformations.",
    codeSnippet: `// A. forEach: Execute side-effect for each item
inventory.forEach(item => {
  console.log(\`* Item: \${item.name} ($\${item.price}) -> Category: \${getCategory(item.price)}\`);
});

// B. filter: Extract items under $200, then map to extract names
const affordableItems = inventory
  .filter(item => item.price < 200)
  .map(item => item.name); // -> ["Mouse", "Monitor"]

// C. map: Transform each item into formatted uppercase summary string
const formattedReport = inventory.map(item => 
  \`\${item.name.toUpperCase()}: $\${item.price}\`
);`,
    keyPoints: [
      "forEach() executes a function once per array element (ideal for logging reports).",
      "filter() returns a new array containing only elements that pass the boolean test.",
      "map() returns a new array transformed element-by-element without mutating the original source."
    ]
  }
];

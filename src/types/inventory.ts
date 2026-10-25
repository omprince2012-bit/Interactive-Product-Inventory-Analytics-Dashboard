export type CategoryBadge = 'Budget' | 'Standard' | 'Premium';

export interface InventoryItem {
  id: string;
  name: string;
  price: number;
  category: CategoryBadge;
  isValid?: boolean;
}

export interface FinancialAnalytics {
  totalValue: number;
  affordableItems: string[];
  affordableThreshold: number;
  formattedReport: string[];
  discountedTotal: number;
  taxedTotal: number;
}

export interface ConsoleLogMessage {
  id: string;
  type: 'header' | 'prompt' | 'item' | 'stat' | 'code' | 'error' | 'success' | 'info';
  text: string;
  timestamp: string;
  category?: CategoryBadge;
  stepNumber?: number;
}

export interface SearchStepState {
  itemIndex: number;
  itemName: string;
  action: 'checking' | 'found_break' | 'skipped_continue' | 'idle';
  explanation: string;
}

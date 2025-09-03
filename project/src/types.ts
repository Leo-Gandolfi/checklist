export interface ChecklistItem {
  id: string;
  name: string;
  response: boolean | null;
  priority: 'critical' | 'important' | 'optional';
  condition: 'new' | 'good' | 'regular' | 'poor' | null;
  observations: string;
  expectedQuantity?: number;
  foundQuantity?: number;
  lastMaintenance?: string;
}

export interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: ChecklistItem[];
}

export interface VerificationInfo {
  verifierName: string;
  verificationDate: string;
  unit: string;
  template: string;
}
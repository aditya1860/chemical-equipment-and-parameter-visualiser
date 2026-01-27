
export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  flowrate: number;
  pressure: number;
  temperature: number;
}

export interface SummaryStats {
  totalCount: number;
  avgFlowrate: number;
  avgPressure: number;
  avgTemperature: number;
  typeDistribution: Record<string, number>;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  fileName: string;
  stats: SummaryStats;
  data: EquipmentItem[];
}

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
}

export interface AIInsight {
  title: string;
  observation: string;
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

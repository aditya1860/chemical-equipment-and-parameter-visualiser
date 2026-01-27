
import { EquipmentItem, SummaryStats, HistoryItem } from "../types";

export const parseCSV = (text: string): EquipmentItem[] => {
  const lines = text.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  return lines.slice(1).map((line, idx) => {
    const values = line.split(',').map(v => v.trim());
    const obj: any = { id: `item-${idx}` };
    headers.forEach((header, i) => {
      if (['flowrate', 'pressure', 'temperature'].includes(header)) {
        obj[header] = parseFloat(values[i]) || 0;
      } else if (header === 'equipment name' || header === 'name') {
        obj['name'] = values[i];
      } else {
        obj[header] = values[i];
      }
    });
    return obj as EquipmentItem;
  });
};

export const calculateStats = (data: EquipmentItem[]): SummaryStats => {
  const count = data.length;
  if (count === 0) return { totalCount: 0, avgFlowrate: 0, avgPressure: 0, avgTemperature: 0, typeDistribution: {} };

  const sums = data.reduce((acc, item) => ({
    flow: acc.flow + item.flowrate,
    press: acc.press + item.pressure,
    temp: acc.temp + item.temperature
  }), { flow: 0, press: 0, temp: 0 });

  const distribution: Record<string, number> = {};
  data.forEach(item => {
    distribution[item.type] = (distribution[item.type] || 0) + 1;
  });

  return {
    totalCount: count,
    avgFlowrate: sums.flow / count,
    avgPressure: sums.press / count,
    avgTemperature: sums.temp / count,
    typeDistribution: distribution
  };
};

export const saveToHistory = (fileName: string, data: EquipmentItem[]) => {
  const stats = calculateStats(data);
  const newItem: HistoryItem = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    fileName,
    stats,
    data
  };

  const existing = JSON.parse(localStorage.getItem('equip_history') || '[]');
  const updated = [newItem, ...existing].slice(0, 5);
  localStorage.setItem('equip_history', JSON.stringify(updated));
  return updated;
};

export const getHistory = (): HistoryItem[] => {
  return JSON.parse(localStorage.getItem('equip_history') || '[]');
};

export const generateSampleCSV = () => {
  return `Equipment Name,Type,Flowrate,Pressure,Temperature
Heat Exchanger 01,Exchanger,450.5,12.5,85.2
Distillation Column A,Tower,1200.0,4.2,165.0
Centrifugal Pump X,Pump,25.4,35.0,24.5
Valve BV-092,Valve,0.0,12.5,45.0
Storage Tank S1,Tank,0.0,1.0,18.5
Reflux Pump R1,Pump,15.8,28.2,55.0
Preheater H2,Exchanger,550.2,10.8,110.5
Safety Valve SV1,Valve,0.0,1.2,22.0
React Vessel R101,Reactor,800.0,25.0,220.0
Condenser C22,Exchanger,320.0,5.5,45.0`;
};

export interface IntelItem {
  id: string;
  timestamp: string;
  title: string;
  riskScore: number;
  reasoning: string;
  type: 'logistics' | 'geopolitical' | 'weather';
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  name: string;
  status: 'critical' | 'warning' | 'stable';
}

export enum SimulationStatus {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
}
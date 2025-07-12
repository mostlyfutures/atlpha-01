export interface Asset {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: number;
  marketCap: number;
  type: 'Stock' | 'Crypto' | 'Commodity';
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
}

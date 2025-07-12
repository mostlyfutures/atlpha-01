import type { Asset, HistoricalDataPoint } from '@/lib/types';

const mockAssets: Record<string, Asset> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 195.89,
    change: 1.25,
    changePercent: 0.64,
    high: 196.30,
    low: 194.50,
    volume: 52_242_300,
    marketCap: 3_000_000_000_000,
    type: 'Stock',
  },
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 65420.72,
    change: -1200.50,
    changePercent: -1.80,
    high: 67000.00,
    low: 65000.00,
    volume: 45_000_000_000,
    marketCap: 1_280_000_000_000,
    type: 'Crypto',
  },
  GOLD: {
    symbol: 'GOLD',
    name: 'Gold',
    price: 2330.50,
    change: 15.20,
    changePercent: 0.66,
    high: 2335.00,
    low: 2320.00,
    volume: 150_000,
    marketCap: 15_800_000_000_000,
    type: 'Commodity',
  },
};

const generateHistoricalData = (startPrice: number): HistoricalDataPoint[] => {
  const data: HistoricalDataPoint[] = [];
  let currentPrice = startPrice;
  for (let i = 90; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    currentPrice *= 1 + (Math.random() - 0.49) * 0.05;
    data.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat(currentPrice.toFixed(2)),
    });
  }
  return data;
};

export async function searchAsset(query: string): Promise<Asset | null> {
  const upperQuery = query.toUpperCase();
  const found = Object.values(mockAssets).find(
    (asset) => asset.symbol.toUpperCase() === upperQuery || asset.name.toUpperCase().includes(upperQuery)
  );
  return new Promise((resolve) => setTimeout(() => resolve(found || mockAssets.BTC), 500));
}

export async function getAsset(symbol: string): Promise<Asset | null> {
  const asset = mockAssets[symbol.toUpperCase()];
  return new Promise((resolve) => setTimeout(() => resolve(asset || null), 300));
}


export async function getHistoricalData(symbol: string): Promise<HistoricalDataPoint[]> {
  const asset = mockAssets[symbol.toUpperCase()];
  const data = generateHistoricalData(asset ? asset.price : 50000);
  return new Promise((resolve) => setTimeout(() => resolve(data), 700));
}

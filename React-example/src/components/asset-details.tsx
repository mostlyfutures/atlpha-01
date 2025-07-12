import type { Asset, HistoricalDataPoint } from '@/lib/types';
import { PriceCard } from '@/components/price-card';
import { KeyMetrics } from '@/components/key-metrics';
import { SentimentAnalysis } from '@/components/sentiment-analysis';
import { HistoricalChart } from '@/components/historical-chart';

interface AssetDetailsProps {
  asset: Asset;
  historicalData: HistoricalDataPoint[];
}

export function AssetDetails({ asset, historicalData }: AssetDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
            <span className="text-sm font-medium text-muted-foreground bg-secondary px-2 py-1 rounded-full">{asset.type}</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold font-headline text-foreground">
                {asset.name} ({asset.symbol.toUpperCase()})
            </h2>
        </div>
        <PriceCard 
            price={asset.price} 
            change={asset.change} 
            changePercent={asset.changePercent} 
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <HistoricalChart data={historicalData} />
        </div>
        <div className="space-y-8">
            <KeyMetrics asset={asset} />
            <SentimentAnalysis assetName={asset.name} />
        </div>
      </div>
    </div>
  );
}

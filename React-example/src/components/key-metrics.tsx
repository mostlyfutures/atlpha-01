import type { Asset } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from 'lucide-react';

interface KeyMetricsProps {
  asset: Asset;
}

const formatNumber = (num: number) => {
    if (num >= 1_000_000_000_000) return `${(num / 1_000_000_000_000).toFixed(2)}T`;
    if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2)}B`;
    if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(2)}M`;
    return num.toLocaleString();
};

const formatPrice = (num: number) => `$${num.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

export function KeyMetrics({ asset }: KeyMetricsProps) {
  const metrics = [
    { label: "Today's High", value: formatPrice(asset.high) },
    { label: "Today's Low", value: formatPrice(asset.low) },
    { label: 'Volume', value: formatNumber(asset.volume) },
    { label: 'Market Cap', value: `$${formatNumber(asset.marketCap)}` },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Key Metrics</CardTitle>
        <LineChart className="w-5 h-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <dl className="divide-y">
            {metrics.map((metric) => (
                <div key={metric.label} className="flex items-center justify-between py-3">
                    <dt className="text-sm text-muted-foreground">{metric.label}</dt>
                    <dd className="text-sm font-semibold text-foreground">{metric.value}</dd>
                </div>
            ))}
        </dl>
      </CardContent>
    </Card>
  );
}

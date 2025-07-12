'use client';

import { useState, useEffect, useTransition } from 'react';
import { SearchForm } from '@/components/search-form';
import { AssetDetails } from '@/components/asset-details';
import { getAsset, getHistoricalData } from '@/lib/api';
import type { Asset, HistoricalDataPoint } from '@/lib/types';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';
import { Bot } from 'lucide-react';

export function Dashboard() {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (query: string) => {
    setError(null);
    startTransition(async () => {
      try {
        const assetResult = await getAsset(query);
        if (assetResult) {
          setAsset(assetResult);
          const historyResult = await getHistoricalData(assetResult.symbol);
          setHistoricalData(historyResult);
        } else {
          setAsset(null);
          setError(`Asset "${query}" not found. Please try another symbol like AAPL, BTC, or GOLD.`);
        }
      } catch (e) {
        setError('Failed to fetch asset data. Please try again.');
        console.error(e);
      }
    });
  };

  useEffect(() => {
    handleSearch('BTC');
  }, []);

  return (
    <div className="container py-8">
      <div className="max-w-xl mx-auto mb-8">
        <SearchForm onSearch={handleSearch} isSearching={isPending} />
      </div>

      {isPending && (
        <div className="space-y-8">
            <div className="grid gap-8 md:grid-cols-3">
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
                <Skeleton className="h-32" />
            </div>
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <Skeleton className="w-full h-96" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="w-full h-48" />
                    <Skeleton className="w-full h-48" />
                </div>
            </div>
        </div>
      )}

      {!isPending && error && (
        <Card className="max-w-xl mx-auto text-center">
            <CardContent className="p-8">
                <p className="text-destructive">{error}</p>
            </CardContent>
        </Card>
      )}

      {!isPending && !error && asset && (
        <div className="animate-in fade-in-50 duration-500">
            <AssetDetails asset={asset} historicalData={historicalData} />
        </div>
      )}
      
      {!isPending && !error && !asset && (
         <Card className="max-w-2xl mx-auto">
            <CardContent className="p-10 text-center">
                <Bot className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h2 className="text-2xl font-semibold ">Welcome to MarketLook</h2>
                <p className="mt-2 text-muted-foreground">
                    Search for a stock, cryptocurrency, or commodity to get started.
                </p>
            </CardContent>
        </Card>
      )}
    </div>
  );
}

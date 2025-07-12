'use client';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface PriceCardProps {
  price: number;
  change: number;
  changePercent: number;
}

export function PriceCard({ price, change, changePercent }: PriceCardProps) {
  const isPositive = change >= 0;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const priceString = price > 1000 ? currencyFormatter.format(price) : `$${price.toFixed(2)}`;

  return (
    <div className="text-right">
      <p className="text-4xl font-bold tracking-tighter text-foreground">
        {priceString}
      </p>
      <div className={`flex items-center justify-end gap-1 mt-1 font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
        <span>{currencyFormatter.format(Math.abs(change))} ({changePercent.toFixed(2)}%)</span>
        <span className="text-sm text-muted-foreground ml-1">Today</span>
      </div>
    </div>
  );
}

'use client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { HistoricalDataPoint } from '@/lib/types';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartConfig = {
  price: {
    label: 'Price (USD)',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
}

export function HistoricalChart({ data }: HistoricalChartProps) {
  if (!data || data.length === 0) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Price History</CardTitle>
                <CardDescription>No historical data available.</CardDescription>
            </CardHeader>
            <CardContent className='h-96 flex items-center justify-center'>
                <p className='text-muted-foreground'>Data is currently unavailable.</p>
            </CardContent>
        </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>90-Day Price History</CardTitle>
        <CardDescription>Illustrative price data over the last three months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer>
            <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                tickLine={false}
                axisLine={false}
                dy={10}
              />
               <YAxis
                orientation="left"
                domain={['dataMin', 'auto']}
                tickFormatter={(value) => `$${Number(value).toLocaleString()}`}
                tickLine={false}
                axisLine={false}
                width={70}
                dx={-5}
              />
              <ChartTooltip
                cursor={false}
                content={
                    <ChartTooltipContent
                        formatter={(value) => `$${Number(value).toLocaleString()}`}
                        indicator='line'
                    />
                }
              />
              <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

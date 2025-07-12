'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { analyzeMarketSentiment } from '@/app/actions';
import type { AnalyzeMarketSentimentOutput } from '@/ai/flows/analyze-market-sentiment';
import { BrainCircuit } from 'lucide-react';
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from 'recharts';

export function SentimentAnalysis({ assetName }: { assetName: string }) {
  const [result, setResult] = useState<AnalyzeMarketSentimentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getSentiment() {
      setIsLoading(true);
      setResult(null);
      try {
        const sentimentResult = await analyzeMarketSentiment({ assetName });
        setResult(sentimentResult);
      } catch (error) {
        console.error('Sentiment analysis failed:', error);
        setResult({
          sentimentScore: 0,
          sentimentSummary: 'Could not retrieve sentiment at this time.',
        });
      }
      setIsLoading(false);
    }

    if (assetName) {
      getSentiment();
    }
  }, [assetName]);

  const score = result?.sentimentScore ?? 0;
  const normalizedScore = (score + 1) * 50;
  const color = score > 0.2 ? 'hsl(var(--accent))' : score < -0.2 ? 'hsl(var(--destructive))' : 'hsl(var(--foreground))';

  if (isLoading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="w-24 h-24 rounded-full mx-auto" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">AI Sentiment</CardTitle>
            <BrainCircuit className="w-5 h-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="flex flex-col items-center text-center">
                <div className="h-32 w-32">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            innerRadius="70%"
                            outerRadius="90%"
                            data={[{ value: normalizedScore }]}
                            startAngle={90}
                            endAngle={-270}
                        >
                            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                            <RadialBar
                                background={{ fill: 'hsla(var(--muted))' }}
                                dataKey="value"
                                cornerRadius={10}
                                fill={color}
                            />
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="fill-foreground text-2xl font-bold"
                            >
                                {score.toFixed(2)}
                            </text>
                        </RadialBarChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-sm text-muted-foreground mt-2 px-4">
                    {result?.sentimentSummary}
                </p>
            </div>
        </CardContent>
    </Card>
  );
}

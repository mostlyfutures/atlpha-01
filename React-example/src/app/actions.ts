'use server';

import { analyzeMarketSentiment as analyze } from '@/ai/flows/analyze-market-sentiment';
import type { AnalyzeMarketSentimentInput, AnalyzeMarketSentimentOutput } from '@/ai/flows/analyze-market-sentiment';
import { z } from 'zod';

const inputSchema = z.object({
  assetName: z.string(),
});

export async function analyzeMarketSentiment(input: AnalyzeMarketSentimentInput): Promise<AnalyzeMarketSentimentOutput> {
  const validatedInput = inputSchema.parse(input);
  try {
    const result = await analyze(validatedInput);
    return result;
  } catch (error) {
    console.error("Error in sentiment analysis:", error);
    return {
      sentimentScore: 0,
      sentimentSummary: 'Could not perform sentiment analysis at this time. Please try again later.'
    };
  }
}

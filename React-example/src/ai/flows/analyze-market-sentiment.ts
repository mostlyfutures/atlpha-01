'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeMarketSentimentInputSchema = z.object({
  assetName: z.string().describe('The name of the asset to analyze (e.g., AAPL, Bitcoin, Gold).'),
});
export type AnalyzeMarketSentimentInput = z.infer<typeof AnalyzeMarketSentimentInputSchema>;

const AnalyzeMarketSentimentOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score representing the overall sentiment, ranging from -1 (very negative) to 1 (very positive).'
    ),
  sentimentSummary: z
    .string()
    .describe('A brief summary of the market sentiment based on recent news and social media.'),
});
export type AnalyzeMarketSentimentOutput = z.infer<typeof AnalyzeMarketSentimentOutputSchema>;

export async function analyzeMarketSentiment(input: AnalyzeMarketSentimentInput): Promise<AnalyzeMarketSentimentOutput> {
  return analyzeMarketSentimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeMarketSentimentPrompt',
  input: {schema: AnalyzeMarketSentimentInputSchema},
  output: {schema: AnalyzeMarketSentimentOutputSchema},
  prompt: `You are a financial analyst specializing in market sentiment analysis.

  Analyze the market sentiment for {{assetName}} based on recent news headlines and social media trends.
  Provide a sentiment score between -1 (very negative) and 1 (very positive), and a brief summary of the market sentiment.

  Consider factors such as:
  - The volume of positive vs. negative news articles.
  - The general tone of social media discussions.
  - Any significant events that may be influencing sentiment.

  Output the sentimentScore and sentimentSummary fields using JSON format.
  `,
});

const analyzeMarketSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeMarketSentimentFlow',
    inputSchema: AnalyzeMarketSentimentInputSchema,
    outputSchema: AnalyzeMarketSentimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

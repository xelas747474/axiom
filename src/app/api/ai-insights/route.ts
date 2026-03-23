import { fetchMarketData, FALLBACK_MARKET_DATA } from "@/lib/coingecko";
import { generateAIInsights } from "@/lib/ai-analysis";

export const dynamic = "force-dynamic";

export async function GET() {
  // Always generate a real analysis — use live data if available, fallback otherwise
  let market;
  try {
    market = await fetchMarketData();
  } catch {
    market = FALLBACK_MARKET_DATA;
  }

  let insights;
  try {
    insights = await generateAIInsights(market);
  } catch {
    // Even if AI analysis fails, generate from fallback
    insights = await generateAIInsights(FALLBACK_MARKET_DATA);
  }

  return Response.json(insights);
}

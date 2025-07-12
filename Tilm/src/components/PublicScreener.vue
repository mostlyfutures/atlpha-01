<script setup lang="ts">
import { ref } from 'vue';
import ScreenerSearchBar from '@/components/ScreenerSearchBar.vue';
import ScreenerBackground from '@/components/ScreenerBackground.vue';
import AssetCard from '@/components/AssetCard.vue';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import EmptyState from '@/components/EmptyState.vue';

const symbol = ref('');
const loading = ref(false);
const error = ref<string | null>(null);
const result = ref<null | {
  name: string;
  symbol: string;
  price: number;
  currency: string;
  source: string;
  assetType: string;
}>(null);

async function fetchStock(symbol: string) {
  try {
    const res = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
    const data = await res.json();
    const quote = data.quoteResponse.result[0];
    if (quote && quote.regularMarketPrice) {
      return {
        name: quote.shortName || quote.symbol,
        symbol: quote.symbol,
        price: quote.regularMarketPrice,
        currency: quote.currency,
        source: 'Yahoo Finance',
        assetType: 'Stock',
      };
    }
  } catch {}
  // Fallback: Twelve Data (demo key)
  try {
    const res = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=demo`);
    const data = await res.json();
    if (data.price) {
      return {
        name: symbol,
        symbol,
        price: parseFloat(data.price),
        currency: 'USD',
        source: 'Twelve Data',
        assetType: 'Stock',
      };
    }
  } catch {}
  return null;
}

async function fetchCrypto(symbol: string) {
  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${symbol.toLowerCase()}`);
    const data = await res.json();
    if (data && data[0]) {
      return {
        name: data[0].name,
        symbol: data[0].symbol.toUpperCase(),
        price: data[0].current_price,
        currency: 'USD',
        source: 'CoinGecko',
        assetType: 'Crypto',
      };
    }
  } catch {}
  // Fallback: CoinCap
  try {
    const res = await fetch(`https://api.coincap.io/v2/assets/${symbol.toLowerCase()}`);
    const data = await res.json();
    if (data.data && data.data.priceUsd) {
      return {
        name: data.data.name,
        symbol: data.data.symbol,
        price: parseFloat(data.data.priceUsd),
        currency: 'USD',
        source: 'CoinCap',
        assetType: 'Crypto',
      };
    }
  } catch {}
  return null;
}

async function fetchCommodity(symbol: string) {
  try {
    const res = await fetch(`https://commodities-api.com/api/latest?access_key=demo&base=USD&symbols=${symbol.toUpperCase()}`);
    const data = await res.json();
    if (data.data && data.data.rates && data.data.rates[symbol.toUpperCase()]) {
      return {
        name: symbol,
        symbol: symbol.toUpperCase(),
        price: data.data.rates[symbol.toUpperCase()],
        currency: 'USD',
        source: 'Commodities-API',
        assetType: 'Commodity',
      };
    }
  } catch {}
  // Fallback: Metals-API (demo, gold/silver)
  try {
    const res = await fetch(`https://metals-api.com/api/latest?access_key=demo&base=USD&symbols=${symbol.toUpperCase()}`);
    const data = await res.json();
    if (data.rates && data.rates[symbol.toUpperCase()]) {
      return {
        name: symbol,
        symbol: symbol.toUpperCase(),
        price: data.rates[symbol.toUpperCase()],
        currency: 'USD',
        source: 'Metals-API',
        assetType: 'Commodity',
      };
    }
  } catch {}
  return null;
}

async function handleSearch() {
  error.value = null;
  result.value = null;
  loading.value = true;
  let r = null;
  // Try stock first
  r = await fetchStock(symbol.value);
  if (!r) r = await fetchCrypto(symbol.value);
  if (!r) r = await fetchCommodity(symbol.value);
  if (r) {
    result.value = r;
  } else {
    error.value = `Asset "${symbol.value}" not found as stock, crypto, or commodity.`;
  }
  loading.value = false;
}
</script>

<template>
  <div class="screener-fullscreen">
    <ScreenerBackground>
      <div class="screener-search-container">
        <ScreenerSearchBar 
          v-model="symbol"
          @search="handleSearch"
        />
        <button @click="handleSearch" :disabled="loading" class="search-button">
          <span v-if="loading" class="spinner"></span>
          <span v-else>Search</span>
        </button>
      </div>
      <div class="screener-result">
        <LoadingSpinner v-if="loading" message="Fetching asset data..." />
        <ErrorMessage v-else-if="error" :message="error" />
        <AssetCard v-else-if="result" :asset="result" />
        <EmptyState v-else />
      </div>
    </ScreenerBackground>
    <header class="screener-header">Asset Screener</header>
  </div>
</template>

<style scoped>
.screener-fullscreen {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 16px 64px 16px;
  font-family: 'Inter', Arial, sans-serif;
  position: relative;
}

.screener-header {
  font-size: 2.4em;
  font-weight: 800;
  color: #3730a3;
  letter-spacing: 1px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.screener-search-container {
  display: flex;
  gap: 12px;
  margin-bottom: 36px;
  width: 100%;
  max-width: 520px;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 100px;
  z-index: 10;
}

.search-button {
  padding: 12px 24px;
  border-radius: 8px;
  background: #3730a3;
  color: #fff;
  border: none;
  font-weight: 700;
  font-size: 1.1em;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.search-button:hover {
  background: #312e81;
}

.search-button[disabled] {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  display: inline-block;
  width: 18px;
  height: 18px;
  border: 3px solid #fff;
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
  top: 100px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.screener-result {
  width: 100%;
  max-width: 520px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  top: 100px;
}
</style> 
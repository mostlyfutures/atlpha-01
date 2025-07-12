<template>
  <div class="asset-card">
    <div class="asset-header">
      <div class="asset-title">{{ asset.name }} <span class="asset-symbol">({{ asset.symbol }})</span></div>
      <div class="asset-type">{{ asset.assetType }}</div>
    </div>
    <div class="asset-price">{{ formatPrice(asset.price) }} {{ asset.currency }}</div>
    <div class="asset-source">Source: {{ asset.source }}</div>
  </div>
</template>

<script setup lang="ts">
interface Asset {
  name: string;
  symbol: string;
  price: number;
  currency: string;
  source: string;
  assetType: string;
}

interface Props {
  asset: Asset;
}

const props = defineProps<Props>();

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6
  }).format(price);
}
</script>

<style scoped>
.asset-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  transition: all 0.2s ease;
}

.asset-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.asset-header {
  margin-bottom: 16px;
}

.asset-title {
  font-size: 1.4em;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 4px;
}

.asset-symbol {
  color: #4a5568;
  font-size: 0.9em;
  font-weight: 500;
}

.asset-type {
  color: #718096;
  font-size: 0.9em;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.asset-price {
  font-size: 2.2em;
  font-weight: 800;
  color: #38a169;
  margin-bottom: 12px;
}

.asset-source {
  color: #718096;
  font-size: 0.9em;
  font-style: italic;
}
</style> 
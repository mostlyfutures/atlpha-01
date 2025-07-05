<template>
  <div class="wallet-container">
    <!-- Use the shared AppHeader component -->
    <TumblrHeader />
    
    <!-- Page Content -->
    <main class="wallet-content">
      <!-- Tab Navigation -->
      <div class="wallet-tabs">
        <button class="tab active">Tab</button>
        <button class="tab">WL#1</button>
        <button class="tab">WL#2</button>
      </div>
      
      <!-- Balance Cards -->
      <div class="card-grid">
        <div class="balance-card">
          <h2>Wallet</h2>
          <div class="amount">$45,678.90</div>
          <div class="trend">+20% over the last 30 days</div>
        </div>
        <div class="assets-card">
          <h2>Assets Collected</h2>
          <div class="amount">2,405</div>
          <div class="trend">+33% month over</div>
        </div>
      </div>
      
      <!-- Chart Section -->
      <div class="chart-card">
        <h2>Title</h2>
        <div class="chart">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
      
      <!-- Contacts Section -->
      <div class="contacts-card">
        <h2>Contacts</h2>
        <div class="contact-list">
          <div class="contact">
            <div class="contact-details">
              <div class="contact-name">Flower Fahrat</div>
              <div class="contact-email">email@fakedomain.net</div>
            </div>
          </div>
          <div class="contact">
            <div class="contact-details">
              <div class="contact-name">Minah Duurham</div>
              <div class="contact-email">email@fakedomain.net</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    
    <!-- Bottom Navigation -->
    <nav class="bottom-nav">
      <router-link to="/" class="nav-button">
        <Icon icon="mdi:home" />
      </router-link>
      <router-link to="/browse" class="nav-button">
        <Icon icon="mdi:compass" />
      </router-link>
      <router-link to="/post" class="nav-button">
        <Icon icon="mdi:cart" />
      </router-link>
      <button class="nav-button">
        <Icon icon="mdi:bell" />
      </button>
      <router-link to="/wallet" class="nav-button active">
        <Icon icon="mdi:account" />
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Chart from 'chart.js/auto'
import { useRouter } from 'vue-router'
import TumblrHeader from '../components/AppHeader.vue'

const router = useRouter()
const chartCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (chartCanvas.value) {
    new Chart(chartCanvas.value, {
      type: 'line',
      data: {
        labels: ['Nov 23', '24', '25', '26', '27', '28', '29', '30'],
        datasets: [{
          data: [26000, 27000, 29000, 31000, 30000, 32000, 35000, 40000, 36000, 38000, 42000, 50000],
          borderColor: '#4285F4',
          backgroundColor: 'rgba(66, 133, 244, 0.1)',
          borderWidth: 3,
          pointRadius: 4,
          pointBackgroundColor: '#4285F4',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            ticks: {
              callback: function(value: number): string {
                return '$' + Number(value) / 1000 + 'K';
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }
});
</script>

<style scoped>
.wallet-container {
  min-height: 100vh;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
}

.wallet-content {
  flex: 1;
  padding: 16px;
  margin-top: 56px; /* Add margin for fixed header */
}

.wallet-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tab {
  padding: 10px 24px;
  border-radius: 24px;
  border: none;
  background-color: #f0f0f0;
  font-weight: 500;
}

.tab.active {
  background-color: #222;
  color: white;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

@media (max-width: 640px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.balance-card, .assets-card {
  background-color: white;
  border-radius: 16px;
  padding: 16px;
}

h2 {
  font-size: 16px;
  margin-bottom: 8px;
}

.amount {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 4px;
}

.trend {
  font-size: 14px;
  color: #666;
}

.chart-card {
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
}

.chart {
  height: 300px;
  width: 100%;
  margin-top: 16px;
}

.contacts-card {
  background-color: white;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 72px;
}

.contact-list {
  margin-top: 16px;
}

.contact {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.contact-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
}

.contact-name {
  font-weight: 500;
}

.contact-email {
  color: #666;
  font-size: 14px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 64px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.nav-button {
  background: none;
  border: none;
  padding: 8px;
  font-size: 24px;
  color: #444;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.nav-button.active {
  color: #4285F4;
}
</style>
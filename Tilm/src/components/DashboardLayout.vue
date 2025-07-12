<template>
  <div class="dashboard-layout">
    <header class="dashboard-header">
      <Logo />
    </header>
    <aside class="dashboard-sidebar">
      <AssetTypeDropdown style="margin-bottom: 8px;" />
      <AssetTypeDropdown />
      <SidebarNav />
    </aside>
    <main class="dashboard-main">
      <div class="card-row">
        <InvestmentSummaryCard />
        <InvestmentSummaryCard style="flex:2;" />
      </div>
      <div class="card-row">
        <InvestmentSummaryCard style="flex:1;" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import AssetTypeDropdown from './AssetTypeDropdown.vue'
import InvestmentSummaryCard from './InvestmentSummaryCard.vue'
import SidebarNav from './SidebarNav.vue'
</script>

<style scoped>
.dashboard-layout {
  display: grid;
  grid-template-columns: 220px 1fr;
  grid-template-rows: 72px 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
  min-height: 100vh;
  min-width: 100vw;
  background: #2b2b2b;
}
.dashboard-header {
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 32px;
  background: #2b2b2b;
  border-bottom: 1px solid #eee;
  height: 72px;
  gap: 32px;
}
.dashboard-sidebar {
  grid-area: sidebar;
  padding: 32px 16px 0 32px;
  background: #2b2b2b;
  min-width: 200px;
}
.dashboard-main {
  grid-area: main;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.card-row {
  display: flex;
  gap: 24px;
}
@media (max-width: 900px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
    grid-template-rows: 72px auto 1fr;
    grid-template-areas:
      "header"
      "sidebar"
      "main";
  }
  .dashboard-sidebar {
    padding: 16px;
    min-width: 0;
  }
  .dashboard-main {
    padding: 16px;
  }
  .dashboard-header {
    padding: 0 16px;
  }
}
</style> 
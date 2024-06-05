<template>
  <div class="layout-container">
    <div class="layout-main">
      <router-view v-slot="{ Component, route }">
          <keep-alive v-if="route.meta.isKeepAlive">
            <component :is="Component" />
          </keep-alive>
          <component v-else :is="Component" />
      </router-view>
    </div>
    <FooterNav class="layout-footer"></FooterNav>
  </div>
</template>
<script setup lang="ts">
import FooterNav from "@/components/FooterNav.vue";
</script>
<style lang="less" scoped>
.layout-container {
}
</style>

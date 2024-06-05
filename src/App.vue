<script setup lang="ts"></script>

<template>
  <router-view v-slot="{ Component, route }">
      <keep-alive v-if="route.meta.isKeepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
  </router-view>
</template>

<style scoped></style>

<template>
  <div class="welcome-container">
    你好
    <div><van-button @click="router.push('/home')" type="default" size="small">前往首页</van-button></div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="less" scoped>
.welcome-container {
}
</style>

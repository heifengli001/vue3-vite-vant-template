<template>
  <div class="notfound-container">
    这里是404页面
    <div><van-button @click="router.go(-1)" type="default" size="small">返回上一页</van-button></div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang="less" scoped>
.notfound-container {
}
</style>

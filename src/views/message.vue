<template>
  <div class='message-container'>
    消息列表

    <div><van-button @click="router.push('/suisss')" type="default" size="small">随便一个404页面</van-button></div>
  </div>
</template>
<script setup lang='ts'>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
<style lang='less' scoped>
.message-container{
}
</style>
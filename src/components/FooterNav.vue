<template>
  <van-tabbar v-model="activeNav" class="footerbar-comp-container" route>
    <van-tabbar-item v-for="navItem in navItems" :key="navItem.name" :name="navItem.name" :to="navItem.path" :activeColor="activeColor" :inactiveColor="inactiveColor">
      <span>{{ navItem.text }}</span>
      <template #icon>
        <!-- 这里使用componen动态加载icon组件 -->
        <component :is="navItem.icon"></component>
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>
<script setup lang="ts">
import { h, reactive, toRefs } from "vue";
import homeIcon from "@/assets/icons/home.svg?component";
import meIcon from "@/assets/icons/me.svg?component";
import msgIcon from "@/assets/icons/message.svg?component";

const activeColor = "#1989fa";
const inactiveColor = "#7d7e80";

const option = reactive({
  activeNav: "home",
  navItems: [
    {
      text: "首页",
      name: "home",
      icon: h(homeIcon),
      path: "/home",
    },
    {
      text: "消息",
      name: "message",
      icon: h(msgIcon),
      path: "/message",
    },
    {
      text: "我的",
      name: "me",
      icon: h(meIcon),
      path: "/me",
    },
  ],
});

const { activeNav, navItems } = toRefs(option);
</script>
<style lang="less" scoped>
.footerbar-comp-container {
  :deep(.van-tabbar-item__icon) {
    width: 24px;
    height: auto;
    svg,
    path {
      fill: v-bind(inactiveColor);
    }
  }
  :deep(.van-tabbar-item--active) {
    svg,
    path {
      fill: v-bind(activeColor);
    }
  }
}
</style>

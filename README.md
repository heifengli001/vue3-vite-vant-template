# Vue 3 + TypeScript + Vite
# VantUI的移动端+微信环境授权模板

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended Setup

- [VS Code](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (previously Volar) and disable Vetur

- Use [vue-tsc](https://github.com/vuejs/language-tools/tree/master/packages/tsc) for performing the same type checking from the command line, or for generating d.ts files for SFCs.


# 项目搭建步骤
+ 1.使用vite脚手架构建应用 `npm create vite@latest`
+ 2.引入vantUI `npm i vant -S -D`
+ 3.按需引入 vantUI 组件,引入后操作根据[vantUI教程](https://vant-ui.github.io/vant/#/zh-CN/quickstart#1.-an-zhuang-cha-jian)
`npm i @vant/auto-import-resolver unplugin-vue-components unplugin-auto-import -D`
+ 4.浏览器适配，可参考[vantUI文档](https://vant-ui.github.io/vant/#/zh-CN/advanced-usage#liu-lan-qi-gua-pei)
    + 引入 postcss-pxtorem
    ` npm install postcss postcss-pxtorem -S -D`
    增加postcss 配置
    根目录下创建文件 `postcss.config.cjs` 如果你是JS开发，后缀应该是`.js`
    ```
    module.exports = {
        plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*'],
        },
        },
    };
    ```
    + 引入 amfe-flexible,并修改配置
    `npm i -S amfe-flexible`
        + index.html 修改 meta-viewport 标签
        `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">`
        + 修改 `src/main.js(ts)` 导入amfe-flexible ` import 'amfe-flexible'`


# 在启动项目后你可能会遇到

## Q1: `src/main.ts`中红色波浪线警告，找不到模块“./App.vue”或其相应的类型声明。ts(2307)

解决方法：
1. step1: 根目录创建文件 `vue.d.ts`文件
> 这样子可以声明所有的.vue文件，让他们默认导出一个 `DefineComponent`类型实例;
```
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;

}
```
2. step2: 在 `tsconfig.json`中的 include节点增加此文件路径
如：
```
  "include": ["vue.d.ts","src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"],
```

## Q2: Module '"${youpath}/src/components/HelloWorld.vue"' has no default export.Vetur(1192)
解决方案，卸载 vscode 扩展 `vetur`，使用新的扩展 `Vue - Official`



# 增加全家桶成员 
## 使用[vue-router](https://router.vuejs.org/zh/)创建路由
1. 安装 `npm install vue-router@4`
2. 创建文件目录。`src`目录创建文件夹及文件 `/router/index.ts`
```
// index.ts
import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
const routes:RouteRecordRaw[] = [

]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;
```
3. main.ts 中引入并use
```
import router from './router'
const app=createApp(App)
app.use(router)

app.mount('#app')

```
4. 修改`src/App.vue`的template段，引入`RouterView`和`KeepAlive`组件
```
<script setup lang="ts">
</script>
<template>
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped>

</style>

```
5. 如果你的路由需要对不同的路由配置是否允许KeepAlive，可以在template中使用v-if判断
```
 <router-view v-slot="{ Component, route }">
    <transition>
      <keep-alive v-if="route.meta.isKeepAlive">
        <component :is="Component" />
      </keep-alive>
      <component v-else :is="Component" />
    </transition>
  </router-view>
```

## 使用[pinia](https://pinia.vuejs.org/zh/)来管理状态
1. 安装 `npm install pinia`
2. 创建文件目录。 `src`目录创建文件夹及文件 `/store/index.ts`
```
import { createPinia } from "pinia";
export const pinia = createPinia();
export default pinia;
```

3. main.ts 中引入并use
```
import store from './store'
const app=createApp(App)
app.use(router).use(store)

app.mount('#app')

```
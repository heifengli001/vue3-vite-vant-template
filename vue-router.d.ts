import 'vue-router';
// 扩展路由元信息
declare module 'vue-router' {
    interface RouteMeta {
      requiresAuth?: boolean,
      isKeepAlive?: boolean,
      title?: string,
    }
   }
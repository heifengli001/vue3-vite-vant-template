
import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

const WelcomeView = () => import("@/views/welcome.vue");
const LayoutView = () => import("@/views/layout.vue");
const NotFoundView = () => import("@/views/notfound.vue");
const HomeView = () => import("@/views/home.vue");
const MeView = () => import("@/views/me.vue");
const MessageView = () => import("@/views/message.vue");
const wechatAuthView = () => import("@/views/wechatAuth.vue");

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "welcome",
    component: WelcomeView,
    meta: {
      title: "你好",
    },
  },
  {
    path: "/wechatAuth",
    name: "wechatAuth",
    component: wechatAuthView,
    meta: {
      title: "微信授权",
      isKeepAlive: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: NotFoundView,
    meta: {
      isKeepAlive: true,
    },
  },
  {
    path: "/layout",
    redirect: "/home",
    name: "layout",
    component: LayoutView,
    meta: {
      title: "首页",
      isKeepAlive: true,
    },
    children: [
      {
        path: "/home",
        component: HomeView,
        name: "home",
        meta: {
          title: "首页",
          isKeepAlive: true,
        },
      },
      {
        path: "/me",
        component: MeView,
        name: "me",
        meta: {
          title: "我的",
          isKeepAlive: true,
        },
      },
      {
        path: "/message",
        component: MessageView,
        name: "message",
        meta: {
          title: "消息",
          isKeepAlive: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫
router.beforeEach((to, from) => {
  const { title } = to.meta;
  document.title = title || import.meta.env.VITE_APP_TITLE;
  return true;
});
export default router;

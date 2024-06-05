<template>
  <div class="wechatauth-container">
    <span class="image-wrapper"><img :src="wechatIcon" /></span>
    <div class="text" v-if="option.isAutoLogin || option.isAuthing">微信授权认证中，请稍候...</div>
    <div v-if="!option.isAutoLogin" class="auth-btn"><van-button @click="auth.wechat.gotoAuthPage" plain hairline size="small" type="success">点击使用微信登录</van-button></div>

    <div class="tips">微信只会用作快速登录，不会获取你的任何个人信息</div>
  </div>
</template>
<script setup lang="ts">
import wechatIcon from "@/assets/icons/wechat.svg?url";
import { auth, AuthType } from "@/utils/auth";
import { getURLParam } from "@/utils/common";
import { reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const option = reactive({
  isAutoLogin: import.meta.env.VITE_APP_WECHAT_AUTO_LOGIN == "1",
  isAuthing: false,
});
const code = getURLParam(location.href, "code");

if (code) {
  option.isAuthing = true;
  auth.login(AuthType.wechat, code).then(() => {
    router.push("/");
  });
} else {
  if (option.isAutoLogin) {
    auth.wechat.gotoAuthPage();
  }
}
</script>
<style lang="less" scoped>
.wechatauth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  .image-wrapper {
    background-color: #efefef;
    width: 72px;
    height: 72px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 60px;
      height: auto;
    }
  }
  .text {
    margin-top: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #333333;
  }
  .auth-btn {
    margin-top: 40px;
  }
  .tips {
    margin-top: 40px;
    color: #666666;
    position: fixed;
    bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    margin-bottom: -constant(safe-area-inset-bottom);
    margin-bottom: -env(safe-area-inset-bottom);
  }
}
</style>

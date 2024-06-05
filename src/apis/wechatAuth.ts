import axios from "@/utils/axios";
const prefix = "/wechat-auth";

// 获取微信授权链接 snsapi_userinfo snsapi_userinfo
export const getWechatAuthUrl = (scope: string = "snsapi_base", redirectUrl: string = import.meta.env.VITE_APP_WECHAT_REDIRECT_URL, state?: string): Promise<any> => {
  return axios.get(prefix + "/getAuthUrl", { params: { scope, redirectUrl: redirectUrl, state } });
};

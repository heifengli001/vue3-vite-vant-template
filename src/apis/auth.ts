import axios from "@/utils/axios";
const prefix = "/auth";

// 登录
export const loginByWechat = (code: string): Promise<any> => {
  return axios.post(prefix + "/login", { code });
};

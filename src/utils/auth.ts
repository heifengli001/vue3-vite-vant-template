// 登录认证相关的工具函数

import { getStorage, setStorage, removeStorage } from "./storage";
import { getWechatAuthUrl } from "@/apis/wechatAuth.ts";
import { loginByWechat } from "@/apis/auth";
const accessTokenStorageKey = "ACCESS_TOKEN";

// 定义微信模块
const wechatHandler = {
  gotoAuthPage(force: boolean = false) {
    if (!auth.isLogin() || force) {
      getWechatAuthUrl().then((data) => {
        location.href = data;
      });
    }
  },
  login(code: string) {
    return loginByWechat(code);
  },
};

// 给后续需要接入其他认证方式留下可扩展项
export enum AuthType {
  wechat = "wechat",
}

export const auth = {
  wechat: wechatHandler,
  login(type: AuthType, args: any, force: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      const isLogin = auth.isLogin();
      console.log(isLogin && !force);
      if (isLogin && !force) {
        resolve();
      } else {
        if (auth[type]) {
          auth[type].login
            .call(auth[type], args)
            .then((res) => {
              setStorage(accessTokenStorageKey, res["access_token"]);
              resolve();
            })
            .catch((err) => {
              reject(err);
            });
        } else {
          reject("不支持当前登录方式");
        }
      }
    });
  },
  isLogin() {
    return !!getStorage(accessTokenStorageKey);
  },
  logout() {
    removeStorage(accessTokenStorageKey);
  },
};

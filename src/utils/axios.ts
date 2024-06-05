import axios from "axios";
import { getStorage } from "./storage";
const instance = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: {},
});

const accessTokenStorageKey = "ACCESS_TOKEN";
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${getStorage(accessTokenStorageKey)}`;
    config.withCredentials = true;
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function ({ data }) {
    const { success, data: resData } = data;
    if (success) {
      return resData;
    } else {
      return Promise.reject(data);
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;

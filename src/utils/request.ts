import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import { notification } from "antd";
import { redirect } from "react-router-dom";
import { local } from "@/utils/utils";

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么

    const { status, statusText, data } = error.response;

    if (!/auth\/(login|code)$/.test(error.config.url)) {
      notification.error({
        message: `${status}: ${statusText}`,
        description: `${error.message}.(${data.name}: ${data.message})`,
      });

      //  Redirect to login page
      redirect("/");
    }

    return Promise.reject(error);
  }
);

export default function request(url: string, options?: AxiosRequestConfig) {
  const token = local.get("token");
  return axios({
    ...options,
    url,
    // 配置身份信息
    ...(token
      ? { headers: { authorization: `Bearer ${token}`, ...options?.headers } }
      : {}),
  });
}

// api/proxy.js
// 该服务为 vercel serve跨域处理
import { createProxyMiddleware } from 'http-proxy-middleware';


// Expose the proxy on the "/api/*" endpoint.
export default function (req, res) {

    let target = ''
    // 代理目标地址
    // 这里使用 backend 主要用于区分 vercel serverless 的 api 路径
    // target 替换为你跨域请求的服务器 如： http://baidu.com


    const isApi = req.url.startsWith('/api/sc-hq')

    if (isApi) {
        target = 'https://api.qhan.wang'
    }

    const apiProxy = createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: isApi ? { '^/api': '' } : {
            // 通过路径重写，去除请求路径中的 `/api`
            // 例如 /api/user/login 将被转发到 https://fanyi-api.baidu.com/user/login
            // '^/api/': '/',
        },


    });

    return apiProxy(req, res);
}



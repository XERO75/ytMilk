import axios from 'axios'
// import axios from "./../../request_login.js";
var baseUrl = process.env.BASE_API
const urls = {
  login: '/app/member/simpleLogin.htm'
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {})
// 登录
export const handleLogin = () => {
  return axios({
    url: apis.login,
    method: 'get'
  })
}

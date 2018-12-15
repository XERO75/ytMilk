// import axios from "./../../request_login.js";
import axios from "axios";
const baseUrl = process.env.BASE_API;

const urls = {
  login: '/app/service_department/simpleLogin.htm',
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
// 登录
export const handleLogin = () => {
  // return axios({
  //   url: apis.login,
  //   method: 'get',
  //   params: {
  //     WX_TYPE: "OfficialAccount"
  //   },
  // });
};
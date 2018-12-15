// import axios from "./../../request_login.js";
import axios from "axios";
const baseUrl = process.env.BASE_API;

const urls = {
  login: '/app/service_department/simpleLogin.htm',
  department: '/app/service_department/department_login.htm',
  express: '/app/express_server/express_login.htm'
}
// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
// 模拟登录
// export const handleLogin = () => {
//   return axios({
//     url: apis.login,
//     method: 'get',
//     params: {
//       WX_TYPE: "OfficialAccount"
//     },
//   });
// };
// 服务部登录
export const departmentLogin = () => {
  return axios({
    url: apis.department,
    method: 'get',
    params: {
      WX_TYPE: "OfficialAccount"
    },
  });
};
// 配送员登录
export const expressLogin = () => {
  return axios({
    url: apis.express,
    method: 'get',
    params: {
      WX_TYPE: "OfficialAccount"
    },
  });
};
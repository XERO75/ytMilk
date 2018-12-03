// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  department: '/app/service_department/get_department.htm',
  bind:'/app/service_department/bind_department.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 获取详情 
export const getDetails = (id) => {
  return axios({
    url: apis.department,
    method: 'get',
    params: axios.getData({ departmentId : id })
  })
}

// 确认绑定 
export const comfirmBind = (id) => {
  return axios({
    url: apis.bind,
    method: 'get',
    params: axios.getData({ departmentId : id })
  })
}
// 拒绝订单
// export const rejectOrder = (param) => {
//   return axios({
//     url: apis.reject,
//     method: 'post',
//     data: axios.postData(param)
//   });
// };
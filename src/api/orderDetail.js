import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  month: '/app/service_department/monthly_payment.htm',
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 获取所有订单 
export const getMonthDetail = () => {
  return axios({
    url: apis.month,
    method: 'get',
    params: axios.getData({})
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
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  month: '/app/service_department/monthly_payment.htm',
  day: '/app/service_department/day_detail.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 获取月订单 
export const getMonthDetail = (pageNumber, status) => {
  return axios({
    url: apis.month,
    method: 'get',
    params: axios.getData({pageNumber, status})
  })
}

// 获取日订单 
export const getDayDetail = (date) => {
  return axios({
    url: apis.day,
    method: 'get',
    params: axios.getData({date:date})
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
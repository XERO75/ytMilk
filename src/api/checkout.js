// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  details: '/app/order/delivering_details.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 查看订单 
export const getDetails = (id) => {
  return axios({
    url: apis.details,
    method: 'get',
    params: axios.getData({ orderId : id })
  })
}
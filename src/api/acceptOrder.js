import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;
const urls = {
  details: '/app/order/dealing_details.htm',
  accept: '/app/order/accept.htm?WX_TYPE=OfficialAccount',
  couriers: '/app/service_department/department_servers.htm'
  // couriers: '/app/express_server/department_servers.htm'
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

// 获取配送达人
export const getCouriers= (id) => {
  return axios({
    url: apis.couriers,
    method: 'get',
    params: axios.getData({ orderId : id })
  })
}

// 确认接受订单
export const acceptOrder = (param) => {
  return axios({
    url: apis.accept,
    method: 'post',
    data: axios.postData(param)
  });
};
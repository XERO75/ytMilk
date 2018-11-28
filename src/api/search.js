import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  // order: '/app/service_department/list.htm',
  order: '/app/service_department/search.htm',
  reject: '/app/order/reject.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 获取所有订单 
export const getAllOrder = () => {
  return axios({
    url: apis.order,
    method: 'get',
    params: axios.getData({})
  })
}

// 搜索订单 
export const searchOrder = (pageNumber, searchKey) => {
  return axios({
    url: apis.order,
    method: 'get',
    params: axios.getData({ pageNumber: pageNumber, keyword: searchKey })
  })
}

// 拒绝订单
export const rejectOrder = (param) => {
  return axios({
    url: apis.reject,
    method: 'post',
    data: axios.postData(param)
  });
};
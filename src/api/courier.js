// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  couriers: '/app/service_department/servers.htm',
  detail: '/app/service_department/edit.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});

// 获取所有配送员
export const getAllCouriers = () => {
  return axios({
    url: apis.couriers,
    method: 'get',
    params: axios.getData({})
  })
}

// 查看配送员详情
export const getCourierDetail = (id) => {
  return axios({
    url: apis.detail,
    method: 'get',
    params: axios.getData({
      expressServerId : id
    })
  })
}
// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  commetns: '/app/service_department/comment_list.htm',
  couriers: '/app/express_server/department_servers.htm'

}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});

// 所有评价
export const getAllComments = () => {
  return axios({
    url: apis.commetns,
    method: 'get',
    params: axios.getData({})
  })
}

// 选择评价
export const getComments = (name) => {
  return axios({
    url: apis.commetns,
    method: 'get',
    params: axios.getData({ expressServerName : name})
  })
}

// 获取配送达人
export const getCouriers = (id) => {
  return axios({
    url: apis.couriers,
    method: 'get',
    params: axios.getData({ expressServerId:id })
  })
}
// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  commetns: '/app/service_department/comment_list.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 所有评价
export const getComments = (id) => {
  return axios({
    url: apis.commetns,
    method: 'get',
    params: axios.getData({})
  })
}
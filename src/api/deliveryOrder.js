import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  date: '/app/order_item/count_item.htm',
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 查看订单 
// export const getDay = (day) => {
//   return axios({
//     url: apis.date,
//     method: 'get',
//     params: axios.getData({ chooseDate : day })
//   })
// }
export const getDay = (date) => {
  return axios({
    url: apis.date,
    method: 'get',
    params: axios.getData({chooseDate:date})
  })
}

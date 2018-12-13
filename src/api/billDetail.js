// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  monthDetails: '/app/service_department/monthly_detail.htm',
  couriers: '/app/service_department/servers.htm',
  change: '/app/service_department/edit_bill.htm'
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 
export const getMonthDetails = (departmentBillId, expressId , pageNumber) => {
  return axios({
    url: apis.monthDetails,
    method: 'get',
    params: axios.getData({ departmentBillId : departmentBillId, expressId: expressId, pageNumber: pageNumber})
  })
}

// 获取所有配送员
export const getAllCouriers = () => {
  return axios({
    url: apis.couriers,
    method: 'get',
    params: axios.getData({})
  })
}

// 更改
export const changeHandler = (departmentBillId, status) => {
  return axios({
    url: apis.change,
    method: 'get',
    params: axios.getData({departmentBillId:departmentBillId,status:status})
  })
}
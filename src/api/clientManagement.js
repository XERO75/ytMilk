// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  table: '/app/service_department/list.htm',
  comments: '/app/service_department/comment_list.htm',
  details: ' /app/order/delivering_details.htm',
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});
  
// 获取评价信息
export const getComments = () => {
  return axios({
    url: apis.comments,
    method: 'get',
    params: axios.getData({})
  });
};

// 获取所有表格信息
export const getAllOrder = () => {
  return axios({
    url: apis.table,
    method: 'get',
    params: axios.getData({})
  });
};

// 获取配送中订单 
export const getDealing = () => {
  return axios({
    url: apis.table,
    method: 'get',
    params: {
      WX_TYPE: "OfficialAccount",
      orderStatus: 'OnDelivery'
    }
  })
}

// 获取未处理订单 
export const getUnDeal = () => {
  return axios({
    url: apis.table,
    method: 'get',
    params: {
      WX_TYPE: "OfficialAccount",
      orderStatus: 'UnDeal'
    }
  })
}



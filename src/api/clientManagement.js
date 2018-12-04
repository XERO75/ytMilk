// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  table: '/app/service_department/list.htm',
  comments: '/app/service_department/comment_list.htm',
  details: '/app/order/delivering_details.htm',
  reject: '/app/order/reject.htm?WX_TYPE=OfficialAccount'
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
export const getUnSettle = () => {
  return axios({
    url: apis.table,
    method: 'get',
    params: {
      WX_TYPE: "OfficialAccount",
      orderStatus: 'UnSettle'
    }
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


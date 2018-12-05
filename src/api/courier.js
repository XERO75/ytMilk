// import axios from "axios";
import axios from "../api/request.js";
const baseUrl = process.env.BASE_API;

const urls = {
  couriers: '/app/service_department/servers.htm',
  detail: '/app/service_department/edit.htm',
  delete: '/app/service_department/delete.htm',
  unbind: '/app/service_department/unbind.htm',
  change: '/app/service_department/update.htm?WX_TYPE=OfficialAccount',
  add: '/app/service_department/save.htm?WX_TYPE=OfficialAccount',
  count: '/app/service_department/count_server_item.htm',
  milkCount: '/app/service_department/count_server_item.htm'
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
// 删除配送员
export const deleteCourier = (id) => {
  return axios({
    url: apis.delete,
    method: 'get',
    params: axios.getData({
      expressServerIds : id
    })
  })
}
// 解绑配送员
export const unbindCourier = (id) => {
  return axios({
    url: apis.unbind,
    method: 'get',
    params: axios.getData({
      expressServerId : id
    })
  })
}

// 变更配送员信息
export const changeInfo = (param) => {
  return axios({
    url: apis.change,
    method: 'post',
    data: axios.postData(param)
  });
};

// 添加配送员
export const addCourier = (param) => {
  return axios({
    url: apis.add,
    method: 'post',
    data: axios.postData(param)
  });
};

// 获取统计
export const getMilkCount = (id,beginDate,endDate) => {
  return axios({
    url: apis.count,
    method: 'get',
    params: axios.getData({
      expressServerId : id,
      beginDate: beginDate,
      endDate: endDate
    })
  })
}

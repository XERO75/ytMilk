import axios from "axios";
const baseUrl = process.env.BASE_API;

const urls = {
  table: '/app/service_department/list.htm',
}

// 合并请求链接
const apis = Object.keys(urls)
  .reduce((acc, url) => {
    acc[url] = baseUrl + urls[url]
    return acc
  }, {});

// 表格信息
export const getAllOrder = () => {
  return axios({
    url: apis.table,
    method: 'get',
    params: {
      // pageNumber: 1,
      // orderStatus: 'UnDeal',
      WX_TYPE: 'OfficialAccount'
    },
  });
};
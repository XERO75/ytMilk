import axios from 'axios'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // request timeout
})
// 请求是get
service.getData = obj => {
  obj.WX_TYPE ='OfficialAccount';
  return obj
}
// 请求是post
service.postData = obj => {
  obj.append('WX_TYPE','OfficialAccount');
  return obj
}
export default service